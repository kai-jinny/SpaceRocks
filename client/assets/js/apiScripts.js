const { json } = require("stream/consumers");

async function dateQuery() {
    var date1 = document.getElementById('date1').value;
    var date2 = document.getElementById('date2').value;

    var apiKey = "ecd4AJ03QdHqQRDmDYhviTZL3FrndmA4Blmg6E5L"
    var date1 = document.getElementById("date1").value;
    var date2 = document.getElementById("date2").value;

    var apiCall = 'https://api.nasa.gov/neo/rest/v1/feed?start_date='+date1+'&end_date='+date2+'&api_key='+apiKey;
    console.log(apiCall);
    
    const all = fetch(apiCall)
    .then(response => response.json())
    .then(data => {
        return data;
    });

    const allData = async () => {
        const a = await all;
        console.log(a.element_count);
    };

   console.log('ok2', allData('near_earth_objects')[0]);
    /*
    var list = [
        {"near_earth_objects":"val_11", "col_2":"val_12", "col_3":"val_13"},
        {"col_1":"val_21", "col_2":"val_22", "col_3":"val_23"},
        {"col_1":"val_31", "col_2":"val_32", "col_3":"val_33"}
    ];
     
    el_up.innerHTML = "Click on the button to create the "
            + "table from the JSON data.<br><br>"
            + JSON.stringify(list[0]) + "<br>"
            + JSON.stringify(list[1]) + "<br>"
            + JSON.stringify(list[2]);  
     
    var cols = [];
        
    for (var i = 0; i < list.length; i++) {
        for (var k in list[i]) {
            if (cols.indexOf(k) === -1) {
                    
                // Push all keys to the array
                cols.push(k);
            }
        }
    }
        
    // Create a table element
    var table = document.createElement("table");
        
    // Create table row tr element of a table
    var tr = table.insertRow(-1);
        
    for (var i = 0; i < cols.length; i++) {
            
        // Create the table header th element
        var theader = document.createElement("th");
        theader.innerHTML = cols[i];
            
        // Append columnName to the table row
        tr.appendChild(theader);
    }
        
    // Adding the data to the table
    for (var i = 0; i < list.length; i++) {
            
        // Create a new row
        trow = table.insertRow(-1);
        for (var j = 0; j < cols.length; j++) {
            var cell = trow.insertCell(-1);
                
            // Inserting the cell at particular place
            cell.innerHTML = list[i][cols[j]];
        }
    }
        
    // Add the newly created table containing json data
    var el = document.getElementById("table");
    el.innerHTML = "";
    el.appendChild(table);
    */
};

async function ok() {
    const all = fetch("https://api.nasa.gov/neo/rest/v1/feed?start_date=2015-09-07&end_date=2015-09-08&api_key=ecd4AJ03QdHqQRDmDYhviTZL3FrndmA4Blmg6E5L")
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
  
  const allData = async () => {
    const a = await all;
    console.log(a);
  };
  
  allData();

};