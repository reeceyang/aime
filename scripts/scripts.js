function getNumericalDate() {
    var date = new Date();
    return date.getDay() + " " + date.getMonth() + " " + date.getDate() + " " + date.getFullYear();
}

function getDateString(numericalDate) {
    var split = (numericalDate + "").split(" ");

    var monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    var dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday",
        "Saturday", "Sunday"
    ];

    var dateString = dayNames[split[0] - 1] + ", " + monthNames[split[1]] + " " +
        split[2] + ", " + split[3];

    return dateString;
}

function getNumber() {
    var numericalDate = getNumericalDate();

    // get number
    var number = Math.ceil(Math.random() * 3) + 2;

    // testing
    //localStorage.removeItem(dateString);

    // set or get number
    if (localStorage.getItem(numericalDate) == null) {
        localStorage.setItem(numericalDate, number + " 0");
    } else {
        number = localStorage.getItem(numericalDate).split(" ")[0] * 1;
    }

    return number;
}

function getName() {
    if (localStorage.getItem("name") == null) {
        localStorage.setItem("name", prompt("What is your preferred name?"));
    }
    return localStorage.getItem("name");
}

function getDone() {
    var numericalDate = getNumericalDate();
    return localStorage.getItem(numericalDate).split(" ")[1] * 1;
}

function fixSkips() {
    var p = getNumericalDate();
    var date = p.split(" ");
    //var previousDate = ((p[0] + 6) % 7) + " " + ()
}

function onload() {
    console.log("loaded");

    document.getElementById("name").innerHTML = getName();

    var numericalDate = getNumericalDate();
    var dateString = getDateString(numericalDate);

    // show date
    var dateElement = document.getElementById("date");
    dateElement.innerHTML = dateString;

    var number = getNumber();
    // show number
    document.getElementById("number").innerHTML = number + " AIME problem" + (number != 1 ? "s" : "");

    // show done
    document.getElementById("done").innerHTML =
        getDone() + " problem" +
        (getDone() == 1 ? "" : "s");

    //var weekPossible = 0;
    //var weekDone = 0;

    var totalPossible = 0;
    var totalDone = 0;

    // show history
    var list = document.getElementById("history");
    for (var p in localStorage) {
        if (localStorage.hasOwnProperty(p) && p !== "name") {
            var s = localStorage[p].split(" ");
            list.innerHTML = getDateString(p) + ": " + s[1] + " / " + s[0] + "<br>" + list.innerHTML;
            totalDone += s[1] * 1;
            totalPossible += s[0] * 1;
        }
    }

    // show statistics
    var stats = document.getElementById("statistics");
    stats.innerHTML += "Total Done: " + totalDone + "<br>" + "Total Possible: "
        + totalPossible + "<br>" + "Grade: " + 100 * totalDone / totalPossible + "%";

    getDailyProblem();
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

function reset() {
    for (var p in localStorage) {
        if (localStorage.hasOwnProperty(p) ) {
            localStorage.removeItem(p);
        }
    }
}

onload();
