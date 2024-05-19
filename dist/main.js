#!/usr/bin/env node
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
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

// src/code/main.ts
var main_exports = {};
__export(main_exports, {
  default: () => main_default
});
module.exports = __toCommonJS(main_exports);

// src/code/helpers/cli.ts
var import_commander = require("commander");
var program = new import_commander.Command();
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
var import_path = __toESM(require("path"));
var import_fs = __toESM(require("fs"));
var import_child_process = require("child_process");
function create_default(args) {
  return __async(this, null, function* () {
    try {
      const _create = typeof args.create === "undefined" ? "" : args.create;
      const _as = typeof args.as === "undefined" ? "" : args.as;
      if (!_create.length || !_as.length)
        throw "Project type is required, use --as <type>";
      const name = _create;
      const type = _as;
      const force = typeof args.force === "undefined" ? false : true;
      yield CloneRepo({ name, type, force });
    } catch (error) {
      console.log(`Failed to create the project : ${error}`);
    }
  });
}
function CloneRepo(_0) {
  return __async(this, arguments, function* ({ name, type, force }) {
    const rootPath = import_path.default.join(process.cwd(), name);
    const owner = "xe-es";
    let repo = "";
    {
      if (type === "npm")
        repo = "nutty-npm-package";
      else if (type === "electron")
        repo = "nutty-electron-app";
      else
        throw new Error("Invalid project type");
    }
    if (!repo)
      throw new Error("Invalid project type");
    if (import_fs.default.existsSync(rootPath)) {
      if (!force)
        throw new Error("Folder already exists");
      else
        import_fs.default.rmSync(rootPath, { recursive: true });
    }
    const command = `git clone https://github.com/${owner}/${repo}.git ${name}`;
    yield new Promise((resolve, reject) => {
      (0, import_child_process.exec)(command, (error, stdout, stderr) => {
        if (error)
          reject(error);
        else
          resolve();
      });
    });
    import_fs.default.rmSync(import_path.default.join(rootPath, ".git"), { recursive: true });
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
//# sourceMappingURL=main.js.map