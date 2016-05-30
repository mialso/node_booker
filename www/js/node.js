(function() {
    if (typeof app == 'undefined') {
        app = new Object;
    }
    
    var module = "node";
    if (app.hasOwnProperty(module)) {
        console.log("[ERROR]: '" +module+"' module load error: already loaded");
        return;
    }
    var Node = new Object;
    app[module] = (function() {
        Node.__defineGetter__("glob", function() {
            return Node_glob;
        });
        // expose interface
        Node.init = init;
        return Node;
    })();
    
    var Node_glob = {
        // static data
        module_name: "node",
        domel_uri: "/actions/get_node_element.cgi",
        data_uri: "/actions/get_nodes.cgi",
        out_splitter: "|",          // in nodes array
        in_splitter: ";",       // in node data array
        parent_splitter: "$",
        //class_names: ["name", "hardware", "boards", "description"],
    
        // children data
        children: [],
    
        // parent data
        parent_container: "",
    
        // state data
        default_state: "view",
        states: [
            // children states
            [
                // state 1
                {
                name: "view",
                classes: [],
                actions: {
                    },
                },
                // state 2
            ],
        ],
        module_states: [
                // module element states
                // state 1
                {
                name: "view",
                classes: ["node", "border"],
                actions: {
                    },
                },
                //state 2
                {
                name: "edit",
                classes: ["node", "border"],
                actions: {
                    },
                },
                // state 2
        ],
        // handlers
        data_push: function(domel_proto) {
            return function(data, ind, arr) {
                domel_proto.children[ind+1].children[0].innerHTML = data;
            };
        },
        fragment_update: undefined,
    };
    // init function, parent_el is for place to attach element[s]
    function init(parent_el) {
        Node.ui = new app.ui(Node_glob, parent_el);
    }
})();
