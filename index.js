var temp =new Map();
var temp1 =new Map();

function onpageload(){

var d = new Date();
var weekday = new Array(7);

weekday[0] = "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";

var n = weekday[d.getDay()];
var str="";
var date = d.getDate();
var month =d.getMonth();
var year =d.getFullYear();
str=str+n+" "+date+"/"+month+"/"+year;
document.getElementById('date').innerHTML=str;

if (typeof(Storage) !== "undefined") {
  if (localStorage.getItem("toDoListLenght") === null) {
    localStorage.setItem("toDoListLenght",0);
    localStorage.setItem("completedListLength",0);
  }
  else{
    setTableAfterRefresh();
    setCompletedTableAfterRefresh();
  }
  } else {
    alert("Sorry! No Web Storage support..");
  }
}
function addtask(){
        var task;
        task = document.getElementById('task').value;
        if(task ==""){
          alert("enter task item ");
        }
        else{
        var table = document.getElementById("myTable");
        var row = table.insertRow(0);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        cell1.innerHTML = "<td> <i class='material-icons'>assignment</i></td>";
        cell2.innerHTML = "<td class='container border border-danger'>"+task+"</td>";
        cell3.innerHTML = "<button class='btn-sm btn-success'onclick='completetask(this)'><i class='material-icons'>done</i></button>";
        cell4.innerHTML = "<button class='btn-sm btn-danger'onclick='deletetask(this)'><i class='material-icons'>delete</i></button>";
        document.getElementById('task').innerHTML="";

        localStorage.setItem("toDoListLenght",parseInt(localStorage.getItem("toDoListLenght"))+1);
        localStorage.setItem("item"+parseInt(localStorage.getItem("toDoListLenght")),task);
        temp["item"+parseInt(localStorage.getItem("toDoListLenght"))]=task;

        document.getElementById("task").value="";
      }
    }

function  deletetask(element) {
  
   
    var row = element.closest('tr').rowIndex;
    var column = element.closest('td').cellIndex;
    console.log("row = "+row +" column = "+" "+column);
    var table = document.getElementById("myTable");
    var keyval=table.rows[row].cells.item(1).innerHTML;
    console.log("..key: ",keyval);
    table.deleteRow(row);

    
    var key1 = getKeyByValue(keyval);
    console.log("...key1: "+key1)
    localStorage.removeItem(key1);
    temp.delete(key1);
  
    
    
}

  function completetask(element){
    var rowno = element.closest('tr').rowIndex;
    var column = element.closest('td').cellIndex;
    console.log(rowno +" "+column);
    var completetable = document.getElementById("completetable");
    var table = document.getElementById("myTable");
    var task = table.rows[rowno].cells.item(1).innerHTML;
    
    var row = completetable.insertRow(0);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    cell1.innerHTML = "<td> <i class='material-icons'>assignment_turned_in</i></td>";
    cell2.innerHTML = "<td>"+task+"</td>";
    cell3.innerHTML = "<td><button type='button' class='btn-sm btn-primary ' onclick='undotask(this)'><i class='material-icons'>undo</i></button></td>";
    table.deleteRow(rowno);


    console.log(parseInt("comp"+localStorage.getItem("completedListLength"))+1+"  ....."+task);
    localStorage.setItem("completedListLength",parseInt(localStorage.getItem("completedListLength"))+1);
    localStorage.setItem("comp"+parseInt(localStorage.getItem("completedListLength")),task);
    temp1["comp"+parseInt(localStorage.getItem("completedListLength"))]=task;

    var key1 = getKeyByValue(task);
    console.log("...key1: "+key1)
    localStorage.removeItem(key1);
    temp.delete(key1);
    

  }
  function undotask(element){
    var rowno = element.closest('tr').rowIndex;
    var column = element.closest('td').cellIndex;
        var completetable = document.getElementById("completetable");
        var table = document.getElementById("myTable");
        var task = completetable.rows[rowno].cells.item(1).innerHTML;
        
        var row = table.insertRow(0);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        cell1.innerHTML = "<td> <i class='material-icons'>assignment</i></td>";
        cell2.innerHTML = task;
        cell3.innerHTML = "<button class='btn-sm btn-success'onclick='completetask(this)'><i class='material-icons'>done</i></button>";
        cell4.innerHTML = "<button class='btn-sm btn-danger'onclick='deletetask(this)'><i class='material-icons'>delete</i></button>";
        completetable.deleteRow(rowno);



        localStorage.setItem("toDoListLenght",parseInt(localStorage.getItem("toDoListLenght"))+1);
        localStorage.setItem("item"+parseInt(localStorage.getItem("toDoListLenght")),task);
        temp["item"+parseInt(localStorage.getItem("toDoListLenght"))]=task;

        var key1 = getKeyByValue1(task);
        console.log("...key1: "+key1)
        localStorage.removeItem(key1);
        temp1.delete(key1);

  }


  function setTableAfterRefresh()
  {

    if (typeof(Storage) !== "undefined") {

   var len = parseInt(localStorage.getItem("toDoListLenght"));
   console.log("length  "+len);
  for(var i=0;i<=len;i++)
  {
    var listItem = localStorage.getItem("item"+i);
    if(listItem!=null)
    {
      addtask2(listItem);
      temp["item"+i]=listItem;
      console.log(listItem);
    }
   
  }

    } else {
      alert("Sorry! No Web Storage support..");
    }

  }

  function addtask2(task){
    var table = document.getElementById("myTable");
    var row = table.insertRow(0);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    cell1.innerHTML = "<td> <i class='material-icons'>assignment</i></td>";
    cell2.innerHTML = task;
    cell3.innerHTML = "<button class='btn-sm btn-success'onclick='completetask(this)'><i class='material-icons'>done</i></button>";
    cell4.innerHTML = "<button class='btn-sm btn-danger'onclick='deletetask(this)'><i class='material-icons'>delete</i></button>";
    document.getElementById('task').innerHTML="";
}

function getKeyByValue(searchValue) {
 
  for (var [key, value] of Object.entries(temp)) {
  
    console.log(key+"  "+value);
    if (value === searchValue)
      return key;
  }
}

function getKeyByValue1(searchValue) {
 
  for (var [key, value] of Object.entries(temp1)) {
  
    console.log(key+"  "+value);
    if (value === searchValue)
      return key;
  }
}

function setCompletedTableAfterRefresh()
{

  if (typeof(Storage) !== "undefined") {

 var len = parseInt(localStorage.getItem("completedListLength"));
 console.log("completed length  "+len);
for(var i=0;i<=len;i++)
{
  var listItem = localStorage.getItem("comp"+i);
  if(listItem!=null)
  {
    completetask2(listItem);
    temp1["comp"+i]=listItem;
    console.log(listItem);
  }
 
}
  } else {
    alert("Sorry! No Web Storage support..");
  }

}


function completetask2(task){

  var completetable = document.getElementById("completetable");

 
  
  var row = completetable.insertRow(0);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  cell1.innerHTML = "<td> <i class='material-icons'>assignment_turned_in</i></td>";
  cell2.innerHTML = "<td>"+task+"</td>";
  cell3.innerHTML = "<td><button type='button' class='btn-sm btn-primary ' onclick='undotask(this)'><i class='material-icons'>undo</i></button></td>";

}
function reset(){
  localStorage.clear();
  window.location.href="index.html";
}
