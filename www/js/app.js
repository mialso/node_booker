(function(global) {
    if (!global.app) {
        global.app = new Object;
    }
    var app = global.app;
    var module_name = "app";

    app.kernel = new Object;
    //app.kernel.test = new kernel_test;

    app.perform_test = function() {
        function console_test(error, result) {
            if(error) {
                console.log("test error");
                return false;
            }
            if (result) {
                console.log("[TEST]: " + JSON.stringify(result));
                return true;
            }
        }
        app.kernel.test.modules_load(console_test);
    }

    var GLOB;
    app.__defineGetter__("glob", function() {return GLOB;});
})(this);
