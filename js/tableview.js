"use strict";
let toDoObj = [{1:{"keykeykeykey": [false,"notes text here","high","2019-12-19"], "key1keykey": [false,"notes text here","2019-12-19","high"]}}, {2:{"key": [], "key1": []}}]
let selectState = true;
let showAll = false;
let currentList,currentListName;
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
  for (let [index,elements] of obj.entries()){
    var item = document.createElement("div")
    var chckbox = document.createElement("input")
    var para = document.createElement("p")
    var overflow = document.createElement("div")
    chckbox.setAttribute("type", "checkbox")
    chckbox.setAttribute("onclick", "countCheck(event)")
    item.setAttribute("class", "flex-list item")
    overflow.setAttribute("class", "overflow")
    overflow.setAttribute("id",""+index)
    para.innerText = Object.keys(elements)[0]
    overflow.innerHTML= Object.keys(elements[para.innerText]).join("<br>");
    item.setAttribute("onclick","openList(event)")
    item.setAttribute("id",""+index)
    item.appendChild(overflow)
    item.appendChild(chckbox)
    item.appendChild(para)
    contentList.appendChild(item)
  }
}

function selectList(){
  checkedCount = 0
  document.getElementById("bottombar").style.display = selectState ? "flex" : "none";
  var checkboxes = document.querySelectorAll("#contentList input[type=checkbox]");
  for (let element of checkboxes){
    element.style.display = selectState ? "inline-block" : "none";
  }
  selectState = selectState ? false : true;
}

function deleteSelected(){
  var checkboxes = document.querySelectorAll("#contentList input[type=checkbox]");
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
  event.stopPropagation();
}

function renameSelected(){
  var renameForm = document.getElementById("renameForm")
  var checkboxes = document.querySelectorAll("#contentList input[type=checkbox]");
  for (var i=0;i<checkboxes.length;i++){
        if (checkboxes[i].checked) break
  }
  var elemToBeRenamed = checkboxes[i].parentNode.lastChild;
  var renamePopupPos = elemToBeRenamed.getBoundingClientRect();
  renameForm.style.display = "block";
  renameForm.style.top = (renamePopupPos.bottom + renamePopupPos.height)+"px";
  renameForm.style.left = (renamePopupPos.left + (renamePopupPos.width/5))+"px";
  var newName = document.getElementById("newName")
  newName.value = elemToBeRenamed.innerText
  newName.focus();
}

function rename(event){
  var checkList = document.querySelectorAll("#contentList input[type=checkbox]");
  for (var i=0;i<checkList.length;i++){
    if (checkList[i].checked) break
  }
  var newName = document.getElementById("newName").value
  var oldName = Object.keys(toDoObj[i])[0]
  if (oldName != newName){
    toDoObj[i][newName] = Object.values(toDoObj[i])[0]
    delete toDoObj[i][oldName];
  }
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

function hideList(){
  document.getElementById("contentList").style.display = "none";
  document.getElementById("bottombar").style.display = "none";
  document.getElementById("navbar").style.display = "none";
  document.getElementById("searchBar").style.display = "none";
  document.getElementById("tasknavbar").style.display = "flex";
}

function openList(event,targetid){
  if (event) {currentList = event.target.id; hideList()} 
  if (targetid) currentList = targetid
  currentListName = Object.keys(toDoObj[currentList])[0]
  let taskObj = Object.values(toDoObj[currentList])[0]
  let taskcontainer = document.getElementById("taskcontainer")
  taskcontainer.innerHTML = ""
  taskcontainer.style.display = "flex";
  let showDone = false
  let countDone = 0
  Object.keys(taskObj).forEach(task =>{
    let item = document.createElement("div")
    item.setAttribute("class", "taskflex-item taskitem")
    let check = document.createElement("input")
    check.setAttribute("type", "checkbox")
    check.checked = taskObj[task][0]
    check.setAttribute("onclick", "stikeText(event)")
    item.appendChild(check)
    item.appendChild(document.createTextNode(task))
    taskcontainer.appendChild(item)
    if (check.checked) {showDone = true; countDone++ }
    item.style.display = check.checked ? "none" : "flex";
    if (showAll) item.style.display = "flex";
  })
  document.getElementById("donetaskbar").style.display = showDone ? "flex" : "none";
  document.getElementById("showDone").innerHTML = 'Done ('+ countDone + ')'
  let item = document.createElement("div")
    item.setAttribute("class", "taskflex-item taskitem")
    let btn = document.createElement("button")
    btn.setAttribute("onclick", "addTask(event)")
    btn.innerHTML = 'Add';
    item.appendChild(btn)
    item.appendChild(document.createTextNode("New task"))
    taskcontainer.appendChild(item)
}

function goHome(){
  document.getElementById("contentList").style.display = "flex";
  document.getElementById("navbar").style.display = "flex";
  document.getElementById("tasknavbar").style.display = "none";
  document.getElementById("taskcontainer").style.display = "none";
  document.getElementById("donetaskbar").style.display = "none";
  contentList()
}

function addTask(event){
  let addnew = event.target.parentNode
  addnew.removeChild(addnew.lastChild)
  let text = document.createElement("input")
  text.setAttribute("type","text")
  text.setAttribute("onkeyup","appendTask(event)")
  addnew.appendChild(text)
  text.focus();
}

function appendTask(event){
  if (event.keyCode !== 13) return
  let newTask = event.target.value
  if (newTask == "") return
  toDoObj[currentList][currentListName][newTask] = []
  openList(undefined,currentList)
}

function stikeText(event){
  let chkbox = event.target
  let key = event.target.parentNode.lastChild.textContent
  toDoObj[currentList][currentListName][key][0] = chkbox.checked
  openList(undefined,currentList)
}

function clearCompleted(){
  Object.entries(toDoObj[currentList][currentListName]).forEach(
    ([key, value]) => {
      if (value[0] == true) delete toDoObj[currentList][currentListName][key]
    })
  openList(undefined,currentList)
}

function showDoneTask(){
  showAll = showAll ? false : true;
  openList(undefined,currentList)
}
