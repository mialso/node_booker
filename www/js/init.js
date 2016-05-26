document.addEventListener('DOMContentLoaded', on_load);
var app_data = new Object;
function on_load() {

    // init nodes
    var node_data = [
        "/actions/get_node_element.cgi",
        "/actions/get_nodes.cgi",
        "|",
        ";",
        "$",
        ["name", "hardware", "boards", "description"],
    ]
    var reserve_data = [
        "/actions/get_reserve_element.cgi",
        "/actions/reserves_get_all.cgi",
        "|",
        ";",
        "$",
        ["date_start", "date_end"],
        "node_reserve"
    ]
    var Node = new UI_element(node_data, false);
    var Reserve = new UI_element(reserve_data, Node.children);
    var node_ui_stack = [Node, Reserve];
    SYNC_init(node_ui_stack, node_ui_stack_on_ready);
    app_data.Node = Node;
    app_data.Reserve = Reserve;
}
function node_ui_stack_on_ready(arr) {
    var parent_node = document.querySelector(".main");
    for (var i = 0; i < arr.length; ++i) {
        console.log("on_ready, i = " + i);
        arr[i].add_to_parent(parent_node);
        parent_node = arr[i];
    }
}
