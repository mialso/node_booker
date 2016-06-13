(function(glob) {

    var User = new Object;

    User.__defineSetter__("name", function(name) {
        app.kernel.new_ev("user", "ui_change", name);
    });
})(window);
