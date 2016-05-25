// service to handle all requests
var NET = {
    send_request: function (method, uri, handler, data) {
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
}
// TODO add user reports
function report_error(err_text) {
    console.log("[ERROR]: " + err_text);
}
