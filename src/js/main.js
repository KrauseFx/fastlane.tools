(function(){
  var startedWithMinutes = null;

  // This number *never* changes
  var developerSecondsSavedBeforeAnalyticIngester = 26304323354;

  // These numbers are taken from our SQL query
  var developerSecondsSavedAfterAnalyticIngester = 8558750963;
  var developerSecondsSavedPerSecond = 1039;
  var timeUpdated = 1504812058;

  function reloadThis() {
    // get current time
    // get difference in seconds from timeUpdated
    // multiply difference in seconds by developerSecondsSavedPerSecond
    // add to sum of developerSecondsSavedBefore and After

    var currentEpoch = ((new Date()).getTime()) / 1000;

    var developerSecondsSavedSinceUpdate = (currentEpoch - timeUpdated) * developerSecondsSavedPerSecond;
    var seconds = developerSecondsSavedSinceUpdate + developerSecondsSavedBeforeAnalyticIngester + developerSecondsSavedAfterAnalyticIngester;

    var minutes = seconds / 60; // to minutes
    if (startedWithMinutes === null) {
      startedWithMinutes = minutes;
    }
    var hours = minutes / 60; // to hours
    var hoursAsArray = parseInt(hours).toString().split('');
    var outputHtml = '';
    var hoursOutput = [];
    hoursAsArray.reverse();

    for (var i = 0; i < hoursAsArray.length; i++) {
      if ((i !== 0) && (i % 3 === 0)) {
        hoursOutput[i] = '<span>'+ hoursAsArray[i] +'</span><span class="comma">,</span>';
      }else{
        hoursOutput[i] = '<span>'+ hoursAsArray[i] +'</span>';
      }
    }

    hoursOutput.reverse();
    for (var a = 0; a < hoursOutput.length; a++) {
      outputHtml += hoursOutput[a] ;
    }

    document.getElementById('currentCount').innerHTML = outputHtml;

    // show everything
    document.getElementById('timeCounter').style.opacity = 1;
  }
  reloadThis();
  setInterval(reloadThis, 10000);

  new WOW().init();

})();

