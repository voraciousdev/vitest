import { h as resolve, a as getWorkerState } from './chunk-utils-global.aabdc45f.js';
import { c as createBirpc, M as ModuleCacheMap } from './chunk-vite-node-utils.a640dda6.js';
import { d as distDir } from './chunk-constants.e6a0eed3.js';
import { e as executeInViteNode } from './chunk-runtime-mocker.76aa98e0.js';
import { r as rpc } from './chunk-runtime-rpc.25b9d2cb.js';
import 'tty';
import 'local-pkg';
import 'path';
import 'module';
import 'url';
import 'vm';
import 'fs';
import 'assert';
import 'util';
import 'vite';

let _viteNode;
const moduleCache = new ModuleCacheMap();
const mockMap = /* @__PURE__ */ new Map();
async function startViteNode(ctx) {
  if (_viteNode)
    return _viteNode;
  const processExit = process.exit;
  process.on("beforeExit", (code) => {
    rpc().onWorkerExit(code);
  });
  process.exit = (code = process.exitCode || 0) => {
    rpc().onWorkerExit(code);
    return processExit(code);
  };
  process.on("unhandledRejection", (err) => {
    rpc().onUnhandledRejection(err);
  });
  const { config } = ctx;
  const { run: run2 } = (await executeInViteNode({
    files: [
      resolve(distDir, "entry.js")
    ],
    fetchModule(id) {
      return rpc().fetch(id);
    },
    resolveId(id, importer) {
      return rpc().resolveId(id, importer);
    },
    moduleCache,
    mockMap,
    interopDefault: config.deps.interopDefault ?? true,
    root: config.root,
    base: config.base
  }))[0];
  _viteNode = { run: run2 };
  return _viteNode;
}
function init(ctx) {
  if (typeof __vitest_worker__ !== "undefined" && ctx.config.threads && ctx.config.isolate)
    throw new Error(`worker for ${ctx.files.join(",")} already initialized by ${getWorkerState().ctx.files.join(",")}. This is probably an internal bug of Vitest.`);
  const { config, port, id } = ctx;
  process.env.VITEST_WORKER_ID = String(id);
  globalThis.__vitest_worker__ = {
    ctx,
    moduleCache,
    config,
    mockMap,
    rpc: createBirpc({}, {
      eventNames: ["onUserConsoleLog", "onFinished", "onCollected", "onWorkerExit"],
      post(v) {
        port.postMessage(v);
      },
      on(fn) {
        port.addListener("message", fn);
      }
    })
  };
  if (ctx.invalidates) {
    ctx.invalidates.forEach((i) => {
      moduleCache.delete(i);
      moduleCache.delete(`${i}__mock`);
    });
  }
  ctx.files.forEach((i) => moduleCache.delete(i));
}
async function run(ctx) {
  init(ctx);
  const { run: run2 } = await startViteNode(ctx);
  return run2(ctx.files, ctx.config);
}

export { run };
