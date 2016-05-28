function UI_module (GLOB, parent_ui) {
    // all static data in GLOB
    var im_ready;

    // DOM element representation
    var domel_proto;            // template
    var domels = new Array;     // array of UI_elements

    // create template from html string
    function template_create(html_string) {
        var div = document.createElement('div');
        div.innerHTML = html_string;
        if (GLOB.fragment_update) {
            GLOB.fragment_update(div.children[0]);
        }
        return div.children[0];
    }

    // service to call server
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
        // TODO move 'data_push' to UI_element
        data_arr.forEach(GLOB.data_push(domels[index].frag));
    }
    // create UI_elements from data
    function parse_nodes_data(data) {
        if (data.length < 2) {
            // TODO user inform
            return;
        }
        var data_arr = data.split(GLOB.out_splitter);
        data_arr.forEach(function(elem, ind, arr) {
            domels[ind] = new UI_element();
            domels[ind].set_self(domel_proto.cloneNode(true), ind);
            node_ui_push_data(elem, ind);
            // TODO let user decide which state to be default
            domels[ind].state = GLOB.default_state;
        });
        im_ready();
    }
    // create template element
    function parse_node_ui_data(data) {
        if (data.length < 2) {
            // TODO user inform
            return;
        }
        domel_proto = template_create(data);
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
                    domels[ind] = new UI_element();
                    domels[ind].set_self(domel_proto.cloneNode(true), ind);
                    domels[ind].state = GLOB.default_state;
                }
                domels[ind].frag = el.frag.querySelector("."+GLOB.parent_container).appendChild(domels[ind].frag);
            });
        }
        else {
            domels.forEach(function(el,ind) {
                el.frag = parent_node.appendChild(el.frag);
            });
        }
    }
    this.domels = domels;   // array of DOM elements
    
    // UI_element constructor
    function UI_element() {
    
        var self_el;
        var self_ind;
        this.set_self = function(domel, ind) {
            self_ind = ind;
            self_el = domel;
        }
        this.__defineGetter__("frag", function() {return self_el;});

        this.__defineSetter__("state", function(state_name) {
            var elem_data = get_elem_data(state_name);

            if (!elem_data) {return;}

            update_classes(elem_data.classes);
            update_actions(elem_data.actions);
            }
        );
    
        function update_classes(classes) {
            self_el.className = "";
            classes.forEach(function (class_name) {
                self_el.className += (" " + class_name);
            });
        }

        function update_actions(actions) {
            if (actions.on_click) {
                self_el.onclick = actions.on_click(domels[self_ind]);
            }
        }
    }

    function get_elem_data (state_name) {
        var states = GLOB.module_states;
        for (var  i = 0; i < states.length; i++) {
            var elem = states[i];
            if (elem.name == state_name) {
                return elem;
            }
        }
        return null;
    }
};
