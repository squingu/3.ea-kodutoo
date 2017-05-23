//initialize firebase
firebase.initializeApp(config);


var snapValue;
var beginTime;
var total = 0;

if(window.location.host== 'www.reddit.com'){
	
	
	//Modified from https://stackoverflow.com/a/12409344
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1;
	var yyyy = today.getFullYear();
	if(dd<10){
		dd='0'+dd;
	} 
	if(mm<10){
		mm='0'+mm;
	} 
	var today = (dd+'-'+mm+'-'+yyyy+'-').toString();
	
    user = today+navigator.userAgent.length+navigator.appCodeName.length;
    resumeTimer();  
    readFromDB();
    setInterval(timeCalc, 1000);
}

function timeCalc(){
        var endTime = performance.now();
        var totaltime = Math.round((endTime-beginTime)/1000);
        total = total+totaltime;
        var endValue = total+snapValue;
        writeUserData(endValue);
        saveChanges(endValue);
        resumeTimer();
		
}

function writeUserData(total) {
  firebase.database().ref("timer/"+user).set({
    Time: total
  });
}

function resumeTimer(){
    beginTime = performance.now();
    return beginTime;
}

//Read from firebase https://firebase.google.com/docs/database/web/read-and-write
function readFromDB(){
    var timer = firebase.database().ref("timer");
    timer.child(user).once('value', function(snapshot) {
        if(snapshot.exists()){
            snapValue = snapshot.val().Time;
        }else{
            snapValue = 0;
        }
		if(snapshot.val().Time > 100){
			document.getElementsByTagName("BODY")[0].innerHTML = "Time's up. Go be productive.";
			document.getElementsByTagName("BODY")[0].style.fontSize = "10em";
			document.getElementsByTagName("BODY")[0].style.textAlign = "center";
		}
    return snapValue;
    });
    
}

//https://developer.chrome.com/extensions/storage
function saveChanges(savetime) {

        var theValue = savetime;
        // Check that there's some code there.
        if (!theValue) {
          console.log("Error: No value specified");
          return;
        }
        // Save it using the Chrome extension storage API.
        chrome.storage.sync.set({'value': theValue}, function() {
          // Notify that we saved.
          console.log("Settings saved");
        });
      }
