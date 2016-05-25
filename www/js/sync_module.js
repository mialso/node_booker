/*
var SYNC = (function () {
    var instance;

    return {
        init: function () {
            if (!instance) {
                instance = init_sync();
            }
            return instance;
        }
    }
})();
*/
function SYNC_init(elements, on_ready) {
    var counter = elements.length;

    function ready_callback() {
        --counter;
        if (!counter) {
            on_ready(elements);
        }
    }
    elements.forEach(function(elem, ind, arr) {
        elem.im_ready = ready_callback;
        elem.init();
    }
};
