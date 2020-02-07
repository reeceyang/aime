function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function getRandomProblem() {
    var year = getRndInteger(1983, 2018);
    var test = getRndInteger(1, 2) == 1 ? "I" : "II"; // will need to be changed later
    var problem = getRndInteger(1, 15);
    console.log(year + " " + test + " " + problem);
    getWebpage(year, test, problem);
}

function getDailyProblem() {
    var date = new Date();
    var year = 1983 + ((date.getDate() * date.getMonth()) % 36);
    var test = (date.getDate() % 2) + 1 == 2 ? "I" : "II";
    var problem = 11 + ((date.getDate() * date.getMonth()) % 5);
    console.log(year + " " + test + " " + problem);
    getWebpage(year, test, problem);
}

function Problem(year, test, problem, problemText, solutionText, answer) {
    this.year = year;
    this.test = test;
    this.problem = problem;
    this.problemText = problemText;
    this.solutionText = solutionText;
    this.answer = answer;
}

function getUrl(year, test, problem) {
    var url;

    if (year >= 2000) {
        url = "https://artofproblemsolving.com/wiki/index.php?title=" + year + "_AIME_" + test + "_Problems/Problem_" + problem;
    } else {
        url = "https://artofproblemsolving.com/wiki/index.php?title=" + year + "_AIME_Problems/Problem_" + problem;
    }

    return url;
}

function getWebpage(year, test, problem)
{
    var theUrl = getUrl(year, test, problem)
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            processHTML(xmlHttp.responseText, year, test, problem);
    }
    xmlHttp.open("GET", "https://cors.reeceyang.workers.dev/" + theUrl, true); // true for asynchronous
    xmlHttp.send(null);
}

function processHTML(html, year, test, problem) {
    //console.log(html);
    // so images can display
    html = replaceAll(html, "//", "https://");
    var problemIndex = getProblemIndex(html, problem);
    // Some use "Solutions"
    var solutionIndex;
    // I removed the end of the string so that hopefully everything works
    solutionIndex = html.indexOf("<h2><span class=\"mw-headline\" id=\"Solution") + 72;
    if (solutionIndex == -1 + 72) {
        solutionIndex = html.indexOf("<h2><span class=\"mw-headline\" id=\"Solution\">Solution</span></h2>") + 68;
    }
    console.log("solutionIndex: ", solutionIndex);
    var seeAlsoIndex = html.indexOf("<h2><span class=\"mw-headline\" id=\"See_also\">See also</span></h2>");
    console.log("seeAlsoIndex: ", seeAlsoIndex);
    var problemText = html.substring(problemIndex, solutionIndex);
    var solutionText = html.substring(solutionIndex, seeAlsoIndex);
    var answer = html.substring(html.indexOf("\\boxed") + 7, html.indexOf("}", html.indexOf("\\boxed")));
    var problem = new Problem(year, test, problem, problemText, solutionText, answer);
    showProblem(problem);
}

function getProblemIndex(html, problem) {
    // wiki sometimes uses Problem [number] instead of just Problem
    var problemIndex = html.indexOf("<h2><span class=\"mw-headline\" id=\"Problem_");
    var numbered = true;
    if (problemIndex = -1) {
        problemIndex = html.indexOf("<h2><span class=\"mw-headline\" id=\"Problem");
        var numbered = false;
    }
    // oops different problems have different lengths
    // Sometimes doesn't work rip
    if (problem < 10) {
        if (numbered) {
            problemIndex += 70;
        } else {
            problemIndex += 66;
        }
    } else {
        if (numbered) {
            problemIndex += 70;
        } else {
            problemIndex += 66;
        }
    }
    console.log("problemIndex: ", problemIndex);
    return problemIndex;
}

function getContentsIndex() {

}

function getSolutionIndex() {

}

function getBottomIndex() {

}
function showProblem(problem) {
    //console.log(JSON.stringify(problem));
    //console.log("Problem: \n" + problem.problemText + "\n" + problem.solutionText + "\n" + problem.answer);
    document.getElementById("problem-box").innerHTML = problem.problemText;
    document.getElementById("problem-title-box").innerHTML = "<h2>" + problem.year + " AIME " + problem.test + " Problem " + problem.problem + "</h2>";
    document.getElementById("problem-url-box").innerHTML = "<a href=\"" + getUrl(problem.year, problem.test, problem.problem) + "\">See the solution on the AoPS Wiki</a>";
}

function replaceAll(string, search, replacement) {
    return string.replace(new RegExp(search, 'g'), replacement);
}
