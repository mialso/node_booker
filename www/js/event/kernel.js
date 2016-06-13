var mls_kernel = new Object;
var err = "[ERROR]: <kernel>: ";
onmessage = function(e) {
    console.log("event received by kernel");
    if (!mls_kernel.hasOwnProperty(e.data[0])) {
        console.log(err + "no such module: " + e.data[0]);
        return;
    }
    if (!mls_kernel[e.data[0]].hasOwnProperty(e.data[1])) {
        console.log(err + "module: " + e.data[0] + " has no interface: " + e.data[1]);
        return;
    }
    mls_kernel[e.data[0]][e.data[1]](e.data[2]);
    postMessage(e.data);
}
importScripts("log.js");
onerror = function(e) {
    console.log(err + e.message + " at: " + e.filename + ">line=" + e.lineno);
}
