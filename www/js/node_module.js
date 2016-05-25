/* concept of a module
var Global = (function() {
    var static_data;
    return {
        here comes object
    };
})();
*/
var Node = (function() {
    var instance;
    // static data
    var domel_uri = "/actions/get_node_element.cgi";
    var data_uri = "/actions/get_nodes.cgi";
    var out_splitter = "|";     // in nodes array
    var in_splitter = ";";     // in node data array
    var class_names[] = {"name", "hardware", "boards", "description"};
    /*
    this.__defineGetter__("data_uri", function() {
        return _data_uri;
    }
    */

    // objects server data
    var nodes[];

    // DOM element representation
    var domel_proto;
    var domels[];   // array of DOM elements

    // CSSOM element representation
    var cssomel_proto;
    var cssomels[];

    // states????
    // data states: is_reserved
    // ui states: edit, hover, etc

    // methods('instance' operations/actions)

    // functions('class' operations/actions) 

    function node_ui_push_data(data, index) {
        data.split(in_splitter).forEach(function(elem, ind, arr) {
            var class_name = "." + class_names[ind] + "_data";
            domels[index].querySelector(class_name).innerHTML = elem;
        });
    }
    function parse_nodes_data(data) {
        if (data.length < 2) {
            // TODO user inform
            return;
        }
        var data_arr = data.split(out_splitter);
        data_arr.forEach(function(elem, ind, arr) {
            var node_frag = domel_proto.cloneNode(true);
            domels[ind] = document.querySelector(parent_class).appendChild(node);
            node_ui_push_data(elem, ind);
        });
        im_ready();
    }
    function parse_node_ui_data(data) {
        if (data.length < 2) {
            // TODO user inform
            return;
        }
        domel_proto = UI.fragment_create(data);
        // update common for all nodes data

        NET.send_request("GET", data_uri, parse_nodes_data(data));
    }
    function init_Node() {
        NET.send_request("GET", _domel_uri, parse_node_ui_data);
    }

    // interface
    return {
        get_instance: function () {
            if (!instance) {
                instance = new Object;
            }
            return instance;
        },
        init: init_Node
    }
})();
