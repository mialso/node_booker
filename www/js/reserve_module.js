var Reserve = {
    // static data
    domel_uri: "/actions/get_reserve_element.cgi",
    data_uri: "/actions/reserves_get_all.cgi",
    out_splitter: "|",          // in nodes array
    in_splitter: ";",       // in node data array
    parent_splitter: "$",
    class_names: [],

    // parent data
    parent_container: "node_reserve",

    // handlers
    data_push: function(class_names, domel_proto) {
        var now_date = new Date();
        var dayint = 1000*60*60*24;
        now_date = now_date.getTime() - (3*dayint);
        return function(elem, ind, arr) {
            if (ind === 1) {
                var days = (elem - now_date)/dayint;
                var day_elems = domel_proto.querySelectorAll(".day");
                console.log("data_push day_elems = " + day_elems.toString());
                for (var i = 0; i < day_elems.length; ++i) {
                    if (i < days) {
                            console.log("adding booked...");
                        if (!day_elems[i].classList.contains("booked")) {
                            console.log("adding booked...");
                            day_elems[i].classList.add("booked");
                        }
                    }
                    else {
                            console.log("removing booked...");
                        if (day_elems[i].classList.contains("booked")) {
                            day_elems[i].classList.remove("booked");
                        }
                    }
                }
            }
        };
    },
    fragment_update: function(fragment) {
        var dayint = 1000*60*60*24;
        var months = 1,
            months_split = 10;
        var date_prev = 0;
        var days = fragment.querySelectorAll(".day");
        var date = new Date();
        date = date.getTime();
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
    },
};
