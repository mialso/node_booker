function UI_element (static_data) {
    var im_ready;
    // static data
    var domel_uri = static_data[0];
    var data_uri = static_data[1];
    var out_splitter = static_data[2];     // in nodes array
    var in_splitter = static_data[3];     // in node data array
    var class_names = static_data[4];
    var parent_class = static_data[5];

    // DOM element representation
    var domel_proto;
    var domels = new Array;   // array of DOM elements

    function node_ui_push_data(data, index) {
        var data_arr = data.split(in_splitter)
        data_arr.forEach(function(elem, ind, arr) {
            var class_name = "." + class_names[ind] + "_data";
            //domels[index].querySelector(class_name).innerHTML = elem;
            domel_proto.querySelector(class_name).innerHTML = elem;
        });
    }
    function parse_nodes_data(data) {
        if (data.length < 2) {
            // TODO user inform
            return;
        }
        var data_arr = data.split(out_splitter);
        data_arr.forEach(function(elem, ind, arr) {
            node_ui_push_data(elem, ind);
            var node_frag = domel_proto.cloneNode(true);
            domels[ind] = document.querySelector(parent_class).appendChild(node_frag);
            //node_ui_push_data(elem, ind);
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

        NET.send_request("GET", data_uri, parse_nodes_data);
    }
    function init() {
        NET.send_request("GET", domel_uri, parse_node_ui_data);
    }
    // interface
    this.init = init
    this.ready = function (func) {
        im_ready = func;
    }
};
var UI = {
    fragment_create: function (htmlString) {
        var fragment = document.createDocumentFragment();
        var temp = document.createElement('div');
        temp.insertAdjacentHTML('afterbegin', htmlString);
        while (temp.firstChild) {
            fragment.appendChild(temp.firstChild);
        }
        return fragment;
    }
};
