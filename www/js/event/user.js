(function(kernel) {

    var User = new Object;
    kernel.user = User;

    User.__defineSetter__("name", function(name) {
        //app.kernel.new_ev("user", "ui_change", name);
        postMessage(["user", "ui_change",  name]);
    });
    User.get_user = function(token) {
        User.name = token + "**t";
    }
})(this.mls_kernel);
