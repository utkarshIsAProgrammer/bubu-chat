const b = require("node:buffer");

if (!b.SlowBuffer) {
  b.SlowBuffer = b.Buffer;
}
if (!global.SlowBuffer) {
  global.SlowBuffer = b.Buffer;
}
