(function(global) {
    if (typeof global.app == 'undefined') {
        global.app = new Object;
    }
    var app = global.app;
    
    var module = "net";
    if (app.hasOwnProperty(module)) {
        console.log("[ERROR]: '" +module+"' module load error: already loaded");
        return;
    }
    var Net = new Object;
    app[module] = (function() {
        // expose interface
        Net.get_instance = NET;
        return Net;
    })();
    // service to handle all requests
    function NET() {
        this.send_request = function (method, uri, handler, data) {
            var req, error;
            if (window.XMLHttpRequest) {
                req = new XMLHttpRequest();
            }
            else if (window.ActiveXObject) {
                req = new ActiveXObject("Microsoft.XMLHTTP");
            }
            if (!req) {
                error = "unable to create request";
                app.log.error(module, "send_request(): " + error + " to: " + uri);
                return;
            }
            req.onreadystatechange = function() {
                if (req.readyState === XMLHttpRequest.DONE) {
                    if (req.status === 200) {
                        app.log.info(module, "req.onreadystatechange(): " + "uri: " + uri + " response: " + req.responseText);
                        handler(req.responseText);
                    } else {
                        error = "request receive data error";
                        app.log.error(module, "req.onreadystatechange(): " + error + " code =" + req.status + " uri: " + uri);
                    }
                }
            };
            req.open(method, uri);
            data ? req.send(data) : req.send();
            /*
            if (data) {
                req.send(data)
            }
            else {
                req.send();
            }
            */
        }
    }
})(this);
