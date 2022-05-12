import chai$1, { expect as expect$1, util } from 'chai';
import { c as commonjsGlobal } from './vendor-_commonjsHelpers.addc3445.js';
import { r as rpc } from './chunk-runtime-rpc.25b9d2cb.js';
import { i as isObject, j as join, d as dirname, g as getCallLastIndex, s as slash, a as getWorkerState, b as getNames, c as assertTypes, p as picocolors, n as noop, t as toArray, r as resetModules } from './chunk-utils-global.aabdc45f.js';
import fs, { promises } from 'fs';
import { p as plugins_1, f as format_1, g as getOriginalPos, a as posToNumber, n as numberToPos, l as lineSplitRE, b as parseStacktrace, u as unifiedDiff, s as stringify, m as matcherUtils, c as setTimeout, d as clearTimeout } from './chunk-utils-timers.b4a3a799.js';
import { i as isMockFunction, s as spyOn, f as fn, a as spies } from './chunk-integrations-spy.bee66426.js';
import require$$0, { format } from 'util';

var __defProp$5 = Object.defineProperty;
var __defProps$2 = Object.defineProperties;
var __getOwnPropDescs$2 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$5 = Object.getOwnPropertySymbols;
var __hasOwnProp$5 = Object.prototype.hasOwnProperty;
var __propIsEnum$5 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$5 = (obj, key, value) => key in obj ? __defProp$5(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$5 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$5.call(b, prop))
      __defNormalProp$5(a, prop, b[prop]);
  if (__getOwnPropSymbols$5)
    for (var prop of __getOwnPropSymbols$5(b)) {
      if (__propIsEnum$5.call(b, prop))
        __defNormalProp$5(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$2 = (a, b) => __defProps$2(a, __getOwnPropDescs$2(b));
function createChainable(keys, fn) {
  function create(obj) {
    const chain2 = function(...args) {
      return fn.apply(obj, args);
    };
    for (const key of keys) {
      Object.defineProperty(chain2, key, {
        get() {
          return create(__spreadProps$2(__spreadValues$5({}, obj), { [key]: true }));
        }
      });
    }
    return chain2;
  }
  const chain = create({});
  chain.fn = fn;
  return chain;
}

function commonjsRequire(path) {
	throw new Error('Could not dynamically require "' + path + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}

var chaiSubset = {exports: {}};

(function (module, exports) {
	(function() {
		(function(chaiSubset) {
			if (typeof commonjsRequire === 'function' && 'object' === 'object' && 'object' === 'object') {
				return module.exports = chaiSubset;
			} else {
				return chai.use(chaiSubset);
			}
		})(function(chai, utils) {
			var Assertion = chai.Assertion;
			var assertionPrototype = Assertion.prototype;

			Assertion.addMethod('containSubset', function (expected) {
				var actual = utils.flag(this, 'object');
				var showDiff = chai.config.showDiff;

				assertionPrototype.assert.call(this,
					compare(expected, actual),
					'expected #{act} to contain subset #{exp}',
					'expected #{act} to not contain subset #{exp}',
					expected,
					actual,
					showDiff
				);
			});

			chai.assert.containSubset = function(val, exp, msg) {
				new chai.Assertion(val, msg).to.be.containSubset(exp);
			};

			function compare(expected, actual) {
				if (expected === actual) {
					return true;
				}
				if (typeof(actual) !== typeof(expected)) {
					return false;
				}
				if (typeof(expected) !== 'object' || expected === null) {
					return expected === actual;
				}
				if (!!expected && !actual) {
					return false;
				}

				if (Array.isArray(expected)) {
					if (typeof(actual.length) !== 'number') {
						return false;
					}
					var aa = Array.prototype.slice.call(actual);
					return expected.every(function (exp) {
						return aa.some(function (act) {
							return compare(exp, act);
						});
					});
				}

				if (expected instanceof Date) {
					if (actual instanceof Date) {
						return expected.getTime() === actual.getTime();
					} else {
						return false;
					}
				}

				return Object.keys(expected).every(function (key) {
					var eo = expected[key];
					var ao = actual[key];
					if (typeof(eo) === 'object' && eo !== null && ao !== null) {
						return compare(eo, ao);
					}
					if (typeof(eo) === 'function') {
						return eo(ao);
					}
					return ao === eo;
				});
			}
		});

	}).call(commonjsGlobal);
} (chaiSubset));

var Subset = chaiSubset.exports;

function equals(a, b, customTesters, strictCheck) {
  customTesters = customTesters || [];
  return eq(a, b, [], [], customTesters, strictCheck ? hasKey : hasDefinedKey);
}
function isAsymmetric(obj) {
  return !!obj && isA("Function", obj.asymmetricMatch);
}
function asymmetricMatch(a, b) {
  const asymmetricA = isAsymmetric(a);
  const asymmetricB = isAsymmetric(b);
  if (asymmetricA && asymmetricB)
    return void 0;
  if (asymmetricA)
    return a.asymmetricMatch(b);
  if (asymmetricB)
    return b.asymmetricMatch(a);
}
function eq(a, b, aStack, bStack, customTesters, hasKey2) {
  let result = true;
  const asymmetricResult = asymmetricMatch(a, b);
  if (asymmetricResult !== void 0)
    return asymmetricResult;
  for (let i = 0; i < customTesters.length; i++) {
    const customTesterResult = customTesters[i](a, b);
    if (customTesterResult !== void 0)
      return customTesterResult;
  }
  if (a instanceof Error && b instanceof Error)
    return a.message === b.message;
  if (Object.is(a, b))
    return true;
  if (a === null || b === null)
    return a === b;
  const className = Object.prototype.toString.call(a);
  if (className !== Object.prototype.toString.call(b))
    return false;
  switch (className) {
    case "[object Boolean]":
    case "[object String]":
    case "[object Number]":
      if (typeof a !== typeof b) {
        return false;
      } else if (typeof a !== "object" && typeof b !== "object") {
        return Object.is(a, b);
      } else {
        return Object.is(a.valueOf(), b.valueOf());
      }
    case "[object Date]":
      return +a === +b;
    case "[object RegExp]":
      return a.source === b.source && a.flags === b.flags;
  }
  if (typeof a !== "object" || typeof b !== "object")
    return false;
  if (isDomNode(a) && isDomNode(b))
    return a.isEqualNode(b);
  let length = aStack.length;
  while (length--) {
    if (aStack[length] === a)
      return bStack[length] === b;
    else if (bStack[length] === b)
      return false;
  }
  aStack.push(a);
  bStack.push(b);
  if (className === "[object Array]" && a.length !== b.length)
    return false;
  const aKeys = keys(a, hasKey2);
  let key;
  let size = aKeys.length;
  if (keys(b, hasKey2).length !== size)
    return false;
  while (size--) {
    key = aKeys[size];
    result = hasKey2(b, key) && eq(a[key], b[key], aStack, bStack, customTesters, hasKey2);
    if (!result)
      return false;
  }
  aStack.pop();
  bStack.pop();
  return result;
}
function keys(obj, hasKey2) {
  const keys2 = [];
  for (const key in obj) {
    if (hasKey2(obj, key))
      keys2.push(key);
  }
  return keys2.concat(Object.getOwnPropertySymbols(obj).filter((symbol) => Object.getOwnPropertyDescriptor(obj, symbol).enumerable));
}
function hasDefinedKey(obj, key) {
  return hasKey(obj, key) && obj[key] !== void 0;
}
function hasKey(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}
function isA(typeName, value) {
  return Object.prototype.toString.apply(value) === `[object ${typeName}]`;
}
function isDomNode(obj) {
  return obj !== null && typeof obj === "object" && typeof obj.nodeType === "number" && typeof obj.nodeName === "string" && typeof obj.isEqualNode === "function";
}
const IS_KEYED_SENTINEL = "@@__IMMUTABLE_KEYED__@@";
const IS_SET_SENTINEL = "@@__IMMUTABLE_SET__@@";
const IS_ORDERED_SENTINEL = "@@__IMMUTABLE_ORDERED__@@";
function isImmutableUnorderedKeyed(maybeKeyed) {
  return !!(maybeKeyed && maybeKeyed[IS_KEYED_SENTINEL] && !maybeKeyed[IS_ORDERED_SENTINEL]);
}
function isImmutableUnorderedSet(maybeSet) {
  return !!(maybeSet && maybeSet[IS_SET_SENTINEL] && !maybeSet[IS_ORDERED_SENTINEL]);
}
const IteratorSymbol = Symbol.iterator;
const hasIterator = (object) => !!(object != null && object[IteratorSymbol]);
const iterableEquality = (a, b, aStack = [], bStack = []) => {
  if (typeof a !== "object" || typeof b !== "object" || Array.isArray(a) || Array.isArray(b) || !hasIterator(a) || !hasIterator(b))
    return void 0;
  if (a.constructor !== b.constructor)
    return false;
  let length = aStack.length;
  while (length--) {
    if (aStack[length] === a)
      return bStack[length] === b;
  }
  aStack.push(a);
  bStack.push(b);
  const iterableEqualityWithStack = (a2, b2) => iterableEquality(a2, b2, [...aStack], [...bStack]);
  if (a.size !== void 0) {
    if (a.size !== b.size) {
      return false;
    } else if (isA("Set", a) || isImmutableUnorderedSet(a)) {
      let allFound = true;
      for (const aValue of a) {
        if (!b.has(aValue)) {
          let has = false;
          for (const bValue of b) {
            const isEqual = equals(aValue, bValue, [iterableEqualityWithStack]);
            if (isEqual === true)
              has = true;
          }
          if (has === false) {
            allFound = false;
            break;
          }
        }
      }
      aStack.pop();
      bStack.pop();
      return allFound;
    } else if (isA("Map", a) || isImmutableUnorderedKeyed(a)) {
      let allFound = true;
      for (const aEntry of a) {
        if (!b.has(aEntry[0]) || !equals(aEntry[1], b.get(aEntry[0]), [iterableEqualityWithStack])) {
          let has = false;
          for (const bEntry of b) {
            const matchedKey = equals(aEntry[0], bEntry[0], [
              iterableEqualityWithStack
            ]);
            let matchedValue = false;
            if (matchedKey === true) {
              matchedValue = equals(aEntry[1], bEntry[1], [
                iterableEqualityWithStack
              ]);
            }
            if (matchedValue === true)
              has = true;
          }
          if (has === false) {
            allFound = false;
            break;
          }
        }
      }
      aStack.pop();
      bStack.pop();
      return allFound;
    }
  }
  const bIterator = b[IteratorSymbol]();
  for (const aValue of a) {
    const nextB = bIterator.next();
    if (nextB.done || !equals(aValue, nextB.value, [iterableEqualityWithStack]))
      return false;
  }
  if (!bIterator.next().done)
    return false;
  aStack.pop();
  bStack.pop();
  return true;
};
const hasPropertyInObject = (object, key) => {
  const shouldTerminate = !object || typeof object !== "object" || object === Object.prototype;
  if (shouldTerminate)
    return false;
  return Object.prototype.hasOwnProperty.call(object, key) || hasPropertyInObject(Object.getPrototypeOf(object), key);
};
const isObjectWithKeys = (a) => isObject(a) && !(a instanceof Error) && !(a instanceof Array) && !(a instanceof Date);
const subsetEquality = (object, subset) => {
  const subsetEqualityWithContext = (seenReferences = /* @__PURE__ */ new WeakMap()) => (object2, subset2) => {
    if (!isObjectWithKeys(subset2))
      return void 0;
    return Object.keys(subset2).every((key) => {
      if (isObjectWithKeys(subset2[key])) {
        if (seenReferences.has(subset2[key]))
          return equals(object2[key], subset2[key], [iterableEquality]);
        seenReferences.set(subset2[key], true);
      }
      const result = object2 != null && hasPropertyInObject(object2, key) && equals(object2[key], subset2[key], [
        iterableEquality,
        subsetEqualityWithContext(seenReferences)
      ]);
      seenReferences.delete(subset2[key]);
      return result;
    });
  };
  return subsetEqualityWithContext()(object, subset);
};
const typeEquality = (a, b) => {
  if (a == null || b == null || a.constructor === b.constructor)
    return void 0;
  return false;
};
const arrayBufferEquality = (a, b) => {
  if (!(a instanceof ArrayBuffer) || !(b instanceof ArrayBuffer))
    return void 0;
  const dataViewA = new DataView(a);
  const dataViewB = new DataView(b);
  if (dataViewA.byteLength !== dataViewB.byteLength)
    return false;
  for (let i = 0; i < dataViewA.byteLength; i++) {
    if (dataViewA.getUint8(i) !== dataViewB.getUint8(i))
      return false;
  }
  return true;
};
const sparseArrayEquality = (a, b) => {
  if (!Array.isArray(a) || !Array.isArray(b))
    return void 0;
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);
  return equals(a, b, [iterableEquality, typeEquality], true) && equals(aKeys, bKeys);
};

var naturalCompare$1 = {exports: {}};

/*
 * @version    1.4.0
 * @date       2015-10-26
 * @stability  3 - Stable
 * @author     Lauri Rooden (https://github.com/litejs/natural-compare-lite)
 * @license    MIT License
 */


var naturalCompare = function(a, b) {
	var i, codeA
	, codeB = 1
	, posA = 0
	, posB = 0
	, alphabet = String.alphabet;

	function getCode(str, pos, code) {
		if (code) {
			for (i = pos; code = getCode(str, i), code < 76 && code > 65;) ++i;
			return +str.slice(pos - 1, i)
		}
		code = alphabet && alphabet.indexOf(str.charAt(pos));
		return code > -1 ? code + 76 : ((code = str.charCodeAt(pos) || 0), code < 45 || code > 127) ? code
			: code < 46 ? 65               // -
			: code < 48 ? code - 1
			: code < 58 ? code + 18        // 0-9
			: code < 65 ? code - 11
			: code < 91 ? code + 11        // A-Z
			: code < 97 ? code - 37
			: code < 123 ? code + 5        // a-z
			: code - 63
	}


	if ((a+="") != (b+="")) for (;codeB;) {
		codeA = getCode(a, posA++);
		codeB = getCode(b, posB++);

		if (codeA < 76 && codeB < 76 && codeA > 66 && codeB > 66) {
			codeA = getCode(a, posA, posA);
			codeB = getCode(b, posB, posA = i);
			posB = i;
		}

		if (codeA != codeB) return (codeA < codeB) ? -1 : 1
	}
	return 0
};

try {
	naturalCompare$1.exports = naturalCompare;
} catch (e) {
	String.naturalCompare = naturalCompare;
}

const {
  DOMCollection,
  DOMElement,
  Immutable,
  ReactElement,
  ReactTestComponent,
  AsymmetricMatcher: AsymmetricMatcher$1
} = plugins_1;
let PLUGINS = [
  ReactTestComponent,
  ReactElement,
  DOMElement,
  DOMCollection,
  Immutable,
  AsymmetricMatcher$1
];
const addSerializer = (plugin) => {
  PLUGINS = [plugin].concat(PLUGINS);
};
const getSerializers = () => PLUGINS;

var __defProp$4 = Object.defineProperty;
var __getOwnPropSymbols$4 = Object.getOwnPropertySymbols;
var __hasOwnProp$4 = Object.prototype.hasOwnProperty;
var __propIsEnum$4 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$4 = (obj, key, value) => key in obj ? __defProp$4(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$4 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$4.call(b, prop))
      __defNormalProp$4(a, prop, b[prop]);
  if (__getOwnPropSymbols$4)
    for (var prop of __getOwnPropSymbols$4(b)) {
      if (__propIsEnum$4.call(b, prop))
        __defNormalProp$4(a, prop, b[prop]);
    }
  return a;
};
const SNAPSHOT_VERSION = "1";
const writeSnapshotVersion = () => `// Vitest Snapshot v${SNAPSHOT_VERSION}`;
const testNameToKey = (testName, count) => `${testName} ${count}`;
const keyToTestName = (key) => {
  if (!/ \d+$/.test(key))
    throw new Error("Snapshot keys must end with a number.");
  return key.replace(/ \d+$/, "");
};
const getSnapshotData = (snapshotPath, update) => {
  const data = /* @__PURE__ */ Object.create(null);
  let snapshotContents = "";
  let dirty = false;
  if (fs.existsSync(snapshotPath)) {
    try {
      snapshotContents = fs.readFileSync(snapshotPath, "utf8");
      const populate = new Function("exports", snapshotContents);
      populate(data);
    } catch {
    }
  }
  const isInvalid = snapshotContents;
  if ((update === "all" || update === "new") && isInvalid)
    dirty = true;
  return { data, dirty };
};
const addExtraLineBreaks = (string) => string.includes("\n") ? `
${string}
` : string;
const removeExtraLineBreaks = (string) => string.length > 2 && string.startsWith("\n") && string.endsWith("\n") ? string.slice(1, -1) : string;
const escapeRegex = true;
const printFunctionName = false;
function serialize(val, indent = 2, formatOverrides = {}) {
  return normalizeNewlines(format_1(val, __spreadValues$4({
    escapeRegex,
    indent,
    plugins: getSerializers(),
    printFunctionName
  }, formatOverrides)));
}
function escapeBacktickString(str) {
  return str.replace(/`|\\|\${/g, "\\$&");
}
function printBacktickString(str) {
  return `\`${escapeBacktickString(str)}\``;
}
function ensureDirectoryExists(filePath) {
  try {
    fs.mkdirSync(join(dirname(filePath)), { recursive: true });
  } catch {
  }
}
function normalizeNewlines(string) {
  return string.replace(/\r\n|\r/g, "\n");
}
async function saveSnapshotFile(snapshotData, snapshotPath) {
  const snapshots = Object.keys(snapshotData).sort(naturalCompare$1.exports).map((key) => `exports[${printBacktickString(key)}] = ${printBacktickString(normalizeNewlines(snapshotData[key]))};`);
  ensureDirectoryExists(snapshotPath);
  await promises.writeFile(snapshotPath, `${writeSnapshotVersion()}

${snapshots.join("\n\n")}
`, "utf-8");
}
function prepareExpected(expected) {
  function findStartIndent() {
    var _a, _b;
    const matchObject = /^( +)}\s+$/m.exec(expected || "");
    const objectIndent = (_a = matchObject == null ? void 0 : matchObject[1]) == null ? void 0 : _a.length;
    if (objectIndent)
      return objectIndent;
    const matchText = /^\n( +)"/.exec(expected || "");
    return ((_b = matchText == null ? void 0 : matchText[1]) == null ? void 0 : _b.length) || 0;
  }
  const startIndent = findStartIndent();
  let expectedTrimmed = expected == null ? void 0 : expected.trim();
  if (startIndent) {
    expectedTrimmed = expectedTrimmed == null ? void 0 : expectedTrimmed.replace(new RegExp(`^${" ".repeat(startIndent)}`, "gm"), "").replace(/ +}$/, "}");
  }
  return expectedTrimmed;
}
function deepMergeArray(target = [], source = []) {
  const mergedOutput = Array.from(target);
  source.forEach((sourceElement, index) => {
    const targetElement = mergedOutput[index];
    if (Array.isArray(target[index])) {
      mergedOutput[index] = deepMergeArray(target[index], sourceElement);
    } else if (isObject(targetElement)) {
      mergedOutput[index] = deepMergeSnapshot(target[index], sourceElement);
    } else {
      mergedOutput[index] = sourceElement;
    }
  });
  return mergedOutput;
}
function deepMergeSnapshot(target, source) {
  if (isObject(target) && isObject(source)) {
    const mergedOutput = __spreadValues$4({}, target);
    Object.keys(source).forEach((key) => {
      if (isObject(source[key]) && !source[key].$$typeof) {
        if (!(key in target))
          Object.assign(mergedOutput, { [key]: source[key] });
        else
          mergedOutput[key] = deepMergeSnapshot(target[key], source[key]);
      } else if (Array.isArray(source[key])) {
        mergedOutput[key] = deepMergeArray(target[key], source[key]);
      } else {
        Object.assign(mergedOutput, { [key]: source[key] });
      }
    });
    return mergedOutput;
  } else if (Array.isArray(target) && Array.isArray(source)) {
    return deepMergeArray(target, source);
  }
  return target;
}

async function saveInlineSnapshots(snapshots) {
  const MagicString = (await import('./chunk-magic-string.d5e0e473.js')).default;
  const files = new Set(snapshots.map((i) => i.file));
  await Promise.all(Array.from(files).map(async (file) => {
    const map = await rpc().getSourceMap(file);
    const snaps = snapshots.filter((i) => i.file === file);
    const code = await promises.readFile(file, "utf8");
    const s = new MagicString(code);
    for (const snap of snaps) {
      const pos = await getOriginalPos(map, snap);
      const index = posToNumber(code, pos);
      replaceInlineSnap(code, s, index, snap.snapshot);
    }
    const transformed = s.toString();
    if (transformed !== code)
      await promises.writeFile(file, transformed, "utf-8");
  }));
}
const startObjectRegex = /(?:toMatchInlineSnapshot|toThrowErrorMatchingInlineSnapshot)\s*\(\s*({)/m;
function replaceObjectSnap(code, s, index, newSnap) {
  code = code.slice(index);
  const startMatch = startObjectRegex.exec(code);
  if (!startMatch)
    return false;
  code = code.slice(startMatch.index);
  const charIndex = getCallLastIndex(code);
  if (charIndex === null)
    return false;
  s.appendLeft(index + startMatch.index + charIndex, `, ${prepareSnapString(newSnap, code, index)}`);
  return true;
}
function prepareSnapString(snap, source, index) {
  const lineIndex = numberToPos(source, index).line;
  const line = source.split(lineSplitRE)[lineIndex - 1];
  const indent = line.match(/^\s*/)[0] || "";
  const indentNext = indent.includes("	") ? `${indent}	` : `${indent}  `;
  const lines = snap.trim().replace(/\\/g, "\\\\").replace(/\$/g, "\\$").split(/\n/g);
  const isOneline = lines.length <= 1;
  const quote = isOneline ? "'" : "`";
  if (isOneline)
    return `'${lines.join("\n").replace(/'/g, "\\'")}'`;
  else
    return `${quote}
${lines.map((i) => i ? indentNext + i : "").join("\n").replace(/`/g, "\\`")}
${indent}${quote}`;
}
const startRegex = /(?:toMatchInlineSnapshot|toThrowErrorMatchingInlineSnapshot)\s*\(\s*[\w_$]*(['"`\)])/m;
function replaceInlineSnap(code, s, index, newSnap) {
  const startMatch = startRegex.exec(code.slice(index));
  if (!startMatch)
    return replaceObjectSnap(code, s, index, newSnap);
  const quote = startMatch[1];
  const startIndex = index + startMatch.index + startMatch[0].length;
  const snapString = prepareSnapString(newSnap, code, index);
  if (quote === ")") {
    s.appendRight(startIndex - 1, snapString);
    return true;
  }
  const quoteEndRE = new RegExp(`(?:^|[^\\\\])${quote}`);
  const endMatch = quoteEndRE.exec(code.slice(startIndex));
  if (!endMatch)
    return false;
  const endIndex = startIndex + endMatch.index + endMatch[0].length;
  s.overwrite(startIndex - 1, endIndex, snapString);
  return true;
}
const INDENTATION_REGEX = /^([^\S\n]*)\S/m;
function stripSnapshotIndentation(inlineSnapshot) {
  const match = inlineSnapshot.match(INDENTATION_REGEX);
  if (!match || !match[1]) {
    return inlineSnapshot;
  }
  const indentation = match[1];
  const lines = inlineSnapshot.split(/\n/g);
  if (lines.length <= 2) {
    return inlineSnapshot;
  }
  if (lines[0].trim() !== "" || lines[lines.length - 1].trim() !== "") {
    return inlineSnapshot;
  }
  for (let i = 1; i < lines.length - 1; i++) {
    if (lines[i] !== "") {
      if (lines[i].indexOf(indentation) !== 0) {
        return inlineSnapshot;
      }
      lines[i] = lines[i].substring(indentation.length);
    }
  }
  lines[lines.length - 1] = "";
  inlineSnapshot = lines.join("\n");
  return inlineSnapshot;
}

var __defProp$3 = Object.defineProperty;
var __getOwnPropSymbols$3 = Object.getOwnPropertySymbols;
var __hasOwnProp$3 = Object.prototype.hasOwnProperty;
var __propIsEnum$3 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$3 = (obj, key, value) => key in obj ? __defProp$3(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$3 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$3.call(b, prop))
      __defNormalProp$3(a, prop, b[prop]);
  if (__getOwnPropSymbols$3)
    for (var prop of __getOwnPropSymbols$3(b)) {
      if (__propIsEnum$3.call(b, prop))
        __defNormalProp$3(a, prop, b[prop]);
    }
  return a;
};
class SnapshotState {
  constructor(testFilePath, snapshotPath, options) {
    this.testFilePath = testFilePath;
    this.snapshotPath = snapshotPath;
    const { data, dirty } = getSnapshotData(this.snapshotPath, options.updateSnapshot);
    this._initialData = data;
    this._snapshotData = data;
    this._dirty = dirty;
    this._inlineSnapshots = [];
    this._uncheckedKeys = new Set(Object.keys(this._snapshotData));
    this._counters = /* @__PURE__ */ new Map();
    this.expand = options.expand || false;
    this.added = 0;
    this.matched = 0;
    this.unmatched = 0;
    this._updateSnapshot = options.updateSnapshot;
    this.updated = 0;
    this._snapshotFormat = __spreadValues$3({
      printBasicPrototype: false
    }, options.snapshotFormat);
  }
  markSnapshotsAsCheckedForTest(testName) {
    this._uncheckedKeys.forEach((uncheckedKey) => {
      if (keyToTestName(uncheckedKey) === testName)
        this._uncheckedKeys.delete(uncheckedKey);
    });
  }
  _getInlineSnapshotStack(stacks) {
    const promiseIndex = stacks.findIndex((i) => i.method.match(/__VITEST_(RESOLVES|REJECTS)__/));
    if (promiseIndex !== -1)
      return stacks[promiseIndex + 3];
    const stackIndex = stacks.findIndex((i) => i.method.includes("__VITEST_INLINE_SNAPSHOT__"));
    return stackIndex !== -1 ? stacks[stackIndex + 2] : null;
  }
  _addSnapshot(key, receivedSerialized, options) {
    this._dirty = true;
    if (options.isInline) {
      const error = options.error || new Error("Unknown error");
      const stacks = parseStacktrace(error, true);
      stacks.forEach((i) => i.file = slash(i.file));
      const stack = this._getInlineSnapshotStack(stacks);
      if (!stack) {
        throw new Error(`Vitest: Couldn't infer stack frame for inline snapshot.
${JSON.stringify(stacks)}`);
      }
      this._inlineSnapshots.push(__spreadValues$3({
        snapshot: receivedSerialized
      }, stack));
    } else {
      this._snapshotData[key] = receivedSerialized;
    }
  }
  clear() {
    this._snapshotData = this._initialData;
    this._counters = /* @__PURE__ */ new Map();
    this.added = 0;
    this.matched = 0;
    this.unmatched = 0;
    this.updated = 0;
    this._dirty = false;
  }
  async save() {
    const hasExternalSnapshots = Object.keys(this._snapshotData).length;
    const hasInlineSnapshots = this._inlineSnapshots.length;
    const isEmpty = !hasExternalSnapshots && !hasInlineSnapshots;
    const status = {
      deleted: false,
      saved: false
    };
    if ((this._dirty || this._uncheckedKeys.size) && !isEmpty) {
      if (hasExternalSnapshots)
        await saveSnapshotFile(this._snapshotData, this.snapshotPath);
      if (hasInlineSnapshots)
        await saveInlineSnapshots(this._inlineSnapshots);
      status.saved = true;
    } else if (!hasExternalSnapshots && fs.existsSync(this.snapshotPath)) {
      if (this._updateSnapshot === "all")
        fs.unlinkSync(this.snapshotPath);
      status.deleted = true;
    }
    return status;
  }
  getUncheckedCount() {
    return this._uncheckedKeys.size || 0;
  }
  getUncheckedKeys() {
    return Array.from(this._uncheckedKeys);
  }
  removeUncheckedKeys() {
    if (this._updateSnapshot === "all" && this._uncheckedKeys.size) {
      this._dirty = true;
      this._uncheckedKeys.forEach((key) => delete this._snapshotData[key]);
      this._uncheckedKeys.clear();
    }
  }
  match({
    testName,
    received,
    key,
    inlineSnapshot,
    isInline,
    error
  }) {
    this._counters.set(testName, (this._counters.get(testName) || 0) + 1);
    const count = Number(this._counters.get(testName));
    if (!key)
      key = testNameToKey(testName, count);
    if (!(isInline && this._snapshotData[key] !== void 0))
      this._uncheckedKeys.delete(key);
    const receivedSerialized = addExtraLineBreaks(serialize(received, void 0, this._snapshotFormat));
    const expected = isInline ? inlineSnapshot : this._snapshotData[key];
    const expectedTrimmed = prepareExpected(expected);
    const pass = expectedTrimmed === prepareExpected(receivedSerialized);
    const hasSnapshot = expected !== void 0;
    const snapshotIsPersisted = isInline || fs.existsSync(this.snapshotPath);
    if (pass && !isInline) {
      this._snapshotData[key] = receivedSerialized;
    }
    if (hasSnapshot && this._updateSnapshot === "all" || (!hasSnapshot || !snapshotIsPersisted) && (this._updateSnapshot === "new" || this._updateSnapshot === "all")) {
      if (this._updateSnapshot === "all") {
        if (!pass) {
          if (hasSnapshot)
            this.updated++;
          else
            this.added++;
          this._addSnapshot(key, receivedSerialized, { error, isInline });
        } else {
          this.matched++;
        }
      } else {
        this._addSnapshot(key, receivedSerialized, { error, isInline });
        this.added++;
      }
      return {
        actual: "",
        count,
        expected: "",
        key,
        pass: true
      };
    } else {
      if (!pass) {
        this.unmatched++;
        return {
          actual: removeExtraLineBreaks(receivedSerialized),
          count,
          expected: expectedTrimmed !== void 0 ? removeExtraLineBreaks(expectedTrimmed) : void 0,
          key,
          pass: false
        };
      } else {
        this.matched++;
        return {
          actual: "",
          count,
          expected: "",
          key,
          pass: true
        };
      }
    }
  }
  async pack() {
    const snapshot = {
      filepath: this.testFilePath,
      added: 0,
      fileDeleted: false,
      matched: 0,
      unchecked: 0,
      uncheckedKeys: [],
      unmatched: 0,
      updated: 0
    };
    const uncheckedCount = this.getUncheckedCount();
    const uncheckedKeys = this.getUncheckedKeys();
    if (uncheckedCount)
      this.removeUncheckedKeys();
    const status = await this.save();
    snapshot.fileDeleted = status.deleted;
    snapshot.added = this.added;
    snapshot.matched = this.matched;
    snapshot.unmatched = this.unmatched;
    snapshot.updated = this.updated;
    snapshot.unchecked = !status.deleted ? uncheckedCount : 0;
    snapshot.uncheckedKeys = Array.from(uncheckedKeys);
    return snapshot;
  }
}

class SnapshotClient {
  constructor() {
    this.snapshotStateMap = /* @__PURE__ */ new Map();
  }
  async setTest(test) {
    var _a;
    this.test = test;
    if (((_a = this.snapshotState) == null ? void 0 : _a.testFilePath) !== this.test.file.filepath) {
      this.saveCurrent();
      const filePath = this.test.file.filepath;
      if (!this.getSnapshotState(test)) {
        this.snapshotStateMap.set(filePath, new SnapshotState(filePath, await rpc().resolveSnapshotPath(filePath), getWorkerState().config.snapshotOptions));
      }
      this.snapshotState = this.getSnapshotState(test);
    }
  }
  getSnapshotState(test) {
    return this.snapshotStateMap.get(test.file.filepath);
  }
  clearTest() {
    this.test = void 0;
  }
  assert(options) {
    const {
      test = this.test,
      message,
      isInline = false,
      properties,
      inlineSnapshot,
      error,
      errorMessage
    } = options;
    let { received } = options;
    if (!test)
      throw new Error("Snapshot cannot be used outside of test");
    if (typeof properties === "object") {
      if (typeof received !== "object" || !received)
        throw new Error("Received value must be an object when the matcher has properties");
      try {
        const pass2 = equals(received, properties, [iterableEquality, subsetEquality]);
        if (!pass2)
          expect$1(received).equals(properties);
        else
          received = deepMergeSnapshot(received, properties);
      } catch (err) {
        err.message = errorMessage || "Snapshot mismatched";
        throw err;
      }
    }
    const testName = [
      ...getNames(test).slice(1),
      ...message ? [message] : []
    ].join(" > ");
    const snapshotState = this.getSnapshotState(test);
    const { actual, expected, key, pass } = snapshotState.match({
      testName,
      received,
      isInline,
      error,
      inlineSnapshot
    });
    if (!pass) {
      try {
        expect$1(actual.trim()).equals(expected ? expected.trim() : "");
      } catch (error2) {
        error2.message = errorMessage || `Snapshot \`${key || "unknown"}\` mismatched`;
        throw error2;
      }
    }
  }
  async saveCurrent() {
    if (!this.snapshotState)
      return;
    const result = await this.snapshotState.pack();
    await rpc().snapshotSaved(result);
    this.snapshotState = void 0;
  }
  clear() {
    this.snapshotStateMap.clear();
  }
}

let _client;
function getSnapshotClient() {
  if (!_client)
    _client = new SnapshotClient();
  return _client;
}
const getErrorString = (expected) => {
  try {
    expected();
  } catch (e) {
    if (e instanceof Error)
      return e.message;
    return e;
  }
  throw new Error("snapshot function didn't threw");
};
const SnapshotPlugin = (chai, utils) => {
  for (const key of ["matchSnapshot", "toMatchSnapshot"]) {
    utils.addMethod(chai.Assertion.prototype, key, function(properties, message) {
      const expected = utils.flag(this, "object");
      const test = utils.flag(this, "vitest-test");
      if (typeof properties === "string" && typeof message === "undefined") {
        message = properties;
        properties = void 0;
      }
      const errorMessage = utils.flag(this, "message");
      getSnapshotClient().assert({
        received: expected,
        test,
        message,
        isInline: false,
        properties,
        errorMessage
      });
    });
  }
  utils.addMethod(chai.Assertion.prototype, "toMatchInlineSnapshot", function __VITEST_INLINE_SNAPSHOT__(properties, inlineSnapshot, message) {
    const expected = utils.flag(this, "object");
    const error = utils.flag(this, "error");
    const test = utils.flag(this, "vitest-test");
    if (typeof properties === "string") {
      message = inlineSnapshot;
      inlineSnapshot = properties;
      properties = void 0;
    }
    if (inlineSnapshot)
      inlineSnapshot = stripSnapshotIndentation(inlineSnapshot);
    const errorMessage = utils.flag(this, "message");
    getSnapshotClient().assert({
      received: expected,
      test,
      message,
      isInline: true,
      properties,
      inlineSnapshot,
      error,
      errorMessage
    });
  });
  utils.addMethod(chai.Assertion.prototype, "toThrowErrorMatchingSnapshot", function(message) {
    const expected = utils.flag(this, "object");
    const test = utils.flag(this, "vitest-test");
    const errorMessage = utils.flag(this, "message");
    getSnapshotClient().assert({
      received: getErrorString(expected),
      test,
      message,
      errorMessage
    });
  });
  utils.addMethod(chai.Assertion.prototype, "toThrowErrorMatchingInlineSnapshot", function __VITEST_INLINE_SNAPSHOT__(inlineSnapshot, message) {
    const expected = utils.flag(this, "object");
    const error = utils.flag(this, "error");
    const test = utils.flag(this, "vitest-test");
    const errorMessage = utils.flag(this, "message");
    getSnapshotClient().assert({
      received: getErrorString(expected),
      test,
      message,
      inlineSnapshot,
      isInline: true,
      error,
      errorMessage
    });
  });
};

function getRunningMode() {
  return process.env.VITEST_MODE === "WATCH" ? "watch" : "run";
}
function isWatchMode() {
  return getRunningMode() === "watch";
}
function toString(value) {
  try {
    return `${value}`;
  } catch (_error) {
    return "unknown";
  }
}

const MATCHERS_OBJECT = Symbol.for("matchers-object");
if (!Object.prototype.hasOwnProperty.call(global, MATCHERS_OBJECT)) {
  const defaultState = {
    assertionCalls: 0,
    isExpectingAssertions: false,
    isExpectingAssertionsError: null,
    expectedAssertionsNumber: null,
    expectedAssertionsNumberErrorGen: null
  };
  Object.defineProperty(globalThis, MATCHERS_OBJECT, {
    value: {
      state: defaultState
    }
  });
}
const getState = () => globalThis[MATCHERS_OBJECT].state;
const setState = (state) => {
  Object.assign(globalThis[MATCHERS_OBJECT].state, state);
};
const JestChaiExpect = (chai, utils) => {
  function def(name, fn) {
    const addMethod = (n) => {
      utils.addMethod(chai.Assertion.prototype, n, fn);
    };
    if (Array.isArray(name))
      name.forEach((n) => addMethod(n));
    else
      addMethod(name);
  }
  ["throw", "throws", "Throw"].forEach((m) => {
    utils.overwriteMethod(chai.Assertion.prototype, m, (_super) => {
      return function(...args) {
        const promise = utils.flag(this, "promise");
        const object = utils.flag(this, "object");
        if (promise === "rejects") {
          utils.flag(this, "object", () => {
            throw object;
          });
        } else if (promise === "resolves") {
          utils.flag(this, "object", () => {
            return object;
          });
        }
        _super.apply(this, args);
      };
    });
  });
  def("withTest", function(test) {
    utils.flag(this, "vitest-test", test);
    return this;
  });
  def("toEqual", function(expected) {
    const actual = utils.flag(this, "object");
    const equal = equals(actual, expected, [iterableEquality]);
    return this.assert(equal, "expected #{this} to deeply equal #{exp}", "expected #{this} to not deeply equal #{exp}", expected, actual);
  });
  def("toStrictEqual", function(expected) {
    const obj = utils.flag(this, "object");
    const equal = equals(obj, expected, [
      iterableEquality,
      typeEquality,
      sparseArrayEquality,
      arrayBufferEquality
    ], true);
    return this.assert(equal, "expected #{this} to strictly equal #{exp}", "expected #{this} to not strictly equal #{exp}", expected, obj);
  });
  def("toBe", function(expected) {
    const actual = this._obj;
    return this.assert(Object.is(actual, expected), "expected #{this} to be #{exp} // Object.is equality", "expected #{this} not to be #{exp} // Object.is equality", expected, actual);
  });
  def("toMatchObject", function(expected) {
    const actual = this._obj;
    return this.assert(equals(actual, expected, [iterableEquality, subsetEquality]), "expected #{this} to match object #{exp}", "expected #{this} to not match object #{exp}", expected, actual);
  });
  def("toMatch", function(expected) {
    if (typeof expected === "string")
      return this.include(expected);
    else
      return this.match(expected);
  });
  def("toContain", function(item) {
    return this.contain(item);
  });
  def("toContainEqual", function(expected) {
    const obj = utils.flag(this, "object");
    const index = Array.from(obj).findIndex((item) => {
      return equals(item, expected);
    });
    this.assert(index !== -1, "expected #{this} to deep equally contain #{exp}", "expected #{this} to not deep equally contain #{exp}", expected);
  });
  def("toBeTruthy", function() {
    const obj = utils.flag(this, "object");
    this.assert(Boolean(obj), "expected #{this} to be truthy", "expected #{this} to not be truthy", obj);
  });
  def("toBeFalsy", function() {
    const obj = utils.flag(this, "object");
    this.assert(!obj, "expected #{this} to be falsy", "expected #{this} to not be falsy", obj);
  });
  def("toBeGreaterThan", function(expected) {
    const actual = this._obj;
    assertTypes(actual, "actual", ["number", "bigint"]);
    assertTypes(expected, "expected", ["number", "bigint"]);
    return this.assert(actual > expected, `expected ${actual} to be greater than ${expected}`, `expected ${actual} to be not greater than ${expected}`, actual, expected);
  });
  def("toBeGreaterThanOrEqual", function(expected) {
    const actual = this._obj;
    assertTypes(actual, "actual", ["number", "bigint"]);
    assertTypes(expected, "expected", ["number", "bigint"]);
    return this.assert(actual >= expected, `expected ${actual} to be greater than or equal to ${expected}`, `expected ${actual} to be not greater than or equal to ${expected}`, actual, expected);
  });
  def("toBeLessThan", function(expected) {
    const actual = this._obj;
    assertTypes(actual, "actual", ["number", "bigint"]);
    assertTypes(expected, "expected", ["number", "bigint"]);
    return this.assert(actual < expected, `expected ${actual} to be less than ${expected}`, `expected ${actual} to be not less than ${expected}`, actual, expected);
  });
  def("toBeLessThanOrEqual", function(expected) {
    const actual = this._obj;
    assertTypes(actual, "actual", ["number", "bigint"]);
    assertTypes(expected, "expected", ["number", "bigint"]);
    return this.assert(actual <= expected, `expected ${actual} to be less than or equal to ${expected}`, `expected ${actual} to be not less than or equal to ${expected}`, actual, expected);
  });
  def("toBeNaN", function() {
    return this.be.NaN;
  });
  def("toBeUndefined", function() {
    return this.be.undefined;
  });
  def("toBeNull", function() {
    return this.be.null;
  });
  def("toBeDefined", function() {
    const negate = utils.flag(this, "negate");
    utils.flag(this, "negate", false);
    if (negate)
      return this.be.undefined;
    return this.not.be.undefined;
  });
  def("toBeTypeOf", function(expected) {
    const actual = typeof this._obj;
    const equal = expected === actual;
    return this.assert(equal, "expected #{this} to be type of #{exp}", "expected #{this} not to be type of #{exp}", expected, actual);
  });
  def("toBeInstanceOf", function(obj) {
    return this.instanceOf(obj);
  });
  def("toHaveLength", function(length) {
    return this.have.length(length);
  });
  def("toHaveProperty", function(...args) {
    if (Array.isArray(args[0]))
      args[0] = args[0].map((key) => key.replace(/([.[\]])/g, "\\$1")).join(".");
    return this.have.deep.nested.property(...args);
  });
  def("toBeCloseTo", function(received, precision = 2) {
    const expected = this._obj;
    let pass = false;
    let expectedDiff = 0;
    let receivedDiff = 0;
    if (received === Infinity && expected === Infinity) {
      pass = true;
    } else if (received === -Infinity && expected === -Infinity) {
      pass = true;
    } else {
      expectedDiff = Math.pow(10, -precision) / 2;
      receivedDiff = Math.abs(expected - received);
      pass = receivedDiff < expectedDiff;
    }
    return this.assert(pass, `expected #{this} to be close to #{exp}, received difference is ${receivedDiff}, but expected ${expectedDiff}`, `expected #{this} to not be close to #{exp}, received difference is ${receivedDiff}, but expected ${expectedDiff}`, received, expected);
  });
  const assertIsMock = (assertion) => {
    if (!isMockFunction(assertion._obj))
      throw new TypeError(`${utils.inspect(assertion._obj)} is not a spy or a call to a spy!`);
  };
  const getSpy = (assertion) => {
    assertIsMock(assertion);
    return assertion._obj;
  };
  const ordinalOf = (i) => {
    const j = i % 10;
    const k = i % 100;
    if (j === 1 && k !== 11)
      return `${i}st`;
    if (j === 2 && k !== 12)
      return `${i}nd`;
    if (j === 3 && k !== 13)
      return `${i}rd`;
    return `${i}th`;
  };
  const formatCalls = (spy, msg, actualCall) => {
    msg += picocolors.exports.gray(`

Received: 
${spy.mock.calls.map((callArg, i) => {
      let methodCall = picocolors.exports.bold(`    ${ordinalOf(i + 1)} ${spy.getMockName()} call:

`);
      if (actualCall)
        methodCall += unifiedDiff(stringify(callArg), stringify(actualCall), { showLegend: false });
      else
        methodCall += stringify(callArg).split("\n").map((line) => `    ${line}`).join("\n");
      methodCall += "\n";
      return methodCall;
    }).join("\n")}`);
    msg += picocolors.exports.gray(`

Number of calls: ${picocolors.exports.bold(spy.mock.calls.length)}
`);
    return msg;
  };
  def(["toHaveBeenCalledTimes", "toBeCalledTimes"], function(number) {
    const spy = getSpy(this);
    const spyName = spy.getMockName();
    const callCount = spy.mock.calls.length;
    return this.assert(callCount === number, `expected "${spyName}" to be called #{exp} times`, `expected "${spyName}" to not be called #{exp} times`, number, callCount);
  });
  def("toHaveBeenCalledOnce", function() {
    const spy = getSpy(this);
    const spyName = spy.getMockName();
    const callCount = spy.mock.calls.length;
    return this.assert(callCount === 1, `expected "${spyName}" to be called once`, `expected "${spyName}" to not be called once`, 1, callCount);
  });
  def(["toHaveBeenCalled", "toBeCalled"], function() {
    const spy = getSpy(this);
    const spyName = spy.getMockName();
    const called = spy.mock.calls.length > 0;
    const isNot = utils.flag(this, "negate");
    let msg = utils.getMessage(this, [
      called,
      `expected "${spyName}" to be called at least once`,
      `expected "${spyName}" to not be called at all`,
      true,
      called
    ]);
    if (called && isNot)
      msg += formatCalls(spy, msg);
    if (called && isNot || !called && !isNot) {
      const err = new Error(msg);
      err.name = "AssertionError";
      throw err;
    }
  });
  def(["toHaveBeenCalledWith", "toBeCalledWith"], function(...args) {
    const spy = getSpy(this);
    const spyName = spy.getMockName();
    const pass = spy.mock.calls.some((callArg) => equals(callArg, args, [iterableEquality]));
    const isNot = utils.flag(this, "negate");
    let msg = utils.getMessage(this, [
      pass,
      `expected "${spyName}" to be called with arguments: #{exp}`,
      `expected "${spyName}" to not be called with arguments: #{exp}`,
      args
    ]);
    if (pass && isNot || !pass && !isNot) {
      msg += formatCalls(spy, msg, args);
      const err = new Error(msg);
      err.name = "AssertionError";
      throw err;
    }
  });
  def(["toHaveBeenNthCalledWith", "nthCalledWith"], function(times, ...args) {
    const spy = getSpy(this);
    const spyName = spy.getMockName();
    const nthCall = spy.mock.calls[times - 1];
    this.assert(equals(nthCall, args, [iterableEquality]), `expected ${ordinalOf(times)} "${spyName}" call to have been called with #{exp}`, `expected ${ordinalOf(times)} "${spyName}" call to not have been called with #{exp}`, args, nthCall);
  });
  def(["toHaveBeenLastCalledWith", "lastCalledWith"], function(...args) {
    const spy = getSpy(this);
    const spyName = spy.getMockName();
    const lastCall = spy.mock.calls[spy.calls.length - 1];
    this.assert(equals(lastCall, args, [iterableEquality]), `expected last "${spyName}" call to have been called with #{exp}`, `expected last "${spyName}" call to not have been called with #{exp}`, args, lastCall);
  });
  def(["toThrow", "toThrowError"], function(expected) {
    if (typeof expected === "string" || typeof expected === "undefined" || expected instanceof RegExp)
      return this.throws(expected);
    const obj = this._obj;
    const promise = utils.flag(this, "promise");
    let thrown = null;
    if (promise) {
      thrown = obj;
    } else {
      try {
        obj();
      } catch (err) {
        thrown = err;
      }
    }
    if (typeof expected === "function") {
      const name = expected.name || expected.prototype.constructor.name;
      return this.assert(thrown && thrown instanceof expected, `expected error to be instance of ${name}`, `expected error not to be instance of ${name}`, expected, thrown);
    }
    if (expected instanceof Error) {
      return this.assert(thrown && expected.message === thrown.message, `expected error to have message: ${expected.message}`, `expected error not to have message: ${expected.message}`, expected.message, thrown && thrown.message);
    }
    if (typeof expected.asymmetricMatch === "function") {
      const matcher = expected;
      return this.assert(thrown && matcher.asymmetricMatch(thrown), "expected error to match asymmetric matcher", "expected error not to match asymmetric matcher", matcher.toString(), thrown);
    }
    throw new Error(`"toThrow" expects string, RegExp, function, Error instance or asymmetric matcher, got "${typeof expected}"`);
  });
  def(["toHaveReturned", "toReturn"], function() {
    const spy = getSpy(this);
    const spyName = spy.getMockName();
    const calledAndNotThrew = spy.mock.calls.length > 0 && !spy.mock.results.some(({ type }) => type === "throw");
    this.assert(calledAndNotThrew, `expected "${spyName}" to be successfully called at least once`, `expected "${spyName}" to not be successfully called`, calledAndNotThrew, !calledAndNotThrew);
  });
  def(["toHaveReturnedTimes", "toReturnTimes"], function(times) {
    const spy = getSpy(this);
    const spyName = spy.getMockName();
    const successfulReturns = spy.mock.results.reduce((success, { type }) => type === "throw" ? success : ++success, 0);
    this.assert(successfulReturns === times, `expected "${spyName}" to be successfully called ${times} times`, `expected "${spyName}" to not be successfully called ${times} times`, `expected number of returns: ${times}`, `received number of returns: ${successfulReturns}`);
  });
  def(["toHaveReturnedWith", "toReturnWith"], function(value) {
    const spy = getSpy(this);
    const spyName = spy.getMockName();
    const pass = spy.mock.results.some(({ type, value: result }) => type === "return" && equals(value, result));
    this.assert(pass, `expected "${spyName}" to be successfully called with #{exp}`, `expected "${spyName}" to not be successfully called with #{exp}`, value);
  });
  def(["toHaveLastReturnedWith", "lastReturnedWith"], function(value) {
    const spy = getSpy(this);
    const spyName = spy.getMockName();
    const { value: lastResult } = spy.mock.results[spy.returns.length - 1];
    const pass = equals(lastResult, value);
    this.assert(pass, `expected last "${spyName}" call to return #{exp}`, `expected last "${spyName}" call to not return #{exp}`, value, lastResult);
  });
  def(["toHaveNthReturnedWith", "nthReturnedWith"], function(nthCall, value) {
    const spy = getSpy(this);
    const spyName = spy.getMockName();
    const isNot = utils.flag(this, "negate");
    const { type: callType, value: callResult } = spy.mock.results[nthCall - 1];
    const ordinalCall = `${ordinalOf(nthCall)} call`;
    if (!isNot && callType === "throw")
      chai.assert.fail(`expected ${ordinalCall} to return #{exp}, but instead it threw an error`);
    const nthCallReturn = equals(callResult, value);
    this.assert(nthCallReturn, `expected ${ordinalCall} "${spyName}" call to return #{exp}`, `expected ${ordinalCall} "${spyName}" call to not return #{exp}`, value, callResult);
  });
  def("toSatisfy", function() {
    return this.be.satisfy;
  });
  utils.addProperty(chai.Assertion.prototype, "resolves", function __VITEST_RESOLVES__() {
    utils.flag(this, "promise", "resolves");
    utils.flag(this, "error", new Error("resolves"));
    const obj = utils.flag(this, "object");
    if (typeof (obj == null ? void 0 : obj.then) !== "function")
      throw new TypeError(`You must provide a Promise to expect() when using .resolves, not '${typeof obj}'.`);
    const proxy = new Proxy(this, {
      get: (target, key, receiver) => {
        const result = Reflect.get(target, key, receiver);
        if (typeof result !== "function")
          return result instanceof chai.Assertion ? proxy : result;
        return async (...args) => {
          return obj.then((value) => {
            utils.flag(this, "object", value);
            return result.call(this, ...args);
          }, (err) => {
            throw new Error(`promise rejected "${toString(err)}" instead of resolving`);
          });
        };
      }
    });
    return proxy;
  });
  utils.addProperty(chai.Assertion.prototype, "rejects", function __VITEST_REJECTS__() {
    utils.flag(this, "promise", "rejects");
    utils.flag(this, "error", new Error("rejects"));
    const obj = utils.flag(this, "object");
    const wrapper = typeof obj === "function" ? obj() : obj;
    if (typeof (wrapper == null ? void 0 : wrapper.then) !== "function")
      throw new TypeError(`You must provide a Promise to expect() when using .rejects, not '${typeof wrapper}'.`);
    const proxy = new Proxy(this, {
      get: (target, key, receiver) => {
        const result = Reflect.get(target, key, receiver);
        if (typeof result !== "function")
          return result instanceof chai.Assertion ? proxy : result;
        return async (...args) => {
          return wrapper.then((value) => {
            throw new Error(`promise resolved "${toString(value)}" instead of rejecting`);
          }, (err) => {
            utils.flag(this, "object", err);
            return result.call(this, ...args);
          });
        };
      }
    });
    return proxy;
  });
  utils.addMethod(chai.expect, "assertions", function assertions(expected) {
    const errorGen = () => new Error(`expected number of assertions to be ${expected}, but got ${getState().assertionCalls}`);
    if (Error.captureStackTrace)
      Error.captureStackTrace(errorGen(), assertions);
    setState({
      expectedAssertionsNumber: expected,
      expectedAssertionsNumberErrorGen: errorGen
    });
  });
  utils.addMethod(chai.expect, "hasAssertions", function hasAssertions() {
    const error = new Error("expected any number of assertion, but got none");
    if (Error.captureStackTrace)
      Error.captureStackTrace(error, hasAssertions);
    setState({
      isExpectingAssertions: true,
      isExpectingAssertionsError: error
    });
  });
  utils.addMethod(chai.expect, "addSnapshotSerializer", addSerializer);
};

var __defProp$2 = Object.defineProperty;
var __defProps$1 = Object.defineProperties;
var __getOwnPropDescs$1 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$2 = Object.getOwnPropertySymbols;
var __hasOwnProp$2 = Object.prototype.hasOwnProperty;
var __propIsEnum$2 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$2 = (obj, key, value) => key in obj ? __defProp$2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$2 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$2.call(b, prop))
      __defNormalProp$2(a, prop, b[prop]);
  if (__getOwnPropSymbols$2)
    for (var prop of __getOwnPropSymbols$2(b)) {
      if (__propIsEnum$2.call(b, prop))
        __defNormalProp$2(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$1 = (a, b) => __defProps$1(a, __getOwnPropDescs$1(b));
class AsymmetricMatcher {
  constructor(sample, inverse = false) {
    this.sample = sample;
    this.inverse = inverse;
    this.$$typeof = Symbol.for("jest.asymmetricMatcher");
  }
  getMatcherContext() {
    return __spreadProps$1(__spreadValues$2({}, getState()), {
      equals,
      isNot: this.inverse,
      utils: matcherUtils
    });
  }
}
class StringContaining extends AsymmetricMatcher {
  constructor(sample, inverse = false) {
    if (!isA("String", sample))
      throw new Error("Expected is not a string");
    super(sample, inverse);
  }
  asymmetricMatch(other) {
    const result = isA("String", other) && other.includes(this.sample);
    return this.inverse ? !result : result;
  }
  toString() {
    return `String${this.inverse ? "Not" : ""}Containing`;
  }
  getExpectedType() {
    return "string";
  }
}
class Anything extends AsymmetricMatcher {
  asymmetricMatch(other) {
    return other != null;
  }
  toString() {
    return "Anything";
  }
  toAsymmetricMatcher() {
    return "Anything";
  }
}
class ObjectContaining extends AsymmetricMatcher {
  constructor(sample, inverse = false) {
    super(sample, inverse);
  }
  getPrototype(obj) {
    if (Object.getPrototypeOf)
      return Object.getPrototypeOf(obj);
    if (obj.constructor.prototype === obj)
      return null;
    return obj.constructor.prototype;
  }
  hasProperty(obj, property) {
    if (!obj)
      return false;
    if (Object.prototype.hasOwnProperty.call(obj, property))
      return true;
    return this.hasProperty(this.getPrototype(obj), property);
  }
  asymmetricMatch(other) {
    if (typeof this.sample !== "object") {
      throw new TypeError(`You must provide an object to ${this.toString()}, not '${typeof this.sample}'.`);
    }
    let result = true;
    for (const property in this.sample) {
      if (!this.hasProperty(other, property) || !equals(this.sample[property], other[property])) {
        result = false;
        break;
      }
    }
    return this.inverse ? !result : result;
  }
  toString() {
    return `Object${this.inverse ? "Not" : ""}Containing`;
  }
  getExpectedType() {
    return "object";
  }
}
class ArrayContaining extends AsymmetricMatcher {
  constructor(sample, inverse = false) {
    super(sample, inverse);
  }
  asymmetricMatch(other) {
    if (!Array.isArray(this.sample)) {
      throw new TypeError(`You must provide an array to ${this.toString()}, not '${typeof this.sample}'.`);
    }
    const result = this.sample.length === 0 || Array.isArray(other) && this.sample.every((item) => other.some((another) => equals(item, another)));
    return this.inverse ? !result : result;
  }
  toString() {
    return `Array${this.inverse ? "Not" : ""}Containing`;
  }
  getExpectedType() {
    return "array";
  }
}
class Any extends AsymmetricMatcher {
  constructor(sample) {
    if (typeof sample === "undefined") {
      throw new TypeError("any() expects to be passed a constructor function. Please pass one or use anything() to match any object.");
    }
    super(sample);
  }
  fnNameFor(func) {
    if (func.name)
      return func.name;
    const functionToString = Function.prototype.toString;
    const matches = functionToString.call(func).match(/^(?:async)?\s*function\s*\*?\s*([\w$]+)\s*\(/);
    return matches ? matches[1] : "<anonymous>";
  }
  asymmetricMatch(other) {
    if (this.sample === String)
      return typeof other == "string" || other instanceof String;
    if (this.sample === Number)
      return typeof other == "number" || other instanceof Number;
    if (this.sample === Function)
      return typeof other == "function" || other instanceof Function;
    if (this.sample === Boolean)
      return typeof other == "boolean" || other instanceof Boolean;
    if (this.sample === BigInt)
      return typeof other == "bigint" || other instanceof BigInt;
    if (this.sample === Symbol)
      return typeof other == "symbol" || other instanceof Symbol;
    if (this.sample === Object)
      return typeof other == "object";
    return other instanceof this.sample;
  }
  toString() {
    return "Any";
  }
  getExpectedType() {
    if (this.sample === String)
      return "string";
    if (this.sample === Number)
      return "number";
    if (this.sample === Function)
      return "function";
    if (this.sample === Object)
      return "object";
    if (this.sample === Boolean)
      return "boolean";
    return this.fnNameFor(this.sample);
  }
  toAsymmetricMatcher() {
    return `Any<${this.fnNameFor(this.sample)}>`;
  }
}
class StringMatching extends AsymmetricMatcher {
  constructor(sample, inverse = false) {
    if (!isA("String", sample) && !isA("RegExp", sample))
      throw new Error("Expected is not a String or a RegExp");
    super(new RegExp(sample), inverse);
  }
  asymmetricMatch(other) {
    const result = isA("String", other) && this.sample.test(other);
    return this.inverse ? !result : result;
  }
  toString() {
    return `String${this.inverse ? "Not" : ""}Matching`;
  }
  getExpectedType() {
    return "string";
  }
}
const JestAsymmetricMatchers = (chai, utils) => {
  utils.addMethod(chai.expect, "anything", () => new Anything());
  utils.addMethod(chai.expect, "any", (expected) => new Any(expected));
  utils.addMethod(chai.expect, "stringContaining", (expected) => new StringContaining(expected));
  utils.addMethod(chai.expect, "objectContaining", (expected) => new ObjectContaining(expected));
  utils.addMethod(chai.expect, "arrayContaining", (expected) => new ArrayContaining(expected));
  utils.addMethod(chai.expect, "stringMatching", (expected) => new StringMatching(expected));
  chai.expect.not = {
    stringContaining: (expected) => new StringContaining(expected, true),
    objectContaining: (expected) => new ObjectContaining(expected, true),
    arrayContaining: (expected) => new ArrayContaining(expected, true),
    stringMatching: (expected) => new StringMatching(expected, true)
  };
};

var __defProp$1 = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
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
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
const isAsyncFunction = (fn) => typeof fn === "function" && fn[Symbol.toStringTag] === "AsyncFunction";
const getMatcherState = (assertion) => {
  const obj = assertion._obj;
  const isNot = util.flag(assertion, "negate");
  const promise = util.flag(assertion, "promise") || "";
  const jestUtils = __spreadProps(__spreadValues$1({}, matcherUtils), {
    iterableEquality,
    subsetEquality
  });
  const matcherState = __spreadProps(__spreadValues$1({}, getState()), {
    isNot,
    utils: jestUtils,
    promise,
    equals,
    suppressedErrors: []
  });
  return {
    state: matcherState,
    isNot,
    obj
  };
};
class JestExtendError extends Error {
  constructor(message, actual, expected) {
    super(message);
    this.actual = actual;
    this.expected = expected;
  }
}
function JestExtendPlugin(expect, matchers) {
  return (c, utils) => {
    Object.entries(matchers).forEach(([expectAssertionName, expectAssertion]) => {
      function expectSyncWrapper(...args) {
        const { state, isNot, obj } = getMatcherState(this);
        const { pass, message, actual, expected } = expectAssertion.call(state, obj, ...args);
        if (pass && isNot || !pass && !isNot)
          throw new JestExtendError(message(), actual, expected);
      }
      async function expectAsyncWrapper(...args) {
        const { state, isNot, obj } = getMatcherState(this);
        const { pass, message, actual, expected } = await expectAssertion.call(state, obj, ...args);
        if (pass && isNot || !pass && !isNot)
          throw new JestExtendError(message(), actual, expected);
      }
      const expectAssertionWrapper = isAsyncFunction(expectAssertion) ? expectAsyncWrapper : expectSyncWrapper;
      utils.addMethod(c.Assertion.prototype, expectAssertionName, expectAssertionWrapper);
      class CustomMatcher extends AsymmetricMatcher {
        constructor(inverse = false, ...sample) {
          super(sample, inverse);
        }
        asymmetricMatch(other) {
          const { pass } = expectAssertion.call(this.getMatcherContext(), other, ...this.sample);
          return this.inverse ? !pass : pass;
        }
        toString() {
          return `${this.inverse ? "not." : ""}${expectAssertionName}`;
        }
        getExpectedType() {
          return "any";
        }
        toAsymmetricMatcher() {
          return `${this.toString()}<${this.sample.map(String).join(", ")}>`;
        }
      }
      Object.defineProperty(expect, expectAssertionName, {
        configurable: true,
        enumerable: true,
        value: (...sample) => new CustomMatcher(false, ...sample),
        writable: true
      });
      Object.defineProperty(expect.not, expectAssertionName, {
        configurable: true,
        enumerable: true,
        value: (...sample) => new CustomMatcher(true, ...sample),
        writable: true
      });
    });
  };
}
const JestExtend = (chai, utils) => {
  utils.addMethod(chai.expect, "extend", (expect, expects) => {
    chai.use(JestExtendPlugin(expect, expects));
  });
};

chai$1.use(JestExtend);
chai$1.use(JestChaiExpect);
chai$1.use(Subset);
chai$1.use(SnapshotPlugin);
chai$1.use(JestAsymmetricMatchers);

function createExpect(test) {
  const expect2 = (value, message) => {
    const { assertionCalls } = getState();
    setState({ assertionCalls: assertionCalls + 1 });
    const assert2 = chai$1.expect(value, message);
    if (test)
      return assert2.withTest(test);
    else
      return assert2;
  };
  Object.assign(expect2, chai$1.expect);
  expect2.getState = getState;
  expect2.setState = setState;
  expect2.extend = (matchers) => chai$1.expect.extend(expect2, matchers);
  return expect2;
}
const expect = createExpect();

const collectorContext = {
  tasks: [],
  currentSuite: null
};
function collectTask(task) {
  var _a;
  (_a = collectorContext.currentSuite) == null ? void 0 : _a.tasks.push(task);
}
async function runWithSuite(suite, fn) {
  const prev = collectorContext.currentSuite;
  collectorContext.currentSuite = suite;
  await fn();
  collectorContext.currentSuite = prev;
}
function getDefaultTestTimeout() {
  return getWorkerState().config.testTimeout;
}
function getDefaultHookTimeout() {
  return getWorkerState().config.hookTimeout;
}
function withTimeout(fn, timeout = getDefaultTestTimeout(), isHook = false) {
  if (timeout <= 0 || timeout === Infinity)
    return fn;
  return (...args) => {
    return Promise.race([fn(...args), new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        clearTimeout(timer);
        reject(new Error(makeTimeoutMsg(isHook, timeout)));
      }, timeout);
      timer.unref();
    })]);
  };
}
function createTestContext(test) {
  const context = function() {
    throw new Error("done() callback is deprecated, use promise instead");
  };
  context.meta = test;
  let _expect;
  Object.defineProperty(context, "expect", {
    get() {
      if (!_expect)
        _expect = createExpect(test);
      return _expect;
    }
  });
  return context;
}
function makeTimeoutMsg(isHook, timeout) {
  return `${isHook ? "Hook" : "Test"} timed out in ${timeout}ms.
If this is a long-running test, pass a timeout value as the last argument or configure it globally with "${isHook ? "hookTimeout" : "testTimeout"}".`;
}

const fnMap = /* @__PURE__ */ new WeakMap();
const hooksMap = /* @__PURE__ */ new WeakMap();
function setFn(key, fn) {
  fnMap.set(key, fn);
}
function getFn(key) {
  return fnMap.get(key);
}
function setHooks(key, hooks) {
  hooksMap.set(key, hooks);
}
function getHooks(key) {
  return hooksMap.get(key);
}

const suite = createSuite();
const test = createTest(function(name, fn, timeout) {
  getCurrentSuite().test.fn.call(this, name, fn, timeout);
});
function formatTitle(template, items, idx) {
  if (template.includes("%#")) {
    template = template.replace(/%%/g, "__vitest_escaped_%__").replace(/%#/g, `${idx}`).replace(/__vitest_escaped_%__/g, "%%");
  }
  const count = template.split("%").length - 1;
  let formatted = format(template, ...items.slice(0, count));
  if (isObject(items[0])) {
    formatted = formatted.replace(/\$([$\w_]+)/g, (_, key) => {
      return items[0][key];
    });
  }
  return formatted;
}
const describe = suite;
const it = test;
const defaultSuite = suite("");
function clearCollectorContext() {
  collectorContext.tasks.length = 0;
  defaultSuite.clear();
  collectorContext.currentSuite = defaultSuite;
}
function getCurrentSuite() {
  return collectorContext.currentSuite || defaultSuite;
}
function createSuiteHooks() {
  return {
    beforeAll: [],
    afterAll: [],
    beforeEach: [],
    afterEach: []
  };
}
function createSuiteCollector(name, factory = () => {
}, mode, concurrent) {
  const tasks = [];
  const factoryQueue = [];
  let suite2;
  initSuite();
  const test2 = createTest(function(name2, fn = noop, timeout) {
    const mode2 = this.only ? "only" : this.skip ? "skip" : this.todo ? "todo" : "run";
    const test3 = {
      id: "",
      type: "test",
      name: name2,
      mode: mode2,
      suite: void 0,
      fails: this.fails
    };
    if (this.concurrent || concurrent)
      test3.concurrent = true;
    const context = createTestContext(test3);
    Object.defineProperty(test3, "context", {
      value: context,
      enumerable: false
    });
    setFn(test3, withTimeout(() => fn(context), timeout));
    tasks.push(test3);
  });
  const collector = {
    type: "collector",
    name,
    mode,
    test: test2,
    tasks,
    collect,
    clear,
    on: addHook
  };
  function addHook(name2, ...fn) {
    getHooks(suite2)[name2].push(...fn);
  }
  function initSuite() {
    suite2 = {
      id: "",
      type: "suite",
      name,
      mode,
      tasks: []
    };
    setHooks(suite2, createSuiteHooks());
  }
  function clear() {
    tasks.length = 0;
    factoryQueue.length = 0;
    initSuite();
  }
  async function collect(file) {
    factoryQueue.length = 0;
    if (factory)
      await runWithSuite(collector, () => factory(test2));
    const allChildren = [];
    for (const i of [...factoryQueue, ...tasks])
      allChildren.push(i.type === "collector" ? await i.collect(file) : i);
    suite2.file = file;
    suite2.tasks = allChildren;
    allChildren.forEach((task) => {
      task.suite = suite2;
      if (file)
        task.file = file;
    });
    return suite2;
  }
  collectTask(collector);
  return collector;
}
function createSuite() {
  const suite2 = createChainable(["concurrent", "skip", "only", "todo"], function(name, factory) {
    const mode = this.only ? "only" : this.skip ? "skip" : this.todo ? "todo" : "run";
    return createSuiteCollector(name, factory, mode, this.concurrent);
  });
  suite2.each = (cases) => {
    return (name, fn) => {
      cases.forEach((i, idx) => {
        const items = toArray(i);
        suite2(formatTitle(name, items, idx), () => fn(...items));
      });
    };
  };
  suite2.skipIf = (condition) => condition ? suite2.skip : suite2;
  suite2.runIf = (condition) => condition ? suite2 : suite2.skip;
  return suite2;
}
function createTest(fn) {
  const test2 = createChainable(["concurrent", "skip", "only", "todo", "fails"], fn);
  test2.each = (cases) => {
    return (name, fn2) => {
      cases.forEach((i, idx) => {
        const items = toArray(i);
        test2(formatTitle(name, items, idx), () => fn2(...items));
      });
    };
  };
  test2.skipIf = (condition) => condition ? test2.skip : test2;
  test2.runIf = (condition) => condition ? test2 : test2.skip;
  return test2;
}

const beforeAll = (fn, timeout) => getCurrentSuite().on("beforeAll", withTimeout(fn, timeout ?? getDefaultHookTimeout(), true));
const afterAll = (fn, timeout) => getCurrentSuite().on("afterAll", withTimeout(fn, timeout ?? getDefaultHookTimeout(), true));
const beforeEach = (fn, timeout) => getCurrentSuite().on("beforeEach", withTimeout(fn, timeout ?? getDefaultHookTimeout(), true));
const afterEach = (fn, timeout) => getCurrentSuite().on("afterEach", withTimeout(fn, timeout ?? getDefaultHookTimeout(), true));

function withCallback(fn) {
  return new Promise((resolve, reject) => fn((err) => {
    if (err)
      reject(err);
    else
      resolve();
  }));
}

const filesCount = /* @__PURE__ */ new Map();
const cache = /* @__PURE__ */ new Map();
function runOnce(fn, key) {
  const filepath = getWorkerState().filepath || "__unknown_files__";
  if (!key) {
    filesCount.set(filepath, (filesCount.get(filepath) || 0) + 1);
    key = String(filesCount.get(filepath));
  }
  const id = `${filepath}:${key}`;
  if (!cache.has(id))
    cache.set(id, fn());
  return cache.get(id);
}
function isFirstRun() {
  let firstRun = false;
  runOnce(() => {
    firstRun = true;
  }, "__vitest_first_run__");
  return firstRun;
}
function resetRunOnceCounter() {
  filesCount.clear();
}

/**
 * A reference to the global object
 *
 * @type {object} globalObject
 */
var globalObject$1;

/* istanbul ignore else */
if (typeof commonjsGlobal !== "undefined") {
    // Node
    globalObject$1 = commonjsGlobal;
} else if (typeof window !== "undefined") {
    // Browser
    globalObject$1 = window;
} else {
    // WebWorker
    globalObject$1 = self;
}

var global$1 = globalObject$1;

var call = Function.call;

var copyPrototype$6 = function copyPrototypeMethods(prototype) {
    // eslint-disable-next-line @sinonjs/no-prototype-methods/no-prototype-methods
    return Object.getOwnPropertyNames(prototype).reduce(function(result, name) {
        // ignore size because it throws from Map
        if (
            name !== "size" &&
            name !== "caller" &&
            name !== "callee" &&
            name !== "arguments" &&
            typeof prototype[name] === "function"
        ) {
            result[name] = call.bind(prototype[name]);
        }

        return result;
    }, Object.create(null));
};

var copyPrototype$5 = copyPrototype$6;

var array = copyPrototype$5(Array.prototype);

var every$1 = array.every;

/**
 * @private
 */
function hasCallsLeft(callMap, spy) {
    if (callMap[spy.id] === undefined) {
        callMap[spy.id] = 0;
    }

    return callMap[spy.id] < spy.callCount;
}

/**
 * @private
 */
function checkAdjacentCalls(callMap, spy, index, spies) {
    var calledBeforeNext = true;

    if (index !== spies.length - 1) {
        calledBeforeNext = spy.calledBefore(spies[index + 1]);
    }

    if (hasCallsLeft(callMap, spy) && calledBeforeNext) {
        callMap[spy.id] += 1;
        return true;
    }

    return false;
}

/**
 * A Sinon proxy object (fake, spy, stub)
 *
 * @typedef {object} SinonProxy
 * @property {Function} calledBefore - A method that determines if this proxy was called before another one
 * @property {string} id - Some id
 * @property {number} callCount - Number of times this proxy has been called
 */

/**
 * Returns true when the spies have been called in the order they were supplied in
 *
 * @param  {SinonProxy[] | SinonProxy} spies An array of proxies, or several proxies as arguments
 * @returns {boolean} true when spies are called in order, false otherwise
 */
function calledInOrder(spies) {
    var callMap = {};
    // eslint-disable-next-line no-underscore-dangle
    var _spies = arguments.length > 1 ? arguments : spies;

    return every$1(_spies, checkAdjacentCalls.bind(null, callMap));
}

var calledInOrder_1 = calledInOrder;

/**
 * Returns a display name for a function
 *
 * @param  {Function} func
 * @returns {string}
 */
var functionName$1 = function functionName(func) {
    if (!func) {
        return "";
    }

    try {
        return (
            func.displayName ||
            func.name ||
            // Use function decomposition as a last resort to get function
            // name. Does not rely on function decomposition to work - if it
            // doesn't debugging will be slightly less informative
            // (i.e. toString will say 'spy' rather than 'myFunc').
            (String(func).match(/function ([^\s(]+)/) || [])[1]
        );
    } catch (e) {
        // Stringify may fail and we might get an exception, as a last-last
        // resort fall back to empty string.
        return "";
    }
};

var functionName = functionName$1;

/**
 * Returns a display name for a value from a constructor
 *
 * @param  {object} value A value to examine
 * @returns {(string|null)} A string or null
 */
function className(value) {
    return (
        (value.constructor && value.constructor.name) ||
        // The next branch is for IE11 support only:
        // Because the name property is not set on the prototype
        // of the Function object, we finally try to grab the
        // name from its definition. This will never be reached
        // in node, so we are not able to test this properly.
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/name
        (typeof value.constructor === "function" &&
            /* istanbul ignore next */
            functionName(value.constructor)) ||
        null
    );
}

var className_1 = className;

var deprecated = {};

/* eslint-disable no-console */

(function (exports) {

	/**
	 * Returns a function that will invoke the supplied function and print a
	 * deprecation warning to the console each time it is called.
	 *
	 * @param  {Function} func
	 * @param  {string} msg
	 * @returns {Function}
	 */
	exports.wrap = function(func, msg) {
	    var wrapped = function() {
	        exports.printWarning(msg);
	        return func.apply(this, arguments);
	    };
	    if (func.prototype) {
	        wrapped.prototype = func.prototype;
	    }
	    return wrapped;
	};

	/**
	 * Returns a string which can be supplied to `wrap()` to notify the user that a
	 * particular part of the sinon API has been deprecated.
	 *
	 * @param  {string} packageName
	 * @param  {string} funcName
	 * @returns {string}
	 */
	exports.defaultMsg = function(packageName, funcName) {
	    return (
	        packageName +
	        "." +
	        funcName +
	        " is deprecated and will be removed from the public API in a future version of " +
	        packageName +
	        "."
	    );
	};

	/**
	 * Prints a warning on the console, when it exists
	 *
	 * @param  {string} msg
	 * @returns {undefined}
	 */
	exports.printWarning = function(msg) {
	    /* istanbul ignore next */
	    if (typeof process === "object" && process.emitWarning) {
	        // Emit Warnings in Node
	        process.emitWarning(msg);
	    } else if (console.info) {
	        console.info(msg);
	    } else {
	        console.log(msg);
	    }
	};
} (deprecated));

/**
 * Returns true when fn returns true for all members of obj.
 * This is an every implementation that works for all iterables
 *
 * @param  {object}   obj
 * @param  {Function} fn
 * @returns {boolean}
 */
var every = function every(obj, fn) {
    var pass = true;

    try {
        // eslint-disable-next-line @sinonjs/no-prototype-methods/no-prototype-methods
        obj.forEach(function() {
            if (!fn.apply(this, arguments)) {
                // Throwing an error is the only way to break `forEach`
                throw new Error();
            }
        });
    } catch (e) {
        pass = false;
    }

    return pass;
};

var sort = array.sort;
var slice = array.slice;

/**
 * @private
 */
function comparator(a, b) {
    // uuid, won't ever be equal
    var aCall = a.getCall(0);
    var bCall = b.getCall(0);
    var aId = (aCall && aCall.callId) || -1;
    var bId = (bCall && bCall.callId) || -1;

    return aId < bId ? -1 : 1;
}

/**
 * A Sinon proxy object (fake, spy, stub)
 *
 * @typedef {object} SinonProxy
 * @property {Function} getCall - A method that can return the first call
 */

/**
 * Sorts an array of SinonProxy instances (fake, spy, stub) by their first call
 *
 * @param  {SinonProxy[] | SinonProxy} spies
 * @returns {SinonProxy[]}
 */
function orderByFirstCall(spies) {
    return sort(slice(spies), comparator);
}

var orderByFirstCall_1 = orderByFirstCall;

var copyPrototype$4 = copyPrototype$6;

var _function = copyPrototype$4(Function.prototype);

var copyPrototype$3 = copyPrototype$6;

var map = copyPrototype$3(Map.prototype);

var copyPrototype$2 = copyPrototype$6;

var object = copyPrototype$2(Object.prototype);

var copyPrototype$1 = copyPrototype$6;

var set = copyPrototype$1(Set.prototype);

var copyPrototype = copyPrototype$6;

var string = copyPrototype(String.prototype);

var prototypes = {
    array: array,
    function: _function,
    map: map,
    object: object,
    set: set,
    string: string
};

var typeDetect = {exports: {}};

(function (module, exports) {
	(function (global, factory) {
		module.exports = factory() ;
	}(commonjsGlobal, (function () {
	/* !
	 * type-detect
	 * Copyright(c) 2013 jake luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */
	var promiseExists = typeof Promise === 'function';

	/* eslint-disable no-undef */
	var globalObject = typeof self === 'object' ? self : commonjsGlobal; // eslint-disable-line id-blacklist

	var symbolExists = typeof Symbol !== 'undefined';
	var mapExists = typeof Map !== 'undefined';
	var setExists = typeof Set !== 'undefined';
	var weakMapExists = typeof WeakMap !== 'undefined';
	var weakSetExists = typeof WeakSet !== 'undefined';
	var dataViewExists = typeof DataView !== 'undefined';
	var symbolIteratorExists = symbolExists && typeof Symbol.iterator !== 'undefined';
	var symbolToStringTagExists = symbolExists && typeof Symbol.toStringTag !== 'undefined';
	var setEntriesExists = setExists && typeof Set.prototype.entries === 'function';
	var mapEntriesExists = mapExists && typeof Map.prototype.entries === 'function';
	var setIteratorPrototype = setEntriesExists && Object.getPrototypeOf(new Set().entries());
	var mapIteratorPrototype = mapEntriesExists && Object.getPrototypeOf(new Map().entries());
	var arrayIteratorExists = symbolIteratorExists && typeof Array.prototype[Symbol.iterator] === 'function';
	var arrayIteratorPrototype = arrayIteratorExists && Object.getPrototypeOf([][Symbol.iterator]());
	var stringIteratorExists = symbolIteratorExists && typeof String.prototype[Symbol.iterator] === 'function';
	var stringIteratorPrototype = stringIteratorExists && Object.getPrototypeOf(''[Symbol.iterator]());
	var toStringLeftSliceLength = 8;
	var toStringRightSliceLength = -1;
	/**
	 * ### typeOf (obj)
	 *
	 * Uses `Object.prototype.toString` to determine the type of an object,
	 * normalising behaviour across engine versions & well optimised.
	 *
	 * @param {Mixed} object
	 * @return {String} object type
	 * @api public
	 */
	function typeDetect(obj) {
	  /* ! Speed optimisation
	   * Pre:
	   *   string literal     x 3,039,035 ops/sec ±1.62% (78 runs sampled)
	   *   boolean literal    x 1,424,138 ops/sec ±4.54% (75 runs sampled)
	   *   number literal     x 1,653,153 ops/sec ±1.91% (82 runs sampled)
	   *   undefined          x 9,978,660 ops/sec ±1.92% (75 runs sampled)
	   *   function           x 2,556,769 ops/sec ±1.73% (77 runs sampled)
	   * Post:
	   *   string literal     x 38,564,796 ops/sec ±1.15% (79 runs sampled)
	   *   boolean literal    x 31,148,940 ops/sec ±1.10% (79 runs sampled)
	   *   number literal     x 32,679,330 ops/sec ±1.90% (78 runs sampled)
	   *   undefined          x 32,363,368 ops/sec ±1.07% (82 runs sampled)
	   *   function           x 31,296,870 ops/sec ±0.96% (83 runs sampled)
	   */
	  var typeofObj = typeof obj;
	  if (typeofObj !== 'object') {
	    return typeofObj;
	  }

	  /* ! Speed optimisation
	   * Pre:
	   *   null               x 28,645,765 ops/sec ±1.17% (82 runs sampled)
	   * Post:
	   *   null               x 36,428,962 ops/sec ±1.37% (84 runs sampled)
	   */
	  if (obj === null) {
	    return 'null';
	  }

	  /* ! Spec Conformance
	   * Test: `Object.prototype.toString.call(window)``
	   *  - Node === "[object global]"
	   *  - Chrome === "[object global]"
	   *  - Firefox === "[object Window]"
	   *  - PhantomJS === "[object Window]"
	   *  - Safari === "[object Window]"
	   *  - IE 11 === "[object Window]"
	   *  - IE Edge === "[object Window]"
	   * Test: `Object.prototype.toString.call(this)``
	   *  - Chrome Worker === "[object global]"
	   *  - Firefox Worker === "[object DedicatedWorkerGlobalScope]"
	   *  - Safari Worker === "[object DedicatedWorkerGlobalScope]"
	   *  - IE 11 Worker === "[object WorkerGlobalScope]"
	   *  - IE Edge Worker === "[object WorkerGlobalScope]"
	   */
	  if (obj === globalObject) {
	    return 'global';
	  }

	  /* ! Speed optimisation
	   * Pre:
	   *   array literal      x 2,888,352 ops/sec ±0.67% (82 runs sampled)
	   * Post:
	   *   array literal      x 22,479,650 ops/sec ±0.96% (81 runs sampled)
	   */
	  if (
	    Array.isArray(obj) &&
	    (symbolToStringTagExists === false || !(Symbol.toStringTag in obj))
	  ) {
	    return 'Array';
	  }

	  // Not caching existence of `window` and related properties due to potential
	  // for `window` to be unset before tests in quasi-browser environments.
	  if (typeof window === 'object' && window !== null) {
	    /* ! Spec Conformance
	     * (https://html.spec.whatwg.org/multipage/browsers.html#location)
	     * WhatWG HTML$7.7.3 - The `Location` interface
	     * Test: `Object.prototype.toString.call(window.location)``
	     *  - IE <=11 === "[object Object]"
	     *  - IE Edge <=13 === "[object Object]"
	     */
	    if (typeof window.location === 'object' && obj === window.location) {
	      return 'Location';
	    }

	    /* ! Spec Conformance
	     * (https://html.spec.whatwg.org/#document)
	     * WhatWG HTML$3.1.1 - The `Document` object
	     * Note: Most browsers currently adher to the W3C DOM Level 2 spec
	     *       (https://www.w3.org/TR/DOM-Level-2-HTML/html.html#ID-26809268)
	     *       which suggests that browsers should use HTMLTableCellElement for
	     *       both TD and TH elements. WhatWG separates these.
	     *       WhatWG HTML states:
	     *         > For historical reasons, Window objects must also have a
	     *         > writable, configurable, non-enumerable property named
	     *         > HTMLDocument whose value is the Document interface object.
	     * Test: `Object.prototype.toString.call(document)``
	     *  - Chrome === "[object HTMLDocument]"
	     *  - Firefox === "[object HTMLDocument]"
	     *  - Safari === "[object HTMLDocument]"
	     *  - IE <=10 === "[object Document]"
	     *  - IE 11 === "[object HTMLDocument]"
	     *  - IE Edge <=13 === "[object HTMLDocument]"
	     */
	    if (typeof window.document === 'object' && obj === window.document) {
	      return 'Document';
	    }

	    if (typeof window.navigator === 'object') {
	      /* ! Spec Conformance
	       * (https://html.spec.whatwg.org/multipage/webappapis.html#mimetypearray)
	       * WhatWG HTML$8.6.1.5 - Plugins - Interface MimeTypeArray
	       * Test: `Object.prototype.toString.call(navigator.mimeTypes)``
	       *  - IE <=10 === "[object MSMimeTypesCollection]"
	       */
	      if (typeof window.navigator.mimeTypes === 'object' &&
	          obj === window.navigator.mimeTypes) {
	        return 'MimeTypeArray';
	      }

	      /* ! Spec Conformance
	       * (https://html.spec.whatwg.org/multipage/webappapis.html#pluginarray)
	       * WhatWG HTML$8.6.1.5 - Plugins - Interface PluginArray
	       * Test: `Object.prototype.toString.call(navigator.plugins)``
	       *  - IE <=10 === "[object MSPluginsCollection]"
	       */
	      if (typeof window.navigator.plugins === 'object' &&
	          obj === window.navigator.plugins) {
	        return 'PluginArray';
	      }
	    }

	    if ((typeof window.HTMLElement === 'function' ||
	        typeof window.HTMLElement === 'object') &&
	        obj instanceof window.HTMLElement) {
	      /* ! Spec Conformance
	      * (https://html.spec.whatwg.org/multipage/webappapis.html#pluginarray)
	      * WhatWG HTML$4.4.4 - The `blockquote` element - Interface `HTMLQuoteElement`
	      * Test: `Object.prototype.toString.call(document.createElement('blockquote'))``
	      *  - IE <=10 === "[object HTMLBlockElement]"
	      */
	      if (obj.tagName === 'BLOCKQUOTE') {
	        return 'HTMLQuoteElement';
	      }

	      /* ! Spec Conformance
	       * (https://html.spec.whatwg.org/#htmltabledatacellelement)
	       * WhatWG HTML$4.9.9 - The `td` element - Interface `HTMLTableDataCellElement`
	       * Note: Most browsers currently adher to the W3C DOM Level 2 spec
	       *       (https://www.w3.org/TR/DOM-Level-2-HTML/html.html#ID-82915075)
	       *       which suggests that browsers should use HTMLTableCellElement for
	       *       both TD and TH elements. WhatWG separates these.
	       * Test: Object.prototype.toString.call(document.createElement('td'))
	       *  - Chrome === "[object HTMLTableCellElement]"
	       *  - Firefox === "[object HTMLTableCellElement]"
	       *  - Safari === "[object HTMLTableCellElement]"
	       */
	      if (obj.tagName === 'TD') {
	        return 'HTMLTableDataCellElement';
	      }

	      /* ! Spec Conformance
	       * (https://html.spec.whatwg.org/#htmltableheadercellelement)
	       * WhatWG HTML$4.9.9 - The `td` element - Interface `HTMLTableHeaderCellElement`
	       * Note: Most browsers currently adher to the W3C DOM Level 2 spec
	       *       (https://www.w3.org/TR/DOM-Level-2-HTML/html.html#ID-82915075)
	       *       which suggests that browsers should use HTMLTableCellElement for
	       *       both TD and TH elements. WhatWG separates these.
	       * Test: Object.prototype.toString.call(document.createElement('th'))
	       *  - Chrome === "[object HTMLTableCellElement]"
	       *  - Firefox === "[object HTMLTableCellElement]"
	       *  - Safari === "[object HTMLTableCellElement]"
	       */
	      if (obj.tagName === 'TH') {
	        return 'HTMLTableHeaderCellElement';
	      }
	    }
	  }

	  /* ! Speed optimisation
	  * Pre:
	  *   Float64Array       x 625,644 ops/sec ±1.58% (80 runs sampled)
	  *   Float32Array       x 1,279,852 ops/sec ±2.91% (77 runs sampled)
	  *   Uint32Array        x 1,178,185 ops/sec ±1.95% (83 runs sampled)
	  *   Uint16Array        x 1,008,380 ops/sec ±2.25% (80 runs sampled)
	  *   Uint8Array         x 1,128,040 ops/sec ±2.11% (81 runs sampled)
	  *   Int32Array         x 1,170,119 ops/sec ±2.88% (80 runs sampled)
	  *   Int16Array         x 1,176,348 ops/sec ±5.79% (86 runs sampled)
	  *   Int8Array          x 1,058,707 ops/sec ±4.94% (77 runs sampled)
	  *   Uint8ClampedArray  x 1,110,633 ops/sec ±4.20% (80 runs sampled)
	  * Post:
	  *   Float64Array       x 7,105,671 ops/sec ±13.47% (64 runs sampled)
	  *   Float32Array       x 5,887,912 ops/sec ±1.46% (82 runs sampled)
	  *   Uint32Array        x 6,491,661 ops/sec ±1.76% (79 runs sampled)
	  *   Uint16Array        x 6,559,795 ops/sec ±1.67% (82 runs sampled)
	  *   Uint8Array         x 6,463,966 ops/sec ±1.43% (85 runs sampled)
	  *   Int32Array         x 5,641,841 ops/sec ±3.49% (81 runs sampled)
	  *   Int16Array         x 6,583,511 ops/sec ±1.98% (80 runs sampled)
	  *   Int8Array          x 6,606,078 ops/sec ±1.74% (81 runs sampled)
	  *   Uint8ClampedArray  x 6,602,224 ops/sec ±1.77% (83 runs sampled)
	  */
	  var stringTag = (symbolToStringTagExists && obj[Symbol.toStringTag]);
	  if (typeof stringTag === 'string') {
	    return stringTag;
	  }

	  var objPrototype = Object.getPrototypeOf(obj);
	  /* ! Speed optimisation
	  * Pre:
	  *   regex literal      x 1,772,385 ops/sec ±1.85% (77 runs sampled)
	  *   regex constructor  x 2,143,634 ops/sec ±2.46% (78 runs sampled)
	  * Post:
	  *   regex literal      x 3,928,009 ops/sec ±0.65% (78 runs sampled)
	  *   regex constructor  x 3,931,108 ops/sec ±0.58% (84 runs sampled)
	  */
	  if (objPrototype === RegExp.prototype) {
	    return 'RegExp';
	  }

	  /* ! Speed optimisation
	  * Pre:
	  *   date               x 2,130,074 ops/sec ±4.42% (68 runs sampled)
	  * Post:
	  *   date               x 3,953,779 ops/sec ±1.35% (77 runs sampled)
	  */
	  if (objPrototype === Date.prototype) {
	    return 'Date';
	  }

	  /* ! Spec Conformance
	   * (http://www.ecma-international.org/ecma-262/6.0/index.html#sec-promise.prototype-@@tostringtag)
	   * ES6$25.4.5.4 - Promise.prototype[@@toStringTag] should be "Promise":
	   * Test: `Object.prototype.toString.call(Promise.resolve())``
	   *  - Chrome <=47 === "[object Object]"
	   *  - Edge <=20 === "[object Object]"
	   *  - Firefox 29-Latest === "[object Promise]"
	   *  - Safari 7.1-Latest === "[object Promise]"
	   */
	  if (promiseExists && objPrototype === Promise.prototype) {
	    return 'Promise';
	  }

	  /* ! Speed optimisation
	  * Pre:
	  *   set                x 2,222,186 ops/sec ±1.31% (82 runs sampled)
	  * Post:
	  *   set                x 4,545,879 ops/sec ±1.13% (83 runs sampled)
	  */
	  if (setExists && objPrototype === Set.prototype) {
	    return 'Set';
	  }

	  /* ! Speed optimisation
	  * Pre:
	  *   map                x 2,396,842 ops/sec ±1.59% (81 runs sampled)
	  * Post:
	  *   map                x 4,183,945 ops/sec ±6.59% (82 runs sampled)
	  */
	  if (mapExists && objPrototype === Map.prototype) {
	    return 'Map';
	  }

	  /* ! Speed optimisation
	  * Pre:
	  *   weakset            x 1,323,220 ops/sec ±2.17% (76 runs sampled)
	  * Post:
	  *   weakset            x 4,237,510 ops/sec ±2.01% (77 runs sampled)
	  */
	  if (weakSetExists && objPrototype === WeakSet.prototype) {
	    return 'WeakSet';
	  }

	  /* ! Speed optimisation
	  * Pre:
	  *   weakmap            x 1,500,260 ops/sec ±2.02% (78 runs sampled)
	  * Post:
	  *   weakmap            x 3,881,384 ops/sec ±1.45% (82 runs sampled)
	  */
	  if (weakMapExists && objPrototype === WeakMap.prototype) {
	    return 'WeakMap';
	  }

	  /* ! Spec Conformance
	   * (http://www.ecma-international.org/ecma-262/6.0/index.html#sec-dataview.prototype-@@tostringtag)
	   * ES6$24.2.4.21 - DataView.prototype[@@toStringTag] should be "DataView":
	   * Test: `Object.prototype.toString.call(new DataView(new ArrayBuffer(1)))``
	   *  - Edge <=13 === "[object Object]"
	   */
	  if (dataViewExists && objPrototype === DataView.prototype) {
	    return 'DataView';
	  }

	  /* ! Spec Conformance
	   * (http://www.ecma-international.org/ecma-262/6.0/index.html#sec-%mapiteratorprototype%-@@tostringtag)
	   * ES6$23.1.5.2.2 - %MapIteratorPrototype%[@@toStringTag] should be "Map Iterator":
	   * Test: `Object.prototype.toString.call(new Map().entries())``
	   *  - Edge <=13 === "[object Object]"
	   */
	  if (mapExists && objPrototype === mapIteratorPrototype) {
	    return 'Map Iterator';
	  }

	  /* ! Spec Conformance
	   * (http://www.ecma-international.org/ecma-262/6.0/index.html#sec-%setiteratorprototype%-@@tostringtag)
	   * ES6$23.2.5.2.2 - %SetIteratorPrototype%[@@toStringTag] should be "Set Iterator":
	   * Test: `Object.prototype.toString.call(new Set().entries())``
	   *  - Edge <=13 === "[object Object]"
	   */
	  if (setExists && objPrototype === setIteratorPrototype) {
	    return 'Set Iterator';
	  }

	  /* ! Spec Conformance
	   * (http://www.ecma-international.org/ecma-262/6.0/index.html#sec-%arrayiteratorprototype%-@@tostringtag)
	   * ES6$22.1.5.2.2 - %ArrayIteratorPrototype%[@@toStringTag] should be "Array Iterator":
	   * Test: `Object.prototype.toString.call([][Symbol.iterator]())``
	   *  - Edge <=13 === "[object Object]"
	   */
	  if (arrayIteratorExists && objPrototype === arrayIteratorPrototype) {
	    return 'Array Iterator';
	  }

	  /* ! Spec Conformance
	   * (http://www.ecma-international.org/ecma-262/6.0/index.html#sec-%stringiteratorprototype%-@@tostringtag)
	   * ES6$21.1.5.2.2 - %StringIteratorPrototype%[@@toStringTag] should be "String Iterator":
	   * Test: `Object.prototype.toString.call(''[Symbol.iterator]())``
	   *  - Edge <=13 === "[object Object]"
	   */
	  if (stringIteratorExists && objPrototype === stringIteratorPrototype) {
	    return 'String Iterator';
	  }

	  /* ! Speed optimisation
	  * Pre:
	  *   object from null   x 2,424,320 ops/sec ±1.67% (76 runs sampled)
	  * Post:
	  *   object from null   x 5,838,000 ops/sec ±0.99% (84 runs sampled)
	  */
	  if (objPrototype === null) {
	    return 'Object';
	  }

	  return Object
	    .prototype
	    .toString
	    .call(obj)
	    .slice(toStringLeftSliceLength, toStringRightSliceLength);
	}

	return typeDetect;

	})));
} (typeDetect));

var type = typeDetect.exports;

/**
 * Returns the lower-case result of running type from type-detect on the value
 *
 * @param  {*} value
 * @returns {string}
 */
var typeOf = function typeOf(value) {
    return type(value).toLowerCase();
};

/**
 * Returns a string representation of the value
 *
 * @param  {*} value
 * @returns {string}
 */
function valueToString(value) {
    if (value && value.toString) {
        // eslint-disable-next-line @sinonjs/no-prototype-methods/no-prototype-methods
        return value.toString();
    }
    return String(value);
}

var valueToString_1 = valueToString;

var lib = {
    global: global$1,
    calledInOrder: calledInOrder_1,
    className: className_1,
    deprecated: deprecated,
    every: every,
    functionName: functionName$1,
    orderByFirstCall: orderByFirstCall_1,
    prototypes: prototypes,
    typeOf: typeOf,
    valueToString: valueToString_1
};

const globalObject = lib.global;

/**
 * @typedef {object} IdleDeadline
 * @property {boolean} didTimeout - whether or not the callback was called before reaching the optional timeout
 * @property {function():number} timeRemaining - a floating-point value providing an estimate of the number of milliseconds remaining in the current idle period
 */

/**
 * Queues a function to be called during a browser's idle periods
 *
 * @callback RequestIdleCallback
 * @param {function(IdleDeadline)} callback
 * @param {{timeout: number}} options - an options object
 * @returns {number} the id
 */

/**
 * @callback NextTick
 * @param {VoidVarArgsFunc} callback - the callback to run
 * @param {...*} arguments - optional arguments to call the callback with
 * @returns {void}
 */

/**
 * @callback SetImmediate
 * @param {VoidVarArgsFunc} callback - the callback to run
 * @param {...*} arguments - optional arguments to call the callback with
 * @returns {NodeImmediate}
 */

/**
 * @callback VoidVarArgsFunc
 * @param {...*} callback - the callback to run
 * @returns {void}
 */

/**
 * @typedef RequestAnimationFrame
 * @property {function(number):void} requestAnimationFrame
 * @returns {number} - the id
 */

/**
 * @typedef Performance
 * @property {function(): number} now
 */

/* eslint-disable jsdoc/require-property-description */
/**
 * @typedef {object} Clock
 * @property {number} now - the current time
 * @property {Date} Date - the Date constructor
 * @property {number} loopLimit - the maximum number of timers before assuming an infinite loop
 * @property {RequestIdleCallback} requestIdleCallback
 * @property {function(number):void} cancelIdleCallback
 * @property {setTimeout} setTimeout
 * @property {clearTimeout} clearTimeout
 * @property {NextTick} nextTick
 * @property {queueMicrotask} queueMicrotask
 * @property {setInterval} setInterval
 * @property {clearInterval} clearInterval
 * @property {SetImmediate} setImmediate
 * @property {function(NodeImmediate):void} clearImmediate
 * @property {function():number} countTimers
 * @property {RequestAnimationFrame} requestAnimationFrame
 * @property {function(number):void} cancelAnimationFrame
 * @property {function():void} runMicrotasks
 * @property {function(string | number): number} tick
 * @property {function(string | number): Promise<number>} tickAsync
 * @property {function(): number} next
 * @property {function(): Promise<number>} nextAsync
 * @property {function(): number} runAll
 * @property {function(): number} runToFrame
 * @property {function(): Promise<number>} runAllAsync
 * @property {function(): number} runToLast
 * @property {function(): Promise<number>} runToLastAsync
 * @property {function(): void} reset
 * @property {function(number | Date): void} setSystemTime
 * @property {Performance} performance
 * @property {function(number[]): number[]} hrtime - process.hrtime (legacy)
 * @property {function(): void} uninstall Uninstall the clock.
 * @property {Function[]} methods - the methods that are faked
 * @property {boolean} [shouldClearNativeTimers] inherited from config
 */
/* eslint-enable jsdoc/require-property-description */

/**
 * Configuration object for the `install` method.
 *
 * @typedef {object} Config
 * @property {number|Date} [now] a number (in milliseconds) or a Date object (default epoch)
 * @property {string[]} [toFake] names of the methods that should be faked.
 * @property {number} [loopLimit] the maximum number of timers that will be run when calling runAll()
 * @property {boolean} [shouldAdvanceTime] tells FakeTimers to increment mocked time automatically (default false)
 * @property {number} [advanceTimeDelta] increment mocked time every <<advanceTimeDelta>> ms (default: 20ms)
 * @property {boolean} [shouldClearNativeTimers] forwards clear timer calls to native functions if they are not fakes (default: false)
 */

/* eslint-disable jsdoc/require-property-description */
/**
 * The internal structure to describe a scheduled fake timer
 *
 * @typedef {object} Timer
 * @property {Function} func
 * @property {*[]} args
 * @property {number} delay
 * @property {number} callAt
 * @property {number} createdAt
 * @property {boolean} immediate
 * @property {number} id
 * @property {Error} [error]
 */

/**
 * A Node timer
 *
 * @typedef {object} NodeImmediate
 * @property {function(): boolean} hasRef
 * @property {function(): NodeImmediate} ref
 * @property {function(): NodeImmediate} unref
 */
/* eslint-enable jsdoc/require-property-description */

/* eslint-disable complexity */

/**
 * Mocks available features in the specified global namespace.
 *
 * @param {*} _global Namespace to mock (e.g. `window`)
 * @returns {FakeTimers}
 */
function withGlobal(_global) {
    const userAgent = _global.navigator && _global.navigator.userAgent;
    const isRunningInIE = userAgent && userAgent.indexOf("MSIE ") > -1;
    const maxTimeout = Math.pow(2, 31) - 1; //see https://heycam.github.io/webidl/#abstract-opdef-converttoint
    const idCounterStart = 1e12; // arbitrarily large number to avoid collisions with native timer IDs
    const NOOP = function () {
        return undefined;
    };
    const NOOP_ARRAY = function () {
        return [];
    };
    const timeoutResult = _global.setTimeout(NOOP, 0);
    const addTimerReturnsObject = typeof timeoutResult === "object";
    const hrtimePresent =
        _global.process && typeof _global.process.hrtime === "function";
    const hrtimeBigintPresent =
        hrtimePresent && typeof _global.process.hrtime.bigint === "function";
    const nextTickPresent =
        _global.process && typeof _global.process.nextTick === "function";
    const utilPromisify = _global.process && require$$0.promisify;
    const performancePresent =
        _global.performance && typeof _global.performance.now === "function";
    const hasPerformancePrototype =
        _global.Performance &&
        (typeof _global.Performance).match(/^(function|object)$/);
    const hasPerformanceConstructorPrototype =
        _global.performance &&
        _global.performance.constructor &&
        _global.performance.constructor.prototype;
    const queueMicrotaskPresent = _global.hasOwnProperty("queueMicrotask");
    const requestAnimationFramePresent =
        _global.requestAnimationFrame &&
        typeof _global.requestAnimationFrame === "function";
    const cancelAnimationFramePresent =
        _global.cancelAnimationFrame &&
        typeof _global.cancelAnimationFrame === "function";
    const requestIdleCallbackPresent =
        _global.requestIdleCallback &&
        typeof _global.requestIdleCallback === "function";
    const cancelIdleCallbackPresent =
        _global.cancelIdleCallback &&
        typeof _global.cancelIdleCallback === "function";
    const setImmediatePresent =
        _global.setImmediate && typeof _global.setImmediate === "function";

    // Make properties writable in IE, as per
    // https://www.adequatelygood.com/Replacing-setTimeout-Globally.html
    /* eslint-disable no-self-assign */
    if (isRunningInIE) {
        _global.setTimeout = _global.setTimeout;
        _global.clearTimeout = _global.clearTimeout;
        _global.setInterval = _global.setInterval;
        _global.clearInterval = _global.clearInterval;
        _global.Date = _global.Date;
    }

    // setImmediate is not a standard function
    // avoid adding the prop to the window object if not present
    if (setImmediatePresent) {
        _global.setImmediate = _global.setImmediate;
        _global.clearImmediate = _global.clearImmediate;
    }
    /* eslint-enable no-self-assign */

    _global.clearTimeout(timeoutResult);

    const NativeDate = _global.Date;
    let uniqueTimerId = idCounterStart;

    /**
     * @param {number} num
     * @returns {boolean}
     */
    function isNumberFinite(num) {
        if (Number.isFinite) {
            return Number.isFinite(num);
        }

        return isFinite(num);
    }

    let isNearInfiniteLimit = false;

    /**
     * @param {Clock} clock
     * @param {number} i
     */
    function checkIsNearInfiniteLimit(clock, i) {
        if (clock.loopLimit && i === clock.loopLimit - 1) {
            isNearInfiniteLimit = true;
        }
    }

    /**
     *
     */
    function resetIsNearInfiniteLimit() {
        isNearInfiniteLimit = false;
    }

    /**
     * Parse strings like "01:10:00" (meaning 1 hour, 10 minutes, 0 seconds) into
     * number of milliseconds. This is used to support human-readable strings passed
     * to clock.tick()
     *
     * @param {string} str
     * @returns {number}
     */
    function parseTime(str) {
        if (!str) {
            return 0;
        }

        const strings = str.split(":");
        const l = strings.length;
        let i = l;
        let ms = 0;
        let parsed;

        if (l > 3 || !/^(\d\d:){0,2}\d\d?$/.test(str)) {
            throw new Error(
                "tick only understands numbers, 'm:s' and 'h:m:s'. Each part must be two digits"
            );
        }

        while (i--) {
            parsed = parseInt(strings[i], 10);

            if (parsed >= 60) {
                throw new Error(`Invalid time ${str}`);
            }

            ms += parsed * Math.pow(60, l - i - 1);
        }

        return ms * 1000;
    }

    /**
     * Get the decimal part of the millisecond value as nanoseconds
     *
     * @param {number} msFloat the number of milliseconds
     * @returns {number} an integer number of nanoseconds in the range [0,1e6)
     *
     * Example: nanoRemainer(123.456789) -> 456789
     */
    function nanoRemainder(msFloat) {
        const modulo = 1e6;
        const remainder = (msFloat * 1e6) % modulo;
        const positiveRemainder =
            remainder < 0 ? remainder + modulo : remainder;

        return Math.floor(positiveRemainder);
    }

    /**
     * Used to grok the `now` parameter to createClock.
     *
     * @param {Date|number} epoch the system time
     * @returns {number}
     */
    function getEpoch(epoch) {
        if (!epoch) {
            return 0;
        }
        if (typeof epoch.getTime === "function") {
            return epoch.getTime();
        }
        if (typeof epoch === "number") {
            return epoch;
        }
        throw new TypeError("now should be milliseconds since UNIX epoch");
    }

    /**
     * @param {number} from
     * @param {number} to
     * @param {Timer} timer
     * @returns {boolean}
     */
    function inRange(from, to, timer) {
        return timer && timer.callAt >= from && timer.callAt <= to;
    }

    /**
     * @param {Clock} clock
     * @param {Timer} job
     */
    function getInfiniteLoopError(clock, job) {
        const infiniteLoopError = new Error(
            `Aborting after running ${clock.loopLimit} timers, assuming an infinite loop!`
        );

        if (!job.error) {
            return infiniteLoopError;
        }

        // pattern never matched in Node
        const computedTargetPattern = /target\.*[<|(|[].*?[>|\]|)]\s*/;
        let clockMethodPattern = new RegExp(
            String(Object.keys(clock).join("|"))
        );

        if (addTimerReturnsObject) {
            // node.js environment
            clockMethodPattern = new RegExp(
                `\\s+at (Object\\.)?(?:${Object.keys(clock).join("|")})\\s+`
            );
        }

        let matchedLineIndex = -1;
        job.error.stack.split("\n").some(function (line, i) {
            // If we've matched a computed target line (e.g. setTimeout) then we
            // don't need to look any further. Return true to stop iterating.
            const matchedComputedTarget = line.match(computedTargetPattern);
            /* istanbul ignore if */
            if (matchedComputedTarget) {
                matchedLineIndex = i;
                return true;
            }

            // If we've matched a clock method line, then there may still be
            // others further down the trace. Return false to keep iterating.
            const matchedClockMethod = line.match(clockMethodPattern);
            if (matchedClockMethod) {
                matchedLineIndex = i;
                return false;
            }

            // If we haven't matched anything on this line, but we matched
            // previously and set the matched line index, then we can stop.
            // If we haven't matched previously, then we should keep iterating.
            return matchedLineIndex >= 0;
        });

        const stack = `${infiniteLoopError}\n${job.type || "Microtask"} - ${
            job.func.name || "anonymous"
        }\n${job.error.stack
            .split("\n")
            .slice(matchedLineIndex + 1)
            .join("\n")}`;

        try {
            Object.defineProperty(infiniteLoopError, "stack", {
                value: stack,
            });
        } catch (e) {
            // noop
        }

        return infiniteLoopError;
    }

    /**
     * @param {Date} target
     * @param {Date} source
     * @returns {Date} the target after modifications
     */
    function mirrorDateProperties(target, source) {
        let prop;
        for (prop in source) {
            if (source.hasOwnProperty(prop)) {
                target[prop] = source[prop];
            }
        }

        // set special now implementation
        if (source.now) {
            target.now = function now() {
                return target.clock.now;
            };
        } else {
            delete target.now;
        }

        // set special toSource implementation
        if (source.toSource) {
            target.toSource = function toSource() {
                return source.toSource();
            };
        } else {
            delete target.toSource;
        }

        // set special toString implementation
        target.toString = function toString() {
            return source.toString();
        };

        target.prototype = source.prototype;
        target.parse = source.parse;
        target.UTC = source.UTC;
        target.prototype.toUTCString = source.prototype.toUTCString;
        target.isFake = true;

        return target;
    }

    //eslint-disable-next-line jsdoc/require-jsdoc
    function createDate() {
        /**
         * @param {number} year
         * @param {number} month
         * @param {number} date
         * @param {number} hour
         * @param {number} minute
         * @param {number} second
         * @param {number} ms
         *
         * @returns {Date}
         */
        function ClockDate(year, month, date, hour, minute, second, ms) {
            // the Date constructor called as a function, ref Ecma-262 Edition 5.1, section 15.9.2.
            // This remains so in the 10th edition of 2019 as well.
            if (!(this instanceof ClockDate)) {
                return new NativeDate(ClockDate.clock.now).toString();
            }

            // if Date is called as a constructor with 'new' keyword
            // Defensive and verbose to avoid potential harm in passing
            // explicit undefined when user does not pass argument
            switch (arguments.length) {
                case 0:
                    return new NativeDate(ClockDate.clock.now);
                case 1:
                    return new NativeDate(year);
                case 2:
                    return new NativeDate(year, month);
                case 3:
                    return new NativeDate(year, month, date);
                case 4:
                    return new NativeDate(year, month, date, hour);
                case 5:
                    return new NativeDate(year, month, date, hour, minute);
                case 6:
                    return new NativeDate(
                        year,
                        month,
                        date,
                        hour,
                        minute,
                        second
                    );
                default:
                    return new NativeDate(
                        year,
                        month,
                        date,
                        hour,
                        minute,
                        second,
                        ms
                    );
            }
        }

        return mirrorDateProperties(ClockDate, NativeDate);
    }

    //eslint-disable-next-line jsdoc/require-jsdoc
    function enqueueJob(clock, job) {
        // enqueues a microtick-deferred task - ecma262/#sec-enqueuejob
        if (!clock.jobs) {
            clock.jobs = [];
        }
        clock.jobs.push(job);
    }

    //eslint-disable-next-line jsdoc/require-jsdoc
    function runJobs(clock) {
        // runs all microtick-deferred tasks - ecma262/#sec-runjobs
        if (!clock.jobs) {
            return;
        }
        for (let i = 0; i < clock.jobs.length; i++) {
            const job = clock.jobs[i];
            job.func.apply(null, job.args);

            checkIsNearInfiniteLimit(clock, i);
            if (clock.loopLimit && i > clock.loopLimit) {
                throw getInfiniteLoopError(clock, job);
            }
        }
        resetIsNearInfiniteLimit();
        clock.jobs = [];
    }

    /**
     * @param {Clock} clock
     * @param {Timer} timer
     * @returns {number} id of the created timer
     */
    function addTimer(clock, timer) {
        if (timer.func === undefined) {
            throw new Error("Callback must be provided to timer calls");
        }

        if (addTimerReturnsObject) {
            // Node.js environment
            if (typeof timer.func !== "function") {
                throw new TypeError(
                    `[ERR_INVALID_CALLBACK]: Callback must be a function. Received ${
                        timer.func
                    } of type ${typeof timer.func}`
                );
            }
        }

        if (isNearInfiniteLimit) {
            timer.error = new Error();
        }

        timer.type = timer.immediate ? "Immediate" : "Timeout";

        if (timer.hasOwnProperty("delay")) {
            if (typeof timer.delay !== "number") {
                timer.delay = parseInt(timer.delay, 10);
            }

            if (!isNumberFinite(timer.delay)) {
                timer.delay = 0;
            }
            timer.delay = timer.delay > maxTimeout ? 1 : timer.delay;
            timer.delay = Math.max(0, timer.delay);
        }

        if (timer.hasOwnProperty("interval")) {
            timer.type = "Interval";
            timer.interval = timer.interval > maxTimeout ? 1 : timer.interval;
        }

        if (timer.hasOwnProperty("animation")) {
            timer.type = "AnimationFrame";
            timer.animation = true;
        }

        if (timer.hasOwnProperty("idleCallback")) {
            timer.type = "IdleCallback";
            timer.idleCallback = true;
        }

        if (!clock.timers) {
            clock.timers = {};
        }

        timer.id = uniqueTimerId++;
        timer.createdAt = clock.now;
        timer.callAt =
            clock.now + (parseInt(timer.delay) || (clock.duringTick ? 1 : 0));

        clock.timers[timer.id] = timer;

        if (addTimerReturnsObject) {
            const res = {
                refed: true,
                ref: function () {
                    this.refed = true;
                    return res;
                },
                unref: function () {
                    this.refed = false;
                    return res;
                },
                hasRef: function () {
                    return this.refed;
                },
                refresh: function () {
                    timer.callAt =
                        clock.now +
                        (parseInt(timer.delay) || (clock.duringTick ? 1 : 0));

                    // it _might_ have been removed, but if not the assignment is perfectly fine
                    clock.timers[timer.id] = timer;

                    return res;
                },
                [Symbol.toPrimitive]: function () {
                    return timer.id;
                },
            };
            return res;
        }

        return timer.id;
    }

    /* eslint consistent-return: "off" */
    /**
     * Timer comparitor
     *
     * @param {Timer} a
     * @param {Timer} b
     * @returns {number}
     */
    function compareTimers(a, b) {
        // Sort first by absolute timing
        if (a.callAt < b.callAt) {
            return -1;
        }
        if (a.callAt > b.callAt) {
            return 1;
        }

        // Sort next by immediate, immediate timers take precedence
        if (a.immediate && !b.immediate) {
            return -1;
        }
        if (!a.immediate && b.immediate) {
            return 1;
        }

        // Sort next by creation time, earlier-created timers take precedence
        if (a.createdAt < b.createdAt) {
            return -1;
        }
        if (a.createdAt > b.createdAt) {
            return 1;
        }

        // Sort next by id, lower-id timers take precedence
        if (a.id < b.id) {
            return -1;
        }
        if (a.id > b.id) {
            return 1;
        }

        // As timer ids are unique, no fallback `0` is necessary
    }

    /**
     * @param {Clock} clock
     * @param {number} from
     * @param {number} to
     *
     * @returns {Timer}
     */
    function firstTimerInRange(clock, from, to) {
        const timers = clock.timers;
        let timer = null;
        let id, isInRange;

        for (id in timers) {
            if (timers.hasOwnProperty(id)) {
                isInRange = inRange(from, to, timers[id]);

                if (
                    isInRange &&
                    (!timer || compareTimers(timer, timers[id]) === 1)
                ) {
                    timer = timers[id];
                }
            }
        }

        return timer;
    }

    /**
     * @param {Clock} clock
     * @returns {Timer}
     */
    function firstTimer(clock) {
        const timers = clock.timers;
        let timer = null;
        let id;

        for (id in timers) {
            if (timers.hasOwnProperty(id)) {
                if (!timer || compareTimers(timer, timers[id]) === 1) {
                    timer = timers[id];
                }
            }
        }

        return timer;
    }

    /**
     * @param {Clock} clock
     * @returns {Timer}
     */
    function lastTimer(clock) {
        const timers = clock.timers;
        let timer = null;
        let id;

        for (id in timers) {
            if (timers.hasOwnProperty(id)) {
                if (!timer || compareTimers(timer, timers[id]) === -1) {
                    timer = timers[id];
                }
            }
        }

        return timer;
    }

    /**
     * @param {Clock} clock
     * @param {Timer} timer
     */
    function callTimer(clock, timer) {
        if (typeof timer.interval === "number") {
            clock.timers[timer.id].callAt += timer.interval;
        } else {
            delete clock.timers[timer.id];
        }

        if (typeof timer.func === "function") {
            timer.func.apply(null, timer.args);
        } else {
            /* eslint no-eval: "off" */
            const eval2 = eval;
            (function () {
                eval2(timer.func);
            })();
        }
    }

    /**
     * Gets clear handler name for a given timer type
     *
     * @param {string} ttype
     */
    function getClearHandler(ttype) {
        if (ttype === "IdleCallback" || ttype === "AnimationFrame") {
            return `cancel${ttype}`;
        }
        return `clear${ttype}`;
    }

    /**
     * Gets schedule handler name for a given timer type
     *
     * @param {string} ttype
     */
    function getScheduleHandler(ttype) {
        if (ttype === "IdleCallback" || ttype === "AnimationFrame") {
            return `request${ttype}`;
        }
        return `set${ttype}`;
    }

    /**
     * Creates an anonymous function to warn only once
     */
    function createWarnOnce() {
        let calls = 0;
        return function (msg) {
            // eslint-disable-next-line
            !calls++ && console.warn(msg);
        };
    }
    const warnOnce = createWarnOnce();

    /**
     * @param {Clock} clock
     * @param {number} timerId
     * @param {string} ttype
     */
    function clearTimer(clock, timerId, ttype) {
        if (!timerId) {
            // null appears to be allowed in most browsers, and appears to be
            // relied upon by some libraries, like Bootstrap carousel
            return;
        }

        if (!clock.timers) {
            clock.timers = {};
        }

        // in Node, the ID is stored as the primitive value for `Timeout` objects
        // for `Immediate` objects, no ID exists, so it gets coerced to NaN
        const id = Number(timerId);

        if (Number.isNaN(id) || id < idCounterStart) {
            const handlerName = getClearHandler(ttype);

            if (clock.shouldClearNativeTimers === true) {
                const nativeHandler = clock[`_${handlerName}`];
                return typeof nativeHandler === "function"
                    ? nativeHandler(timerId)
                    : undefined;
            }
            warnOnce(
                `FakeTimers: ${handlerName} was invoked to clear a native timer instead of one created by this library.` +
                    "\nTo automatically clean-up native timers, use `shouldClearNativeTimers`."
            );
        }

        if (clock.timers.hasOwnProperty(id)) {
            // check that the ID matches a timer of the correct type
            const timer = clock.timers[id];
            if (
                timer.type === ttype ||
                (timer.type === "Timeout" && ttype === "Interval") ||
                (timer.type === "Interval" && ttype === "Timeout")
            ) {
                delete clock.timers[id];
            } else {
                const clear = getClearHandler(ttype);
                const schedule = getScheduleHandler(timer.type);
                throw new Error(
                    `Cannot clear timer: timer created with ${schedule}() but cleared with ${clear}()`
                );
            }
        }
    }

    /**
     * @param {Clock} clock
     * @param {Config} config
     * @returns {Timer[]}
     */
    function uninstall(clock, config) {
        let method, i, l;
        const installedHrTime = "_hrtime";
        const installedNextTick = "_nextTick";

        for (i = 0, l = clock.methods.length; i < l; i++) {
            method = clock.methods[i];
            if (method === "hrtime" && _global.process) {
                _global.process.hrtime = clock[installedHrTime];
            } else if (method === "nextTick" && _global.process) {
                _global.process.nextTick = clock[installedNextTick];
            } else if (method === "performance") {
                const originalPerfDescriptor = Object.getOwnPropertyDescriptor(
                    clock,
                    `_${method}`
                );
                if (
                    originalPerfDescriptor &&
                    originalPerfDescriptor.get &&
                    !originalPerfDescriptor.set
                ) {
                    Object.defineProperty(
                        _global,
                        method,
                        originalPerfDescriptor
                    );
                } else if (originalPerfDescriptor.configurable) {
                    _global[method] = clock[`_${method}`];
                }
            } else {
                if (_global[method] && _global[method].hadOwnProperty) {
                    _global[method] = clock[`_${method}`];
                } else {
                    try {
                        delete _global[method];
                    } catch (ignore) {
                        /* eslint no-empty: "off" */
                    }
                }
            }
        }

        if (config.shouldAdvanceTime === true) {
            _global.clearInterval(clock.attachedInterval);
        }

        // Prevent multiple executions which will completely remove these props
        clock.methods = [];

        // return pending timers, to enable checking what timers remained on uninstall
        if (!clock.timers) {
            return [];
        }
        return Object.keys(clock.timers).map(function mapper(key) {
            return clock.timers[key];
        });
    }

    /**
     * @param {object} target the target containing the method to replace
     * @param {string} method the keyname of the method on the target
     * @param {Clock} clock
     */
    function hijackMethod(target, method, clock) {
        clock[method].hadOwnProperty = Object.prototype.hasOwnProperty.call(
            target,
            method
        );
        clock[`_${method}`] = target[method];

        if (method === "Date") {
            const date = mirrorDateProperties(clock[method], target[method]);
            target[method] = date;
        } else if (method === "performance") {
            const originalPerfDescriptor = Object.getOwnPropertyDescriptor(
                target,
                method
            );
            // JSDOM has a read only performance field so we have to save/copy it differently
            if (
                originalPerfDescriptor &&
                originalPerfDescriptor.get &&
                !originalPerfDescriptor.set
            ) {
                Object.defineProperty(
                    clock,
                    `_${method}`,
                    originalPerfDescriptor
                );

                const perfDescriptor = Object.getOwnPropertyDescriptor(
                    clock,
                    method
                );
                Object.defineProperty(target, method, perfDescriptor);
            } else {
                target[method] = clock[method];
            }
        } else {
            target[method] = function () {
                return clock[method].apply(clock, arguments);
            };

            Object.defineProperties(
                target[method],
                Object.getOwnPropertyDescriptors(clock[method])
            );
        }

        target[method].clock = clock;
    }

    /**
     * @param {Clock} clock
     * @param {number} advanceTimeDelta
     */
    function doIntervalTick(clock, advanceTimeDelta) {
        clock.tick(advanceTimeDelta);
    }

    /**
     * @typedef {object} Timers
     * @property {setTimeout} setTimeout
     * @property {clearTimeout} clearTimeout
     * @property {setInterval} setInterval
     * @property {clearInterval} clearInterval
     * @property {Date} Date
     * @property {SetImmediate=} setImmediate
     * @property {function(NodeImmediate): void=} clearImmediate
     * @property {function(number[]):number[]=} hrtime
     * @property {NextTick=} nextTick
     * @property {Performance=} performance
     * @property {RequestAnimationFrame=} requestAnimationFrame
     * @property {boolean=} queueMicrotask
     * @property {function(number): void=} cancelAnimationFrame
     * @property {RequestIdleCallback=} requestIdleCallback
     * @property {function(number): void=} cancelIdleCallback
     */

    /** @type {Timers} */
    const timers = {
        setTimeout: _global.setTimeout,
        clearTimeout: _global.clearTimeout,
        setInterval: _global.setInterval,
        clearInterval: _global.clearInterval,
        Date: _global.Date,
    };

    if (setImmediatePresent) {
        timers.setImmediate = _global.setImmediate;
        timers.clearImmediate = _global.clearImmediate;
    }

    if (hrtimePresent) {
        timers.hrtime = _global.process.hrtime;
    }

    if (nextTickPresent) {
        timers.nextTick = _global.process.nextTick;
    }

    if (performancePresent) {
        timers.performance = _global.performance;
    }

    if (requestAnimationFramePresent) {
        timers.requestAnimationFrame = _global.requestAnimationFrame;
    }

    if (queueMicrotaskPresent) {
        timers.queueMicrotask = true;
    }

    if (cancelAnimationFramePresent) {
        timers.cancelAnimationFrame = _global.cancelAnimationFrame;
    }

    if (requestIdleCallbackPresent) {
        timers.requestIdleCallback = _global.requestIdleCallback;
    }

    if (cancelIdleCallbackPresent) {
        timers.cancelIdleCallback = _global.cancelIdleCallback;
    }

    const originalSetTimeout = _global.setImmediate || _global.setTimeout;

    /**
     * @param {Date|number} [start] the system time - non-integer values are floored
     * @param {number} [loopLimit] maximum number of timers that will be run when calling runAll()
     * @returns {Clock}
     */
    function createClock(start, loopLimit) {
        // eslint-disable-next-line no-param-reassign
        start = Math.floor(getEpoch(start));
        // eslint-disable-next-line no-param-reassign
        loopLimit = loopLimit || 1000;
        let nanos = 0;
        const adjustedSystemTime = [0, 0]; // [millis, nanoremainder]

        if (NativeDate === undefined) {
            throw new Error(
                "The global scope doesn't have a `Date` object" +
                    " (see https://github.com/sinonjs/sinon/issues/1852#issuecomment-419622780)"
            );
        }

        const clock = {
            now: start,
            Date: createDate(),
            loopLimit: loopLimit,
        };

        clock.Date.clock = clock;

        //eslint-disable-next-line jsdoc/require-jsdoc
        function getTimeToNextFrame() {
            return 16 - ((clock.now - start) % 16);
        }

        //eslint-disable-next-line jsdoc/require-jsdoc
        function hrtime(prev) {
            const millisSinceStart = clock.now - adjustedSystemTime[0] - start;
            const secsSinceStart = Math.floor(millisSinceStart / 1000);
            const remainderInNanos =
                (millisSinceStart - secsSinceStart * 1e3) * 1e6 +
                nanos -
                adjustedSystemTime[1];

            if (Array.isArray(prev)) {
                if (prev[1] > 1e9) {
                    throw new TypeError(
                        "Number of nanoseconds can't exceed a billion"
                    );
                }

                const oldSecs = prev[0];
                let nanoDiff = remainderInNanos - prev[1];
                let secDiff = secsSinceStart - oldSecs;

                if (nanoDiff < 0) {
                    nanoDiff += 1e9;
                    secDiff -= 1;
                }

                return [secDiff, nanoDiff];
            }
            return [secsSinceStart, remainderInNanos];
        }

        if (hrtimeBigintPresent) {
            hrtime.bigint = function () {
                const parts = hrtime();
                return BigInt(parts[0]) * BigInt(1e9) + BigInt(parts[1]); // eslint-disable-line
            };
        }

        clock.requestIdleCallback = function requestIdleCallback(
            func,
            timeout
        ) {
            let timeToNextIdlePeriod = 0;

            if (clock.countTimers() > 0) {
                timeToNextIdlePeriod = 50; // const for now
            }

            const result = addTimer(clock, {
                func: func,
                args: Array.prototype.slice.call(arguments, 2),
                delay:
                    typeof timeout === "undefined"
                        ? timeToNextIdlePeriod
                        : Math.min(timeout, timeToNextIdlePeriod),
                idleCallback: true,
            });

            return Number(result);
        };

        clock.cancelIdleCallback = function cancelIdleCallback(timerId) {
            return clearTimer(clock, timerId, "IdleCallback");
        };

        clock.setTimeout = function setTimeout(func, timeout) {
            return addTimer(clock, {
                func: func,
                args: Array.prototype.slice.call(arguments, 2),
                delay: timeout,
            });
        };
        if (typeof _global.Promise !== "undefined" && utilPromisify) {
            clock.setTimeout[
                utilPromisify.custom
            ] = function promisifiedSetTimeout(timeout, arg) {
                return new _global.Promise(function setTimeoutExecutor(
                    resolve
                ) {
                    addTimer(clock, {
                        func: resolve,
                        args: [arg],
                        delay: timeout,
                    });
                });
            };
        }

        clock.clearTimeout = function clearTimeout(timerId) {
            return clearTimer(clock, timerId, "Timeout");
        };

        clock.nextTick = function nextTick(func) {
            return enqueueJob(clock, {
                func: func,
                args: Array.prototype.slice.call(arguments, 1),
                error: isNearInfiniteLimit ? new Error() : null,
            });
        };

        clock.queueMicrotask = function queueMicrotask(func) {
            return clock.nextTick(func); // explicitly drop additional arguments
        };

        clock.setInterval = function setInterval(func, timeout) {
            // eslint-disable-next-line no-param-reassign
            timeout = parseInt(timeout, 10);
            return addTimer(clock, {
                func: func,
                args: Array.prototype.slice.call(arguments, 2),
                delay: timeout,
                interval: timeout,
            });
        };

        clock.clearInterval = function clearInterval(timerId) {
            return clearTimer(clock, timerId, "Interval");
        };

        if (setImmediatePresent) {
            clock.setImmediate = function setImmediate(func) {
                return addTimer(clock, {
                    func: func,
                    args: Array.prototype.slice.call(arguments, 1),
                    immediate: true,
                });
            };

            if (typeof _global.Promise !== "undefined" && utilPromisify) {
                clock.setImmediate[
                    utilPromisify.custom
                ] = function promisifiedSetImmediate(arg) {
                    return new _global.Promise(function setImmediateExecutor(
                        resolve
                    ) {
                        addTimer(clock, {
                            func: resolve,
                            args: [arg],
                            immediate: true,
                        });
                    });
                };
            }

            clock.clearImmediate = function clearImmediate(timerId) {
                return clearTimer(clock, timerId, "Immediate");
            };
        }

        clock.countTimers = function countTimers() {
            return (
                Object.keys(clock.timers || {}).length +
                (clock.jobs || []).length
            );
        };

        clock.requestAnimationFrame = function requestAnimationFrame(func) {
            const result = addTimer(clock, {
                func: func,
                delay: getTimeToNextFrame(),
                args: [clock.now + getTimeToNextFrame()],
                animation: true,
            });

            return Number(result);
        };

        clock.cancelAnimationFrame = function cancelAnimationFrame(timerId) {
            return clearTimer(clock, timerId, "AnimationFrame");
        };

        clock.runMicrotasks = function runMicrotasks() {
            runJobs(clock);
        };

        /**
         * @param {number|string} tickValue milliseconds or a string parseable by parseTime
         * @param {boolean} isAsync
         * @param {Function} resolve
         * @param {Function} reject
         * @returns {number|undefined} will return the new `now` value or nothing for async
         */
        function doTick(tickValue, isAsync, resolve, reject) {
            const msFloat =
                typeof tickValue === "number"
                    ? tickValue
                    : parseTime(tickValue);
            const ms = Math.floor(msFloat);
            const remainder = nanoRemainder(msFloat);
            let nanosTotal = nanos + remainder;
            let tickTo = clock.now + ms;

            if (msFloat < 0) {
                throw new TypeError("Negative ticks are not supported");
            }

            // adjust for positive overflow
            if (nanosTotal >= 1e6) {
                tickTo += 1;
                nanosTotal -= 1e6;
            }

            nanos = nanosTotal;
            let tickFrom = clock.now;
            let previous = clock.now;
            // ESLint fails to detect this correctly
            /* eslint-disable prefer-const */
            let timer,
                firstException,
                oldNow,
                nextPromiseTick,
                compensationCheck,
                postTimerCall;
            /* eslint-enable prefer-const */

            clock.duringTick = true;

            // perform microtasks
            oldNow = clock.now;
            runJobs(clock);
            if (oldNow !== clock.now) {
                // compensate for any setSystemTime() call during microtask callback
                tickFrom += clock.now - oldNow;
                tickTo += clock.now - oldNow;
            }

            //eslint-disable-next-line jsdoc/require-jsdoc
            function doTickInner() {
                // perform each timer in the requested range
                timer = firstTimerInRange(clock, tickFrom, tickTo);
                // eslint-disable-next-line no-unmodified-loop-condition
                while (timer && tickFrom <= tickTo) {
                    if (clock.timers[timer.id]) {
                        tickFrom = timer.callAt;
                        clock.now = timer.callAt;
                        oldNow = clock.now;
                        try {
                            runJobs(clock);
                            callTimer(clock, timer);
                        } catch (e) {
                            firstException = firstException || e;
                        }

                        if (isAsync) {
                            // finish up after native setImmediate callback to allow
                            // all native es6 promises to process their callbacks after
                            // each timer fires.
                            originalSetTimeout(nextPromiseTick);
                            return;
                        }

                        compensationCheck();
                    }

                    postTimerCall();
                }

                // perform process.nextTick()s again
                oldNow = clock.now;
                runJobs(clock);
                if (oldNow !== clock.now) {
                    // compensate for any setSystemTime() call during process.nextTick() callback
                    tickFrom += clock.now - oldNow;
                    tickTo += clock.now - oldNow;
                }
                clock.duringTick = false;

                // corner case: during runJobs new timers were scheduled which could be in the range [clock.now, tickTo]
                timer = firstTimerInRange(clock, tickFrom, tickTo);
                if (timer) {
                    try {
                        clock.tick(tickTo - clock.now); // do it all again - for the remainder of the requested range
                    } catch (e) {
                        firstException = firstException || e;
                    }
                } else {
                    // no timers remaining in the requested range: move the clock all the way to the end
                    clock.now = tickTo;

                    // update nanos
                    nanos = nanosTotal;
                }
                if (firstException) {
                    throw firstException;
                }

                if (isAsync) {
                    resolve(clock.now);
                } else {
                    return clock.now;
                }
            }

            nextPromiseTick =
                isAsync &&
                function () {
                    try {
                        compensationCheck();
                        postTimerCall();
                        doTickInner();
                    } catch (e) {
                        reject(e);
                    }
                };

            compensationCheck = function () {
                // compensate for any setSystemTime() call during timer callback
                if (oldNow !== clock.now) {
                    tickFrom += clock.now - oldNow;
                    tickTo += clock.now - oldNow;
                    previous += clock.now - oldNow;
                }
            };

            postTimerCall = function () {
                timer = firstTimerInRange(clock, previous, tickTo);
                previous = tickFrom;
            };

            return doTickInner();
        }

        /**
         * @param {string|number} tickValue number of milliseconds or a human-readable value like "01:11:15"
         * @returns {number} will return the new `now` value
         */
        clock.tick = function tick(tickValue) {
            return doTick(tickValue, false);
        };

        if (typeof _global.Promise !== "undefined") {
            /**
             * @param {string|number} tickValue number of milliseconds or a human-readable value like "01:11:15"
             * @returns {Promise}
             */
            clock.tickAsync = function tickAsync(tickValue) {
                return new _global.Promise(function (resolve, reject) {
                    originalSetTimeout(function () {
                        try {
                            doTick(tickValue, true, resolve, reject);
                        } catch (e) {
                            reject(e);
                        }
                    });
                });
            };
        }

        clock.next = function next() {
            runJobs(clock);
            const timer = firstTimer(clock);
            if (!timer) {
                return clock.now;
            }

            clock.duringTick = true;
            try {
                clock.now = timer.callAt;
                callTimer(clock, timer);
                runJobs(clock);
                return clock.now;
            } finally {
                clock.duringTick = false;
            }
        };

        if (typeof _global.Promise !== "undefined") {
            clock.nextAsync = function nextAsync() {
                return new _global.Promise(function (resolve, reject) {
                    originalSetTimeout(function () {
                        try {
                            const timer = firstTimer(clock);
                            if (!timer) {
                                resolve(clock.now);
                                return;
                            }

                            let err;
                            clock.duringTick = true;
                            clock.now = timer.callAt;
                            try {
                                callTimer(clock, timer);
                            } catch (e) {
                                err = e;
                            }
                            clock.duringTick = false;

                            originalSetTimeout(function () {
                                if (err) {
                                    reject(err);
                                } else {
                                    resolve(clock.now);
                                }
                            });
                        } catch (e) {
                            reject(e);
                        }
                    });
                });
            };
        }

        clock.runAll = function runAll() {
            let numTimers, i;
            runJobs(clock);
            for (i = 0; i < clock.loopLimit; i++) {
                if (!clock.timers) {
                    resetIsNearInfiniteLimit();
                    return clock.now;
                }

                numTimers = Object.keys(clock.timers).length;
                if (numTimers === 0) {
                    resetIsNearInfiniteLimit();
                    return clock.now;
                }

                clock.next();
                checkIsNearInfiniteLimit(clock, i);
            }

            const excessJob = firstTimer(clock);
            throw getInfiniteLoopError(clock, excessJob);
        };

        clock.runToFrame = function runToFrame() {
            return clock.tick(getTimeToNextFrame());
        };

        if (typeof _global.Promise !== "undefined") {
            clock.runAllAsync = function runAllAsync() {
                return new _global.Promise(function (resolve, reject) {
                    let i = 0;
                    /**
                     *
                     */
                    function doRun() {
                        originalSetTimeout(function () {
                            try {
                                let numTimers;
                                if (i < clock.loopLimit) {
                                    if (!clock.timers) {
                                        resetIsNearInfiniteLimit();
                                        resolve(clock.now);
                                        return;
                                    }

                                    numTimers = Object.keys(clock.timers)
                                        .length;
                                    if (numTimers === 0) {
                                        resetIsNearInfiniteLimit();
                                        resolve(clock.now);
                                        return;
                                    }

                                    clock.next();

                                    i++;

                                    doRun();
                                    checkIsNearInfiniteLimit(clock, i);
                                    return;
                                }

                                const excessJob = firstTimer(clock);
                                reject(getInfiniteLoopError(clock, excessJob));
                            } catch (e) {
                                reject(e);
                            }
                        });
                    }
                    doRun();
                });
            };
        }

        clock.runToLast = function runToLast() {
            const timer = lastTimer(clock);
            if (!timer) {
                runJobs(clock);
                return clock.now;
            }

            return clock.tick(timer.callAt - clock.now);
        };

        if (typeof _global.Promise !== "undefined") {
            clock.runToLastAsync = function runToLastAsync() {
                return new _global.Promise(function (resolve, reject) {
                    originalSetTimeout(function () {
                        try {
                            const timer = lastTimer(clock);
                            if (!timer) {
                                resolve(clock.now);
                            }

                            resolve(clock.tickAsync(timer.callAt));
                        } catch (e) {
                            reject(e);
                        }
                    });
                });
            };
        }

        clock.reset = function reset() {
            nanos = 0;
            clock.timers = {};
            clock.jobs = [];
            clock.now = start;
        };

        clock.setSystemTime = function setSystemTime(systemTime) {
            // determine time difference
            const newNow = getEpoch(systemTime);
            const difference = newNow - clock.now;
            let id, timer;

            adjustedSystemTime[0] = adjustedSystemTime[0] + difference;
            adjustedSystemTime[1] = adjustedSystemTime[1] + nanos;
            // update 'system clock'
            clock.now = newNow;
            nanos = 0;

            // update timers and intervals to keep them stable
            for (id in clock.timers) {
                if (clock.timers.hasOwnProperty(id)) {
                    timer = clock.timers[id];
                    timer.createdAt += difference;
                    timer.callAt += difference;
                }
            }
        };

        if (performancePresent) {
            clock.performance = Object.create(null);
            clock.performance.now = function FakeTimersNow() {
                const hrt = hrtime();
                const millis = hrt[0] * 1000 + hrt[1] / 1e6;
                return millis;
            };
        }

        if (hrtimePresent) {
            clock.hrtime = hrtime;
        }

        return clock;
    }

    /* eslint-disable complexity */

    /**
     * @param {Config=} [config] Optional config
     * @returns {Clock}
     */
    function install(config) {
        if (
            arguments.length > 1 ||
            config instanceof Date ||
            Array.isArray(config) ||
            typeof config === "number"
        ) {
            throw new TypeError(
                `FakeTimers.install called with ${String(
                    config
                )} install requires an object parameter`
            );
        }

        if (_global.Date.isFake === true) {
            // Timers are already faked; this is a problem.
            // Make the user reset timers before continuing.
            throw new TypeError(
                "Can't install fake timers twice on the same global object."
            );
        }

        // eslint-disable-next-line no-param-reassign
        config = typeof config !== "undefined" ? config : {};
        config.shouldAdvanceTime = config.shouldAdvanceTime || false;
        config.advanceTimeDelta = config.advanceTimeDelta || 20;
        config.shouldClearNativeTimers =
            config.shouldClearNativeTimers || false;

        if (config.target) {
            throw new TypeError(
                "config.target is no longer supported. Use `withGlobal(target)` instead."
            );
        }

        let i, l;
        const clock = createClock(config.now, config.loopLimit);
        clock.shouldClearNativeTimers = config.shouldClearNativeTimers;

        clock.uninstall = function () {
            return uninstall(clock, config);
        };

        clock.methods = config.toFake || [];

        if (clock.methods.length === 0) {
            // do not fake nextTick by default - GitHub#126
            clock.methods = Object.keys(timers).filter(function (key) {
                return key !== "nextTick" && key !== "queueMicrotask";
            });
        }

        if (config.shouldAdvanceTime === true) {
            const intervalTick = doIntervalTick.bind(
                null,
                clock,
                config.advanceTimeDelta
            );
            const intervalId = _global.setInterval(
                intervalTick,
                config.advanceTimeDelta
            );
            clock.attachedInterval = intervalId;
        }

        if (clock.methods.includes("performance")) {
            const proto = (() => {
                if (hasPerformancePrototype) {
                    return _global.Performance.prototype;
                }
                if (hasPerformanceConstructorPrototype) {
                    return _global.performance.constructor.prototype;
                }
            })();
            if (proto) {
                Object.getOwnPropertyNames(proto).forEach(function (name) {
                    if (name !== "now") {
                        clock.performance[name] =
                            name.indexOf("getEntries") === 0
                                ? NOOP_ARRAY
                                : NOOP;
                    }
                });
            } else if ((config.toFake || []).includes("performance")) {
                // user explicitly tried to fake performance when not present
                throw new ReferenceError(
                    "non-existent performance object cannot be faked"
                );
            }
        }

        for (i = 0, l = clock.methods.length; i < l; i++) {
            const nameOfMethodToReplace = clock.methods[i];
            if (nameOfMethodToReplace === "hrtime") {
                if (
                    _global.process &&
                    typeof _global.process.hrtime === "function"
                ) {
                    hijackMethod(_global.process, nameOfMethodToReplace, clock);
                }
            } else if (nameOfMethodToReplace === "nextTick") {
                if (
                    _global.process &&
                    typeof _global.process.nextTick === "function"
                ) {
                    hijackMethod(_global.process, nameOfMethodToReplace, clock);
                }
            } else {
                hijackMethod(_global, nameOfMethodToReplace, clock);
            }
        }

        return clock;
    }

    /* eslint-enable complexity */

    return {
        timers: timers,
        createClock: createClock,
        install: install,
        withGlobal: withGlobal,
    };
}

/**
 * @typedef {object} FakeTimers
 * @property {Timers} timers
 * @property {createClock} createClock
 * @property {Function} install
 * @property {withGlobal} withGlobal
 */

/* eslint-enable complexity */

/** @type {FakeTimers} */
withGlobal(globalObject);
var withGlobal_1 = withGlobal;

const RealDate = Date;
let now = null;
class MockDate extends RealDate {
  constructor(y, m, d, h, M, s, ms) {
    super();
    let date;
    switch (arguments.length) {
      case 0:
        if (now !== null)
          date = new RealDate(now.valueOf());
        else
          date = new RealDate();
        break;
      case 1:
        date = new RealDate(y);
        break;
      default:
        d = typeof d === "undefined" ? 1 : d;
        h = h || 0;
        M = M || 0;
        s = s || 0;
        ms = ms || 0;
        date = new RealDate(y, m, d, h, M, s, ms);
        break;
    }
    return date;
  }
}
MockDate.UTC = RealDate.UTC;
MockDate.now = function() {
  return new MockDate().valueOf();
};
MockDate.parse = function(dateString) {
  return RealDate.parse(dateString);
};
MockDate.toString = function() {
  return RealDate.toString();
};
function mockDate(date) {
  const dateObj = new RealDate(date.valueOf());
  if (isNaN(dateObj.getTime()))
    throw new TypeError(`mockdate: The time set is an invalid date: ${date}`);
  globalThis.Date = MockDate;
  now = dateObj.valueOf();
}
function resetDate() {
  globalThis.Date = RealDate;
}

var __defProp = Object.defineProperty;
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
class FakeTimers {
  constructor({
    global,
    config
  }) {
    this._now = RealDate.now;
    this._userConfig = config;
    this._fakingDate = false;
    this._fakingTime = false;
    this._fakeTimers = withGlobal_1(global);
  }
  clearAllTimers() {
    if (this._fakingTime)
      this._clock.reset();
  }
  dispose() {
    this.useRealTimers();
  }
  runAllTimers() {
    if (this._checkFakeTimers())
      this._clock.runAll();
  }
  runOnlyPendingTimers() {
    if (this._checkFakeTimers())
      this._clock.runToLast();
  }
  advanceTimersToNextTimer(steps = 1) {
    if (this._checkFakeTimers()) {
      for (let i = steps; i > 0; i--) {
        this._clock.next();
        this._clock.tick(0);
        if (this._clock.countTimers() === 0)
          break;
      }
    }
  }
  advanceTimersByTime(msToRun) {
    if (this._checkFakeTimers())
      this._clock.tick(msToRun);
  }
  runAllTicks() {
    if (this._checkFakeTimers()) {
      this._clock.runMicrotasks();
    }
  }
  useRealTimers() {
    if (this._fakingDate) {
      resetDate();
      this._fakingDate = false;
    }
    if (this._fakingTime) {
      this._clock.uninstall();
      this._fakingTime = false;
    }
  }
  useFakeTimers() {
    if (this._fakingDate) {
      throw new Error('"setSystemTime" was called already and date was mocked. Reset timers using `vi.useRealTimers()` if you want to use fake timers again.');
    }
    if (!this._fakingTime) {
      const toFake = Object.keys(this._fakeTimers.timers);
      this._clock = this._fakeTimers.install(__spreadValues({
        now: Date.now(),
        toFake
      }, this._userConfig));
      this._fakingTime = true;
    }
  }
  reset() {
    if (this._checkFakeTimers()) {
      const { now } = this._clock;
      this._clock.reset();
      this._clock.setSystemTime(now);
    }
  }
  setSystemTime(now) {
    if (this._fakingTime) {
      this._clock.setSystemTime(now);
    } else {
      mockDate(now ?? this.getRealSystemTime());
      this._fakingDate = true;
    }
  }
  getRealSystemTime() {
    return this._now();
  }
  getTimerCount() {
    if (this._checkFakeTimers())
      return this._clock.countTimers();
    return 0;
  }
  configure(config) {
    this._userConfig = config;
  }
  _checkFakeTimers() {
    if (!this._fakingTime) {
      throw new Error('Timers are not mocked. Try calling "vi.useFakeTimers()" first.');
    }
    return this._fakingTime;
  }
}

class VitestUtils {
  constructor() {
    this.spyOn = spyOn;
    this.fn = fn;
    this._mocker = typeof __vitest_mocker__ !== "undefined" ? __vitest_mocker__ : null;
    this._mockedDate = null;
    if (!this._mocker) {
      const errorMsg = 'Vitest was initialized with native Node instead of Vite Node.\n\nOne of the following is possible:\n- "vitest" is imported outside of your tests (in that case, use "vitest/node" or import.meta.vitest)\n- "vitest" is imported inside "globalSetup" (use "setupFiles", because "globalSetup" runs in a different context)\n- Your dependency inside "node_modules" imports "vitest" directly (in that case, inline that dependency, using "deps.inline" config)\n- Otherwise, it might be a Vitest bug. Please report it to https://github.com/vitest-dev/vitest/issues\n';
      throw new Error(errorMsg);
    }
    const workerState = getWorkerState();
    this._timers = new FakeTimers({
      global: globalThis,
      config: workerState.config.fakeTimers
    });
  }
  useFakeTimers(config) {
    if (config) {
      this._timers.configure(config);
    } else {
      const workerState = getWorkerState();
      this._timers.configure(workerState.config.fakeTimers);
    }
    this._timers.useFakeTimers();
    return this;
  }
  useRealTimers() {
    this._timers.useRealTimers();
    this._mockedDate = null;
    return this;
  }
  runOnlyPendingTimers() {
    this._timers.runOnlyPendingTimers();
    return this;
  }
  runAllTimers() {
    this._timers.runAllTimers();
    return this;
  }
  runAllTicks() {
    this._timers.runAllTicks();
    return this;
  }
  advanceTimersByTime(ms) {
    this._timers.advanceTimersByTime(ms);
    return this;
  }
  advanceTimersToNextTimer() {
    this._timers.advanceTimersToNextTimer();
    return this;
  }
  getTimerCount() {
    return this._timers.getTimerCount();
  }
  setSystemTime(time) {
    const date = time instanceof Date ? time : new Date(time);
    this._mockedDate = date;
    this._timers.setSystemTime(date);
    return this;
  }
  getMockedSystemTime() {
    return this._mockedDate;
  }
  getRealSystemTime() {
    return this._timers.getRealSystemTime();
  }
  clearAllTimers() {
    this._timers.clearAllTimers();
    return this;
  }
  getImporter() {
    const err = new Error("mock");
    const [, , importer] = parseStacktrace(err, true);
    return importer.file;
  }
  mock(path, factory) {
    this._mocker.queueMock(path, this.getImporter(), factory);
  }
  unmock(path) {
    this._mocker.queueUnmock(path, this.getImporter());
  }
  doMock(path, factory) {
    this._mocker.queueMock(path, this.getImporter(), factory);
  }
  doUnmock(path) {
    this._mocker.queueUnmock(path, this.getImporter());
  }
  async importActual(path) {
    return this._mocker.importActual(path, this.getImporter());
  }
  async importMock(path) {
    return this._mocker.importMock(path, this.getImporter());
  }
  mocked(item, _deep = false) {
    return item;
  }
  isMockFunction(fn2) {
    return isMockFunction(fn2);
  }
  clearAllMocks() {
    spies.forEach((spy) => spy.mockClear());
    return this;
  }
  resetAllMocks() {
    spies.forEach((spy) => spy.mockReset());
    return this;
  }
  restoreAllMocks() {
    spies.forEach((spy) => spy.mockRestore());
    return this;
  }
  stubGlobal(name, value) {
    if (globalThis.window) {
      globalThis.window[name] = value;
    } else {
      globalThis[name] = value;
    }
    return this;
  }
  resetModules() {
    resetModules();
    return this;
  }
}
const vitest = new VitestUtils();
const vi = vitest;

export { getFn as A, getState as B, RealDate as R, isFirstRun as a, beforeAll as b, afterAll as c, describe as d, beforeEach as e, afterEach as f, createExpect as g, expect as h, it as i, vi as j, getRunningMode as k, isWatchMode as l, toString as m, resetRunOnceCounter as n, clearCollectorContext as o, defaultSuite as p, setHooks as q, runOnce as r, suite as s, test as t, getHooks as u, vitest as v, withCallback as w, collectorContext as x, getSnapshotClient as y, setState as z };
