(function(glob) {
    if (!glob.ui_modules) {
        glob.ui_modules = new Object;
    }
    app = glob.app;
    var UI = new Object;
    var module_name = "user";
    UI[module_name] = new Object;
    UI[module_name].update = function(data) {
        document.querySelector("."+module_name+" p").innerHTML = data;
    }
    // init, is called by kernel on document load
    ui_modules[module_name] = function() {
        document.querySelector("."+module_name+" p").innerHTML = "no data";
        document.querySelector("."+module_name+" button").onclick = update_user;
        document.querySelector("."+module_name+" button").innerHTML = "update user";
        document.querySelector("."+module_name+" .test1 button").onclick = update_user_test;
        document.querySelector("."+module_name+" .test2 button").onclick = update_user_default_test;
        app.kernel.create_handler(module_name, "ui_change", function(data) {
            UI[module_name].update(data);
        });
    }
    function update_user() {
        var token = localStorage.getItem('user');
        if (!token) token = "default_token"; 
        app.kernel.new_ev("user", "get_user", token);
    }
    function update_user_test() {
        var token = "some_token";
        var prev_token = localStorage.getItem("user");
        localStorage.setItem("user", token);
        app.kernel.create_mock("user", "get_user");
        update_user();
        var result = app.kernel.get_mock_data("user", "get_user");
        app.kernel.remove_mock("user", "get_user");
        if (token === result) {
            // success
            console.log("[PASSED] update_user test");
        } else {
            console.log("[FAILED]: update_user test: " + token +" != "+result);
        }
        localStorage.setItem("user", prev_token);
    }
    function update_user_default_test() {
        var token = "default_token";
        var prev_token = localStorage.getItem("user");
        localStorage.removeItem("user");
        app.kernel.create_mock("user", "get_user");
        update_user();
        var result = app.kernel.get_mock_data("user", "get_user");
        app.kernel.remove_mock("user", "get_user");
        if (token === result) {
            // success
            console.log("[PASSED] update_user_default test");
        } else {
            console.log("[FAILED]:  update_user_default test: " + token +" != "+result);
        }
        localStorage.setItem("user", prev_token);

    }
})(window);
