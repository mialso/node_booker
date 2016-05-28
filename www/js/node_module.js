var Node = {
    // static data
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
                on_click: undefined,
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
                on_click: undefined,
                on_hover: {},
                },
            },
            //state 2
            {
            name: "edit",
            classes: ["node", "border"],
            actions: {
                on_click: undefined, 
                on_hover: {},
                },
            },
            // state 2
    ],
    // handlers
    data_push: function(domel_proto) {
        return function(elem, ind, arr) {
            domel_proto.firstChild.children[ind+1].children[0].innerHTML = elem;
        };
    },
    fragment_update: undefined,
};
