(function(glob) {
    if (!glob.Worker) {
        // TODO fall back to one worker model
        console.log("[ERROR]: <kernel_i>: no glob worker");
        return;// return for now
    }
    if (!glob.app) {
        glob.app = new Object;
    }
    // init Kernel
    var Kernel = new Object;
    var kernel_worker = new Worker("js/event/kernel.js");
    // object to hold all ui_module objects interfaces
    var UI_modules = new Object;
    // kernel interface
    Kernel.new_ev = function(module_name, action_name, data) {
        kernel_worker.postMessage([module_name, action_name, data]);
    }
    Kernel.create_handler = function(module_name, proc_name, proc) {
        if (!UI_modules[module_name]) {
            UI_modules[module_name] = new Object;
        }
        UI_modules[module_name][proc_name] = proc;
    }
    kernel_worker.onmessage = function(e) {
        //console.log(e.data[0] + ":" + e.data[1] + "| user space message: " + e.data[2]);
        // exec appropriate interface
        if (!UI_modules.hasOwnProperty(e.data[0])) {
            // TODO error: no such module
            return;
        }
        if (!UI_modules[e.data[0]].hasOwnProperty(e.data[1])) {
            // TODO error: no such module interface
            return;
        }
        UI_modules[e.data[0]][e.data[1]](e.data[2]);
    }
    document.addEventListener("DOMContentLoaded", function(event) {
        if (!glob.ui_modules) {
            console.log("[ERROR]: <kernel>: DOMContentLoaded: no ui_modules available");
            return;
        }
        for (var module_init in glob.ui_modules) {
            if (glob.ui_modules.hasOwnProperty(module_init)) {
                glob.ui_modules[module_init]();
                delete glob.ui_modules[module_init];
            }
            else {
                console.log("[ERROR]: <kernel>: DOMContentLoaded: " + module_init + " is not a property of 'ui_modules'");
            }
        }
        delete glob.ui_modules;
    });

    glob.app.kernel = Kernel;

})(window);
