let map;
let autocomplete;

function initMap() {
    
//Search bar autocomplete
    autocomplete = new google.maps.places.Autocomplete(document.getElementById('autocomplete'), 
    {
        type: ['establishment'],
        componentRestrictions: { country: "pr" },
        fields: ['place_id', 'geometry', 'name', 'lat', 'lng' ]
    });

    autocomplete.addListener('place_changed', onPlaceChanged);

//fetch the Geocode API when pressed enter
    async function onPlaceChanged() {
        try {
            const place = autocomplete.getPlace().name;
            const myApi = 'AIzaSyB9o3ZxWb5Db3JeclnPRjqy2ElVZjr7VXU';
            const adress = place.replaceAll(' ', '+');
            // console.log(adress)
            const url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + adress + '&key=' + myApi;
            // console.log(url);
            const response = await fetch(url);

            //if the fetch is successful:
            if(response.ok) {
                const jsonResponse = await response.json();
                const center = jsonResponse.results[0].geometry.location;
                let options = {
                    center: center,
                    zoom: 18
                }
            //create a new map with the answer from the autocomplete search bar
                map = new google.maps.Map(document.getElementById("map"), options);
            //add a marker in the location and add this pin to the collection of pins
                addMarker(center, place, 'img/pointer.png');
                mapPins.push({center: center, name: place, icon: 'img/pointer.png'})
            //add all the other markers that are by default in the map
                allPins();
            //continue to allow the computer to add marker with a click
                google.maps.event.addListener(map, 'click', (event) => { 
                    addMarker(event.latLng, 'Custom Pin')})
            }
        }
        
        finally { Error('Request Failed') }
    }

    //Map Options
    let options = {
        center: { lat: 18.465540, lng: -66.105736 },
        zoom: 8.4  
    }

    //New Map
    map = new google.maps.Map(document.getElementById("map"), options);

    //put markers with clicks
    google.maps.event.addListener(map, 'click', (event) => { 
        const center = event.latLng;
        // console.log(center);
        addMarker(center, 'Custom Pin')},
        //mapPins.push({name: 'Custom Pin', center: {lat: Object.lat, lng: Object.lng} })
        )
    
    //Add Marker
    function addMarker(location, name, imageIcon){
        if(imageIcon === undefined || typeof imageIcon !== 'string') {
            imageIcon = 'img/default.pin.png'
        }
        const marker = new google.maps.Marker({
            position: location,
            map:map,
            icon: imageIcon    
        });
        const detailWindow = new google.maps.InfoWindow({
            content: `<h2>${name}</h2>`
        });

        marker.addListener("mouseover", () => {
            detailWindow.open(map, marker);
        })
        marker.addListener("mouseout", () => {
            detailWindow.close(map, marker);
        })
    }

 allPins();


 //function to place every pin in the object array to the map
 function allPins() {
     for(i = 0; i < mapPins.length; i++) {
         addMarker(mapPins[i].center, mapPins[i].name, mapPins[i].icon)
     }
 }
}

const mapPins = [
    {
        name: 'Oktoberfest',
        center: {lat: 18.49975638281283, lng: -67.0985275941868}, 
        icon: 'img/ok.png'
    },
    {
        name: 'Airbuns',
        center: {lat: 18.423202050037148, lng: -66.06178343300095}, 
        icon: 'img/ok.png'
    },
    {
        name: 'Macaroni Grill',
        center: {lat: 18.239764664777816, lng: -66.04086627116415}, 
    },
    {
        name: 'Khalan Thai',
        center: {lat: 18.504504408791238, lng: -67.11517145582074},
    },
    {
        name: "Pirilo's",
        center: {lat: 18.465709393604595, lng: -66.1140803423283},
        icon: 'img/ok.png'
    },
    {
        name: "Artesano's Pizza",
        center: {lat: 18.23940102647198, lng: -66.0504785}
    },
    {
        name: 'El Mesón Caguas',
        center: {lat:18.23745722840855, lng: -66.04130662698486}
    },
    {
        name: 'Panda Express',
        center: {lat:18.23745722840855, lng: -66.04130662698486}
    },
    {
        name: 'PF Chang',
        center: {lat: 18.24327466308062, lng: -66.04145496957531}, 
    },
    {
        name: "Planet Hollywood", 
        center: {lat: 28.369911384942657, lng: -81.51872538465658}, 
        icon: 'img/king.png'
    }
];