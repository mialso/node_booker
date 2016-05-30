(function() {
    if (typeof app == 'undefined') {
        app = new Object;
    }
    
    var module = "ui";
    if (app.hasOwnProperty(module)) {
        console.log("[ERROR]: '" +module+"' module load error: already loaded");
        return;
    }
    app[module] = (function() {
        // expose interface
        return UI_module;
    })();

    function UI_module (GLOB, parent_ui) {
        // all static data in GLOB
        var im_ready;
    
        // DOM element representation
        var domel_proto;            // template
        var domels = new Array;     // array of UI_elements

        // service to call server
        if (!app.net) {
            app.log.error(module, "'app.net' is not available");
            return;
        }
        var N = new app.net.get_instance();
    
        // create template from html string
        function template_create(html_string) {
            var div = document.createElement('div');
            div.innerHTML = html_string;
            if (GLOB.fragment_update) {
                GLOB.fragment_update(div.children[0]);
            }
            return div.children[0];
        }
    
        function node_ui_push_data(data, index) {
            var parent_ind = index;
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
            domels[parent_ind] = new UI_element();
            domels[parent_ind].set_self(domel_proto.cloneNode(true), parent_ind);
            var data_arr = n_data.split(GLOB.in_splitter)
            // TODO move 'data_push' to UI_element
            domels[parent_ind].data = data_arr;
            domels[parent_ind].state = GLOB.default_state;
        }
        // create UI_elements from data
        function parse_nodes_data(data) {
            if (data.length < 2) {
                app.log.error(module, "parse_nodes_data(): no data");
                return;
            }
            data = data.slice(0,-1);
            var data_arr = data.split(GLOB.out_splitter);
            data_arr.forEach(function(elem, ind, arr) {
                node_ui_push_data(elem, ind);
                // TODO let user decide which state to be default
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
            if (!app.user.role.all && !app.user.role.read[GLOB.module_name]) {
                app.log.error(module, "init(): user not authorised to get data");
                return;
            }
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
                var state = get_state_by_name(state_name);
    
                if (!state) {return;}
    
                update_classes(state.classes);
                update_actions(state.actions);
                }
            );
            this.__defineSetter__("data", function(data_arr) {
                data_arr.forEach(GLOB.data_push(this.frag));
            });
        
            function update_classes(classes) {
                self_el.className = "";
                classes.forEach(function (class_name) {
                    self_el.className += (" " + class_name);
                });
            }
    
            function update_actions(action) {
                if (!action.element) {
                    return;
                }
                self_el.querySelector("."+action.element)[action.evnt] = action.handler(domels[self_ind]);
                self_el.querySelector("."+action.element).innerHTML = action.data;
            }
        }
    
        function get_state_by_name (state_name) {
            var states = GLOB.module_states;
            for (var  i = 0; i < states.length; i++) {
                var state = states[i];
                if (state .name == state_name) {
                    return state ;
                }
            }
            return null;
        }
    };
})();
