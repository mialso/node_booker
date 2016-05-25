function SYNC_init(elements, on_ready) {
    var counter = elements.length;

    function ready_callback() {
        --counter;
        if (!counter) {
            on_ready(elements);
        }
    };
    elements.forEach(function(elem, ind, arr) {
        elem.ready(ready_callback);
        elem.init();
    });
};
