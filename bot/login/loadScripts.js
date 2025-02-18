const {
  readdirSync,
  readFileSync,
  writeFileSync,
  existsSync,
} = require('fs-extra');
const path = require('path');
const { exec } = require('child_process');

const { log, loading, getText, colors, removeHomeDir } = global.utils;
const { GoatBot, configCommands } = global;

const regExpCheckPackage = /require\s*\s*['"`]([^'"`]+)['"`]\s*/g;
const packageAlreadyInstalled = [];
const spinner = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
let spinnerIndex = 0;

/**
 * Executes a shell command and returns it as a Promise.
 */
function runCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout) => {
      if (error) return reject(error);
      resolve(stdout);
    });
  });
}

module.exports = async function (
  api,
  threadModel,
  userModel,
  dashBoardModel,
  globalModel,
  threadsData,
  usersData,
  dashBoardData,
  globalData,
  getTextFunc
) {
  // Load aliases
  const storedAliases = await globalData.get('setalias', 'data', []);
  if (storedAliases) {
    for (const { aliases, commandName } of storedAliases) {
      for (const alias of aliases) {
        if (GoatBot.aliases.has(alias)) {
          throw new Error(`Alias "${alias}" already exists in command "${commandName}"`);
        }
        GoatBot.aliases.set(alias, commandName);
      }
    }
  }

  // Directories to process
  const directories = ['cmds', 'events'];

  for (const directory of directories) {
    const isCommand = directory === 'cmds';
    const type = isCommand ? 'command' : 'event command';
    const envType = isCommand ? 'envCommands' : 'envEvents';
    const commandList = isCommand ? 'commands' : 'eventCommands';

    console.log(colors.hex('#f5ab00')(getTextFunc(isCommand ? 'RANA LOAD COMMANDS' : 'RANA LOAD COMMANDS EVENT')));

    const scriptsPath = path.join(process.cwd(), `scripts/${directory}`);
    const scriptFiles = readdirSync(scriptsPath).filter(file =>
      file.endsWith('.js') &&
      !file.endsWith('eg.js') &&
      (process.env.NODE_ENV === 'development' || !file.endsWith('.dev.js')) &&
      !configCommands[isCommand ? 'commandUnload' : 'commandEventUnload']?.includes(file)
    );

    const errors = [];
    let loadedScripts = 0;

    for (const script of scriptFiles) {
      const scriptPath = path.join(scriptsPath, script);

      try {
        const scriptContent = readFileSync(scriptPath, 'utf8');
        let requiredPackages = scriptContent.match(regExpCheckPackage);

        if (requiredPackages) {
          requiredPackages = requiredPackages
            .map(match => match.match(/['"`]([^'"`]+)['"`]/)[1])
            .filter(pkg => !pkg.startsWith('./') && !pkg.startsWith('../') && !pkg.startsWith(__dirname));

          for (let pkg of requiredPackages) {
            if (pkg.startsWith('@')) {
              pkg = pkg.split('/').slice(0, 2).join('/');
            } else {
              pkg = pkg.split('/')[0];
            }

            if (!packageAlreadyInstalled.includes(pkg)) {
              packageAlreadyInstalled.push(pkg);

              if (!existsSync(path.join(process.cwd(), 'node_modules', pkg))) {
                const installSpinner = setInterval(() => {
                  loading.info(
                    'RANA PACKAGE',
                    `${spinner[spinnerIndex % spinner.length]} Installing package ${colors.yellow(pkg)} for ${type} ${colors.yellow(script)}`
                  );
                  spinnerIndex++;
                }, 80);

                try {
                  await runCommand(`npm install ${pkg} --${scriptPath.endsWith('.dev.js') ? 'no-save' : 'save'}`);
                  clearInterval(installSpinner);
                  process.stderr.write('\r\x1B[K');
                  console.log(colors.green('✔') + ` Installed package ${pkg} successfully`);
                } catch (error) {
                  clearInterval(installSpinner);
                  process.stderr.write('\r\x1B[K');
                  console.log(colors.red('✖') + ` Failed to install package ${pkg}`);
                  throw new Error(`Can't install package ${pkg}`);
                }
              }
            }
          }
        }

        global.temp.contentScripts[directory][script] = scriptContent;
        const moduleScript = require(scriptPath);
        moduleScript.location = scriptPath;

        const { config } = moduleScript;
        if (!config) throw new Error(`Config of ${type} undefined`);
        if (!config.category) throw new Error(`Category of ${type} undefined`);
        if (!config.name) throw new Error(`Name of ${type} undefined`);
        if (!moduleScript.onStart || typeof moduleScript.onStart !== 'function') {
          throw new Error(`onStart of ${type} must be a function`);
        }

        if (GoatBot[commandList].has(config.name.toLowerCase())) {
          throw new Error(
            `${type} "${config.name}" already exists with file "${removeHomeDir(GoatBot[commandList].get(config.name.toLowerCase()).location || '')}"`
          );
        }

        if (config.aliases) {
          if (!Array.isArray(config.aliases)) throw new Error(`The value of "config.aliases" must be an array`);
          for (const alias of config.aliases) {
            if (GoatBot.aliases.has(alias)) {
              throw new Error(
                `Alias "${alias}" already exists in ${type} "${GoatBot.aliases.get(alias)}" with file "${removeHomeDir(GoatBot[commandList].get(GoatBot.aliases.get(alias))?.location || '')}"`
              );
            }
            GoatBot.aliases.set(alias, config.name);
          }
        }

        // Handle Environment Variables
        if (config.envGlobal) {
          if (typeof config.envGlobal !== 'object' || Array.isArray(config.envGlobal)) {
            throw new Error('The value of "envGlobal" must be an object');
          }
          Object.assign(configCommands.envGlobal, config.envGlobal);
        }

        if (config.envConfig) {
          if (typeof config.envConfig !== 'object' || Array.isArray(config.envConfig)) {
            throw new Error('The value of "envConfig" must be an object');
          }
          configCommands[envType] ??= {};
          configCommands[envType][config.name] ??= {};
          Object.assign(configCommands[envType][config.name], config.envConfig);
        }

        // Execute `onLoad` if exists
        if (moduleScript.onLoad) {
          await moduleScript.onLoad({
            api,
            threadModel,
            userModel,
            dashBoardModel,
            globalModel,
            threadsData,
            usersData,
            dashBoardData,
            globalData,
          });
        }

        GoatBot[commandList].set(config.name.toLowerCase(), moduleScript);
        loadedScripts++;

        global.GoatBot[isCommand ? 'commandFilesPath' : 'eventCommandsFilesPath'].push({
          filePath: scriptPath,
          commandName: [config.name, ...(config.aliases || [])],
        });

      } catch (error) {
        errors.push({ name: script, error });
      }
    }

    loading.info('RANA LOADED', `${colors.green(loadedScripts)}${errors.length ? ', ' + colors.red(errors.length) : ''}`);
  }
};
