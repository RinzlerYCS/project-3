let myMap = L.map("map").setView([34.05, -118.243683], 6);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);




function markerSize(AcresBurned) {
    return Math.sqrt(AcresBurned)*0.25;
    //AcresBurned * 0.0005; 
}


d3.csv("California_Fire_Incidents.csv").then(function(data) {
    data.forEach(function(d) {
        let selectedYear;
        let lat = parseFloat(d.Latitude);  
        let lon = parseFloat(d.Longitude);
        
        document.getElementById("yearSelect").addEventListener("change", function() {
            selectedYear = this.value; 

           if (d.ArchiveYear == selectedYear){
           L.circleMarker([lat, lon],
        {radius: markerSize(d.AcresBurned),
            color: "#d61c1c"
        })
          .bindPopup(`<strong>Acres Burned:</strong> ${d.AcresBurned}<br>
                        <strong>Name: </strong> ${d.Name}<br>
                        <strong>Year: </strong> ${d.ArchiveYear}`)
          .openPopup().addTo(myMap); 
        } 
        });
        
    });
    circle.remove();
    marker.remove();
});





