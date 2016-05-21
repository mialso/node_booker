var node_elem;
// closure to handle all requests
function send_request(method, uri, handler) {
    var req;
    if (window.XMLHttpRequest) {
        req = new XMLHttpRequest();
    }
    else if (window.ActiveXObject) {
        req = new ActiveXObject("Microsoft.XMLHTTP");
    }
    if (!req) {
        console.log("[ERROR]: unable to create request to " + uri);
    }
    req.onreadystatechange = function() {
        if (req.readyState === XMLHttpRequest.DONE) {
            if (req.status === 200) {
                console.log(uri + " response = " + req.responseText);
                handler(req.responseText);
            } else {
                console.log("[ERROR]: request receive data error from " + uri);
            }
        }
    };
    req.open(method, uri);
    req.send();
}
//window.onload = function() {
document.addEventListener('DOMContentLoaded', on_load);
function on_load() {
    console.log("load event");
    send_request("GET", "/actions/get_node_element.cgi", node_elem_req);
}
