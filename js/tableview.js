"use strict";
const toDoObj = []
function addNewList(){
  var addNewList = document.getElementById("myForm")
  var newListBtn = document.getElementById("newlist")
  document.getElementById("listname").setAttribute("autofocus","autofocus");
  var newListBtnPos = newListBtn.getBoundingClientRect();
  disable(document.getElementById("crtlist"))
  addNewList.style.display = "block";
  addNewList.style.opacity = "1";
  addNewList.style.top = (newListBtnPos.x + (newListBtnPos.height/3))+"px";
  addNewList.style.left = (newListBtnPos.y)+"px";
}

function disable(btn){
  btn.style.color = "grey";
  btn.disabled = true;
}

function enable(btn){
  btn.style.color = "black";
  btn.disabled = false;
}

function enableCrt(){
  var listName = document.getElementById("listname")
  var crtListBtn = document.getElementById("crtlist")
  if (listName.value=="") return disable(crtListBtn)
  enable(crtListBtn)
}
function closeForm(){
  document.getElementById("myForm").style.display = "none";
  document.getElementById("listname").setAttribute("autofocus","autofocus");
}

function createList(){
  var listName = document.getElementsByName("listname")[0]
  toDoObj.push({[listName.value]:{}});
  listName.value = ""
  closeForm()
  tableCreate()
}

function tableCreate() {
  var countOfList = 0
  var noOfElements = toDoObj.length;
  var tbl = document.getElementById("tbl");
  if (tbl) tbl.remove();
  var body = document.getElementsByTagName("body")[0];
  var elemInRow = parseInt(window.innerWidth / 200) - 1;
  noOfElements = noOfElements < elemInRow ? elemInRow : noOfElements
  tbl = document.createElement("table");
  tbl.setAttribute("id","tbl")
  tbl.style.width = "100%";
  var tbdy = document.createElement("tbody");
  for (var i = 0; noOfElements > 0; i++) {
    var tr = document.createElement("tr");
    for (var j = 0; j < elemInRow; j++) {
      var td = document.createElement("td");
      td.width = "200px"
      var bt = document.createElement("button");
      bt.setAttribute("class","listButton")
      bt.style.backgroundColor = " #ffffff";
      if (noOfElements) {
        var nameOfList = toDoObj[countOfList] ? Object.keys(toDoObj[countOfList])[0] : ""
        td.align = "center";
        td.style.border = "40px solid white";
        //   bt.style.backgroundColor = "#336699";
        //   bt.style.backgroundColor = "#b3cce6";
        bt.style.backgroundColor = "#6699cc";
        bt.innerHTML = "no tasks";
        if (nameOfList) td.appendChild(bt);
        td.appendChild(document.createElement("br"));
        var paraNameOfList = document.createElement("p");
        paraNameOfList.appendChild(document.createTextNode(nameOfList));
        countOfList += 1;
        noOfElements -= 1;
        paraNameOfList.style.font = "bold 17px sans-serif";
        if (nameOfList) td.appendChild(paraNameOfList);
      }
      tr.appendChild(td);
    }
    tbdy.appendChild(tr);
  }
  tbl.appendChild(tbdy);
  body.appendChild(tbl);
}

function selectList(){
  var buttonList = document.getElementsByClassName("listButton")
  for (var i = 0; i < buttonList.length; i++) {
    var cord = buttonList[i].getBoundingClientRect();
    console.log(cord)
    var checkbox = document.createElement("INPUT");
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("class", "chkbox");
    checkbox.style.left = (cord.width/4) +"px";
    checkbox.style.top = (cord.height/3)+"px";
    buttonList[i].appendChild(checkbox);
  }
}