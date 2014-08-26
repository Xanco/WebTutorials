var mainApp = angular.module('mainApp', []);

mainApp.controller('mainApp', function ($scope) {
    $scope.Script = [
        {
            "snippet": "function(){ \n a = 12; \n}",
            "comment": "Comment",
            "filename": "javascript.js",
            "language": "javascript"
        },
        {
            'snippet': 'function awesome! (){ \n a = 1;\n} function awesome!! (){\nb = 2;\n}',
            'comment': 'This code does something',
            "filename": "javascript.js",
            "language": "javascript"
        },
        {
            'snippet': 'This is really cool code! And this is a added bonus!',
            'comment': 'Adding to the previous code, this does something too',
            "filename": "javascript.js",
            "language": "javascript"
        },
        {
            'snippet': '&lt;h1&gt;HTML!!!&lt;/h1&gt;',
            'comment': 'Wooooooooooo!',
            "filename": "index.html",
            "language": "markup"
        },
    ];

    $scope.coding = true;

    $scope.currentScript = {
        "snippet": $scope.Script[0].snippet,
        "comment": $scope.Script[0].comment,
        "language": $scope.Script[0].language
    }

    $scope.globalInfo = {
        "title": "Writing to console in JavaScript",
        "coding": true,
        "files": ["index.html", "javascript.js"]
    };

    $scope.fileStates = {}
    $scope.Script.forEach(function(file){
        $scope.fileStates.push({ "filename": file.filename, "language": file.language, "content": ""});
    });
    
    step = 0;
    $scope.nextScript = function () {
        if (step < objLengthAccurate($scope.Script)) {
            step = step + 1;
            $scope.getScript();
            Prism.highlightAll();
        }
    };

    $scope.prevScript = function () {
        if (step != 0) {
            step = step - 1;
            $scope.getScript();
            Prism.highlightAll();
        }
    };

    $scope.getScript = function () {
        $("#codeView").html($scope.Script[step].snippet);
        $scope.currentScript.comment = $scope.Script[step].comment;
        $scope.currentScript.language = $scope.Script[step].language;
        $scope.currentStep();
    };

    $scope.currentStep = function () {
        $("#codeCurrentStep").text((step + 1).toString() + "/" + objLength($scope.Script));
    };
});

$(document).keydown(function (e) {
    switch (e.which) {
        case 37:
            $("#codePrev").click();
            break;
        case 39:
            $("#codeNext").click();
            break;

    }
});


Prism.highlightAll();