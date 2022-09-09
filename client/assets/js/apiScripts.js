const { table } = require("console");
const { json } = require("stream/consumers");

async function pointerOff() {
    {
        console.log('onload on');
        $(".tableWrapper").css("pointer-events", "none");
    };
};

async function dateQuery() {
    $('#header').toggleClass('header-hidden');
    $("tr").remove(); 
    $('#loadPercent').html(0);
    $('#loadWrapper').css('display', 'block');

    var apiKey = "ecd4AJ03QdHqQRDmDYhviTZL3FrndmA4Blmg6E5L"
    var date1 = document.getElementById("date1").value;
    var date2 = document.getElementById("date2").value;

    console.log(Date(date1)); 
    console.log(Date(date2));

    if (date1 != "" && date2 != "") {
        $('.subtitle').html(date1 + ' to ' + date2); 
    }
    if (date1 != "" && date2 == ""){
        $('.subtitle').html('7 Days From ' + date1); 
    }
    if (date1 == date2) {
        $('.subtitle').html('Next 7 Days');
    };
    
    var apiCall = 'https://api.nasa.gov/neo/rest/v1/feed?start_date='+date1+'&end_date='+date2+'&api_key='+apiKey;
    
    const result = await fetch(apiCall);
    const a = await result.json(); 

    if (result.status != 200) {
        alert("Error " + result.status + "\nInvalid Date Range");
        $('.subtitle').html('Date Range too Large: Max 7 days');
    }
    var k = Object.keys(a.near_earth_objects);
    
    //console.log(k);
    //console.log('num days:', k.length);

    function addAllColumnHeaders() {
        var columnSet = ["Date", "Name", "Reference ID", "Min Diameter (m)", "Max Diameter (m)", "Potentially Hazardous", "Orbits", "Close Approach Date", "Velocity (km/s)", "Miss Distance (km)"];
        var headerTr$ = $('<tr/>');
    
        for (i=0; i<columnSet.length; i++) {
            headerTr$.append($('<th/>').html(columnSet[i]));
        }
    
        $("#excelDataTable").append(headerTr$);
    
        return columnSet;
    };

    function buildHtmlTable() {
        var columns = addAllColumnHeaders();
            
        let objCount = 0
        //For each day (number of days)
        for (i=0;i<k.length;i++) {
            numObj = a.near_earth_objects[k[i]].length;
            numDays = k.length;
            let date = k[i];
    
            //For each object per day
            for (o=0; o<numObj; o++) {
                objCount += 1;
                var row$ = $('<tr/>');
                let name = a.near_earth_objects[k[i]][o].name;
                let refId = a.near_earth_objects[k[i]][o].neo_reference_id;
                let minDia = a.near_earth_objects[k[i]][o].estimated_diameter.meters.estimated_diameter_min;
                let maxDia = a.near_earth_objects[k[i]][o].estimated_diameter.meters.estimated_diameter_max;
                let hazardous = a.near_earth_objects[k[i]][o].is_potentially_hazardous_asteroid.toString().charAt(0).toUpperCase();
                let orbits = a.near_earth_objects[k[i]][o].close_approach_data[0].orbiting_body;
                let approachDate = a.near_earth_objects[k[i]][o].close_approach_data[0].close_approach_date;
                let velocity = a.near_earth_objects[k[i]][o].close_approach_data[0].relative_velocity.kilometers_per_second;
                let missDistance = a.near_earth_objects[k[i]][o].close_approach_data[0].miss_distance.kilometers;
    
                let dataFrame = [name, refId, minDia, maxDia, hazardous, orbits, approachDate, velocity, missDistance];
            
                row$.append($('<td/>').html(date));
                
                dataFrame.forEach(function(obs, i) {
                    if (obs == null) {
                        cellValue = "";
                    }
                    else {
                        cellValue = obs;
                    };
                    row$.append($('<td/>').html(cellValue));
                    let loadPercent = ((objCount/numObj * 100)/numDays);
                    //console.log(loadPercent);
                    $("#loadPercent").html(Math.round(loadPercent));
                });

                $("#excelDataTable").append(row$);
            };
    
        };
        $("#loadPercent").html(100); 

        setTimeout( function() {
            $('#loadWrapper').css('display', 'none');
        }, 5000);
        
    };

    buildHtmlTable();
}; 

async function download_table_as_csv(table_id, separator = ',') {
    console.log('#' + table_id)
    // Select rows from table_id
    
    var rows = document.querySelectorAll('table#' + table_id + ' tr');
    //console.log(rows)
    // Construct csv
    var csv = [];
    for (var i = 0; i < rows.length; i++) {
        var row = [], cols = rows[i].querySelectorAll('td, th');
        for (var j = 0; j < cols.length; j++) {
            // Clean innertext to remove multiple spaces and jumpline (break csv)
            var data = cols[j].innerText.replace(/(\r\n|\n|\r)/gm, '').replace(/(\s\s)/gm, ' ')
            // Escape double-quote with double-double-quote (see https://stackoverflow.com/questions/17808511/properly-escape-a-double-quote-in-csv)
            data = data.replace(/"/g, '""');
            // Push escaped string
            row.push('"' + data + '"');
        }
        csv.push(row.join(separator));
    }
    var csv_string = csv.join('\n');
    
    // Download it
    var filename = 'spaceRocks_' + 'data' + '.csv';
    var link = document.createElement('a');
    link.style.display = 'none';
    link.setAttribute('target', '_blank');
    link.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv_string));
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};