import { g as globalApis } from './chunk-constants.e6a0eed3.js';
import { i as index } from './vendor-entry.0601882a.js';
import 'url';
import './chunk-utils-global.aabdc45f.js';
import 'tty';
import 'local-pkg';
import 'path';
import 'fs';
import 'console';
import 'stream';
import './chunk-runtime-chain.9dacb7bc.js';
import 'chai';
import './vendor-_commonjsHelpers.addc3445.js';
import './chunk-runtime-rpc.25b9d2cb.js';
import './chunk-utils-timers.b4a3a799.js';
import './chunk-integrations-spy.bee66426.js';
import 'tinyspy';
import 'util';
import './chunk-defaults.445b4e99.js';
import 'module';
import 'crypto';

function registerApiGlobally() {
  globalApis.forEach((api) => {
    globalThis[api] = index[api];
  });
}

export { registerApiGlobally };
