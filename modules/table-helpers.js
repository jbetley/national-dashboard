// State and District Information Dashboard
// table processing functions
// author:   jbetley (https://github.com/jbetley)
// version:  0.9
// date:     04/20/25


// div fade out/in; duration is ms; default is fade out,
// set fadeOut to false to fade in
function fadeDiv(element, duration, fadeOut = true) {
   let startTime;
   const startOpacity = fadeOut ? 1 : 0;
   const endOpacity = fadeOut ? 0 : 1;

   function animate(currentTime) {
      if (!startTime) {
         startTime = currentTime;
      }

      const elapsed = currentTime - startTime;
      let progress = elapsed / duration;

      if (progress > 1) {
         progress = 1;
      }

      const opacity = startOpacity + (endOpacity - startOpacity) * progress;
      element.style.opacity = opacity;

      if (progress < 1) {
         requestAnimationFrame(animate);
      } else if (fadeOut) {
         element.style.display = 'none';
      }
   }
   if (!fadeOut) {
// TODO: TESTING FLEX
      element.style.display = 'flex';
      // element.style.display = 'block';
   }
   requestAnimationFrame(animate);
};

// creates blank table with label
function blankTable(id) {

   let tableDiv = document.getElementById(id);

   //fade out (ms)
   fadeDiv(tableDiv, 250);

   tableDiv.innerHTML = '';
   
   var parentWidth = document.getElementById('attendanceTable').getBoundingClientRect().width;

   var table = document.createElement('TABLE');
   table.border = '0';
   table.width = parentWidth;

   var tableBody = document.createElement('TBODY');
   table.appendChild(tableBody);

   var tr = document.createElement('TR');
   tableBody.appendChild(tr);

   var td = document.createElement('TD');

   td.appendChild(document.createTextNode('No Data to Display.'));

   td.height = '50';
   td.classList.add("nodata-msg")
   tr.appendChild(td);
   
   setTimeout(() => {
      tableDiv.appendChild(table);
      fadeDiv(tableDiv, 250, false);
      }, 300);
};


function stateInfoTable(data, id) {

   let stateInfoTableDiv = document.getElementById(id);
   
   // clear existing data
   stateInfoTableDiv.innerHTML = '';

   var table = document.createElement('TABLE');
   table.border = '0';

   var tableBody = document.createElement('TBODY');
   table.appendChild(tableBody);

   if (Object.entries(data).length > 0) {

      for (var i = 0; i < 6; i++) {
         let tr = document.createElement('TR');
         tableBody.appendChild(tr);

         for (var j = 0; j < 2; j++) {
            var td = document.createElement('TD');
            if (j == 0) {
               td.width = '200';
            } else {
               td.width = '50';
            }

            td.height = '12';

            if (i==0) {
               if (j==0) {
                  td.appendChild(document.createTextNode('# School Districts:'));
               } else {
                  td.appendChild(document.createTextNode(data['Total School Districts']));
               }
            }
            else if (i==1) {
               if (j==0) {
                  td.appendChild(document.createTextNode('# Traditional Schools:'));
               } else {
                  td.appendChild(document.createTextNode(data['Traditional Public Schools']));
               }
            }
            else if (i==2) {
               if (j==0) {
                  td.appendChild(document.createTextNode('# Charter Schools:'));
               }
               else {
                  td.appendChild(document.createTextNode(data['Charter Public Schools']));
               }
            }
            else if (i == 3) {
               if (j==0) {
                  td.appendChild(document.createTextNode('Voucher Program:'));
               }
               else {
                  td.appendChild(document.createTextNode(data['Voucher Program']));
               }
            }
            else if (i == 4) {
               if (j==0) {
                  td.appendChild(document.createTextNode('ESA Program:'));
               }
               else {
                  td.appendChild(document.createTextNode(data['ESA Program']));
               }
            }
            else {
               if (data['Written Notice'].length > 5) {
                  console.log("LONG")
                  console.log(data['Written Notice'])
               }
               if (j==0) {
                  td.appendChild(document.createTextNode('Written Notice Required:'));
               }
               else {
                  td.appendChild(document.createTextNode(data['Written Notice']));
               }
            }
            tr.appendChild(td);
         }
      }
   } else {

      // Empty Table
      // NOTE: approximating width of the tables by calculating the
      // width of the label and using 1/3 of the value here and 2/3 of
      // the value in the allocations table.
      const labelDiv = document.getElementById("state-label");
      const labelDivWidth = window.getComputedStyle(labelDiv).width;
      let tr = document.createElement('TR');

      tableBody.appendChild(tr);
      let td = document.createElement('TD');
      td.height = '120';
      td.width = parseFloat(labelDivWidth) * .33;
      td.style.textAlign = 'center';
      td.style.verticalAlign = 'middle';
      td.appendChild(document.createTextNode('No Data.'));
      tr.appendChild(td);
   }

   stateInfoTableDiv.appendChild(table);
};


function allocationsTable(object, id) {

   var allocationsTableDiv = document.getElementById(id);

   // clear existing data
   allocationsTableDiv.innerHTML = '';

   var table = document.createElement('TABLE');
   table.border = '0';

   var tableBody = document.createElement('TBODY');
   table.appendChild(tableBody);

   if (Object.entries(object).length > 0) {
      // get title year & strip from string
      let year = getYearString(object);
      let data = removeSubstringFromKeys(object, year);
      data = removeSubstringFromKeys(data, 'Allocation');

      const keys = Object.keys(data);

      for (var i = 0; i < 3; i++) {
         let tr = document.createElement('TR');
         tableBody.appendChild(tr);

         let cnt1 = 0;
         let cnt2 = 1;
         for (var j = 0; j < 4; j++) {
            let td = document.createElement('TD');
            if (j == 0) {
               td.width = '130';
            } else {
               td.width = '75';
            }
            td.height = '18';
            if (i==0) {
            if (j==0) {
               td.appendChild(document.createTextNode(''));
            }
            else {
               td.appendChild(document.createTextNode(keys[cnt1]));
               cnt1 = cnt1 + 2
            }

            } else if (i == 1) {
               if (j==0) {
                  td.appendChild(document.createTextNode('Allocations'));
               }
               else {
                  td.appendChild(document.createTextNode(data[keys[cnt1]]));
                  cnt1 = cnt1 + 2
               }

            } else if (i == 2) {
               if (j==0) {
                  td.appendChild(document.createTextNode('Set Aside (est.)'));
               }
               else {
                  td.appendChild(document.createTextNode(data[keys[cnt2]]));
                  cnt2 = cnt2 + 2
               }
            }
            tr.appendChild(td);
         }
      }
   } else {
      // Empty Table
      const labelDiv = document.getElementById("state-label");
      const labelDivWidth = window.getComputedStyle(labelDiv).width;
      let tr = document.createElement('TR');
      tableBody.appendChild(tr);
      let td = document.createElement('TD');
      td.height = '120';
      td.width = parseFloat(labelDivWidth) * .66;
      td.style.textAlign = 'center';
      td.style.verticalAlign = 'middle';
      td.appendChild(document.createTextNode('No Data.'));
      tr.appendChild(td);
   };

   allocationsTableDiv.appendChild(table);
};


function districtInfoTable(data, id) {

   let districtInfoTableDiv = document.getElementById(id);

   //fade out (ms)
   fadeDiv(districtInfoTableDiv, 250);

   districtInfoTableDiv.innerHTML = '';

   var table = document.createElement('TABLE');
   table.border = '0';

   var tableBody = document.createElement('TBODY');
   table.appendChild(tableBody);

   for (var row = 0; row < 7; row++) {
      var tr = document.createElement('TR');
      tableBody.appendChild(tr);

      for (var col = 0; col < 2; col++) {

         var td = document.createElement('TD');

         if (col == 0) {
            td.width = '125';
         }
         td.height = '12';

         if (row==0) {
            if (col==0) {
               td.appendChild(document.createTextNode('District:'));
            } else  {
               const nameID = data['District Name'] + " (ID: " + data['ID'] + ")";
               td.appendChild(document.createTextNode(nameID));
            }
         }
         else if (row==1) {
            if (col==0) {
               td.appendChild(document.createTextNode('Address:'));
            } else {
               td.appendChild(document.createTextNode(proper(data['Address'])
               ));
            }
         }
         else if (row==2) {
            if (col==0) {
               td.appendChild(document.createTextNode(''));
            }
            else {
               td.appendChild(document.createTextNode(
                  proper(data['City']) + ', ' + data['State'] + '  ' + data['ZIP']
               ));
            }
         }
         else if (row == 3) {
            if (col==0) {
               td.appendChild(document.createTextNode('Phone Number:'));

            } else {
               const prettyNumber = formatPhoneNumber(data['Phone Number']);
               td.appendChild(document.createTextNode(prettyNumber));
            }
         }
         else if (row == 4) {
            let type;
// TODO: FIX SCHOOL TYPE TO BE MORE GRANULAR
            if (data['Type'].includes('Charter')) {
               type = 'Charter School'
            } else {
               type = 'School District'
            }
            if (col==0) {
               td.appendChild(document.createTextNode('School Type:'));
            } else {
               td.appendChild(document.createTextNode(type));
            }
         }
         else if (row == 5) {
            let name, val;

            if (data['Type'].includes('Charter')) {
               name = ''
               val = ''
            } else {
               name = 'Traditional / Charter:'
               val = data['Number Public Schools'] + " / " + data['Number Charter Schools'];
            }
            if (col==0) {
               td.appendChild(document.createTextNode(name));
            } else {
               td.appendChild(document.createTextNode(val));
            }
         }
         else if (row == 6) {
            if (col==0) {
               td.appendChild(document.createTextNode("Total Enrollment:"));
            } else {
               td.appendChild(document.createTextNode(data["Enrollment"]));
            }
         }         
         tr.appendChild(td);
      }
   }
   
   // fade in
   // NOTE: timeout interval must be at least equal to the fade duration, if it
   // is less than the fade duration, the animation will trigger one too many
   // times causing the div to remain faded out
   setTimeout(() => {
      districtInfoTableDiv.appendChild(table);
      fadeDiv(districtInfoTableDiv, 250, false);
      }, 300);
};


function moneyFormatter(params) {
   if (params.value == undefined) {
      return '\u2014'
   }
   else {
      const val = parseFloat(params.value)
      var sansDec = val.toFixed(2);
      var formatted = sansDec.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      return '$ '+ `${formatted}`;
   }
};


function percentFormatter(params) {
   if (params.value == undefined) {
      return '\u2014'
   }
   else {
      const val = params.value * 100;
      var formatted = val.toFixed(2);
      return `${formatted}` + '%';
   }
};


function blankFormatter(params) {
   if (params.value == undefined) {
      return '\u2014'
   }
   else {
      return params.value;
   }
};
