function reserve_set(event) {
    var day = event.currentTarget;
    var node = get_parent(day, "node");
    if (!node) {
        report_error("reserve_set() failed to find node");
        return;
    }
    node.mls_reserve = day.mls_id + 1;
    var days = day.parentElement.querySelectorAll(".day");
    for (var i = 0; i < days.length; ++i) {
        var el = days[i];
        if (i <= day.mls_id) {
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
    request = node.mls_node_id + ">" + "0" + ";" + node.mls_reserve;
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
        //months[1].setAttribute("style", "border-left:'2px solid black';");
        month_date = new Date(date + dayint*(split+1));
        months[1].innerHTML = "<p>" + month_date.toDateString().split(" ")[1] + "</p>";
    }
}
