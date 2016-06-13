(function(glob) {
    if (!glob.ui_modules) {
        glob.ui_modules = new Object;
    }
    app = glob.app;
    var UI = new Object;
    var module_name = "user";
    UI[module_name] = new Object;
    UI[module_name].update = function(data) {
        document.querySelector("."+module_name).innerHTML = data;
    }
    // init, is called by kernel on document load
    ui_modules[module_name] = function() {
        document.querySelector("."+module_name).innerHTML = "no data";
        app.kernel.create_handler(module_name, "ui_change", function(data) {
            UI[module_name].update(data);
        });
    }
})(window);
