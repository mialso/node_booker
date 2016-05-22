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
function node_elem_req(data) {
    node_elem = node_elem_create(data);
    send_request("GET", "/actions/get_nodes.cgi", nodes_req);
}
function nodes_req(data) {
    var nodes = data.split("|");
    nodes.forEach(function(elem, ind, arr) {
        node_fill_data(node_elem, elem);
        var new_node = node_elem.cloneNode(true);
        document.body.querySelector(".main").appendChild(new_node);
    });
}
