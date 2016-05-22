function init_nodes() {

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
function node_fill_data(node_frag, data) {
    var node_data = data.split(";");
    node_data.forEach(function(elem, ind, arr) {
        var class_name = "." + get_class_name(ind) + "_data";
        node_frag.querySelector(class_name).innerHTML = elem;
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
// node_elem_request handler
function node_elem_req(data) {
    node_elem = node_elem_create(data);
    send_request("GET", "/actions/get_nodes.cgi", nodes_req);
}
function nodes_req(data) {
    var nodes = data.split("|");
    nodes.forEach(function(elem, ind, arr) {
        node_fill_data(node_elem, elem);
        var new_node = node_elem.cloneNode(true);
        new_node.firstChild.setAttribute("id", ind);
        new_node.firstChild.querySelector(".edit_button").onclick = get_node_pop_up(ind);
        document.body.querySelector(".main").appendChild(new_node);
    });
}
function get_node_pop_up(id) {
    return function() {
        var node = document.getElementById(id);
        document.getElementById("pop_up_container").appendChild(node);
        document.getElementById("my_popup").style.display = "block";
        document.getElementById("pop_up_container").style.display = "block";
        //node.setAttribute("style", "z-index: 25");
    };
}
function close_node_pop_up() {
    var node = document.getElementById("pop_up_container").firstChild;
    document.getElementById("my_popup").style.display = "none";
}
// rearrange all nodes according to reserve time
function push_node_to_list(node) {

}
