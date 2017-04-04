var path = require("path");
var fs = require("fs");

function makeUrl(storyKind, selectedStory) {
  return `/storybook/iframe.html?selectedKind=${encodeURIComponent(storyKind)}&selectedStory=${encodeURIComponent(selectedStory)}&dataId=0`
}

function initSuites(folderName) {
  var inputFolder = path.join(__dirname, "tsc-output", "app", folderName);
  if (!fs.existsSync(inputFolder)) {
    console.log("could not find " + inputFolder)
    return
  }
  var components = {};
  function storiesOfMock(kind) {
    return {
      add: function (story) {
        components[kind] = components[kind] || [];
        components[kind].push(story);
        return this;
      }
    }
  }
  fs.readdirSync(inputFolder).forEach(function(file) {
    var mod = require("./tsc-output/app/" + folderName + "/" + file).default;
    if (typeof mod !== "function") {
      throw new Error(folderName + "/" + file + " does not export a function as default export.")
    }
    mod({storiesOf: storiesOfMock});
  });

  gemini.suite(folderName, function(storybook) {
    storybook.setCaptureElements('#root');
    Object.keys(components).forEach(function (kind) {
      gemini.suite(kind, function(componentSuite) {
        components[kind].forEach(function (story) {
          gemini.suite(story, function(storySuite) {
            storySuite
              .setUrl(makeUrl(kind, story))
              .capture("plain", function (action) {
                action.waitForElementToShow("#root");
              })
          })
        });
      });
    });
  });
}


initSuites("components")
initSuites("pages")
gemini.suite('unittests', function(suite) {
  suite.setUrl('/build/tests.html')
    .setCaptureElements('#testPassed')
    .capture('testPassed', function(action, find) {
      action.waitForJSCondition(function (window) {
        return window.babyccinoTestResult !== undefined;
      })
    });
});
