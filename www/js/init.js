document.addEventListener('DOMContentLoaded', on_load);

function on_load() {

    document.querySelector(".error_panel").style.visibility = "hidden";
    // init user
    app.user.init();
    // init UI
    app.node.init();
    app.reserve.init(app.node.ui);
    // get data and add elements to DOM
    app.sync.init_component([app.node.ui, app.reserve.ui], document.querySelector(".main"));
    app.sync.init_component([app.user.ui], document.querySelector(".user_bar"));
}
