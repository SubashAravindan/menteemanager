
var menteeList;
if (localStorage.getItem("menteeArray")!=null) {
	var temp=localStorage.getItem("m");
	menteeList=JSON.parse(temp);
}
else{
	menteeList=[];
}
var submitButton=document.getElementById("submit");
var newName=document.getElementById("newname");
var newRollNo=document.getElementById("newrollno");
var newComments=document.getElementById("newcomments");
var menteeDisplay=document.getElementById("menteedisplay");
var addButton=document.getElementById("addButton");
var formDiv=document.getElementById("formdiv");
var sortButton=document.querySelector("#sortButton");
var p;
var extendedDivHTML='<div><p>NAME :</p><p class="nameP"></p></div><div><p>RollNo :</p><p class="rollNoP"></p></div><div><p>Comments :</p><p class="commentP"></p></div><div><p>Rating :</p><p class="ratingP"></p></div><div><span><button id="editButton">Edit</button></span><span><button id="delButton">Delete</button></span></div>';
var normalDivHTML= '<div><p>Name :</p><p class="nameP"></p></div><div><p>Rating</p><p class="ratingP"></p></div>'
addButton.addEventListener("click",function () {
	formDiv.classList.remove("hidden");
	this.classList.add("hidden");
	if(document.querySelector("#editButton")!=null){
		editButton.setAttribute("disabled",true);
	}
})

submitButton.addEventListener("click",function(){

	if (addButton.classList.contains("hidden")) {     //to check if this button is used for ADD operation.
		addNewMentee();
	} 
	else {												//if not add, it must be edit.
		menteeList[p].name=newName.value;
		menteeList[p].rollno=newRollNo.value;
		menteeList[p].comments=newComments.value;
		menteeList[p].rating=document.querySelector('input[type="radio"]:checked').value;
		displayUpdate(-1);
		newName.value="";
		newComments.value="";
		newRollNo.value="";
		formDiv.classList.add("hidden");
		addButton.removeAttribute("disabled");
	}
	localStorage.setItem("m",JSON.stringify(menteeList));

})


function addNewMentee() {

	if (newName.value===""||newRollNo.value==="") {
		alert("Name and roll number are required to add new mentee");
	}
	else
	{
		var m={
			name : newName.value,
			rollno: newRollNo.value,
			rating: document.querySelector('input[type="radio"]:checked').value,
			comments: newComments.value 		
		}
		menteeList.push(m);
		newName.value="";
		newComments.value="";
		newRollNo.value="";
		if(document.querySelector("#editButton")!=null){
			editButton.setAttribute("disabled",false);
		}
		displayUpdate(-1);
		formDiv.classList.add("hidden");
		addButton.classList.remove("hidden");
		
	}
}

function editMentee(i) {
	addButton.setAttribute("disabled",true);
	formDiv.classList.remove("hidden");
	newName.value=menteeList[i].name;
	newRollNo.value=menteeList[i].rollno;
	newComments.value=menteeList[i].comments;
	p=i;

}

function delMentee(i) {
	menteeList.splice(i,1);
	localStorage.setItem("m",JSON.stringify(menteeList));
	displayUpdate(-1);
}
function displayUpdate(expandedIndex) {
	menteeDisplay.innerHTML="";
	for (var i = 0; i < menteeList.length; i++) {
		if (i===expandedIndex) {
			createExpandedMenteeBox(i);


		}
		else{
			createNormalMenteeBox(i);
		}

	}
	}

displayUpdate(-1);

function createNormalMenteeBox(i) {
	var newDiv=document.createElement("div");
	newDiv.setAttribute("id","newDiv");
	newDiv.classList.add("menteebox");
	menteeDisplay.appendChild(newDiv);
	if (menteeList[i].rating>3) {
		newDiv.classList.add("greenbox");
	} else if(menteeList[i].rating==3) {
		newDiv.classList.add("orangebox");
	}
	else{
		newDiv.classList.add("redbox");
	}	

	newDiv.innerHTML=normalDivHTML;
	document.querySelectorAll(".nameP")[document.querySelectorAll(".nameP").length-1].textContent=menteeList[i].name;
	document.querySelectorAll(".ratingP")[document.querySelectorAll(".ratingP").length-1].textContent=menteeList[i].rating;


	newDiv.addEventListener("click",function() {
		displayUpdate(i);
	})

};

function createExpandedMenteeBox(i) {
	var newDiv=document.createElement("div");
	newDiv.setAttribute("id","newDiv");
	newDiv.classList.add("menteebox");
	menteeDisplay.appendChild(newDiv);

	if (menteeList[i].rating>3) {
		newDiv.classList.add("greenbox");
	} else if(menteeList[i].rating==3) {
		newDiv.classList.add("orangebox");
	}
	else{
		newDiv.classList.add("redbox");
	}
	newDiv.innerHTML=extendedDivHTML;
	document.querySelectorAll(".nameP")[document.querySelectorAll(".nameP").length-1].textContent=menteeList[i].name;
	document.querySelectorAll(".rollNoP")[document.querySelectorAll(".rollNoP").length-1].textContent=menteeList[i].rollno;
	document.querySelectorAll(".ratingP")[document.querySelectorAll(".ratingP").length-1].textContent=menteeList[i].rating;
	document.querySelectorAll(".commentP")[document.querySelectorAll(".commentP").length-1].textContent=menteeList[i].comments;

	document.getElementById("delButton").addEventListener("click",function () {
		delMentee(i);
	})
	newDiv.addEventListener("click",function () {
		displayUpdate(-1);
	})
	document.getElementById("editButton").addEventListener("click",function () {
		editMentee(i);
	})

}

sortButton.addEventListener("click",function () {
	menteeList.sort(function(a,b) {
		if(b.rating>a.rating)
			return 1;
		else
			return -1;
	})
	displayUpdate(-1);
})


