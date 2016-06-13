(function(global) {
    if (typeof global.app === 'undefined') {
        global.app = new Object;
    }
    var app = global.app;
    
    //var module_name = User_glob.module_name;
    var S = new Object;
    S.module_name = "user";
    if (app.hasOwnProperty("user")) {
        // TODO remove this to error ringbuffer
        /* TODO this is container error, i need to create container test before loading modules... however, this is really impossible - if app is created by me... the one possibility is to load script twice */
        //console.log("[ERROR]: '" + imodule_name + "' module load error: already loaded");
        return;
    }
    var User = new Object;
    app.user = (function() {
        User.__defineGetter__("glob", function() {
            return User_glob;
        });
        User.__defineSetter__("test_case", function(bool) {
            counter = bool ? 0 : 1;
            User.role = undefined;
            User.ui = undefined;
        });
        // expose interface
        User.init = init;
        return User;
    })();

    var counter = 0;
    function init(handler) {
        var error = false;
        if (counter > 0) {
            error = "user already initialized";
            app.log.error(S.module_name, "init(): " + error);
            handler(error);
            return;
        }
        ++counter;
        // get user credentials
        User.name = localStorage.hasOwnProperty("user") ? localStorage.getItem("user") : "";
        if (!User.name && User.name.length < 1) {
            error = "unable to get user token from storage";
            app.log.error(S.module_name, "init(): " + error);
            handler(error);
            return;
        }
        // get user data from server
        var Net = new app.net.get_instance();
        Net.send_request("GET", this.glob.data_uri + "?" + User.name, get_user_data_handler);
        function get_user_data_handler(data) {
            if (data.length < 3) {
                error = "no user data received";
                app.log.error(S.module_name, "init(): get_user_handler(): " + error);
                handler(error);
                return;
            }
            var role_name = data.split(";")[1].slice(0,-1);
            User.role = User_role[role_name];
            if (!User.role) {
                error = "unable to get user role";
                app.log.error(S.module_name, "init(): get_user_handler(): " + error);
                handler(error);
                return;
            }
            User.glob.data = User.name + ";" + data;
            User.ui = new app.ui.instance(User_glob);
            handler();
        }
    }
    var User_role = {
        guest: {
            all: false,
            view: true,
            read: {user: true, reserve: true, node: true},
            manage: false,
        },
        regular: {
            all: false,
            view: true,
            read: {user: true, reserve: true, node: true},
            manage: true,
            create: {reserve: true},
            owner: true
        },
        admin: {
            all: true,
            view: true,
            manage: true,
        },
        // additional role, exclusive for some data-object
        owner: {
            update: {reserve: true},
            remove: {reserve: true}
        }
    }
    var User_glob = {
        // static data
        module_name: "user",
        domel_uri: "/actions/get_user_ui.cgi",
        data_uri: "/actions/get_user.cgi",
        data: "",
        out_splitter: "|",          // in nodes array
        in_splitter: ";",       // in node data array
        parent_splitter: "$",
        // state data
        default_state: "view",
        states: [
            // children states
            [],
        ],
        module_states: [
                // module element states
                // state 1
                {
                name: "view",
                classes: [],
                actions: {
                    },
                },
                //state 2
                {
                name: "edit",
                classes: [],
                actions: {
                    },
                },
                // state 2
        ],
        data_push: function(element) {
            return function(data, ind) {
                switch (ind) {
                    case 0: element.querySelector(".user_name").innerHTML = data;
                            break;
                    case 1: break;  // email is not used yet
                    case 2: //User.role = User_role[data];
                            break;
                    default:    app.log.error(S.module_name, "data_push(): default case, some data unexpected");
                            break;
                }
            }
        },
        fragment_update: undefined,
    }
})(this);
