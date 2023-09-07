<script>
    import { onMount } from 'svelte';

    onMount(() => {
        const script = document.createElement('script');
        script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDRz-rQM7ME6UWuWjEYiPcCZI3ccMUdJHg';
        script.async = true;
        script.defer = true;

        script.onload = () => {
            function initMap() {
                const map = new google.maps.Map(document.getElementById("map"), {
                center: { lat: 21.94429398, lng: 90.02845764 },
                zoom: 16,
                });
            }
            initMap();
        };
        document.head.appendChild(script);
    });

    var districts=[]
    fetch(`https://moomarket-dlki.onrender.com/api/register/districts`, {
        method: 'GET'
    })
    .then(res => {
        if (!res.ok) {
        throw new Error('Network response status was vejal');
        }
        return res.json();
    })
    .then(data => {
        districts = [];
        for(let i = 0; i < data.length; i++){
            districts.push(data[i].name);
        }
        districts.sort()
        const parent = document.getElementById('district');
        for(let i = 0; i < districts.length; i++){
            let opt = document.createElement('option');
            opt.value = districts[i];
            opt.innerHTML = districts[i];
            parent.appendChild(opt);
        }
    })
    .catch(err => {
        console.log(err.Error);
    });

    function districtHandler(){
        var parent = document.getElementById('district');
        const value = parent.value;
        console.log(value);
        let thanas
        fetch(`https://moomarket-dlki.onrender.com/api/register/thanas`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                district:value
            })
        })
        .then(res => {
            if (!res.ok) {
            throw new Error('Network response status was vejal');
            }
            return res.json();
        })
        .then(data => {
            thanas = data;
            parent = document.getElementById('thana');
            while (parent.firstChild) {
                parent.removeChild(parent.firstChild);
            }
            for(let i = 0; i < thanas.length; i++){
                let opt = document.createElement('option');
                opt.value = thanas[i].name;
                opt.innerHTML = thanas[i].name;
                parent.appendChild(opt);
            }
        })
        .catch(err => {
            console.log(err.Error);
        });
    }

    function thanaHandler(){
        var parent = document.getElementById('thana');
        const value = parent.value;
        console.log(value);
        let thanas
        fetch(`https://moomarket-dlki.onrender.com/api/coordinates`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                thana:value
            })
        })
        .then(res => {
            if (!res.ok) {
            throw new Error('Network response status was vejal');
            }
            return res.json();
        })
        .then(data => {
            var coordinates = data;
            var ggwp = []
            console.log(coordinates);
            var minLng=1000.0;
            var maxLng=-1000.0;
            var minLat=1000.0;
            var maxLat=-1000.0;
            for(let i = 0; i < coordinates.length; i++){
                ggwp.push({lng:parseFloat(coordinates[i].lng), lat:parseFloat(coordinates[i].lat)})
                minLng = Math.min(minLng, parseFloat(coordinates[i].lng));
                maxLng = Math.max(maxLng, parseFloat(coordinates[i].lng));
                minLat = Math.min(minLat, parseFloat(coordinates[i].lat));
                maxLat = Math.max(maxLat, parseFloat(coordinates[i].lat));
            }

            const map = new google.maps.Map(document.getElementById("map"), {
                center: { lng: (maxLng+minLng)/2.0,lat:(maxLat+minLat)/2.0 },
                zoom: 10,
            });
            console.log(ggwp);
            var polygon = new google.maps.Polygon({
                paths: ggwp,
                strokeColor: "#FF0000",
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: "#FF0000",
                fillOpacity: 0.35,
            });
            polygon.setMap(map);
        })
        .catch(err => {
            console.log(err.Error);
        });
    }
</script>

<div id="map" style="width: 100%; height: 500px"></div>

<div class="container floating-div">
    <div class="col-auto">
        <label for="District" class="form-label">District</label>
        <select id="district" name="district" class="form-select" aria-label=".form-select" on:change={districtHandler}  required>
            <option value="">None</option>
        </select>
        </div>
        <div class="col-auto">
        <label for="Thana" class="form-label">Thana</label>
        <select id="thana" name="thana" class="form-select" aria-label=".form-select" on:change={thanaHandler}  required>
        </select>
    </div>
</div>

<style>
    .floating-div {
        position: absolute !important;
        z-index: 1 !important;
    }

    .container {
        position: relative !important;
    }
</style>