document.addEventListener('DOMContentLoaded', on_load);

//var app_data = new Object;
function on_load() {


    document.querySelector(".error_panel").style.visibility = "hidden";
    // init UI
    var node = new UI_module(Node, false);
    var reserve = new UI_module(Reserve, Node.children);
    var node_ui_stack = [node, reserve];
    SYNC_init(node_ui_stack, node_ui_stack_on_ready);
    //app_data.node = node;
    //app_data.reserve = reserve;
}
function node_ui_stack_on_ready(arr) {
    var parent_node = document.querySelector(".main");
    for (var i = 0; i < arr.length; ++i) {
        arr[i].add_to_parent(parent_node);
        parent_node = arr[i];
    }
}
