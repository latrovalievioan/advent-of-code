var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var rawInput = "p=24,25 v=-48,-26\np=7,8 v=-96,-2\np=7,80 v=-66,22\np=5,18 v=25,-98\np=45,67 v=26,90\np=54,71 v=3,67\np=62,66 v=-5,81\np=5,82 v=-7,-45\np=66,89 v=93,-43\np=70,51 v=33,-7\np=75,59 v=-20,-77\np=66,40 v=93,55\np=32,79 v=79,45\np=99,13 v=-18,50\np=13,68 v=-43,-53\np=84,85 v=-69,-65\np=37,84 v=11,-57\np=28,10 v=19,-93\np=78,82 v=-56,36\np=20,69 v=-3,-62\np=39,78 v=27,-1\np=51,87 v=-32,-17\np=90,26 v=20,66\np=35,89 v=-11,20\np=71,2 v=-80,92\np=41,40 v=-64,-30\np=38,8 v=-71,54\np=72,58 v=36,-80\np=62,97 v=52,83\np=96,74 v=90,-23\np=76,75 v=-43,-9\np=35,95 v=74,13\np=90,17 v=99,6\np=61,26 v=17,81\np=43,71 v=-43,-51\np=6,18 v=-62,-9\np=37,62 v=-23,-11\np=60,97 v=36,-64\np=54,63 v=-23,-95\np=76,85 v=24,-4\np=38,54 v=-38,-95\np=48,18 v=52,-49\np=45,36 v=-75,-4\np=31,87 v=64,50\np=4,87 v=68,9\np=25,40 v=99,53\np=74,18 v=-73,-71\np=5,22 v=76,65\np=66,12 v=96,-64\np=20,71 v=68,-3\np=3,20 v=4,-77\np=27,43 v=49,55\np=25,70 v=-52,-84\np=90,64 v=39,52\np=32,69 v=82,88\np=2,97 v=-78,76\np=56,6 v=-71,-27\np=91,31 v=84,-41\np=25,12 v=-91,-51\np=7,43 v=-11,59\np=3,55 v=-6,-44\np=83,102 v=9,-76\np=54,40 v=-94,5\np=3,77 v=80,45\np=32,6 v=3,-35\np=14,34 v=-74,-41\np=16,30 v=-21,-86\np=34,71 v=-75,-62\np=79,11 v=67,-10\np=80,11 v=61,9\np=14,84 v=-59,-83\np=73,66 v=-56,3\np=26,61 v=41,-70\np=45,35 v=-97,40\np=84,39 v=-99,55\np=95,50 v=-66,-56\np=17,35 v=-33,-74\np=33,51 v=4,-22\np=6,77 v=-49,-45\np=9,61 v=28,85\np=14,91 v=-70,-12\np=88,73 v=49,-14\np=73,39 v=-16,73\np=68,83 v=25,60\np=3,31 v=83,62\np=31,102 v=30,-49\np=29,29 v=45,-23\np=47,37 v=97,26\np=35,46 v=87,39\np=13,36 v=-74,-37\np=81,33 v=81,-17\np=6,20 v=-14,43\np=94,41 v=89,-72\np=55,44 v=-91,95\np=92,87 v=-17,64\np=54,79 v=-57,-58\np=53,49 v=-19,-84\np=25,21 v=56,-82\np=82,53 v=51,-85\np=75,27 v=69,-4\np=21,87 v=61,-6\np=6,63 v=-74,-77\np=20,4 v=89,-33\np=21,25 v=-78,62\np=24,0 v=-74,43\np=34,86 v=-43,74\np=72,83 v=-35,85\np=47,17 v=41,87\np=3,73 v=-77,-36\np=98,96 v=-73,75\np=66,93 v=-26,20\np=48,79 v=56,-69\np=91,89 v=-47,9\np=49,11 v=96,-47\np=33,4 v=-86,-16\np=76,45 v=-46,3\np=12,28 v=-40,36\np=64,99 v=-79,-83\np=19,83 v=-10,-3\np=87,57 v=84,-33\np=47,69 v=-64,-58\np=56,9 v=33,-60\np=98,94 v=-14,-25\np=60,59 v=-1,-41\np=18,91 v=-93,-85\np=24,21 v=98,-85\np=51,83 v=-23,45\np=12,41 v=-41,-34\np=8,86 v=-55,-50\np=23,48 v=-11,73\np=46,24 v=-4,-75\np=12,82 v=-6,-47\np=78,37 v=-16,-55\np=13,59 v=68,-66\np=63,100 v=44,83\np=99,66 v=31,-65\np=21,97 v=17,-7\np=1,101 v=91,-90\np=16,74 v=90,8\np=15,102 v=98,-9\np=31,34 v=12,91\np=49,65 v=-8,96\np=48,62 v=-41,-58\np=57,13 v=-72,61\np=82,30 v=-69,47\np=31,21 v=41,-44\np=25,93 v=-30,-69\np=33,45 v=4,-96\np=57,15 v=59,10\np=6,74 v=61,-43\np=9,43 v=-64,51\np=69,67 v=10,-51\np=44,93 v=60,93\np=39,77 v=94,-39\np=38,86 v=86,12\np=43,98 v=26,75\np=64,49 v=-87,-84\np=13,64 v=42,30\np=69,91 v=-39,-91\np=83,100 v=-12,61\np=28,66 v=-62,-27\np=15,90 v=-3,-46\np=0,42 v=27,18\np=56,99 v=-24,-67\np=70,68 v=-61,74\np=7,8 v=-70,35\np=5,100 v=16,-13\np=83,49 v=-22,73\np=63,18 v=64,-56\np=78,84 v=28,-57\np=89,39 v=36,26\np=72,31 v=-80,51\np=72,88 v=8,70\np=29,8 v=34,65\np=36,11 v=-86,39\np=16,27 v=12,-52\np=63,63 v=59,63\np=1,4 v=-21,-79\np=95,86 v=-81,-79\np=30,27 v=90,21\np=17,40 v=81,-5\np=47,24 v=47,93\np=4,23 v=31,-49\np=61,34 v=-42,-78\np=34,61 v=-62,44\np=48,18 v=-12,-97\np=32,81 v=-74,-75\np=61,15 v=96,-98\np=8,86 v=87,-54\np=26,95 v=-63,71\np=94,61 v=13,48\np=26,101 v=94,-57\np=24,102 v=4,2\np=83,56 v=-56,44\np=96,37 v=91,-8\np=60,43 v=-18,5\np=93,68 v=92,1\np=79,57 v=-9,77\np=65,68 v=-16,-51\np=26,28 v=-44,-80\np=39,22 v=-75,-23\np=90,0 v=-73,83\np=66,88 v=10,75\np=61,55 v=-87,52\np=43,2 v=45,68\np=85,25 v=-91,-12\np=14,79 v=-50,-20\np=32,98 v=22,21\np=85,59 v=74,-5\np=4,50 v=-14,8\np=99,85 v=35,-28\np=76,80 v=-2,64\np=49,36 v=-8,14\np=60,65 v=-12,67\np=4,84 v=-98,-82\np=0,92 v=-74,-50\np=88,94 v=26,36\np=20,37 v=-7,-8\np=81,28 v=21,-59\np=95,33 v=-39,36\np=26,45 v=-86,23\np=82,19 v=2,-12\np=85,60 v=32,-44\np=5,60 v=79,10\np=53,33 v=-12,62\np=40,79 v=-71,-47\np=75,31 v=-95,95\np=43,2 v=41,-86\np=17,86 v=-81,82\np=10,15 v=-31,46\np=7,74 v=-25,89\np=69,8 v=-61,32\np=82,65 v=-39,74\np=73,101 v=-12,-79\np=51,9 v=93,-16\np=95,56 v=13,15\np=96,67 v=34,29\np=19,91 v=-31,89\np=2,43 v=-96,-55\np=68,60 v=17,-91\np=17,86 v=8,-43\np=5,95 v=16,71\np=49,20 v=37,21\np=6,67 v=-40,96\np=47,95 v=-32,-76\np=45,71 v=-81,2\np=46,31 v=-34,-89\np=49,17 v=-79,-97\np=66,82 v=18,-95\np=69,86 v=81,-21\np=5,87 v=-10,-21\np=84,81 v=47,97\np=89,9 v=13,-60\np=34,15 v=-67,-38\np=51,46 v=-28,-91\np=94,99 v=-21,-35\np=15,20 v=3,48\np=26,72 v=-32,13\np=80,5 v=-43,-20\np=64,82 v=-49,-75\np=56,58 v=-94,81\np=29,86 v=79,16\np=98,60 v=-36,4\np=23,47 v=-37,77\np=48,66 v=63,78\np=48,92 v=-97,74\np=58,86 v=85,27\np=99,85 v=57,97\np=98,53 v=-28,-25\np=72,44 v=-48,31\np=35,67 v=75,30\np=22,11 v=38,13\np=95,41 v=-85,36\np=3,55 v=-85,-66\np=50,57 v=-94,11\np=58,2 v=-42,-64\np=45,3 v=-97,10\np=1,30 v=97,-31\np=75,68 v=13,-58\np=79,101 v=62,-98\np=20,26 v=83,25\np=49,4 v=25,-16\np=46,54 v=89,7\np=86,42 v=-43,-81\np=6,3 v=-99,-5\np=74,50 v=-61,22\np=40,13 v=-38,-57\np=5,54 v=-5,-65\np=55,66 v=10,-25\np=52,82 v=-55,-28\np=70,18 v=-68,-49\np=54,10 v=-38,-16\np=79,35 v=54,-45\np=95,64 v=80,6\np=88,62 v=-56,78\np=65,28 v=-39,43\np=69,29 v=-35,-78\np=68,99 v=-5,79\np=37,22 v=30,-49\np=98,55 v=-92,-84\np=3,1 v=-10,-64\np=56,60 v=49,26\np=38,25 v=-56,91\np=93,22 v=46,87\np=97,11 v=13,-86\np=16,15 v=23,76\np=34,58 v=45,15\np=20,59 v=-12,72\np=30,78 v=-25,50\np=61,59 v=-53,37\np=33,2 v=75,-24\np=36,5 v=81,43\np=90,93 v=-10,50\np=60,74 v=14,96\np=56,40 v=-56,96\np=79,6 v=77,-71\np=87,64 v=-2,-62\np=25,66 v=64,-47\np=4,13 v=-66,54\np=47,57 v=67,59\np=39,64 v=90,-88\np=81,68 v=-73,52\np=59,36 v=-42,-89\np=0,4 v=14,83\np=20,5 v=-67,-9\np=100,45 v=20,-44\np=85,27 v=54,-48\np=58,54 v=-16,-11\np=71,4 v=-54,42\np=22,98 v=83,-46\np=32,7 v=-26,32\np=33,52 v=37,-62\np=82,33 v=-28,14\np=90,11 v=-88,-97\np=39,79 v=52,45\np=60,15 v=70,-79\np=3,38 v=-70,-29\np=10,80 v=27,-10\np=22,22 v=-89,7\np=23,29 v=-74,49\np=45,34 v=26,51\np=59,63 v=-3,41\np=9,28 v=-82,89\np=18,42 v=-10,-67\np=2,80 v=-3,-80\np=94,73 v=13,89\np=89,73 v=-50,-40\np=22,85 v=71,-38\np=20,99 v=52,-10\np=40,89 v=52,27\np=47,99 v=-18,59\np=71,55 v=25,-47\np=69,102 v=-31,-64\np=67,43 v=-91,44\np=79,27 v=69,-72\np=43,53 v=89,22\np=59,30 v=26,-46\np=53,54 v=37,-33\np=72,11 v=-80,-27\np=56,63 v=33,-14\np=53,61 v=24,86\np=40,77 v=-17,-66\np=88,88 v=53,33\np=40,82 v=56,-76\np=16,2 v=60,-94\np=17,83 v=-78,-3\np=16,99 v=-44,13\np=88,19 v=-73,40\np=61,16 v=36,-30\np=1,90 v=-21,-80\np=65,92 v=-95,-30\np=100,98 v=24,31\np=45,54 v=-42,30\np=87,60 v=56,-57\np=97,43 v=75,-96\np=54,64 v=3,69\np=73,29 v=-5,84\np=69,5 v=-99,-27\np=18,8 v=98,94\np=9,4 v=92,61\np=69,50 v=38,34\np=9,52 v=-85,74\np=33,16 v=34,-86\np=38,68 v=15,45\np=93,82 v=25,17\np=22,34 v=6,-51\np=40,81 v=79,-6\np=62,20 v=23,86\np=2,21 v=43,-60\np=19,79 v=-74,38\np=70,3 v=-20,-81\np=57,66 v=-4,-22\np=54,36 v=65,-30\np=48,83 v=-60,-43\np=71,41 v=92,-56\np=90,66 v=-77,-62\np=65,15 v=-24,-79\np=49,48 v=-53,81\np=41,15 v=71,-49\np=59,58 v=83,18\np=27,84 v=-38,64\np=94,34 v=2,36\np=12,34 v=-55,-30\np=64,40 v=-27,29\np=74,28 v=-91,-63\np=81,86 v=-77,-10\np=83,26 v=32,47\np=20,44 v=-63,-96\np=1,48 v=-51,-11\np=69,18 v=-5,-82\np=63,18 v=16,-28\np=88,1 v=-2,46\np=80,44 v=2,33\np=10,35 v=72,10\np=79,35 v=45,-72\np=6,13 v=-18,3\np=40,43 v=41,-4\np=100,18 v=-51,-93\np=71,54 v=94,37\np=4,93 v=50,97\np=9,56 v=76,-77\np=89,38 v=-50,92\np=96,31 v=35,58\np=73,11 v=96,-86\np=36,67 v=-60,27\np=44,77 v=-82,71\np=67,53 v=96,61\np=14,82 v=72,42\np=96,14 v=65,98\np=91,8 v=78,-72\np=44,80 v=-22,-67\np=47,59 v=-75,48\np=90,52 v=-65,-3\np=10,41 v=-29,-70\np=57,90 v=-75,13\np=42,43 v=67,-85\np=51,72 v=33,79\np=33,87 v=60,56\np=93,55 v=-77,-44\np=31,29 v=64,-19\np=91,81 v=21,86\np=100,99 v=-66,-24\np=68,90 v=29,23\np=43,25 v=-6,-49\np=62,37 v=-98,-74\np=57,11 v=97,-83\np=89,85 v=74,14\np=29,18 v=48,-13\np=84,92 v=-43,-93\np=33,5 v=19,94\np=2,85 v=-58,12\np=18,95 v=-41,42\np=75,59 v=34,91\np=0,56 v=-51,-58\np=85,10 v=-91,-37\np=64,20 v=-42,-23\np=28,30 v=-27,7\np=18,46 v=-96,73\np=33,93 v=-93,-53\np=29,64 v=30,-29\np=65,53 v=-42,15\np=26,92 v=11,62\np=69,34 v=-99,-4\np=44,15 v=-94,-64\np=24,42 v=-22,88\np=37,8 v=41,87\np=22,77 v=-54,-54\np=9,13 v=-18,85\np=90,97 v=46,36\np=37,61 v=64,93\np=96,78 v=80,-47\np=92,62 v=6,74\np=19,20 v=-44,-23\np=63,43 v=-16,-4\np=85,0 v=-73,-64\np=37,53 v=-11,-81\np=28,55 v=11,-40\np=77,22 v=-72,-67\np=88,86 v=47,60\np=43,50 v=-19,-95\np=46,28 v=11,3\np=16,5 v=28,66\np=85,85 v=-36,-98\np=95,15 v=9,17\np=46,70 v=-64,82\np=24,49 v=38,-84\np=94,5 v=-24,-83\np=59,73 v=-98,49\np=13,75 v=72,12\np=68,27 v=-57,-5\np=13,71 v=-55,-84\np=57,12 v=-68,28\np=21,90 v=-45,16\np=38,4 v=-93,21\np=66,96 v=-72,-13\np=34,95 v=-41,-90\np=85,39 v=-18,-30\np=3,94 v=9,97\np=89,12 v=5,-67\np=44,58 v=-4,-62";
var input = rawInput
    .split("\n")
    .filter(Boolean)
    .map(function (l) {
    return l
        .replace("p=", "")
        .replace("v=", "")
        .split(" ")
        .map(function (x) { return ({
        i: Number(x.split(",")[1]),
        j: Number(x.split(",")[0]),
    }); });
})
    .map(function (l) { return ({ p: l[0], v: l[1] }); });
var createMatrix = function (h, w, robots) {
    var matrix = Array.from({ length: h }, function () {
        return Array.from({ length: w }, function () { return []; });
    });
    robots.forEach(function (r) {
        matrix[r.p.i][r.p.j].push(r);
    });
    return matrix;
};
var printMatrix = function (matrix) {
    console.table(matrix.map(function (r) { return r.map(function (c) { return (c.length ? "" : "."); }); }));
};
var drawMatrix = function (matrix, tick) {
    document.body.innerHTML = "";
    document.body.style.backgroundColor = "black";
    document.body.style.display = "flex";
    document.body.style.flexDirection = "column";
    document.body.style.alignItems = "center";
    document.body.style.justifyContent = "center";
    var h1 = document.createElement("h1");
    h1.textContent = "".concat(tick);
    h1.style.color = "white";
    document.body.appendChild(h1);
    var table = document.createElement("table");
    document.body.appendChild(table);
    var addRow = function (i) {
        table.style.display = "flex";
        table.style.flexDirection = "column";
        var row = document.createElement("tr");
        row.style.display = "flex";
        row.id = "r-".concat(i);
        table.appendChild(row);
    };
    var addColumn = function (rowI, colI, isRobot) {
        var row = document.getElementById("r-".concat(rowI));
        var column = document.createElement("div");
        column.style.width = "8px";
        column.style.height = "8px";
        if (isRobot) {
            column.style.backgroundColor = "green";
        }
        else {
            column.style.backgroundColor = "black";
        }
        column.id = "c-".concat(colI);
        row.appendChild(column);
    };
    for (var i = 0; i < matrix.length; i++) {
        addRow(i);
        for (var j = 0; j < matrix[0].length; j++) {
            addColumn(i, j, Boolean(matrix[i][j].length));
        }
    }
};
var move = function (robot, mH, mW) {
    var _a = robot.p, pI = _a.i, pJ = _a.j;
    var _b = robot.v, dI = _b.i, dJ = _b.j;
    return {
        p: {
            i: (pI + dI + mH) % mH,
            j: (pJ + dJ + mW) % mW,
        },
        v: robot.v,
    };
};
var tick = function (times, robots, mH, mW) {
    var seen = new Set();
    var i = 0;
    var intervalId = setInterval(function () {
        robots = robots.map(function (r) { return move(r, mH, mW); });
        drawMatrix(createMatrix(mH, mW, robots), i);
        seen.add(JSON.stringify(robots));
        i++;
    }, 20);
    if (seen.has(JSON.stringify(robots)))
        clearInterval(intervalId);
    return robots;
};
var part1 = function (robots, mH, mW, ticks) {
    var mI = Math.floor(mH / 2);
    var mJ = Math.floor(mW / 2);
    var robotsAfterTime = tick(ticks, robots, mH, mW);
    printMatrix(createMatrix(mH, mW, robotsAfterTime));
    return Object.values(robotsAfterTime.reduce(function (acc, robot) {
        var _a = robot.p, i = _a.i, j = _a.j;
        if (i === mI || j === mJ)
            return acc;
        if (i < mI && j < mJ)
            return __assign(__assign({}, acc), { ul: __spreadArray(__spreadArray([], acc.ul, true), [robot], false) });
        if (i < mI && j > mJ)
            return __assign(__assign({}, acc), { ur: __spreadArray(__spreadArray([], acc.ur, true), [robot], false) });
        if (i > mI && j > mJ)
            return __assign(__assign({}, acc), { dr: __spreadArray(__spreadArray([], acc.dr, true), [robot], false) });
        if (i > mI && j < mJ)
            return __assign(__assign({}, acc), { dl: __spreadArray(__spreadArray([], acc.dl, true), [robot], false) });
    }, { ul: [], ur: [], dl: [], dr: [] })).reduce(function (acc, q) { return acc * q.length; }, 1);
};
console.log(part1(input, 103, 101, 10000));
