"use strict";
let toDoObj = []
let checkedCount = 0
let lastCheckEvent;
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
  document.getElementById("renameForm").style.display = "none";
  // window.removeEventListener('click', closePopup(event));
}

function createList(){
  var listName = document.getElementsByName("listname")[0]
  toDoObj.push({[listName.value]:{}});
  listName.value = ""
  closeForm()
  tableCreate()
  window.scrollTo(0, window.innerHeight);
}

function tableCreate() {
  var countOfList = 0
  var noOfElements = toDoObj.length;
  var tbl = document.getElementById("tbl");
  closeForm();
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
  var buttonList = document.getElementsByClassName("listButton");
  checkedCount = 0
  for (var i = 0; i < buttonList.length; i++) {
    if (buttonList[i].childNodes.length == 2) {
      document.getElementsByTagName("footer")[0].style.display = "none";
      buttonList[i].removeChild(buttonList[i].lastChild)
      continue
    }
    document.getElementsByTagName("footer")[0].style.display = "flex";
    document.getElementById("delete").className = "ctadisable";
    document.getElementById("rename").className = "ctadisable"
    var cord = buttonList[i].getBoundingClientRect();
    var checkbox = document.createElement("INPUT");
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("class", "chkbox");
    checkbox.setAttribute("onchange", "countCheck(event)");
    checkbox.style.top = (cord.bottom/4) - 10+"px";
    buttonList[i].appendChild(checkbox);
  }
}

function deleteSelected(){
  if (document.getElementById("delete").className == "ctadisable") return
  var checkList = document.getElementsByClassName("chkbox");
  toDoObj = toDoObj.filter(function(value, index, arr){
    return !checkList[index].checked;
  });
  selectList()
  tableCreate()
}

function countCheck(event){
  if (event.target.checked) {lastCheckEvent = event; checkedCount += 1}
  if (!event.target.checked) checkedCount -= 1
  if (checkedCount == 1) document.getElementById("rename").setAttribute("class","cta")
  if (checkedCount != 1) document.getElementById("rename").setAttribute("class","ctadisable")
  if (checkedCount == 0) document.getElementById("delete").setAttribute("class","ctadisable")
  if (checkedCount > 0) document.getElementById("delete").setAttribute("class","cta")
}

function renameSelected(){
  if (document.getElementById("rename").className == "ctadisable") return
  var renameForm = document.getElementById("renameForm")
  var elemToBeRenamed = lastCheckEvent.target.parentNode.parentNode.getElementsByTagName("p")[0]
  var renamePopupPos = elemToBeRenamed.getBoundingClientRect();
  renameForm.style.display = "block";
  renameForm.style.opacity = "1";
  renameForm.style.top = (renamePopupPos.bottom + renamePopupPos.height)+"px";
  renameForm.style.left = (renamePopupPos.left + (renamePopupPos.width/5))+"px";
  var newName = document.getElementById("newName")
  newName.value = elemToBeRenamed.innerText
  newName.focus();
}

function rename(){
  var checkList = document.getElementsByClassName("chkbox");
  for (var i=0;i<checkList.length;i++){
    if (checkList[i].checked) break
  }
  var newName = document.getElementById("newName").value
  var oldName = Object.keys(toDoObj[i])[0]
  toDoObj[i][newName] = Object.values(toDoObj[i])[0]
  delete toDoObj[i][oldName];
  selectList();
  tableCreate();
}

window.addEventListener('click', function(e){
  var renameForm = document.getElementById('renameForm')
	if (!(renameForm.style.display != "none" && renameForm.contains(e.target))){
    renameForm.style.display = "none"
  }
},true)

function highlight(event){
  console.log(event.target.parentNode.parentNode.childNodes)
  let nodes = event.target.parentNode.parentNode.childNodes;
  nodes.forEach(element => {
    if (element.hasChildNodes()) element.firstChild.style.color= "white"
  });
  event.target.style.color="#0088a9";
}

function attachSearch(){
  const searchBar = document.getElementById("searchBar")
  searchBar.style.display = searchBar.style.display == "flex" ? "none" : "flex"
  if (searchBar.style.display == "none") tableCreate()
  if (searchBar.style.display == "flex") document.getElementById("srchBar").focus();
}

function searchList(event){
  if (event.keyCode !== 13) return
  
}