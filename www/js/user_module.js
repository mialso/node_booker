function User_module(GLOB) {

    var name = localStorage.getItem("user");

    /*
    *   GLOB holds data about user roles
    *   and possibly could be loaded on demand by user name
    *   such a way sensitive data could be stored on server
    *   in secure way
    */
    //var GLOB = new User(name);

    var N = new NET();
    function get_user_ui() {
        N.send_request("GET", GLOB.domel_uri, serve_user_ui);

        function serve_user_ui(data) {

        }
    }
    function get_user_data(user_name) {
        N.send_request("GET", GLOB.data_uri, serve_user_data);

        function serve_user_data(data) {

        }
    }
    // interface
    this.__defineGetter__("name", function() {return name;});
};
