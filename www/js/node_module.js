var Node = {
    // static data
    domel_uri: "/actions/get_node_element.cgi",
    data_uri: "/actions/get_nodes.cgi",
    out_splitter: "|",          // in nodes array
    in_splitter: ";",       // in node data array
    parent_splitter: "$",
    class_names: ["name", "hardware", "boards", "description"],

    // parent data
    parent_container: "",

    // handlers
    data_push: function(class_names, domel_proto) {
        return function(elem, ind, arr) {
            var class_name = "." + class_names[ind] + "_data";
            domel_proto.querySelector(class_name).innerHTML = elem;
        };
    },
    fragment_update: undefined,
};
