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
    xmlHttp.open("GET", "https://crossorigin.me/" + theUrl, true); // true for asynchronous
    xmlHttp.send(null);
}

function processHTML(html, year, test, problem) {
    console.log(html);
    html = replaceAll(html, "//", "https://");
    // Starting from 2012, wiki uses Problem [number] instead of just Problem
    // Never mind, appears to be inconsistent
    var problemIndex;
    problemIndex = html.indexOf("<h2><span class=\"mw-headline\" id=\"Problem_" + problem + "\">Problem " + problem + "</span></h2>");
    if (problemIndex == -1) {
        problemIndex = html.indexOf("<h2><span class=\"mw-headline\" id=\"Problem\">Problem</span></h2>");
    }
    console.log(problemIndex);
    var solutionIndex;
    solutionIndex = html.indexOf("<h2><span class=\"mw-headline\" id=\"Solution_1\">Solution 1</span></h2>");
    if (solutionIndex == -1) {
        solutionIndex = html.indexOf("<h2><span class=\"mw-headline\" id=\"Solution\">Solution</span></h2>");
    }
    console.log(solutionIndex);
    var seeAlsoIndex = html.indexOf("<h2><span class=\"mw-headline\" id=\"See_also\">See also</span></h2>");
    console.log(seeAlsoIndex);
    var problem = html.substring(problemIndex, solutionIndex);
    var solution = html.substring(solutionIndex, seeAlsoIndex);
    document.body.innerHTML += problem + solution;
}

function replaceAll(string, search, replacement) {
    return string.replace(new RegExp(search, 'g'), replacement);
}
