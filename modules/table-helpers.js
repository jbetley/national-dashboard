// State and District Information Dashboard
// table processing functions
// author:   jbetley (https://github.com/jbetley)
// version:  0.9
// date:     03/27/25 



function stateInfoTable(data, id) {

  let stateInfoTableDiv = document.getElementById(id);

  // clear existing data
  stateInfoTableDiv.innerHTML = '';

  var table = document.createElement('TABLE');
  table.border = '0';

  var tableBody = document.createElement('TBODY');
  table.appendChild(tableBody);

  for (var i = 0; i < 5; i++) {
     var tr = document.createElement('TR');
     tableBody.appendChild(tr);

     for (var j = 0; j < 2; j++) {
        var td = document.createElement('TD');
        if (j == 0) {
           td.width = '200';
        } else {
           td.width = '50';
        }
        
        td.height = '15';
        
        if (i==0) {
           if (j==0) {
              td.appendChild(document.createTextNode("# of School Districts"));
           } else {
              td.appendChild(document.createTextNode(data["Total School Districts"]));
           }
        }
        else if (i==1) {
           if (j==0) {
              td.appendChild(document.createTextNode("# of Traditional Public Schools"));
           } else {
              td.appendChild(document.createTextNode(data["Traditional Public Schools"]));
           }
        }
        else if (i==2) {
           if (j==0) {
              td.appendChild(document.createTextNode("# of Charter Public Schools"));
           }
           else {
              td.appendChild(document.createTextNode(data["Charter Public Schools"]));
           }
        }
        else if (i == 3) {
           if (j==0) {
              td.appendChild(document.createTextNode("Voucher Program"));
           }
           else {
              td.appendChild(document.createTextNode(data["Voucher Program"]));
           }
        }
        else if (i == 4) {
           if (j==0) {
              td.appendChild(document.createTextNode("ESA Program"));
           }
           else {
              td.appendChild(document.createTextNode(data["ESA Program"]));
           }
        }
        tr.appendChild(td);
     }
  }
  stateInfoTableDiv.appendChild(table);
};



function allocationsTable(object, id) {

  // get title year & strip from string
  let year = getYearString(object);
  let data = removeSubstringFromKeys(object, year);
  data = removeSubstringFromKeys(data, "Allocation");

  const keys = Object.keys(data);

  var allocationsTableDiv = document.getElementById(id);
  
  // clear existing data
  allocationsTableDiv.innerHTML = '';

  var table = document.createElement('TABLE');
  table.border = '0';

  var tableBody = document.createElement('TBODY');
  table.appendChild(tableBody);

  for (var i = 0; i < 3; i++) {
     var tr = document.createElement('TR');
     tableBody.appendChild(tr);

     let cnt1 = 0;
     let cnt2 = 1;
     for (var j = 0; j < 4; j++) {
        var td = document.createElement('TD');
        if (j == 0) {
           td.width = '125';
        } else {
           td.width = '75';
        }
        td.height = "27.7";
        if (i==0) {
           if (j==0) {
              td.appendChild(document.createTextNode("Federal Allocations"));
           }
           else {
              td.appendChild(document.createTextNode(keys[cnt1]));
              cnt1 = cnt1 + 2
           }

        } else if (i == 1) {
           if (j==0) {
              td.appendChild(document.createTextNode(year));
           }
           else {
              td.appendChild(document.createTextNode(data[keys[cnt1]]));
              cnt1 = cnt1 + 2
           }

        } else if (i == 2) {
           if (j==0) {
              td.appendChild(document.createTextNode("Set Aside (est.)"));
           }
           else {
              td.appendChild(document.createTextNode(data[keys[cnt2]]));
              cnt2 = cnt2 + 2
           }
        }
        tr.appendChild(td);
     }
  }
  allocationsTableDiv.appendChild(table);
};

function districtInfoTable(data, id) {

  let districtInfoTableDiv = document.getElementById(id);

  districtInfoTableDiv.innerHTML = '';

  var table = document.createElement('TABLE');
  table.border = '0';

  var tableBody = document.createElement('TBODY');
  table.appendChild(tableBody);

  for (var row = 0; row < 5; row++) {
     var tr = document.createElement('TR');
     tableBody.appendChild(tr);

     for (var col = 0; col < 5; col++) {

        var td = document.createElement('TD');
        
        if (col == 0) {
           td.width = '200';
        } else if (col == 1) {
           td.width = '175';
        } else if (col == 2) {
           td.width = '10'
        } else if (col == 3) {
           td.width = '150'
        } else {
           td.width = '175'
        }
        
        td.height = "10";

        if (row==0) {
           if (col==0) {
              td.appendChild(document.createTextNode("Address"));
           } else if (col==1) {
              td.appendChild(document.createTextNode(data["Address"]));
           }
           else if (col==2) {
              td.appendChild(document.createTextNode(""));
           }
           else if (col==3) {
              td.appendChild(document.createTextNode("NCES District Name"));
           }
           else {
              td.appendChild(document.createTextNode(data["NCES District Name"]));
           }
        }
        else if (row==1) {
           if (col==0) {
              td.appendChild(document.createTextNode(""));
           } else if (col==1) {
              td.appendChild(document.createTextNode(
                 data["City"] + ", " + data["State"] + "  " + data["ZIP"]
              ));
           }  else if (col==2) {
              td.appendChild(document.createTextNode(""));
           }
           else if (col==3) {
              td.appendChild(document.createTextNode("NCES District ID"));
           }
           else {
              td.appendChild(document.createTextNode(data["NCES ID"]));
           }
        }
        else if (row==2) {
           if (col==0) {
              td.appendChild(document.createTextNode("Phone Number"));
           }
           else if (col==1) {
              td.appendChild(document.createTextNode(data["Phone Number"]));
           } else if (col==2) {
              td.appendChild(document.createTextNode(""));
           } else if (col==3) {
              td.appendChild(document.createTextNode("State District Name"));
           }
           else {
              td.appendChild(document.createTextNode(data["State District Name"]));
           }
        }
        else if (row == 3) {
           if (col==0) {
              td.appendChild(document.createTextNode("# of Traditional Public Schools"));
           } else if (col==1) {
              td.appendChild(document.createTextNode(data["Number Public Schools"]));
           }  else if (col==2) {
              td.appendChild(document.createTextNode(""));
           }
           else if (col==3) {
              td.appendChild(document.createTextNode("State District ID"));
           }
           else {
              td.appendChild(document.createTextNode(data["State District ID"]));
           }
        }
        else if (row == 4) {
           if (col==0) {
              td.appendChild(document.createTextNode("# of Traditional Charter Schools"));
           } else if (col==1) {
              td.appendChild(document.createTextNode(data["Number Charter Schools"]));
           }  
           else {
              td.appendChild(document.createTextNode(""));
           }
        }
        tr.appendChild(td);
     }
  }
  districtInfoTableDiv.appendChild(table);
};


// format value as percentage (info page)
function moneyFormatter(params) {
  if (params.value == undefined) {
    return "\u2014"
  }
  else {
    var sansDec = params.value.toFixed(2);
    var formatted = sansDec.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return "$ "+ `${formatted}`;
  }
};

function blankFormatter(params) {
  if (params.value == undefined) {
    return "\u2014"
  }
  else {
    return params.value;
  }
};


// Creats Ag-Grid Table
// function createStateTable(data, tableID) {
//   let keys = Object.keys(data.reduce(function(result, obj) {
//      return Object.assign(result, obj);
//   }, {}));

//   keys = keys.filter(item => item != "State District Name");
//   keys.unshift("State District Name")

//   let columns = keys.map(field => ({field}));

//   columns.forEach(function(e) {

//      if (e.field == "State District Name") {
//         e.valueFormatter = "";
//         e.resizable = false;
//         e.autoHeight = true;
//         e.wrapText = true;
//         e.minWidth = 200;
//         e.maxWidth = 200;
//         e.cellClass = "ag-left-aligned-cell";
//         e.headerClass = "text-center";
//       } else if (e.field == "Allocation Year") {
//         e.valueFormatter = blankFormatter;
//         e.flex = 1;
//         e.resizable = false;
//         e.cellClass = "ag-center-aligned-cell";
//         e.headerClass = "text-center";
//      } else if (e.field == "Title I Allocation") {
//         e.valueFormatter = moneyFormatter;
//         e.flex = 1;
//         e.resizable = false;
//         e.cellClass = "ag-center-aligned-cell";
//         e.headerClass = "text-center";
//      }
//      else {
//         e.flex = 1;
//         e.resizable = false;
//         e.cellClass = "ag-center-aligned-cell";
//         e.headerClass = "text-center";
//      }
//   });

//   let options = {
//      columnDefs: columns,
//      onRowClicked: function (e) {
//       const school = e.data["State District Name"];
//       document.getElementById('store').value = school;
//       console.log(document.getElementById('store').value)
//       getDistrictData(school);
//       },
//      rowData: data,
//      gridId: tableID,
//      tooltipShowDelay: 0,
//      enableBrowserTooltips: false
//   };
//   return options
// };
