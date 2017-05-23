var timeSpent;
function displayTime(){

    chrome.storage.sync.get('value', function (obj) {
        timeSpent = obj.value;
        secondstotime(timeSpent);
        document.getElementById('time').innerHTML = timeSpent;
    });
	setInterval(displayTime, 1000);
}

/*
Time with leading 0's - https://stackoverflow.com/a/12230363
Calculate time from seconds - https://stackoverflow.com/a/3733257
*/
function secondstotime(sec){
        var hours   = Math.floor(sec/ 3600);
        var minutes = Math.floor((sec - (hours * 3600)) / 60);
        var seconds = sec - (hours * 3600) - (minutes * 60);
        timeSpent = ('0' + hours).slice(-2)+':'+('0' + minutes).slice(-2)+':'+('0' + parseInt(seconds)).slice(-2);
		if(minutes>4){
			document.getElementById("p").style.color="blue";
		}
        return timeSpent;
}

document.addEventListener('DOMContentLoaded', function() {
	displayTime();
});
