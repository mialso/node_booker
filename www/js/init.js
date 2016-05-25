document.addEventListener('DOMContentLoaded', on_load);
var app_data = new Object;
function on_load() {

    // init nodes
    var node_data = [
        "/actions/get_node_element.cgi",
        "/actions/get_nodes.cgi",
        "|",
        ";",
        ["name", "hardware", "boards", "description"],
        ".main"
    ]
    app_data.node = new UI_element(node_data);
    var node_ui_stack = [app_data.node];
    SYNC_init(node_ui_stack, node_ui_stack_on_ready);
}
function node_ui_stack_on_ready() {
    console.log("node_ui_stack_on_ready");
}
