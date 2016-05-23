var node_elem;
// main logic on start
function on_load() {
    document.querySelector(".error_panel").style.visibility = "hidden";
    console.log("load event");
    init_user();
    // init nodes logic
    send_request("GET", "/actions/get_node_element.cgi", node_elem_req);
}
document.addEventListener('DOMContentLoaded', on_load);

// service to handle all requests
function send_request(method, uri, handler, data) {
    var req;
    if (window.XMLHttpRequest) {
        req = new XMLHttpRequest();
    }
    else if (window.ActiveXObject) {
        req = new ActiveXObject("Microsoft.XMLHTTP");
    }
    if (!req) {
        report_error("unable to create request to " + uri);
    }
    req.onreadystatechange = function() {
        if (req.readyState === XMLHttpRequest.DONE) {
            if (req.status === 200) {
                console.log(uri + " response = " + req.responseText);
                handler(req.responseText);
            } else {
                report_error("request receive data error from " + uri);
            }
        }
    };
    req.open(method, uri);
    if (data) {
        req.send(data)
    }
    else {
        req.send();
    }
}
function report_error(err_text) {
    console.log("[ERROR]: " + err_text);
}
function get_parent(el, class_name) {
    var elem = el.parentElement;
    while (!elem.classList.contains(class_name)) {
        if (elem.classList.contains("main")) {
            return null;
        }
        elem = elem.parentElement;
    }
    return elem;
}
