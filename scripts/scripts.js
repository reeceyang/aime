function getDateString() {
    // dateString
    var date = new Date();

    var monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    var dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday",
        "Saturday", "Sunday"
    ];

    var dateString = dayNames[date.getDay()] + ", " + monthNames[date.getMonth()] + " " +
        date.getDate() + ", " + date.getFullYear();

    return dateString;
}

function getNumber() {
    var dateString = getDateString();

    // get number
    var number = Math.ceil(Math.random() * 10);

    // testing
    //localStorage.removeItem(dateString);

    // set or get number
    if (localStorage.getItem(dateString) == null) {
        localStorage.setItem(dateString, number + " 0");
    } else {
        number = localStorage.getItem(dateString).split(" ")[0];
    }

    return number;
}

function onload() {
    console.log("loaded");

    var dateString = getDateString();

    // show date
    var dateElement = document.getElementById("date");
    dateElement.innerHTML = dateString;

    var number = getNumber();
    // show number
    document.getElementById("number").innerHTML = number;

    // show done
    document.getElementById("done").innerHTML = localStorage.getItem(dateString).split(" ")[1];

    //var weekPossible = 0;
    //var weekDone = 0;

    var totalPossible = 0;
    var totalDone = 0;

    // show history
    var list = document.getElementById("history");
    for (var p in localStorage) {
        if(localStorage.hasOwnProperty(p) ) {
            var s = localStorage[p].split(" ");
            list.innerHTML += p + ": " + s[1] + " / " + s[0] + "<br>";
            totalDone += s[1] * 1;
            totalPossible += s[0] * 1;
        }
    }

    // show statistics
    var stats = document.getElementById("statistics");
    stats.innerHTML += "Total Done: " + totalDone + "<br>" + "Total Possible: "
        + totalPossible + "<br>" + "Grade: " + 100 * totalDone / totalPossible + "%";
}

// submit
function onsubmit() {
    console.log("submit");
    var problems = document.getElementById('problem-box').value;
    console.log(problems);
    localStorage.setItem(getDateString(), getNumber() + ' ' + problems);
    document.getElementById('done').innerHTML = problems;
    return false;
}
