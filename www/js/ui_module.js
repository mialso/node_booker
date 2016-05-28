function UI_module (GLOB, parent_ui) {
    // all static data in GLOB
    var im_ready;

    // DOM element representation
    var domel_proto;
    var domels = new Array;   // array of UI_elements

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
        data_arr.forEach(GLOB.data_push(domels[index].frag));
    }
    function parse_nodes_data(data) {
        if (data.length < 2) {
            // TODO user inform
            return;
        }
        var data_arr = data.split(GLOB.out_splitter);
        data_arr.forEach(function(elem, ind, arr) {
            domels[ind] = new UI_element(domel_proto.cloneNode(true));
            node_ui_push_data(elem, ind);
            domels[ind].set_self(ind);
            domels[ind].state = GLOB.default_state;
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
                    domels[ind].frag = domel_proto;
                }
                domels[ind].frag = el.frag.querySelector("."+GLOB.parent_container).appendChild(domels[ind].frag.firstChild);
            });
        }
        else {
            domels.forEach(function(el,ind) {
                domels[ind].frag = parent_node.appendChild(el.frag.firstChild);
            });
        }
    }
    this.domels = domels;   // array of DOM elements

    
    /*
    function get_elem_data (ind, state_name) {
        for (var  i = 0; i < GLOB.states.length; ++i) {
            var elem = GLOB.states[ind][i];
            if (elem.name == state_name) {
                return elem;
            }
            return null;
        }
    }
    */
    function get_elem_data (state_name) {
        for (var  i = 0; i < GLOB.module_states.length; i++) {
            var elem = GLOB.module_states[i];
            console.log("elem.name ="+elem.name);
            console.log("state.name ="+state_name);
            if (elem.name == state_name) {
                console.log("returning elem.name =" + elem.name);
                return elem;
            }
        }
        return null;
    }
    
    // UI_element constructor
    function UI_element(dom_el, child) {
    
        var self_el;
        var self_ind;
        this.set_self = function(ind) {
            self_ind = ind;
            self_el = domels[ind].frag;
        }
        this.frag = dom_el;

        this.__defineSetter__("state", function(state_name) {
            console.log("state setter, state = "+state_name);
            var elem_data = get_elem_data(state_name);
            if (!elem_data) return;
            console.log("state setter, elem.name = "+elem_data.name);
            update_classes(elem_data.classes);
            update_actions(elem_data.actions);
            }
        );
    
        function update_classes(classes) {
            console.log("update classes");
            console.log("update classes domel.frag = "+ self_el.toString());
            //dom_el.firstChild.className = "";
            self_el.firstChild.className = "";
            classes.forEach(function (class_name) {
                self_el.firstChild.className += (" " + class_name);
            });
        }

        function update_actions(actions) {
            if (actions.on_click) {
                console.log("in constructor ui-el, self_ind = " + self_ind);
                self_el.firstChild.onclick = actions.on_click(domels[self_ind]);
            }
        }
    }
};
