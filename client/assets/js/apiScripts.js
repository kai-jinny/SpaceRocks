const { table } = require("console");
const { json } = require("stream/consumers");

async function pointerOff() {
    {
        console.log('onload on');
        $(".tableWrapper").css("pointer-events", "none");
    };
};

async function dateQuery() {

    var apiKey = "ecd4AJ03QdHqQRDmDYhviTZL3FrndmA4Blmg6E5L"
    var date1 = document.getElementById("date1").value;
    var date2 = document.getElementById("date2").value;

    var apiCall = 'https://api.nasa.gov/neo/rest/v1/feed?start_date='+date1+'&end_date='+date2+'&api_key='+apiKey;
    //console.log(apiCall);
    
    const result = await fetch(apiCall);
    const a = await result.json();

    var k = Object.keys(a.near_earth_objects)
    console.log('num days:', k.length);

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
            
        //For each day (number of days)
        for (i=0;i<k.length;i++) {
            numObj = a.near_earth_objects[k[i]].length;
            let date = k[i];
    
            //For each object per day
            for (o=0; o<numObj; o++) {
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
                });

                $("#excelDataTable").append(row$);
            };
    
        };
    };

    buildHtmlTable();
}; 