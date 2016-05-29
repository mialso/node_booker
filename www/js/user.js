(function() {
    if (typeof app == 'undefined') {
        app = new Object;
    }
    
    var module = "user";
    if (app.hasOwnProperty(module)) {
        console.log("[ERROR]: '" + module + "' module load error: already loaded");
        return;
    }
    var User = new Object;
    app[module] = (function() {
        User.__defineGetter__("glob", function() {
            return User_glob;
        });
        // expose interface
        User.init = init;
        //User.role = User_role.guest;
        return User;
    })();

    var counter = 0;
    function init() {
        if (counter > 0) {
            app.log.error(module, "init(): user allready initialized");
            return;
        }
        ++counter;
        // get user credentials
        User.name = localStorage.getItem("user");   // STUB
        // get user role
        User.role = User_role.guest;    // STUB
        // get user UI
        User.ui = new app.ui(User_glob);
    }
    var User_role = {
        guest: {
            all: false,
            read: {user: true, reserve: true, node: true},
        },
        regular: {
            all: false,
            read: {user: true, reserve: true, node: true},
            create: {reserve: true},
            owner: true
        },
        admin: {
            all: true
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
                    on_click: undefined,
                    },
                },
                //state 2
                {
                name: "edit",
                classes: [],
                actions: {
                    on_click: undefined, 
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
                    case 2: User.role = User_role[data];
                            break;
                    default:    app.log.error(module, "data_push(): default case, some data unexpected");
                            break;
                }
            }
        },
        fragment_update: undefined,
    }
})();
