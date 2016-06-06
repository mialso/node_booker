(function(global) {
    if (!global.app) {
        global.app = new Object;
    }
    var app = global.app;
    var module_name = "app";

    app.kernel = new Object;
    app.kernel.test = new kernel_test;

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
    function kernel_test() {
        this.init = function(cb) {
            var err = error(cb);
            if (!app.net) {
                err("no net module");
                return;
            }
            var N = new app.net.get_instance();
            N.send_request("GET", "/actions/get_app_data.cgi", handler);
            function handler(data) {
                if (data.length < 3) {
                    err("no data");
                    return;
                }
                GLOB = JSON.parse(data);
                if (typeof GLOB !== 'object') {
                    // error: parse error
                    err("parse error");
                    return;
                }
                cb(null);
            }

        }
        this.modules_load = function(cb) {
            var err = error(cb);
            // get design data

                //var model = JSON.parse(data);
                // check module existence
                var result = new Object;
                for (var key in GLOB.modules) {
                    result[key] = new Object;
                    GLOB.modules[key].forEach(function(item, ind, arr) {
                        result[key][item] = app.hasOwnProperty(item) ? true : false;
                    });
                }
                cb(null, result);
        }
    }
    function error(callback) {
        var prefix = "[ERROR]: " + "<" + module_name + "> :";
        return function(message) {
            callback(prefix+message, null);
        }
    }
})(this);
