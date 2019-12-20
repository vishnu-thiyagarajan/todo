"use strict";
let toDoObj = [
  {
    Personal: {
      Painting: [false, "Do a Master Piece", 3, "2019-12-19"],
      Yoga: [false, "Daily once", 2, "2019-12-20"],
      Meditation: [false, "5 Mins a day", 3, "2019-12-21"]
    }
  },
  {
    Professional: {
      "Do ToDo": [false, "refactor code", 3, "2019-12-20"],
      "Learn css flex box": [false, "do hands on", 3, "2019-12-16"]
    }
  }
];
let selectState = true;
let showAll = false;
let currentList, currentListName, currentTask;
let checkedCount = 0;
let detailitem = document.getElementById("detailitem");
function addNewList() {
  var addNewList = document.getElementById("myForm");
  var newListBtn = document.getElementById("newlist");
  document.getElementById("listname").focus();
  var newListBtnPos = newListBtn.getBoundingClientRect();
  document.getElementById("crtlist").disabled = true;
  addNewList.style.display = "block";
  addNewList.style.top = newListBtnPos.bottom + newListBtnPos.height / 2 + "px";
  addNewList.style.left = newListBtnPos.left + "px";
}

function enableCrt() {
  var listName = document.getElementById("listname");
  var crtListBtn = document.getElementById("crtlist");
  crtListBtn.disabled = listName.value == "" ? true : false;
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
  var listName = document.getElementById("listname");
  listName.focus();
  listName.value = "";
}

function createList() {
  var listName = document.getElementById("listname");
  toDoObj.push({ [listName.value]: {} });
  listName.value = "";
  closeForm();
  contentList();
  event.preventDefault();
  window.scrollTo(0, window.innerHeight);
}

function contentList(obj = toDoObj) {
  let contentList = document.getElementById("contentList");
  contentList.innerHTML = "";
  for (let [index, elements] of obj.entries()) {
    var item = document.createElement("div");
    var chckbox = document.createElement("input");
    var para = document.createElement("p");
    var overflow = document.createElement("div");
    chckbox.setAttribute("type", "checkbox");
    chckbox.setAttribute("onclick", "countCheck(event)");
    item.setAttribute("class", "flex-list item");
    overflow.setAttribute("class", "overflow");
    overflow.setAttribute("id", "" + index);
    para.innerText = Object.keys(elements)[0];
    overflow.innerHTML = Object.keys(elements[para.innerText]).join("<br>");
    if (Object.keys(elements[para.innerText]).length == 0)
      overflow.innerHTML = "no tasks";
    item.setAttribute("onclick", "openList(event)");
    item.setAttribute("id", "" + index);
    item.appendChild(overflow);
    item.appendChild(chckbox);
    item.appendChild(para);
    contentList.appendChild(item);
  }
}

function selectList() {
  checkedCount = 0;
  document.getElementById("bottombar").style.display = selectState
    ? "flex"
    : "none";
  var checkboxes = document.querySelectorAll(
    "#contentList input[type=checkbox]"
  );
  for (let element of checkboxes) {
    element.style.display = selectState ? "inline-block" : "none";
  }
  selectState = selectState ? false : true;
}

function deleteSelected() {
  var checkboxes = document.querySelectorAll(
    "#contentList input[type=checkbox]"
  );
  toDoObj = toDoObj.filter(function(value, index, arr) {
    return !checkboxes[index].checked;
  });
  selectList();
  contentList();
}

function countCheck(event) {
  if (event.target.checked) checkedCount += 1;
  if (!event.target.checked) checkedCount -= 1;
  if (checkedCount == 1) document.getElementById("rename").disabled = false;
  if (checkedCount != 1) document.getElementById("rename").disabled = true;
  if (checkedCount == 0) document.getElementById("delete").disabled = true;
  if (checkedCount > 0) document.getElementById("delete").disabled = false;
  event.stopPropagation();
}

function renameSelected() {
  var renameForm = document.getElementById("renameForm");
  var checkboxes = document.querySelectorAll(
    "#contentList input[type=checkbox]"
  );
  for (var i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) break;
  }
  var elemToBeRenamed = checkboxes[i].parentNode.lastChild;
  var renamePopupPos = elemToBeRenamed.getBoundingClientRect();
  renameForm.style.display = "block";
  renameForm.style.top = renamePopupPos.bottom + renamePopupPos.height + "px";
  renameForm.style.left = renamePopupPos.left + renamePopupPos.width / 5 + "px";
  var newName = document.getElementById("newName");
  newName.value = elemToBeRenamed.innerText;
  newName.focus();
}

function rename(event) {
  var checkList = document.querySelectorAll(
    "#contentList input[type=checkbox]"
  );
  for (var i = 0; i < checkList.length; i++) {
    if (checkList[i].checked) break;
  }
  var newName = document.getElementById("newName").value;
  var oldName = Object.keys(toDoObj[i])[0];
  if (oldName != newName) {
    toDoObj[i][newName] = Object.values(toDoObj[i])[0];
    delete toDoObj[i][oldName];
  }
  document.getElementById("renameForm").style.display = "none";
  selectList();
  contentList();
  event.preventDefault();
}

window.addEventListener(
  "click",
  function(e) {
    var renameForm = document.getElementById("renameForm");
    if (
      !(renameForm.style.display != "none" && renameForm.contains(e.target))
    ) {
      renameForm.style.display = "none";
    }
  },
  true
);

function highlight(event) {
  let nodes = event.target.parentNode.childNodes;
  nodes.forEach(element => {
    if (element.tagName == "BUTTON") element.removeAttribute("class");
  });
  event.target.setAttribute("class", "active");
  filter(event.target.innerText);
}

function attachSearch() {
  let searchBar = document.getElementById("searchBar");
  searchBar.style.display = searchBar.style.display == "flex" ? "none" : "flex";
  if (searchBar.style.display == "none") contentList();
  if (searchBar.style.display == "flex")
    document.getElementById("srchBar").focus();
}

function searchList(event) {
  if (event.keyCode !== 13) return;
  var srchValue = document.getElementById("srchBar").value;
  if (srchValue == "") {
    contentList();
    return;
  }
  var obj = toDoObj.filter(function(value, index, arr) {
    return Object.keys(value)[0].includes(srchValue);
  });
  contentList(obj);
}

function hideList() {
  document.getElementById("contentList").style.display = "none";
  document.getElementById("bottombar").style.display = "none";
  document.getElementById("navbar").style.display = "none";
  document.getElementById("searchBar").style.display = "none";
  document.getElementById("tasknavbar").style.display = "flex";
}

function openList(event, targetid) {
  if (event) {
    currentList = event.target.id;
    hideList();
  }
  if (targetid) currentList = targetid;
  currentListName = Object.keys(toDoObj[currentList])[0];
  let taskObj = Object.values(toDoObj[currentList])[0];
  let taskcontainer = document.getElementById("taskcontainer");
  taskcontainer.innerHTML = "";
  detailitem.style.display = "none";
  taskcontainer.appendChild(detailitem);
  taskcontainer.style.display = "flex";
  let showDone = false;
  let countDone = 0;
  Object.keys(taskObj).forEach(task => {
    let item = document.createElement("div");
    item.setAttribute("class", "taskflex-item taskitem");
    let check = document.createElement("input");
    check.setAttribute("type", "checkbox");
    check.checked = taskObj[task][0];
    check.setAttribute("onclick", "makeDone(event)");
    item.setAttribute("onclick", "expand(event)");
    item.appendChild(check);
    item.appendChild(document.createTextNode(task));
    taskcontainer.appendChild(item);
    if (check.checked) {
      showDone = true;
      countDone++;
    }
    item.style.display = check.checked ? "none" : "flex";
    if (showAll) item.style.display = "flex";
  });
  document.getElementById("donetaskbar").style.display = showDone
    ? "flex"
    : "none";
  document.getElementById("showDone").innerHTML = "Done (" + countDone + ")";
  let item = document.createElement("div");
  item.setAttribute("class", "taskflex-item taskitem");
  let btn = document.createElement("button");
  btn.setAttribute("onclick", "addTask(event)");
  btn.innerHTML = "Add";
  item.appendChild(btn);
  item.appendChild(document.createTextNode("New task"));
  taskcontainer.appendChild(item);
}

function goHome() {
  document.getElementById("contentList").style.display = "flex";
  document.getElementById("navbar").style.display = "flex";
  document.getElementById("tasknavbar").style.display = "none";
  document.getElementById("taskcontainer").style.display = "none";
  document.getElementById("donetaskbar").style.display = "none";
  contentList();
}

function addTask(event) {
  let addnew = event.target.parentNode;
  addnew.removeChild(addnew.lastChild);
  let text = document.createElement("input");
  text.setAttribute("type", "text");
  text.setAttribute("onkeyup", "appendTask(event)");
  addnew.appendChild(text);
  text.focus();
}

function appendTask(event) {
  if (event.keyCode !== 13) return;
  let newTask = event.target.value;
  if (newTask == "") return;
  toDoObj[currentList][currentListName][newTask] = [false, "", 0, ""];
  openList(undefined, currentList);
}

function makeDone(event) {
  let chkbox = event.target;
  let key = event.target.parentNode.lastChild.textContent;
  toDoObj[currentList][currentListName][key][0] = chkbox.checked;
  openList(undefined, currentList);
  event.stopPropagation();
}

function clearCompleted() {
  Object.entries(toDoObj[currentList][currentListName]).forEach(
    ([key, value]) => {
      if (value[0] == true) delete toDoObj[currentList][currentListName][key];
    }
  );
  openList(undefined, currentList);
}

function showDoneTask() {
  showAll = showAll ? false : true;
  openList(undefined, currentList);
}

function expand(event, rename = true, value) {
  currentTask = event.target.textContent;
  if (rename) {
    let addnew = event.target;
    addnew.removeChild(addnew.lastChild);
    let text = document.createElement("input");
    text.setAttribute("type", "text");
    addnew.appendChild(text);
    text.value = currentTask;
    text.focus();
  }
  detailitem.style.display = "flex";
  event.target.insertAdjacentElement("afterend", detailitem);
  document.querySelectorAll("#detailitem textarea")[0].value = value
    ? value[1]
    : toDoObj[currentList][currentListName][currentTask][1];
  document.querySelectorAll("#detailitem select")[0].value = value
    ? value[2]
    : toDoObj[currentList][currentListName][currentTask][2];
  document.querySelectorAll('#detailitem input[type="date"]')[0].value = value
    ? value[3]
    : toDoObj[currentList][currentListName][currentTask][3];
}

function savedetails(event) {
  toDoObj[currentList][currentListName][
    currentTask
  ][1] = document.querySelectorAll("#detailitem textarea")[0].value;
  toDoObj[currentList][currentListName][
    currentTask
  ][2] = document.querySelectorAll("#detailitem select")[0].value;
  toDoObj[currentList][currentListName][
    currentTask
  ][3] = document.querySelectorAll('#detailitem input[type="date"]')[0].value;
  let value = toDoObj[currentList][currentListName][currentTask];
  delete toDoObj[currentList][currentListName][currentTask];
  let renameText = document.querySelectorAll(".taskitem input[type=text]")[0];
  currentTask = renameText.value;
  toDoObj[currentList][currentListName][currentTask] = value;
  let details = document.getElementById("detailitem");
  details.style.display = "none";
  let taskbar = renameText.parentNode;
  taskbar.removeChild(renameText);
  taskbar.appendChild(document.createTextNode(currentTask));
}

function deleteTask() {
  delete toDoObj[currentList][currentListName][currentTask];
  openList(undefined, currentList);
}

function filter(basedon) {
  hideList();
  let filterObj = JSON.parse(JSON.stringify(toDoObj));
  let taskcontainer = document.getElementById("taskcontainer");
  taskcontainer.innerHTML = "";
  taskcontainer.style.display = "flex";
  let showDone = false;
  let countDone = 0;
  let todayDate = new Date().toJSON().slice(0, 10);
  for (let list in toDoObj) {
    let key = Object.keys(toDoObj[list])[0];
    for (let [task, detail] of Object.entries(toDoObj[list][key])) {
      if (basedon == "Today" && todayDate !== detail[3])
        delete filterObj[list][key][task];
      if (detail[3] == "") delete filterObj[list][key][task];
    }
    if (!Object.keys(filterObj[list][key]).length) delete filterObj[list];
  }
  for (let item of filterObj) {
    if (!item) continue;
    let taskObj = item[Object.keys(item)[0]];
    Object.keys(taskObj).forEach(task => {
      let item = document.createElement("div");
      item.setAttribute("class", "taskflex-item taskitem");
      let check = document.createElement("input");
      check.setAttribute("type", "checkbox");
      check.checked = taskObj[task][0];
      // check.setAttribute("onclick", "makeDone(event)");
      // item.setAttribute("onclick", "expand(event,false)");
      item.appendChild(check);
      item.appendChild(document.createTextNode(task));
      taskcontainer.appendChild(item);
      if (check.checked) {
        showDone = true;
        countDone++;
      }
      item.style.display = check.checked ? "none" : "flex";
      if (showAll) item.style.display = "flex";
    });
  }
  document.getElementById("donetaskbar").style.display = showDone
    ? "flex"
    : "none";
  document.getElementById("showDone").innerHTML = "Done (" + countDone + ")";
  console.log(toDoObj);
}
