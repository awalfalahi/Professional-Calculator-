$(document).ready(function() {

    var resarr = [];
    var resarrpow = [];
    var countsimplefun = 0;
    var result = 0;
    var countnumbers = [];
    var countpar = 0;
    var poweronoff = 0;
    var hist = [];
    var fun = [];

    function calcresult() {
        var joinedres = "";
        var counter = 0;
        if (countpar > 0) {
            for (var i = 0; i < countpar; i++) {
                resarr.push(")");
                counter++;
            }
            joinedres = resarr.join("");
            console.log(joinedres);
            for (var j = 0; j < counter; j++) {
                resarr.pop();
            }
        } else {
            joinedres = resarr.join("");
        }
        result = eval(joinedres);
        if (isFinite(result)) {
            if ((result < 999999999999999)) {
                var scrhtml = $("#screen").html();
                if (scrhtml !== 0) {
                    $("#res").html("");
                    $("#res").html(Math.round(result * 10000) / 10000);
                }
            } else if ($("#screen").html() === "") {
                $("#res").html("");
            } else {
                $("#res").html("The calculation is too big");
            }
        } else {
            $("#res").html("");
        }
    }

    $("#percent").click(function() {
        resarr.push("/100");
        countnumbers.push(0);
        $("#screen").append("%");
    });

    $(".number").click(function() {
        countsimplefun = 0;
        var scr = $("#screen").html();
        var str = $(this).html();
        if (str === "(") {
            if (((countnumbers[countnumbers.length - 1] !== 0) && (countnumbers[countnumbers.length - 1] !== "p") && (scr !== "")) || (resarr[resarr.length - 1] === ")")) {
                resarr.push("*");
                $("#screen").append("*");
                countsimplefun++;
                countpar++;
                countnumbers.push(0);
            } else {
                countpar++;
            }
            countnumbers.push(0);
        } else if (str === ")") {
            countnumbers.push(0);
            countpar--;
        } else {
            if (countnumbers.length !== 0) {
                if (countnumbers[countnumbers.length - 1] === "p") {
                    countnumbers.push(1);
                } else {
                    countnumbers.push(countnumbers[countnumbers.length - 1] + 1);
                }
            } else {
                countnumbers.push(1);
            }
        }
        $("#screen").append(str);
        resarr.push(str);
    });

    function erase(n) {
        var htmlscreen = $("#screen").html();
        var htmlarr = htmlscreen.split('');
        htmlarr.splice(htmlarr.length - n);
        var newhtmlarr = htmlarr.join('');
        $("#screen").html(newhtmlarr);
    }

    $(".simplefun").click(function() {
        var str = $(this).html();

        if (((countsimplefun !== 0) && (countnumbers[countnumbers.length - 1] !== "p")) || ((countnumbers[countnumbers.length - 1] === 0) && ((resarr[resarr.length - 1] !== "(") && (resarr[resarr.length - 1] !== ")") && (resarr[resarr.length - 1] !== "/100")))) {
            erase(1);
            resarr.pop();
            resarr.push(str);
            $("#screen").append(str);
        } else {
            $("#screen").append(str);
            resarr.push(str);
            countsimplefun++;
            countnumbers.push(0);
        }

    });

    $(".advfun").click(function() {
        var lastchildshtml = $(this)[0].lastChild.innerHTML;
        var firstchildshtml = $(this)[0].firstChild.innerHTML;
        var screen = $("#screen").html();
        console.log(screen);
        if (((countnumbers[countnumbers.length - 1] !== 0) && (countnumbers[countnumbers.length - 1] !== "p") && (screen !== "")) || (resarr[resarr.length - 1] === ")")) {
            resarr.push("*");
            $("#screen").append("*");
            countnumbers.push(0);
            countsimplefun++;
        }
        resarr.push(lastchildshtml);
        countpar++;
        var str = $("#screen").html();
        fun.push(lastchildshtml.split('').splice(5).join(''));
        $("#screen").append(fun[fun.length - 1]);
        countnumbers.push("p");
    });

    $("#power").click(function() {
        console.log(countnumbers[countnumbers.length - 1]);
        if (countnumbers[countnumbers.length - 1] !== "p") {
            var parbefore = resarr[resarr.length - 1];
            $("#screen").append("^(");
            poweronoff++;
            countpar++;
            countsimplefun = 0;
            var temp2;
            var temp = resarr;
            if (parbefore !== ")") {
                temp2 = temp.splice(temp.length - (countnumbers[countnumbers.length - 1]));
            } else {
                var countparpow = 1;
                var countparart = 1;
                if (countpar === 1) {
                    while (countparpow > 0) {
                        countparart++;
                        if (resarr[resarr.length - countparart] === ")") {
                            countparpow++;
                        } else if (resarr[resarr.length - countparart] === "(") {
                            countparpow--;
                        }
                    }
                    temp2 = temp.splice(temp.length - countparart);
                }
            }
            var addtothearr = "Math.pow(" + temp2.join('') + ",";
            hist.push(temp2.join(''));
            resarr.push(addtothearr);
            countnumbers.push(0);
        }
    });

    $("#leftarr").click(function() {
        var scr = $("#screen").html();
        var end = scr.split('');
        var lastdig = end.pop();
        var lastarr = resarr[resarr.length - 1];
        if (countnumbers[countnumbers.length - 1] === "p") {
            erase(fun[fun.length - 1].length);
            fun.pop();
            resarr.pop();
            countpar--;
        } else {
            if (lastdig === "(") {
                var lastdig2 = end.pop();
                if (lastdig2 === "^") {
                    erase(2);
                    resarr.pop();
                    var back = hist[hist.length - 1];
                    var backsplit = back.split('');
                    resarr = resarr.concat(backsplit);
                    poweronoff--;
                    hist.pop();
                    countpar--;
                } else {
                    erase(1);
                    resarr.pop();
                    countpar--;
                }
            } else if (lastdig === ")") {
                erase(1);
                resarr.pop();
                countpar++;
            } else if ((lastarr === "/")(lastarr === "*")(lastarr === "-") || (lastarr === "+")) {
                countsimplefun--;
                erase(1);
                resarr.pop();
            } else {
                erase(1);
                resarr.pop();
            }
        }
        countnumbers.pop();
    });

    $("#pi").click(function() {
        countsimplefun = 0;
        if ((countnumbers[countnumbers.length - 1] === 0) || (countnumbers[countnumbers.length - 1] === "p")) {
            resarr.push("Math.PI");
            $("#screen").append('π');
            countnumbers.push(1);
        } else if (((countnumbers[countnumbers.length - 1] > 0) || (resarr[resarr.lenth - 1] === ")")) && ($("#screen").html() !== "")) {
            resarr.push("*");
            $("#screen").append('*');
            resarr.push("Math.PI");
            $("#screen").append('π');
            countnumbers.push(0);
            countnumbers.push(countnumbers[countnumbers.length - 1] + 1);
        } else if ($("#screen").html() === "") {
            resarr.push("Math.PI");
            $("#screen").append('π');
            countnumbers.push(1);
        }
    });

    $("#ex").click(function() {
        countsimplefun = 0;
        if ((countnumbers[countnumbers.length - 1] === 0) || (countnumbers[countnumbers.length - 1] === "p")) {
            resarr.push("Math.E");
            $("#screen").append('e');
            countnumbers.push(1);
        } else if (((countnumbers[countnumbers.length - 1] > 0) || (resarr[resarr.lenth - 1] === ")")) && ($("#screen").html() !== "")) {
            resarr.push("*");
            $("#screen").append('*');
            resarr.push("Math.E");
            $("#screen").append('e');
            countnumbers.push(0);
            countnumbers.push(countnumbers[countnumbers.length - 1] + 1);
        } else if ($("#screen").html() === "") {
            resarr.push("Math.E");
            $("#screen").append('e');
            countnumbers.push(1);
        }
    });

    $("#AllClear").click(function() {
        $("#screen").html("");
        $("#res").html(0);
        resarr = [];
        resarrpow = [];
        countsimplefun = 0;
        result = 0;
        countnumbers = [];
        countpar = 0;
        poweronoff = 0;
        hist = [];
        fun = [];
    });

    $("#equal").click(function() {
        var scr = $("#res").html();
        if (scr !== "") {
            $("#screen").html(scr);
            resarr = scr.split("");
            if (resarr[0] === "-") {
                countnumbers = [0];
            } else {
                countnumbers = [1];
            }
            for (var i = 0; i < resarr.length - 1; i++) {
                countnumbers.push(countnumbers[countnumbers.length - 1] + 1);
            }
            countsimplefun = 0;
            countpar = 0;
            poweronoff = 0;
            hist = [];
        } else {
            $("#res").html('');
        }
    });


    $(".but").click(function() {
        if ($("#screen").width() < $("#main-screen").width()) {
            calcresult();
        } else {
            alert("The calculation can't fit in the screen.");
            $("#leftarr").click();
        }
    });
});