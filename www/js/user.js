var user = new Object();
//user.error = new Object();
//user.error.user_login_error = "user login error";
//user.error.email_enter_error = "incorrect email data";
function init_user() {
    // TODO provide from-in-browser storage logic

    // 
    user.name = localStorage.getItem("user");
    console.log("user name = ", user.name);
    if (user.name === "guest") {
    	user.role = "guest";
    }
    else {
        // TODO update user-role according to name
    }
    user_set_actions();
    user_update_view();
}
/*
function user_log_in() {
    var email = document.getElementById("user_email_text").value;
    if (email.length < 5) {
        report_error(user.error.email_enter_error);
    }

    // send request with user name
    send_request("POST", "/actions/user_log_in.cgi", user_login_handler, email);
    // get response with user role
}
// user_log_in_handler
function user_login_handler(data) {
    var data_arr = data.split(";");
    // early exit if response not OK
    if (data[0] !== "OK") {
            report_error(user.error.user_login_error);
            return;
    }
    // update user data
    user.name = data[1];
    user.role = data[2];
    user_set_actions();
    // update view
    user_update_view();
}
*/
function user_update_view() {
    document.getElementById("user_name").innerHTML = "Hi, " + user.name;
}
function user_set_actions() {

}
