function init_nodes() {
    send_request("GET", "/actions/get_node_element.cgi", node_elem_req_handler);
}
// node_elem_request handler
function node_elem_req_handler(data) {
    // global object, defined here... UGHHH
    node_elem = node_elem_create(data);
    send_request("GET", "/actions/get_nodes.cgi", nodes_req_handler);
}
// create node from template
function node_elem_create(htmlString) {
    var node = document.createDocumentFragment();
    var temp = document.createElement('div');
    temp.insertAdjacentHTML('afterbegin', htmlString);
    while (temp.firstChild) {
        node.appendChild(temp.firstChild);
    }
    return node;
}
function nodes_req_handler(data) {
    if (!data) {
        return;
    }
    var nodes = data.split("|");
    nodes.forEach(function(elem, ind, arr) {
        node_fill_data(node_elem.firstChild, elem);
        var new_node = node_elem.cloneNode(true);
        //new_node.firstChild.querySelector(".edit_button").onclick = reserve_edit;
        new_node.querySelector(".edit_button").onclick = reserve_edit;
        new_node.firstChild.mls_node_id = ind;
        new_node.firstChild.setAttribute("id", ind);
        days_update(new_node.querySelectorAll(".day"), Date.now());
        document.body.querySelector(".main").appendChild(new_node);
    });
    reserves_get_data();
}
function node_fill_data(node, data) {
    var node_data = data.split(";");
    // this function is defined in reserve.js
    node_data.forEach(function(elem, ind, arr) {
        var class_name = "." + get_class_name(ind) + "_data";
        node.querySelector(class_name).innerHTML = elem;
    });
}
function get_class_name(index) {
    switch (index) {
        case 0:
            return "name";
        case 1:
            return "hardware";
        case 2:
            return "boards";
        case 3:
            return "description";
    }
}
function nodes_req_handler(data) {
    if (!data) {
        return;
    }
    var nodes = data.split("|");
    nodes.forEach(function(elem, ind, arr) {
        node_fill_data(node_elem.firstChild, elem);
        var new_node = node_elem.cloneNode(true);
        //new_node.firstChild.querySelector(".edit_button").onclick = reserve_edit;
        new_node.querySelector(".edit_button").onclick = reserve_edit;
        new_node.firstChild.mls_node_id = ind;
        new_node.firstChild.setAttribute("id", ind);
        days_update(new_node.querySelectorAll(".day"), Date.now());
        document.body.querySelector(".main").appendChild(new_node);
    });
    reserves_get_data();
}
function close_node_pop_up() {
    var node = document.getElementById("pop_up_container").firstChild;
    // update days to be actionable
    var days = node.querySelectorAll(".day");
    for (var i = 0; i < days.length; ++i) {
        var el = days[i];
        el.classList.remove("edit");
        el.onclick = null;
    }
    document.getElementById("my_popup").style.display = "none";
    push_node_to_list(node);
}
// rearrange all nodes according to reserve time
function push_node_to_list(node) {
    document.body.querySelector(".main").appendChild(node);
}
