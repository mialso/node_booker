var user = new Object();
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
function user_update_view() {
    document.getElementById("user_name").innerHTML = "Hi, " + user.name;
}
function user_set_actions() {

}
