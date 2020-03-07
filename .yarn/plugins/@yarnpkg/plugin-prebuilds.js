/* eslint-disable*/
module.exports = {
  name: "@yarnpkg/plugin-prebuilds",
  factory: function (require) {
                          var plugin =
  /******/ (function(modules) { // webpackBootstrap
  /******/ 	// The module cache
  /******/ 	var installedModules = {};
  /******/
  /******/ 	// The require function
  /******/ 	function __webpack_require__(moduleId) {
  /******/
  /******/ 		// Check if module is in cache
  /******/ 		if(installedModules[moduleId]) {
  /******/ 			return installedModules[moduleId].exports;
  /******/ 		}
  /******/ 		// Create a new module (and put it into the cache)
  /******/ 		var module = installedModules[moduleId] = {
  /******/ 			i: moduleId,
  /******/ 			l: false,
  /******/ 			exports: {}
  /******/ 		};
  /******/
  /******/ 		// Execute the module function
  /******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
  /******/
  /******/ 		// Flag the module as loaded
  /******/ 		module.l = true;
  /******/
  /******/ 		// Return the exports of the module
  /******/ 		return module.exports;
  /******/ 	}
  /******/
  /******/
  /******/ 	// expose the modules object (__webpack_modules__)
  /******/ 	__webpack_require__.m = modules;
  /******/
  /******/ 	// expose the module cache
  /******/ 	__webpack_require__.c = installedModules;
  /******/
  /******/ 	// define getter function for harmony exports
  /******/ 	__webpack_require__.d = function(exports, name, getter) {
  /******/ 		if(!__webpack_require__.o(exports, name)) {
  /******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
  /******/ 		}
  /******/ 	};
  /******/
  /******/ 	// define __esModule on exports
  /******/ 	__webpack_require__.r = function(exports) {
  /******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
  /******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
  /******/ 		}
  /******/ 		Object.defineProperty(exports, '__esModule', { value: true });
  /******/ 	};
  /******/
  /******/ 	// create a fake namespace object
  /******/ 	// mode & 1: value is a module id, require it
  /******/ 	// mode & 2: merge all properties of value into the ns
  /******/ 	// mode & 4: return value when already ns object
  /******/ 	// mode & 8|1: behave like require
  /******/ 	__webpack_require__.t = function(value, mode) {
  /******/ 		if(mode & 1) value = __webpack_require__(value);
  /******/ 		if(mode & 8) return value;
  /******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
  /******/ 		var ns = Object.create(null);
  /******/ 		__webpack_require__.r(ns);
  /******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
  /******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
  /******/ 		return ns;
  /******/ 	};
  /******/
  /******/ 	// getDefaultExport function for compatibility with non-harmony modules
  /******/ 	__webpack_require__.n = function(module) {
  /******/ 		var getter = module && module.__esModule ?
  /******/ 			function getDefault() { return module['default']; } :
  /******/ 			function getModuleExports() { return module; };
  /******/ 		__webpack_require__.d(getter, 'a', getter);
  /******/ 		return getter;
  /******/ 	};
  /******/
  /******/ 	// Object.prototype.hasOwnProperty.call
  /******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
  /******/
  /******/ 	// __webpack_public_path__
  /******/ 	__webpack_require__.p = "";
  /******/
  /******/
  /******/ 	// Load entry module and return exports
  /******/ 	return __webpack_require__(__webpack_require__.s = 0);
  /******/ })
  /************************************************************************/
  /******/ ([
  /* 0 */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";


  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  const core_1 = __webpack_require__(1);

  const add_prebuilt_dependencies_1 = __webpack_require__(2);

  const fetcher_1 = __webpack_require__(3);

  const resolver_1 = __webpack_require__(15);

  const prebuildSettings = {
    prebuildRuntime: {
      description: `The runtime used, either 'electron' or 'node'`,
      type: core_1.SettingsType.STRING,
      default: null
    },
    prebuildAbi: {
      description: `The ABI of the runtime used.`,
      type: core_1.SettingsType.STRING,
      default: null
    },
    prebuildTagPrefix: {
      description: `The prebuild tag prefix`,
      type: core_1.SettingsType.STRING,
      default: `v`
    },
    prebuildHostMirrorUrl: {
      description: `The prebuild host mirror URL`,
      type: core_1.SettingsType.STRING,
      default: null
    },
    prebuildHostMirrorTemplate: {
      description: `The prebuild host mirror template`,
      type: core_1.SettingsType.STRING,
      default: `{mirror_url}/{tag_prefix}{version}/{name}-v{version}-{runtime}-v{abi}-{platform}{libc}-{arch}.tar.gz`
    }
  };
  const plugin = {
    hooks: {
      reduceDependency: add_prebuilt_dependencies_1.reduceDependency
    },
    fetchers: [fetcher_1.PrebuildFetcher],
    resolvers: [resolver_1.PrebuildResolver],
    configuration: Object.assign(Object.assign({}, prebuildSettings), {
      prebuildScopes: {
        description: `Prebuild settings per package scope`,
        type: core_1.SettingsType.MAP,
        valueDefinition: {
          description: ``,
          type: core_1.SettingsType.SHAPE,
          properties: Object.assign({}, prebuildSettings)
        }
      }
    })
  }; // eslint-disable-next-line arca/no-default-export

  exports.default = plugin;

  /***/ }),
  /* 1 */
  /***/ (function(module, exports) {

  module.exports = require("@yarnpkg/core");

  /***/ }),
  /* 2 */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";


  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  const core_1 = __webpack_require__(1);

  const core_2 = __webpack_require__(1);

  exports.reduceDependency = async (dependency, project, locator, initialDependency, extra) => {
    if (dependency.name === 'bindings' && dependency.scope === null) {
      extra.resolveOptions.report.reportInfo(core_1.MessageName.UNNAMED, `Found a bindings dependency in ${core_2.structUtils.stringifyIdent(locator)}, re-routing to prebuild.`);
      const selector = `builtin<prebuild/${core_2.structUtils.stringifyIdent(locator)}>`;
      return core_2.structUtils.makeDescriptor(dependency, core_2.structUtils.makeRange({
        protocol: `prebuild:`,
        source: `prebuilt-bindings-${core_2.structUtils.slugifyIdent(locator)}`,
        selector,
        params: null
      }));
    }

    return dependency;
  };

  /***/ }),
  /* 3 */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";


  var __importStar = this && this.__importStar || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
  };

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  const core_1 = __webpack_require__(1);

  const core_2 = __webpack_require__(1);

  const core_3 = __webpack_require__(1);

  const fslib_1 = __webpack_require__(4);

  const libzip_1 = __webpack_require__(5);

  const utils = __importStar(__webpack_require__(11));

  class PrebuildFetcher {
    supports(locator, opts) {
      if (!locator.reference.startsWith(`prebuild:`)) return false;
      return true;
    }

    getLocalPath(locator, opts) {
      return null;
    }

    async fetch(locator, opts) {
      const expectedChecksum = null; // opts.checksums.get(locator.locatorHash) || null;

      const [packageFs, releaseFs, checksum] = await opts.cache.fetchPackageFromCache(locator, expectedChecksum, async () => {
        opts.report.reportInfoOnce(core_2.MessageName.FETCH_NOT_CACHED, `${core_3.structUtils.prettyLocator(opts.project.configuration, locator)} can't be found in the cache and will be fetched from the registry`);
        return await this.fetchPrebuild(locator, opts);
      });
      return {
        packageFs,
        releaseFs,
        prefixPath: core_3.structUtils.getIdentVendorPath(locator),
        localPath: this.getLocalPath(locator, opts),
        checksum
      };
    }

    async fetchPrebuild(locator, opts) {
      const {
        packageIdent
      } = utils.parseSpec(locator.reference);
      const electronVersion = await utils.getElectronVersion(opts.project);
      const nativeModule = await utils.getNativeModule(opts.project, packageIdent, locator);

      if (nativeModule === null) {
        throw new core_2.ReportError(core_2.MessageName.UNNAMED, `Could not find the native module that had a prebuild attempt`);
      }

      if (nativeModule.version === null) {
        throw new core_2.ReportError(core_2.MessageName.UNNAMED, `Could not find the native module version that had a prebuild attempt`);
      }

      const prebuildOptions = {
        abi: electronVersion ? utils.getElectronABI(electronVersion) : process.versions.modules,
        runtime: electronVersion ? 'electron' : 'node'
      };
      const prebuildUrl = await utils.getUrlOfPrebuild(nativeModule, opts, prebuildOptions);
      let prebuildPackage;

      try {
        prebuildPackage = await opts.fetcher.fetch(core_3.structUtils.makeLocator(core_3.structUtils.makeIdent(`prebuilds`, `${core_3.structUtils.slugifyIdent(nativeModule)}-v${nativeModule.version}-${process.platform}-${process.arch}-${prebuildOptions.runtime}-${prebuildOptions.abi}`), prebuildUrl), opts);
      } catch (e) {
        opts.report.reportInfo(core_2.MessageName.UNNAMED, `Error fetching ${prebuildUrl}`);
        throw e;
      } // opts.report.reportInfo(MessageName.UNNAMED, `Fetched prebuild for ${structUtils.stringifyIdent(nativeModule)} version ${nativeModule.version} on runtime electron version ${electronVersion}`)


      const cancellationSignal = {
        cancel: false
      };
      let nodeContents = null;
      let bindingsLocation = ""; // Walk the downloaded prebuild directory, find the file

      await core_1.miscUtils.releaseAfterUseAsync(async () => {
        await utils.walk(prebuildPackage.packageFs, '.', async (filesystem, filepath) => {
          nodeContents = await filesystem.readFilePromise(filepath);
          bindingsLocation = filepath; // send the break signal

          cancellationSignal.cancel = true;
        }, cancellationSignal);
      }, prebuildPackage.releaseFs);

      if (nodeContents === null) {
        throw new core_2.ReportError(core_2.MessageName.UNNAMED, `Was unable to find node file in prebuild package for "${core_3.structUtils.stringifyIdent(nativeModule)}"`);
      }

      const tmpDir = await fslib_1.xfs.mktempPromise();
      const tmpFile = fslib_1.ppath.join(tmpDir, `prebuilt.zip`);
      const prefixPath = core_3.structUtils.getIdentVendorPath(locator);
      const libzip = await libzip_1.getLibzipPromise();
      const zipPackage = new fslib_1.ZipFS(tmpFile, {
        libzip,
        create: true
      });
      await zipPackage.mkdirpPromise(prefixPath);
      const generatedPackage = new fslib_1.CwdFS(prefixPath, {
        baseFs: zipPackage
      }); // Write our package.json

      await generatedPackage.writeJsonPromise('package.json', {
        name: core_3.structUtils.slugifyLocator(locator),
        main: "./index.js"
      }); // write our index.js

      const templateIndex = `// Automatically generated bindings file
  // Bindings taken from ${bindingsLocation}

  const staticRequire = require("./bindings.node");
  module.exports = (fileLookingFor) => {
    console.log("was looking for file", fileLookingFor, "but we replaced it!");

    return staticRequire;
  };
      `;
      await generatedPackage.writeFilePromise('index.js', templateIndex); // Write the file into the generated package

      await generatedPackage.writeFilePromise('bindings.node', nodeContents);
      return zipPackage;
    }

  }

  exports.PrebuildFetcher = PrebuildFetcher;

  /***/ }),
  /* 4 */
  /***/ (function(module, exports) {

  module.exports = require("@yarnpkg/fslib");

  /***/ }),
  /* 5 */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";


  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  const makeInterface_1 = __webpack_require__(6);

  let mod = null;

  function getLibzipSync() {
    if (mod === null) mod = makeInterface_1.makeInterface(__webpack_require__(7));
    return mod;
  }

  exports.getLibzipSync = getLibzipSync;

  async function getLibzipPromise() {
    return getLibzipSync();
  }

  exports.getLibzipPromise = getLibzipPromise;

  /***/ }),
  /* 6 */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";


  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  const number64 = [`number`, `number`];

  exports.makeInterface = libzip => ({
    // Those are getters because they can change after memory growth
    get HEAP8() {
      return libzip.HEAP8;
    },

    get HEAPU8() {
      return libzip.HEAPU8;
    },

    ZIP_CHECKCONS: 4,
    ZIP_CREATE: 1,
    ZIP_EXCL: 2,
    ZIP_TRUNCATE: 8,
    ZIP_RDONLY: 16,
    ZIP_FL_OVERWRITE: 8192,
    ZIP_OPSYS_DOS: 0x00,
    ZIP_OPSYS_AMIGA: 0x01,
    ZIP_OPSYS_OPENVMS: 0x02,
    ZIP_OPSYS_UNIX: 0x03,
    ZIP_OPSYS_VM_CMS: 0x04,
    ZIP_OPSYS_ATARI_ST: 0x05,
    ZIP_OPSYS_OS_2: 0x06,
    ZIP_OPSYS_MACINTOSH: 0x07,
    ZIP_OPSYS_Z_SYSTEM: 0x08,
    ZIP_OPSYS_CPM: 0x09,
    ZIP_OPSYS_WINDOWS_NTFS: 0x0a,
    ZIP_OPSYS_MVS: 0x0b,
    ZIP_OPSYS_VSE: 0x0c,
    ZIP_OPSYS_ACORN_RISC: 0x0d,
    ZIP_OPSYS_VFAT: 0x0e,
    ZIP_OPSYS_ALTERNATE_MVS: 0x0f,
    ZIP_OPSYS_BEOS: 0x10,
    ZIP_OPSYS_TANDEM: 0x11,
    ZIP_OPSYS_OS_400: 0x12,
    ZIP_OPSYS_OS_X: 0x13,
    uint08S: libzip._malloc(1),
    uint16S: libzip._malloc(2),
    uint32S: libzip._malloc(4),
    uint64S: libzip._malloc(8),
    malloc: libzip._malloc,
    free: libzip._free,
    getValue: libzip.getValue,
    open: libzip.cwrap(`zip_open`, `number`, [`string`, `number`, `number`]),
    openFromSource: libzip.cwrap(`zip_open_from_source`, `number`, [`number`, `number`, `number`]),
    close: libzip.cwrap(`zip_close`, `number`, [`number`]),
    discard: libzip.cwrap(`zip_discard`, null, [`number`]),
    getError: libzip.cwrap(`zip_get_error`, `number`, [`number`]),
    getName: libzip.cwrap(`zip_get_name`, `string`, [`number`, `number`, `number`]),
    getNumEntries: libzip.cwrap(`zip_get_num_entries`, `number`, [`number`, `number`]),
    stat: libzip.cwrap(`zip_stat`, `number`, [`number`, `string`, `number`, `number`]),
    statIndex: libzip.cwrap(`zip_stat_index`, `number`, [`number`, ...number64, `number`, `number`]),
    fopen: libzip.cwrap(`zip_fopen`, `number`, [`number`, `string`, `number`]),
    fopenIndex: libzip.cwrap(`zip_fopen_index`, `number`, [`number`, ...number64, `number`]),
    fread: libzip.cwrap(`zip_fread`, `number`, [`number`, `number`, `number`, `number`]),
    fclose: libzip.cwrap(`zip_fclose`, `number`, [`number`]),
    dir: {
      add: libzip.cwrap(`zip_dir_add`, `number`, [`number`, `string`])
    },
    file: {
      add: libzip.cwrap(`zip_file_add`, `number`, [`number`, `string`, `number`, `number`]),
      getError: libzip.cwrap(`zip_file_get_error`, `number`, [`number`]),
      getExternalAttributes: libzip.cwrap(`zip_file_get_external_attributes`, `number`, [`number`, ...number64, `number`, `number`, `number`]),
      setExternalAttributes: libzip.cwrap(`zip_file_set_external_attributes`, `number`, [`number`, ...number64, `number`, `number`, `number`]),
      setMtime: libzip.cwrap(`zip_file_set_mtime`, `number`, [`number`, ...number64, `number`, `number`])
    },
    error: {
      initWithCode: libzip.cwrap(`zip_error_init_with_code`, null, [`number`, `number`]),
      strerror: libzip.cwrap(`zip_error_strerror`, `string`, [`number`])
    },
    name: {
      locate: libzip.cwrap(`zip_name_locate`, `number`, [`number`, `string`, `number`])
    },
    source: {
      fromUnattachedBuffer: libzip.cwrap(`zip_source_buffer_create`, `number`, [`number`, `number`, `number`, `number`]),
      fromBuffer: libzip.cwrap(`zip_source_buffer`, `number`, [`number`, `number`, ...number64, `number`]),
      free: libzip.cwrap(`zip_source_free`, null, [`number`]),
      setMtime: libzip.cwrap(`zip_source_set_mtime`, `number`, [`number`, `number`])
    },
    struct: {
      stat: libzip.cwrap(`zipstruct_stat`, `number`, []),
      statS: libzip.cwrap(`zipstruct_statS`, `number`, []),
      statName: libzip.cwrap(`zipstruct_stat_name`, `string`, [`number`]),
      statIndex: libzip.cwrap(`zipstruct_stat_index`, `number`, [`number`]),
      statSize: libzip.cwrap(`zipstruct_stat_size`, `number`, [`number`]),
      statMtime: libzip.cwrap(`zipstruct_stat_mtime`, `number`, [`number`]),
      error: libzip.cwrap(`zipstruct_error`, `number`, []),
      errorS: libzip.cwrap(`zipstruct_errorS`, `number`, [])
    }
  });

  /***/ }),
  /* 7 */
  /***/ (function(module, exports, __webpack_require__) {

  var frozenFs = Object.assign({}, __webpack_require__(8));
  var Module = typeof Module !== "undefined" ? Module : {};
  var moduleOverrides = {};
  var key;
  for (key in Module) {
    if (Module.hasOwnProperty(key)) {
      moduleOverrides[key] = Module[key];
    }
  }
  var arguments_ = [];
  var thisProgram = "./this.program";
  var quit_ = function(status, toThrow) {
    throw toThrow;
  };
  var ENVIRONMENT_IS_WORKER = false;
  var ENVIRONMENT_IS_NODE = true;
  var ENVIRONMENT_HAS_NODE = ENVIRONMENT_IS_NODE;
  var scriptDirectory = "";
  function locateFile(path) {
    if (Module["locateFile"]) {
      return Module["locateFile"](path, scriptDirectory);
    }
    return scriptDirectory + path;
  }
  var read_, readBinary;
  var nodeFS;
  var nodePath;
  if (ENVIRONMENT_IS_NODE) {
    scriptDirectory = __dirname + "/";
    read_ = function shell_read(filename, binary) {
      var ret;
      ret = tryParseAsDataURI(filename);
      if (ret) {
        return binary ? ret : ret.toString();
      }
      if (!nodeFS) nodeFS = frozenFs;
      if (!nodePath) nodePath = __webpack_require__(9);
      filename = nodePath["normalize"](filename);
      return nodeFS["readFileSync"](filename, binary ? null : "utf8");
    };
    readBinary = function readBinary(filename) {
      var ret = read_(filename, true);
      if (!ret.buffer) {
        ret = new Uint8Array(ret);
      }
      assert(ret.buffer);
      return ret;
    };
    if (process["argv"].length > 1) {
      thisProgram = process["argv"][1].replace(/\\/g, "/");
    }
    arguments_ = process["argv"].slice(2);
    if (true) {
      module["exports"] = Module;
    }
    (function() {})("uncaughtException", function(ex) {
      if (!(ex instanceof ExitStatus)) {
        throw ex;
      }
    });
    (function() {})("unhandledRejection", abort);
    quit_ = function(status) {
      process["exit"](status);
    };
    Module["inspect"] = function() {
      return "[Emscripten Module object]";
    };
  } else {
  }
  var out = Module["print"] || console.log.bind(console);
  var err = Module["printErr"] || console.warn.bind(console);
  for (key in moduleOverrides) {
    if (moduleOverrides.hasOwnProperty(key)) {
      Module[key] = moduleOverrides[key];
    }
  }
  moduleOverrides = null;
  if (Module["arguments"]) arguments_ = Module["arguments"];
  if (Module["thisProgram"]) thisProgram = Module["thisProgram"];
  if (Module["quit"]) quit_ = Module["quit"];
  function dynamicAlloc(size) {
    var ret = HEAP32[DYNAMICTOP_PTR >> 2];
    var end = (ret + size + 15) & -16;
    if (end > _emscripten_get_heap_size()) {
      abort();
    }
    HEAP32[DYNAMICTOP_PTR >> 2] = end;
    return ret;
  }
  function getNativeTypeSize(type) {
    switch (type) {
      case "i1":
      case "i8":
        return 1;
      case "i16":
        return 2;
      case "i32":
        return 4;
      case "i64":
        return 8;
      case "float":
        return 4;
      case "double":
        return 8;
      default: {
        if (type[type.length - 1] === "*") {
          return 4;
        } else if (type[0] === "i") {
          var bits = parseInt(type.substr(1));
          assert(
            bits % 8 === 0,
            "getNativeTypeSize invalid bits " + bits + ", type " + type
          );
          return bits / 8;
        } else {
          return 0;
        }
      }
    }
  }
  var tempRet0 = 0;
  var setTempRet0 = function(value) {
    tempRet0 = value;
  };
  var wasmBinary;
  if (Module["wasmBinary"]) wasmBinary = Module["wasmBinary"];
  var noExitRuntime;
  if (Module["noExitRuntime"]) noExitRuntime = Module["noExitRuntime"];
  if (typeof WebAssembly !== "object") {
    err("no native wasm support detected");
  }
  function setValue(ptr, value, type, noSafe) {
    type = type || "i8";
    if (type.charAt(type.length - 1) === "*") type = "i32";
    switch (type) {
      case "i1":
        HEAP8[ptr >> 0] = value;
        break;
      case "i8":
        HEAP8[ptr >> 0] = value;
        break;
      case "i16":
        HEAP16[ptr >> 1] = value;
        break;
      case "i32":
        HEAP32[ptr >> 2] = value;
        break;
      case "i64":
        (tempI64 = [
          value >>> 0,
          ((tempDouble = value),
          +Math_abs(tempDouble) >= 1
            ? tempDouble > 0
              ? (Math_min(+Math_floor(tempDouble / 4294967296), 4294967295) |
                  0) >>>
                0
              : ~~+Math_ceil(
                  (tempDouble - +(~~tempDouble >>> 0)) / 4294967296
                ) >>> 0
            : 0)
        ]),
          (HEAP32[ptr >> 2] = tempI64[0]),
          (HEAP32[(ptr + 4) >> 2] = tempI64[1]);
        break;
      case "float":
        HEAPF32[ptr >> 2] = value;
        break;
      case "double":
        HEAPF64[ptr >> 3] = value;
        break;
      default:
        abort("invalid type for setValue: " + type);
    }
  }
  function getValue(ptr, type, noSafe) {
    type = type || "i8";
    if (type.charAt(type.length - 1) === "*") type = "i32";
    switch (type) {
      case "i1":
        return HEAP8[ptr >> 0];
      case "i8":
        return HEAP8[ptr >> 0];
      case "i16":
        return HEAP16[ptr >> 1];
      case "i32":
        return HEAP32[ptr >> 2];
      case "i64":
        return HEAP32[ptr >> 2];
      case "float":
        return HEAPF32[ptr >> 2];
      case "double":
        return HEAPF64[ptr >> 3];
      default:
        abort("invalid type for getValue: " + type);
    }
    return null;
  }
  var wasmMemory;
  var wasmTable = new WebAssembly.Table({
    initial: 31,
    maximum: 31 + 0,
    element: "anyfunc"
  });
  var ABORT = false;
  var EXITSTATUS = 0;
  function assert(condition, text) {
    if (!condition) {
      abort("Assertion failed: " + text);
    }
  }
  function getCFunc(ident) {
    var func = Module["_" + ident];
    assert(
      func,
      "Cannot call unknown function " + ident + ", make sure it is exported"
    );
    return func;
  }
  function ccall(ident, returnType, argTypes, args, opts) {
    var toC = {
      string: function(str) {
        var ret = 0;
        if (str !== null && str !== undefined && str !== 0) {
          var len = (str.length << 2) + 1;
          ret = stackAlloc(len);
          stringToUTF8(str, ret, len);
        }
        return ret;
      },
      array: function(arr) {
        var ret = stackAlloc(arr.length);
        writeArrayToMemory(arr, ret);
        return ret;
      }
    };
    function convertReturnValue(ret) {
      if (returnType === "string") return UTF8ToString(ret);
      if (returnType === "boolean") return Boolean(ret);
      return ret;
    }
    var func = getCFunc(ident);
    var cArgs = [];
    var stack = 0;
    if (args) {
      for (var i = 0; i < args.length; i++) {
        var converter = toC[argTypes[i]];
        if (converter) {
          if (stack === 0) stack = stackSave();
          cArgs[i] = converter(args[i]);
        } else {
          cArgs[i] = args[i];
        }
      }
    }
    var ret = func.apply(null, cArgs);
    ret = convertReturnValue(ret);
    if (stack !== 0) stackRestore(stack);
    return ret;
  }
  function cwrap(ident, returnType, argTypes, opts) {
    argTypes = argTypes || [];
    var numericArgs = argTypes.every(function(type) {
      return type === "number";
    });
    var numericRet = returnType !== "string";
    if (numericRet && numericArgs && !opts) {
      return getCFunc(ident);
    }
    return function() {
      return ccall(ident, returnType, argTypes, arguments, opts);
    };
  }
  var ALLOC_NORMAL = 0;
  var ALLOC_NONE = 3;
  function allocate(slab, types, allocator, ptr) {
    var zeroinit, size;
    if (typeof slab === "number") {
      zeroinit = true;
      size = slab;
    } else {
      zeroinit = false;
      size = slab.length;
    }
    var singleType = typeof types === "string" ? types : null;
    var ret;
    if (allocator == ALLOC_NONE) {
      ret = ptr;
    } else {
      ret = [_malloc, stackAlloc, dynamicAlloc][allocator](
        Math.max(size, singleType ? 1 : types.length)
      );
    }
    if (zeroinit) {
      var stop;
      ptr = ret;
      assert((ret & 3) == 0);
      stop = ret + (size & ~3);
      for (; ptr < stop; ptr += 4) {
        HEAP32[ptr >> 2] = 0;
      }
      stop = ret + size;
      while (ptr < stop) {
        HEAP8[ptr++ >> 0] = 0;
      }
      return ret;
    }
    if (singleType === "i8") {
      if (slab.subarray || slab.slice) {
        HEAPU8.set(slab, ret);
      } else {
        HEAPU8.set(new Uint8Array(slab), ret);
      }
      return ret;
    }
    var i = 0,
      type,
      typeSize,
      previousType;
    while (i < size) {
      var curr = slab[i];
      type = singleType || types[i];
      if (type === 0) {
        i++;
        continue;
      }
      if (type == "i64") type = "i32";
      setValue(ret + i, curr, type);
      if (previousType !== type) {
        typeSize = getNativeTypeSize(type);
        previousType = type;
      }
      i += typeSize;
    }
    return ret;
  }
  var UTF8Decoder =
    typeof TextDecoder !== "undefined" ? new TextDecoder("utf8") : undefined;
  function UTF8ArrayToString(u8Array, idx, maxBytesToRead) {
    var endIdx = idx + maxBytesToRead;
    var endPtr = idx;
    while (u8Array[endPtr] && !(endPtr >= endIdx)) ++endPtr;
    if (endPtr - idx > 16 && u8Array.subarray && UTF8Decoder) {
      return UTF8Decoder.decode(u8Array.subarray(idx, endPtr));
    } else {
      var str = "";
      while (idx < endPtr) {
        var u0 = u8Array[idx++];
        if (!(u0 & 128)) {
          str += String.fromCharCode(u0);
          continue;
        }
        var u1 = u8Array[idx++] & 63;
        if ((u0 & 224) == 192) {
          str += String.fromCharCode(((u0 & 31) << 6) | u1);
          continue;
        }
        var u2 = u8Array[idx++] & 63;
        if ((u0 & 240) == 224) {
          u0 = ((u0 & 15) << 12) | (u1 << 6) | u2;
        } else {
          u0 = ((u0 & 7) << 18) | (u1 << 12) | (u2 << 6) | (u8Array[idx++] & 63);
        }
        if (u0 < 65536) {
          str += String.fromCharCode(u0);
        } else {
          var ch = u0 - 65536;
          str += String.fromCharCode(55296 | (ch >> 10), 56320 | (ch & 1023));
        }
      }
    }
    return str;
  }
  function UTF8ToString(ptr, maxBytesToRead) {
    return ptr ? UTF8ArrayToString(HEAPU8, ptr, maxBytesToRead) : "";
  }
  function stringToUTF8Array(str, outU8Array, outIdx, maxBytesToWrite) {
    if (!(maxBytesToWrite > 0)) return 0;
    var startIdx = outIdx;
    var endIdx = outIdx + maxBytesToWrite - 1;
    for (var i = 0; i < str.length; ++i) {
      var u = str.charCodeAt(i);
      if (u >= 55296 && u <= 57343) {
        var u1 = str.charCodeAt(++i);
        u = (65536 + ((u & 1023) << 10)) | (u1 & 1023);
      }
      if (u <= 127) {
        if (outIdx >= endIdx) break;
        outU8Array[outIdx++] = u;
      } else if (u <= 2047) {
        if (outIdx + 1 >= endIdx) break;
        outU8Array[outIdx++] = 192 | (u >> 6);
        outU8Array[outIdx++] = 128 | (u & 63);
      } else if (u <= 65535) {
        if (outIdx + 2 >= endIdx) break;
        outU8Array[outIdx++] = 224 | (u >> 12);
        outU8Array[outIdx++] = 128 | ((u >> 6) & 63);
        outU8Array[outIdx++] = 128 | (u & 63);
      } else {
        if (outIdx + 3 >= endIdx) break;
        outU8Array[outIdx++] = 240 | (u >> 18);
        outU8Array[outIdx++] = 128 | ((u >> 12) & 63);
        outU8Array[outIdx++] = 128 | ((u >> 6) & 63);
        outU8Array[outIdx++] = 128 | (u & 63);
      }
    }
    outU8Array[outIdx] = 0;
    return outIdx - startIdx;
  }
  function stringToUTF8(str, outPtr, maxBytesToWrite) {
    return stringToUTF8Array(str, HEAPU8, outPtr, maxBytesToWrite);
  }
  function lengthBytesUTF8(str) {
    var len = 0;
    for (var i = 0; i < str.length; ++i) {
      var u = str.charCodeAt(i);
      if (u >= 55296 && u <= 57343)
        u = (65536 + ((u & 1023) << 10)) | (str.charCodeAt(++i) & 1023);
      if (u <= 127) ++len;
      else if (u <= 2047) len += 2;
      else if (u <= 65535) len += 3;
      else len += 4;
    }
    return len;
  }
  var UTF16Decoder =
    typeof TextDecoder !== "undefined" ? new TextDecoder("utf-16le") : undefined;
  function writeArrayToMemory(array, buffer) {
    HEAP8.set(array, buffer);
  }
  var WASM_PAGE_SIZE = 65536;
  function alignUp(x, multiple) {
    if (x % multiple > 0) {
      x += multiple - (x % multiple);
    }
    return x;
  }
  var buffer, HEAP8, HEAPU8, HEAP16, HEAPU16, HEAP32, HEAPU32, HEAPF32, HEAPF64;
  function updateGlobalBufferAndViews(buf) {
    buffer = buf;
    Module["HEAP8"] = HEAP8 = new Int8Array(buf);
    Module["HEAP16"] = HEAP16 = new Int16Array(buf);
    Module["HEAP32"] = HEAP32 = new Int32Array(buf);
    Module["HEAPU8"] = HEAPU8 = new Uint8Array(buf);
    Module["HEAPU16"] = HEAPU16 = new Uint16Array(buf);
    Module["HEAPU32"] = HEAPU32 = new Uint32Array(buf);
    Module["HEAPF32"] = HEAPF32 = new Float32Array(buf);
    Module["HEAPF64"] = HEAPF64 = new Float64Array(buf);
  }
  var DYNAMIC_BASE = 5263680,
    DYNAMICTOP_PTR = 20640;
  var INITIAL_TOTAL_MEMORY = Module["TOTAL_MEMORY"] || 16777216;
  if (Module["wasmMemory"]) {
    wasmMemory = Module["wasmMemory"];
  } else {
    wasmMemory = new WebAssembly.Memory({
      initial: INITIAL_TOTAL_MEMORY / WASM_PAGE_SIZE
    });
  }
  if (wasmMemory) {
    buffer = wasmMemory.buffer;
  }
  INITIAL_TOTAL_MEMORY = buffer.byteLength;
  updateGlobalBufferAndViews(buffer);
  HEAP32[DYNAMICTOP_PTR >> 2] = DYNAMIC_BASE;
  function callRuntimeCallbacks(callbacks) {
    while (callbacks.length > 0) {
      var callback = callbacks.shift();
      if (typeof callback == "function") {
        callback();
        continue;
      }
      var func = callback.func;
      if (typeof func === "number") {
        if (callback.arg === undefined) {
          Module["dynCall_v"](func);
        } else {
          Module["dynCall_vi"](func, callback.arg);
        }
      } else {
        func(callback.arg === undefined ? null : callback.arg);
      }
    }
  }
  var __ATPRERUN__ = [];
  var __ATINIT__ = [];
  var __ATMAIN__ = [];
  var __ATPOSTRUN__ = [];
  var runtimeInitialized = false;
  function preRun() {
    if (Module["preRun"]) {
      if (typeof Module["preRun"] == "function")
        Module["preRun"] = [Module["preRun"]];
      while (Module["preRun"].length) {
        addOnPreRun(Module["preRun"].shift());
      }
    }
    callRuntimeCallbacks(__ATPRERUN__);
  }
  function initRuntime() {
    runtimeInitialized = true;
    if (!Module["noFSInit"] && !FS.init.initialized) FS.init();
    TTY.init();
    callRuntimeCallbacks(__ATINIT__);
  }
  function preMain() {
    FS.ignorePermissions = false;
    callRuntimeCallbacks(__ATMAIN__);
  }
  function postRun() {
    if (Module["postRun"]) {
      if (typeof Module["postRun"] == "function")
        Module["postRun"] = [Module["postRun"]];
      while (Module["postRun"].length) {
        addOnPostRun(Module["postRun"].shift());
      }
    }
    callRuntimeCallbacks(__ATPOSTRUN__);
  }
  function addOnPreRun(cb) {
    __ATPRERUN__.unshift(cb);
  }
  function addOnPostRun(cb) {
    __ATPOSTRUN__.unshift(cb);
  }
  var Math_abs = Math.abs;
  var Math_ceil = Math.ceil;
  var Math_floor = Math.floor;
  var Math_min = Math.min;
  var runDependencies = 0;
  var runDependencyWatcher = null;
  var dependenciesFulfilled = null;
  function getUniqueRunDependency(id) {
    return id;
  }
  function addRunDependency(id) {
    runDependencies++;
    if (Module["monitorRunDependencies"]) {
      Module["monitorRunDependencies"](runDependencies);
    }
  }
  function removeRunDependency(id) {
    runDependencies--;
    if (Module["monitorRunDependencies"]) {
      Module["monitorRunDependencies"](runDependencies);
    }
    if (runDependencies == 0) {
      if (runDependencyWatcher !== null) {
        clearInterval(runDependencyWatcher);
        runDependencyWatcher = null;
      }
      if (dependenciesFulfilled) {
        var callback = dependenciesFulfilled;
        dependenciesFulfilled = null;
        callback();
      }
    }
  }
  Module["preloadedImages"] = {};
  Module["preloadedAudios"] = {};
  function abort(what) {
    if (Module["onAbort"]) {
      Module["onAbort"](what);
    }
    what += "";
    out(what);
    err(what);
    ABORT = true;
    EXITSTATUS = 1;
    what = "abort(" + what + "). Build with -s ASSERTIONS=1 for more info.";
    throw new WebAssembly.RuntimeError(what);
  }
  var dataURIPrefix = "data:application/octet-stream;base64,";
  function isDataURI(filename) {
    return String.prototype.startsWith
      ? filename.startsWith(dataURIPrefix)
      : filename.indexOf(dataURIPrefix) === 0;
  }
  var wasmBinaryFile =
    "data:application/octet-stream;base64,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KAIkQQFGBEAgASgCDBBmCwJAIAEoAgwoAixFDQAgASgCDC0AKEEBcQ0AIAEoAgwoAiwgASgCDBD2AgsgASgCDEEAQgBBBRAkGiABKAIMKAIABEAgASgCDCgCABAeCyABKAIMEBgLIAFBEGokAAuBAgEBfyMAQRBrIgEkACABIAA2AgwgASABKAIMKAIcNgIEIAEoAgQQ2gIgASABKAIEKAIUNgIIIAEoAgggASgCDCgCEEsEQCABIAEoAgwoAhA2AggLAkAgASgCCEUNACABKAIMKAIMIAEoAgQoAhAgASgCCBAcGiABKAIMIgAgASgCCCAAKAIMajYCDCABKAIEIgAgASgCCCAAKAIQajYCECABKAIMIgAgASgCCCAAKAIUajYCFCABKAIMIgAgACgCECABKAIIazYCECABKAIEIgAgACgCFCABKAIIazYCFCABKAIEKAIUDQAgASgCBCABKAIEKAIINgIQCyABQRBqJAALYAEBfyMAQRBrIgEkACABIAA2AgggASABKAIIQgIQITYCBAJAIAEoAgRFBEAgAUEAOwEODAELIAEgASgCBC0AACABKAIELQABQQh0ajsBDgsgAS8BDiEAIAFBEGokACAAC1oBAX8jAEEgayICJAAgAiAANgIcIAIgATcDECACIAIoAhwgAikDEBDKATYCDCACKAIMBEAgAigCHCIAIAIpAxAgACkDEHw3AxALIAIoAgwhACACQSBqJAAgAAtvAQF/IwBBEGsiAiQAIAIgADYCCCACIAE7AQYgAiACKAIIQgIQITYCAAJAIAIoAgBFBEAgAkF/NgIMDAELIAIoAgAgAi8BBjoAACACKAIAIAIvAQZBCHU6AAEgAkEANgIMCyACKAIMGiACQRBqJAALjwEBAX8jAEEQayICJAAgAiAANgIIIAIgATYCBCACIAIoAghCBBAhNgIAAkAgAigCAEUEQCACQX82AgwMAQsgAigCACACKAIEOgAAIAIoAgAgAigCBEEIdjoAASACKAIAIAIoAgRBEHY6AAIgAigCACACKAIEQRh2OgADIAJBADYCDAsgAigCDBogAkEQaiQAC7YCAQF/IwBBMGsiBCQAIAQgADYCJCAEIAE2AiAgBCACNwMYIAQgAzYCFAJAIAQoAiQpAxhCASAEKAIUrYaDUARAIAQoAiRBDGpBHEEAEBcgBEJ/NwMoDAELAkAgBCgCJCgCAEUEQCAEIAQoAiQoAgggBCgCICAEKQMYIAQoAhQgBCgCJCgCBBEDADcDCAwBCyAEIAQoAiQoAgAgBCgCJCgCCCAEKAIgIAQpAxggBCgCFCAEKAIkKAIEEQQANwMICyAEKQMIQgBTBEACQCAEKAIUQQRGDQAgBCgCFEEORg0AAkAgBCgCJCAEQghBBBAkQgBTBEAgBCgCJEEMakEUQQAQFwwBCyAEKAIkQQxqIAQoAgAgBCgCBBAXCwsLIAQgBCkDCDcDKAsgBCkDKCECIARBMGokACACCxcAIAAtAABBIHFFBEAgASACIAAQdBoLC1ABAX8jAEEQayIBJAAgASAANgIMA0AgASgCDARAIAEgASgCDCgCADYCCCABKAIMKAIMEBggASgCDBAYIAEgASgCCDYCDAwBCwsgAUEQaiQAC3cBAX8jAEGAAmsiBSQAAkAgAiADTA0AIARBgMAEcQ0AIAUgASACIANrIgRBgAIgBEGAAkkiARsQNCAAIAUgAQR/IAQFIAIgA2shAQNAIAAgBUGAAhAlIARBgH5qIgRB/wFLDQALIAFB/wFxCxAlCyAFQYACaiQAC30BAX8jAEEQayIBJAAgASAANgIMIAEoAgwEQCABQgA3AwADQCABKQMAIAEoAgwpAwhaRQRAIAEoAgwoAgAgASkDAKdBBHRqEGMgASABKQMAQgF8NwMADAELCyABKAIMKAIAEBggASgCDCgCKBApIAEoAgwQGAsgAUEQaiQACz4BAX8jAEEQayIBJAAgASAANgIMIAEoAgwEQCABKAIMKAIAEBggASgCDCgCDBAYIAEoAgwQGAsgAUEQaiQAC7gIAQF/IwBBMGsiBCQAIAQgADYCLCAEIAE2AiggBCACNgIkIAQgAzYCICAEQQA2AhQCQCAEKAIsKAKEAUEASgRAIAQoAiwoAgAoAixBAkYEQCAEKAIsENgCIQAgBCgCLCgCACAANgIsCyAEKAIsIAQoAixBmBZqEHkgBCgCLCAEKAIsQaQWahB5IAQgBCgCLBDXAjYCFCAEIAQoAiwoAqgtQQpqQQN2NgIcIAQgBCgCLCgCrC1BCmpBA3Y2AhggBCgCGCAEKAIcTQRAIAQgBCgCGDYCHAsMAQsgBCAEKAIkQQVqIgA2AhggBCAANgIcCwJAAkAgBCgCJEEEaiAEKAIcSw0AIAQoAihFDQAgBCgCLCAEKAIoIAQoAiQgBCgCIBBWDAELAkACQCAEKAIsKAKIAUEERwRAIAQoAhggBCgCHEcNAQsgBEEDNgIQAkAgBCgCLCgCvC1BECAEKAIQa0oEQCAEIAQoAiBBAmo2AgwgBCgCLCIAIAAvAbgtIAQoAgxB//8DcSAEKAIsKAK8LXRyOwG4LSAEKAIsLwG4LUH/AXEhASAEKAIsKAIIIQIgBCgCLCIDKAIUIQAgAyAAQQFqNgIUIAAgAmogAToAACAEKAIsLwG4LUEIdSEBIAQoAiwoAgghAiAEKAIsIgMoAhQhACADIABBAWo2AhQgACACaiABOgAAIAQoAiwgBCgCDEH//wNxQRAgBCgCLCgCvC1rdTsBuC0gBCgCLCIAIAAoArwtIAQoAhBBEGtqNgK8LQwBCyAEKAIsIgAgAC8BuC0gBCgCIEECakH//wNxIAQoAiwoArwtdHI7AbgtIAQoAiwiACAEKAIQIAAoArwtajYCvC0LIAQoAixB4N8AQeDoABCrAQwBCyAEQQM2AggCQCAEKAIsKAK8LUEQIAQoAghrSgRAIAQgBCgCIEEEajYCBCAEKAIsIgAgAC8BuC0gBCgCBEH//wNxIAQoAiwoArwtdHI7AbgtIAQoAiwvAbgtQf8BcSEBIAQoAiwoAgghAiAEKAIsIgMoAhQhACADIABBAWo2AhQgACACaiABOgAAIAQoAiwvAbgtQQh1IQEgBCgCLCgCCCECIAQoAiwiAygCFCEAIAMgAEEBajYCFCAAIAJqIAE6AAAgBCgCLCAEKAIEQf//A3FBECAEKAIsKAK8LWt1OwG4LSAEKAIsIgAgACgCvC0gBCgCCEEQa2o2ArwtDAELIAQoAiwiACAALwG4LSAEKAIgQQRqQf//A3EgBCgCLCgCvC10cjsBuC0gBCgCLCIAIAQoAgggACgCvC1qNgK8LQsgBCgCLCAEKAIsKAKcFkEBaiAEKAIsKAKoFkEBaiAEKAIUQQFqENYCIAQoAiwgBCgCLEGUAWogBCgCLEGIE2oQqwELCyAEKAIsEK4BIAQoAiAEQCAEKAIsEK0BCyAEQTBqJAAL1AEBAX8jAEEgayICJAAgAiAANgIYIAIgATcDECACIAIoAhhFOgAPAkAgAigCGEUEQCACIAIpAxCnEBsiADYCGCAARQRAIAJBADYCHAwCCwsgAkEYEBsiADYCCCAARQRAIAItAA9BAXEEQCACKAIYEBgLIAJBADYCHAwBCyACKAIIQQE6AAAgAigCCCACKAIYNgIEIAIoAgggAikDEDcDCCACKAIIQgA3AxAgAigCCCACLQAPQQFxOgABIAIgAigCCDYCHAsgAigCHCEAIAJBIGokACAAC3gBAX8jAEEQayIBJAAgASAANgIIIAEgASgCCEIEECE2AgQCQCABKAIERQRAIAFBADYCDAwBCyABIAEoAgQtAAAgASgCBC0AASABKAIELQACIAEoAgQtAANBCHRqQQh0akEIdGo2AgwLIAEoAgwhACABQRBqJAAgAAvUAQEBfyMAQTBrIgMkACADIAA2AiggAyABNwMgIAMgAjYCHAJAIAMoAigtAChBAXEEQCADQX82AiwMAQsCQCADKAIoKAIgQQBLBEAgAygCHEUNASADKAIcQQFGDQEgAygCHEECRg0BCyADKAIoQQxqQRJBABAXIANBfzYCLAwBCyADIAMpAyA3AwggAyADKAIcNgIQIAMoAiggA0EIakIQQQYQJEIAUwRAIANBfzYCLAwBCyADKAIoQQA6ADQgA0EANgIsCyADKAIsIQAgA0EwaiQAIAALYQEBfyMAQRBrIgIgADYCCCACIAE3AwACQCACKQMAIAIoAggpAwhWBEAgAigCCEEAOgAAIAJBfzYCDAwBCyACKAIIQQE6AAAgAigCCCACKQMANwMQIAJBADYCDAsgAigCDAvvAQEBfyMAQSBrIgIkACACIAA2AhggAiABNwMQIAIgAigCGEIIECE2AgwCQCACKAIMRQRAIAJBfzYCHAwBCyACKAIMIAIpAxBC/wGDPAAAIAIoAgwgAikDEEIIiEL/AYM8AAEgAigCDCACKQMQQhCIQv8BgzwAAiACKAIMIAIpAxBCGIhC/wGDPAADIAIoAgwgAikDEEIgiEL/AYM8AAQgAigCDCACKQMQQiiIQv8BgzwABSACKAIMIAIpAxBCMIhC/wGDPAAGIAIoAgwgAikDEEI4iEL/AYM8AAcgAkEANgIcCyACKAIcGiACQSBqJAALjwEBA38gACEBAkACQCAAQQNxRQ0AIAAtAABFBEAMAgsDQCABQQFqIgFBA3FFDQEgAS0AAA0ACwwBCwNAIAEiAkEEaiEBIAIoAgAiA0F/cyADQf/9+3dqcUGAgYKEeHFFDQALIANB/wFxRQRAIAIhAQwBCwNAIAItAAEhAyACQQFqIgEhAiADDQALCyABIABrC4sDAQF/IwBBMGsiAyQAIAMgADYCJCADIAE2AiAgAyACNwMYAkAgAygCJC0AKEEBcQRAIANCfzcDKAwBCwJAAkAgAygCJCgCIEEATQ0AIAMpAxhC////////////AFYNACADKQMYQgBYDQEgAygCIA0BCyADKAIkQQxqQRJBABAXIANCfzcDKAwBCyADKAIkLQA1QQFxBEAgA0J/NwMoDAELAn8jAEEQayIAIAMoAiQ2AgwgACgCDC0ANEEBcQsEQCADQgA3AygMAQsgAykDGFAEQCADQgA3AygMAQsgA0IANwMQA0AgAykDECADKQMYVARAIAMgAygCJCADKAIgIAMpAxCnaiADKQMYIAMpAxB9QQEQJCICNwMIIAJCAFMEQCADKAIkQQE6ADUgAykDEFAEQCADQn83AygMBAsgAyADKQMQNwMoDAMLIAMpAwhQBEAgAygCJEEBOgA0BSADIAMpAwggAykDEHw3AxAMAgsLCyADIAMpAxA3AygLIAMpAyghAiADQTBqJAAgAgs2AQF/IwBBEGsiASAANgIMAn4gASgCDC0AAEEBcQRAIAEoAgwpAwggASgCDCkDEH0MAQtCAAsLsgECAX8BfiMAQRBrIgEkACABIAA2AgQgASABKAIEQggQITYCAAJAIAEoAgBFBEAgAUIANwMIDAELIAEgASgCAC0AAK0gASgCAC0AB61COIYgASgCAC0ABq1CMIZ8IAEoAgAtAAWtQiiGfCABKAIALQAErUIghnwgASgCAC0AA61CGIZ8IAEoAgAtAAKtQhCGfCABKAIALQABrUIIhnx8NwMICyABKQMIIQIgAUEQaiQAIAIL8QICAn8BfgJAIAJFDQAgACACaiIDQX9qIAE6AAAgACABOgAAIAJBA0kNACADQX5qIAE6AAAgACABOgABIANBfWogAToAACAAIAE6AAIgAkEHSQ0AIANBfGogAToAACAAIAE6AAMgAkEJSQ0AIABBACAAa0EDcSIEaiIDIAFB/wFxQYGChAhsIgA2AgAgAyACIARrQXxxIgJqIgFBfGogADYCACACQQlJDQAgAyAANgIIIAMgADYCBCABQXhqIAA2AgAgAUF0aiAANgIAIAJBGUkNACADIAA2AhggAyAANgIUIAMgADYCECADIAA2AgwgAUFwaiAANgIAIAFBbGogADYCACABQWhqIAA2AgAgAUFkaiAANgIAIAIgA0EEcUEYciIBayICQSBJDQAgAK0iBUIghiAFhCEFIAEgA2ohAQNAIAEgBTcDGCABIAU3AxAgASAFNwMIIAEgBTcDACABQSBqIQEgAkFgaiICQR9LDQALCwvcAQEBfyMAQRBrIgEkACABIAA2AgwgASgCDARAIAEoAgwoAigEQCABKAIMKAIoQQA2AiggASgCDCgCKEIANwMgIAEoAgwCfiABKAIMKQMYIAEoAgwpAyBWBEAgASgCDCkDGAwBCyABKAIMKQMgCzcDGAsgASABKAIMKQMYNwMAA0AgASkDACABKAIMKQMIWkUEQCABKAIMKAIAIAEpAwCnQQR0aigCABAYIAEgASkDAEIBfDcDAAwBCwsgASgCDCgCABAYIAEoAgwoAgQQGCABKAIMEBgLIAFBEGokAAtrAQF/IwBBIGsiAiAANgIcIAJCASACKAIcrYY3AxAgAkEMaiABNgIAA0AgAiACKAIMIgBBBGo2AgwgAiAAKAIANgIIIAIoAghBAEhFBEAgAiACKQMQQgEgAigCCK2GhDcDEAwBCwsgAikDEAuoAQEBfyMAQRBrIgEkACABIAA2AggCQCABKAIIKAIgQQBNBEAgASgCCEEMakESQQAQFyABQX82AgwMAQsgASgCCCIAIAAoAiBBf2o2AiAgASgCCCgCIEUEQCABKAIIQQBCAEECECQaIAEoAggoAgAEQCABKAIIKAIAEDdBAEgEQCABKAIIQQxqQRRBABAXCwsLIAFBADYCDAsgASgCDCEAIAFBEGokACAACy8BAX8jAEEQayIBJAAgASAANgIMIAEoAgwoAggQGCABKAIMQQA2AgggAUEQaiQAC80BAQF/IwBBEGsiAiQAIAIgADYCCCACIAE2AgQCQCACKAIILQAoQQFxBEAgAkF/NgIMDAELIAIoAgRFBEAgAigCCEEMakESQQAQFyACQX82AgwMAQsgAigCBBA9IAIoAggoAgAEQCACKAIIKAIAIAIoAgQQOUEASARAIAIoAghBDGogAigCCCgCABAaIAJBfzYCDAwCCwsgAigCCCACKAIEQjhBAxAkQgBTBEAgAkF/NgIMDAELIAJBADYCDAsgAigCDCEAIAJBEGokACAAC2ACAX8BfiMAQRBrIgEkACABIAA2AgQCQCABKAIEKAIkQQFHBEAgASgCBEEMakESQQAQFyABQn83AwgMAQsgASABKAIEQQBCAEENECQ3AwgLIAEpAwghAiABQRBqJAAgAgugAQEBfyMAQSBrIgMkACADIAA2AhggAyABNgIUIAMgAjcDCCADIAMoAhgoAgAgAygCFCADKQMIEMcBIgI3AwACQCACQgBTBEAgAygCGEEIaiADKAIYKAIAEBogA0F/NgIcDAELIAMpAwAgAykDCFIEQCADKAIYQQhqQQZBGxAXIANBfzYCHAwBCyADQQA2AhwLIAMoAhwhACADQSBqJAAgAAvfBAEBfyMAQSBrIgIgADYCGCACIAE2AhQCQCACKAIYRQRAIAJBATYCHAwBCyACIAIoAhgoAgA2AgwCQCACKAIYKAIIBEAgAiACKAIYKAIINgIQDAELIAJBATYCECACQQA2AggDQAJAIAIoAgggAigCGC8BBE8NAAJAIAIoAgwgAigCCGotAABBH0oEQCACKAIMIAIoAghqLQAAQYABSA0BCyACKAIMIAIoAghqLQAAQQ1GDQAgAigCDCACKAIIai0AAEEKRg0AIAIoAgwgAigCCGotAABBCUYEQAwBCyACQQM2AhACQCACKAIMIAIoAghqLQAAQeABcUHAAUYEQCACQQE2AgAMAQsCQCACKAIMIAIoAghqLQAAQfABcUHgAUYEQCACQQI2AgAMAQsCQCACKAIMIAIoAghqLQAAQfgBcUHwAUYEQCACQQM2AgAMAQsgAkEENgIQDAQLCwsgAigCCCACKAIAaiACKAIYLwEETwRAIAJBBDYCEAwCCyACQQE2AgQDQCACKAIEIAIoAgBNBEAgAigCDCACKAIIIAIoAgRqai0AAEHAAXFBgAFHBEAgAkEENgIQDAYFIAIgAigCBEEBajYCBAwCCwALCyACIAIoAgAgAigCCGo2AggLIAIgAigCCEEBajYCCAwBCwsLIAIoAhggAigCEDYCCCACKAIUBEACQCACKAIUQQJHDQAgAigCEEEDRw0AIAJBAjYCECACKAIYQQI2AggLAkAgAigCFCACKAIQRg0AIAIoAhBBAUYNACACQQU2AhwMAgsLIAIgAigCEDYCHAsgAigCHAtqAQF/IwBBEGsiASAANgIMIAEo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AhQgASgCHCgCbCABKAIQIAEoAhwoAixBhgJrak8EQCABKAIcKAI4IAEoAhwoAjggASgCEGogASgCECABKAIUaxAcGiABKAIcIgAgACgCcCABKAIQazYCcCABKAIcIgAgACgCbCABKAIQazYCbCABKAIcIgAgACgCXCABKAIQazYCXCABKAIcEM0CIAEgASgCECABKAIUajYCFAsgASgCHCgCACgCBARAIAEgASgCHCgCACABKAIcKAJ0IAEoAhwoAjggASgCHCgCbGpqIAEoAhQQdTYCGCABKAIcIgAgASgCGCAAKAJ0ajYCdCABKAIcKAJ0IAEoAhwoArQtakEDTwRAIAEgASgCHCgCbCABKAIcKAK0LWs2AgwgASgCHCABKAIcKAI4IAEoAgxqLQAANgJIIAEoAhwgASgCHCgCVCABKAIcKAI4IAEoAgxBAWpqLQAAIAEoAhwoAkggASgCHCgCWHRzcTYCSANAIAEoAhwoArQtBEAgASgCHCABKAIcKAJUIAEoAhwoAjggASgCDEECamotAAAgASgCHCgCSCABKAIcKAJYdHNxNgJIIAEoAhwoAkAgASgCDCABKAIcKAI0cUEBdGogASgCHCgCRCABKAIcKAJIQQF0ai8BADsBACABKAIcKAJEIAEoAhwoAkhBAXRqIAEoAgw7AQAgASABKAIMQQFqNgIMIAEoAhwiACAAKAK0LUF/ajYCtC0gASgCHCgCdCABKAIcKAK0LWpBA08NAQsLC0EAIQAgASgCHCgCdEGGAkkEfyABKAIcKAIAKAIEQQBHBUEAC0EBcQ0BCwsgASgCHCgCwC0gASgCHCgCPEkEQCABIAEoAhwoAmwgASgCHCgCdGo2AggCQCABKAIcKALALSABKAIISQRAIAEgASgCHCgCPCABKAIIazYCBCABKAIEQYICSwRAIAFBggI2AgQLIAEoAhwoAjggASgCCGpBACABKAIEEDQgASgCHCABKAIIIAEoAgRqNgLALQwBCyABKAIcKALALSABKAIIQYICakkEQCABIAEoAghBggJqIAEoAhwoAsAtazYCBCABKAIEIAEoAhwoAjwgASgCHCgCwC1rSwRAIAEgASgCHCgCPCABKAIcKALALWs2AgQLIAEoAhwoAjggASgCHCgCwC1qQQAgASgCBBA0IAEoAhwiACABKAIEIAAoAsAtajYC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CwJAIAMoAqQBLwFSRQRAIAMoAqQBIgAgAC8BDEH+/wNxOwEMDAELIAMoAqQBIgAgAC8BDEEBcjsBDAsgAyADKAKkASADKAKgARCCAUEBcToAhgEgAyADKAKgAUGACnFBgApHBH8gAy0AhgEFQQELQQFxOgCHASADAn9BASADKAKkAS8BUkGBAkYNABpBASADKAKkAS8BUkGCAkYNABogAygCpAEvAVJBgwJGC0EBcToAhQEgAy0AhwFBAXEEQCADIANBIGpCHBArNgIcIAMoAhxFBEAgAygCqAFBCGpBDkEAEBcgAygCkAEQJiADQX82AqwBDAILAkAgAygCoAFBgAJxBEACQCADKAKgAUGACHENACADKAKkASkDIEL/////D1YNACADKAKkASkDKEL/////D1gNAgsgAygCHCADKAKkASkDKBAvIAMoAhwgAygCpAEpAyAQLwwBCwJAAkAgAygCoAFBgAhxDQAgAygCpAEpAyBC/////w9WDQAgAygCpAEpAyhC/////w9WDQAgAygCpAEpA0hC/////w9YDQELIAMoAqQBKQMoQv////8PWgRAIAMoAhwgAygCpAEpAygQLwsgAygCpAEpAyBC/////w9aBEAgAygCHCADKAKkASkDIBAvCyADKAKkASkDSEL/////D1oEQCADKAIcIAMoAqQBKQNIEC8LCwsCfyMAQRBrIgAgAygCHDYCDCAAKAIMLQAAQQFxRQsEQCADKAKoAUEIakEUQQAQFyADKAIcEBkgAygCkAEQJiADQX82AqwBDAILIANBAQJ/IwBBEGsiACADKAIcNgIMAn4gACgCDC0AAEEBcQRAIAAoAgwpAxAMAQtCAAunQf//A3ELIANBIGpBgAYQXjYCjAEgAygCHBAZIAMoAowBIAMoApABNgIAIAMgAygCjAE2ApABCyADLQCFAUEBcQRAIAMgA0EVakIHECs2AhAgAygCEEUEQCADKAKoAUEIakEOQQAQFyADKAKQARAmIANBfzYCrAEMAgsgAygCEEECECIgAygCEEHv1wBBAhBCIAMoAhAgAygCpAEvAVJB/wFxEIUBIAMoAhAgAygCpAEoAhBB//8DcRAiAn8jAEEQayIAIAMoAhA2AgwgACgCDC0AAEEBcUULBEAgAygCqAFBCGpBFEEAEBcgAygCEBAZIAMoApABECYgA0F/NgKsAQwCCyADQYGyAkEHIANBFWpBgAYQXjYCDCADKAIQEBkgAygCDCADKAKQATYCACADIAMoAgw2ApABCyADIANB0ABqQi4QKyIANgJMIABFBEAgAygCqAFBCGpBDkEAEBcgAygCkAEQJiADQX82AqwBDAELIAMoAkxB5dcAQerXACADKAKgAUGAAnEbQQQQQiADKAKgAUGAAnFFBEAgAygCTAJ/QS0gAy0AhgFBAXENABogAygCpAEvAQgLQf//A3EQIgsgAygCTAJ/QS0gAy0AhgFBAXENABogAygCpAEvAQoLQf//A3EQIiADKAJMIAMoAqQBLwEMECICQCADLQCFAUEBcQRAIAMoAkxB4wAQIgwBCyADKAJMIAMoAqQBKAIQQf//A3EQIgsgAygCpAEoAhQgA0GeAWogA0GcAWoQuwEgAygCTCADLwGeARAiIAMoAkwgAy8BnAEQIgJAAkAgAy0AhQFBAXFFDQAgAygCpAEpAyhCFFoNACADKAJMQQAQIwwBCyADKAJMIAMoAqQBKAIYECMLAkACQCADKAKgAUGAAnFBgAJHDQAgAygCpAEpAyBC/////w9UBEAgAygCpAEpAyhC/////w9UDQELIAMoAkxBfxAjIAMoAkxBfxAjDAELAkAgAygCpAEpAyBC/////w9UBEAgAygCTCADKAKkASkDIKcQIwwBCyADKAJMQX8QIwsCQCADKAKkASkDKEL/////D1QEQCADKAJMIAMoAqQBKQMopxAjDAELIAMoAkxBfxAjCwsgAygCTCADKAKkASgCMBBgQf//A3EQIiADIAMoAqQBKAI0IAMoAqABEMABQf//A3EgAygCkAFBgAYQwAFB//8DcWo2AogBIAMoAkwgAygCiAFB//8DcRAiIAMoAqABQYACcUUEQCADKAJMIAMoAqQBKAI4EGBB//8DcRAiIAMoAkwgAygCpAEoAjxB//8DcRAiIAMoAkwgAygCpAEvAUAQIiADKAJMIAMoAqQBKAJEECMCQCADKAKkASkDSEL/////D1QEQCADKAJMIAMoAqQBKQNIpxAjDAELIAMoAkxBfxAjCwsCfyMAQRBrIgAgAygCTDYCDCAAKAIMLQAAQQFxRQsEQCADKAKoAUEIakEUQQAQFyADKAJMEBkgAygCkAEQJiADQX82AqwBDAELIAMoAqgBIANB0ABq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QCACIAIoAhgiATYCECACKAIsQdwWaiEDIAIoAiwiBCgC0ChBAWohACAEIAA2AtAoIABBAnQgA2ogATYCACACKAIYIAIoAixB2ChqakEAOgAADAELIAIoAiQgAigCGEECdGpBADsBAgsgAiACKAIYQQFqNgIYDAELCwNAIAIoAiwoAtAoQQJIBEACQCACKAIQQQJIBEAgAiACKAIQQQFqIgA2AhAMAQtBACEACyACKAIsQdwWaiEDIAIoAiwiBCgC0ChBAWohASAEIAE2AtAoIAFBAnQgA2ogADYCACACIAA2AgwgAigCJCACKAIMQQJ0akEBOwEAIAIoAgwgAigCLEHYKGpqQQA6AAAgAigCLCIAIAAoAqgtQX9qNgKoLSACKAIgBEAgAigCLCIAIAAoAqwtIAIoAiAgAigCDEECdGovAQJrNgKsLQsMAQsLIAIoAiggAigCEDYCBCACIAIoAiwoAtAoQQJtNgIYA0AgAigCGEEBSEUEQCACKAIsIAIoAiQgAigCGBB3IAIgAigCGEF/ajYCGAwBCwsgAiACKAIcNgIMA0AgAiACKAIsKALgFjYCGCACKAIsQdwWaiEBIAIoAiwiAygC0CghACADIABBf2o2AtAoIAIoAiwgAEECdCABaigCADYC4BYgAigCLCACKAIkQQEQdyACIAIoAiwoAuAWNgIUIAIoAhghASACKAIsQdwWaiEDIAIoAiwiBCgC1ChBf2ohACAEIAA2AtQoIABBAnQgA2ogATYCACACKAIUIQEgAigCLEHcFmohAyACKAIsIgQoAtQoQX9qIQAgBCAANgLUKCAAQQJ0IANqIAE2AgAgAigCJCACKAIMQQJ0aiACKAIkIAIoAhhBAnRqLwEAIAIoAiQgAigCFEECdGovAQBqOwEAIAIoAgwgAigCLEHYKGpqAn8gAigCGCACKAIsQdgoamotAAAgAigCFCACKAIsQdgoamotAABOBEAgAigCGCACKAIsQdgoamotAAAMAQsgAigCFCACKAIsQdgoamotAAALQQFqOgAAIAIoAiQgAigCFEECdGogAigCDCIAOwECIAIoAiQgAigCGEECdGogADsBAiACIAIoAgwiAEEBajYCDCACKAIsIAA2AuAWIAIoAiwgAigCJEEBEHcgAigCLCgC0ChBAk4NAAsgAigCLCgC4BYhASACKAIsQdwW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LCACIAIoAjgoAng2AiAgAiACKAI4KAKQATYCHCACAn8gAigCOCgCbCACKAI4KAIsQYYCa0sEQCACKAI4KAJsIAIoAjgoAixBhgJrawwBC0EACzYCGCACIAIoAjgoAkA2AhQgAiACKAI4KAI0NgIQIAIgAigCOCgCOCACKAI4KAJsakGCAmo2AgwgAiACKAIsIAIoAiBBAWtqLQAAOgALIAIgAigCLCACKAIgai0AADoACiACKAI4KAJ4IAIoAjgoAowBTwRAIAIgAigCMEECdjYCMAsgAigCHCACKAI4KAJ0SwRAIAIgAigCOCgCdDYCHAsDQAJAIAIgAigCOCgCOCACKAI0ajYCKAJAIAIoAiggAigCIGotAAAgAi0ACkcNACACKAIoIAIoAiBBAWtqLQAAIAItAAtHDQAgAigCKC0AACACKAIsLQAARw0AIAIgAigCKCIAQQFqNgIoIAAtAAEgAigCLC0AAUcEQAwBCyACIAIoAixBAmo2AiwgAiACKAIoQQFqNgIoA0AgAiACKAIsIgBBAWo2AiwgAC0AASEBIAIgAigCKCIAQQFqNgIoAn9BACAALQABIAFHDQAaIAIgAigCLCIAQQFqNgIsIAAtAAEhASACIAIoAigiAEEBajYCKEEAIAAtAAEgAUcNABogAiACKAIsIgBBAWo2AiwgAC0AASEBIAIgAigCKCIAQQFqNgIoQQAgAC0AASABRw0AGiACIAIoAiwiAEEBajYCLCAALQABIQEgAiACKAIoIgBBAWo2AihBACAALQABIAFHDQAaIAIgAigCLCIAQQFqNgIsIAAtAAEhASACIAIoAigiAEEBajYCKEEAIAAtAAEgAUcNABogAiACKAIsIgBBAWo2AiwgAC0AASEBIAIgAigCKCIAQQFqNgIoQQAgAC0AASABRw0AGiACIAIoAiwiAEEBajYCLCAALQABIQEgAiACKAIoIgBBAWo2AihBACAALQABIAFHDQAaIAIgAigCLCIAQQFqNgIsIAAtAAEhASACIAIoAigiAEEBajYCKEEAIAAtAAEgAUcNABogAigCLCACKAIMSQtBAXENAAsgAkGCAiACKAIMIAIoAixrazYCJCACIAIoAgxB/n1qNgIsIAIoAiQgAigCIEoEQCACKAI4IAIoAjQ2AnAgAiACKAIkNgIgIAIoAiQgAigCHE4NAiACIAIoAiwgAigCIEEBa2otAAA6AAsgAiACKAIsIAIoAiBqLQAAOgAKCwsgAiACKAIUIAIoAjQgAigCEHFBAXRqLwEAIgE2AjRBACEAIAEgAigCGEsEfyACIAIoAjBBf2oiADYCMCAAQQBHBUEAC0EBcQ0BCwsCQCACKAIgIAIoAjgoAnRNBEAgAiACKAIgNgI8DAELIAIgAigCOCgCdDYCPAsgAigCPAueEAEBfyMAQTBrIgIkACACIAA2AiggAiABNgIkIAICfyACKAIoKAIMQQVrIAIoAigoAixLBEAgAigCKCgCLAwBCyACKAIoKAIMQQVrCzYCICACQQA2AhAgAiACKAIoKAIAKAIENgIMA0ACQCACQf//AzYCHCACIAIoAigoArwtQSpqQQN1NgIUIAIoAigoAgAoAhAgAigCFEkNACACIAIoAigoAgAoAhAgAigCFGs2AhQgAiACKAIoKAJsIAIoAigoAlxrNgIYIAIoAhwgAigCGCACKAIoKAIAKAIEaksEQCACIAIoAhggAigCKCgCACgCBGo2AhwLIAIoAhwgAigCFEsEQCACIAIoAhQ2AhwLAkAgAigCHCACKAIgTw0AAkAgAigCHEUEQCACKAIkQQRHDQELIAIoAiRFDQAgAigCHCACKAIYIAIoAigoAgAoAgRqRg0BCwwBC0EAIQAgAkEBQQAgAigCJEEERgR/IAIoAhwgAigCGCACKAIoKAIAKAIEakYFQQALQQFxGzYCECACKAIoQQBBACACKAIQEFYgAigCKCgCCCACKAIoKAIUQQRraiACKAIcOgAAIAIoAigoAgggAigCKCgCFEEDa2ogAigCHEEIdjoAACACKAIoKAIIIAIoAigoAhRBAmtqIAIoAhxBf3M6AAAgAigCKCgCCCACKAIoKAIUQQFraiACKAIcQX9zQQh2OgAAIAIoAigoAgAQHyACKAIYBEAgAigCGCACKAIcSwRAIAIgAigCHDYCGAsgAigCKCgCACgCDCACKAIoKAI4IAIoAigoAlxqIAIoAhgQHBogAigCKCgCACIAIAIoAhggACgCDGo2AgwgAigCKCgCACIAIAAoAhAgAigCGGs2AhAgAigCKCgCACIAIAIoAhggACgCFGo2AhQgAigCKCIAIAIoAhggACgCXGo2AlwgAiACKAIcIAIoAhhrNgIcCyACKAIcBEAgAigCKCgCACACKAIoKAIAKAIMIAIoAhwQdRogAigCKCgCACIAIAIoAhwgACgCDGo2AgwgAigCKCgCACIAIAAoAhAgAigCHGs2AhAgAigCKCgCACIAIAIoAhwgACgCFGo2AhQLIAIoAhBFDQELCyACIAIoAgwgAigCKCgCACgCBGs2AgwgAigCDARAAkAgAigCDCACKAIoKAIsTwRAIAIoAihBAjYCsC0gAigCKCgCOCACKAIoKAIAKAIAIAIoAigoAixrIAIoAigoAiwQHBogAigCKCACKAIoKAIsNgJsDAELIAIoAigoAjwgAigCKCgCbGsgAigCDE0EQCACKAIoIgAgACgCbCACKAIoKAIsazYCbCACKAIoKAI4IAIoAigoAjggAigCKCgCLGogAigCKCgCbBAcGiACKAIoKAKwLUECSQRAIAIoAigiACAAKAKwLUEBajYCsC0LCyACKAIoKAI4IAIoAigoAmxqIAIoAigoAgAoAgAgAigCDGsgAigCDBAcGiACKAIoIgAgAigCDCAAKAJsajYCbAsgAigCKCACKAIoKAJsNgJcIAIoAigiAQJ/IAIoAgwgAigCKCgCLCACKAIoKAK0LWtLBEAgAigCKCgCLCACKAIoKAK0LWsMAQsgAigCDAsgASgCtC1qNgK0LQsgAigCKCgCwC0gAigCKCgCbEkEQCACKAIoIAIoAigoAmw2AsAtCwJAIAIoAhAEQCACQQM2AiwMAQsCQCACKAIkRQ0AIAIoAiRBBEYNACACKAIoKAIAKAIEDQAgAigCKCgCbCACKAIoKAJcRw0AIAJBATYCLAwBCyACIAIoAigoAjwgAigCKCgCbGtBAWs2AhQCQCACKAIoKAIAKAIEIAIoAhRNDQAgAigCKCgCXCACKAIoKAIsSA0AIAIoAigiACAAKAJcIAIoAigoAixrNgJcIAIoAigiACAAKAJsIAIoAigoAixrNgJsIAIoAigoAjggAigCKCgCOCACKAIoKAIsaiACKAIoKAJsEBwaIAIoAigoArAtQQJJBEAgAigCKCIAIAAoArAtQQFqNgKwLQsgAiACKAIoKAIsIAIoAhRqNgIUCyACKAIUIAIoAigoAgAoAgRLBEAgAiACKAIoKAIAKAIENgIUCyACKAIUBEAgAigCKCgCACACKAIoKAI4IAIoAigoAmxqIAIoAhQQdRogAigCKCIAIAIoAhQgACgCbGo2AmwLIAIoAigoAsAtIAIoAigoAmxJBEAgAigCKCACKAIoKAJsNgLALQsgAiACKAIoKAK8LUEqakEDdTYCFCACAn9B//8DIAIoAigoAgwgAigCFGtB//8DSw0AGiACKAIoKAIMIAIoAhRrCzYCFCACAn8gAigCFCACKAIoKAIsSwRAIAIoAigoAiwMAQsgAigCFAs2AiAgAiACKAIoKAJsIAIoAigoAlxrNgIYAkAgAigCGCACKAIgSQRAIAIoAhhFBEAgAigCJEEERw0CCyACKAIkRQ0BIAIoAigoAgAoAgQNASACKAIYIAIoAhRLDQELIAICfyACKAIYIAIoAhRLBEAgAigCFAwBCyACKAIYCzYCHCACQQFBAAJ/QQAgAigCJEEERw0AGkEAIAIoAigoAgAoAgQNABogAigCHCACKAIYRgtBAXEbNgIQIAIoAiggAigCKCgCOCACKAIoKAJcaiACKAIcIAIoAhAQViACKAIoIgAgAigCHCAAKAJcajYCXCACKAIoKAIAEB8LIAJBAkEAIAIoAhAbNgIsCyACKAIsIQAgAkEwaiQAIAALsgIBAX8jAEEQayIBJAAgASAANgIIAkAgASgCCBB2BEAgAUF+NgIMDAELIAEgASgCCCgCHCgCBDYCBCABKAIIKAIcKAIIBEAgASgCCCgCKCABKAIIKAIcKAIIIAEoAggoAiQRAgALIAEoAggoAhwoAkQEQCABKAIIKAIoIAEoAggoAhwoAkQgASgCCCgCJBECAAsgASgCCCgCHCgCQARAIAEoAggoAiggASgCCCgCHCgCQCABKAIIKAIkEQIACyABKAIIKAIcKAI4BEAgASgCCCgCKCABKAIIKAIcKAI4IAEoAggoAiQRAgALIAEoAggoAiggASgCCCgCHCABKAIIKAIkEQIAIAEoAghBADYCHCABQX1BACABKAIEQfEARhs2AgwLIAEoAgwhACABQRBqJAAgAAvrFwECfyMAQfAAayIDIAA2AmwgAyABNgJoIAMgAjYCZCADQX82AlwgAyADKAJoLwECNgJUIANBADYCUCADQQc2AkwgA0EENgJIIAMoAlRFBEAgA0GKATYCTCADQQM2AkgLIANBADYCYANAIAMoAmAgAygCZEpFBEAgAyADKAJUNgJYIAMgAygCaCADKAJgQQFq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AygCbCIAIAAoArwtIAMoAgxBEGtqNgK8LQwBCyADKAJsIgAgAC8BuC0gAygCUEELa0H//wNxIAMoAmwoArwtdHI7AbgtIAMoAmwiACADKAIMIAAoArwtajYCvC0LCwsLIANBADYCUCADIAMoAlg2AlwCQCADKAJURQRAIANBigE2AkwgA0EDNgJIDAELAkAgAygCWCADKAJURgRAIANBBjYCTCADQQM2AkgMAQsgA0EHNgJMIANBBDYCSAsLCyADIAMoAmBBAWo2AmAMAQsLC5EEAQF/IwBBMGsiAyAANgIsIAMgATYCKCADIAI2AiQgA0F/NgIcIAMgAygCKC8BAjYCFCADQQA2AhAgA0EHNgIMIANBBDYCCCADKAIURQRAIANBigE2AgwgA0EDNgIICyADKAIoIAMoAiRBAWpBAnRqQf//AzsBAiADQQA2AiADQCADKAIgIAMoAiRKRQRAIAMgAygCFDYCGCADIAMoAiggAygCIEEBakECdGovAQI2AhQgAyADKAIQQQFqIgA2AhACQAJAIAAgAygCDE4NACADKAIYIAMoAhRHDQAMAQsCQCADKAIQIAMoAghIBEAgAygCLEH8FGogAygCGEECdGoiACADKAIQIAAvAQBqOwEADAELAkAgAygCGARAIAMoAhggAygCHEcEQCADKAIsIAMoAhhBAnRqQfwUaiIAIAAvAQBBAWo7AQALIAMoAiwiACAAQbwVai8BAEEBajsBvBUMAQsCQCADKAIQQQpMBEAgAygCLCIAIABBwBVqLwEAQQFqOwHAFQwBCyADKAIsIgAgAEHEFWovAQBBAWo7AcQVCwsLIANBADYCECADIAMoAhg2AhwCQCADKAIURQRAIANBigE2AgwgA0EDNgIIDAELAkAgAygCGCADKAIURgRAIANBBjYCDCADQQM2AggMAQsgA0EHNgIMIANBBDYCCAsLCyADIAMoAiBBAWo2AiAMAQsLC6cSAQJ/IwBB0ABrIgMgADYCTCADIAE2AkggAyACNgJEIANBADYCOCADKAJMKAKgLQRAA0AgAyADKAJMKAKkLSADKAI4QQF0ai8BADYCQCADKAJMKAKYLSEAIAMgAygCOCIBQQFqNgI4IAMgACABai0AADYCPAJAIAMoAkBFBEAgAyADKAJIIAMoAjxBAnRqLwECNgIsAkAgAygCTCgCvC1B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AgRBITsBACADKAIIQQA7AQAMAQsgAygCACgCFEHQAEgEQCADKAIAQdAANgIUCyADKAIEIAMoAgAoAgwgAygCACgCFEEJdCADKAIAKAIQQQV0akGgwH1qajsBACADKAIIIAMoAgAoAghBC3QgAygCACgCBEEFdGogAygCACgCAEEBdWo7AQALIANBEGokAAuDAwEBfyMAQSBrIgMkACADIAA7ARogAyABNgIUIAMgAjYCECADIAMoAhQgA0EIakHAAEEAEE8iADYCDAJAIABFBEAgA0EANgIcDAELIAMoAghBBWpB//8DSwRAIAMoAhBBEkEAEBcgA0EANgIcDAELIANBACADKAIIQQVqrRArIgA2AgQgAEUEQCADKAIQQQ5BABAXIANBADYCHAwBCyADKAIEQQEQhQEgAygCBCADKAIUEMYBECMgAygCBCADKAIMIAMoAggQQgJ/IwBBEGsiACADKAIENgIMIAAoAgwtAABBAXFFCwRAIAMoAhBBFEEAEBcgAygCBBAZIANBADYCHAwBCyADIAMvARoCfyMAQRBrIgAgAygCBDYCDAJ+IAAoAgwtAABBAXEEQCAAKAIMKQMQDAELQgALp0H//wNxCwJ/IwBBEGsiACADKAIENgIMIAAoAgwoAgQLQYAGEF42AgAgAygCBBAZIAMgAygCADYCHAsgAygCHCEAIANBIGokACAAC7QCAQF/IwBBMGsiAyQAIAMgADYCKCADIAE3AyAgAyACNgIcAkAgAykDIFAEQCADQQE6AC8MAQsgAyADKAIoKQMQIAMpAyB8NwMIAkAgAykDCCADKQMgWgRAIAMpAwhC/////wBYDQELIAMoAhxBDkEAEBcgA0EAOgAvDAELIAMgAygCKCgCACADKQMIp0EEdBBJIgA2AgQgAEUEQCADKAIcQQ5BABAXIANBADoALwwBCyADKAIoIAMoAgQ2AgAgAyADKAIoKQMINwMQA0AgAykDECADKQMIWkUEQCADKAIoKAIAIAMpAxCnQQR0ahCHASADIAMpAxBCAXw3AxAMAQsLIAMoAiggAykDCCIBNwMQIAMoAiggATcDCCADQQE6AC8LIAMtAC9BAXEhACADQTBqJAAgAAvMAQEBfyMAQSBrIgIkACACIAA3AxAgAiABNgIMIAJBMBAbIgE2AggCQCABRQRAIAIoAgxBDkEAEBcgAkEANgIcDAELIAIoAghBADYCACACKAIIQgA3AxAgAigCCEIANwMIIAIoAghCADcDICACKAIIQgA3AxggAigCCEEANgIoIAIoAghBADoALCACKAIIIAIpAxAgAigCDBC9AUEBcUUEQCACKAIIECggAkEANgIcDAELIAIgAigCCDYCHAsgAigCHCEBIAJBIGokACABC9kCAQF/IwBBIGsiAyQAIAMgADYCGCADIAE2AhQgAyACNgIQIAMgA0EMakIEECs2AggCQCADKAIIRQRAIANBfzYCHAwBCwNAIAMoAhQEQCADKAIUKAIEIAMoAhBxQYAGcQRAIAMoAghCABAuGiADKAIIIAMoAhQvAQgQIiADKAIIIAMoAhQvAQoQIgJ/IwBBEGsiACADKAIINgIMIAAoAgwtAABBAXFFCwRAIAMoAhhBCGpBFEEAEBcgAygCCBAZIANBfzYCHAwECyADKAIYIANBDGpCBBA7QQBIBEAgAygCCBAZIANBfzYCHAwECyADKAIULwEKQQBKBEAgAygCGCADKAIUKAIMIAMoAhQvAQqtEDtBAEgEQCADKAIIEBkgA0F/NgIcDAULCwsgAyADKAIUKAIANgIUDAELCyADKAIIEBkgA0EANgIcCyADKAIcIQAgA0EgaiQAIAALaAEBfyMAQRBrIgIgADYCDCACIAE2AgggAkEAOwEGA0AgAigCDARAIAIoAgwoAgQgAigCCHFBgAZxBEAgAiACKAIMLwEKIAIvAQZBBGpqOwEGCyACIAIoAgwoAgA2AgwMAQsLIAIvAQYL8AEBAX8jAEEQayIBJAAgASAANgIMIAEgASgCDDYCCCABQQA2AgQDQCABKAIMBEACQAJAIAEoAgwvAQhB9cYBRg0AIAEoAgwvAQhB9eABRg0AIAEoAgwvAQhBgbICRg0AIAEoAgwvAQhBAUcNAQsgASABKAIMKAIANgIAIAEoAgggASgCDEYEQCABIAEoAgA2AggLIAEoAgxBADYCACABKAIMECYgASgCBARAIAEoAgQgASgCADYCAAsgASABKAIANgIMDAILIAEgASgCDDYCBCABIAEoAgwoAgA2AgwMAQsLIAEoAgghACABQRBqJAAgAAuzBAEBfyMAQUBqIgUkACAFIAA2AjggBSABOwE2IAUgAjYCMCAFIAM2AiwgBSAENgIoIAUgBSgCOCAFLwE2rRArIgA2AiQCQCAARQRAIAUoAihBDkEAEBcgBUEAOgA/DAELIAVBADYCICAFQQA2AhgDQAJ/IwBBEGsiACAFKAIkNgIMIAAoAgwtAABBAXELBH8gBSgCJBAyQgRaBUEAC0EBcQRAIAUgBSgCJBAgOwEWIAUgBSgCJBAgOwEUIAUgBSgCJCAFLwEUrRAhNgIQIAUoAhBFBEAgBSgCKEEVQQAQFyAFKAIkEBkgBSgCGBAmIAVBADoAPwwDCyAFIAUvARYgBS8BFCAFKAIQIAUoAjAQXiIANgIcIABFBEAgBSgCKEEOQQAQFyAFKAIkEBkgBSgCGBAmIAVBADoAPwwDCwJAIAUoAhgEQCAFKAIgIAUoAhw2AgAgBSAFKAIcNgIgDAELIAUgBSgCHCIANgIgIAUgADYCGAsMAQsLIAUoAiQQSEEBcUUEQCAFIAUoAiQQMj4CDCAFIAUoAiQgBSgCDK0QITYCCAJAAkAgBSgCDEEETw0AIAUoAghFDQAgBSgCCEHS1wAgBSgCDBBQRQ0BCyAFKAIoQRVBABAXIAUoAiQQGSAFKAIYECYgBUEAOgA/DAILCyAFKAIkEBkCQCAFKAIsBEAgBSgCLCAFKAIYNgIADAELIAUoAhgQJgsgBUEBOgA/CyAFLQA/QQFxIQAgBUFAayQAIAAL7wIBAX8jAEEgayICJAAgAiAANgIYIAIgATYCFAJAIAIoAhhFBEAgAiACKAIUNgIcDAELIAIgAigCGDYCCANAIAIoAggoAgAEQCACIAIoAggoAgA2AggMAQsLA0AgAigCFARAIAIgAigCFCgCADYCECACQQA2AgQgAiACKAIYNgIMA0ACQCACKAIMRQ0AAkAgAigCDC8BCCACKAIULwEIRw0AIAIoAgwvAQogAigCFC8BCkcNACACKAIMLwEKBEAgAigCDCgCDCACKAIUKAIMIAIoAgwvAQoQUA0BCyACKAIMIgAgACgCBCACKAIUKAIEQYAGcXI2AgQgAkEBNgIEDAELIAIgAigCDCgCADYCDAwBCwsgAigCFEEANgIAAkAgAigCBARAIAIoAhQQJgwBCyACKAIIIAIoAhQiADYCACACIAA2AggLIAIgAigCEDYCFAwBCwsgAiACKAIYNgIcCyACKAIcIQAgAkEgaiQAIAALXQEBfyMAQRBrIgIkACACIAA2AgggAiABNgIEAkAgAigCBEUEQCACQQA2AgwMAQsgAiACKAIIIAIoAgQoAgAgAigCBC8BBK0QOzYCDAsgAigCDCEAIAJBEGokACAAC48BAQF/IwBBEGsiAiQAIAIgADYCCCACIAE2AgQCQAJAIAIoAggEQCACKAIEDQELIAIgAigCCCACKAIERjYCDAwBCyACKAIILwEEIAIoAgQvAQRHBEAgAkEANgIMDAELIAIgAigCCCgCACACKAIEKAIAIAIoAggvAQQQUEU2AgwLIAIoAgwhACACQRBqJAAgAAtVAQF/IwBBEGsiASQAIAEgADYCDCABQQBBAEEAEB02AgggASgCDARAIAEgASgCCCABKAIMKAIAIAEoAgwvAQQQHTYCCAsgASgCCCEAIAFBEGokACAAC4gBAQF/IwBBIGsiAyQAIAMgADYCFCADIAE2AhAgAyACNwMIAkACQCADKAIUKAIkQQFGBEAgAykDCEL///////////8AWA0BCyADKAIUQQxqQRJBABAXIANCfzcDGAwBCyADIAMoAhQgAygCECADKQMIQQsQJDcDGAsgAykDGCECIANBIGokACACC3MBAX8jAEEgayIBJAAgASAANgIYIAFCCDcDECABIAEoAhgpAxAgASkDEHw3AwgCQCABKQMIIAEoAhgpAxBUBEAgASgCGEEAOgAAIAFBfzYCHAwBCyABIAEoAhggASkDCBAuNgIcCyABKAIcGiABQSBqJAALBgBBtJwBC5YBAQF/IwBBIGsiAiAANgIYIAIgATcDEAJAAkACQCACKAIYLQAAQQFxRQ0AIAIoAhgpAxAgAikDEHwgAikDEFQNACACKAIYKQMQIAIpAxB8IAIoAhgpAwhYDQELIAIoAhhBADoAACACQQA2AhwMAQsgAiACKAIYKAIEIAIoAhgpAxCnajYCDCACIAIoAgw2AhwLIAIoAhwLGABBqJwBQgA3AgBBsJwBQQA2AgBBqJwBC7kCAQF/IwBBEGsiAiAANgIIIAIgATYCBAJAIAIoAghBgAFJBEAgAigCBCACKAIIOgAAIAJBATYCDAwBCyACKAIIQYAQSQRAIAIoAgQgAigCCEEGdkEfcUHAAXI6AAAgAigCBCACKAIIQT9xQYABcjoAASACQQI2AgwMAQsgAigCCEGAgARJBEAgAigCBCACKAIIQQx2QQ9xQeABcjoAACAC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AgA2AqABDAELIAFBADYCoAELCwJAIAEoAqABRQRAIAEgASgCpAE2AqwBDAELIAEgASgCoAEQMAJ/IAEoAqQBBEAgASgCpAEQMEECagwBC0EAC2pBAWoQGyIANgIcIABFBEAgAUH4ESgCADYCrAEMAQsgASgCHCEAAn8gASgCpAEEQCABKAKkAQwBC0HUlwELIQJB1ZcBQdSXASABKAKkARshAyABIAEoAqABNgIIIAEgAzYCBCABIAI2AgAgAEHNlwEgARBxIAEoAqgBIAEoAhw2AgggASABKAIcNgKsAQsgASgCrAEhACABQbABaiQAIAALcQEDfwJAAkADQCAAIAJB0IgBai0AAEcEQEHXACEDIAJBAWoiAkHXAEcNAQwCCwsgAiIDDQBBsIkBIQAMAQtBsIkBIQIDQCACLQAAIQQgAkEBaiIAIQIgBA0AIAAhAiADQX9qIgMNAAsLIAEoAhQaIAALMwEBfyAAKAIUIgMgASACIAAoAhAgA2siASABIAJLGyIBEBwaIAAgACgCFCABajYCFCACC4oBAQJ/IwBBoAFrIgMkACADQQhqQbiHAUGQARAcGiADIAA2AjQgAyAANgIcIANBfiAAayIEQf////8HQf////8HIARLGyIENgI4IAMgACAEaiIANgIkIAMgADYCGCADQQhqIAEgAhC6AiAEBEAgAygCHCIAIAAgAygCGEZrQQA6AAALIANBoAFqJAALvgIBAX8jAEHAwABrIgMkACADIAA2ArhAIAMgATYCtEAgAyACNwOoQAJAIAMoArRAEFNBAEgEQCADKAK4QEEIaiADKAK0QBAaIANBfzYCvEAMAQsgA0EANgIMIANCADcDEANAAkAgAyADKAK0QCADQSBqQoDAABAxIgI3AxggAkIAVw0AIAMoArhAIANBIGogAykDGBA7QQBIBEAgA0F/NgIMBSADKQMYQoDAAFINAiADKAK4QCgCVEUNAiADKQOoQEIAVw0CIAMgAykDGCADKQMQfDcDECADKAK4QCgCVCADKQMQuSADKQOoQLmjEFcMAgsLCyADKQMYQgBTBEAgAygCuEBBCGogAygCtEAQGiADQX82AgwLIAMoArRAEDcaIAMgAygCDDYCvEALIAMoArxAIQAgA0HAwABqJAAgAAuqAQEBfyMAQTBrIgMkACADIAA2AiggAyABNgIkIAMgAjcDGCADIAMoAigoAgAQOiICNwMQAkAgAkIAUwRAIANBfzYCLAwBCyADIAMoAiggAygCJCADKQMYEIQDIgI3AwAgAkIAUwRAIANBfzYCLAwBCyADIAMoAigoAgAQOiICNwMIIAJCAFMEQCADQX82AiwMAQsgA0EANgIsCyADKAIsIQAgA0EwaiQAIAAL/gEBAX8jAEGgwABrIgIkACACIAA2AphAIAIgATcDkEAgAiACKQOQQLo5AwACQANAIAIpA5BAQgBWBEAgAgJ+QoDAACACKQOQQEKAwABWDQAaIAIpA5BACz4CDCACKAKYQCgCACACQRBqIAIoAgytIAIoAphAQQhqEGJBAEgEQCACQX82ApxADAMLIAIoAphAIAJBEGogAigCDK0QO0EASARAIAJBfzYCnEAMAwUgAiACKQOQQCACNQIMfTcDkEAgAigCmEAoAlQgAisDACACKQOQQLqhIAIrAwCjEFcMAgsACwsgAkEANgKcQAsgAigCnEAhACACQaDAAGokACAAC/IRAgF/AX4jAEGgAWsiAyQAIAMgADYCmAEgAyABNgKUASADIAI2ApABAkAgAygClAEgA0E4ahA5QQBIBEAgAygCmAFBCGogAygClAEQGiADQX82ApwBDAELIAMpAzhCwACDUARAIAMgAykDOELAAIQ3AzggA0EAOwFoCwJAAkAgAygCkAEoAhBBf0cEQCADKAKQASgCEEF+Rw0BCyADLwFoRQ0AIAMoApABIAMvAWg2AhAMAQsCQAJAIAMoApABKAIQDQAgAykDOEIEg1ANACADIAMpAzhCCIQ3AzggAyADKQNQNwNYDAELIAMgAykDOEL3////D4M3AzgLCyADKQM4QoABg1AEQCADIAMpAzhCgAGENwM4IANBADsBagsgA0GAAjYCJAJAIAMpAzhCBINQBEAgAyADKAIkQYAIcjYCJCADQn83A3AMAQsgAygCkAEgAykDUDcDKCADIAMpA1A3A3ACQCADKQM4QgiDUARAAkACQAJ/AkAgAygCkAEoAhBBf0cEQCADKAKQASgCEEF+Rw0BC0EIDAELIAMoApABKAIQC0H//wNxIgBBDEsNAAJAAkACQCAAQQFrDgwDAwMDAwMDAQMDAwACCyADQpTC5PMPNwMQDAMLIANCg4Ow/w83AxAMAgsgA0L/////DzcDEAwBCyADQgA3AxALIAMpA1AgAykDEFYEQCADIAMoAiRBgAhyNgIkCwwBCyADKAKQASADKQNYNwMgCwsgAyADKAKYASgCABA6IgQ3A4gBIARCAFMEQCADKAKYAUEIaiADKAKYASgCABAaIANBfzYCnAEMAQsgAygCkAEiACAALwEMQff/A3E7AQwgAyADKAKYASADKAKQASADKAIkEF0iADYCKCAAQQBIBEAgA0F/NgKcAQwBCyADIAMvAWgCfwJAIAMoApABKAIQQX9HBEAgAygCkAEoAhBBfkcNAQtBCAwBCyADKAKQASgCEAtB//8DcUc6ACIgAyADLQAiQQFxBH8gAy8BaEEARwVBAAtBAXE6ACEgAyADLwFoBH8gAy0AIQVBAQtBAXE6ACAgAyADLQAiQQFxBH8gAygCkAEoAhBBAEcFQQALQQFxOgAfIAMCf0EBIAMtACJBAXENABpBASADKAKQASgCAEGAAXENABogAygCkAEvAVIgAy8BakcLQQFxOgAeIAMgAy0AHkEBcQR/IAMvAWpBAEcFQQALQQFxOgAdIAMgAy0AHkEBcQR/IAMoApABLwFSQQBHBUEAC0EBcToAHCADIAMoApQBNgI0IwBBEGsiACADKAI0NgIMIAAoAgwiACAAKAIwQQFqNgIwIAMtAB1BAXEEQCADIAMvAWpBABB6IgA2AgwgAEUEQCADKAKYAUEIakEYQQAQFyADKAI0EB4gA0F/NgKcAQwCCyADIAMoApgBIAMoAjQgAy8BakEAIAMoApgBKAIcIAMoAgwRKwAiADYCMCAARQRAIAMoAjQQHiADQX82ApwBDAILIAMoAjQQHiADIAMoAjA2AjQLIAMtACFBAXEEQCADIAMoApgBIAMoAjQgAy8BaBCiASIANgIwIABFBEAgAygCNBAeIANBfzYCnAEMAgsgAygCNBAeIAMgAygCMDYCNAsgAy0AIEEBcQRAIAMgAygCmAEgAygCNEEAEKEBIgA2AjAgAEUEQCADKAI0EB4gA0F/NgKcAQwCCyADKAI0EB4gAyADKAIwNgI0CyADLQAfQQFxBEAgAyADKAKYASADKAI0IAMoApABKAIQIAMoApABLwFQELICIgA2AjAgAEUEQCADKAI0EB4gA0F/NgKcAQwCCyADKAI0EB4gAyADKAIwNgI0CyADLQAcQQFxBEAgA0EANgIEAkAgAygCkAEoAlQEQCADIAMoApABKAJUNgIEDAELIAMoApgBKAIcBEAgAyADKAKYASgCHDYCBAsLIAMgAygCkAEvAVJBARB6IgA2AgggAEUEQCADKAKYAUEIakEYQQAQFyADKAI0EB4gA0F/NgKcAQwCCyADIAMoApgBIAMoAjQgAygCkAEvAVJBASADKAIEIAMoAggRKwAiADYCMCAARQRAIAMoAjQQHiADQX82ApwBDAILIAMoAjQQHiADIAMoAjA2AjQLIAMgAygCmAEoAgAQOiIENwOAASAEQgBTBEAgAygCmAFBCGogAygCmAEoAgAQGiADQX82ApwBDAELIAMgAygCmAEgAygCNCADKQNwEKYCNgIsIAMoAjQgA0E4ahA5QQBIBEAgAygCmAFBCGogAygCNBAaIANBfzYCLAsgAyADKAI0EKwCIgA6ACMgAEEYdEEYdUEASARAIAMoApgBQQhqIAMoAjQQGiADQX82AiwLIAMoAjQQHiADKAIsQQBIBEAgA0F/NgKcAQwBCyADIAMoApgBKAIAEDoiBDcDeCAEQgBTBEAgAygCmAFBCGogAygCmAEoAgAQGiADQX82ApwBDAELIAMoApgBKAIAIAMpA4gBEJ8BQQBIBEAgAygCmAFBCGogAygCmAEoAgAQGiADQX82ApwBDAELIAMpAzhC5ACDQuQAUgRAIAMoApgBQQhqQRRBABAXIANBfzYCnAEMAQsgAygCkAEoAgBBIHFFBEACQCADKQM4QhCDQgBSBEAgAygCkAEgAygCYDYCFAwBCyADKAKQAUEUahACGgsLIAMoApABIAMvAWg2AhAgAygCkAEgAygCZDYCGCADKAKQASADKQNQNwMoIAMoApABIAMpA3ggAykDgAF9NwMgIAMoApABIAMoApABLwEMQfn/A3EgAy0AI0EBdHI7AQwgAygCkAEgAygCJEGACHFBAEcQ/QIgAyADKAKYASADKAKQASADKAIkEF0iADYCLCAAQQBIBEAgA0F/NgKcAQwBCyADKAIoIAMoAixHBEAgAygCmAFBCGpBFEEAEBcgA0F/NgKcAQwBCyADKAKYASgCACADKQN4EJ8BQQBIBEAgAygCmAFBCGogAygCmAEoAgAQGiADQX82ApwBDAELIANBADYCnAELIAMoApwBIQAgA0GgAWokACAAC68CAQF/IwBBIGsi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AygCBBClASEAIANBEGokACAAC7oCAQF/IwBBIGsiAyQAIAMgADYCGCADIAE2AhQgAyACNgIQIAMgAygCGDYCDCADKAIMAn5C/////w9C/////w8gAygCECkDAFQNABogAygCECkDAAs+AiAgAygCDCADKAIUNgIcAkAgAygCDC0ABEEBcQRAIAMgAygCDEEQakEEQQAgAygCDC0ADEEBcRsQzAI2AggMAQsgAyADKAIMQRBqEMECNgIICyADKAIQIgAgACkDACADKAIMNQIgfTcDAAJAAkAgAygCCEEFaiIAQQZLDQACQAJAAkAgAEEBaw4GAwMDAwABAgsgA0EANgIcDAMLIANBATYCHAwCCyADKAIMKAIURQRAIANBAzYCHAwCCwsgAygCDCgCAEENIAMoAggQFyADQQI2AhwLIAMoAhwhACADQSBqJAAgAAskAQF/IwBBEGsiASAANgIMIAEgASgCDDYCCCABKAIIQQE6AAwLmQEBAX8jAEEgayIDJAAgAyAANgIYIAMgATYCFCADIAI3AwggAyADKAIYNgIEAkACQCADKQMIQv////8PWARAIAMoAgQoAhRBAE0NAQsgAygCBCgCAEESQQAQFyADQQA6AB8MAQsgAygCBCADKQMIPgIUIAMoAgQgAygCFDYCECADQQE6AB8LIAMtAB9BAXEhACADQSBqJAAgAAuQAQEBfyMAQRBrIgEkACABIAA2AgggASABKAIINgIEAkAgASgCBC0ABEEBcQRAIAEgASgCBEEQahCoATYCAAwBCyABIAEoAgRBEGoQvgI2AgALAkAgASgCAARAIAEoAgQoAgBBDSABKAIAEBcgAUEAOgAPDAELIAFBAToADwsgAS0AD0EBcSEAIAFBEGokACAAC8ABAQF/IwBBEGsiASQAIAEgADYCCCABIAEoAgg2AgQgASgCBEEANgIUIAEoAgRBADYCECABKAIEQQA2AiAgASgCBEEANgIcAkAgASgCBC0ABEEBcQRAIAEgASgCBEEQaiABKAIEKAIIENICNgIADAELIAEgASgCBEEQahDCAjYCAAsCQCABKAIABEAgASgCBCgCAEENIAEoAgAQFyABQQA6AA8MAQsgAUEBOgAPCyABLQAPQQFxIQAgAUEQaiQAIAALywIBA38jAEHQAWsiAyQAIAMgAjYCzAFBACECIANBoAFqQQBBKBA0IAMgAygCzAE2AsgBAkBBACABIANByAFqIANB0ABqIANBoAFqEHJBAEgNACAAKAJMQQBOBEBBASECCyAAKAIAIQQgACwASkEATARAIAAgBEFfcTYCAAsgBEEgcSEFAn8gACgCMARAIAAgASADQcgBaiADQdAAaiADQaABahByDAELIABB0AA2AjAgACADQdAAajYCECAAIAM2AhwgACADNgIUIAAoAiwhBCAAIAM2AiwgACABIANByAFqIANB0ABqIANBoAFqEHIgBEUNABogAEEAQQAgACgCJBEAABogAEEANgIwIAAgBDYCLCAAQQA2AhwgAEEANgIQIAAoAhQaIABBADYCFEEACxogACAAKAIAIAVyNgIAIAJFDQALIANB0AFqJAALbwEBfyMAQRBrIgEgADYCCCABIAEoAgg2AgQCQCABKAIELQAEQQFxRQRAIAFBADYCDAwBCyABKAIEKAIIQQNIBEAgAUECNgIMDAELIAEoAgQoAghBB0oEQCABQQE2AgwMAQsgAUEANgIMCyABKAIMCywBAX8jAEEQayIBJAAgASAANgIMIAEgASgCDDYCCCABKAIIEBggAUEQaiQACzwBAX8jAEEQayIDJAAgAyAAOwEOIAMgATYCCCADIAI2AgRBASADKAIIIAMoAgQQpQEhACADQRBqJAAgAAuZAQEBfyMAQRBrIgEkACABIAA2AggCQCABKAIIEEoEQCABQX42AgwMAQsgASABKAIIKAIcNgIEIAEoAgQoAjgEQCABKAIIKAIoIAEoAgQoAjggASgCCCgCJBECAAsgASgCCCgCKCABKAIIKAIcIAEoAggoAiQRAgAgASgCCEEANgIcIAFBADYCDAsgASgCDCEAIAFBEGokACAAC50EAQF/IwBBIGsiAyQAIAMgADYCGCADIAE2AhQgAyACNgIQIAMgAygCGCgCHDYCDAJAIAMoAgwoAjhFBEAgAygCGCgCKEEBIAMoAgwoAih0QQEgAygCGCgCIBEAACEAIAMoAgwgADYCOCADKAIMKAI4RQRAIANBATYCHAwCCwsgAygCDCgCLEUEQCADKAIMQQEgAygCDCgCKHQ2AiwgAygCDEEANgI0IAMoAgxBADYCMAsCQCADKAIQIAMoAgwoAixPBEAgAygCDCgCOCADKAIUIAMoAgwoAixrIAMoAgwoAiwQ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UCACIAIoAlAgAigCXCgCBEEFa2o2AkwgAiACKAJcKAIMNgJIIAIgAigCSCACKAJYIAIoAlwoAhBrazYCRCACIAIoAkggAigCXCgCEEGBAmtqNgJAIAIgAigCVCgCLDYCPCACIAIoAlQoAjA2AjggAiACKAJUKAI0NgI0IAIgAigCVCgCODYCMCACIAIoAlQoAjw2AiwgAiACKAJUKAJANgIoIAIgAigCVCgCUDYCJCACIAIoAlQoAlQ2AiAgAkEBIAIoAlQoAlh0QQFrNgIcIAJBASACKAJUKAJcdEEBazYCGANAIAIoAihBD0kEQCACIAIoAlAiAEEBajYCUCACIAIoAiwgAC0AACACKAIodGo2AiwgAiACKAIoQQhqNgIoIAIgAigCUCIAQQFqNgJQIAIgAigCLCAALQAAIAIoAih0ajYCLCACIAIoAihBCGo2AigLIAJBEGogAigCJCACKAIsIAIoAhxxQQJ0aigBADYBAAJAAkADQCACIAItABE2AgwgAiACKAIsIAIoAgx2NgIsIAIgAigCKCACKAIMazYCKCACIAItABA2AgwgAigCDEUEQCACLwESIQAgAiACKAJIIgFBAWo2AkggASAAOgAADAILIAIoAgxBEHEEQCACIAIvARI2AgggAiACKAIMQQ9xNgIMIAIoAgwEQCACKAIoIAIoAgxJBEAgAiACKAJQIgBBAWo2AlAgAiACKAIsIAAtAAAgAigCKHRqNgIsIAIgAigCKEEIajYCKAsgAiACKAIIIAIoAixBASACKAIMdEEBa3FqNgIIIAIgAigCLCACKAIMdjYCLCACIAIoAiggAigCDGs2AigLIAIoAihBD0kEQCACIAIoAlAiAEEBajYCUCACIAIoAiwgAC0AACACKAIodGo2AiwgAiACKAIoQQhqNgIoIAIgAigCUCIAQQFqNgJQIAIgAigCLCAALQAAIAIoAih0ajYCLCACIAIoAihBCGo2AigLIAJBEGogAigCICACKAIsIAIoAhhxQQJ0aigBADYBAAJAA0AgAiACLQARNgIMIAIgAigCLCACKAIMdjYCLCACIAIoAiggAigCDGs2AiggAiACLQAQNgIMIAIoAgxBEHEEQCACIAIvARI2AgQgAiACKAIMQQ9xNgIMIAIoAiggAigCDEkEQCACIAIoAlAiAEEBajYCUCACIAIoAiwgAC0AACACKAIodGo2AiwgAiACKAIoQQhqNgIoIAIoAiggAigCDEkEQCACIAIoAlAiAEEBajYCUCACIAIoAiwgAC0AACACKAIodGo2AiwgAiACKAIoQQhqNgIoCwsgAiACKAIEIAIoAixBASACKAIMdEEBa3FqNgIEIAIgAigCLCACKAIMdjYCLCACIAIoAiggAigCDGs2AiggAiACKAJIIAIoAkRrNgIMAkAgAigCBCACKAIMSwRAIAIgAigCBCACKAIMazYCDCACKAIMIAIoAjhLBEAgAigCVCgCxDcEQCACKAJcQdDxADYCGCACKAJUQdH+ADYCBAwKCwsgAiACKAIwNgIAAkAgAigCNEUEQCACIAIoAgAgAigCPCACKAIMa2o2AgAgAigCDCACKAIISQRAIAIgAigCCCACKAIMazYCCANAIAIgAigCACIAQQFqNgIAIAAtAAAhACACIAIoAkgiAUEBajYCSCABIAA6AAAgAiACKAIMQX9qIgA2AgwgAA0ACyACIAIoAkggAigCBGs2AgALDAELAkAgAigCNCACKAIMSQRAIAIgAigCACACKAI8IAIoAjRqIAIoAgxrajYCACACIAIoAgwgAigCNGs2AgwgAigCDCACKAIISQRAIAIgAigCCCACKAIMazYCCANAIAIgAigCACIAQQFqNgIAIAAtAAAhACACIAIoAkgiAUEBajYCSCABIAA6AAAgAiACKAIMQX9qIgA2AgwgAA0ACyACIAIoAjA2AgAgAigCNCACKAIISQRAIAIgAigCNDYCDCACIAIoAgggAigCDGs2AggDQCACIAIoAgAiAEEBajYCACAALQAAIQAgAiACKAJIIgFBAWo2AkggASAAOgAAIAIgAigCDEF/aiIANgIMIAANAAsgAiACKAJIIAIoAgRrNgIACwsMAQsgAiACKAIAIAIoAjQgAigCDGtqNgIAIAIoAgwgAigCCEkEQCACIAIoAgggAigCDGs2AggDQCACIAIoAgAiAEEBajYCACAALQAAIQAgAiACKAJIIgFBAWo2AkggASAAOgAAIAIgAigCDEF/aiIANgIMIAANAAsgAiACKAJIIAIoAgRrNgIACwsLA0AgAigCCEECTUUEQCACIAIoAgAiAEEBajYCACAALQAAIQAgAiACKAJIIgFBAWo2AkggASAAOgAAIAIgAigCACIAQQFqNgIAIAAtAAAhACACIAIoAkgiAUEBajYCSCABIAA6AAAgAiACKAIAIgBBAWo2AgAgAC0AACEAIAIgAigCSCIBQQFqNgJIIAEgADoAACACIAIoAghBA2s2AggMAQsLDAELIAIgAigCSCACKAIEazYCAANAIAIgAigCACIAQQFqNgIAIAAtAAAhACACIAIoAkgiAUEBajYCSCABIAA6AAAgAiACKAIAIgBBAWo2AgAgAC0AACEAIAIgAigCSCIBQQFqNgJIIAEgADoAACACIAIoAgAiAEEBajYCACAALQAAIQAgAiACKAJIIgFBAWo2AkggASAAOgAAIAIgAigCCEEDazYCCCACKAIIQQJLDQALCyACKAIIBEAgAiACKAIAIgBBAWo2AgAgAC0AACEAIAIgAigCSCIBQQFqNgJIIAEgADoAACACKAIIQQFLBEAgAiACKAIAIgBBAWo2AgAgAC0AACEAIAIgAigCSCIBQQFqNgJIIAEgADoAAAsLDAILIAIoAgxBwABxRQRAIAJBEGogAigCICACLwESIAIoAixBASACKAIMdEEBa3FqQQJ0aigBADYBAAwBCwsgAigCXEHu8QA2AhggAigCVEHR/gA2AgQMBAsMAgsgAigCDEHAAHFFBEAgAkEQaiACKAIkIAIvARIgAigCLEEBIAIoAgx0QQFrcWpBAnRqKAEANgEADAELCyACKAIMQSBxBEAgAigCVEG//gA2AgQMAgsgAigCXEGE8gA2AhggAigCVEHR/gA2AgQMAQtBACEAIAIoAlAgAigCTEkEfyACKAJIIAIoAkBJBUEAC0EBcQ0BCwsgAiACKAIoQQN2NgIIIAIgAigCUCACKAIIazYCUCACIAIoAiggAigCCEEDdGs2AiggAiACKAIsQQEgAigCKHRBAWtxNgIsIAIoAlwgAigCUDYCACACKAJcIAIoAkg2AgwgAigCXAJ/IAIoAlAgAigCTEkEQCACKAJMIAIoAlBrQQVqDAELQQUgAigCUCACKAJMa2sLNgIEIAIoAlwCfyACKAJIIAIoAkBJBEAgAigCQCACKAJIa0GBAmoMAQtBgQIgAigCSCACKAJAa2sLNgIQIAIoAlQgAigCLDYCPCACKAJUIAIoAig2AkALwRABAn8jAEEgayICJAAgAiAANgIYIAIgATYCFAJAA0ACQCACKAIYKAJ0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AkEDNgIcDAELIAIoAhgoAqAtBEAgAigCGAJ/IAIoAhgoAlxBAE4EQCACKAIYKAI4IAIoAhgoAlxqDAELQQALIAIoAhgoAmwgAigCGCgCXGtBABAqIAIoAhggAigCGCgCbDYCXCACKAIYKAIAEB8gAigCGCgCACgCEEUEQCACQQA2AhwMAgsLIAJBATYCHAsgAigCHCEAIAJBIGokACAAC7sMAQJ/IwBBMGsiAiQAIAIgADYCKCACIAE2AiQCQANAAkAgAigCKCgCdEGCAk0EQCACKAIoEFUCQCACKAIoKAJ0QYICSw0AIAIoAiQNACACQQA2AiwMBAsgAigCKCgCdEUNAQsgAigCKEEANgJgAkAgAigCKCgCdEEDSQ0AIAIoAigoAmxBAE0NACACIAIoAigoAjggAigCKCgCbGpBf2o2AhggAiACKAIYLQAANgIcIAIoAhwhACACIAIoAhgiAUEBajYCGAJAIAEtAAEgAEcNACACKAIcIQAgAiACKAIYIgFBAWo2AhggAS0AASAARw0AIAIoAhwhACACIAIoAhgiAUEBajYCGCABLQABIABHDQAgAiACKAIoKAI4IAIoAigoAmxqQYICajYCFANAIAIoAhwhASACIAIoAhgiA0EBajYCGAJ/QQAgAy0AASABRw0AGiACKAIcIQEgAiACKAIYIgNBAWo2AhhBACADLQABIAFHDQAaIAIoAhwhASACIAIoAhgiA0EBajYCGEEAIAMtAAEgAUcNABogAigCHCEBIAIgAigCGCIDQQFqNgIYQQAgAy0AASABRw0AGiACKAIcIQEgAiACKAIYIgNBAWo2AhhBACADLQABIAFHDQAaIAIoAhwhASACIAIoAhgiA0EBajYCGEEAIAMtAAEgAUcNABogAigCHCEBIAIgAigCGCIDQQFqNgIYQQAgAy0AASABRw0AGiACKAIcIQEgAiACKAIYIgNBAWo2AhhBACADLQABIAFHDQAaIAIoAhggAigCFEkLQQFxDQALIAIoAihBggIgAigCFCACKAIYa2s2AmAgAigCKCgCYCACKAIoKAJ0SwRAIAIoAiggAigCKCgCdDYCYAsLCwJAIAIoAigoAmBBA08EQCACIAIoAigoAmBBfWo6ABMgAkEBOwEQIAIoAigiACgCpC0gACgCoC1BAXRqIAIvARA7AQAgAi0AEyEBIAIoAigiACgCmC0hAyAAIAAoAqAtIgBBAWo2AqAtIAAgA2ogAToAACACIAIvARBBf2o7ARAgAigCKCACLQATQaDdAGotAABBAnRqQZgJaiIAIAAvAQBBAWo7AQAgAigCKEGIE2oCfyACLwEQQYACSARAIAIvARAtAKBZDAELIAIvARBBB3VBgAJqLQCgWQtBAnRqIgAgAC8BAEEBajsBACACIAIoAigoAqAtIAIoAigoApwtQQFrRjYCICACKAIoIgAgACgCdCACKAIoKAJgazYCdCACKAIoIgAgAigCKCgCYCAAKAJsajYCbCACKAIoQQA2AmAMAQsgAiACKAIoIgAoAjggACgCbGotAAA6AA8gAigCKCIAKAKkLSAAKAKgLUEBdGpBADsBACACLQAPIQEgAigCKCIAKAKYLSEDIAAgACgCoC0iAEEBajYCoC0gACADaiABOgAAIAIoAiggAi0AD0ECdGoiACAALwGUAUEBajsBlAEgAiACKAIoKAKgLSACKAIoKAKcLUEBa0Y2AiAgAigCKCIAIAAoAnRBf2o2AnQgAigCKCIAIAAoAmxBAWo2AmwLIAIoAiAEQCACKAIoAn8gAigCKCgCXEEATgRAIAIoAigoAjggAigCKCgCXGoMAQtBAAsgAigCKCgCbCACKAIoKAJca0EAECogAigCKCACKAIoKAJsNgJcIAIoAigoAgAQHyACKAIoKAIAKAIQRQRAIAJBADYCLAwECwsMAQsLIAIoAihBADYCtC0gAigCJEEERgRAIAIoAigCfyACKAIoKAJcQQBOBEAgAigCKCgCOCACKAIoKAJcagwBC0EACyACKAIoKAJsIAIoAigoAlxrQQEQKiACKAIoIAIoAigoAmw2AlwgAigCKCgCABAfIAIoAigoAgAoAhBFBEAgAkECNgIsDAILIAJBAzYCLAwBCyACKAIoKAKgLQRAIAIoAigCfyACKAIoKAJcQQBOBEAgAigCKCgCOCACKAIoKAJcagwBC0EACyACKAIoKAJsIAIoAigoAlxrQQAQKiACKAIoIAIoAigoAmw2AlwgAigCKCgCABAfIAIoAigoAgAoAhBFBEAgAkEANgIsDAILCyACQQE2AiwLIAIoAiwhACACQTBqJAAgAAvABQECfyMAQSBrIgIkACACIAA2AhggAiABNgIUAkADQAJAIAIoAhgoAnRFBEAgAigCGBBVIAIoAhgoAnRFBEAgAigCFEUEQCACQQA2AhwMBQsMAgsLIAIoAhhBADYCYCACIAIoAhgiACgCOCAAKAJsai0AADoADyACKAIYIgAoAqQtIAAoAqAtQQF0akEAOwEAIAItAA8hASACKAIYIgAoApgtIQMgACAAKAKgLSIAQQFqNgKgLSAAIANqIAE6AAAgAigCGCACLQAPQQJ0aiIAIAAvAZQBQQFqOwGUASACIAIoAhgoAqAtIAIoAhgoApwtQQFrRjYCECACKAIYIgAgACgCdEF/ajYCdCACKAIYIgAgACgCbEEBajYCbCACKAIQBEAgAigCGAJ/IAIoAhgoAlxBAE4EQCACKAIYKAI4IAIoAhgoAlxqDAELQQALIAIoAhgoAmwgAigCGCgCXGtBABAqIAIoAhggAigCGCgCbDYCXCACKAIYKAIAEB8gAigCGCgCACgCEEUEQCACQQA2AhwMBAsLDAELCyACKAIYQQA2ArQtIAIoAhRBBEYEQCACKAIYAn8gAigCGCgCXEEATgRAIAIoAhgoAjggAigCGCgCXGoMAQtBAAsgAigCGCgCbCACKAIYKAJca0EBECogAigCGCACKAIYKAJsNgJcIAIoAhgoAgAQHyACKAIYKAIAKAIQRQRAIAJBAjYCHAwCCyACQQM2AhwMAQsgAigCGCgCoC0EQCACKAIYAn8gAigCGCgCXEEATgRAIAIoAhgoAjggAigCGCgCXGoMAQtBAAsgAigCGCgCbCACKAIYKAJca0EAECogAigCGCACKAIYKAJsNgJcIAIoAhgoAgAQHyACKAIYKAIAKAIQRQRAIAJBADYCHAwCCwsgAkEBNgIcCyACKAIcIQAgAkEgaiQAIAALtSUBA38jAEFAaiICJAAgAiAANgI4IAIgATYCNAJAAkACQCACKAI4EHYNACACKAI0QQVKDQAgAigCNEEATg0BCyACQX42AjwMAQsgAiACKAI4KAIcNgIsAkACQCACKAI4KAIMRQ0AIAIoAjgoAgQEQCACKAI4KAIARQ0BCyACKAIsKAIEQZoFRw0BIAIoAjRBBEYNAQsgAigCOEGA2QAoAgA2AhggAkF+NgI8DAELIAIoAjgoAhBFBEAgAigCOEGM2QAoAgA2AhggAkF7NgI8DAELIAIgAigCLCgCKDYCMCACKAIsIAIoAjQ2AigCQCACKAIsKAIUBEAgAigCOBAfIAIoAjgoAhBFBEAgAigCLEF/NgIoIAJBADYCPAwDCwwBCwJAIAIoAjgoAgQNACACKAI0QQF0QQlBACACKAI0QQRKG2sgAigCMEEBdEEJQQAgAigCMEEEShtrSg0AIAIoAjRBBEYNACACKAI4QYzZACgCADYCGCACQXs2AjwMAgsLAkAgAigCLCgCBEGaBUcNACACKAI4KAIERQ0AIAIoAjhBjNkAKAIANgIYIAJBezYCPAwBCyACKAIsKAIEQSpGBEAgAiACKAIsKAIwQQR0QYh/akEIdDYCKAJAAkAgAigCLCgCiAFBAkgEQCACKAIsKAKEAUECTg0BCyACQQA2AiQMAQsCQCACKAIsKAKEAUEGSARAIAJBATYCJAwBCwJAIAIoAiwoAoQBQQZGBEAgAkECNgIkDAELIAJBAzYCJAsLCyACIAIoAiggAigCJEEGdHI2AiggAigCLCgCbARAIAIgAigCKEEgcjYCKAsgAiACKAIoQR8gAigCKEEfcGtqNgIoIAIoAiwgAigCKBBLIAIoAiwoAmwEQCACKAIsIAIoAjgoAjBBEHYQSyACKAIsIAIoAjgoAjBB//8DcRBLC0EAQQBBABA/IQAgAigCOCAANgIwIAIoAixB8QA2AgQgAigCOBAfIAIoAiwoAhQEQCACKAIsQX82AiggAkEANgI8DAILCyACKAIsKAIEQTlGBEBBAEEAQQAQHSEAIAIoAjggADYCMCACKAIsKAIIIQEgAigCLCIDKAIUIQAgAyAAQQFqNgIUIAAgAWpBHzoAACACKAIsKAIIIQEgAigCLCIDKAIUIQAgAyAAQQFqNgIUIAAgAWpBiwE6AAAgAigCLCgCCCEBIAIoAiwiAygCFCEAIAMgAEEBajYCFCAAIAFqQQg6AAACQCACKAIsKAIcRQRAIAIoAiwoAgghASACKAIsIgMoAhQhACADIABBAWo2AhQgACABakEAOgAAIAIoAiwoAgghASACKAIsIgMoAhQhACADIABBAWo2AhQgACABakEAOgAAIAIoAiwoAgghASACKAIsIgMoAhQhACADIABBAWo2AhQgACABakEAOgAAIAIoAiwoAgghASACKAIsIgMoAhQhACADIABBAWo2AhQgACABakEAOgAAIAIoAiwoAgghASACKAIsIgMoAhQhACADIABBAWo2AhQgACABakEAOgAAAn9BAiACKAIsKAKEAUEJRg0AGkEBIQBBBEEAIAIoAiwoAogBQQJIBH8gAigCLCgChAFBAkgFQQELQQFxGwshACACKAIsKAIIIQMgAigCLCIEKAIUIQEgBCABQQFqNgIUIAEgA2ogADoAACACKAIsKAIIIQEgAigCLCIDKAIUIQAgAyAAQQFqNgIUIAAgAWpBAzoAACACKAIsQfEANgIEIAIoAjgQHyACKAIsKAIUBEAgAigCLEF/NgIoIAJBADYCPAwECwwBC0EBQQAgAigCLCgCHCgCABtBAkEAIAIoAiwoAhwoAiwbakEEQQAgAigCLCgCHCgCEBtqQQhBACACKAIsKAIcKAIcG2pBEEEAIAIoAiwoAhwoAiQbaiEBIAIoAiwoAgghAyACKAIsIgQoAhQhACAEIABBAWo2AhQgACADaiABOgAAIAIoAiwoAhwoAgRB/wFxIQEgAigCLCgCCCEDIAIoAiwiBCgCFCEAIAQgAEEBajYCFCAAIANqIAE6AAAgAigCLCgCHCgCBEEIdkH/AXEhASACKAIsKAIIIQMgAigCLCIEKAIUIQAgBCAAQQFqNgIUIAAgA2ogAToAACACKAIsKAIcKAIEQRB2Qf8BcSEBIAIoAiwoAgghAyACKAIsIgQoAhQhACAEIABBAWo2AhQgACADaiABOgAAIAIoAiwoAhwoAgRBGHYhASACKAIsKAIIIQMgAigCLCIEKAIUIQAgBCAAQQFqNgIUIAAgA2ogAToAAAJ/QQIgAigCLCgChAFBCUYNABpBASEAQQRBACACKAIsKAKIAUECSAR/IAIoAiwoAoQBQQJIBUEBC0EBcRsLIQAgAigCLCgCCCEDIAIoAiwiBCgCFCEBIAQgAUEBajYCFCABIANqIAA6AAAgAigCLCgCHCgCDEH/AXEhASACKAIsKAIIIQMgAigCLCIEKAIUIQAgBCAAQQFqNgIUIAAgA2ogAToAACACKAIsKAIcKAIQBEAgAigCLCgCHCgCFEH/AXEhASACKAIsKAIIIQMgAigCLCIEKAIUIQAgBCAAQQFqNgIUIAAgA2ogAToAACACKAIsKAIcKAIUQQh2Qf8BcSEBIAIoAiwoAgghAyACKAIsIgQoAhQhACAEIABBAWo2AhQgACADaiABOgAACyACKAIsKAIcKAIsBEAgAigCOCgCMCACKAIsKAIIIAIoAiwoAhQQHSEAIAIoAjggADYCMAsgAigCLEEANgIgIAIoAixBxQA2AgQLCyACKAIsKAIEQcUARgRAIAIoAiwoAhwoAhAEQCACIAIoAiwoAhQ2AiAgAiACKAIsKAIcKAIUQf//A3EgAigCLCgCIGs2AhwDQCACKAIsKAIUIAIoAhxqIAIoAiwoAgxLBEAgAiACKAIsKAIMIAIoAiwoAhRrNgIYIAIoAiwoAgggAigCLCgCFGogAigCLCgCHCgCECACKAIsKAIgaiACKAIYEBwaIAIoAiwgAigCLCgCDDYCFAJAIAIoAiwoAhwoAixFDQAgAigCLCgCFCACKAIgTQ0AIAIoAjgoAjAgAigCLCgCCCACKAIgaiACKAIsKAIUIAIoAiBrEB0hACACKAI4IAA2AjALIAIoAiwiACACKAIYIAAoAiBqNgIgIAIoAjgQHyACKAIsKAIUBEAgAigCLEF/NgIoIAJBADYCPAwFBSACQQA2AiAgAiACKAIcIAIoAhhrNgIcDAILAAsLIAIoAiwoAgggAigCLCgCFGogAigCLCgCHCgCECACKAIsKAIgaiACKAIcEBwaIAIoAiwiACACKAIcIAAoAhRqNgIUAkAgAigCLCgCHCgCLEUNACACKAIsKAIUIAIoAiBNDQAgAigCOCgCMCACKAIsKAIIIAIoAiBqIAIoAiwoAhQgAigCIGsQHSEAIAIoAjggADYCMAsgAigCLEEANgIgCyACKAIsQckANgIECyACKAIsKAIEQckARgRAIAIoAiwoAhwoAhwEQCACIAIoAiwoAhQ2AhQDQCACKAIsKAIUIAIoAiwoAgxGBEACQCACKAIsKAIcKAIsRQ0AIAIoAiwoAhQgAigCFE0NACACKAI4KAIwIAIoAiwoAgggAigCFGogAigCLCgCFCACKAIUaxAdIQAgAigCOCAANgIwCyACKAI4EB8gAigCLCgCFARAIAIoAixBfzYCKCACQQA2AjwMBQsgAkEANgIUCyACKAIsKAIcKAIcIQEgAigCLCIDKAIgIQAgAyAAQQFqNgIgIAIgACABai0AADYCECACKAIQIQEgAigCLCgCCCEDIAIoAiwiBCgCFCEAIAQgAEEBajYCFCAAIANqIAE6AAAgAigCEA0ACwJAIAIoAiwoAhwoAixFDQAgAigCLCgCFCACKAIUTQ0AIAIoAjgoAjAgAigCLCgCCCACKAIUaiACKAIsKAIUIAIoAhRrEB0hACACKAI4IAA2AjALIAIoAixBADYCIAsgAigCLEHbADYCBAsgAigCLCgCBEHbAEYEQCACKAIsKAIcKAIkBEAgAiACKAIsKAIUNgIMA0AgAigCLCgCFCACKAIsKAIMRgRAAkAgAigCLCgCHCgCLEUNACACKAIsKAIUIAIoAgxNDQAgAigCOCgCMCACKAIsKAIIIAIoAgxqIAIoAiwoAhQgAigCDGsQHSEAIAIoAjggADYCMAsgAigCOBAfIAIoAiwoAhQEQCACKAIsQX82AiggAkEANgI8DAULIAJBADYCDAsgAigCLCgCHCgCJCEBIAIoAiwiAygCICEAIAMgAEEBajYCICACIAAgAWotAAA2AgggAigCCCEBIAIoAiwoAgghAyACKAIsIgQoAhQhACAEIABBAWo2AhQgACADaiABOgAAIAIoAggNAAsCQCACKAIsKAIcKAIsRQ0AIAIoAiwoAhQgAigCDE0NACACKAI4KAIwIAIoAiwoAgggAigCDGogAigCLCgCFCACKAIMaxAdIQAgAigCOCAANgIwCwsgAigCLEHnADYCBAsgAigCLCgCBEHnAEYEQCACKAIsKAIcKAIsBEAgAigCLCgCFEECaiACKAIsKAIMSwRAIAIoAjgQHyACKAIsKAIUBEAgAigCLEF/NgIoIAJBADYCPAwECwsgAigCOCgCMEH/AXEhASACKAIsKAIIIQMgAigCLCIEKAIUIQAgBCAAQQFqNgIUIAAgA2ogAToAACACKAI4KAIwQQh2Qf8BcSEBIAIoAiwoAgghAyACKAIsIgQoAhQhACAEIABBAWo2AhQgACADaiABOgAAQQBBAEEAEB0hACACKAI4IAA2AjALIAIoAixB8QA2AgQgAigCOBAfIAIoAiwoAhQEQCACKAIsQX82AiggAkEANgI8DAILCwJAAkAgAigCOCgCBA0AIAIoAiwoAnQNACACKAI0RQ0BIAIoAiwoAgRBmgVGDQELIAICfyACKAIsKAKEAUUEQCACKAIsIAIoAjQQpwEMAQsCfyACKAIsKAKIAUECRgRAIAIoAiwgAigCNBDLAgwBCwJ/IAIoAiwoAogBQQNGBEAgAigCLCACKAI0EMoCDAELIAIoAiwgAigCNCACKAIsKAKEAUEMbEHQ7gBqKAIIEQcACwsLNgIEAkAgAigCBEECRwRAIAIoAgRBA0cNAQsgAigCLEGaBTYCBAsCQCACKAIEBEAgAigCBEECRw0BCyACKAI4KAIQRQRAIAIoAixBfzYCKAsgAkEANgI8DAILIAIoAgRBAUYEQAJAIAIoAjRBAUYEQCACKAIsENkCDAELIAIoAjRBBUcEQCACKAIsQQBBAEEAEFYgAigCNEEDRgRAIAIoAiwoAkQgAigCLCgCTEEBa0EBdGpBADsBACACKAIsKAJEQQAgAigCLCgCTEEBa0EBdBA0IAIoAiwoAnRFBEAgAigCLEEANgJsIAIoAixBADYCXCACKAIsQQA2ArQtCwsLCyACKAI4EB8gAigCOCgCEEUEQCACKAIsQX82AiggAkEANgI8DAMLCwsgAigCNEEERwRAIAJBADYCPAwBCyACKAIsKAIYQQBMBEAgAkEBNgI8DAELAkAgAigCLCgCGEECRgRAIAIoAjgoAjBB/wFxIQEgAigCLCgCCCEDIAIoAiwiBCgCFCEAIAQgAEEBajYCFCAAIANqIAE6AAAgAigCOCgCMEEIdkH/AXEhASACKAIsKAIIIQMgAigCLCIEKAIUIQAgBCAAQQFqNgIUIAAgA2ogAToAACACKAI4KAIwQRB2Qf8BcSEBIAIoAiwoAgghAyACKAIsIgQoAhQhACAEIABBAWo2AhQgACADaiABOgAAIAIoAjgoAjBBGHYhASACKAIsKAIIIQMgAigCLCIEKAIUIQAgBCAAQQFqNgIUIAAgA2ogAToAACACKAI4KAIIQf8BcSEBIAIoAiwoAgghAyACKAIsIgQoAhQhACAEIABBAWo2AhQgACADaiABOgAAIAIoAjgoAghBCHZB/wFxIQEgAigCLCgCCCEDIAIoAiwiBCgCFCEAIAQgAEEBajYCFCAAIANqIAE6AAAgAigCOCgCCEEQdkH/AXEhASACKAIsKAIIIQMgAigCLCIEKAIUIQAgBCAAQQFqNgIUIAAgA2ogAToAACACKAI4KAIIQRh2IQEgAigCLCgCCCEDIAIoAiwiBCgCFCEAIAQgAEEBajYCFCAAIANqIAE6AAAMAQsgAigCLCACKAI4KAIwQRB2EEsgAigCLCACKAI4KAIwQf//A3EQSwsgAigCOBAfIAIoAiwoAhhBAEoEQCACKAIsQQAgAigCLCgCGGs2AhgLIAJBAEEBIAIoAiwoAhQbNgI8CyACKAI8IQAgAkFAayQAIAALjgIBAX8jAEEgayIBIAA2AhwgASABKAIcKAIsNgIMIAEgASgCHCgCTDYCGCABIAEoAhwoAkQgASgCGEEBdGo2AhADQCABIAEoAhBBfmoiADYCECABIAAvAQA2AhQgASgCEAJ/IAEoAhQgASgCDE8EQCABKAIUIAEoAgxrDAELQQALOwEAIAEgASgCGEF/aiIANgIYIAANAAsgASABKAIMNgIYIAEgASgCHCgCQCABKAIYQQF0ajYCEANAIAEgASgCEEF+aiIANgIQIAEgAC8BADYCFCABKAIQAn8gASgCFCABKAIMTwRAIAEoAhQgASgCDGsMAQtBAAs7AQAgASABKAIYQX9qIgA2AhggAA0ACwuoAgEBfyMAQRBrIgEkACABIAA2AgwgASgCDCABKAIMKAIsQQF0NgI8IAEoAgwoAkQgASgCDCgCTEEBa0EBdGpBADsBACABKAIMKAJEQQAgASgCDCgCTEEBa0EBdBA0IAEoAgwgASgCDCgChAFBDGxB0O4Aai8BAjYCgAEgASgCDCABKAIMKAKEAUEMbEHQ7gBqLwEANgKMASABKAIMIAEoAgwoAoQBQQxsQdDuAGovAQQ2ApABIAEoAgwgASgCDCgChAFBDGxB0O4Aai8BBjYCfCABKAIMQQA2AmwgASgCDEEANgJcIAEoAgxBADYCdCABKAIMQQA2ArQtIAEoAgxBAjYCeCABKAIMQQI2AmAgASgCDEEANgJoIAEoAgxBADYCSCABQRBqJAALmwIBAX8jAEEQayIBJAAgASAANgIIAkAgASgCCBB2BEAgAUF+NgIMDAELIAEoAghBADYCFCABKAIIQQA2AgggASgCCEEANgIYIAEoAghBAjYCLCABIAEoAggoAhw2AgQgASgCBEEANgIUIAEoAgQgASgCBCgCCDYCECABKAIEKAIYQQBIBEAgASgCBEEAIAEoAgQoAhhrNgIYCyABKAIEAn9BOSABKAIEKAIYQQJGDQAaQSpB8QAgASgCBCgCGBsLNgIEAn8gASgCBCgCGEECRgRAQQBBAEEAEB0MAQtBAEEAQQAQPwshACABKAIIIAA2AjAgASgCBEEANgIoIAEoAgQQ3QIgAUEANgIMCyABKAIMIQAgAUEQaiQAIAALWQEBfyAAIAAtAEoiAUF/aiABcjoASiAAKAIAIgFBCHEEQCAAIAFBIHI2AgBBfw8LIABCADcCBCAAIAAoAiwiATYCHCAAIAE2AhQgACABIAAoAjBqNgIQQQALRQEBfyMAQRBrIgEkACABIAA2AgwgASABKAIMEM8CNgIIIAEoAghFBEAgASgCDCgCHBDOAgsgASgCCCEAIAFBEGokACAAC+AIAQF/IwBBMGsiAiQAIAIgADYCKCACIAE2AiQgAkEINgIgIAJBcTYCHCACQQk2AhggAkEANgIUIAJBsIcBNgIQIAJBODYCDCACQQE2AgQCQAJAAkAgAigCEEUNACACKAIQLAAAQcjuACwAAEcNACACKAIMQThGDQELIAJBejYCLAwBCyACKAIoRQRAIAJBfjYCLAwBCyACKAIoQQA2AhggAigCKCgCIEUEQCACKAIoQQc2AiAgAigCKEEANgIoCyACKAIoKAIkRQRAIAIoAihBCDYCJAsgAigCJEF/RgRAIAJBBjYCJAsCQCACKAIcQQBIBEAgAkEANgIEIAJBACACKAIcazYCHAwBCyACKAIcQQ9KBEAgAkECNgIEIAIgAigCHEEQazYCHAsLAkACQCACKAIYQQFIDQAgAigCGEEJSg0AIAIoAiBBCEcNACACKAIcQQhIDQAgAigCHEEPSg0AIAIoAiRBAEgNACACKAIkQQlKDQAgAigCFEEASA0AIAIoAhRBBEoNACACKAIcQQhHDQEgAigCBEEBRg0BCyACQX42AiwMAQsgAigCHEEIRgRAIAJBCTYCHAsgAiACKAIoKAIoQQFBxC0gAigCKCgCIBEAADYCCCACKAIIRQRAIAJBfDYCLAwBCyACKAIoIAIoAgg2AhwgAigCCCACKAIoNgIAIAIoAghBKjYCBCACKAIIIAIoAgQ2AhggAigCCEEANgIcIAIoAgggAigCHDYCMCACKAIIQQEgAigCCCgCMHQ2AiwgAigCCCACKAIIKAIsQQFrNgI0IAIoAgggAigCGEEHajYCUCACKAIIQQEgAigCCCgCUHQ2AkwgAigCCCACKAIIKAJMQQFrNgJUIAIoAgggAigCCCgCUEECakEDbjYCWCACKAIoKAIoIAIoAggoAixBAiACKAIoKAIgEQAAIQAgAigCCCAANgI4IAIoAigoAiggAigCCCgCLEECIAIoAigoAiARAAAhACACKAIIIAA2AkAgAigCKCgCKCACKAIIKAJMQQIgAigCKCgCIBEAACEAIAIoAgggADYCRCACKAIIQQA2AsAtIAIoAghBASACKAIYQQZqdDYCnC0gAiACKAIoKAIoIAIoAggoApwtQQQgAigCKCgCIBEAADYCACACKAIIIAIoAgA2AgggAigCCCACKAIIKAKcLUECdDYCDAJAAkAgAigCCCgCOEUNACACKAIIKAJARQ0AIAIoAggoAkRFDQAgAigCCCgCCA0BCyACKAIIQZoFNgIEIAIoAihBiNkAKAIANgIYIAIoAigQqAEaIAJBfDYCLAwBCyACKAIIIAIoAgAgAigCCCgCnC1BAXZBAXRqNgKkLSACKAIIIAIoAggoAgggAigCCCgCnC1BA2xqNgKYLSACKAIIIAIoAiQ2AoQBIAIoAgggAigCFDYCiAEgAigCCCACKAIgOgAkIAIgAigCKBDRAjYCLAsgAigCLCEAIAJBMGokACAAC2wBAX8jAEEQayICIAA2AgwgAiABNgIIIAJBADYCBANAIAIgAigCBCACKAIMQQFxcjYCBCACIAIoAgxBAXY2AgwgAiACKAIEQQF0NgIEIAIgAigCCEF/aiIANgIIIABBAEoNAAsgAigCBEEBdguVAgEBfyMAQUBqIgMkACADIAA2AjwgAyABNgI4IAMgAjYCNCADQQA2AgwgA0EBNgIIA0AgAygCCEEPSkUEQCADIAMoAgwgAygCNCADKAIIQQFrQQF0ai8BAGpBAXQ2AgwgA0EQaiADKAIIQQF0aiADKAIMOwEAIAMgAygCCEEBajYCCAwBCwsgA0EANgIEA0AgAygCBCADKAI4TARAIAMgAygCPCADKAIEQQJ0ai8BAjYCACADKAIABEAgA0EQaiADKAIAQQF0aiIBLwEAIQAgASAAQQFqOwEAIABB//8DcSADKAIAENMCIQAgAygCPCADKAIEQQJ0aiAAOwEACyADIAMoAgRBAWo2AgQMAQsLIANBQGskAAuICAEBfyMAQUBqIgIgADYCPCACIAE2AjggAiACKAI4KAIANgI0IAIgAigCOCgCBDYCMCACIAIoAjgoAggoAgA2AiwgAiACKAI4KAIIKAIENgIoIAIgAigCOCgCCCgCCDYCJCACIAIoAjgoAggoAhA2AiAgAkEANgIEIAJBADYCEANAIAIoAhBBD0pFBEAgAigCPEG8FmogAigCEEEBdGpBADsBACACIAIoAhBBAWo2AhAMAQsLIAIoAjQgAigCPEHcFmogAigCPCgC1ChBAnRqKAIAQQJ0akEAOwECIAIgAigCPCgC1ChBAWo2AhwDQCACKAIcQb0ESARAIAIgAigCPEHcFmogAigCHEECdGooAgA2AhggAiACKAI0IAIoAjQgAigCGEECdGovAQJBAnRqLwECQQFqNgIQIAIoAhAgAigCIEoEQCACIAIoAiA2AhAgAiACKAIEQQFqNgIECyACKAI0IAIoAhhBAnRqIAIoAhA7AQIgAigCGCACKAIwTARAIAIoAjwgAigCEEEBdGpBvBZqIgAgAC8BAEEBajsBACACQQA2AgwgAigCGCACKAIkTgRAIAIgAigCKCACKAIYIAIoAiRrQQJ0aigCADYCDAsgAiACKAI0IAIoAhhBAnRqLwEAOwEKIAIoAjwiACAAKAKoLSACLwEKIAIoAhAgAigCDGpsajYCqC0gAigCLARAIAIoAjwiACAAKAKsLSACLwEKIAIoAiwgAigCGEECdGovAQIgAigCDGpsajYCrC0LCyACIAIoAhxBAWo2AhwMAQsLAkAgAigCBEUNAANAIAIgAigCIEEBazYCEANAIAIoAjxBvBZqIAIoAhBBAXRqLwEARQRAIAIgAigCEEF/ajYCEAwBCwsgAigCPCACKAIQQQF0akG8FmoiACAALwEAQX9qOwEAIAIoAjwgAigCEEEBdGpBvhZqIgAgAC8BAEECajsBACACKAI8IAIoAiBBAXRqQbwWaiIAIAAvAQBBf2o7AQAgAiACKAIEQQJrNgIEIAIoAgRBAEoNAAsgAiACKAIgNgIQA0AgAigCEEUNASACIAIoAjxBvBZqIAIoAhBBAXRqLwEANgIYA0AgAigCGARAIAIoAjxB3BZqIQAgAiACKAIcQX9qIgE2AhwgAiABQQJ0IABqKAIANgIUIAIoAhQgAigCMEoNASACKAI0IAIoAhRBAnRqLwECIAIoAhBHBEAgAigCPCIAIAAoAqgtIAIoAjQgAigCFEECdGovAQAgAigCECACKAI0IAIoAhRBAnRqLwECa2xqNgKoLSACKAI0IAIoAhRBAnRqIAIoAhA7AQILIAIgAigCGEF/ajYCGAwBCwsgAiACKAIQQX9qNgIQDAAACwALC6ULAQF/IwBBQGoiBCQAIAQgADYCPCAEIAE2AjggBCACNgI0IAQgAzYCMCAEQQU2AigCQCAEKAI8KAK8LUEQIAQoAihrSgRAIAQgBCgCOEGBAms2AiQgBCgCPCIAIAAvAbgtIAQoAiRB//8DcSAEKAI8KAK8LXRyOwG4LSAEKAI8LwG4LUH/AXEhASAEKAI8KAIIIQIgBCgCPCIDKAIUIQAgAyAAQQFqNgIUIAAgAmogAToAACAEKAI8LwG4LUEIdSEBIAQoAjwoAgghAiAEKAI8IgMoAhQhACADIABBAWo2AhQgACACaiABOgAAIAQoAjwgBCgCJEH//wNxQRAgBCgCPCgCvC1rdTsBuC0gBCgCPCIAIAAoArwtIAQoAihBEGtqNgK8LQwBCyAEKAI8IgAgAC8BuC0gBCgCOEGBAmtB//8DcSAEKAI8KAK8LXRyOwG4LSAEKAI8IgAgBCgCKCAAKAK8LWo2ArwtCyAEQQU2AiACQCAEKAI8KAK8LUEQIAQoAiBrSgRAIAQgBCgCNEEBazYCHCAEKAI8IgAgAC8BuC0gBCgCHEH//wNxIAQoAjwoArwtdHI7AbgtIAQoAjwvAbgtQf8BcSEBIAQoAjwoAgghAiAEKAI8IgMoAhQhACADIABBAWo2AhQgACACaiABOgAAIAQoAjwvAbgtQQh1IQEgBCgCPCgCCCECIAQoAjwiAygCFCEAIAMgAEEBajYCFCAAIAJqIAE6AAAgBCgCPCAEKAIcQf//A3FBECAEKAI8KAK8LWt1OwG4LSAEKAI8IgAgACgCvC0gBCgCIEEQa2o2ArwtDAELIAQoAjwiACAALwG4LSAEKAI0QQFrQf//A3EgBCgCPCgCvC10cjsBuC0gBCgCPCIAIAQoAiAgACgCvC1qNgK8LQsgBEEENgIYAkAgBCgCPCgCvC1BECAEKAIYa0oEQCAEIAQoAjBBBGs2AhQgBCgCPCIAIAAvAbgtIAQoAhRB//8DcSAEKAI8KAK8LXRyOwG4LSAEKAI8LwG4LUH/AXEhASAEKAI8KAIIIQIgBCgCPCIDKAIUIQAgAyAAQQFqNgIUIAAgAmogAToAACAEKAI8LwG4LUEIdSEBIAQoAjwoAgghAiAEKAI8IgMoAhQhACADIABBAWo2AhQgACACaiABOgAAIAQoAjwgBCgCFEH//wNxQRAgBCgCPCgCvC1rdTsBuC0gBCgCPCIAIAAoArwtIAQoAhhBEGtqNgK8LQwBCyAEKAI8IgAgAC8BuC0gBCgCMEEEa0H//wNxIAQoAjwoArwtdHI7AbgtIAQoAjwiACAEKAIYIAAoArwtajYCvC0LIARBADYCLANAIAQoAiwgBCgCME5FBEAgBEEDNgIQAkAgBCgCPCgCvC1BECAEKAIQa0oEQCAEIAQoAjxB/BRqIAQoAiwtALBsQQJ0ai8BAjYCDCAEKAI8IgAgAC8BuC0gBCgCDEH//wNxIAQoAjwoArwtdHI7AbgtIAQoAjwvAbgtQf8BcSEBIAQoAjwoAgghAiAEKAI8IgMoAhQhACADIABBAWo2AhQgACACaiABOgAAIAQoAjwvAbgtQQh1IQEgBCgCPCgCCCECIAQoAjwiAygCFCEAIAMgAEEBajYCFCAAIAJqIAE6AAAgBCgCPCAEKAIMQf//A3FBECAEKAI8KAK8LWt1OwG4LSAEKAI8IgAgACgCvC0gBCgCEEEQa2o2ArwtDAELIAQoAjwiACAALwG4LSAEKAI8QfwUaiAEKAIsLQCwbEECdGovAQIgBCgCPCgCvC10cjsBuC0gBCgCPCIAIAQoAhAgACgCvC1qNgK8LQsgBCAEKAIsQQFqNgIsDAELCyAEKAI8IAQoAjxBlAFqIAQoAjhBAWsQqQEgBCgCPCAEKAI8QYgTaiAEKAI0QQFrEKkBIARBQGskAAvGAQEBfyMAQRBrIgEkACABIAA2AgwgASgCDCABKAIMQZQBaiABKAIMKAKcFhCqASABKAIMIAEoAgxBiBNqIAEoAgwoAqgWEKoBIAEoAgwgASgCDEGwFmoQeSABQRI2AggDQAJAIAEoAghBA0gNACABKAIMQfwUaiABKAIILQCwbEECdGovAQINACABIAEoAghBf2o2AggMAQsLIAEoAgwiACAAKAKoLSABKAIIQQNsQRFqajYCqC0gASgCCCEAIAFBEGokACAAC4MCAQF/IwBBEGsiASAANgIIIAFB/4D/n382AgQgAUEANgIAAkADQCABKAIAQR9MBEACQCABKAIEQQFxRQ0AIAEoAghBlAFqIAEoAgBBAnRqLwEARQ0AIAFBADYCDAwDCyABIAEoAgBBAWo2AgAgASABKAIEQQF2NgIEDAELCwJAAkAgASgCCC8BuAENACABKAIILwG8AQ0AIAEoAggvAcgBRQ0BCyABQQE2AgwMAQsgAUEgNgIAA0AgASgCAEGAAkgEQCABKAIIQZQBaiABKAIAQQJ0ai8BAARAIAFBATYCDAwDBSABIAEoAgBBAWo2AgAMAgsACwsgAUEANgIMCyABKAIMC44FAQR/IwBBIGsiASQAIAEgADYCHCABQQM2AhgCQCABKAIcKAK8LUEQIAEoAhhrSgRAIAFBAjYCFCABKAIcIgAgAC8BuC0gASgCFEH//wNxIAEoAhwoArwtdHI7AbgtIAEoAhwvAbgtQf8BcSECIAEoAhwoAgghAyABKAIcIgQoAhQhACAEIABBAWo2AhQgACADaiACOgAAIAEoAhwvAbgtQQh1IQIgASgCHCgCCCEDIAEoAhwiBCgCFCEAIAQgAEEBajYCFCAAIANqIAI6AAAgASgCHCABKAIUQf//A3FBECABKAIcKAK8LWt1OwG4LSABKAIcIgAgACgCvC0gASgCGEEQa2o2ArwtDAELIAEoAhwiACAALwG4LUECIAEoAhwoArwtdHI7AbgtIAEoAhwiACABKAIYIAAoArwtajYCvC0LIAFB4ucALwEANgIQAkAgASgCHCgCvC1BECABKAIQa0oEQCABQeDnAC8BADYCDCABKAIcIgAgAC8BuC0gASgCDEH//wNxIAEoAhwoArwtdHI7AbgtIAEoAhwvAbgtQf8BcSECIAEoAhwoAgghAyABKAIcIgQoAhQhACAEIABBAWo2AhQgACADaiACOgAAIAEoAhwvAbgtQQh1IQIgASgCHCgCCCEDIAEoAhwiBCgCFCEAIAQgAEEBajYCFCAAIANqIAI6AAAgASgCHCABKAIMQf//A3FBECABKAIcKAK8LWt1OwG4LSABKAIcIgAgACgCvC0gASgCEEEQa2o2ArwtDAELIAEoAhwiACAALwG4LUHg5wAvAQAgASgCHCgCvC10cjsBuC0gASgCHCIAIAEoAhAgACgCvC1qNgK8LQsgASgCHBCsASABQSBqJAALIwEBfyMAQRBrIgEkACABIAA2AgwgASgCDBCsASABQRBqJAAL2QMCAn8CfiMAQSBrIgIkAAJAIAFC////////////AIMiBUKAgICAgIDA/0N8IAVCgICAgICAwIC8f3xUBEAgAUIEhiAAQjyIhCEEIABC//////////8PgyIAQoGAgICAgICACFoEQCAEQoGAgICAgICAwAB8IQQMAgsgBEKAgICAgICAgEB9IQQgAEKAgICAgICAgAiFQgBSDQEgBEIBgyAEfCEEDAELIABQIAVCgICAgICAwP//AFQgBUKAgICAgIDA//8AURtFBEAgAUIEhiAAQjyIhEL/////////A4NCgICAgICAgPz/AIQhBAwBC0KAgICAgICA+P8AIQQgBUL///////+//8MAVg0AQgAhBCAFQjCIpyIDQZH3AEkNACACIAAgAUL///////8/g0KAgICAgIDAAIQiBEGB+AAgA2sQ6QIgAkEQaiAAIAQgA0H/iH9qEOICIAIpAwhCBIYgAikDACIAQjyIhCEEIAIpAxAgAikDGIRCAFKtIABC//////////8Pg4QiAEKBgICAgICAgAhaBEAgBEIBfCEEDAELIABCgICAgICAgIAIhUIAUg0AIARCAYMgBHwhBAsgAkEgaiQAIAQgAUKAgICAgICAgIB/g4S/C0UAQaCcAUIANwMAQZicAUIANwMAQZCcAUIANwMAQYicAUIANwMAQYCcAUIANwMAQfibAUIANwMAQfCbAUIANwMAQfCbAQuWAQEBfyMAQRBrIgEkACABIAA2AgwgASgCDCABKAIMQZQBajYCmBYgASgCDEGg3wA2AqAWIAEoAgwgASgCDEGIE2o2AqQWIAEoAgxBtN8ANgKsFiABKAIMIAEoAgxB/BRqNgKwFiABKAIMQcjfADYCuBYgASgCDEEAOwG4LSABKAIMQQA2ArwtIAEoAgwQrgEgAUEQaiQAC9cNAQF/IwBBIGsiAyAANgIYIAMgATYCFCADIAI2AhAgAyADKAIYQRB2NgIMIAMgAygCGEH//wNxNgIYAkAgAygCEEEBRgRAIAMgAygCFC0AACADKAIYajYCGCADKAIYQfH/A08EQCADIAMoAhhB8f8DazYCGAsgAyADKAIYIAMoAgxqNgIMIAMoAgxB8f8DTwRAIAMgAygCDEHx/wNrNgIMCyADIAMoAhggAygCDEEQdHI2AhwMAQsgAygCFEUEQCADQQE2AhwMAQsgAygCEEEQSQRAA0AgAyADKAIQIgBBf2o2AhAgAARAIAMgAygCFCIAQQFqNgIUIAMgAC0AACADKAIYajYCGCADIAMoAhggAygCDGo2AgwMAQsLIAMoAhhB8f8DTwRAIAMgAygCGEHx/wNrNgIYCyADIAMoAgxB8f8DcDYCDCADIAMoAhggAygCDEEQdHI2AhwMAQsDQCADKAIQQbArSUUEQCADIAMoAhBBsCtrNgIQIANB2wI2AggDQCADIAMoAhQtAAAgAygCGGo2AhggAyADKAIYIAMoAgxqNgIMIAMgAygCFC0AASADKAIYajYCGCADIAMoAhggAygCDGo2AgwgAyADKAIULQACIAMoAhhqNgIYIAMgAygCGCADKAIMajYCDCADIAMoAhQtAAMgAygCGGo2AhggAyADKAIYIAMoAgxqNgIMIAMgAygCFC0ABCADKAIYajYCGCADIAMoAhggAygCDGo2AgwgAyADKAIULQAFIAMoAhhqNgIYIAMgAygCGCADKAIMajYCDCADIAMoAhQtAAYgAygCGGo2AhggAyADKAIYIAMoAgxqNgIMIAMgAygCFC0AByADKAIYajYCGCADIAMoAhggAygCDGo2AgwgAyADKAIULQAIIAMoAhhqNgIYIAMgAygCGCADKAIMajYCDCADIAMoAhQtAAkgAygCGGo2AhggAyADKAIYIAMoAgxqNgIMIAMgAygCFC0ACiADKAIYajYCGCADIAMoAhggAygCDGo2AgwgAyADKAIULQALIAMoAhhqNgIYIAMgAygCGCADKAIMajYCDCADIAMoAhQtAAwgAygCGGo2AhggAyADKAIYIAMoAgxqNgIMIAMgAygCFC0ADSADKAIYajYCGCADIAMoAhggAygCDGo2AgwgAyADKAIULQAOIAMoAhhqNgIYIAMgAygCGCADKAIMajYCDCADIAMoAhQtAA8gAygCGGo2AhggAyADKAIYIAMoAgxqNgIMIAMgAygCFEEQajYCFCADIAMoAghBf2oiADYCCCAADQALIAMgAygCGEHx/wNwNgIYIAMgAygCDEHx/wNwNgIMDAELCyADKAIQBEADQCADKAIQQRBJRQRAIAMgAygCEEEQazYCECADIAMoAhQtAAAgAygCGGo2AhggAyADKAIYIAMoAgxqNgIMIAMgAygCFC0AASADKAIYajYCGCADIAMoAhggAygCDGo2AgwgAyADKAIULQACIAMoAhhqNgIYIAMgAygCGCADKAIMajYCDCADIAMoAhQtAAMgAygCGGo2AhggAyADKAIYIAMoAgxqNgIMIAMgAygCFC0ABCADKAIYajYCGCADIAMoAhggAygCDGo2AgwgAyADKAIULQAFIAMoAhhqNgIYIAMgAygCGCADKAIMajYCDCADIAMoAhQtAAYgAygCGGo2AhggAyADKAIYIAMoAgxqNgIMIAMgAygCFC0AByADKAIYajYCGCADIAMoAhggAygCDGo2AgwgAyADKAIULQAIIAMoAhhqNgIYIAMgAygCGCADKAIMajYCDCADIAMoAhQtAAkgAygCGGo2AhggAyADKAIYIAMoAgxqNgIMIAMgAygCFC0ACiADKAIYajYCGCADIAMoAhggAygCDGo2AgwgAyADKAIULQALIAMoAhhqNgIYIAMgAygCGCADKAIMajYCDCADIAMoAhQtAAwgAygCGGo2AhggAyADKAIYIAMoAgxqNgIMIAMgAygCFC0ADSADKAIYajYCGCADIAMoAhggAygCDGo2AgwgAyADKAIULQAOIAMoAhhqNgIYIAMgAygCGCADKAIMajYCDCADIAMoAhQtAA8gAygCGGo2AhggAyADKAIYIAMoAgxqNgIMIAMgAygCFEEQajYCFAwBCwsDQCADIAMoAhAiAEF/ajYCECAABEAgAyADKAIUIgBBAWo2AhQgAyAALQAAIAMoAhhqNgIYIAMgAygCGCADKAIMajYCDAwBCwsgAyADKAIYQfH/A3A2AhggAyADKAIMQfH/A3A2AgwLIAMgAygCGCADKAIMQRB0cjYCHAsgAygCHAspAQF/IwBBEGsiAiQAIAIgADYCDCACIAE2AgggAigCCBAYIAJBEGokAAs6AQF/IwBBEGsiAyQAIAMgADYCDCADIAE2AgggAyACNgIEIAMoAgggAygCBGwQGyEAIANBEGokACAAC4QCAgF/AX4jAEHgAGsiAiQAIAIgADYCWCACIAE2AlQgAiACKAJYIAJByABqQgwQMSIDNwMIAkAgA0IAUwRAIAIoAlQgAigCWBAaIAJBfzYCXAwBCyACKQMIQgxSBEAgAigCVEERQQAQFyACQX82AlwMAQsgAigCVCACQcgAaiIAIABCDEEAEHsgAigCWCACQRBqEDlBAEgEQCACQQA2AlwMAQsgAigCOCACQQZqIAJBBGoQuwECQCACLQBTIAIoAjxBGHZGDQAgAi0AUyACLwEGQQh1Rg0AIAIoAlRBG0EAEBcgAkF/NgJcDAEL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WAsgBCkDWCECIARB4ABqJAAgAgvnAwEBfyMAQUBqIgMkACADIAA2AjQgAyABNgIwIAMgAjcDKCADAn4gAykDKCADKAI0KQMwIAMoAjQpAzh9VARAIAMpAygMAQsgAygCNCkDMCADKAI0KQM4fQs3AygCQCADKQMoUARAIANCADcDOAwBCyADKQMoQv///////////wBWBEAgA0J/NwM4DAELIAMgAygCNCkDQDcDGCADIAMoAjQpAzggAygCNCgCBCADKQMYp0EDdGopAwB9NwMQIANCADcDIANAIAMpAyAgAykDKFQEQCADAn4gAykDKCADKQMgfSADKAI0KAIAIAMpAxinQQR0aikDCCADKQMQfVQEQCADKQMoIAMpAyB9DAELIAMoAjQoAgAgAykDGKdBBHRqKQMIIAMpAxB9CzcDCCADKAIwIAMpAyCnaiADKAI0KAIAIAMpAxinQQR0aigCACADKQMQp2ogAykDCKcQHBogAykDCCADKAI0KAIAIAMpAxinQQR0aikDCCADKQMQfVEEQCADIAMpAxhCAXw3AxgLIAMgAykDCCADKQMgfDcDICADQgA3AxAMAQsLIAMoAjQiACADKQMgIAApAzh8NwM4IAMoAjQgAykDGDcDQCADIAMpAyA3AzgLIAMpAzghAiADQUBrJAAgAguuBAEBfyMAQUBqIgMkACADIAA2AjggAyABNwMwIAMgAjYCLAJAIAMpAzBQBEAgA0EAQgBBASADKAIsEEw2AjwMAQsgAykDMCADKAI4KQMwVgRAIAMoAixBEkEAEBcgA0EANgI8DAELIAMoAjgoAigEQCADKAIsQR1BABAXIANBADYCPAwBCyADIAMoAjggAykDMBCwATcDICADIAMpAzAgAygCOCgCBCADKQMgp0EDdGopAwB9NwMYIAMpAxhQBEAgAyADKQMgQn98NwMgIAMgAygCOCgCACADKQMgp0EEdGopAwg3AxgLIAMgAygCOCgCACADKQMgp0EEdGopAwggAykDGH03AxAgAykDECADKQMwVgRAIAMoAixBHEEAEBcgA0EANgI8DAELIAMgAygCOCgCACADKQMgQgF8QQAgAygCLBBMIgA2AgwgAEUEQCADQQA2AjwMAQsgAygCDCgCACADKAIMKQMIQgF9p0EEdGogAykDGDcDCCADKAIMKAIEIAMoAgwp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ArQBIAMgATYCsAEgAyACNwOoASADIAMoArQBKAIAEDoiAjcDIAJAIAJCAFMEQCADKAK0AUEIaiADKAK0ASgCABAaIANCfzcDuAEMAQsgAyADKQMgNwOgASADQQA6ABcgA0IANwMYA0AgAykDGCADKQOoAVQEQCADIAMoArQBKAJAIAMoArABIAMpAxinQQN0aikDAKdBBHRqNgIMIAMgAygCtAECfyADKAIMKAIEBEAgAygCDCgCBAwBCyADKAIMKAIAC0GABBBdIgA2AhAgAEEASARAIANCfzcDuAEMAwsgAygCEARAIANBAToAFwsgAyADKQMYQgF8NwMYDAELCyADIAMoArQBKAIAEDoiAjcDICACQgBTBEAgAygCtAFBCGogAygCtAEoAgAQGiADQn83A7gBDAELIAMgAykDICADKQOgAX03A5gBAkAgAykDoAFC/////w9YBEAgAykDqAFC//8DWA0BCyADQQE6ABcLIAMgA0EwakLiABArIgA2AiwgAEUEQCADKAK0AUEIakEOQQAQFyADQn83A7gBDAELIAMtABdBAXEEQCADKAIsQdbXAEEEEEIgAygCLEIsEC8gAygCLEEtECIgAygCLEEtECIgAygCLEEAECMgAygCLEEAECMgAygCLCADKQOoARAvIAMoAiwgAykDqAEQLyADKAIsIAMpA5gBEC8gAygCLCADKQOgARAvIAMoAixB29cAQQQQQiADKAIsQQAQIyADKAIsIAMpA6ABIAMpA5gBfBAvIAMoAixBARAjCyADKAIsQeDXAEEEEEIgAygCLEEAECMgAygCLAJ+Qv//AyADKQOoAUL//wNaDQAaIAMpA6gBC6dB//8DcRAiIAMoAiwCfkL//wMgAykDqAFC//8DWg0AGiADKQOoAQunQf//A3EQIiADKAIsAn9BfyADKQOYAUL/////D1oNABogAykDmAGnCxAjIAMoAiwCf0F/IAMpA6ABQv////8PWg0AGiADKQOgAacLECMgAwJ/IAMoArQBLQAoQQFxBEAgAygCtAEoAiQMAQsgAygCtAEoAiALNgKUASADKAIsAn8gAygClAEEQCADKAKUAS8BBAwBC0EAC0H//wNxECICfyMAQRBrIgAgAygCLDYCDCAAKAIMLQAAQQFxRQsEQCADKAK0AUEIakEUQQAQFyADKAIsEBkgA0J/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AAwAADAxMjM0NTY3ODlBQkNERUYtMFgrMFggMFgtMHgrMHggMHgAaW5mAElORgBuYW4ATkFOAC4ATm8gZXJyb3IATXVsdGktZGlzayB6aXAgYXJjaGl2ZXMgbm90IHN1cHBvcnRlZABSZW5hbWluZyB0ZW1wb3JhcnkgZmlsZSBmYWlsZWQAQ2xvc2luZyB6aXAgYXJjaGl2ZSBmYWlsZWQAU2VlayBlcnJvcgBSZWFkIGVycm9yAFdyaXRlIGVycm9yAENSQyBlcnJvcgBDb250YWluaW5nIHppcCBhcmNoaXZlIHdhcyBjbG9zZWQATm8gc3VjaCBmaWxlAEZpbGUgYWxyZWFkeSBleGlzdHMAQ2FuJ3Qgb3BlbiBmaWxlAEZhaWx1cmUgdG8gY3JlYXRlIHRlbXBvcmFyeSBmaWxlAFpsaWIgZXJyb3IATWFsbG9jIGZhaWx1cmUARW50cnkgaGFzIGJlZW4gY2hhbmdlZABDb21wcmVzc2lvbiBtZXRob2Qgbm90IHN1cHBvcnRlZABQcmVtYXR1cmUgZW5kIG9mIGZpbGUASW52YWxpZCBhcmd1bWVudABOb3QgYSB6aXAgYXJjaGl2ZQBJbnRlcm5hbCBlcnJvcgBaaXAgYXJjaGl2ZSBpbmNvbnNpc3RlbnQAQ2FuJ3QgcmVtb3ZlIGZpbGUARW50cnkgaGFzIGJlZW4gZGVsZXRlZABFbmNyeXB0aW9uIG1ldGhvZCBub3Qgc3VwcG9ydGVkAFJlYWQtb25seSBhcmNoaXZlAE5vIHBhc3N3b3JkIHByb3ZpZGVkAFdyb25nIHBhc3N3b3JkIHByb3ZpZGVkAE9wZXJhdGlvbiBub3Qgc3VwcG9ydGVkAFJlc291cmNlIHN0aWxsIGluIHVzZQBUZWxsIGVycm9yAENvbXByZXNzZWQgZGF0YSBpbnZhbGlkAAAAAAAAACUGAAAuBgAAVAYAAHMGAACOBgAAmQYAAKQGAACwBgAAugYAANwGAADpBgAA/QYAAA0HAAAuBwAAOQcAAEgHAABfBwAAgAcAAJYHAACnBwAAuQcAAMgHAADhBwAA8wcAAAoIAAAqCAAAPAgAAFEIAABpCAAAgQgAAJcIAACiCAAAIABB2BILEQEAAAABAAAAAQAAAAEAAAABAEH8EgsJAQAAAAEAAAACAEGoEwsBAQBB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CADqAAgAGgAIAJoACABaAAgA2gAIADoACAC6AAgAegAIAPoACAAGAAgAhgAIAEYACADGAAgAJgAIAKYACABmAAgA5gAIABYACACWAAgAVgAIANYACAA2AAgAtgAIAHYACAD2AAgADgAIAI4ACABOAAgAzgAIAC4ACACuAAgAbgAIAO4ACAAeAAgAngAIAF4ACADeAAgAPgAIAL4ACAB+AAgA/gAIAAEACACBAAgAQQAIAMEACAAhAAgAoQAIAGEACADhAAgAEQAIAJEACABRAAgA0QAIADEACACxAAgAcQAIAPEACAAJAAgAiQAIAEkACADJAAgAKQAIAKkACABpAAgA6QAIABkACACZAAgAWQAIANkACAA5AAgAuQAIAHkACAD5AAgABQAIAIUACABFAAgAxQAIACUACAClAAgAZQAIAOUACAAVAAgAlQAIAFUACADVAAgANQAIALUACAB1AAgA9QAIAA0ACACNAAgATQAIAM0ACAAtAAgArQAIAG0ACADtAAgAHQAIAJ0ACABdAAgA3QAIAD0ACAC9AAgAfQAIAP0ACAATAAkAEwEJAJMACQCTAQkAUwAJAFMBCQDTAAkA0wEJADMACQAzAQkAswAJALMBCQBzAAkAcwEJAPMACQDzAQkACwAJAAsBCQCLAAkAiwEJAEsACQBLAQkAywAJAMsBCQArAAkAKwEJAKsACQCrAQkAawAJAGsBCQDrAAkA6wEJABsACQAbAQkAmwAJAJsBCQBbAAkAWwEJANsACQDbAQkAOwAJADsBCQC7AAkAuwEJAHsACQB7AQkA+wAJAPsBCQAHAAkABwEJAIcACQCHAQkARwAJAEcBCQDHAAkAxwEJACcACQAnAQkApwAJAKcBCQBnAAkAZwEJAOcACQDnAQkAFwAJABcBCQCXAAkAlwEJAFcACQBXAQkA1wAJANcBCQA3AAkANwEJALcACQC3AQkAdwAJAHcBCQD3AAkA9wEJAA8ACQAPAQkAjwAJAI8BCQBPAAkATwEJAM8ACQDPAQkALwAJAC8BCQCvAAkArwEJAG8ACQBvAQkA7wAJAO8BCQAfAAkAHwEJAJ8ACQCfAQkAXwAJAF8BCQDfAAkA3wEJAD8ACQA/AQkAvwAJAL8BCQB/AAkAfwEJAP8ACQD/AQkAAAAHAEAABwAgAAcAYAAHABAABwBQAAcAMAAHAHAA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Y2Ugb3IgYWRkcmVzcwBCbG9jayBkZXZpY2UgcmVxdWlyZWQATm8gc3VjaCBkZXZpY2UATm90IGEgZGlyZWN0b3J5AElzIGEgZGlyZWN0b3J5AFRleHQgZmlsZSBidXN5AEV4ZWMgZm9ybWF0IGVycm9yAEludmFsaWQgYXJndW1lbnQAQXJndW1lbnQgbGlzdCB0b28gbG9uZwBTeW1ib2xpYyBsaW5rIGxvb3AARmlsZW5hbWUgdG9vIGxvbmcAVG9vIG1hbnkgb3BlbiBmaWxlcyBpbiBzeXN0ZW0ATm8gZmlsZSBkZXNjcmlwdG9ycyBhdmFpbGFibGUAQmFkIGZpbGUgZGVzY3JpcHRvcgBObyBjaGlsZCBwcm9jZXNzAEJhZCBhZGRyZXNzAEZpbGUgdG9vIGxhcmdlAFRvbyBtYW55IGxpbmtzAE5vIGxvY2tzIGF2YWlsYWJsZQBSZXNvdXJjZSBkZWFkbG9jayB3b3VsZCBvY2N1cgBTdGF0ZSBub3QgcmVjb3ZlcmFibGUAUHJldmlvdXMgb3duZXIgZGllZABPcGVyYXRpb24gY2FuY2VsZWQARnVuY3Rpb24gbm90IGltcGxlbWVudGVkAE5vIG1lc3NhZ2Ugb2YgZGVzaXJlZCB0eXBlAElkZW50aWZpZXIgcmVtb3ZlZABEZXZpY2Ugbm90IGEgc3RyZWFtAE5vIGRhdGEgYXZhaWxhYmxlAERldmljZSB0aW1lb3V0AE91dCBvZiBzdHJlYW1zIHJlc291cmNlcwBMaW5rIGhhcyBiZWVuIHNldmVyZWQAUHJvdG9jb2wgZXJyb3IAQmFkIG1lc3NhZ2UARmlsZSBkZXNjcmlwdG9yIGluIGJhZCBzdGF0ZQBOb3QgYSBzb2NrZXQARGVzdGluYXRpb24gYWRkcmVzcyByZXF1aXJlZABNZXNzYWdlIHRvbyBsYXJnZQBQcm90b2NvbCB3cm9uZyB0eXBlIGZvciBzb2NrZXQAUHJvdG9jb2wgbm90IGF2YWlsYWJsZQBQcm90b2NvbCBub3Qgc3VwcG9ydGVkAFNvY2tldCB0eXBlIG5vdCBzdXBwb3J0ZWQATm90IHN1cHBvcnRlZABQcm90b2NvbCBmYW1pbHkgbm90IHN1cHBvcnRlZABBZGRyZXNzIGZhbWlseSBub3Qgc3VwcG9ydGVkIGJ5IHByb3RvY29sAEFkZHJlc3Mgbm90IGF2YWlsYWJsZQBOZXR3b3JrIGlzIGRvd24ATmV0d29yayB1bnJlYWNoYWJsZQBDb25uZWN0aW9uIHJlc2V0IGJ5IG5ldHdvcmsAQ29ubmVjdGlvbiBhYm9ydGVkAE5vIGJ1ZmZlciBzcGFjZSBhdmFpbGFibGUAU29ja2V0IGlzIGNvbm5lY3RlZABTb2NrZXQgbm90IGNvbm5lY3RlZABDYW5ub3Qgc2VuZCBhZnRlciBzb2NrZXQgc2h1dGRvd24AT3BlcmF0aW9uIGFscmVhZHkgaW4gcHJvZ3Jlc3MAT3BlcmF0aW9uIGluIHByb2dyZXNzAFN0YWxlIGZpbGUgaGFuZGxlAFJlbW90ZSBJL08gZXJyb3IAUXVvdGEgZXhjZWVkZWQATm8gbWVkaXVtIGZvdW5kAFdyb25nIG1lZGl1bSB0eXBlAE5vIGVycm9yIGluZm9ybWF0aW9uAABVbmtub3duIGVycm9yICVkACVzJXMlcwAAOiAAL3Byb2Mvc2VsZi9mZC8AL2Rldi91cmFuZG9tAHJ3YQAlcy5YWFhYWFgAcitiAHJiAFBLBQYAQcyZAQsCYE4AQYSaAQvsAQwAAAANAAAADgAAAA8AAAAQAAAAEQAAABIAAAATAAAAFAAAAA0AAAAOAAAADwAAABAAAAARAAAAEgAAABMAAAABAAAACAAAAARNAAAkTQAAHwAAAGRNAAADAAAAAAAAAC30UVjPjLHARva1yykxA8cEW3AwtF39IHh/i5rYWSlQaEiJq6dWA2z/t82IP9R3tCulo3DxuuSo/EGD/dlv4Yp6Ly10lgcfDQleA3YscPdApSynb1dBqKp036BYZANKx8Q8U66vXxgEFbHjbSiGqwykv0Pw6VCBOVcWUjf/////////////////////";
  if (!isDataURI(wasmBinaryFile)) {
    wasmBinaryFile = locateFile(wasmBinaryFile);
  }
  function getBinary() {
    try {
      if (wasmBinary) {
        return new Uint8Array(wasmBinary);
      }
      var binary = tryParseAsDataURI(wasmBinaryFile);
      if (binary) {
        return binary;
      }
      if (readBinary) {
        return readBinary(wasmBinaryFile);
      } else {
        throw "sync fetching of the wasm failed: you can preload it to Module['wasmBinary'] manually, or emcc.py will do that for you when generating HTML (but not JS)";
      }
    } catch (err) {
      abort(err);
    }
  }
  function createWasm() {
    var info = { env: asmLibraryArg, wasi_unstable: asmLibraryArg };
    function receiveInstance(instance, module) {
      var exports = instance.exports;
      Module["asm"] = exports;
      removeRunDependency("wasm-instantiate");
    }
    addRunDependency("wasm-instantiate");
    function instantiateSync() {
      var instance;
      var module;
      var binary;
      try {
        binary = getBinary();
        module = new WebAssembly.Module(binary);
        instance = new WebAssembly.Instance(module, info);
      } catch (e) {
        var str = e.toString();
        err("failed to compile wasm module: " + str);
        if (
          str.indexOf("imported Memory") >= 0 ||
          str.indexOf("memory import") >= 0
        ) {
          err(
            "Memory size incompatibility issues may be due to changing TOTAL_MEMORY at runtime to something too large. Use ALLOW_MEMORY_GROWTH to allow any size memory (and also make sure not to set TOTAL_MEMORY at runtime to something smaller than it was at compile time)."
          );
        }
        throw e;
      }
      receiveInstance(instance, module);
    }
    if (Module["instantiateWasm"]) {
      try {
        var exports = Module["instantiateWasm"](info, receiveInstance);
        return exports;
      } catch (e) {
        err("Module.instantiateWasm callback failed with error: " + e);
        return false;
      }
    }
    instantiateSync();
    return Module["asm"];
  }
  var tempDouble;
  var tempI64;
  __ATINIT__.push({
    func: function() {
      ___wasm_call_ctors();
    }
  });
  function demangle(func) {
    return func;
  }
  function demangleAll(text) {
    var regex = /\b_Z[\w\d_]+/g;
    return text.replace(regex, function(x) {
      var y = demangle(x);
      return x === y ? x : y + " [" + x + "]";
    });
  }
  function jsStackTrace() {
    var err = new Error();
    if (!err.stack) {
      try {
        throw new Error(0);
      } catch (e) {
        err = e;
      }
      if (!err.stack) {
        return "(no stack trace available)";
      }
    }
    return err.stack.toString();
  }
  function stackTrace() {
    var js = jsStackTrace();
    if (Module["extraStackTrace"]) js += "\n" + Module["extraStackTrace"]();
    return demangleAll(js);
  }
  function ___lock() {}
  var PATH = {
    splitPath: function(filename) {
      var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
      return splitPathRe.exec(filename).slice(1);
    },
    normalizeArray: function(parts, allowAboveRoot) {
      var up = 0;
      for (var i = parts.length - 1; i >= 0; i--) {
        var last = parts[i];
        if (last === ".") {
          parts.splice(i, 1);
        } else if (last === "..") {
          parts.splice(i, 1);
          up++;
        } else if (up) {
          parts.splice(i, 1);
          up--;
        }
      }
      if (allowAboveRoot) {
        for (; up; up--) {
          parts.unshift("..");
        }
      }
      return parts;
    },
    normalize: function(path) {
      var isAbsolute = path.charAt(0) === "/",
        trailingSlash = path.substr(-1) === "/";
      path = PATH.normalizeArray(
        path.split("/").filter(function(p) {
          return !!p;
        }),
        !isAbsolute
      ).join("/");
      if (!path && !isAbsolute) {
        path = ".";
      }
      if (path && trailingSlash) {
        path += "/";
      }
      return (isAbsolute ? "/" : "") + path;
    },
    dirname: function(path) {
      var result = PATH.splitPath(path),
        root = result[0],
        dir = result[1];
      if (!root && !dir) {
        return ".";
      }
      if (dir) {
        dir = dir.substr(0, dir.length - 1);
      }
      return root + dir;
    },
    basename: function(path) {
      if (path === "/") return "/";
      var lastSlash = path.lastIndexOf("/");
      if (lastSlash === -1) return path;
      return path.substr(lastSlash + 1);
    },
    extname: function(path) {
      return PATH.splitPath(path)[3];
    },
    join: function() {
      var paths = Array.prototype.slice.call(arguments, 0);
      return PATH.normalize(paths.join("/"));
    },
    join2: function(l, r) {
      return PATH.normalize(l + "/" + r);
    }
  };
  function ___setErrNo(value) {
    if (Module["___errno_location"])
      HEAP32[Module["___errno_location"]() >> 2] = value;
    return value;
  }
  var PATH_FS = {
    resolve: function() {
      var resolvedPath = "",
        resolvedAbsolute = false;
      for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
        var path = i >= 0 ? arguments[i] : FS.cwd();
        if (typeof path !== "string") {
          throw new TypeError("Arguments to path.resolve must be strings");
        } else if (!path) {
          return "";
        }
        resolvedPath = path + "/" + resolvedPath;
        resolvedAbsolute = path.charAt(0) === "/";
      }
      resolvedPath = PATH.normalizeArray(
        resolvedPath.split("/").filter(function(p) {
          return !!p;
        }),
        !resolvedAbsolute
      ).join("/");
      return (resolvedAbsolute ? "/" : "") + resolvedPath || ".";
    },
    relative: function(from, to) {
      from = PATH_FS.resolve(from).substr(1);
      to = PATH_FS.resolve(to).substr(1);
      function trim(arr) {
        var start = 0;
        for (; start < arr.length; start++) {
          if (arr[start] !== "") break;
        }
        var end = arr.length - 1;
        for (; end >= 0; end--) {
          if (arr[end] !== "") break;
        }
        if (start > end) return [];
        return arr.slice(start, end - start + 1);
      }
      var fromParts = trim(from.split("/"));
      var toParts = trim(to.split("/"));
      var length = Math.min(fromParts.length, toParts.length);
      var samePartsLength = length;
      for (var i = 0; i < length; i++) {
        if (fromParts[i] !== toParts[i]) {
          samePartsLength = i;
          break;
        }
      }
      var outputParts = [];
      for (var i = samePartsLength; i < fromParts.length; i++) {
        outputParts.push("..");
      }
      outputParts = outputParts.concat(toParts.slice(samePartsLength));
      return outputParts.join("/");
    }
  };
  var TTY = {
    ttys: [],
    init: function() {},
    shutdown: function() {},
    register: function(dev, ops) {
      TTY.ttys[dev] = { input: [], output: [], ops: ops };
      FS.registerDevice(dev, TTY.stream_ops);
    },
    stream_ops: {
      open: function(stream) {
        var tty = TTY.ttys[stream.node.rdev];
        if (!tty) {
          throw new FS.ErrnoError(43);
        }
        stream.tty = tty;
        stream.seekable = false;
      },
      close: function(stream) {
        stream.tty.ops.flush(stream.tty);
      },
      flush: function(stream) {
        stream.tty.ops.flush(stream.tty);
      },
      read: function(stream, buffer, offset, length, pos) {
        if (!stream.tty || !stream.tty.ops.get_char) {
          throw new FS.ErrnoError(60);
        }
        var bytesRead = 0;
        for (var i = 0; i < length; i++) {
          var result;
          try {
            result = stream.tty.ops.get_char(stream.tty);
          } catch (e) {
            throw new FS.ErrnoError(29);
          }
          if (result === undefined && bytesRead === 0) {
            throw new FS.ErrnoError(6);
          }
          if (result === null || result === undefined) break;
          bytesRead++;
          buffer[offset + i] = result;
        }
        if (bytesRead) {
          stream.node.timestamp = Date.now();
        }
        return bytesRead;
      },
      write: function(stream, buffer, offset, length, pos) {
        if (!stream.tty || !stream.tty.ops.put_char) {
          throw new FS.ErrnoError(60);
        }
        try {
          for (var i = 0; i < length; i++) {
            stream.tty.ops.put_char(stream.tty, buffer[offset + i]);
          }
        } catch (e) {
          throw new FS.ErrnoError(29);
        }
        if (length) {
          stream.node.timestamp = Date.now();
        }
        return i;
      }
    },
    default_tty_ops: {
      get_char: function(tty) {
        if (!tty.input.length) {
          var result = null;
          if (ENVIRONMENT_IS_NODE) {
            var BUFSIZE = 256;
            var buf = Buffer.alloc ? Buffer.alloc(BUFSIZE) : new Buffer(BUFSIZE);
            var bytesRead = 0;
            try {
              bytesRead = nodeFS.readSync(
                process.stdin.fd,
                buf,
                0,
                BUFSIZE,
                null
              );
            } catch (e) {
              if (e.toString().indexOf("EOF") != -1) bytesRead = 0;
              else throw e;
            }
            if (bytesRead > 0) {
              result = buf.slice(0, bytesRead).toString("utf-8");
            } else {
              result = null;
            }
          } else if (
            typeof window != "undefined" &&
            typeof window.prompt == "function"
          ) {
            result = window.prompt("Input: ");
            if (result !== null) {
              result += "\n";
            }
          } else if (typeof readline == "function") {
            result = readline();
            if (result !== null) {
              result += "\n";
            }
          }
          if (!result) {
            return null;
          }
          tty.input = intArrayFromString(result, true);
        }
        return tty.input.shift();
      },
      put_char: function(tty, val) {
        if (val === null || val === 10) {
          out(UTF8ArrayToString(tty.output, 0));
          tty.output = [];
        } else {
          if (val != 0) tty.output.push(val);
        }
      },
      flush: function(tty) {
        if (tty.output && tty.output.length > 0) {
          out(UTF8ArrayToString(tty.output, 0));
          tty.output = [];
        }
      }
    },
    default_tty1_ops: {
      put_char: function(tty, val) {
        if (val === null || val === 10) {
          err(UTF8ArrayToString(tty.output, 0));
          tty.output = [];
        } else {
          if (val != 0) tty.output.push(val);
        }
      },
      flush: function(tty) {
        if (tty.output && tty.output.length > 0) {
          err(UTF8ArrayToString(tty.output, 0));
          tty.output = [];
        }
      }
    }
  };
  var MEMFS = {
    ops_table: null,
    mount: function(mount) {
      return MEMFS.createNode(null, "/", 16384 | 511, 0);
    },
    createNode: function(parent, name, mode, dev) {
      if (FS.isBlkdev(mode) || FS.isFIFO(mode)) {
        throw new FS.ErrnoError(63);
      }
      if (!MEMFS.ops_table) {
        MEMFS.ops_table = {
          dir: {
            node: {
              getattr: MEMFS.node_ops.getattr,
              setattr: MEMFS.node_ops.setattr,
              lookup: MEMFS.node_ops.lookup,
              mknod: MEMFS.node_ops.mknod,
              rename: MEMFS.node_ops.rename,
              unlink: MEMFS.node_ops.unlink,
              rmdir: MEMFS.node_ops.rmdir,
              readdir: MEMFS.node_ops.readdir,
              symlink: MEMFS.node_ops.symlink
            },
            stream: { llseek: MEMFS.stream_ops.llseek }
          },
          file: {
            node: {
              getattr: MEMFS.node_ops.getattr,
              setattr: MEMFS.node_ops.setattr
            },
            stream: {
              llseek: MEMFS.stream_ops.llseek,
              read: MEMFS.stream_ops.read,
              write: MEMFS.stream_ops.write,
              allocate: MEMFS.stream_ops.allocate,
              mmap: MEMFS.stream_ops.mmap,
              msync: MEMFS.stream_ops.msync
            }
          },
          link: {
            node: {
              getattr: MEMFS.node_ops.getattr,
              setattr: MEMFS.node_ops.setattr,
              readlink: MEMFS.node_ops.readlink
            },
            stream: {}
          },
          chrdev: {
            node: {
              getattr: MEMFS.node_ops.getattr,
              setattr: MEMFS.node_ops.setattr
            },
            stream: FS.chrdev_stream_ops
          }
        };
      }
      var node = FS.createNode(parent, name, mode, dev);
      if (FS.isDir(node.mode)) {
        node.node_ops = MEMFS.ops_table.dir.node;
        node.stream_ops = MEMFS.ops_table.dir.stream;
        node.contents = {};
      } else if (FS.isFile(node.mode)) {
        node.node_ops = MEMFS.ops_table.file.node;
        node.stream_ops = MEMFS.ops_table.file.stream;
        node.usedBytes = 0;
        node.contents = null;
      } else if (FS.isLink(node.mode)) {
        node.node_ops = MEMFS.ops_table.link.node;
        node.stream_ops = MEMFS.ops_table.link.stream;
      } else if (FS.isChrdev(node.mode)) {
        node.node_ops = MEMFS.ops_table.chrdev.node;
        node.stream_ops = MEMFS.ops_table.chrdev.stream;
      }
      node.timestamp = Date.now();
      if (parent) {
        parent.contents[name] = node;
      }
      return node;
    },
    getFileDataAsRegularArray: function(node) {
      if (node.contents && node.contents.subarray) {
        var arr = [];
        for (var i = 0; i < node.usedBytes; ++i) arr.push(node.contents[i]);
        return arr;
      }
      return node.contents;
    },
    getFileDataAsTypedArray: function(node) {
      if (!node.contents) return new Uint8Array();
      if (node.contents.subarray)
        return node.contents.subarray(0, node.usedBytes);
      return new Uint8Array(node.contents);
    },
    expandFileStorage: function(node, newCapacity) {
      var prevCapacity = node.contents ? node.contents.length : 0;
      if (prevCapacity >= newCapacity) return;
      var CAPACITY_DOUBLING_MAX = 1024 * 1024;
      newCapacity = Math.max(
        newCapacity,
        (prevCapacity * (prevCapacity < CAPACITY_DOUBLING_MAX ? 2 : 1.125)) | 0
      );
      if (prevCapacity != 0) newCapacity = Math.max(newCapacity, 256);
      var oldContents = node.contents;
      node.contents = new Uint8Array(newCapacity);
      if (node.usedBytes > 0)
        node.contents.set(oldContents.subarray(0, node.usedBytes), 0);
      return;
    },
    resizeFileStorage: function(node, newSize) {
      if (node.usedBytes == newSize) return;
      if (newSize == 0) {
        node.contents = null;
        node.usedBytes = 0;
        return;
      }
      if (!node.contents || node.contents.subarray) {
        var oldContents = node.contents;
        node.contents = new Uint8Array(new ArrayBuffer(newSize));
        if (oldContents) {
          node.contents.set(
            oldContents.subarray(0, Math.min(newSize, node.usedBytes))
          );
        }
        node.usedBytes = newSize;
        return;
      }
      if (!node.contents) node.contents = [];
      if (node.contents.length > newSize) node.contents.length = newSize;
      else while (node.contents.length < newSize) node.contents.push(0);
      node.usedBytes = newSize;
    },
    node_ops: {
      getattr: function(node) {
        var attr = {};
        attr.dev = FS.isChrdev(node.mode) ? node.id : 1;
        attr.ino = node.id;
        attr.mode = node.mode;
        attr.nlink = 1;
        attr.uid = 0;
        attr.gid = 0;
        attr.rdev = node.rdev;
        if (FS.isDir(node.mode)) {
          attr.size = 4096;
        } else if (FS.isFile(node.mode)) {
          attr.size = node.usedBytes;
        } else if (FS.isLink(node.mode)) {
          attr.size = node.link.length;
        } else {
          attr.size = 0;
        }
        attr.atime = new Date(node.timestamp);
        attr.mtime = new Date(node.timestamp);
        attr.ctime = new Date(node.timestamp);
        attr.blksize = 4096;
        attr.blocks = Math.ceil(attr.size / attr.blksize);
        return attr;
      },
      setattr: function(node, attr) {
        if (attr.mode !== undefined) {
          node.mode = attr.mode;
        }
        if (attr.timestamp !== undefined) {
          node.timestamp = attr.timestamp;
        }
        if (attr.size !== undefined) {
          MEMFS.resizeFileStorage(node, attr.size);
        }
      },
      lookup: function(parent, name) {
        throw FS.genericErrors[44];
      },
      mknod: function(parent, name, mode, dev) {
        return MEMFS.createNode(parent, name, mode, dev);
      },
      rename: function(old_node, new_dir, new_name) {
        if (FS.isDir(old_node.mode)) {
          var new_node;
          try {
            new_node = FS.lookupNode(new_dir, new_name);
          } catch (e) {}
          if (new_node) {
            for (var i in new_node.contents) {
              throw new FS.ErrnoError(55);
            }
          }
        }
        delete old_node.parent.contents[old_node.name];
        old_node.name = new_name;
        new_dir.contents[new_name] = old_node;
        old_node.parent = new_dir;
      },
      unlink: function(parent, name) {
        delete parent.contents[name];
      },
      rmdir: function(parent, name) {
        var node = FS.lookupNode(parent, name);
        for (var i in node.contents) {
          throw new FS.ErrnoError(55);
        }
        delete parent.contents[name];
      },
      readdir: function(node) {
        var entries = [".", ".."];
        for (var key in node.contents) {
          if (!node.contents.hasOwnProperty(key)) {
            continue;
          }
          entries.push(key);
        }
        return entries;
      },
      symlink: function(parent, newname, oldpath) {
        var node = MEMFS.createNode(parent, newname, 511 | 40960, 0);
        node.link = oldpath;
        return node;
      },
      readlink: function(node) {
        if (!FS.isLink(node.mode)) {
          throw new FS.ErrnoError(28);
        }
        return node.link;
      }
    },
    stream_ops: {
      read: function(stream, buffer, offset, length, position) {
        var contents = stream.node.contents;
        if (position >= stream.node.usedBytes) return 0;
        var size = Math.min(stream.node.usedBytes - position, length);
        if (size > 8 && contents.subarray) {
          buffer.set(contents.subarray(position, position + size), offset);
        } else {
          for (var i = 0; i < size; i++)
            buffer[offset + i] = contents[position + i];
        }
        return size;
      },
      write: function(stream, buffer, offset, length, position, canOwn) {
        if (buffer.buffer === HEAP8.buffer) {
          canOwn = false;
        }
        if (!length) return 0;
        var node = stream.node;
        node.timestamp = Date.now();
        if (buffer.subarray && (!node.contents || node.contents.subarray)) {
          if (canOwn) {
            node.contents = buffer.subarray(offset, offset + length);
            node.usedBytes = length;
            return length;
          } else if (node.usedBytes === 0 && position === 0) {
            node.contents = new Uint8Array(
              buffer.subarray(offset, offset + length)
            );
            node.usedBytes = length;
            return length;
          } else if (position + length <= node.usedBytes) {
            node.contents.set(buffer.subarray(offset, offset + length), position);
            return length;
          }
        }
        MEMFS.expandFileStorage(node, position + length);
        if (node.contents.subarray && buffer.subarray)
          node.contents.set(buffer.subarray(offset, offset + length), position);
        else {
          for (var i = 0; i < length; i++) {
            node.contents[position + i] = buffer[offset + i];
          }
        }
        node.usedBytes = Math.max(node.usedBytes, position + length);
        return length;
      },
      llseek: function(stream, offset, whence) {
        var position = offset;
        if (whence === 1) {
          position += stream.position;
        } else if (whence === 2) {
          if (FS.isFile(stream.node.mode)) {
            position += stream.node.usedBytes;
          }
        }
        if (position < 0) {
          throw new FS.ErrnoError(28);
        }
        return position;
      },
      allocate: function(stream, offset, length) {
        MEMFS.expandFileStorage(stream.node, offset + length);
        stream.node.usedBytes = Math.max(stream.node.usedBytes, offset + length);
      },
      mmap: function(stream, buffer, offset, length, position, prot, flags) {
        if (!FS.isFile(stream.node.mode)) {
          throw new FS.ErrnoError(43);
        }
        var ptr;
        var allocated;
        var contents = stream.node.contents;
        if (!(flags & 2) && contents.buffer === buffer.buffer) {
          allocated = false;
          ptr = contents.byteOffset;
        } else {
          if (position > 0 || position + length < stream.node.usedBytes) {
            if (contents.subarray) {
              contents = contents.subarray(position, position + length);
            } else {
              contents = Array.prototype.slice.call(
                contents,
                position,
                position + length
              );
            }
          }
          allocated = true;
          var fromHeap = buffer.buffer == HEAP8.buffer;
          ptr = _malloc(length);
          if (!ptr) {
            throw new FS.ErrnoError(48);
          }
          (fromHeap ? HEAP8 : buffer).set(contents, ptr);
        }
        return { ptr: ptr, allocated: allocated };
      },
      msync: function(stream, buffer, offset, length, mmapFlags) {
        if (!FS.isFile(stream.node.mode)) {
          throw new FS.ErrnoError(43);
        }
        if (mmapFlags & 2) {
          return 0;
        }
        var bytesWritten = MEMFS.stream_ops.write(
          stream,
          buffer,
          0,
          length,
          offset,
          false
        );
        return 0;
      }
    }
  };
  var ERRNO_CODES = {
    EPERM: 63,
    ENOENT: 44,
    ESRCH: 71,
    EINTR: 27,
    EIO: 29,
    ENXIO: 60,
    E2BIG: 1,
    ENOEXEC: 45,
    EBADF: 8,
    ECHILD: 12,
    EAGAIN: 6,
    EWOULDBLOCK: 6,
    ENOMEM: 48,
    EACCES: 2,
    EFAULT: 21,
    ENOTBLK: 105,
    EBUSY: 10,
    EEXIST: 20,
    EXDEV: 75,
    ENODEV: 43,
    ENOTDIR: 54,
    EISDIR: 31,
    EINVAL: 28,
    ENFILE: 41,
    EMFILE: 33,
    ENOTTY: 59,
    ETXTBSY: 74,
    EFBIG: 22,
    ENOSPC: 51,
    ESPIPE: 70,
    EROFS: 69,
    EMLINK: 34,
    EPIPE: 64,
    EDOM: 18,
    ERANGE: 68,
    ENOMSG: 49,
    EIDRM: 24,
    ECHRNG: 106,
    EL2NSYNC: 156,
    EL3HLT: 107,
    EL3RST: 108,
    ELNRNG: 109,
    EUNATCH: 110,
    ENOCSI: 111,
    EL2HLT: 112,
    EDEADLK: 16,
    ENOLCK: 46,
    EBADE: 113,
    EBADR: 114,
    EXFULL: 115,
    ENOANO: 104,
    EBADRQC: 103,
    EBADSLT: 102,
    EDEADLOCK: 16,
    EBFONT: 101,
    ENOSTR: 100,
    ENODATA: 116,
    ETIME: 117,
    ENOSR: 118,
    ENONET: 119,
    ENOPKG: 120,
    EREMOTE: 121,
    ENOLINK: 47,
    EADV: 122,
    ESRMNT: 123,
    ECOMM: 124,
    EPROTO: 65,
    EMULTIHOP: 36,
    EDOTDOT: 125,
    EBADMSG: 9,
    ENOTUNIQ: 126,
    EBADFD: 127,
    EREMCHG: 128,
    ELIBACC: 129,
    ELIBBAD: 130,
    ELIBSCN: 131,
    ELIBMAX: 132,
    ELIBEXEC: 133,
    ENOSYS: 52,
    ENOTEMPTY: 55,
    ENAMETOOLONG: 37,
    ELOOP: 32,
    EOPNOTSUPP: 138,
    EPFNOSUPPORT: 139,
    ECONNRESET: 15,
    ENOBUFS: 42,
    EAFNOSUPPORT: 5,
    EPROTOTYPE: 67,
    ENOTSOCK: 57,
    ENOPROTOOPT: 50,
    ESHUTDOWN: 140,
    ECONNREFUSED: 14,
    EADDRINUSE: 3,
    ECONNABORTED: 13,
    ENETUNREACH: 40,
    ENETDOWN: 38,
    ETIMEDOUT: 73,
    EHOSTDOWN: 142,
    EHOSTUNREACH: 23,
    EINPROGRESS: 26,
    EALREADY: 7,
    EDESTADDRREQ: 17,
    EMSGSIZE: 35,
    EPROTONOSUPPORT: 66,
    ESOCKTNOSUPPORT: 137,
    EADDRNOTAVAIL: 4,
    ENETRESET: 39,
    EISCONN: 30,
    ENOTCONN: 53,
    ETOOMANYREFS: 141,
    EUSERS: 136,
    EDQUOT: 19,
    ESTALE: 72,
    ENOTSUP: 138,
    ENOMEDIUM: 148,
    EILSEQ: 25,
    EOVERFLOW: 61,
    ECANCELED: 11,
    ENOTRECOVERABLE: 56,
    EOWNERDEAD: 62,
    ESTRPIPE: 135
  };
  var NODEFS = {
    isWindows: false,
    staticInit: function() {
      NODEFS.isWindows = !!process.platform.match(/^win/);
      var flags = { fs: fs.constants };
      if (flags["fs"]) {
        flags = flags["fs"];
      }
      NODEFS.flagsForNodeMap = {
        1024: flags["O_APPEND"],
        64: flags["O_CREAT"],
        128: flags["O_EXCL"],
        0: flags["O_RDONLY"],
        2: flags["O_RDWR"],
        4096: flags["O_SYNC"],
        512: flags["O_TRUNC"],
        1: flags["O_WRONLY"]
      };
    },
    bufferFrom: function(arrayBuffer) {
      return Buffer["alloc"] ? Buffer.from(arrayBuffer) : new Buffer(arrayBuffer);
    },
    convertNodeCode: function(e) {
      var code = e.code;
      assert(code in ERRNO_CODES);
      return ERRNO_CODES[code];
    },
    mount: function(mount) {
      assert(ENVIRONMENT_HAS_NODE);
      return NODEFS.createNode(null, "/", NODEFS.getMode(mount.opts.root), 0);
    },
    createNode: function(parent, name, mode, dev) {
      if (!FS.isDir(mode) && !FS.isFile(mode) && !FS.isLink(mode)) {
        throw new FS.ErrnoError(28);
      }
      var node = FS.createNode(parent, name, mode);
      node.node_ops = NODEFS.node_ops;
      node.stream_ops = NODEFS.stream_ops;
      return node;
    },
    getMode: function(path) {
      var stat;
      try {
        stat = fs.lstatSync(path);
        if (NODEFS.isWindows) {
          stat.mode = stat.mode | ((stat.mode & 292) >> 2);
        }
      } catch (e) {
        if (!e.code) throw e;
        throw new FS.ErrnoError(NODEFS.convertNodeCode(e));
      }
      return stat.mode;
    },
    realPath: function(node) {
      var parts = [];
      while (node.parent !== node) {
        parts.push(node.name);
        node = node.parent;
      }
      parts.push(node.mount.opts.root);
      parts.reverse();
      return PATH.join.apply(null, parts);
    },
    flagsForNode: function(flags) {
      flags &= ~2097152;
      flags &= ~2048;
      flags &= ~32768;
      flags &= ~524288;
      var newFlags = 0;
      for (var k in NODEFS.flagsForNodeMap) {
        if (flags & k) {
          newFlags |= NODEFS.flagsForNodeMap[k];
          flags ^= k;
        }
      }
      if (!flags) {
        return newFlags;
      } else {
        throw new FS.ErrnoError(28);
      }
    },
    node_ops: {
      getattr: function(node) {
        var path = NODEFS.realPath(node);
        var stat;
        try {
          stat = fs.lstatSync(path);
        } catch (e) {
          if (!e.code) throw e;
          throw new FS.ErrnoError(NODEFS.convertNodeCode(e));
        }
        if (NODEFS.isWindows && !stat.blksize) {
          stat.blksize = 4096;
        }
        if (NODEFS.isWindows && !stat.blocks) {
          stat.blocks = ((stat.size + stat.blksize - 1) / stat.blksize) | 0;
        }
        return {
          dev: stat.dev,
          ino: stat.ino,
          mode: stat.mode,
          nlink: stat.nlink,
          uid: stat.uid,
          gid: stat.gid,
          rdev: stat.rdev,
          size: stat.size,
          atime: stat.atime,
          mtime: stat.mtime,
          ctime: stat.ctime,
          blksize: stat.blksize,
          blocks: stat.blocks
        };
      },
      setattr: function(node, attr) {
        var path = NODEFS.realPath(node);
        try {
          if (attr.mode !== undefined) {
            fs.chmodSync(path, attr.mode);
            node.mode = attr.mode;
          }
          if (attr.timestamp !== undefined) {
            var date = new Date(attr.timestamp);
            fs.utimesSync(path, date, date);
          }
          if (attr.size !== undefined) {
            fs.truncateSync(path, attr.size);
          }
        } catch (e) {
          if (!e.code) throw e;
          throw new FS.ErrnoError(NODEFS.convertNodeCode(e));
        }
      },
      lookup: function(parent, name) {
        var path = PATH.join2(NODEFS.realPath(parent), name);
        var mode = NODEFS.getMode(path);
        return NODEFS.createNode(parent, name, mode);
      },
      mknod: function(parent, name, mode, dev) {
        var node = NODEFS.createNode(parent, name, mode, dev);
        var path = NODEFS.realPath(node);
        try {
          if (FS.isDir(node.mode)) {
            fs.mkdirSync(path, node.mode);
          } else {
            fs.writeFileSync(path, "", { mode: node.mode });
          }
        } catch (e) {
          if (!e.code) throw e;
          throw new FS.ErrnoError(NODEFS.convertNodeCode(e));
        }
        return node;
      },
      rename: function(oldNode, newDir, newName) {
        var oldPath = NODEFS.realPath(oldNode);
        var newPath = PATH.join2(NODEFS.realPath(newDir), newName);
        try {
          fs.renameSync(oldPath, newPath);
        } catch (e) {
          if (!e.code) throw e;
          throw new FS.ErrnoError(NODEFS.convertNodeCode(e));
        }
      },
      unlink: function(parent, name) {
        var path = PATH.join2(NODEFS.realPath(parent), name);
        try {
          fs.unlinkSync(path);
        } catch (e) {
          if (!e.code) throw e;
          throw new FS.ErrnoError(NODEFS.convertNodeCode(e));
        }
      },
      rmdir: function(parent, name) {
        var path = PATH.join2(NODEFS.realPath(parent), name);
        try {
          fs.rmdirSync(path);
        } catch (e) {
          if (!e.code) throw e;
          throw new FS.ErrnoError(NODEFS.convertNodeCode(e));
        }
      },
      readdir: function(node) {
        var path = NODEFS.realPath(node);
        try {
          return fs.readdirSync(path);
        } catch (e) {
          if (!e.code) throw e;
          throw new FS.ErrnoError(NODEFS.convertNodeCode(e));
        }
      },
      symlink: function(parent, newName, oldPath) {
        var newPath = PATH.join2(NODEFS.realPath(parent), newName);
        try {
          fs.symlinkSync(oldPath, newPath);
        } catch (e) {
          if (!e.code) throw e;
          throw new FS.ErrnoError(NODEFS.convertNodeCode(e));
        }
      },
      readlink: function(node) {
        var path = NODEFS.realPath(node);
        try {
          path = fs.readlinkSync(path);
          path = NODEJS_PATH.relative(
            NODEJS_PATH.resolve(node.mount.opts.root),
            path
          );
          return path;
        } catch (e) {
          if (!e.code) throw e;
          throw new FS.ErrnoError(NODEFS.convertNodeCode(e));
        }
      }
    },
    stream_ops: {
      open: function(stream) {
        var path = NODEFS.realPath(stream.node);
        try {
          if (FS.isFile(stream.node.mode)) {
            stream.nfd = fs.openSync(path, NODEFS.flagsForNode(stream.flags));
          }
        } catch (e) {
          if (!e.code) throw e;
          throw new FS.ErrnoError(NODEFS.convertNodeCode(e));
        }
      },
      close: function(stream) {
        try {
          if (FS.isFile(stream.node.mode) && stream.nfd) {
            fs.closeSync(stream.nfd);
          }
        } catch (e) {
          if (!e.code) throw e;
          throw new FS.ErrnoError(NODEFS.convertNodeCode(e));
        }
      },
      read: function(stream, buffer, offset, length, position) {
        if (length === 0) return 0;
        try {
          return fs.readSync(
            stream.nfd,
            NODEFS.bufferFrom(buffer.buffer),
            offset,
            length,
            position
          );
        } catch (e) {
          throw new FS.ErrnoError(NODEFS.convertNodeCode(e));
        }
      },
      write: function(stream, buffer, offset, length, position) {
        try {
          return fs.writeSync(
            stream.nfd,
            NODEFS.bufferFrom(buffer.buffer),
            offset,
            length,
            position
          );
        } catch (e) {
          throw new FS.ErrnoError(NODEFS.convertNodeCode(e));
        }
      },
      llseek: function(stream, offset, whence) {
        var position = offset;
        if (whence === 1) {
          position += stream.position;
        } else if (whence === 2) {
          if (FS.isFile(stream.node.mode)) {
            try {
              var stat = fs.fstatSync(stream.nfd);
              position += stat.size;
            } catch (e) {
              throw new FS.ErrnoError(NODEFS.convertNodeCode(e));
            }
          }
        }
        if (position < 0) {
          throw new FS.ErrnoError(28);
        }
        return position;
      }
    }
  };
  var NODERAWFS = {
    lookupPath: function(path) {
      return { path: path, node: { mode: NODEFS.getMode(path) } };
    },
    createStandardStreams: function() {
      FS.streams[0] = {
        fd: 0,
        nfd: 0,
        position: 0,
        path: "",
        flags: 0,
        tty: true,
        seekable: false
      };
      for (var i = 1; i < 3; i++) {
        FS.streams[i] = {
          fd: i,
          nfd: i,
          position: 0,
          path: "",
          flags: 577,
          tty: true,
          seekable: false
        };
      }
    },
    cwd: function() {
      return process.cwd();
    },
    chdir: function() {
      process.chdir.apply(void 0, arguments);
    },
    mknod: function(path, mode) {
      if (FS.isDir(path)) {
        fs.mkdirSync(path, mode);
      } else {
        fs.writeFileSync(path, "", { mode: mode });
      }
    },
    mkdir: function() {
      fs.mkdirSync.apply(void 0, arguments);
    },
    symlink: function() {
      fs.symlinkSync.apply(void 0, arguments);
    },
    rename: function() {
      fs.renameSync.apply(void 0, arguments);
    },
    rmdir: function() {
      fs.rmdirSync.apply(void 0, arguments);
    },
    readdir: function() {
      fs.readdirSync.apply(void 0, arguments);
    },
    unlink: function() {
      fs.unlinkSync.apply(void 0, arguments);
    },
    readlink: function() {
      return fs.readlinkSync.apply(void 0, arguments);
    },
    stat: function() {
      return fs.statSync.apply(void 0, arguments);
    },
    lstat: function() {
      return fs.lstatSync.apply(void 0, arguments);
    },
    chmod: function() {
      fs.chmodSync.apply(void 0, arguments);
    },
    fchmod: function() {
      fs.fchmodSync.apply(void 0, arguments);
    },
    chown: function() {
      fs.chownSync.apply(void 0, arguments);
    },
    fchown: function() {
      fs.fchownSync.apply(void 0, arguments);
    },
    truncate: function() {
      fs.truncateSync.apply(void 0, arguments);
    },
    ftruncate: function() {
      fs.ftruncateSync.apply(void 0, arguments);
    },
    utime: function() {
      fs.utimesSync.apply(void 0, arguments);
    },
    open: function(path, flags, mode, suggestFD) {
      if (typeof flags === "string") {
        flags = VFS.modeStringToFlags(flags);
      }
      var nfd = fs.openSync(path, NODEFS.flagsForNode(flags), mode);
      var fd = suggestFD != null ? suggestFD : FS.nextfd(nfd);
      var stream = {
        fd: fd,
        nfd: nfd,
        position: 0,
        path: path,
        flags: flags,
        seekable: true
      };
      FS.streams[fd] = stream;
      return stream;
    },
    close: function(stream) {
      if (!stream.stream_ops) {
        fs.closeSync(stream.nfd);
      }
      FS.closeStream(stream.fd);
    },
    llseek: function(stream, offset, whence) {
      if (stream.stream_ops) {
        return VFS.llseek(stream, offset, whence);
      }
      var position = offset;
      if (whence === 1) {
        position += stream.position;
      } else if (whence === 2) {
        position += fs.fstatSync(stream.nfd).size;
      } else if (whence !== 0) {
        throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
      }
      if (position < 0) {
        throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
      }
      stream.position = position;
      return position;
    },
    read: function(stream, buffer, offset, length, position) {
      if (stream.stream_ops) {
        return VFS.read(stream, buffer, offset, length, position);
      }
      var seeking = typeof position !== "undefined";
      if (!seeking && stream.seekable) position = stream.position;
      var bytesRead = fs.readSync(
        stream.nfd,
        NODEFS.bufferFrom(buffer.buffer),
        offset,
        length,
        position
      );
      if (!seeking) stream.position += bytesRead;
      return bytesRead;
    },
    write: function(stream, buffer, offset, length, position) {
      if (stream.stream_ops) {
        return VFS.write(stream, buffer, offset, length, position);
      }
      if (stream.flags & +"1024") {
        FS.llseek(stream, 0, +"2");
      }
      var seeking = typeof position !== "undefined";
      if (!seeking && stream.seekable) position = stream.position;
      var bytesWritten = fs.writeSync(
        stream.nfd,
        NODEFS.bufferFrom(buffer.buffer),
        offset,
        length,
        position
      );
      if (!seeking) stream.position += bytesWritten;
      return bytesWritten;
    },
    allocate: function() {
      throw new FS.ErrnoError(ERRNO_CODES.EOPNOTSUPP);
    },
    mmap: function() {
      throw new FS.ErrnoError(ERRNO_CODES.ENODEV);
    },
    msync: function() {
      return 0;
    },
    munmap: function() {
      return 0;
    },
    ioctl: function() {
      throw new FS.ErrnoError(ERRNO_CODES.ENOTTY);
    }
  };
  var FS = {
    root: null,
    mounts: [],
    devices: {},
    streams: [],
    nextInode: 1,
    nameTable: null,
    currentPath: "/",
    initialized: false,
    ignorePermissions: true,
    trackingDelegate: {},
    tracking: { openFlags: { READ: 1, WRITE: 2 } },
    ErrnoError: null,
    genericErrors: {},
    filesystems: null,
    syncFSRequests: 0,
    handleFSError: function(e) {
      if (!(e instanceof FS.ErrnoError)) throw e + " : " + stackTrace();
      return ___setErrNo(e.errno);
    },
    lookupPath: function(path, opts) {
      path = PATH_FS.resolve(FS.cwd(), path);
      opts = opts || {};
      if (!path) return { path: "", node: null };
      var defaults = { follow_mount: true, recurse_count: 0 };
      for (var key in defaults) {
        if (opts[key] === undefined) {
          opts[key] = defaults[key];
        }
      }
      if (opts.recurse_count > 8) {
        throw new FS.ErrnoError(32);
      }
      var parts = PATH.normalizeArray(
        path.split("/").filter(function(p) {
          return !!p;
        }),
        false
      );
      var current = FS.root;
      var current_path = "/";
      for (var i = 0; i < parts.length; i++) {
        var islast = i === parts.length - 1;
        if (islast && opts.parent) {
          break;
        }
        current = FS.lookupNode(current, parts[i]);
        current_path = PATH.join2(current_path, parts[i]);
        if (FS.isMountpoint(current)) {
          if (!islast || (islast && opts.follow_mount)) {
            current = current.mounted.root;
          }
        }
        if (!islast || opts.follow) {
          var count = 0;
          while (FS.isLink(current.mode)) {
            var link = FS.readlink(current_path);
            current_path = PATH_FS.resolve(PATH.dirname(current_path), link);
            var lookup = FS.lookupPath(current_path, {
              recurse_count: opts.recurse_count
            });
            current = lookup.node;
            if (count++ > 40) {
              throw new FS.ErrnoError(32);
            }
          }
        }
      }
      return { path: current_path, node: current };
    },
    getPath: function(node) {
      var path;
      while (true) {
        if (FS.isRoot(node)) {
          var mount = node.mount.mountpoint;
          if (!path) return mount;
          return mount[mount.length - 1] !== "/"
            ? mount + "/" + path
            : mount + path;
        }
        path = path ? node.name + "/" + path : node.name;
        node = node.parent;
      }
    },
    hashName: function(parentid, name) {
      var hash = 0;
      for (var i = 0; i < name.length; i++) {
        hash = ((hash << 5) - hash + name.charCodeAt(i)) | 0;
      }
      return ((parentid + hash) >>> 0) % FS.nameTable.length;
    },
    hashAddNode: function(node) {
      var hash = FS.hashName(node.parent.id, node.name);
      node.name_next = FS.nameTable[hash];
      FS.nameTable[hash] = node;
    },
    hashRemoveNode: function(node) {
      var hash = FS.hashName(node.parent.id, node.name);
      if (FS.nameTable[hash] === node) {
        FS.nameTable[hash] = node.name_next;
      } else {
        var current = FS.nameTable[hash];
        while (current) {
          if (current.name_next === node) {
            current.name_next = node.name_next;
            break;
          }
          current = current.name_next;
        }
      }
    },
    lookupNode: function(parent, name) {
      var err = FS.mayLookup(parent);
      if (err) {
        throw new FS.ErrnoError(err, parent);
      }
      var hash = FS.hashName(parent.id, name);
      for (var node = FS.nameTable[hash]; node; node = node.name_next) {
        var nodeName = node.name;
        if (node.parent.id === parent.id && nodeName === name) {
          return node;
        }
      }
      return FS.lookup(parent, name);
    },
    createNode: function(parent, name, mode, rdev) {
      if (!FS.FSNode) {
        FS.FSNode = function(parent, name, mode, rdev) {
          if (!parent) {
            parent = this;
          }
          this.parent = parent;
          this.mount = parent.mount;
          this.mounted = null;
          this.id = FS.nextInode++;
          this.name = name;
          this.mode = mode;
          this.node_ops = {};
          this.stream_ops = {};
          this.rdev = rdev;
        };
        FS.FSNode.prototype = {};
        var readMode = 292 | 73;
        var writeMode = 146;
        Object.defineProperties(FS.FSNode.prototype, {
          read: {
            get: function() {
              return (this.mode & readMode) === readMode;
            },
            set: function(val) {
              val ? (this.mode |= readMode) : (this.mode &= ~readMode);
            }
          },
          write: {
            get: function() {
              return (this.mode & writeMode) === writeMode;
            },
            set: function(val) {
              val ? (this.mode |= writeMode) : (this.mode &= ~writeMode);
            }
          },
          isFolder: {
            get: function() {
              return FS.isDir(this.mode);
            }
          },
          isDevice: {
            get: function() {
              return FS.isChrdev(this.mode);
            }
          }
        });
      }
      var node = new FS.FSNode(parent, name, mode, rdev);
      FS.hashAddNode(node);
      return node;
    },
    destroyNode: function(node) {
      FS.hashRemoveNode(node);
    },
    isRoot: function(node) {
      return node === node.parent;
    },
    isMountpoint: function(node) {
      return !!node.mounted;
    },
    isFile: function(mode) {
      return (mode & 61440) === 32768;
    },
    isDir: function(mode) {
      return (mode & 61440) === 16384;
    },
    isLink: function(mode) {
      return (mode & 61440) === 40960;
    },
    isChrdev: function(mode) {
      return (mode & 61440) === 8192;
    },
    isBlkdev: function(mode) {
      return (mode & 61440) === 24576;
    },
    isFIFO: function(mode) {
      return (mode & 61440) === 4096;
    },
    isSocket: function(mode) {
      return (mode & 49152) === 49152;
    },
    flagModes: {
      r: 0,
      rs: 1052672,
      "r+": 2,
      w: 577,
      wx: 705,
      xw: 705,
      "w+": 578,
      "wx+": 706,
      "xw+": 706,
      a: 1089,
      ax: 1217,
      xa: 1217,
      "a+": 1090,
      "ax+": 1218,
      "xa+": 1218
    },
    modeStringToFlags: function(str) {
      var flags = FS.flagModes[str];
      if (typeof flags === "undefined") {
        throw new Error("Unknown file open mode: " + str);
      }
      return flags;
    },
    flagsToPermissionString: function(flag) {
      var perms = ["r", "w", "rw"][flag & 3];
      if (flag & 512) {
        perms += "w";
      }
      return perms;
    },
    nodePermissions: function(node, perms) {
      if (FS.ignorePermissions) {
        return 0;
      }
      if (perms.indexOf("r") !== -1 && !(node.mode & 292)) {
        return 2;
      } else if (perms.indexOf("w") !== -1 && !(node.mode & 146)) {
        return 2;
      } else if (perms.indexOf("x") !== -1 && !(node.mode & 73)) {
        return 2;
      }
      return 0;
    },
    mayLookup: function(dir) {
      var err = FS.nodePermissions(dir, "x");
      if (err) return err;
      if (!dir.node_ops.lookup) return 2;
      return 0;
    },
    mayCreate: function(dir, name) {
      try {
        var node = FS.lookupNode(dir, name);
        return 20;
      } catch (e) {}
      return FS.nodePermissions(dir, "wx");
    },
    mayDelete: function(dir, name, isdir) {
      var node;
      try {
        node = FS.lookupNode(dir, name);
      } catch (e) {
        return e.errno;
      }
      var err = FS.nodePermissions(dir, "wx");
      if (err) {
        return err;
      }
      if (isdir) {
        if (!FS.isDir(node.mode)) {
          return 54;
        }
        if (FS.isRoot(node) || FS.getPath(node) === FS.cwd()) {
          return 10;
        }
      } else {
        if (FS.isDir(node.mode)) {
          return 31;
        }
      }
      return 0;
    },
    mayOpen: function(node, flags) {
      if (!node) {
        return 44;
      }
      if (FS.isLink(node.mode)) {
        return 32;
      } else if (FS.isDir(node.mode)) {
        if (FS.flagsToPermissionString(flags) !== "r" || flags & 512) {
          return 31;
        }
      }
      return FS.nodePermissions(node, FS.flagsToPermissionString(flags));
    },
    MAX_OPEN_FDS: 4096,
    nextfd: function(fd_start, fd_end) {
      fd_start = fd_start || 0;
      fd_end = fd_end || FS.MAX_OPEN_FDS;
      for (var fd = fd_start; fd <= fd_end; fd++) {
        if (!FS.streams[fd]) {
          return fd;
        }
      }
      throw new FS.ErrnoError(33);
    },
    getStream: function(fd) {
      return FS.streams[fd];
    },
    createStream: function(stream, fd_start, fd_end) {
      if (!FS.FSStream) {
        FS.FSStream = function() {};
        FS.FSStream.prototype = {};
        Object.defineProperties(FS.FSStream.prototype, {
          object: {
            get: function() {
              return this.node;
            },
            set: function(val) {
              this.node = val;
            }
          },
          isRead: {
            get: function() {
              return (this.flags & 2097155) !== 1;
            }
          },
          isWrite: {
            get: function() {
              return (this.flags & 2097155) !== 0;
            }
          },
          isAppend: {
            get: function() {
              return this.flags & 1024;
            }
          }
        });
      }
      var newStream = new FS.FSStream();
      for (var p in stream) {
        newStream[p] = stream[p];
      }
      stream = newStream;
      var fd = FS.nextfd(fd_start, fd_end);
      stream.fd = fd;
      FS.streams[fd] = stream;
      return stream;
    },
    closeStream: function(fd) {
      FS.streams[fd] = null;
    },
    chrdev_stream_ops: {
      open: function(stream) {
        var device = FS.getDevice(stream.node.rdev);
        stream.stream_ops = device.stream_ops;
        if (stream.stream_ops.open) {
          stream.stream_ops.open(stream);
        }
      },
      llseek: function() {
        throw new FS.ErrnoError(70);
      }
    },
    major: function(dev) {
      return dev >> 8;
    },
    minor: function(dev) {
      return dev & 255;
    },
    makedev: function(ma, mi) {
      return (ma << 8) | mi;
    },
    registerDevice: function(dev, ops) {
      FS.devices[dev] = { stream_ops: ops };
    },
    getDevice: function(dev) {
      return FS.devices[dev];
    },
    getMounts: function(mount) {
      var mounts = [];
      var check = [mount];
      while (check.length) {
        var m = check.pop();
        mounts.push(m);
        check.push.apply(check, m.mounts);
      }
      return mounts;
    },
    syncfs: function(populate, callback) {
      if (typeof populate === "function") {
        callback = populate;
        populate = false;
      }
      FS.syncFSRequests++;
      if (FS.syncFSRequests > 1) {
        console.log(
          "warning: " +
            FS.syncFSRequests +
            " FS.syncfs operations in flight at once, probably just doing extra work"
        );
      }
      var mounts = FS.getMounts(FS.root.mount);
      var completed = 0;
      function doCallback(err) {
        FS.syncFSRequests--;
        return callback(err);
      }
      function done(err) {
        if (err) {
          if (!done.errored) {
            done.errored = true;
            return doCallback(err);
          }
          return;
        }
        if (++completed >= mounts.length) {
          doCallback(null);
        }
      }
      mounts.forEach(function(mount) {
        if (!mount.type.syncfs) {
          return done(null);
        }
        mount.type.syncfs(mount, populate, done);
      });
    },
    mount: function(type, opts, mountpoint) {
      var root = mountpoint === "/";
      var pseudo = !mountpoint;
      var node;
      if (root && FS.root) {
        throw new FS.ErrnoError(10);
      } else if (!root && !pseudo) {
        var lookup = FS.lookupPath(mountpoint, { follow_mount: false });
        mountpoint = lookup.path;
        node = lookup.node;
        if (FS.isMountpoint(node)) {
          throw new FS.ErrnoError(10);
        }
        if (!FS.isDir(node.mode)) {
          throw new FS.ErrnoError(54);
        }
      }
      var mount = { type: type, opts: opts, mountpoint: mountpoint, mounts: [] };
      var mountRoot = type.mount(mount);
      mountRoot.mount = mount;
      mount.root = mountRoot;
      if (root) {
        FS.root = mountRoot;
      } else if (node) {
        node.mounted = mount;
        if (node.mount) {
          node.mount.mounts.push(mount);
        }
      }
      return mountRoot;
    },
    unmount: function(mountpoint) {
      var lookup = FS.lookupPath(mountpoint, { follow_mount: false });
      if (!FS.isMountpoint(lookup.node)) {
        throw new FS.ErrnoError(28);
      }
      var node = lookup.node;
      var mount = node.mounted;
      var mounts = FS.getMounts(mount);
      Object.keys(FS.nameTable).forEach(function(hash) {
        var current = FS.nameTable[hash];
        while (current) {
          var next = current.name_next;
          if (mounts.indexOf(current.mount) !== -1) {
            FS.destroyNode(current);
          }
          current = next;
        }
      });
      node.mounted = null;
      var idx = node.mount.mounts.indexOf(mount);
      node.mount.mounts.splice(idx, 1);
    },
    lookup: function(parent, name) {
      return parent.node_ops.lookup(parent, name);
    },
    mknod: function(path, mode, dev) {
      var lookup = FS.lookupPath(path, { parent: true });
      var parent = lookup.node;
      var name = PATH.basename(path);
      if (!name || name === "." || name === "..") {
        throw new FS.ErrnoError(28);
      }
      var err = FS.mayCreate(parent, name);
      if (err) {
        throw new FS.ErrnoError(err);
      }
      if (!parent.node_ops.mknod) {
        throw new FS.ErrnoError(63);
      }
      return parent.node_ops.mknod(parent, name, mode, dev);
    },
    create: function(path, mode) {
      mode = mode !== undefined ? mode : 438;
      mode &= 4095;
      mode |= 32768;
      return FS.mknod(path, mode, 0);
    },
    mkdir: function(path, mode) {
      mode = mode !== undefined ? mode : 511;
      mode &= 511 | 512;
      mode |= 16384;
      return FS.mknod(path, mode, 0);
    },
    mkdirTree: function(path, mode) {
      var dirs = path.split("/");
      var d = "";
      for (var i = 0; i < dirs.length; ++i) {
        if (!dirs[i]) continue;
        d += "/" + dirs[i];
        try {
          FS.mkdir(d, mode);
        } catch (e) {
          if (e.errno != 20) throw e;
        }
      }
    },
    mkdev: function(path, mode, dev) {
      if (typeof dev === "undefined") {
        dev = mode;
        mode = 438;
      }
      mode |= 8192;
      return FS.mknod(path, mode, dev);
    },
    symlink: function(oldpath, newpath) {
      if (!PATH_FS.resolve(oldpath)) {
        throw new FS.ErrnoError(44);
      }
      var lookup = FS.lookupPath(newpath, { parent: true });
      var parent = lookup.node;
      if (!parent) {
        throw new FS.ErrnoError(44);
      }
      var newname = PATH.basename(newpath);
      var err = FS.mayCreate(parent, newname);
      if (err) {
        throw new FS.ErrnoError(err);
      }
      if (!parent.node_ops.symlink) {
        throw new FS.ErrnoError(63);
      }
      return parent.node_ops.symlink(parent, newname, oldpath);
    },
    rename: function(old_path, new_path) {
      var old_dirname = PATH.dirname(old_path);
      var new_dirname = PATH.dirname(new_path);
      var old_name = PATH.basename(old_path);
      var new_name = PATH.basename(new_path);
      var lookup, old_dir, new_dir;
      try {
        lookup = FS.lookupPath(old_path, { parent: true });
        old_dir = lookup.node;
        lookup = FS.lookupPath(new_path, { parent: true });
        new_dir = lookup.node;
      } catch (e) {
        throw new FS.ErrnoError(10);
      }
      if (!old_dir || !new_dir) throw new FS.ErrnoError(44);
      if (old_dir.mount !== new_dir.mount) {
        throw new FS.ErrnoError(75);
      }
      var old_node = FS.lookupNode(old_dir, old_name);
      var relative = PATH_FS.relative(old_path, new_dirname);
      if (relative.charAt(0) !== ".") {
        throw new FS.ErrnoError(28);
      }
      relative = PATH_FS.relative(new_path, old_dirname);
      if (relative.charAt(0) !== ".") {
        throw new FS.ErrnoError(55);
      }
      var new_node;
      try {
        new_node = FS.lookupNode(new_dir, new_name);
      } catch (e) {}
      if (old_node === new_node) {
        return;
      }
      var isdir = FS.isDir(old_node.mode);
      var err = FS.mayDelete(old_dir, old_name, isdir);
      if (err) {
        throw new FS.ErrnoError(err);
      }
      err = new_node
        ? FS.mayDelete(new_dir, new_name, isdir)
        : FS.mayCreate(new_dir, new_name);
      if (err) {
        throw new FS.ErrnoError(err);
      }
      if (!old_dir.node_ops.rename) {
        throw new FS.ErrnoError(63);
      }
      if (FS.isMountpoint(old_node) || (new_node && FS.isMountpoint(new_node))) {
        throw new FS.ErrnoError(10);
      }
      if (new_dir !== old_dir) {
        err = FS.nodePermissions(old_dir, "w");
        if (err) {
          throw new FS.ErrnoError(err);
        }
      }
      try {
        if (FS.trackingDelegate["willMovePath"]) {
          FS.trackingDelegate["willMovePath"](old_path, new_path);
        }
      } catch (e) {
        console.log(
          "FS.trackingDelegate['willMovePath']('" +
            old_path +
            "', '" +
            new_path +
            "') threw an exception: " +
            e.message
        );
      }
      FS.hashRemoveNode(old_node);
      try {
        old_dir.node_ops.rename(old_node, new_dir, new_name);
      } catch (e) {
        throw e;
      } finally {
        FS.hashAddNode(old_node);
      }
      try {
        if (FS.trackingDelegate["onMovePath"])
          FS.trackingDelegate["onMovePath"](old_path, new_path);
      } catch (e) {
        console.log(
          "FS.trackingDelegate['onMovePath']('" +
            old_path +
            "', '" +
            new_path +
            "') threw an exception: " +
            e.message
        );
      }
    },
    rmdir: function(path) {
      var lookup = FS.lookupPath(path, { parent: true });
      var parent = lookup.node;
      var name = PATH.basename(path);
      var node = FS.lookupNode(parent, name);
      var err = FS.mayDelete(parent, name, true);
      if (err) {
        throw new FS.ErrnoError(err);
      }
      if (!parent.node_ops.rmdir) {
        throw new FS.ErrnoError(63);
      }
      if (FS.isMountpoint(node)) {
        throw new FS.ErrnoError(10);
      }
      try {
        if (FS.trackingDelegate["willDeletePath"]) {
          FS.trackingDelegate["willDeletePath"](path);
        }
      } catch (e) {
        console.log(
          "FS.trackingDelegate['willDeletePath']('" +
            path +
            "') threw an exception: " +
            e.message
        );
      }
      parent.node_ops.rmdir(parent, name);
      FS.destroyNode(node);
      try {
        if (FS.trackingDelegate["onDeletePath"])
          FS.trackingDelegate["onDeletePath"](path);
      } catch (e) {
        console.log(
          "FS.trackingDelegate['onDeletePath']('" +
            path +
            "') threw an exception: " +
            e.message
        );
      }
    },
    readdir: function(path) {
      var lookup = FS.lookupPath(path, { follow: true });
      var node = lookup.node;
      if (!node.node_ops.readdir) {
        throw new FS.ErrnoError(54);
      }
      return node.node_ops.readdir(node);
    },
    unlink: function(path) {
      var lookup = FS.lookupPath(path, { parent: true });
      var parent = lookup.node;
      var name = PATH.basename(path);
      var node = FS.lookupNode(parent, name);
      var err = FS.mayDelete(parent, name, false);
      if (err) {
        throw new FS.ErrnoError(err);
      }
      if (!parent.node_ops.unlink) {
        throw new FS.ErrnoError(63);
      }
      if (FS.isMountpoint(node)) {
        throw new FS.ErrnoError(10);
      }
      try {
        if (FS.trackingDelegate["willDeletePath"]) {
          FS.trackingDelegate["willDeletePath"](path);
        }
      } catch (e) {
        console.log(
          "FS.trackingDelegate['willDeletePath']('" +
            path +
            "') threw an exception: " +
            e.message
        );
      }
      parent.node_ops.unlink(parent, name);
      FS.destroyNode(node);
      try {
        if (FS.trackingDelegate["onDeletePath"])
          FS.trackingDelegate["onDeletePath"](path);
      } catch (e) {
        console.log(
          "FS.trackingDelegate['onDeletePath']('" +
            path +
            "') threw an exception: " +
            e.message
        );
      }
    },
    readlink: function(path) {
      var lookup = FS.lookupPath(path);
      var link = lookup.node;
      if (!link) {
        throw new FS.ErrnoError(44);
      }
      if (!link.node_ops.readlink) {
        throw new FS.ErrnoError(28);
      }
      return PATH_FS.resolve(
        FS.getPath(link.parent),
        link.node_ops.readlink(link)
      );
    },
    stat: function(path, dontFollow) {
      var lookup = FS.lookupPath(path, { follow: !dontFollow });
      var node = lookup.node;
      if (!node) {
        throw new FS.ErrnoError(44);
      }
      if (!node.node_ops.getattr) {
        throw new FS.ErrnoError(63);
      }
      return node.node_ops.getattr(node);
    },
    lstat: function(path) {
      return FS.stat(path, true);
    },
    chmod: function(path, mode, dontFollow) {
      var node;
      if (typeof path === "string") {
        var lookup = FS.lookupPath(path, { follow: !dontFollow });
        node = lookup.node;
      } else {
        node = path;
      }
      if (!node.node_ops.setattr) {
        throw new FS.ErrnoError(63);
      }
      node.node_ops.setattr(node, {
        mode: (mode & 4095) | (node.mode & ~4095),
        timestamp: Date.now()
      });
    },
    lchmod: function(path, mode) {
      FS.chmod(path, mode, true);
    },
    fchmod: function(fd, mode) {
      var stream = FS.getStream(fd);
      if (!stream) {
        throw new FS.ErrnoError(8);
      }
      FS.chmod(stream.node, mode);
    },
    chown: function(path, uid, gid, dontFollow) {
      var node;
      if (typeof path === "string") {
        var lookup = FS.lookupPath(path, { follow: !dontFollow });
        node = lookup.node;
      } else {
        node = path;
      }
      if (!node.node_ops.setattr) {
        throw new FS.ErrnoError(63);
      }
      node.node_ops.setattr(node, { timestamp: Date.now() });
    },
    lchown: function(path, uid, gid) {
      FS.chown(path, uid, gid, true);
    },
    fchown: function(fd, uid, gid) {
      var stream = FS.getStream(fd);
      if (!stream) {
        throw new FS.ErrnoError(8);
      }
      FS.chown(stream.node, uid, gid);
    },
    truncate: function(path, len) {
      if (len < 0) {
        throw new FS.ErrnoError(28);
      }
      var node;
      if (typeof path === "string") {
        var lookup = FS.lookupPath(path, { follow: true });
        node = lookup.node;
      } else {
        node = path;
      }
      if (!node.node_ops.setattr) {
        throw new FS.ErrnoError(63);
      }
      if (FS.isDir(node.mode)) {
        throw new FS.ErrnoError(31);
      }
      if (!FS.isFile(node.mode)) {
        throw new FS.ErrnoError(28);
      }
      var err = FS.nodePermissions(node, "w");
      if (err) {
        throw new FS.ErrnoError(err);
      }
      node.node_ops.setattr(node, { size: len, timestamp: Date.now() });
    },
    ftruncate: function(fd, len) {
      var stream = FS.getStream(fd);
      if (!stream) {
        throw new FS.ErrnoError(8);
      }
      if ((stream.flags & 2097155) === 0) {
        throw new FS.ErrnoError(28);
      }
      FS.truncate(stream.node, len);
    },
    utime: function(path, atime, mtime) {
      var lookup = FS.lookupPath(path, { follow: true });
      var node = lookup.node;
      node.node_ops.setattr(node, { timestamp: Math.max(atime, mtime) });
    },
    open: function(path, flags, mode, fd_start, fd_end) {
      if (path === "") {
        throw new FS.ErrnoError(44);
      }
      flags = typeof flags === "string" ? FS.modeStringToFlags(flags) : flags;
      mode = typeof mode === "undefined" ? 438 : mode;
      if (flags & 64) {
        mode = (mode & 4095) | 32768;
      } else {
        mode = 0;
      }
      var node;
      if (typeof path === "object") {
        node = path;
      } else {
        path = PATH.normalize(path);
        try {
          var lookup = FS.lookupPath(path, { follow: !(flags & 131072) });
          node = lookup.node;
        } catch (e) {}
      }
      var created = false;
      if (flags & 64) {
        if (node) {
          if (flags & 128) {
            throw new FS.ErrnoError(20);
          }
        } else {
          node = FS.mknod(path, mode, 0);
          created = true;
        }
      }
      if (!node) {
        throw new FS.ErrnoError(44);
      }
      if (FS.isChrdev(node.mode)) {
        flags &= ~512;
      }
      if (flags & 65536 && !FS.isDir(node.mode)) {
        throw new FS.ErrnoError(54);
      }
      if (!created) {
        var err = FS.mayOpen(node, flags);
        if (err) {
          throw new FS.ErrnoError(err);
        }
      }
      if (flags & 512) {
        FS.truncate(node, 0);
      }
      flags &= ~(128 | 512);
      var stream = FS.createStream(
        {
          node: node,
          path: FS.getPath(node),
          flags: flags,
          seekable: true,
          position: 0,
          stream_ops: node.stream_ops,
          ungotten: [],
          error: false
        },
        fd_start,
        fd_end
      );
      if (stream.stream_ops.open) {
        stream.stream_ops.open(stream);
      }
      if (Module["logReadFiles"] && !(flags & 1)) {
        if (!FS.readFiles) FS.readFiles = {};
        if (!(path in FS.readFiles)) {
          FS.readFiles[path] = 1;
          console.log("FS.trackingDelegate error on read file: " + path);
        }
      }
      try {
        if (FS.trackingDelegate["onOpenFile"]) {
          var trackingFlags = 0;
          if ((flags & 2097155) !== 1) {
            trackingFlags |= FS.tracking.openFlags.READ;
          }
          if ((flags & 2097155) !== 0) {
            trackingFlags |= FS.tracking.openFlags.WRITE;
          }
          FS.trackingDelegate["onOpenFile"](path, trackingFlags);
        }
      } catch (e) {
        console.log(
          "FS.trackingDelegate['onOpenFile']('" +
            path +
            "', flags) threw an exception: " +
            e.message
        );
      }
      return stream;
    },
    close: function(stream) {
      if (FS.isClosed(stream)) {
        throw new FS.ErrnoError(8);
      }
      if (stream.getdents) stream.getdents = null;
      try {
        if (stream.stream_ops.close) {
          stream.stream_ops.close(stream);
        }
      } catch (e) {
        throw e;
      } finally {
        FS.closeStream(stream.fd);
      }
      stream.fd = null;
    },
    isClosed: function(stream) {
      return stream.fd === null;
    },
    llseek: function(stream, offset, whence) {
      if (FS.isClosed(stream)) {
        throw new FS.ErrnoError(8);
      }
      if (!stream.seekable || !stream.stream_ops.llseek) {
        throw new FS.ErrnoError(70);
      }
      if (whence != 0 && whence != 1 && whence != 2) {
        throw new FS.ErrnoError(28);
      }
      stream.position = stream.stream_ops.llseek(stream, offset, whence);
      stream.ungotten = [];
      return stream.position;
    },
    read: function(stream, buffer, offset, length, position) {
      if (length < 0 || position < 0) {
        throw new FS.ErrnoError(28);
      }
      if (FS.isClosed(stream)) {
        throw new FS.ErrnoError(8);
      }
      if ((stream.flags & 2097155) === 1) {
        throw new FS.ErrnoError(8);
      }
      if (FS.isDir(stream.node.mode)) {
        throw new FS.ErrnoError(31);
      }
      if (!stream.stream_ops.read) {
        throw new FS.ErrnoError(28);
      }
      var seeking = typeof position !== "undefined";
      if (!seeking) {
        position = stream.position;
      } else if (!stream.seekable) {
        throw new FS.ErrnoError(70);
      }
      var bytesRead = stream.stream_ops.read(
        stream,
        buffer,
        offset,
        length,
        position
      );
      if (!seeking) stream.position += bytesRead;
      return bytesRead;
    },
    write: function(stream, buffer, offset, length, position, canOwn) {
      if (length < 0 || position < 0) {
        throw new FS.ErrnoError(28);
      }
      if (FS.isClosed(stream)) {
        throw new FS.ErrnoError(8);
      }
      if ((stream.flags & 2097155) === 0) {
        throw new FS.ErrnoError(8);
      }
      if (FS.isDir(stream.node.mode)) {
        throw new FS.ErrnoError(31);
      }
      if (!stream.stream_ops.write) {
        throw new FS.ErrnoError(28);
      }
      if (stream.flags & 1024) {
        FS.llseek(stream, 0, 2);
      }
      var seeking = typeof position !== "undefined";
      if (!seeking) {
        position = stream.position;
      } else if (!stream.seekable) {
        throw new FS.ErrnoError(70);
      }
      var bytesWritten = stream.stream_ops.write(
        stream,
        buffer,
        offset,
        length,
        position,
        canOwn
      );
      if (!seeking) stream.position += bytesWritten;
      try {
        if (stream.path && FS.trackingDelegate["onWriteToFile"])
          FS.trackingDelegate["onWriteToFile"](stream.path);
      } catch (e) {
        console.log(
          "FS.trackingDelegate['onWriteToFile']('" +
            stream.path +
            "') threw an exception: " +
            e.message
        );
      }
      return bytesWritten;
    },
    allocate: function(stream, offset, length) {
      if (FS.isClosed(stream)) {
        throw new FS.ErrnoError(8);
      }
      if (offset < 0 || length <= 0) {
        throw new FS.ErrnoError(28);
      }
      if ((stream.flags & 2097155) === 0) {
        throw new FS.ErrnoError(8);
      }
      if (!FS.isFile(stream.node.mode) && !FS.isDir(stream.node.mode)) {
        throw new FS.ErrnoError(43);
      }
      if (!stream.stream_ops.allocate) {
        throw new FS.ErrnoError(138);
      }
      stream.stream_ops.allocate(stream, offset, length);
    },
    mmap: function(stream, buffer, offset, length, position, prot, flags) {
      if (
        (prot & 2) !== 0 &&
        (flags & 2) === 0 &&
        (stream.flags & 2097155) !== 2
      ) {
        throw new FS.ErrnoError(2);
      }
      if ((stream.flags & 2097155) === 1) {
        throw new FS.ErrnoError(2);
      }
      if (!stream.stream_ops.mmap) {
        throw new FS.ErrnoError(43);
      }
      return stream.stream_ops.mmap(
        stream,
        buffer,
        offset,
        length,
        position,
        prot,
        flags
      );
    },
    msync: function(stream, buffer, offset, length, mmapFlags) {
      if (!stream || !stream.stream_ops.msync) {
        return 0;
      }
      return stream.stream_ops.msync(stream, buffer, offset, length, mmapFlags);
    },
    munmap: function(stream) {
      return 0;
    },
    ioctl: function(stream, cmd, arg) {
      if (!stream.stream_ops.ioctl) {
        throw new FS.ErrnoError(59);
      }
      return stream.stream_ops.ioctl(stream, cmd, arg);
    },
    readFile: function(path, opts) {
      opts = opts || {};
      opts.flags = opts.flags || "r";
      opts.encoding = opts.encoding || "binary";
      if (opts.encoding !== "utf8" && opts.encoding !== "binary") {
        throw new Error('Invalid encoding type "' + opts.encoding + '"');
      }
      var ret;
      var stream = FS.open(path, opts.flags);
      var stat = FS.stat(path);
      var length = stat.size;
      var buf = new Uint8Array(length);
      FS.read(stream, buf, 0, length, 0);
      if (opts.encoding === "utf8") {
        ret = UTF8ArrayToString(buf, 0);
      } else if (opts.encoding === "binary") {
        ret = buf;
      }
      FS.close(stream);
      return ret;
    },
    writeFile: function(path, data, opts) {
      opts = opts || {};
      opts.flags = opts.flags || "w";
      var stream = FS.open(path, opts.flags, opts.mode);
      if (typeof data === "string") {
        var buf = new Uint8Array(lengthBytesUTF8(data) + 1);
        var actualNumBytes = stringToUTF8Array(data, buf, 0, buf.length);
        FS.write(stream, buf, 0, actualNumBytes, undefined, opts.canOwn);
      } else if (ArrayBuffer.isView(data)) {
        FS.write(stream, data, 0, data.byteLength, undefined, opts.canOwn);
      } else {
        throw new Error("Unsupported data type");
      }
      FS.close(stream);
    },
    cwd: function() {
      return FS.currentPath;
    },
    chdir: function(path) {
      var lookup = FS.lookupPath(path, { follow: true });
      if (lookup.node === null) {
        throw new FS.ErrnoError(44);
      }
      if (!FS.isDir(lookup.node.mode)) {
        throw new FS.ErrnoError(54);
      }
      var err = FS.nodePermissions(lookup.node, "x");
      if (err) {
        throw new FS.ErrnoError(err);
      }
      FS.currentPath = lookup.path;
    },
    createDefaultDirectories: function() {
      FS.mkdir("/tmp");
      FS.mkdir("/home");
      FS.mkdir("/home/web_user");
    },
    createDefaultDevices: function() {
      FS.mkdir("/dev");
      FS.registerDevice(FS.makedev(1, 3), {
        read: function() {
          return 0;
        },
        write: function(stream, buffer, offset, length, pos) {
          return length;
        }
      });
      FS.mkdev("/dev/null", FS.makedev(1, 3));
      TTY.register(FS.makedev(5, 0), TTY.default_tty_ops);
      TTY.register(FS.makedev(6, 0), TTY.default_tty1_ops);
      FS.mkdev("/dev/tty", FS.makedev(5, 0));
      FS.mkdev("/dev/tty1", FS.makedev(6, 0));
      var random_device;
      if (
        typeof crypto === "object" &&
        typeof crypto["getRandomValues"] === "function"
      ) {
        var randomBuffer = new Uint8Array(1);
        random_device = function() {
          crypto.getRandomValues(randomBuffer);
          return randomBuffer[0];
        };
      } else if (ENVIRONMENT_IS_NODE) {
        try {
          var crypto_module = __webpack_require__(10);
          random_device = function() {
            return crypto_module["randomBytes"](1)[0];
          };
        } catch (e) {}
      } else {
      }
      if (!random_device) {
        random_device = function() {
          abort("random_device");
        };
      }
      FS.createDevice("/dev", "random", random_device);
      FS.createDevice("/dev", "urandom", random_device);
      FS.mkdir("/dev/shm");
      FS.mkdir("/dev/shm/tmp");
    },
    createSpecialDirectories: function() {
      FS.mkdir("/proc");
      FS.mkdir("/proc/self");
      FS.mkdir("/proc/self/fd");
      FS.mount(
        {
          mount: function() {
            var node = FS.createNode("/proc/self", "fd", 16384 | 511, 73);
            node.node_ops = {
              lookup: function(parent, name) {
                var fd = +name;
                var stream = FS.getStream(fd);
                if (!stream) throw new FS.ErrnoError(8);
                var ret = {
                  parent: null,
                  mount: { mountpoint: "fake" },
                  node_ops: {
                    readlink: function() {
                      return stream.path;
                    }
                  }
                };
                ret.parent = ret;
                return ret;
              }
            };
            return node;
          }
        },
        {},
        "/proc/self/fd"
      );
    },
    createStandardStreams: function() {
      if (Module["stdin"]) {
        FS.createDevice("/dev", "stdin", Module["stdin"]);
      } else {
        FS.symlink("/dev/tty", "/dev/stdin");
      }
      if (Module["stdout"]) {
        FS.createDevice("/dev", "stdout", null, Module["stdout"]);
      } else {
        FS.symlink("/dev/tty", "/dev/stdout");
      }
      if (Module["stderr"]) {
        FS.createDevice("/dev", "stderr", null, Module["stderr"]);
      } else {
        FS.symlink("/dev/tty1", "/dev/stderr");
      }
      var stdin = FS.open("/dev/stdin", "r");
      var stdout = FS.open("/dev/stdout", "w");
      var stderr = FS.open("/dev/stderr", "w");
    },
    ensureErrnoError: function() {
      if (FS.ErrnoError) return;
      FS.ErrnoError = function ErrnoError(errno, node) {
        this.node = node;
        this.setErrno = function(errno) {
          this.errno = errno;
        };
        this.setErrno(errno);
        this.message = "FS error";
      };
      FS.ErrnoError.prototype = new Error();
      FS.ErrnoError.prototype.constructor = FS.ErrnoError;
      [44].forEach(function(code) {
        FS.genericErrors[code] = new FS.ErrnoError(code);
        FS.genericErrors[code].stack = "<generic error, no stack>";
      });
    },
    staticInit: function() {
      FS.ensureErrnoError();
      FS.nameTable = new Array(4096);
      FS.mount(MEMFS, {}, "/");
      FS.createDefaultDirectories();
      FS.createDefaultDevices();
      FS.createSpecialDirectories();
      FS.filesystems = { MEMFS: MEMFS, NODEFS: NODEFS };
    },
    init: function(input, output, error) {
      FS.init.initialized = true;
      FS.ensureErrnoError();
      Module["stdin"] = input || Module["stdin"];
      Module["stdout"] = output || Module["stdout"];
      Module["stderr"] = error || Module["stderr"];
      FS.createStandardStreams();
    },
    quit: function() {
      FS.init.initialized = false;
      var fflush = Module["_fflush"];
      if (fflush) fflush(0);
      for (var i = 0; i < FS.streams.length; i++) {
        var stream = FS.streams[i];
        if (!stream) {
          continue;
        }
        FS.close(stream);
      }
    },
    getMode: function(canRead, canWrite) {
      var mode = 0;
      if (canRead) mode |= 292 | 73;
      if (canWrite) mode |= 146;
      return mode;
    },
    joinPath: function(parts, forceRelative) {
      var path = PATH.join.apply(null, parts);
      if (forceRelative && path[0] == "/") path = path.substr(1);
      return path;
    },
    absolutePath: function(relative, base) {
      return PATH_FS.resolve(base, relative);
    },
    standardizePath: function(path) {
      return PATH.normalize(path);
    },
    findObject: function(path, dontResolveLastLink) {
      var ret = FS.analyzePath(path, dontResolveLastLink);
      if (ret.exists) {
        return ret.object;
      } else {
        ___setErrNo(ret.error);
        return null;
      }
    },
    analyzePath: function(path, dontResolveLastLink) {
      try {
        var lookup = FS.lookupPath(path, { follow: !dontResolveLastLink });
        path = lookup.path;
      } catch (e) {}
      var ret = {
        isRoot: false,
        exists: false,
        error: 0,
        name: null,
        path: null,
        object: null,
        parentExists: false,
        parentPath: null,
        parentObject: null
      };
      try {
        var lookup = FS.lookupPath(path, { parent: true });
        ret.parentExists = true;
        ret.parentPath = lookup.path;
        ret.parentObject = lookup.node;
        ret.name = PATH.basename(path);
        lookup = FS.lookupPath(path, { follow: !dontResolveLastLink });
        ret.exists = true;
        ret.path = lookup.path;
        ret.object = lookup.node;
        ret.name = lookup.node.name;
        ret.isRoot = lookup.path === "/";
      } catch (e) {
        ret.error = e.errno;
      }
      return ret;
    },
    createFolder: function(parent, name, canRead, canWrite) {
      var path = PATH.join2(
        typeof parent === "string" ? parent : FS.getPath(parent),
        name
      );
      var mode = FS.getMode(canRead, canWrite);
      return FS.mkdir(path, mode);
    },
    createPath: function(parent, path, canRead, canWrite) {
      parent = typeof parent === "string" ? parent : FS.getPath(parent);
      var parts = path.split("/").reverse();
      while (parts.length) {
        var part = parts.pop();
        if (!part) continue;
        var current = PATH.join2(parent, part);
        try {
          FS.mkdir(current);
        } catch (e) {}
        parent = current;
      }
      return current;
    },
    createFile: function(parent, name, properties, canRead, canWrite) {
      var path = PATH.join2(
        typeof parent === "string" ? parent : FS.getPath(parent),
        name
      );
      var mode = FS.getMode(canRead, canWrite);
      return FS.create(path, mode);
    },
    createDataFile: function(parent, name, data, canRead, canWrite, canOwn) {
      var path = name
        ? PATH.join2(
            typeof parent === "string" ? parent : FS.getPath(parent),
            name
          )
        : parent;
      var mode = FS.getMode(canRead, canWrite);
      var node = FS.create(path, mode);
      if (data) {
        if (typeof data === "string") {
          var arr = new Array(data.length);
          for (var i = 0, len = data.length; i < len; ++i)
            arr[i] = data.charCodeAt(i);
          data = arr;
        }
        FS.chmod(node, mode | 146);
        var stream = FS.open(node, "w");
        FS.write(stream, data, 0, data.length, 0, canOwn);
        FS.close(stream);
        FS.chmod(node, mode);
      }
      return node;
    },
    createDevice: function(parent, name, input, output) {
      var path = PATH.join2(
        typeof parent === "string" ? parent : FS.getPath(parent),
        name
      );
      var mode = FS.getMode(!!input, !!output);
      if (!FS.createDevice.major) FS.createDevice.major = 64;
      var dev = FS.makedev(FS.createDevice.major++, 0);
      FS.registerDevice(dev, {
        open: function(stream) {
          stream.seekable = false;
        },
        close: function(stream) {
          if (output && output.buffer && output.buffer.length) {
            output(10);
          }
        },
        read: function(stream, buffer, offset, length, pos) {
          var bytesRead = 0;
          for (var i = 0; i < length; i++) {
            var result;
            try {
              result = input();
            } catch (e) {
              throw new FS.ErrnoError(29);
            }
            if (result === undefined && bytesRead === 0) {
              throw new FS.ErrnoError(6);
            }
            if (result === null || result === undefined) break;
            bytesRead++;
            buffer[offset + i] = result;
          }
          if (bytesRead) {
            stream.node.timestamp = Date.now();
          }
          return bytesRead;
        },
        write: function(stream, buffer, offset, length, pos) {
          for (var i = 0; i < length; i++) {
            try {
              output(buffer[offset + i]);
            } catch (e) {
              throw new FS.ErrnoError(29);
            }
          }
          if (length) {
            stream.node.timestamp = Date.now();
          }
          return i;
        }
      });
      return FS.mkdev(path, mode, dev);
    },
    createLink: function(parent, name, target, canRead, canWrite) {
      var path = PATH.join2(
        typeof parent === "string" ? parent : FS.getPath(parent),
        name
      );
      return FS.symlink(target, path);
    },
    forceLoadFile: function(obj) {
      if (obj.isDevice || obj.isFolder || obj.link || obj.contents) return true;
      var success = true;
      if (typeof XMLHttpRequest !== "undefined") {
        throw new Error(
          "Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread."
        );
      } else if (read_) {
        try {
          obj.contents = intArrayFromString(read_(obj.url), true);
          obj.usedBytes = obj.contents.length;
        } catch (e) {
          success = false;
        }
      } else {
        throw new Error("Cannot load without read() or XMLHttpRequest.");
      }
      if (!success) ___setErrNo(29);
      return success;
    },
    createLazyFile: function(parent, name, url, canRead, canWrite) {
      function LazyUint8Array() {
        this.lengthKnown = false;
        this.chunks = [];
      }
      LazyUint8Array.prototype.get = function LazyUint8Array_get(idx) {
        if (idx > this.length - 1 || idx < 0) {
          return undefined;
        }
        var chunkOffset = idx % this.chunkSize;
        var chunkNum = (idx / this.chunkSize) | 0;
        return this.getter(chunkNum)[chunkOffset];
      };
      LazyUint8Array.prototype.setDataGetter = function LazyUint8Array_setDataGetter(
        getter
      ) {
        this.getter = getter;
      };
      LazyUint8Array.prototype.cacheLength = function LazyUint8Array_cacheLength() {
        var xhr = new XMLHttpRequest();
        xhr.open("HEAD", url, false);
        xhr.send(null);
        if (!((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304))
          throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
        var datalength = Number(xhr.getResponseHeader("Content-length"));
        var header;
        var hasByteServing =
          (header = xhr.getResponseHeader("Accept-Ranges")) && header === "bytes";
        var usesGzip =
          (header = xhr.getResponseHeader("Content-Encoding")) &&
          header === "gzip";
        var chunkSize = 1024 * 1024;
        if (!hasByteServing) chunkSize = datalength;
        var doXHR = function(from, to) {
          if (from > to)
            throw new Error(
              "invalid range (" + from + ", " + to + ") or no bytes requested!"
            );
          if (to > datalength - 1)
            throw new Error(
              "only " + datalength + " bytes available! programmer error!"
            );
          var xhr = new XMLHttpRequest();
          xhr.open("GET", url, false);
          if (datalength !== chunkSize)
            xhr.setRequestHeader("Range", "bytes=" + from + "-" + to);
          if (typeof Uint8Array != "undefined") xhr.responseType = "arraybuffer";
          if (xhr.overrideMimeType) {
            xhr.overrideMimeType("text/plain; charset=x-user-defined");
          }
          xhr.send(null);
          if (!((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304))
            throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
          if (xhr.response !== undefined) {
            return new Uint8Array(xhr.response || []);
          } else {
            return intArrayFromString(xhr.responseText || "", true);
          }
        };
        var lazyArray = this;
        lazyArray.setDataGetter(function(chunkNum) {
          var start = chunkNum * chunkSize;
          var end = (chunkNum + 1) * chunkSize - 1;
          end = Math.min(end, datalength - 1);
          if (typeof lazyArray.chunks[chunkNum] === "undefined") {
            lazyArray.chunks[chunkNum] = doXHR(start, end);
          }
          if (typeof lazyArray.chunks[chunkNum] === "undefined")
            throw new Error("doXHR failed!");
          return lazyArray.chunks[chunkNum];
        });
        if (usesGzip || !datalength) {
          chunkSize = datalength = 1;
          datalength = this.getter(0).length;
          chunkSize = datalength;
          console.log(
            "LazyFiles on gzip forces download of the whole file when length is accessed"
          );
        }
        this._length = datalength;
        this._chunkSize = chunkSize;
        this.lengthKnown = true;
      };
      if (typeof XMLHttpRequest !== "undefined") {
        if (!ENVIRONMENT_IS_WORKER)
          throw "Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc";
        var lazyArray = new LazyUint8Array();
        Object.defineProperties(lazyArray, {
          length: {
            get: function() {
              if (!this.lengthKnown) {
                this.cacheLength();
              }
              return this._length;
            }
          },
          chunkSize: {
            get: function() {
              if (!this.lengthKnown) {
                this.cacheLength();
              }
              return this._chunkSize;
            }
          }
        });
        var properties = { isDevice: false, contents: lazyArray };
      } else {
        var properties = { isDevice: false, url: url };
      }
      var node = FS.createFile(parent, name, properties, canRead, canWrite);
      if (properties.contents) {
        node.contents = properties.contents;
      } else if (properties.url) {
        node.contents = null;
        node.url = properties.url;
      }
      Object.defineProperties(node, {
        usedBytes: {
          get: function() {
            return this.contents.length;
          }
        }
      });
      var stream_ops = {};
      var keys = Object.keys(node.stream_ops);
      keys.forEach(function(key) {
        var fn = node.stream_ops[key];
        stream_ops[key] = function forceLoadLazyFile() {
          if (!FS.forceLoadFile(node)) {
            throw new FS.ErrnoError(29);
          }
          return fn.apply(null, arguments);
        };
      });
      stream_ops.read = function stream_ops_read(
        stream,
        buffer,
        offset,
        length,
        position
      ) {
        if (!FS.forceLoadFile(node)) {
          throw new FS.ErrnoError(29);
        }
        var contents = stream.node.contents;
        if (position >= contents.length) return 0;
        var size = Math.min(contents.length - position, length);
        if (contents.slice) {
          for (var i = 0; i < size; i++) {
            buffer[offset + i] = contents[position + i];
          }
        } else {
          for (var i = 0; i < size; i++) {
            buffer[offset + i] = contents.get(position + i);
          }
        }
        return size;
      };
      node.stream_ops = stream_ops;
      return node;
    },
    createPreloadedFile: function(
      parent,
      name,
      url,
      canRead,
      canWrite,
      onload,
      onerror,
      dontCreateFile,
      canOwn,
      preFinish
    ) {
      Browser.init();
      var fullname = name ? PATH_FS.resolve(PATH.join2(parent, name)) : parent;
      var dep = getUniqueRunDependency("cp " + fullname);
      function processData(byteArray) {
        function finish(byteArray) {
          if (preFinish) preFinish();
          if (!dontCreateFile) {
            FS.createDataFile(parent, name, byteArray, canRead, canWrite, canOwn);
          }
          if (onload) onload();
          removeRunDependency(dep);
        }
        var handled = false;
        Module["preloadPlugins"].forEach(function(plugin) {
          if (handled) return;
          if (plugin["canHandle"](fullname)) {
            plugin["handle"](byteArray, fullname, finish, function() {
              if (onerror) onerror();
              removeRunDependency(dep);
            });
            handled = true;
          }
        });
        if (!handled) finish(byteArray);
      }
      addRunDependency(dep);
      if (typeof url == "string") {
        Browser.asyncLoad(
          url,
          function(byteArray) {
            processData(byteArray);
          },
          onerror
        );
      } else {
        processData(url);
      }
    },
    indexedDB: function() {
      return (
        window.indexedDB ||
        window.mozIndexedDB ||
        window.webkitIndexedDB ||
        window.msIndexedDB
      );
    },
    DB_NAME: function() {
      return "EM_FS_" + window.location.pathname;
    },
    DB_VERSION: 20,
    DB_STORE_NAME: "FILE_DATA",
    saveFilesToDB: function(paths, onload, onerror) {
      onload = onload || function() {};
      onerror = onerror || function() {};
      var indexedDB = FS.indexedDB();
      try {
        var openRequest = indexedDB.open(FS.DB_NAME(), FS.DB_VERSION);
      } catch (e) {
        return onerror(e);
      }
      openRequest.onupgradeneeded = function openRequest_onupgradeneeded() {
        console.log("creating db");
        var db = openRequest.result;
        db.createObjectStore(FS.DB_STORE_NAME);
      };
      openRequest.onsuccess = function openRequest_onsuccess() {
        var db = openRequest.result;
        var transaction = db.transaction([FS.DB_STORE_NAME], "readwrite");
        var files = transaction.objectStore(FS.DB_STORE_NAME);
        var ok = 0,
          fail = 0,
          total = paths.length;
        function finish() {
          if (fail == 0) onload();
          else onerror();
        }
        paths.forEach(function(path) {
          var putRequest = files.put(FS.analyzePath(path).object.contents, path);
          putRequest.onsuccess = function putRequest_onsuccess() {
            ok++;
            if (ok + fail == total) finish();
          };
          putRequest.onerror = function putRequest_onerror() {
            fail++;
            if (ok + fail == total) finish();
          };
        });
        transaction.onerror = onerror;
      };
      openRequest.onerror = onerror;
    },
    loadFilesFromDB: function(paths, onload, onerror) {
      onload = onload || function() {};
      onerror = onerror || function() {};
      var indexedDB = FS.indexedDB();
      try {
        var openRequest = indexedDB.open(FS.DB_NAME(), FS.DB_VERSION);
      } catch (e) {
        return onerror(e);
      }
      openRequest.onupgradeneeded = onerror;
      openRequest.onsuccess = function openRequest_onsuccess() {
        var db = openRequest.result;
        try {
          var transaction = db.transaction([FS.DB_STORE_NAME], "readonly");
        } catch (e) {
          onerror(e);
          return;
        }
        var files = transaction.objectStore(FS.DB_STORE_NAME);
        var ok = 0,
          fail = 0,
          total = paths.length;
        function finish() {
          if (fail == 0) onload();
          else onerror();
        }
        paths.forEach(function(path) {
          var getRequest = files.get(path);
          getRequest.onsuccess = function getRequest_onsuccess() {
            if (FS.analyzePath(path).exists) {
              FS.unlink(path);
            }
            FS.createDataFile(
              PATH.dirname(path),
              PATH.basename(path),
              getRequest.result,
              true,
              true,
              true
            );
            ok++;
            if (ok + fail == total) finish();
          };
          getRequest.onerror = function getRequest_onerror() {
            fail++;
            if (ok + fail == total) finish();
          };
        });
        transaction.onerror = onerror;
      };
      openRequest.onerror = onerror;
    }
  };
  var SYSCALLS = {
    DEFAULT_POLLMASK: 5,
    mappings: {},
    umask: 511,
    calculateAt: function(dirfd, path) {
      if (path[0] !== "/") {
        var dir;
        if (dirfd === -100) {
          dir = FS.cwd();
        } else {
          var dirstream = FS.getStream(dirfd);
          if (!dirstream) throw new FS.ErrnoError(8);
          dir = dirstream.path;
        }
        path = PATH.join2(dir, path);
      }
      return path;
    },
    doStat: function(func, path, buf) {
      try {
        var stat = func(path);
      } catch (e) {
        if (
          e &&
          e.node &&
          PATH.normalize(path) !== PATH.normalize(FS.getPath(e.node))
        ) {
          return -54;
        }
        throw e;
      }
      HEAP32[buf >> 2] = stat.dev;
      HEAP32[(buf + 4) >> 2] = 0;
      HEAP32[(buf + 8) >> 2] = stat.ino;
      HEAP32[(buf + 12) >> 2] = stat.mode;
      HEAP32[(buf + 16) >> 2] = stat.nlink;
      HEAP32[(buf + 20) >> 2] = stat.uid;
      HEAP32[(buf + 24) >> 2] = stat.gid;
      HEAP32[(buf + 28) >> 2] = stat.rdev;
      HEAP32[(buf + 32) >> 2] = 0;
      (tempI64 = [
        stat.size >>> 0,
        ((tempDouble = stat.size),
        +Math_abs(tempDouble) >= 1
          ? tempDouble > 0
            ? (Math_min(+Math_floor(tempDouble / 4294967296), 4294967295) | 0) >>>
              0
            : ~~+Math_ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>>
              0
          : 0)
      ]),
        (HEAP32[(buf + 40) >> 2] = tempI64[0]),
        (HEAP32[(buf + 44) >> 2] = tempI64[1]);
      HEAP32[(buf + 48) >> 2] = 4096;
      HEAP32[(buf + 52) >> 2] = stat.blocks;
      HEAP32[(buf + 56) >> 2] = (stat.atime.getTime() / 1e3) | 0;
      HEAP32[(buf + 60) >> 2] = 0;
      HEAP32[(buf + 64) >> 2] = (stat.mtime.getTime() / 1e3) | 0;
      HEAP32[(buf + 68) >> 2] = 0;
      HEAP32[(buf + 72) >> 2] = (stat.ctime.getTime() / 1e3) | 0;
      HEAP32[(buf + 76) >> 2] = 0;
      (tempI64 = [
        stat.ino >>> 0,
        ((tempDouble = stat.ino),
        +Math_abs(tempDouble) >= 1
          ? tempDouble > 0
            ? (Math_min(+Math_floor(tempDouble / 4294967296), 4294967295) | 0) >>>
              0
            : ~~+Math_ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>>
              0
          : 0)
      ]),
        (HEAP32[(buf + 80) >> 2] = tempI64[0]),
        (HEAP32[(buf + 84) >> 2] = tempI64[1]);
      return 0;
    },
    doMsync: function(addr, stream, len, flags) {
      var buffer = new Uint8Array(HEAPU8.subarray(addr, addr + len));
      FS.msync(stream, buffer, 0, len, flags);
    },
    doMkdir: function(path, mode) {
      path = PATH.normalize(path);
      if (path[path.length - 1] === "/") path = path.substr(0, path.length - 1);
      FS.mkdir(path, mode, 0);
      return 0;
    },
    doMknod: function(path, mode, dev) {
      switch (mode & 61440) {
        case 32768:
        case 8192:
        case 24576:
        case 4096:
        case 49152:
          break;
        default:
          return -28;
      }
      FS.mknod(path, mode, dev);
      return 0;
    },
    doReadlink: function(path, buf, bufsize) {
      if (bufsize <= 0) return -28;
      var ret = FS.readlink(path);
      var len = Math.min(bufsize, lengthBytesUTF8(ret));
      var endChar = HEAP8[buf + len];
      stringToUTF8(ret, buf, bufsize + 1);
      HEAP8[buf + len] = endChar;
      return len;
    },
    doAccess: function(path, amode) {
      if (amode & ~7) {
        return -28;
      }
      var node;
      var lookup = FS.lookupPath(path, { follow: true });
      node = lookup.node;
      if (!node) {
        return -44;
      }
      var perms = "";
      if (amode & 4) perms += "r";
      if (amode & 2) perms += "w";
      if (amode & 1) perms += "x";
      if (perms && FS.nodePermissions(node, perms)) {
        return -2;
      }
      return 0;
    },
    doDup: function(path, flags, suggestFD) {
      var suggest = FS.getStream(suggestFD);
      if (suggest) FS.close(suggest);
      return FS.open(path, flags, 0, suggestFD, suggestFD).fd;
    },
    doReadv: function(stream, iov, iovcnt, offset) {
      var ret = 0;
      for (var i = 0; i < iovcnt; i++) {
        var ptr = HEAP32[(iov + i * 8) >> 2];
        var len = HEAP32[(iov + (i * 8 + 4)) >> 2];
        var curr = FS.read(stream, HEAP8, ptr, len, offset);
        if (curr < 0) return -1;
        ret += curr;
        if (curr < len) break;
      }
      return ret;
    },
    doWritev: function(stream, iov, iovcnt, offset) {
      var ret = 0;
      for (var i = 0; i < iovcnt; i++) {
        var ptr = HEAP32[(iov + i * 8) >> 2];
        var len = HEAP32[(iov + (i * 8 + 4)) >> 2];
        var curr = FS.write(stream, HEAP8, ptr, len, offset);
        if (curr < 0) return -1;
        ret += curr;
      }
      return ret;
    },
    varargs: 0,
    get: function(varargs) {
      SYSCALLS.varargs += 4;
      var ret = HEAP32[(SYSCALLS.varargs - 4) >> 2];
      return ret;
    },
    getStr: function() {
      var ret = UTF8ToString(SYSCALLS.get());
      return ret;
    },
    getStreamFromFD: function(fd) {
      if (fd === undefined) fd = SYSCALLS.get();
      var stream = FS.getStream(fd);
      if (!stream) throw new FS.ErrnoError(8);
      return stream;
    },
    get64: function() {
      var low = SYSCALLS.get(),
        high = SYSCALLS.get();
      return low;
    },
    getZero: function() {
      SYSCALLS.get();
    }
  };
  function ___syscall10(which, varargs) {
    SYSCALLS.varargs = varargs;
    try {
      var path = SYSCALLS.getStr();
      FS.unlink(path);
      return 0;
    } catch (e) {
      if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
      return -e.errno;
    }
  }
  function ___syscall15(which, varargs) {
    SYSCALLS.varargs = varargs;
    try {
      var path = SYSCALLS.getStr(),
        mode = SYSCALLS.get();
      FS.chmod(path, mode);
      return 0;
    } catch (e) {
      if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
      return -e.errno;
    }
  }
  function ___syscall195(which, varargs) {
    SYSCALLS.varargs = varargs;
    try {
      var path = SYSCALLS.getStr(),
        buf = SYSCALLS.get();
      return SYSCALLS.doStat(FS.stat, path, buf);
    } catch (e) {
      if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
      return -e.errno;
    }
  }
  function ___syscall197(which, varargs) {
    SYSCALLS.varargs = varargs;
    try {
      var stream = SYSCALLS.getStreamFromFD(),
        buf = SYSCALLS.get();
      return SYSCALLS.doStat(FS.stat, stream.path, buf);
    } catch (e) {
      if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
      return -e.errno;
    }
  }
  function ___syscall221(which, varargs) {
    SYSCALLS.varargs = varargs;
    try {
      var stream = SYSCALLS.getStreamFromFD(),
        cmd = SYSCALLS.get();
      switch (cmd) {
        case 0: {
          var arg = SYSCALLS.get();
          if (arg < 0) {
            return -28;
          }
          var newStream;
          newStream = FS.open(stream.path, stream.flags, 0, arg);
          return newStream.fd;
        }
        case 1:
        case 2:
          return 0;
        case 3:
          return stream.flags;
        case 4: {
          var arg = SYSCALLS.get();
          stream.flags |= arg;
          return 0;
        }
        case 12: {
          var arg = SYSCALLS.get();
          var offset = 0;
          HEAP16[(arg + offset) >> 1] = 2;
          return 0;
        }
        case 13:
        case 14:
          return 0;
        case 16:
        case 8:
          return -28;
        case 9:
          ___setErrNo(28);
          return -1;
        default: {
          return -28;
        }
      }
    } catch (e) {
      if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
      return -e.errno;
    }
  }
  function ___syscall3(which, varargs) {
    SYSCALLS.varargs = varargs;
    try {
      var stream = SYSCALLS.getStreamFromFD(),
        buf = SYSCALLS.get(),
        count = SYSCALLS.get();
      return FS.read(stream, HEAP8, buf, count);
    } catch (e) {
      if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
      return -e.errno;
    }
  }
  function ___syscall38(which, varargs) {
    SYSCALLS.varargs = varargs;
    try {
      var old_path = SYSCALLS.getStr(),
        new_path = SYSCALLS.getStr();
      FS.rename(old_path, new_path);
      return 0;
    } catch (e) {
      if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
      return -e.errno;
    }
  }
  function ___syscall40(which, varargs) {
    SYSCALLS.varargs = varargs;
    try {
      var path = SYSCALLS.getStr();
      FS.rmdir(path);
      return 0;
    } catch (e) {
      if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
      return -e.errno;
    }
  }
  function ___syscall5(which, varargs) {
    SYSCALLS.varargs = varargs;
    try {
      var pathname = SYSCALLS.getStr(),
        flags = SYSCALLS.get(),
        mode = SYSCALLS.get();
      var stream = FS.open(pathname, flags, mode);
      return stream.fd;
    } catch (e) {
      if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
      return -e.errno;
    }
  }
  function ___syscall54(which, varargs) {
    SYSCALLS.varargs = varargs;
    try {
      var stream = SYSCALLS.getStreamFromFD(),
        op = SYSCALLS.get();
      switch (op) {
        case 21509:
        case 21505: {
          if (!stream.tty) return -59;
          return 0;
        }
        case 21510:
        case 21511:
        case 21512:
        case 21506:
        case 21507:
        case 21508: {
          if (!stream.tty) return -59;
          return 0;
        }
        case 21519: {
          if (!stream.tty) return -59;
          var argp = SYSCALLS.get();
          HEAP32[argp >> 2] = 0;
          return 0;
        }
        case 21520: {
          if (!stream.tty) return -59;
          return -28;
        }
        case 21531: {
          var argp = SYSCALLS.get();
          return FS.ioctl(stream, op, argp);
        }
        case 21523: {
          if (!stream.tty) return -59;
          return 0;
        }
        case 21524: {
          if (!stream.tty) return -59;
          return 0;
        }
        default:
          abort("bad ioctl syscall " + op);
      }
    } catch (e) {
      if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
      return -e.errno;
    }
  }
  function ___unlock() {}
  function _emscripten_get_heap_size() {
    return HEAP8.length;
  }
  function _emscripten_memcpy_big(dest, src, num) {
    HEAPU8.set(HEAPU8.subarray(src, src + num), dest);
  }
  function emscripten_realloc_buffer(size) {
    try {
      wasmMemory.grow((size - buffer.byteLength + 65535) >> 16);
      updateGlobalBufferAndViews(wasmMemory.buffer);
      return 1;
    } catch (e) {}
  }
  function _emscripten_resize_heap(requestedSize) {
    var oldSize = _emscripten_get_heap_size();
    var PAGE_MULTIPLE = 65536;
    var LIMIT = 2147483648 - PAGE_MULTIPLE;
    if (requestedSize > LIMIT) {
      return false;
    }
    var MIN_TOTAL_MEMORY = 16777216;
    var newSize = Math.max(oldSize, MIN_TOTAL_MEMORY);
    while (newSize < requestedSize) {
      if (newSize <= 536870912) {
        newSize = alignUp(2 * newSize, PAGE_MULTIPLE);
      } else {
        newSize = Math.min(
          alignUp((3 * newSize + 2147483648) / 4, PAGE_MULTIPLE),
          LIMIT
        );
      }
    }
    var replacement = emscripten_realloc_buffer(newSize);
    if (!replacement) {
      return false;
    }
    return true;
  }
  function _fd_close(fd) {
    try {
      var stream = SYSCALLS.getStreamFromFD(fd);
      FS.close(stream);
      return 0;
    } catch (e) {
      if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
      return e.errno;
    }
  }
  function _fd_fdstat_get(fd, pbuf) {
    try {
      var stream = SYSCALLS.getStreamFromFD(fd);
      var type = stream.tty
        ? 2
        : FS.isDir(stream.mode)
        ? 3
        : FS.isLink(stream.mode)
        ? 7
        : 4;
      HEAP8[pbuf >> 0] = type;
      return 0;
    } catch (e) {
      if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
      return e.errno;
    }
  }
  function _fd_read(fd, iov, iovcnt, pnum) {
    try {
      var stream = SYSCALLS.getStreamFromFD(fd);
      var num = SYSCALLS.doReadv(stream, iov, iovcnt);
      HEAP32[pnum >> 2] = num;
      return 0;
    } catch (e) {
      if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
      return e.errno;
    }
  }
  function _fd_seek(fd, offset_low, offset_high, whence, newOffset) {
    try {
      var stream = SYSCALLS.getStreamFromFD(fd);
      var HIGH_OFFSET = 4294967296;
      var offset = offset_high * HIGH_OFFSET + (offset_low >>> 0);
      var DOUBLE_LIMIT = 9007199254740992;
      if (offset <= -DOUBLE_LIMIT || offset >= DOUBLE_LIMIT) {
        return -61;
      }
      FS.llseek(stream, offset, whence);
      (tempI64 = [
        stream.position >>> 0,
        ((tempDouble = stream.position),
        +Math_abs(tempDouble) >= 1
          ? tempDouble > 0
            ? (Math_min(+Math_floor(tempDouble / 4294967296), 4294967295) | 0) >>>
              0
            : ~~+Math_ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>>
              0
          : 0)
      ]),
        (HEAP32[newOffset >> 2] = tempI64[0]),
        (HEAP32[(newOffset + 4) >> 2] = tempI64[1]);
      if (stream.getdents && offset === 0 && whence === 0) stream.getdents = null;
      return 0;
    } catch (e) {
      if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
      return e.errno;
    }
  }
  function _fd_write(fd, iov, iovcnt, pnum) {
    try {
      var stream = SYSCALLS.getStreamFromFD(fd);
      var num = SYSCALLS.doWritev(stream, iov, iovcnt);
      HEAP32[pnum >> 2] = num;
      return 0;
    } catch (e) {
      if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
      return e.errno;
    }
  }
  var ___tm_current = 20656;
  var ___tm_timezone = (stringToUTF8("GMT", 20704, 4), 20704);
  function _gmtime_r(time, tmPtr) {
    var date = new Date(HEAP32[time >> 2] * 1e3);
    HEAP32[tmPtr >> 2] = date.getUTCSeconds();
    HEAP32[(tmPtr + 4) >> 2] = date.getUTCMinutes();
    HEAP32[(tmPtr + 8) >> 2] = date.getUTCHours();
    HEAP32[(tmPtr + 12) >> 2] = date.getUTCDate();
    HEAP32[(tmPtr + 16) >> 2] = date.getUTCMonth();
    HEAP32[(tmPtr + 20) >> 2] = date.getUTCFullYear() - 1900;
    HEAP32[(tmPtr + 24) >> 2] = date.getUTCDay();
    HEAP32[(tmPtr + 36) >> 2] = 0;
    HEAP32[(tmPtr + 32) >> 2] = 0;
    var start = Date.UTC(date.getUTCFullYear(), 0, 1, 0, 0, 0, 0);
    var yday = ((date.getTime() - start) / (1e3 * 60 * 60 * 24)) | 0;
    HEAP32[(tmPtr + 28) >> 2] = yday;
    HEAP32[(tmPtr + 40) >> 2] = ___tm_timezone;
    return tmPtr;
  }
  function _gmtime(time) {
    return _gmtime_r(time, ___tm_current);
  }
  function _tzset() {
    if (_tzset.called) return;
    _tzset.called = true;
    HEAP32[__get_timezone() >> 2] = new Date().getTimezoneOffset() * 60;
    var currentYear = new Date().getFullYear();
    var winter = new Date(currentYear, 0, 1);
    var summer = new Date(currentYear, 6, 1);
    HEAP32[__get_daylight() >> 2] = Number(
      winter.getTimezoneOffset() != summer.getTimezoneOffset()
    );
    function extractZone(date) {
      var match = date.toTimeString().match(/\(([A-Za-z ]+)\)$/);
      return match ? match[1] : "GMT";
    }
    var winterName = extractZone(winter);
    var summerName = extractZone(summer);
    var winterNamePtr = allocate(
      intArrayFromString(winterName),
      "i8",
      ALLOC_NORMAL
    );
    var summerNamePtr = allocate(
      intArrayFromString(summerName),
      "i8",
      ALLOC_NORMAL
    );
    if (summer.getTimezoneOffset() < winter.getTimezoneOffset()) {
      HEAP32[__get_tzname() >> 2] = winterNamePtr;
      HEAP32[(__get_tzname() + 4) >> 2] = summerNamePtr;
    } else {
      HEAP32[__get_tzname() >> 2] = summerNamePtr;
      HEAP32[(__get_tzname() + 4) >> 2] = winterNamePtr;
    }
  }
  function _mktime(tmPtr) {
    _tzset();
    var date = new Date(
      HEAP32[(tmPtr + 20) >> 2] + 1900,
      HEAP32[(tmPtr + 16) >> 2],
      HEAP32[(tmPtr + 12) >> 2],
      HEAP32[(tmPtr + 8) >> 2],
      HEAP32[(tmPtr + 4) >> 2],
      HEAP32[tmPtr >> 2],
      0
    );
    var dst = HEAP32[(tmPtr + 32) >> 2];
    var guessedOffset = date.getTimezoneOffset();
    var start = new Date(date.getFullYear(), 0, 1);
    var summerOffset = new Date(date.getFullYear(), 6, 1).getTimezoneOffset();
    var winterOffset = start.getTimezoneOffset();
    var dstOffset = Math.min(winterOffset, summerOffset);
    if (dst < 0) {
      HEAP32[(tmPtr + 32) >> 2] = Number(
        summerOffset != winterOffset && dstOffset == guessedOffset
      );
    } else if (dst > 0 != (dstOffset == guessedOffset)) {
      var nonDstOffset = Math.max(winterOffset, summerOffset);
      var trueOffset = dst > 0 ? dstOffset : nonDstOffset;
      date.setTime(date.getTime() + (trueOffset - guessedOffset) * 6e4);
    }
    HEAP32[(tmPtr + 24) >> 2] = date.getDay();
    var yday = ((date.getTime() - start.getTime()) / (1e3 * 60 * 60 * 24)) | 0;
    HEAP32[(tmPtr + 28) >> 2] = yday;
    return (date.getTime() / 1e3) | 0;
  }
  function _setTempRet0($i) {
    setTempRet0($i | 0);
  }
  function _time(ptr) {
    var ret = (Date.now() / 1e3) | 0;
    if (ptr) {
      HEAP32[ptr >> 2] = ret;
    }
    return ret;
  }
  FS.staticInit();
  if (ENVIRONMENT_HAS_NODE) {
    var fs = frozenFs;
    var NODEJS_PATH = __webpack_require__(9);
    NODEFS.staticInit();
  }
  if (ENVIRONMENT_IS_NODE) {
    var _wrapNodeError = function(func) {
      return function() {
        try {
          return func.apply(this, arguments);
        } catch (e) {
          if (!e.code) throw e;
          throw new FS.ErrnoError(ERRNO_CODES[e.code]);
        }
      };
    };
    var VFS = Object.assign({}, FS);
    for (var _key in NODERAWFS) FS[_key] = _wrapNodeError(NODERAWFS[_key]);
  } else {
    throw new Error(
      "NODERAWFS is currently only supported on Node.js environment."
    );
  }
  function intArrayFromString(stringy, dontAddNull, length) {
    var len = length > 0 ? length : lengthBytesUTF8(stringy) + 1;
    var u8array = new Array(len);
    var numBytesWritten = stringToUTF8Array(stringy, u8array, 0, u8array.length);
    if (dontAddNull) u8array.length = numBytesWritten;
    return u8array;
  }
  var decodeBase64 =
    typeof atob === "function"
      ? atob
      : function(input) {
          var keyStr =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
          var output = "";
          var chr1, chr2, chr3;
          var enc1, enc2, enc3, enc4;
          var i = 0;
          input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
          do {
            enc1 = keyStr.indexOf(input.charAt(i++));
            enc2 = keyStr.indexOf(input.charAt(i++));
            enc3 = keyStr.indexOf(input.charAt(i++));
            enc4 = keyStr.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 !== 64) {
              output = output + String.fromCharCode(chr2);
            }
            if (enc4 !== 64) {
              output = output + String.fromCharCode(chr3);
            }
          } while (i < input.length);
          return output;
        };
  function intArrayFromBase64(s) {
    if (typeof ENVIRONMENT_IS_NODE === "boolean" && ENVIRONMENT_IS_NODE) {
      var buf;
      try {
        buf = Buffer.from(s, "base64");
      } catch (_) {
        buf = new Buffer(s, "base64");
      }
      return new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength);
    }
    try {
      var decoded = decodeBase64(s);
      var bytes = new Uint8Array(decoded.length);
      for (var i = 0; i < decoded.length; ++i) {
        bytes[i] = decoded.charCodeAt(i);
      }
      return bytes;
    } catch (_) {
      throw new Error("Converting base64 string to bytes failed.");
    }
  }
  function tryParseAsDataURI(filename) {
    if (!isDataURI(filename)) {
      return;
    }
    return intArrayFromBase64(filename.slice(dataURIPrefix.length));
  }
  var asmLibraryArg = {
    d: ___lock,
    t: ___syscall10,
    p: ___syscall15,
    f: ___syscall195,
    v: ___syscall197,
    e: ___syscall221,
    q: ___syscall3,
    u: ___syscall38,
    s: ___syscall40,
    r: ___syscall5,
    o: ___syscall54,
    a: ___unlock,
    j: _emscripten_memcpy_big,
    k: _emscripten_resize_heap,
    g: _fd_close,
    n: _fd_fdstat_get,
    m: _fd_read,
    l: _fd_seek,
    w: _fd_write,
    h: _gmtime,
    memory: wasmMemory,
    i: _mktime,
    b: _setTempRet0,
    table: wasmTable,
    c: _time
  };
  var asm = createWasm();
  var ___wasm_call_ctors = (Module["___wasm_call_ctors"] = asm["x"]);
  var _zipstruct_stat = (Module["_zipstruct_stat"] = asm["y"]);
  var _zipstruct_statS = (Module["_zipstruct_statS"] = asm["z"]);
  var _zipstruct_stat_name = (Module["_zipstruct_stat_name"] = asm["A"]);
  var _zipstruct_stat_index = (Module["_zipstruct_stat_index"] = asm["B"]);
  var _zipstruct_stat_size = (Module["_zipstruct_stat_size"] = asm["C"]);
  var _zipstruct_stat_mtime = (Module["_zipstruct_stat_mtime"] = asm["D"]);
  var _zipstruct_error = (Module["_zipstruct_error"] = asm["E"]);
  var _zipstruct_errorS = (Module["_zipstruct_errorS"] = asm["F"]);
  var _zip_close = (Module["_zip_close"] = asm["G"]);
  var _zip_dir_add = (Module["_zip_dir_add"] = asm["H"]);
  var _zip_discard = (Module["_zip_discard"] = asm["I"]);
  var _zip_error_init_with_code = (Module["_zip_error_init_with_code"] =
    asm["J"]);
  var _zip_get_error = (Module["_zip_get_error"] = asm["K"]);
  var _zip_file_get_error = (Module["_zip_file_get_error"] = asm["L"]);
  var _zip_error_strerror = (Module["_zip_error_strerror"] = asm["M"]);
  var _zip_fclose = (Module["_zip_fclose"] = asm["N"]);
  var _zip_file_add = (Module["_zip_file_add"] = asm["O"]);
  var _zip_file_get_external_attributes = (Module[
    "_zip_file_get_external_attributes"
  ] = asm["P"]);
  var _zip_file_set_external_attributes = (Module[
    "_zip_file_set_external_attributes"
  ] = asm["Q"]);
  var _zip_file_set_mtime = (Module["_zip_file_set_mtime"] = asm["R"]);
  var _zip_fopen = (Module["_zip_fopen"] = asm["S"]);
  var _zip_fopen_index = (Module["_zip_fopen_index"] = asm["T"]);
  var _zip_fread = (Module["_zip_fread"] = asm["U"]);
  var _zip_get_name = (Module["_zip_get_name"] = asm["V"]);
  var _zip_get_num_entries = (Module["_zip_get_num_entries"] = asm["W"]);
  var _zip_name_locate = (Module["_zip_name_locate"] = asm["X"]);
  var _zip_open = (Module["_zip_open"] = asm["Y"]);
  var _zip_open_from_source = (Module["_zip_open_from_source"] = asm["Z"]);
  var _zip_source_buffer = (Module["_zip_source_buffer"] = asm["_"]);
  var _zip_source_buffer_create = (Module["_zip_source_buffer_create"] =
    asm["$"]);
  var _zip_source_free = (Module["_zip_source_free"] = asm["aa"]);
  var _zip_source_set_mtime = (Module["_zip_source_set_mtime"] = asm["ba"]);
  var _zip_stat = (Module["_zip_stat"] = asm["ca"]);
  var _zip_stat_index = (Module["_zip_stat_index"] = asm["da"]);
  var ___errno_location = (Module["___errno_location"] = asm["ea"]);
  var __get_tzname = (Module["__get_tzname"] = asm["fa"]);
  var __get_daylight = (Module["__get_daylight"] = asm["ga"]);
  var __get_timezone = (Module["__get_timezone"] = asm["ha"]);
  var _malloc = (Module["_malloc"] = asm["ia"]);
  var _free = (Module["_free"] = asm["ja"]);
  var stackSave = (Module["stackSave"] = asm["ka"]);
  var stackAlloc = (Module["stackAlloc"] = asm["la"]);
  var stackRestore = (Module["stackRestore"] = asm["ma"]);
  var dynCall_vi = (Module["dynCall_vi"] = asm["na"]);
  Module["asm"] = asm;
  Module["cwrap"] = cwrap;
  Module["getValue"] = getValue;
  var calledRun;
  function ExitStatus(status) {
    this.name = "ExitStatus";
    this.message = "Program terminated with exit(" + status + ")";
    this.status = status;
  }
  dependenciesFulfilled = function runCaller() {
    if (!calledRun) run();
    if (!calledRun) dependenciesFulfilled = runCaller;
  };
  function run(args) {
    args = args || arguments_;
    if (runDependencies > 0) {
      return;
    }
    preRun();
    if (runDependencies > 0) return;
    function doRun() {
      if (calledRun) return;
      calledRun = true;
      if (ABORT) return;
      initRuntime();
      preMain();
      if (Module["onRuntimeInitialized"]) Module["onRuntimeInitialized"]();
      postRun();
    }
    if (Module["setStatus"]) {
      Module["setStatus"]("Running...");
      setTimeout(function() {
        setTimeout(function() {
          Module["setStatus"]("");
        }, 1);
        doRun();
      }, 1);
    } else {
      doRun();
    }
  }
  Module["run"] = run;
  if (Module["preInit"]) {
    if (typeof Module["preInit"] == "function")
      Module["preInit"] = [Module["preInit"]];
    while (Module["preInit"].length > 0) {
      Module["preInit"].pop()();
    }
  }
  noExitRuntime = true;
  run();


  /***/ }),
  /* 8 */
  /***/ (function(module, exports) {

  module.exports = require("fs");

  /***/ }),
  /* 9 */
  /***/ (function(module, exports) {

  module.exports = require("path");

  /***/ }),
  /* 10 */
  /***/ (function(module, exports) {

  module.exports = require("crypto");

  /***/ }),
  /* 11 */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";


  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  const core_1 = __webpack_require__(1);

  const core_2 = __webpack_require__(1);

  const fslib_1 = __webpack_require__(4);

  const node_abi_1 = __webpack_require__(12);

  const plugin_npm_1 = __webpack_require__(14);

  exports.getElectronVersion = async project => {
    for (const pkg of project.storedPackages.values()) {
      if (pkg.name === 'electron') {
        return pkg.version;
      }
    }

    return null;
  };

  exports.getNativeModule = async (project, packageIdent, ident) => {
    // we need to find the package that matches packageIdent which has a dependency on our ephemeral bindings package
    for (const pkg of project.storedPackages.values()) {
      // see if it matches packageIdent
      if (pkg.name === packageIdent.name && pkg.scope === packageIdent.scope) {
        //for (const [identHash, dependency] of pkg.dependencies) {
        //  if (dependency.name === "bindings") {
        return pkg; //  }
        //}
      }
    }

    return null;
  };

  function parseSpec(spec) {
    const payload = spec.substring(spec.indexOf("builtin<prebuild/") + 17, spec.length - 1);
    const packageIdent = core_1.structUtils.parseIdent(payload);
    return {
      packageIdent
    };
  }

  exports.parseSpec = parseSpec;

  function getPrebuildConfiguration(scope, configuration) {
    const prebuildScopedConfigurations = configuration.get(`prebuildScopes`);
    const exactEntry = prebuildScopedConfigurations.get(scope);
    if (typeof exactEntry !== `undefined`) return exactEntry;
    return null;
  }

  exports.getPrebuildConfiguration = getPrebuildConfiguration;

  function gitRepositoryToGithubLink(repository) {
    var m = /github\.com\/([^\/]+)\/([^\/\.]+)\.git/.exec(repository);

    if (m) {
      return 'https://github.com/' + m[1] + '/' + m[2];
    }

    return null;
  }

  exports.gitRepositoryToGithubLink = gitRepositoryToGithubLink;

  function getConfigEntry(nativeModule, entry, opts) {
    const configuration = opts.project.configuration;
    const scopeWithAt = `@${nativeModule.scope}`;
    const scopedConfiguration = nativeModule.scope ? getPrebuildConfiguration(scopeWithAt, configuration) : null;
    const effectiveConfiguration = scopedConfiguration || configuration;

    if (effectiveConfiguration.get(entry)) {
      return effectiveConfiguration.get(entry);
    }

    return configuration.get(entry);
  }

  function getElectronABI(electronVersion) {
    return node_abi_1.getAbi(electronVersion, 'electron');
  }

  exports.getElectronABI = getElectronABI;

  function runTemplate(template, templateValues) {
    for (const [key, value] of Object.entries(templateValues)) {
      template = template.replace(new RegExp(`{${key}}`, 'g'), value);
    }

    return template;
  }

  async function getGithubLink(nativeModule, opts) {
    var _a;

    const registryData = await plugin_npm_1.npmHttpUtils.get(plugin_npm_1.npmHttpUtils.getIdentUrl(nativeModule), {
      configuration: opts.project.configuration,
      ident: nativeModule,
      json: true
    });

    if (!Object.prototype.hasOwnProperty.call(registryData, `versions`)) {
      throw new core_2.ReportError(core_2.MessageName.REMOTE_INVALID, `Registry returned invalid data for - missing "versions" field`);
    }

    if (!Object.prototype.hasOwnProperty.call(registryData.versions, nativeModule.version)) {
      throw new core_2.ReportError(core_2.MessageName.REMOTE_NOT_FOUND, `Registry failed to return reference "${nativeModule.version}"`);
    }

    const data = registryData.versions[nativeModule.version];
    const repository = (_a = data.repository) === null || _a === void 0 ? void 0 : _a.url;

    if (!repository) {
      throw new core_2.ReportError(core_2.MessageName.UNNAMED, `Unable to find repository information for "${core_1.structUtils.stringifyIdent(nativeModule)}"`);
    }

    const githubUrl = gitRepositoryToGithubLink(repository);

    if (!githubUrl) {
      throw new core_2.ReportError(core_2.MessageName.UNNAMED, `Unable to find GitHub URL for "${core_1.structUtils.stringifyIdent(nativeModule)}"`);
    }

    return githubUrl;
  }

  async function getUrlOfPrebuild(nativeModule, opts, prebuildOpts) {
    const convertedName = core_1.structUtils.stringifyIdent(nativeModule).replace(/^@\w+\//, '');
    const name = convertedName;
    const version = nativeModule.version;
    const abi = prebuildOpts.abi;
    const runtime = prebuildOpts.runtime;
    const platform = process.platform;
    const arch = process.arch;
    const libc = process.env.LIBC || '';
    const tag_prefix = getConfigEntry(nativeModule, `prebuildTagPrefix`, opts);
    const packageName = `${name}-v${version}-${runtime}-v${abi}-${platform}${libc}-${arch}.tar.gz`;
    const mirror_url = getConfigEntry(nativeModule, `prebuildHostMirrorUrl`, opts);

    if (mirror_url) {
      const template = getConfigEntry(nativeModule, `prebuildHostMirrorTemplate`, opts);
      return runTemplate(template, {
        mirror_url,
        name,
        version,
        abi,
        runtime,
        platform,
        arch,
        libc,
        tag_prefix,
        scope: nativeModule.scope || '',
        scopeWithAt: nativeModule.scope ? `@${nativeModule.scope}` : '',
        scopeWithAtAndSlash: nativeModule.scope ? `@${nativeModule.scope}/` : '',
        scopeWithSlash: nativeModule.scope ? `${nativeModule.scope}/` : ''
      });
    }

    const githubLink = await getGithubLink(nativeModule, opts);
    return `${githubLink}/releases/download/${tag_prefix}${version}/${packageName}`;
  }

  exports.getUrlOfPrebuild = getUrlOfPrebuild;

  exports.walk = async (filesystem, currentPath, callback, cancellationSignal) => {
    if (cancellationSignal.cancel) {
      return;
    }

    const files = await filesystem.readdirPromise(currentPath);
    await Promise.all(files.map(async filename => {
      if (cancellationSignal.cancel) {
        return;
      }

      const filepath = fslib_1.ppath.join(currentPath, filename);
      const stat = await filesystem.statPromise(filepath);

      if (stat.isDirectory()) {
        await exports.walk(filesystem, filepath, callback, cancellationSignal);
      } else if (stat.isFile()) {
        await callback(filesystem, filepath);
      }
    }));
  };
  /*
  export function makeDescriptor(ident: Ident, {parentLocator, sourceDescriptor, patchPaths}: ReturnType<typeof parseDescriptor>) {
    return structUtils.makeLocator(ident, makeSpec({parentLocator, sourceItem: sourceDescriptor, patchPaths}, structUtils.stringifyDescriptor));
  }

  https://github.com/serialport/node-serialport/releases/download/@serialport/bindings@8.0.7/bindings-v8.0.7-electron-v75-darwin-x64.tar.gz
  https://github.com/serialport/node-serialport/releases/download/@serialport/bindings@8.0.7/bindings-v8.0.7-electron-v76-darwin-x64.tar.gz


  type VisitPatchPathOptions<T> = {
    onAbsolute: (p: PortablePath) => T,
    onRelative: (p: PortablePath) => T,
    onBuiltin: (name: string) => T,
  };

  function visitPatchPath<T>({onAbsolute, onRelative, onBuiltin}: VisitPatchPathOptions<T>, patchPath: PortablePath) {
    const builtinMatch = patchPath.match(BUILTIN_REGEXP);
    if (builtinMatch !== null)
      return onBuiltin(builtinMatch[1]);

    if (ppath.isAbsolute(patchPath)) {
      return onAbsolute(patchPath);
    } else {
      return onRelative(patchPath);
    }
  }

  export function isParentRequired(patchPath: PortablePath) {
    return visitPatchPath({
      onAbsolute: () => false,
      onRelative: () => true,
      onBuiltin: () => false,
    }, patchPath);
  }

  export async function loadPatchFiles(parentLocator: Locator | null, patchPaths: Array<PortablePath>, opts: FetchOptions) {
    // When the patch files use absolute paths we can directly access them via
    // their location on the disk. Otherwise we must go through the package fs.
    const parentFetch = parentLocator !== null
      ? await opts.fetcher.fetch(parentLocator, opts)
      : null;

    // If the package fs publicized its "original location" (for example like
    // in the case of "file:" packages), we use it to derive the real location.
    const effectiveParentFetch = parentFetch && parentFetch.localPath
      ? {packageFs: new NodeFS(), prefixPath: parentFetch.localPath, releaseFs: undefined}
      : parentFetch;

    // Discard the parent fs unless we really need it to access the files
    if (parentFetch && parentFetch !== effectiveParentFetch && parentFetch.releaseFs)
      parentFetch.releaseFs();

    // First we obtain the specification for all the patches that we'll have to
    // apply to the original package.
    return await miscUtils.releaseAfterUseAsync(async () => {
      return await Promise.all(patchPaths.map(async patchPath => visitPatchPath({
        onAbsolute: async () => {
          return await xfs.readFilePromise(patchPath, `utf8`);
        },

        onRelative: async () => {
          if (parentFetch === null)
            throw new Error(`Assertion failed: The parent locator should have been fetched`);

          return await parentFetch.packageFs.readFilePromise(patchPath, `utf8`);
        },

        onBuiltin: async name => {
          return await opts.project.configuration.firstHook((hooks: PatchHooks) => {
            return hooks.getBuiltinPatch;
          }, opts.project, name);
        },
      }, patchPath)));
    });
  }

  export async function extractPackageToDisk(locator: Locator, {cache, project}: {cache: Cache, project: Project}) {
    const checksums = project.storedChecksums;
    const report = new ThrowReport();

    const fetcher = project.configuration.makeFetcher();
    const fetchResult = await fetcher.fetch(locator, {cache, project, fetcher, checksums, report});

    const temp = await xfs.mktempPromise();
    await xfs.copyPromise(temp, fetchResult.prefixPath, {
      baseFs: fetchResult.packageFs,
    });

    await xfs.writeJsonPromise(ppath.join(temp, `.yarn-patch.json` as Filename), {
      locator: structUtils.stringifyLocator(locator),
    });

    return temp;
  }
  */

  /***/ }),
  /* 12 */
  /***/ (function(module, exports, __webpack_require__) {

  var semver = __webpack_require__(13)

  function getNextTarget (runtime, targets) {
    if (targets == null) targets = allTargets
    var latest = targets.filter(function (t) { return t.runtime === runtime }).slice(-1)[0]
    var increment = runtime === 'electron' ? 'minor' : 'major'
    return semver.inc(latest.target, increment)
  }

  function getAbi (target, runtime) {
    if (target === String(Number(target))) return target
    if (target) target = target.replace(/^v/, '')
    if (!runtime) runtime = 'node'

    if (runtime === 'node') {
      if (!target) return process.versions.modules
      if (target === process.versions.node) return process.versions.modules
    }

    var abi

    for (var i = 0; i < allTargets.length; i++) {
      var t = allTargets[i]
      if (t.runtime !== runtime) continue
      if (semver.lte(t.target, target)) abi = t.abi
      else break
    }

    if (abi && semver.lt(target, getNextTarget(runtime))) return abi
    throw new Error('Could not detect abi for version ' + target + ' and runtime ' + runtime + '.  Updating "node-abi" might help solve this issue if it is a new release of ' + runtime)
  }

  function getTarget (abi, runtime) {
    if (abi && abi !== String(Number(abi))) return abi
    if (!runtime) runtime = 'node'

    if (runtime === 'node' && !abi) return process.versions.node

    var match = allTargets
      .filter(function (t) {
        return t.abi === abi && t.runtime === runtime
      })
      .map(function (t) {
        return t.target
      })
    if (match.length) return match[0]

    throw new Error('Could not detect target for abi ' + abi + ' and runtime ' + runtime)
  }

  var supportedTargets = [
    {runtime: 'node', target: '5.0.0', abi: '47', lts: false},
    {runtime: 'node', target: '6.0.0', abi: '48', lts: false},
    {runtime: 'node', target: '7.0.0', abi: '51', lts: false},
    {runtime: 'node', target: '8.0.0', abi: '57', lts: false},
    {runtime: 'node', target: '9.0.0', abi: '59', lts: false},
    {runtime: 'node', target: '10.0.0', abi: '64', lts: new Date(2018, 10, 1) < new Date() && new Date() < new Date(2020, 4, 31)},
    {runtime: 'node', target: '11.0.0', abi: '67', lts: false},
    {runtime: 'node', target: '12.0.0', abi: '72', lts: new Date(2019, 9, 21) < new Date() && new Date() < new Date(2020, 9, 31)},
    {runtime: 'node', target: '13.0.0', abi: '79', lts: false},
    {runtime: 'electron', target: '0.36.0', abi: '47', lts: false},
    {runtime: 'electron', target: '1.1.0', abi: '48', lts: false},
    {runtime: 'electron', target: '1.3.0', abi: '49', lts: false},
    {runtime: 'electron', target: '1.4.0', abi: '50', lts: false},
    {runtime: 'electron', target: '1.5.0', abi: '51', lts: false},
    {runtime: 'electron', target: '1.6.0', abi: '53', lts: false},
    {runtime: 'electron', target: '1.7.0', abi: '54', lts: false},
    {runtime: 'electron', target: '1.8.0', abi: '57', lts: false},
    {runtime: 'electron', target: '2.0.0', abi: '57', lts: false},
    {runtime: 'electron', target: '3.0.0', abi: '64', lts: false},
    {runtime: 'electron', target: '4.0.0', abi: '64', lts: false},
    {runtime: 'electron', target: '4.0.4', abi: '69', lts: false},
    {runtime: 'electron', target: '5.0.0', abi: '70', lts: false},
    {runtime: 'electron', target: '6.0.0', abi: '73', lts: false},
    {runtime: 'electron', target: '7.0.0', abi: '75', lts: false},
    {runtime: 'electron', target: '8.0.0', abi: '76', lts: false}
  ]

  var additionalTargets = [
    {runtime: 'node-webkit', target: '0.13.0', abi: '47', lts: false},
    {runtime: 'node-webkit', target: '0.15.0', abi: '48', lts: false},
    {runtime: 'node-webkit', target: '0.18.3', abi: '51', lts: false},
    {runtime: 'node-webkit', target: '0.23.0', abi: '57', lts: false},
    {runtime: 'node-webkit', target: '0.26.5', abi: '59', lts: false}
  ]

  var deprecatedTargets = [
    {runtime: 'node', target: '0.2.0', abi: '1', lts: false},
    {runtime: 'node', target: '0.9.1', abi: '0x000A', lts: false},
    {runtime: 'node', target: '0.9.9', abi: '0x000B', lts: false},
    {runtime: 'node', target: '0.10.4', abi: '11', lts: false},
    {runtime: 'node', target: '0.11.0', abi: '0x000C', lts: false},
    {runtime: 'node', target: '0.11.8', abi: '13', lts: false},
    {runtime: 'node', target: '0.11.11', abi: '14', lts: false},
    {runtime: 'node', target: '1.0.0', abi: '42', lts: false},
    {runtime: 'node', target: '1.1.0', abi: '43', lts: false},
    {runtime: 'node', target: '2.0.0', abi: '44', lts: false},
    {runtime: 'node', target: '3.0.0', abi: '45', lts: false},
    {runtime: 'node', target: '4.0.0', abi: '46', lts: false},
    {runtime: 'electron', target: '0.30.0', abi: '44', lts: false},
    {runtime: 'electron', target: '0.31.0', abi: '45', lts: false},
    {runtime: 'electron', target: '0.33.0', abi: '46', lts: false}
  ]

  var futureTargets = [
    {runtime: 'electron', target: '9.0.0-beta.1', abi: '80', lts: false}
  ]

  var allTargets = deprecatedTargets
    .concat(supportedTargets)
    .concat(additionalTargets)
    .concat(futureTargets)

  exports.getAbi = getAbi
  exports.getTarget = getTarget
  exports.deprecatedTargets = deprecatedTargets
  exports.supportedTargets = supportedTargets
  exports.additionalTargets = additionalTargets
  exports.futureTargets = futureTargets
  exports.allTargets = allTargets
  exports._getNextTarget = getNextTarget


  /***/ }),
  /* 13 */
  /***/ (function(module, exports) {

  module.exports = require("semver");

  /***/ }),
  /* 14 */
  /***/ (function(module, exports) {

  module.exports = require("@yarnpkg/plugin-npm");

  /***/ }),
  /* 15 */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";


  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  const core_1 = __webpack_require__(1);

  const core_2 = __webpack_require__(1);

  class PrebuildResolver {
    supportsDescriptor(descriptor, opts) {
      if (!descriptor.range.startsWith(`prebuild:`)) return false;
      return true;
    }

    supportsLocator(locator, opts) {
      if (!locator.reference.startsWith(`prebuild:`)) return false;
      return true;
    }

    shouldPersistResolution(locator, opts) {
      return false;
    }

    bindDescriptor(descriptor, fromLocator, opts) {
      return descriptor;
    }

    getResolutionDependencies(descriptor, opts) {
      return [];
    }

    async getCandidates(descriptor, dependencies, opts) {
      if (!opts.fetchOptions) throw new Error(`Assertion failed: This resolver cannot be used unless a fetcher is configured`);
      return [core_2.structUtils.makeLocator(core_2.structUtils.parseIdent("bindings"), descriptor.range)];
    }

    async resolve(locator, opts) {
      // We have to defer all the actual resolution until the rest of the tree is figured out
      // We'll figure out our actual node files in the fetch step once everything else is resolved.
      return Object.assign(Object.assign({}, locator), {
        version: `*`,
        languageName: opts.project.configuration.get(`defaultLanguageName`),
        linkType: core_1.LinkType.HARD,
        dependencies: new Map(),
        peerDependencies: new Map(),
        dependenciesMeta: new Map(),
        peerDependenciesMeta: new Map(),
        bin: new Map()
      });
    }

  }

  exports.PrebuildResolver = PrebuildResolver;

  /***/ })
  /******/ ]);
    return plugin;
  },
};
