var Reserve = {
    // static data
    domel_uri: "/actions/get_reserve_element.cgi",
    data_uri: "/actions/reserves_get_all.cgi",
    out_splitter: "|",          // in nodes array
    in_splitter: ";",       // in node data array
    parent_splitter: "$",
    //class_names: [],

    // children data
    children: ["action_button"],

    // parent data
    parent_container: "node_reserve",

    // state data
    default_state: "view",
    states: [
        // children states first
        // states of child 1
        [
            // state 1
            {
            name: "view",
            parent_state: [],
            classes: ["edit"],
            actions: {
                on_click: undefined, 
                },
            },
            // state 2
        ],
    ],
    module_states: [
        // module element states
            // state 1
            {
            name: "view",
            children_states: ["view"],
            classes: ["reserve"],
            actions: {
                on_click: function(domel) {
                    return function(event) {
                    if (event.target.className == "edit_button") {
                        console.log("button click")
                        //event.mls_edit = "edit";
                        domel.state = "edit";
                    }
                    };
                    },
                },
            },
            {
            name: "edit",
            children_states: ["view"],
            classes: ["reserve", "edit"],
            actions: {
                on_click: function(domel) {
                    return function(event) {
                    if (event.target.className == "edit_button") {
                        console.log("button click")
                        event.mls_edit = "edit";
                        domel.state = "view";
                    }
                    };
                    },
                },
            },
            // state 2
    ],

    // handlers
    simple_handler: function(event) {
        console.log("on_click habndler");
    },

    data_push: function(domel_proto) {
        var now_date = new Date();
        var dayint = 1000*60*60*24;
        now_date = now_date.getTime() - dayint;
        domel_proto.querySelector(".calendar").classList.remove("free");
        domel_proto.querySelector(".calendar").classList.add("booked");
        return function(elem, ind, arr) {
            if (ind === 1) {
                var days = (elem - now_date)/dayint;
                var day_elems = domel_proto.querySelectorAll(".day");
                for (var i = 0; i < day_elems.length; ++i) {
                    if (i < days) {
                        if (!day_elems[i].classList.contains("booked")) {
                            day_elems[i].classList.add("booked");
                        }
                    }
                    else {
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
