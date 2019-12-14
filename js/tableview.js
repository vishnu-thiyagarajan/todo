function tableCreate() {
    var noOfElements = 12
    var tbl = document.getElementsByTagName('table')[0];
    if (tbl) tbl.remove();
    var body = document.getElementsByTagName('body')[0];
    var elemInRow = parseInt(window.innerWidth / 200) - 1
    console.log(elemInRow)
    tbl = document.createElement('table')
    tbl.style.width = '100%';
    var tbdy = document.createElement('tbody');
    for (var i = 0; noOfElements > 0; i++) {
      var tr = document.createElement('tr');
      for (var j = 0; j < elemInRow; j++) {
        var td = document.createElement('td');
        var bt = document.createElement('button');
        bt.style.backgroundColor = " #ffffff";
          if (noOfElements){
            td.align = "center";
            td.style.border = '40px solid white';
            //   bt.style.backgroundColor = "#336699";
            //   bt.style.backgroundColor = "#b3cce6";
            bt.style.backgroundColor = "#6699cc";
            bt.innerHTML = 'no tasks';
            noOfElements -= 1
          }
          td.appendChild(bt)
          tr.appendChild(td)
      }
      tbdy.appendChild(tr);
    }
    tbl.appendChild(tbdy);
    body.appendChild(tbl)
  }
  
  tableCreate();