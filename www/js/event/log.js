(function(kernel) {
    var Log = new Object;
    kernel.log = Log;
        
    /*
    Log.error = function([module, proc, description]) {
        console.log("[ERROR]: <" + module + ">: " + proc + "(): " + description);
    */
    Log.error = function(data) {
        console.log("[ERROR]: <" + data[0] + ">: " + data[1] + "(): " + data[2]);
    }
    Log.handle = function(arr) {
        if (!Log.hasOwnProperty(arr[1])) {
            Log.error("log", "handle", "no such interface: " + arr[1]);
        }   
        Log.error(arr[0], arr[1], arr[2]);
    }
})(mls_kernel);
