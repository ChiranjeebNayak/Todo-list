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
    // Store
localStorage.setItem("todolsname", "Chiranjeeb Nayak");
// Retrieve
console.log(localStorage.getItem("todolsname"));
var dataObject = { 'item1': 1, 'item2': 2, 'item3': 3 };

// Set localStorage item
localStorage.setItem('dataObject', JSON.stringify(dataObject));

// Retrieve the object from localStorage
var retrievedObject = localStorage.getItem('dataObject');

// console.log retrieved item
console.log('retrieved data Object: ', JSON.parse(retrievedObject));
  } else {
    alert("Sorry! No Web Storage support..");
  }
}
function addtask(){
        var task;
        task = document.getElementById('task').value;
        var table = document.getElementById("myTable");
        var row = table.insertRow(0);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        cell1.innerHTML = "<td> <i class='material-icons'>assignment</i></td>";
        cell2.innerHTML = task;
        cell3.innerHTML = "<button class='btn-sm btn-success'onclick='completetask(this)'>Complete</button>";
        cell4.innerHTML = "<button class='btn-sm btn-danger'onclick='deletetask(this)'>Delete</button>";
        document.getElementById('task').innerHTML="";
    }

function  deletetask(element) {
    var row = element.closest('tr').rowIndex;
    var column = element.closest('td').cellIndex;
    console.log("row = "+row +" column = "+" "+column);
    var table = document.getElementById("myTable");
    var x=table.rows[row].cells.item(column-1).innerHTML;
    console.log(x);
    table.deleteRow(row);
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
    cell3.innerHTML = "<td><input type='button' class='btn-sm btn-primary ' onclick='undotask(this)' value='Undo'></td>";
    table.deleteRow(rowno);
    

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
        cell3.innerHTML = "<button class='btn-sm btn-success'onclick='completetask(this)'>Complete</button>";
        cell4.innerHTML = "<button class='btn-sm btn-danger'onclick='deletetask(this)'>Delete</button>";
        completetable.deleteRow(rowno);
  }

