"use strict";
let toDoObj = [{1:{"keykeykeykey": "value", "key1keykey": "value1"}}, {2:{"key": "value", "key1": "value1"}}]
let selectState = true;
let searchState = true;
let checkedCount = 0;
function addNewList(){
  var addNewList = document.getElementById("myForm")
  var newListBtn = document.getElementById("newlist")
  document.getElementById("listname").focus();
  var newListBtnPos = newListBtn.getBoundingClientRect();
  document.getElementById("crtlist").disabled = true;
  addNewList.style.display = "block";
  addNewList.style.top = (newListBtnPos.bottom + newListBtnPos.height/2)+"px";
  addNewList.style.left = (newListBtnPos.left)+"px";
}

function enableCrt(){
  var listName = document.getElementById("listname")
  var crtListBtn = document.getElementById("crtlist")
  crtListBtn.disabled = listName.value=="" ? true :false;
}

function closeForm(){
  document.getElementById("myForm").style.display = "none";
  var listName = document.getElementById("listname")
  listName.focus();
  listName.value = ""
}

function createList(){
  var listName = document.getElementById("listname")
  toDoObj.push({[listName.value]:{}});
  listName.value = ""
  closeForm()
  contentList()
  event.preventDefault();
  window.scrollTo(0, window.innerHeight);
}

function contentList(obj= toDoObj){
  let contentList = document.getElementById("contentList")
  contentList.innerHTML = "";
  for (let elements of obj){
    var item = document.createElement("div")
    var chckbox = document.createElement("input")
    var para = document.createElement("p")
    var overflow = document.createElement("div")
    chckbox.setAttribute("type", "checkbox")
    chckbox.setAttribute("onclick", "countCheck(event)")
    item.setAttribute("class", "flex-list item")
    overflow.setAttribute("class", "overflow")
    para.innerText = Object.keys(elements)[0]
    overflow.innerHTML= Object.keys(elements[para.innerText]).join("<br>");
    item.setAttribute("onclick","openList(event)")
    // console.log(Object.keys(elements[para.innerHTML]).join("<br>"))
    // item.innerHTML = Object.keys(elements[0]).join("<br>")
    item.appendChild(overflow)
    item.appendChild(chckbox)
    item.appendChild(para)
    contentList.appendChild(item)
  }
}

function selectList(){
  checkedCount = 0
  document.getElementById("bottombar").style.display = selectState ? "flex" : "none";
  var checkboxes = document.querySelectorAll("input[type=checkbox]");
  for (let element of checkboxes){
    element.style.display = selectState ? "inline-block" : "none";
  }
  selectState = selectState ? false : true;
}

function deleteSelected(){
  var checkboxes = document.querySelectorAll("input[type=checkbox]");
  toDoObj = toDoObj.filter(function(value, index, arr){
  return !checkboxes[index].checked;
  });
  selectList();
  contentList();
}

function countCheck(event){
  if (event.target.checked)  checkedCount += 1
  if (!event.target.checked) checkedCount -= 1
  if (checkedCount == 1) document.getElementById("rename").disabled = false
  if (checkedCount != 1) document.getElementById("rename").disabled = true
  if (checkedCount == 0) document.getElementById("delete").disabled = true
  if (checkedCount > 0) document.getElementById("delete").disabled = false
}

function renameSelected(){
  var renameForm = document.getElementById("renameForm")
  var checkboxes = document.querySelectorAll("input[type=checkbox]");
  for (var i=0;i<checkboxes.length;i++){
        if (checkboxes[i].checked) break
  }
  var elemToBeRenamed = checkboxes[i].parentNode.lastChild;
  var renamePopupPos = elemToBeRenamed.getBoundingClientRect();
  renameForm.style.display = "block";
  renameForm.style.opacity = "1";
  renameForm.style.top = (renamePopupPos.bottom + renamePopupPos.height)+"px";
  renameForm.style.left = (renamePopupPos.left + (renamePopupPos.width/5))+"px";
  var newName = document.getElementById("newName")
  newName.value = elemToBeRenamed.innerText
  newName.focus();
}

function rename(event){
  var checkList = document.querySelectorAll("input[type=checkbox]");
  for (var i=0;i<checkList.length;i++){
    if (checkList[i].checked) break
  }
  var newName = document.getElementById("newName").value
  var oldName = Object.keys(toDoObj[i])[0]
  toDoObj[i][newName] = Object.values(toDoObj[i])[0]
  delete toDoObj[i][oldName];
  document.getElementById('renameForm').style.display = "none";
  selectList();
  contentList();
  event.preventDefault();
}

window.addEventListener('click', function(e){
  var renameForm = document.getElementById('renameForm')
	if (!(renameForm.style.display != "none" && renameForm.contains(e.target))){
    renameForm.style.display = "none"
  }
},true)

function highlight(event){
  let nodes = event.target.parentNode.childNodes;
  nodes.forEach(element => {
    if (element.tagName == "BUTTON")element.removeAttribute("class");
  });
  event.target.setAttribute("class","active");
}

function attachSearch(){
  let searchBar = document.getElementById("searchBar")
  searchBar.style.display = (searchBar.style.display == "flex") ? "none" : "flex";
  if (searchBar.style.display == "none") contentList()
  if (searchBar.style.display == "flex") document.getElementById("srchBar").focus();
}

function searchList(event){
  if (event.keyCode !== 13) return
  var srchValue = document.getElementById("srchBar").value
  if (srchValue == "") {contentList(); return}
  var obj = toDoObj.filter(function(value, index, arr){
    return Object.keys(value)[0].includes(srchValue);
    });
  contentList(obj);
}