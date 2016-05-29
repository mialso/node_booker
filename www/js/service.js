(function() {
    if (typeof app == 'undefined') {
        app = new Object;
    }
    
    var module = "info";
    if (app.hasOwnProperty(module)) {
        console.log("[ERROR]: '" +module+"' module load error: already loaded");
        return;
    }
    var Info = new Object;
    app[module] = (function() {
        // expose interface
        Info.error = report_error;
        return Info;
    })();

    // TODO add user reports
    function report_error(module_name, err_text) {
        console.log("[ERROR]: '" + module_Name + "': " + err_text);
    }
})();
