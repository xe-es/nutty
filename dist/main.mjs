#!/usr/bin/env node
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/code/helpers/cli.ts
import { Command } from "commander";
var program = new Command();
var CLI = function(_0) {
  return __async(this, arguments, function* ({ data, core }) {
    for (let i = 0; i < data.options.length; i++) {
      program.option(data.options[i][0], data.options[i][1]);
    }
    program.name(data.project.name).version(data.project.version).description(data.project.description).action(() => __async(this, null, function* () {
      const options = program.opts();
      if (core.events && core.events.onBeg)
        core.events.onBeg();
      const actionKeys = Object.keys(core.actions);
      for (let i = 0; i < actionKeys.length; i++) {
        if (options[actionKeys[i]])
          yield core.actions[actionKeys[i]](options);
      }
      if (core.events && core.events.onEnd)
        core.events.onEnd();
    }));
    program.parse(process.argv);
  });
};

// src/code/modules/create.ts
import path from "path";
import fs from "fs";
import { exec } from "child_process";
function create_default(args) {
  return __async(this, null, function* () {
    try {
      if (!args.as)
        throw "Project type is required, use --as <type>";
      const name = args.create;
      const type = args.as;
      const force = typeof args.force === "undefined" ? false : true;
      yield CloneRepo({ name, type, force });
    } catch (error) {
      console.log(`Failed to create the project : ${error}`);
    }
  });
}
function CloneRepo(_0) {
  return __async(this, arguments, function* ({ name, type, force }) {
    const rootPath = path.join(process.cwd(), name);
    const owner = "maysara-elshewehy";
    const repo = { npm: "dummy-npm-package", electron: "dummy-electron-app" }[type];
    if (!repo)
      throw new Error("Invalid project type");
    if (fs.existsSync(rootPath)) {
      if (!force)
        throw new Error("Folder already exists");
      else
        fs.rmSync(rootPath, { recursive: true });
    }
    const command = `git clone https://github.com/${owner}/${repo}.git ${name}`;
    yield new Promise((resolve, reject) => {
      exec(command, (error, stdout, stderr) => {
        if (error)
          reject(error);
        else
          resolve();
      });
    });
    fs.rmSync(path.join(rootPath, ".git"), { recursive: true });
    return rootPath;
  });
}

// src/code/main.ts
var Main = function() {
  return __async(this, null, function* () {
    yield CLI({
      data: {
        project: {
          name: "nutty",
          description: "A simple package for creating projects faster",
          version: "0.0.0"
        },
        options: [
          ["-c, --create <name>", "create a new project"],
          ["--as <type>", "project type (npm, electron, ..)"],
          ["-f, --force", "force create a new project"]
        ]
      },
      core: {
        actions: {
          create: create_default
        }
      }
    });
  });
};
var main_default = Main();
export {
  main_default as default
};
//# sourceMappingURL=main.mjs.map