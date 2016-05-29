(function() {
    if (typeof app == 'undefined') {
        app = new Object;
    }
    
    var module = "log";
    if (app.hasOwnProperty(module)) {
        console.log("[ERROR]: '" +module+"' module load error: already loaded");
        return;
    }
    var Log = new Object;
    app[module] = (function() {
        // expose interface
        Log.error = report_error;
        Log.info = report_info;
        return Log;
    })();

    // TODO add user reports
    function report_error(module_name, err_text) {
        console.log("[ERROR]: '" + module_name + "': " + err_text);
    }
    function report_info(module_name, info_text) {
        console.log("[INFO]: '" + module_name + "': " + info_text);
    }
})();
