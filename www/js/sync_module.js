(function() {
    if (typeof app == 'undefined') {
        app = new Object;
    }
    
    var module = "sync";
    if (app.hasOwnProperty(module)) {
        console.log("[ERROR]: '" + module + "' module load error: already loaded");
        return;
    }
    var Sync = new Object;
    //var Component = new Array;
    app[module] = (function() {
        // expose interface
        Sync.init_component = init_component;
        return Sync;
    })();
    // component is an array of ui modules, that depends on each other
    function init_component(elements, component_parent_el) {
        var counter = elements.length;
    
        function ready_callback() {
            --counter;
            if (!counter) {
                component_on_ready(elements, component_parent_el);
            }
        };
        elements.forEach(function(elem, ind, arr) {
            elem.on_ready(ready_callback);
            elem.init();
        });
    };
    // called by Sync when all modules are ready
    function component_on_ready(arr, parent_el) {
        var parent_node = parent_el;
        for (var i = 0; i < arr.length; ++i) {
            arr[i].add_to_parent(parent_node);
            parent_node = arr[i];
        }
    }
})();
