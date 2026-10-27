import bufferModule from "node:buffer";

// Polyfill SlowBuffer for Node.js 22+ / 26+ compatibility where SlowBuffer was deprecated/removed
if (!bufferModule.SlowBuffer) {
  bufferModule.SlowBuffer = bufferModule.Buffer;
}
if (typeof globalThis !== "undefined" && !globalThis.SlowBuffer) {
  globalThis.SlowBuffer = bufferModule.Buffer;
}
