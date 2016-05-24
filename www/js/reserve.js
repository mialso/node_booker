/*  TODO refactor all logic
*   with respect to object -static and -dynamic data
*   and also with DOM, CSSOM and 'real' data in mind
*/
function reserve_set(event) {
    var day = event.currentTarget;
    var node = get_parent(day, "node");
    if (!node) {
        report_error("reserve_set() failed to find node");
        return;
    }
    node.mls_reserve = day.mls_id + 1;
    var days = day.parentElement.querySelectorAll(".day");
    reserve_set_num(day.mls_id +1, days);
    reserve_enable(node.querySelector(".reserve"));
}
function reserve_set_num(num, days) {
    for (var i = 0; i < days.length; ++i) {
        var el = days[i];
        if (i < num) {
            if (!el.classList.contains("booked")) {
                el.classList.toggle("booked");
            }
        }
        else {
            if (el.classList.contains("booked")) {
                el.classList.toggle("booked");
            }
        }
    }
}
function reserve_edit(event) {
    var node = event.currentTarget.parentElement.parentElement;
    
    document.getElementById("my_popup").style.display = "block";
    document.getElementById("my_popup").onclick = reserve_close_pop_up;
    document.getElementById("pop_up_container").appendChild(node);
    document.getElementById("pop_up_container").style.display = "block";
    // update days to be actionable
    var days = node.querySelectorAll(".day");
    for (var i = 0; i < days.length; ++i) {
        days[i].classList.add("edit");
        days[i].mls_id = i;
        days[i].onclick = reserve_set;
    }
    // update action button
    node.querySelector(".edit_button").onclick = reserve_save;
    node.querySelector(".edit_button").innerHTML = "save";
}
function reserve_close_pop_up(event) {
    var node = document.getElementById("pop_up_container").firstChild;
    // update days to be not actionable
    var days = node.querySelectorAll(".day");
    for (var i = 0; i < days.length; ++i) {
        var el = days[i];
        el.classList.remove("edit");
        el.onclick = null;
    }
    var close_link = document.getElementById("my_popup");
    close_link.style.display = "none";
    close_link.onclick = null;
    node.querySelector(".edit_button").innerHTML = "edit";
    node.querySelector(".edit_button").onclick = reserve_edit;
    push_node_to_list(node);
}
function reserve_save(event) {
    var request = "";
    var node = get_parent(event.currentTarget, "node");
    var date_due = new Date();
    var dayint = 1000*60*60*24;
    request = node.mls_node_id + ">" + "0" + ";" + (date_due.getTime() + (dayint*node.mls_reserve));
    send_request("POST", "/actions/reserve_add.cgi", reserve_save_handler(node), request);
}
function reserve_save_handler(node) {
    return function(data) {
        console.log("reserve_save_handler data = " + data);
        node.querySelector(".edit_button").innerHTML = data;
    }
}
function reserves_get() {
    send_request("GET", "/actions/resrves_get.cgi", reserves_get_handler);
}
function reserves_get_handler(data) {
    console.log("reserves_get data: " + data);
}
function days_update(days, date) {
    var dayint = 1000*60*60*24;
    var months = 1,
        months_split = 10;
    var date_prev = 0;
    for (var i = 0; i < days.length; ++i) {
        var date_n = new Date(date + dayint*i);
        var date_num = date_n.getDate();
        if (date_num < date_prev) {
            // new month case
            ++months; 
            months_split = i;
            console.log("months_split = " + months_split);
        }
        days[i].innerHTML = "<p>" + date_num + "</p>";
        date_prev = date_num;
    }
    days_header_update(date, months, months_split);
}
function days_header_update(date, months, split) {
    var dayint = 1000*60*60*24;
    var months = document.querySelector(".top_panel .reserve").children;
    if (months[0].innerHTML.length > 0) {
        // already set, quit
        return;
    }
    var month_date = new Date(date);
    months[0].style.width = (split)*10 + "%";
    months[0].innerHTML = "<p>" + month_date.toDateString().split(" ")[1] + "</p>";
    if (split < 10) {
        months[1].style.width = (10-split)*10 + "%";
        months[1].style.borderLeft = "2px solid black";
        month_date = new Date(date + dayint*(split+1));
        months[1].innerHTML = "<p>" + month_date.toDateString().split(" ")[1] + "</p>";
    }
}
function reserves_get_data() {
    send_request("GET", "/actions/reserves_get_all.cgi", reserves_data_handler);
}
function reserves_data_handler(data) {
    data.split("|").forEach(function(elem, ind, arr) {
        var reserve_data = elem.split(";");
        var node = document.getElementById(reserve_data[0]);
        var reserve = node.querySelector(".reserve");
        var days_booked = days_booked_calc(reserve_data[2]);
        console.log("days_booked = " + days_booked);
        reserve_set_num(days_booked, reserve.querySelectorAll(".day"));
        reserve_enable(reserve);
    });
}
function reserve_enable(reserve) {
    if (reserve.classList.contains("free")) {
        reserve.classList.remove("free");
    }
    reserve.classList.add("booked");
}
/* TODO this function is simple but not correct
*  possible solution is to refactor all logic to use days only
*  to avoid every time translation from mseconds to days
*/
function days_booked_calc(date_due) {
    var now_date = new Date();
    var dayint = 1000*60*60*24;
    return (date_due - now_date.getTime())/dayint;
}
