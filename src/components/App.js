import '../css/App.css'

// Components
import Map from './Map'
import Footer from './Footer'
import Header from './Header'

const App = () => {
    return (
        
        <div className="App">
            <Header />
            <Map
                id="map"
                options = {{
                    center: { lat: 48.983967, lng: 2.618397 },
                    zoom: 10,
                }}
                onMapLoad = {map => {
                    // new window.google.maps.Marker({
                    //     position: { lat: 48.983967, lng: 2.618397 },
                    //     map: map,
                    //     title: 'Mitry-Mory'
                    // })
                    const forbiddenArea = new window.google.maps.Polygon({
                        paths: [
                            { lat: 48.896238, lng: 2.688436 },
                            { lat: 48.991721, lng: 2.601344 },
                            { lat: 49.018369, lng: 2.819379 },
                        ],
                        strokeColor: "#FF0000",
                        strokeOpacity: 0.8,
                        strokeWeight: 2,
                        fillColor: "#FF0000",
                        fillOpacity: 0.35,
                        map: map,
                        clickable: false
                    })
                    new window.google.maps.event.addListener(map, "click", (e) => {
                        const resultColor = window.google.maps.geometry.poly.containsLocation(
                            e.latLng,
                            forbiddenArea
                        )
                            ? "blue"
                            : "red"
                        const resultPath = window.google.maps.geometry.poly.containsLocation(
                            e.latLng,
                            forbiddenArea
                        )
                            ? // A triangle.
                            "m 0 -1 l 1 2 -2 0 z"
                            : window.google.maps.SymbolPath.CIRCLE
                        
                        if(window.google.maps.geometry.poly.containsLocation(e.latLng, forbiddenArea) === true) {
                            alert("Attention: Le drone se situe dans une zone interdite au vol")
                        }
                        new window.google.maps.Marker({
                            position: e.latLng,
                            map,
                            icon: {
                            path: resultPath,
                            fillColor: resultColor,
                            fillOpacity: 0.5,
                            strokeColor: "white",
                            strokeWeight: 0.5,
                            scale: 10,
                            },
                        })
                    })
                }}
            />
            <Footer />
        </div>
    )
}

export default App