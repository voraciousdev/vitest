import { promises } from 'fs';
import { a as getWorkerState, t as toArray, G as clone, E as getType, l as relative, H as partitionSuiteChildren, I as hasTests, q as hasFailed, o as getFullName, r as resetModules } from './chunk-utils-global.aabdc45f.js';
import { Console } from 'console';
import { Writable } from 'stream';
import { importModule } from 'local-pkg';
import { s as suite, t as test, d as describe, i as it, r as runOnce, a as isFirstRun, b as beforeAll, c as afterAll, e as beforeEach, f as afterEach, w as withCallback, g as createExpect, h as expect, v as vitest, j as vi, k as getRunningMode, l as isWatchMode, m as toString, n as resetRunOnceCounter, R as RealDate, o as clearCollectorContext, p as defaultSuite, q as setHooks, u as getHooks, x as collectorContext, y as getSnapshotClient, z as setState, A as getFn, B as getState } from './chunk-runtime-chain.9dacb7bc.js';
import chai, { assert, should, util } from 'chai';
import { r as rpc } from './chunk-runtime-rpc.25b9d2cb.js';
import { d as clearTimeout, c as setTimeout, s as stringify } from './chunk-utils-timers.b4a3a799.js';
import { t as takeCoverage } from './chunk-defaults.445b4e99.js';
import { createHash } from 'crypto';
import { format } from 'util';

var index = /*#__PURE__*/Object.freeze({
  __proto__: null,
  suite: suite,
  test: test,
  describe: describe,
  it: it,
  runOnce: runOnce,
  isFirstRun: isFirstRun,
  beforeAll: beforeAll,
  afterAll: afterAll,
  beforeEach: beforeEach,
  afterEach: afterEach,
  withCallback: withCallback,
  assert: assert,
  should: should,
  createExpect: createExpect,
  chai: chai,
  expect: expect,
  vitest: vitest,
  vi: vi,
  getRunningMode: getRunningMode,
  isWatchMode: isWatchMode,
  toString: toString
});

var node = {
  name: "node",
  async setup() {
    return {
      teardown() {
      }
    };
  }
};

const LIVING_KEYS = [
  "DOMException",
  "URL",
  "URLSearchParams",
  "EventTarget",
  "NamedNodeMap",
  "Node",
  "Attr",
  "Element",
  "DocumentFragment",
  "DOMImplementation",
  "Document",
  "XMLDocument",
  "CharacterData",
  "Text",
  "CDATASection",
  "ProcessingInstruction",
  "Comment",
  "DocumentType",
  "NodeList",
  "HTMLCollection",
  "HTMLOptionsCollection",
  "DOMStringMap",
  "DOMTokenList",
  "StyleSheetList",
  "HTMLElement",
  "HTMLHeadElement",
  "HTMLTitleElement",
  "HTMLBaseElement",
  "HTMLLinkElement",
  "HTMLMetaElement",
  "HTMLStyleElement",
  "HTMLBodyElement",
  "HTMLHeadingElement",
  "HTMLParagraphElement",
  "HTMLHRElement",
  "HTMLPreElement",
  "HTMLUListElement",
  "HTMLOListElement",
  "HTMLLIElement",
  "HTMLMenuElement",
  "HTMLDListElement",
  "HTMLDivElement",
  "HTMLAnchorElement",
  "HTMLAreaElement",
  "HTMLBRElement",
  "HTMLButtonElement",
  "HTMLCanvasElement",
  "HTMLDataElement",
  "HTMLDataListElement",
  "HTMLDetailsElement",
  "HTMLDialogElement",
  "HTMLDirectoryElement",
  "HTMLFieldSetElement",
  "HTMLFontElement",
  "HTMLFormElement",
  "HTMLHtmlElement",
  "HTMLImageElement",
  "HTMLInputElement",
  "HTMLLabelElement",
  "HTMLLegendElement",
  "HTMLMapElement",
  "HTMLMarqueeElement",
  "HTMLMediaElement",
  "HTMLMeterElement",
  "HTMLModElement",
  "HTMLOptGroupElement",
  "HTMLOptionElement",
  "HTMLOutputElement",
  "HTMLPictureElement",
  "HTMLProgressElement",
  "HTMLQuoteElement",
  "HTMLScriptElement",
  "HTMLSelectElement",
  "HTMLSlotElement",
  "HTMLSourceElement",
  "HTMLSpanElement",
  "HTMLTableCaptionElement",
  "HTMLTableCellElement",
  "HTMLTableColElement",
  "HTMLTableElement",
  "HTMLTimeElement",
  "HTMLTableRowElement",
  "HTMLTableSectionElement",
  "HTMLTemplateElement",
  "HTMLTextAreaElement",
  "HTMLUnknownElement",
  "HTMLFrameElement",
  "HTMLFrameSetElement",
  "HTMLIFrameElement",
  "HTMLEmbedElement",
  "HTMLObjectElement",
  "HTMLParamElement",
  "HTMLVideoElement",
  "HTMLAudioElement",
  "HTMLTrackElement",
  "SVGElement",
  "SVGGraphicsElement",
  "SVGSVGElement",
  "SVGTitleElement",
  "SVGAnimatedString",
  "SVGNumber",
  "SVGStringList",
  "Event",
  "CloseEvent",
  "CustomEvent",
  "MessageEvent",
  "ErrorEvent",
  "HashChangeEvent",
  "PopStateEvent",
  "StorageEvent",
  "ProgressEvent",
  "PageTransitionEvent",
  "UIEvent",
  "FocusEvent",
  "InputEvent",
  "MouseEvent",
  "KeyboardEvent",
  "TouchEvent",
  "CompositionEvent",
  "WheelEvent",
  "BarProp",
  "External",
  "Location",
  "History",
  "Screen",
  "Performance",
  "Navigator",
  "PluginArray",
  "MimeTypeArray",
  "Plugin",
  "MimeType",
  "FileReader",
  "Blob",
  "File",
  "FileList",
  "ValidityState",
  "DOMParser",
  "XMLSerializer",
  "FormData",
  "XMLHttpRequestEventTarget",
  "XMLHttpRequestUpload",
  "XMLHttpRequest",
  "WebSocket",
  "NodeFilter",
  "NodeIterator",
  "TreeWalker",
  "AbstractRange",
  "Range",
  "StaticRange",
  "Selection",
  "Storage",
  "CustomElementRegistry",
  "ShadowRoot",
  "MutationObserver",
  "MutationRecord",
  "Headers",
  "AbortController",
  "AbortSignal",
  "Image"
];
const OTHER_KEYS = [
  "addEventListener",
  "alert",
  "atob",
  "blur",
  "btoa",
  "cancelAnimationFrame",
  "close",
  "confirm",
  "createPopup",
  "dispatchEvent",
  "document",
  "focus",
  "frames",
  "getComputedStyle",
  "history",
  "innerHeight",
  "innerWidth",
  "length",
  "location",
  "matchMedia",
  "moveBy",
  "moveTo",
  "name",
  "navigator",
  "open",
  "outerHeight",
  "outerWidth",
  "pageXOffset",
  "pageYOffset",
  "parent",
  "postMessage",
  "print",
  "prompt",
  "removeEventListener",
  "requestAnimationFrame",
  "resizeBy",
  "resizeTo",
  "screen",
  "screenLeft",
  "screenTop",
  "screenX",
  "screenY",
  "scroll",
  "scrollBy",
  "scrollLeft",
  "scrollTo",
  "scrollTop",
  "scrollX",
  "scrollY",
  "self",
  "stop",
  "top",
  "Window",
  "window"
];
const KEYS = LIVING_KEYS.concat(OTHER_KEYS);

const allowRewrite = [
  "Event",
  "EventTarget"
];
const skipKeys = [
  "window",
  "self",
  "top",
  "parent"
];
function getWindowKeys(global, win) {
  const keys = new Set(KEYS.concat(Object.getOwnPropertyNames(win)).filter((k) => {
    if (k.startsWith("_") || skipKeys.includes(k))
      return false;
    if (k in global)
      return allowRewrite.includes(k);
    return true;
  }));
  return keys;
}
function populateGlobal(global, win, options = {}) {
  const { bindFunctions = false } = options;
  const keys = getWindowKeys(global, win);
  const overrideObject = /* @__PURE__ */ new Map();
  for (const key of keys) {
    const shouldBind = bindFunctions && typeof win[key] === "function";
    Object.defineProperty(global, key, {
      get() {
        if (overrideObject.has(key))
          return overrideObject.get(key);
        if (shouldBind)
          return win[key].bind(win);
        return win[key];
      },
      set(v) {
        overrideObject.set(key, v);
      },
      configurable: true
    });
  }
  const globalKeys = /* @__PURE__ */ new Set(["window", "self", "top", "parent"]);
  const globalProxy = new Proxy(win.window, {
    get(target, p, receiver) {
      if (overrideObject.has(p))
        return overrideObject.get(p);
      return Reflect.get(target, p, receiver);
    },
    set(target, p, value, receiver) {
      try {
        Object.defineProperty(global, p, {
          get: () => overrideObject.get(p),
          set: (value2) => overrideObject.set(p, value2),
          configurable: true
        });
        overrideObject.set(p, value);
        Reflect.set(target, p, value, receiver);
      } catch {
      }
      return true;
    },
    deleteProperty(target, p) {
      Reflect.deleteProperty(global, p);
      overrideObject.delete(p);
      return Reflect.deleteProperty(target, p);
    },
    defineProperty(target, p, attributes) {
      if (attributes.writable && "value" in attributes) ; else if (attributes.get) {
        overrideObject.delete(p);
        Reflect.defineProperty(global, p, attributes);
      }
      return Reflect.defineProperty(target, p, attributes);
    }
  });
  globalKeys.forEach((key) => {
    if (!win[key])
      return;
    Object.defineProperty(global, key, {
      get() {
        return globalProxy;
      },
      configurable: true
    });
  });
  const globalThisProxy = new Proxy(global.globalThis, {
    set(target, key, value, receiver) {
      overrideObject.set(key, value);
      return Reflect.set(target, key, value, receiver);
    },
    deleteProperty(target, key) {
      overrideObject.delete(key);
      return Reflect.deleteProperty(target, key);
    },
    defineProperty(target, p, attributes) {
      if (attributes.writable && "value" in attributes) ; else if (attributes.get && !globalKeys.has(p)) {
        globalKeys.forEach((key) => {
          if (win[key])
            Object.defineProperty(win[key], p, attributes);
        });
      }
      return Reflect.defineProperty(target, p, attributes);
    }
  });
  global.globalThis = globalThisProxy;
  if (global.global)
    global.global = globalThisProxy;
  skipKeys.forEach((k) => keys.add(k));
  return {
    keys,
    skipKeys,
    allowRewrite
  };
}

var __defProp$1 = Object.defineProperty;
var __getOwnPropSymbols$1 = Object.getOwnPropertySymbols;
var __hasOwnProp$1 = Object.prototype.hasOwnProperty;
var __propIsEnum$1 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$1 = (obj, key, value) => key in obj ? __defProp$1(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$1 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$1.call(b, prop))
      __defNormalProp$1(a, prop, b[prop]);
  if (__getOwnPropSymbols$1)
    for (var prop of __getOwnPropSymbols$1(b)) {
      if (__propIsEnum$1.call(b, prop))
        __defNormalProp$1(a, prop, b[prop]);
    }
  return a;
};
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp$1.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols$1)
    for (var prop of __getOwnPropSymbols$1(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum$1.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var jsdom = {
  name: "jsdom",
  async setup(global, { jsdom = {} }) {
    const {
      CookieJar,
      JSDOM,
      ResourceLoader,
      VirtualConsole
    } = await importModule("jsdom");
    const _a = jsdom, {
      html = "<!DOCTYPE html>",
      userAgent,
      url = "http://localhost:3000",
      contentType = "text/html",
      pretendToBeVisual = true,
      includeNodeLocations = false,
      runScripts = "dangerously",
      resources,
      console = false,
      cookieJar = false
    } = _a, restOptions = __objRest(_a, [
      "html",
      "userAgent",
      "url",
      "contentType",
      "pretendToBeVisual",
      "includeNodeLocations",
      "runScripts",
      "resources",
      "console",
      "cookieJar"
    ]);
    const dom = new JSDOM(html, __spreadValues$1({
      pretendToBeVisual,
      resources: resources ?? (userAgent ? new ResourceLoader({ userAgent }) : void 0),
      runScripts,
      url,
      virtualConsole: console && global.console ? new VirtualConsole().sendTo(global.console) : void 0,
      cookieJar: cookieJar ? new CookieJar() : void 0,
      includeNodeLocations,
      contentType,
      userAgent
    }, restOptions));
    const { keys, allowRewrite } = populateGlobal(global, dom.window);
    const originals = new Map(allowRewrite.map(([key]) => [key, global[key]]));
    return {
      teardown(global2) {
        keys.forEach((key) => delete global2[key]);
        originals.forEach((v, k) => global2[k] = v);
      }
    };
  }
};

var happy = {
  name: "happy-dom",
  async setup(global) {
    const { Window, GlobalWindow } = await importModule("happy-dom");
    const win = new (GlobalWindow || Window)();
    const { keys, allowRewrite } = populateGlobal(global, win, { bindFunctions: true });
    const originals = new Map(allowRewrite.map(([key]) => [key, global[key]]));
    return {
      teardown(global2) {
        win.happyDOM.cancelAsync();
        keys.forEach((key) => delete global2[key]);
        originals.forEach((v, k) => global2[k] = v);
      }
    };
  }
};

const environments = {
  node,
  jsdom,
  "happy-dom": happy
};

let globalSetup = false;
async function setupGlobalEnv(config) {
  resetRunOnceCounter();
  Object.defineProperty(globalThis, "__vitest_index__", {
    value: index,
    enumerable: false
  });
  setupDefines(config.defines);
  if (globalSetup)
    return;
  globalSetup = true;
  setupConsoleLogSpy();
  if (config.globals)
    (await import('./chunk-integrations-globals.34b407a1.js')).registerApiGlobally();
}
function setupDefines(defines) {
  for (const key in defines)
    globalThis[key] = defines[key];
}
function setupConsoleLogSpy() {
  const stdoutBuffer = /* @__PURE__ */ new Map();
  const stderrBuffer = /* @__PURE__ */ new Map();
  const timers = /* @__PURE__ */ new Map();
  const unknownTestId = "__vitest__unknown_test__";
  function schedule(taskId) {
    const timer = timers.get(taskId);
    const { stdoutTime, stderrTime } = timer;
    clearTimeout(timer.timer);
    timer.timer = setTimeout(() => {
      if (stderrTime < stdoutTime) {
        sendStderr(taskId);
        sendStdout(taskId);
      } else {
        sendStdout(taskId);
        sendStderr(taskId);
      }
    });
  }
  function sendStdout(taskId) {
    const buffer = stdoutBuffer.get(taskId);
    if (!buffer)
      return;
    const content = buffer.map((i) => String(i)).join("");
    if (!content.trim())
      return;
    const timer = timers.get(taskId);
    rpc().onUserConsoleLog({
      type: "stdout",
      content,
      taskId,
      time: timer.stdoutTime || RealDate.now(),
      size: buffer.length
    });
    stdoutBuffer.set(taskId, []);
    timer.stdoutTime = 0;
  }
  function sendStderr(taskId) {
    const buffer = stderrBuffer.get(taskId);
    if (!buffer)
      return;
    const content = buffer.map((i) => String(i)).join("");
    if (!content.trim())
      return;
    const timer = timers.get(taskId);
    rpc().onUserConsoleLog({
      type: "stderr",
      content,
      taskId,
      time: timer.stderrTime || RealDate.now(),
      size: buffer.length
    });
    stderrBuffer.set(taskId, []);
    timer.stderrTime = 0;
  }
  const stdout = new Writable({
    write(data, encoding, callback) {
      var _a, _b;
      const id = ((_b = (_a = getWorkerState()) == null ? void 0 : _a.current) == null ? void 0 : _b.id) ?? unknownTestId;
      let timer = timers.get(id);
      if (timer) {
        timer.stdoutTime = timer.stdoutTime || RealDate.now();
      } else {
        timer = { stdoutTime: RealDate.now(), stderrTime: RealDate.now(), timer: 0 };
        timers.set(id, timer);
      }
      let buffer = stdoutBuffer.get(id);
      if (!buffer) {
        buffer = [];
        stdoutBuffer.set(id, buffer);
      }
      buffer.push(data);
      schedule(id);
      callback();
    }
  });
  const stderr = new Writable({
    write(data, encoding, callback) {
      var _a, _b;
      const id = ((_b = (_a = getWorkerState()) == null ? void 0 : _a.current) == null ? void 0 : _b.id) ?? unknownTestId;
      let timer = timers.get(id);
      if (timer) {
        timer.stderrTime = timer.stderrTime || RealDate.now();
      } else {
        timer = { stderrTime: RealDate.now(), stdoutTime: RealDate.now(), timer: 0 };
        timers.set(id, timer);
      }
      let buffer = stderrBuffer.get(id);
      if (!buffer) {
        buffer = [];
        stderrBuffer.set(id, buffer);
      }
      buffer.push(data);
      schedule(id);
      callback();
    }
  });
  globalThis.console = new Console({
    stdout,
    stderr,
    colorMode: true,
    groupIndentation: 2
  });
}
async function withEnv(name, options, fn) {
  const env = await environments[name].setup(globalThis, options);
  try {
    await fn();
  } finally {
    await env.teardown(globalThis);
  }
}
async function runSetupFiles(config) {
  const files = toArray(config.setupFiles);
  await Promise.all(files.map(async (file) => {
    getWorkerState().moduleCache.delete(file);
    await import(file);
  }));
}

const OBJECT_PROTO = Object.getPrototypeOf({});
function serializeError(val, seen = /* @__PURE__ */ new WeakMap()) {
  if (!val || typeof val === "string")
    return val;
  if (typeof val === "function")
    return `Function<${val.name}>`;
  if (typeof val !== "object")
    return val;
  if (val instanceof Promise || "then" in val || val.constructor && val.constructor.prototype === "AsyncFunction")
    return "Promise";
  if (typeof Element !== "undefined" && val instanceof Element)
    return val.tagName;
  if (typeof val.asymmetricMatch === "function")
    return `${val.toString()} ${format(val.sample)}`;
  if (seen.has(val))
    return seen.get(val);
  if (Array.isArray(val)) {
    const clone2 = new Array(val.length);
    seen.set(val, clone2);
    val.forEach((e, i) => {
      clone2[i] = serializeError(e, seen);
    });
    return clone2;
  } else {
    const clone2 = /* @__PURE__ */ Object.create(null);
    seen.set(val, clone2);
    let obj = val;
    while (obj && obj !== OBJECT_PROTO) {
      Object.getOwnPropertyNames(obj).forEach((key) => {
        if (!(key in clone2))
          clone2[key] = serializeError(obj[key], seen);
      });
      obj = Object.getPrototypeOf(obj);
    }
    return clone2;
  }
}
function normalizeErrorMessage(message) {
  return message.replace(/__vite_ssr_import_\d+__\./g, "");
}
function processError(err) {
  if (!err)
    return err;
  if (err.stack)
    err.stackStr = String(err.stack);
  if (err.name)
    err.nameStr = String(err.name);
  const clonedActual = clone(err.actual);
  const clonedExpected = clone(err.expected);
  const { replacedActual, replacedExpected } = replaceAsymmetricMatcher(clonedActual, clonedExpected);
  err.actual = replacedActual;
  err.expected = replacedExpected;
  if (typeof err.expected !== "string")
    err.expected = stringify(err.expected);
  if (typeof err.actual !== "string")
    err.actual = stringify(err.actual);
  if (typeof err.message === "string")
    err.message = normalizeErrorMessage(err.message);
  if (typeof err.cause === "object" && err.cause.message === "string")
    err.cause.message = normalizeErrorMessage(err.cause.message);
  try {
    return serializeError(err);
  } catch (e) {
    return serializeError(new Error(`Failed to fully serialize error: ${e == null ? void 0 : e.message}.
Inner error message: ${err == null ? void 0 : err.message}`));
  }
}
function isAsymmetricMatcher(data) {
  const type = getType(data);
  return type === "Object" && typeof data.asymmetricMatch === "function";
}
function isReplaceable(obj1, obj2) {
  const obj1Type = getType(obj1);
  const obj2Type = getType(obj2);
  return obj1Type === obj2Type && obj1Type === "Object";
}
function replaceAsymmetricMatcher(actual, expected) {
  if (!isReplaceable(actual, expected))
    return { replacedActual: actual, replacedExpected: expected };
  util.getOwnEnumerableProperties(expected).forEach((key) => {
    const expectedValue = expected[key];
    const actualValue = actual[key];
    if (isAsymmetricMatcher(expectedValue)) {
      if (expectedValue.asymmetricMatch(actualValue))
        actual[key] = expectedValue;
    } else if (isAsymmetricMatcher(actualValue)) {
      if (actualValue.asymmetricMatch(expectedValue))
        expected[key] = actualValue;
    } else if (isReplaceable(actualValue, expectedValue)) {
      const replaced = replaceAsymmetricMatcher(actualValue, expectedValue);
      actual[key] = replaced.replacedActual;
      expected[key] = replaced.replacedExpected;
    }
  });
  return {
    replacedActual: actual,
    replacedExpected: expected
  };
}

const now$1 = Date.now;
function hash(str, length = 10) {
  return createHash("md5").update(str).digest("hex").slice(0, length);
}
async function collectTests(paths, config) {
  const files = [];
  for (const filepath of paths) {
    const path = relative(config.root, filepath);
    const file = {
      id: hash(path),
      name: path,
      type: "suite",
      mode: "run",
      filepath,
      tasks: []
    };
    clearCollectorContext();
    try {
      await runSetupFiles(config);
      await import(filepath);
      const defaultTasks = await defaultSuite.collect(file);
      setHooks(file, getHooks(defaultTasks));
      for (const c of [...defaultTasks.tasks, ...collectorContext.tasks]) {
        if (c.type === "test") {
          file.tasks.push(c);
        } else if (c.type === "suite") {
          file.tasks.push(c);
        } else {
          const start = now$1();
          const suite = await c.collect(file);
          file.collectDuration = now$1() - start;
          if (suite.name || suite.tasks.length)
            file.tasks.push(suite);
        }
      }
    } catch (e) {
      file.result = {
        state: "fail",
        error: processError(e)
      };
    }
    calculateHash(file);
    const hasOnlyTasks = someTasksAreOnly(file);
    interpretTaskModes(file, config.testNamePattern, hasOnlyTasks, false, config.allowOnly);
    files.push(file);
  }
  return files;
}
function interpretTaskModes(suite, namePattern, onlyMode, parentIsOnly, allowOnly) {
  const suiteIsOnly = parentIsOnly || suite.mode === "only";
  suite.tasks.forEach((t) => {
    const includeTask = suiteIsOnly || t.mode === "only";
    if (onlyMode) {
      if (t.type === "suite" && (includeTask || someTasksAreOnly(t))) {
        if (t.mode === "only") {
          checkAllowOnly(t, allowOnly);
          t.mode = "run";
        }
      } else if (t.mode === "run" && !includeTask) {
        t.mode = "skip";
      } else if (t.mode === "only") {
        checkAllowOnly(t, allowOnly);
        t.mode = "run";
      }
    }
    if (t.type === "test") {
      if (namePattern && !getTaskFullName(t).match(namePattern))
        t.mode = "skip";
    } else if (t.type === "suite") {
      if (t.mode === "skip")
        skipAllTasks(t);
      else
        interpretTaskModes(t, namePattern, onlyMode, includeTask, allowOnly);
    }
  });
  if (suite.mode === "run") {
    if (suite.tasks.length && suite.tasks.every((i) => i.mode !== "run"))
      suite.mode = "skip";
  }
}
function getTaskFullName(task) {
  return `${task.suite ? `${getTaskFullName(task.suite)} ` : ""}${task.name}`;
}
function someTasksAreOnly(suite) {
  return suite.tasks.some((t) => t.mode === "only" || t.type === "suite" && someTasksAreOnly(t));
}
function skipAllTasks(suite) {
  suite.tasks.forEach((t) => {
    if (t.mode === "run") {
      t.mode = "skip";
      if (t.type === "suite")
        skipAllTasks(t);
    }
  });
}
function checkAllowOnly(task, allowOnly) {
  if (allowOnly)
    return;
  task.result = {
    state: "fail",
    error: processError(new Error("[Vitest] Unexpected .only modifier. Remove it or pass --allowOnly argument to bypass this error"))
  };
}
function calculateHash(parent) {
  parent.tasks.forEach((t, idx) => {
    t.id = `${parent.id}_${idx}`;
    if (t.type === "suite")
      calculateHash(t);
  });
}

var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
const now = Date.now;
function updateSuiteHookState(suite, name, state) {
  var _a;
  if (!suite.result)
    suite.result = { state: "run" };
  if (!((_a = suite.result) == null ? void 0 : _a.hooks))
    suite.result.hooks = {};
  const suiteHooks = suite.result.hooks;
  if (suiteHooks) {
    suiteHooks[name] = state;
    updateTask(suite);
  }
}
async function callSuiteHook(suite, currentTask, name, args) {
  const callbacks = [];
  if (name === "beforeEach" && suite.suite) {
    callbacks.push(...await callSuiteHook(suite.suite, currentTask, name, args));
  }
  updateSuiteHookState(currentTask, name, "run");
  callbacks.push(...await Promise.all(getHooks(suite)[name].map((fn) => fn(...args))));
  updateSuiteHookState(currentTask, name, "pass");
  if (name === "afterEach" && suite.suite) {
    callbacks.push(...await callSuiteHook(suite.suite, currentTask, name, args));
  }
  return callbacks;
}
const packs = /* @__PURE__ */ new Map();
let updateTimer;
let previousUpdate;
function updateTask(task) {
  packs.set(task.id, task.result);
  clearTimeout(updateTimer);
  updateTimer = setTimeout(() => {
    previousUpdate = sendTasksUpdate();
  }, 10);
}
async function sendTasksUpdate() {
  clearTimeout(updateTimer);
  await previousUpdate;
  if (packs.size) {
    const p = rpc().onTaskUpdate(Array.from(packs));
    packs.clear();
    return p;
  }
}
async function runTest(test) {
  var _a, _b;
  if (test.mode !== "run")
    return;
  if (((_a = test.result) == null ? void 0 : _a.state) === "fail") {
    updateTask(test);
    return;
  }
  const start = now();
  test.result = {
    state: "run",
    startTime: start
  };
  updateTask(test);
  clearModuleMocks();
  await getSnapshotClient().setTest(test);
  const workerState = getWorkerState();
  workerState.current = test;
  let beforeEachCleanups = [];
  try {
    beforeEachCleanups = await callSuiteHook(test.suite, test, "beforeEach", [test.context, test.suite]);
    setState({
      assertionCalls: 0,
      isExpectingAssertions: false,
      isExpectingAssertionsError: null,
      expectedAssertionsNumber: null,
      expectedAssertionsNumberErrorGen: null,
      testPath: (_b = test.suite.file) == null ? void 0 : _b.filepath,
      currentTestName: getFullName(test)
    });
    await getFn(test)();
    const { assertionCalls, expectedAssertionsNumber, expectedAssertionsNumberErrorGen, isExpectingAssertions, isExpectingAssertionsError } = getState();
    if (expectedAssertionsNumber !== null && assertionCalls !== expectedAssertionsNumber)
      throw expectedAssertionsNumberErrorGen();
    if (isExpectingAssertions === true && assertionCalls === 0)
      throw isExpectingAssertionsError;
    test.result.state = "pass";
  } catch (e) {
    test.result.state = "fail";
    test.result.error = processError(e);
  }
  try {
    await callSuiteHook(test.suite, test, "afterEach", [test.context, test.suite]);
    await Promise.all(beforeEachCleanups.map((i) => i == null ? void 0 : i()));
  } catch (e) {
    test.result.state = "fail";
    test.result.error = processError(e);
  }
  if (test.fails) {
    if (test.result.state === "pass") {
      test.result.state = "fail";
      test.result.error = processError(new Error("Expect test to fail"));
    } else {
      test.result.state = "pass";
      test.result.error = void 0;
    }
  }
  getSnapshotClient().clearTest();
  test.result.duration = now() - start;
  if (workerState.config.logHeapUsage)
    test.result.heap = process.memoryUsage().heapUsed;
  workerState.current = void 0;
  updateTask(test);
}
function markTasksAsSkipped(suite) {
  suite.tasks.forEach((t) => {
    t.mode = "skip";
    t.result = __spreadProps(__spreadValues({}, t.result), { state: "skip" });
    updateTask(t);
    if (t.type === "suite")
      markTasksAsSkipped(t);
  });
}
async function runSuite(suite) {
  var _a;
  if (((_a = suite.result) == null ? void 0 : _a.state) === "fail") {
    markTasksAsSkipped(suite);
    updateTask(suite);
    return;
  }
  const start = now();
  suite.result = {
    state: "run",
    startTime: start
  };
  updateTask(suite);
  if (suite.mode === "skip") {
    suite.result.state = "skip";
  } else if (suite.mode === "todo") {
    suite.result.state = "todo";
  } else {
    try {
      const beforeAllCleanups = await callSuiteHook(suite, suite, "beforeAll", [suite]);
      for (const tasksGroup of partitionSuiteChildren(suite)) {
        if (tasksGroup[0].concurrent === true) {
          await Promise.all(tasksGroup.map((c) => runSuiteChild(c)));
        } else {
          for (const c of tasksGroup)
            await runSuiteChild(c);
        }
      }
      await callSuiteHook(suite, suite, "afterAll", [suite]);
      await Promise.all(beforeAllCleanups.map((i) => i == null ? void 0 : i()));
    } catch (e) {
      suite.result.state = "fail";
      suite.result.error = processError(e);
    }
  }
  suite.result.duration = now() - start;
  const workerState = getWorkerState();
  if (workerState.config.logHeapUsage)
    suite.result.heap = process.memoryUsage().heapUsed;
  if (suite.mode === "run") {
    if (!hasTests(suite)) {
      suite.result.state = "fail";
      if (!suite.result.error)
        suite.result.error = new Error(`No test found in suite ${suite.name}`);
    } else if (hasFailed(suite)) {
      suite.result.state = "fail";
    } else {
      suite.result.state = "pass";
    }
  }
  updateTask(suite);
}
async function runSuiteChild(c) {
  return c.type === "test" ? runTest(c) : runSuite(c);
}
async function runFiles(files, config) {
  var _a;
  for (const file of files) {
    if (!file.tasks.length && !config.passWithNoTests) {
      if (!((_a = file.result) == null ? void 0 : _a.error)) {
        file.result = {
          state: "fail",
          error: new Error(`No test suite found in file ${file.filepath}`)
        };
      }
    }
    await runSuite(file);
  }
}
async function startTests(paths, config) {
  const files = await collectTests(paths, config);
  rpc().onCollected(files);
  getSnapshotClient().clear();
  await runFiles(files, config);
  takeCoverage();
  await getSnapshotClient().saveCurrent();
  await sendTasksUpdate();
}
function clearModuleMocks() {
  const { clearMocks, mockReset, restoreMocks } = getWorkerState().config;
  if (restoreMocks)
    vi.restoreAllMocks();
  else if (mockReset)
    vi.resetAllMocks();
  else if (clearMocks)
    vi.clearAllMocks();
}

async function run(files, config) {
  await setupGlobalEnv(config);
  const workerState = getWorkerState();
  const envs = ["node", "jsdom", "happy-dom"];
  const filesWithEnv = await Promise.all(files.map(async (file) => {
    var _a;
    const code = await promises.readFile(file, "utf-8");
    const env = ((_a = code.match(/@(?:vitest|jest)-environment\s+?([\w-]+)\b/)) == null ? void 0 : _a[1]) || config.environment || "node";
    if (!envs.includes(env))
      throw new Error(`Unsupported environment: "${env}" in ${file}`);
    return {
      file,
      env
    };
  }));
  const filesByEnv = filesWithEnv.reduce((acc, { file, env }) => {
    acc[env] || (acc[env] = []);
    acc[env].push(file);
    return acc;
  }, {});
  for (const env of envs) {
    const environment = env;
    const files2 = filesByEnv[environment];
    if (!files2 || !files2.length)
      continue;
    await withEnv(environment, config.environmentOptions || {}, async () => {
      for (const file of files2) {
        workerState.mockMap.clear();
        resetModules();
        workerState.filepath = file;
        await startTests([file], config);
        workerState.filepath = void 0;
      }
    });
  }
}

export { index as i, run as r };
