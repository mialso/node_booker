function UI_element (GLOB, parent_ui) {
    // all static data in GLOB
    var im_ready;

    // DOM element representation
    var domel_proto;
    var domels = new Array;   // array of DOM elements

    function fragment_create(htmlString) {
        var fragment = document.createDocumentFragment();
        var temp = document.createElement('div');
        temp.insertAdjacentHTML('afterbegin', htmlString);
        while (temp.firstChild) {
            fragment.appendChild(temp.firstChild);
        }
        if (GLOB.fragment_update) {
            GLOB.fragment_update(fragment);
        }
        return fragment;
    }

    var N = new NET();

    function node_ui_push_data(data, index) {
        var parent_ind;
        var n_data;
        if (!data) {
            // TODO user inform
            return;
        }
        var arr = data.split(GLOB.parent_splitter);
        if (arr.length === 2) {
            parent_ind = arr[0];
            n_data = arr[1];
        }
        else {
            n_data = data;
        }
        var data_arr = n_data.split(GLOB.in_splitter)
        data_arr.forEach(GLOB.data_push(GLOB.class_names, domel_proto));
    }
    function parse_nodes_data(data) {
        if (data.length < 2) {
            // TODO user inform
            return;
        }
        var data_arr = data.split(GLOB.out_splitter);
        data_arr.forEach(function(elem, ind, arr) {
            node_ui_push_data(elem, ind);
            domels[ind] = domel_proto.cloneNode(true);
        });
        im_ready();
    }
    function parse_node_ui_data(data) {
        if (data.length < 2) {
            // TODO user inform
            return;
        }
        domel_proto = fragment_create(data);
        // update common for all nodes data

        N.send_request("GET", GLOB.data_uri, parse_nodes_data);
    }
    function init() {
        N.send_request("GET", GLOB.domel_uri, parse_node_ui_data);
    }
    // interface
    this.init = init
    this.on_ready = function (func) {
        im_ready = func;
    }
    this.add_to_parent = function (parent_node) {
        if (parent_node.domels) {
            parent_node.domels.forEach(function(el,ind) {
                if (!domels[ind]) {
                    domels[ind] = domel_proto;
                }
                el.querySelector("."+GLOB.parent_container).appendChild(domels[ind]);
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
