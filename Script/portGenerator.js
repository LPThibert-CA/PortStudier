function $(id){
	return document.getElementById(id);
};

function load(){
	$("portQuestion").innerText = randomPortQuestion();
};

function getRandom(min, max){
	if(min <= 0){
		return Math.floor((Math.random() * (max+1)) + (min +1))-1;
	}
	else{
		return Math.floor((Math.random() * max) + min);
	}
};

function randomPort(){
	return ports[getRandom(0,ports.length -1)];
};

function randomPortQuestion(){
	let pQ = getRandom(1,2);
	if(pQ ==1){
		pA = 2;
		return "Port: " + port.num;
	}
	else if(pQ ==2){
		pA = 1;
		return "Port: " + port.desc;
	}
};

$("btnCheck").onclick = function(){
	//check
	let ans = $("answer").value.toUpperCase();
	let corr = -1;
	if( pA == 1){
		corr = port.num;
	}
	else if(pA ==2){
		corr = port.desc.toUpperCase();
	}
	
	console.log("Answer:" + ans);
	console.log("Correct:" + corr);
	
	//not
	if(ans == corr){
		$("notification").innerText = ans + "-> Correct! Port:" + port.num + " = " + port.desc;
		$("notification").style.color = "green";
	}
	else if(pA == 1){
		var found = false;
		var correctPorts = [];
		for(let i=0; i < ports.length; i++){
			if(ports[i].desc == port.desc){
				correctPorts[correctPorts.length] = ports[i];
			}
		}
		for(let j=0; j < correctPorts.length; j++){
			if(correctPorts[j].num == ans){
				let optAnswer = correctPorts[j];
				$("notification").innerText = ans + "->Correct! Port:" + optAnswer.num + " = " + optAnswer.desc;
				$("notification").style.color = "green";
				found = true;
			}
		}
		if(!found){
				$("notification").innerText = ans + "->Incorrect! Port:" + port.num + " = " + port.desc;
				$("notification").style.color = "red";
		}
		found = false;
	}
	else{
		$("notification").innerText = ans + "->Incorrect! Port:" + port.num + " = " + port.desc;
		$("notification").style.color = "red";
	}
	
	$("answer").value = "";
	
	//setup next question
	port = randomPort();
	console.log(port);
	$("portQuestion").innerText = randomPortQuestion();
}

$("btnDisplayAll").onclick = function(){
	var table = "<table style='width:75%'><tr><th>Port</th><th>Description</th></tr>"
  for(let i=0; i < ports.length; i++){
	  table = table + "<tr><td>" + ports[i].num + "</td><td>" + ports[i].desc + "</td></tr>";
  }
  table = table + "</table>";
  if($("btnDisplayAll").innerText == "Hide Table"){
	    $("table").innerHTML = "";
		$("btnDisplayAll").innerText = "Display All";
  }
  else{
	    $("table").innerHTML = table;
		$("btnDisplayAll").innerText = "Hide Table";
  }
}

var port = randomPort();
var pA = -1;
load();