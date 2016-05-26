function UI_element (static_data, parent_ui) {
    var im_ready;
    // static data
    var domel_uri = static_data[0];
    var data_uri = static_data[1];
    var out_splitter = static_data[2];     // in nodes array
    var in_splitter = static_data[3];     // in node data array
    var parent_splitter = static_data[4];
    var class_names = static_data[5];
    var child_container = static_data[6];

    // DOM element representation
    var domel_proto;
    var domels = new Array;   // array of DOM elements
    //var parent_el = parent_el;

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

    function node_ui_push_data(data, index) {
        var parent_ind;
        var n_data;
        if (!data) {
            // TODO user inform
            return;
        }
        console.log("node_ui_push_data data = " + data);
        var arr = data.split(parent_splitter);
        if (arr.length === 2) {
            parent_ind = arr[0];
            n_data = arr[1];
            console.log("node_ui_push_data parent_ind = " + parent_ind + " data = " + data);
        }
        else {
            n_data = data;
        }
        var data_arr = n_data.split(in_splitter)
        data_arr.forEach(function(elem, ind, arr) {
            var class_name = "." + class_names[ind] + "_data";
            //domels[index].querySelector(class_name).innerHTML = elem;
            console.log("node_ui_push_data class_name: " + class_name);
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
            domels[ind] = domel_proto.cloneNode(true);
            /*
            if (parent_ui) {
                parent_ui[ind] = domels[ind];
            }
            */
            //var node_frag = domel_proto.cloneNode(true);
            //domels[ind] = document.querySelector(parent_class).appendChild(node_frag);
            //domels[ind] = parent_el.appendChild(node_frag);
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
    this.add_to_parent = function (parent_node) {
        if (parent_node.domels) {
            parent_node.domels.forEach(function(el,ind) {
                el.querySelector("."+child_container).appendChild(domels[ind]);
            });
        }
        else {
            domels.forEach(function(el,ind) {
                domels[ind] = parent_node.appendChild(el.firstChild);
            });
        }
    }
    this.domels = domels;   // array of DOM elements
};
