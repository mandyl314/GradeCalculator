$(document).ready(function (){
    //alert("doc ready");

    // set up document intro
    $(".finalBox").hide();
    $(".category").hide();
    $("#addCat").hide();
    $("#pickOne").hide();

var gradeCount = [1]; //count of # of grades in each category
var catIndex=0; // index of category number created
var percents=[]; // holds all the percents
var sectionScore=[]; //partial score for each category
var isFindGrade=false; // true if selected
var catSelected=false; // true if selected
var catPrevious=0; // holds category selected value
var sumAllCat=[]; // sum of all scores in each category
var totAllCat=[]; // sum of totals in each category
var MAX_CATEGORIES=8; // highest num of categories possible
var isMaxed=false; // true is max is reached

// make another grade input box in given category
function newInputGrade(catNum){
gradeCount[catNum]++; 
var newInput=document.createElement("input");
newInput.setAttribute("class", "score");
newInput.setAttribute("name","grade"+catNum);
newInput.setAttribute("placeholder", "Input Grade");
newInput.setAttribute("type","number");

var linebreak=document.createElement("br");

var parent=document.getElementById("gradeCat"+catNum);
parent.appendChild(linebreak);
parent.appendChild(newInput);

var totInput=document.createElement("input");
    totInput.setAttribute("class","total");
    totInput.setAttribute("name","tot"+catNum);
    totInput.setAttribute("type","number");
    totInput.setAttribute("placeholder","total");
    parent.appendChild(totInput);

}

// add another category: percent or points, category name, percentage, 
// first grade input, add grade button
// also creates another section button for finding grade setting
function addCategory(i){
    var section=document.createElement("div");
    section.setAttribute("class","category");
    section.setAttribute("id","category"+i);

    var webBody=document.getElementById("webBody");
    webBody.appendChild(section);

    var form=document.createElement("form");
    form.setAttribute("name","options");

    section.appendChild(form);

    // percent or points radio button
    var opt1=document.createElement("input");
    opt1.type="radio";
    opt1.name="option";
    opt1.value="percents";
    opt1.id="opt"+i+"l1";
    form.appendChild(opt1);

    var label1=document.createElement("label");
    label1.setAttribute("for","opt"+i+"l1");
    label1.innerHTML="Percents";
    form.appendChild(label1);

    
    var opt2=document.createElement("input");
    opt2.type="radio";
    opt2.name="option";
    opt2.value="points";
    opt2.id="opt"+i+"l2";
    form.appendChild(opt2);

    var label2=document.createElement("label");
    label2.setAttribute("for","opt"+i+"l2");
    label2.innerHTML="Points";
    form.appendChild(label2);

    // section name input
    var name=document.createElement("input");
    name.setAttribute("id","cat"+i);
    name.setAttribute("placeholder", "Enter Section " + (i+1) + " Name");
    section.appendChild(name);

    var lb1=document.createElement("br");
    section.appendChild(lb1);

    // percent input
    var percent=document.createElement("input");
    percent.type="number";
    percent.setAttribute("class","percent");
    percent.setAttribute("id","perc"+i);
    percent.setAttribute("placeholder", "% of grade");
    section.appendChild(percent);

    var grades=document.createElement("span");
    section.appendChild(grades);
    grades.setAttribute("class","grades");
    grades.setAttribute("id","gradeCat"+i);

    var lb2=document.createElement("br");
    grades.appendChild(lb2); 
    
    gradeCount.push(1); // set array to 1 grade for this category

    // input 1st grade box
    var newInput=document.createElement("input");
    newInput.setAttribute("class", "score");
    newInput.setAttribute("name","grade"+catIndex);
    newInput.setAttribute("placeholder", "Input Grade");
    newInput.setAttribute("type","number");
    grades.appendChild(newInput);

    // total box for grade
    var totInput=document.createElement("input");
    totInput.setAttribute("class","total");
    totInput.setAttribute("name","tot"+catIndex);
    totInput.setAttribute("type","number");
    totInput.setAttribute("placeholder","total");
    grades.appendChild(totInput);

    var lb3=document.createElement("br");
    section.appendChild(lb3);

    // add another grade button
    var newButton=document.createElement("button");
    newButton.innerHTML="Add Another Grade";
    newButton.setAttribute("class","addGrade");
    newButton.setAttribute("id",i);
    section.appendChild(newButton);

    // this section is for find Grade, adding section radio button for category
     var newSec=document.createElement("input");
    newSec.type="radio";
    newSec.name="catChoice";
    newSec.value=i;
    newSec.id="choice"+i;

    var form2=document.getElementsByName("findGrade");
    form2[0].appendChild(newSec);

    var secLabel=document.createElement("label");
    secLabel.setAttribute("for","choice" +i);
    secLabel.innerHTML="Section " + (i+1);
    form2[0].appendChild(secLabel);
}

// clicking addCat button to add category
$("#addCat").click(function(){
    catIndex++; //increment total category index
    addCategory(catIndex); // add category elements 
    // checks if the max categories has been reached
    if(catIndex==MAX_CATEGORIES-1){
        // if so, set to true and hide the add category button
        isMaxed=true;
        $("#addCat").hide();
    }
});

// clicking add grade button
$(document).on('click', ".addGrade", function(){
    catNum=this.id; // gets the category number
    newInputGrade(catNum); // add grade elements
});

// changing between percents and points 
$(document).on('change',"input[name='option']", function(){
    var radioValue= $(this).val(); // percents or points
    var catNum=(this.id).substring(3,4); // get category number from id
    // gets total column
    var total = document.getElementsByName("tot" + catNum);
    // if percents is clicked, loop through and set all total to 100
    if(radioValue=='percents'){
            for (var j=0; j<total.length;j++){
                total[j].value="100";
            }
    }
    // if points clicked, loop through and leave empty
    if(radioValue=='points') {
            for (var j=0; j<total.length;j++){
                total[j].value="";
            }
}
})

// changing between categories for find grade 
$(document).on('change',"input[name='catChoice']", function(){
    var selected=$(this).val(); // category number selected

// if there wasn't a previous category selected
if(!catSelected){
    // create the elements needed 
   var parent=document.getElementById("gradeCat"+selected);
   var span=document.createElement("span");
   span.id="result2Span";
    parent.appendChild(span);

   var lb=document.createElement("br");
   span.appendChild(lb); 

   //result box
    var result=document.createElement("span");
    result.id="result2";
    result.innerHTML="TBD";
    span.appendChild(result); 

    // input total points element
    var totInput=document.createElement("input");
    totInput.setAttribute("class","total");
    totInput.setAttribute("name","tot"+selected);
    totInput.id="extraTot";
    totInput.setAttribute("type","number");
    totInput.setAttribute("placeholder","total");
    span.appendChild(totInput); 

    catSelected=true; // true if selected
    catPrevious=selected; // keep track of what is currently selected

}
// there was a category already selected, so move elements under new category
else{
    var lastParent=document.getElementById("gradeCat"+catPrevious);
    var spanPrevious=document.getElementById("result2Span");
    lastParent.removeChild(spanPrevious);
    var newParent=document.getElementById("gradeCat"+selected);
    newParent.appendChild(spanPrevious);
    catPrevious=selected;
}

})

// loop through to get the percents from the categories
function getPercent(){
    for (var i=0; i<=catIndex; i++){
        var percentVal=$('#perc'+i).val();
        // if percent is empty set the value to 0
        if(percentVal.length==0){
            percentVal=0;
        } 
        percents.push(percentVal);
    }
}

// calculate the partial grades for each section
function getSectionGrades(){
   // loop through each category
    for (var i=0;i<=catIndex;i++){
        var sum=0;
        var total=0;
        var partial=0;
            var grades= document.getElementsByName("grade"+i);
            var max=document.getElementsByName("tot"+i);
            //loop through each grade within a category, adding the scores and totals
                for (var j=0; j<gradeCount[i];j++){
            // checks if there is a grade inputed, if not reduce grade count of that category
                if (grades[j].value.length==0){
                    gradeCount[i]--;
                }
                else{
            sum+=Number(grades[j].value);
            total+=Number(max[j].value);
                }
            }
            // store total sums and totals for each category
            sumAllCat.push(sum);
            totAllCat.push(total)

        // calculate partial scores if percent is not 0
          if(percents[i]!=0){
            partial=(sum/total)*(percents[i]);
          }
          // store partial scores in an array
        sectionScore.push(partial); 
    }
}

// getting the result for find grade needed
function getResult2(){
    var indexNum=catPrevious; //index of category selected
    //total points possible of score needed
    var plusTot=Number(document.getElementById("extraTot").value);
    // goal for final grade
    var goal=document.getElementById("desiredGrade").value;
    // sum up all partial scores except category selected
    var partialSum=0;
    for(i=0;i<sectionScore.length;i++){
        if(i!=indexNum){
            partialSum+=sectionScore[i];
        }
    }
    // partial needed inc category selected
   var target=goal-partialSum;
 
   // calculation to find grade needed
   var needed = (target/percents[indexNum])*(totAllCat[indexNum]+plusTot)-sumAllCat[indexNum];
   var rounded=Math.round(needed*100)/100;
  
   // display result
   var result=document.getElementById("result2");
    result.innerHTML=rounded;
}

// calculate current grade by adding up all partials for each category
function getResult1(){
    total=0;
    for (i=0; i< sectionScore.length; i++){
        total+=sectionScore[i];
    }
    // diplay result
    var result=document.getElementById("finalResult");
    var rounded=Math.round(total*100)/100;
    result.innerHTML=rounded;
}

// reset variables to do next calculation, without removing input values
function resetVars(){
    percents=[];
    sectionScore=[];
    // reset number of grade for each category
    gradeCount = JSON.parse(localStorage.getItem("gradeCount"));
    sumAllCat=[];
    totAllCat=[];
}

// clicking calculate button
$("#calculate").click(function(){
    // store number of grades for each category
    localStorage.setItem("gradeCount", JSON.stringify(gradeCount));
    getPercent();
    getSectionGrades();

    // checks which option is selected and so respective calculation
    if(isFindGrade){
        getResult2();
    }
    else{
        getResult1();
    }
    resetVars();
})

// page setup for calculating current grade
function setupCC(){

    // if category was selected unselect and remove from display
    if(catSelected){
        var radio=document.getElementById("choice"+catPrevious);
        radio.checked=false;
    var lastParent=document.getElementById("gradeCat"+catPrevious);
    var spanPrevious=document.getElementById("result2Span");
    lastParent.removeChild(spanPrevious);
    catSelected=false;
    }

    isFindGrade=false;
    // show the needed display elements, and hide the other
    $(".finalBox").show();
    $("#desired").hide();
    $("#output1").show();
    $(".category").show();
    $("#addCat").show();
    $("#pickOne").hide();

    // check if max has been reach, hide button if so
    if(isMaxed){
        $("#addCat").hide();
    }
}

// page setup for finding grade needed
function setupFN(){
    // show the needed display elements, and hide the other
    $(".finalBox").show();
    $("#output1").hide();
    $("#desired").show();
    $(".category").show();
    $("#addCat").show();
    $("#pickOne").show();
    // check if max has been reach, hide button if so
    if(isMaxed){
        $("#addCat").hide();
    }
}

// is calculating current if clicked
$("#calcCurrent").click(function(){
    $("#calcCurrent").css("background-color", "red");
    $("#findNeeded").css("background-color", "yellow");
    setupCC();
})

// if finding grade needed is clicked
$("#findNeeded").click(function(){
    isFindGrade=true;
    $("#findNeeded").css("background-color", "red");
    $("#calcCurrent").css("background-color", "yellow");
    setupFN();
})


});