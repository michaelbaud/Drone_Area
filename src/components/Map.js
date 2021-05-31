import { useEffect, useState } from 'react'
import L from "leaflet"
import { isPointInPolygon } from 'geolib'
import swal from 'sweetalert'

// Restricted areas

import geojsonAreas from'../geoJson/restrictedAreas.geojson'

const style = {
    width: "100%",
    height: "300px",
    maxWidth: "1000px",
    margin: "50px auto",
    borderRadius: "10px",
}

let map = null
let markerLayer = null
let rayonLayer = null

const Map = () => {

    const [position, setPosition] = useState([48.983967, 2.618397])
    const [rayon] = useState(10)
    const [zoom] = useState(10)
    const [firstRendering, setFirstRendering] = useState(true)

    const renderMap = () => map = new L.map('map')

    const setLayer = () => L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' }).addTo(map)

    const addMarker = pos => {
        markerLayer = new L.marker(pos)
        map.addLayer(markerLayer)
    }

    const addRayon = pos => {
        rayonLayer = L.circle(pos, { radius: rayon })
        map.addLayer(rayonLayer)
    }

    const renderRestrictedAreas = geojsonFeature => {
        let polygonLayer = L.geoJSON(geojsonFeature, { color: 'red', weight: '2'})
        map.addLayer(polygonLayer)
    }

    const isInsideRestrictedArea = e => {
        setPosition([e.latlng.lat, e.latlng.lng])
        let bool = false
        let targetedArea = null
        for(let i = 0; i < geojsonAreas.features.length; i++) {
            if(isPointInPolygon([e.latlng.lng, e.latlng.lat], geojsonAreas.features[i].geometry.coordinates[0])) {
                bool = true
                targetedArea = geojsonAreas.features[i].properties.name
            }
        }
        bool && swal({
            title: "Attention",
            text: `Le drone se situe dans la zone interdite au vol: ${targetedArea}`,
            icon: "warning",
            dangerMode: true,
        })
        
    }
    
    useEffect(() => {

        if (firstRendering) {
            renderMap()
            setLayer()
            map.setView(position, zoom)
            renderRestrictedAreas(geojsonAreas)
            map.on('click', isInsideRestrictedArea)
            setFirstRendering(false)
            return
        } else {
            if (markerLayer !== null) {
                console.log('test')
                map.removeLayer(markerLayer)
                map.removeLayer(rayonLayer)
                map.setView(position, zoom)
                addMarker(position)
                addRayon(position)
            } else {
                console.log('test2')
                map.setView(position, zoom)
                addMarker(position)
                addRayon(position)
            }
            
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [position, rayon, zoom])

    return (
        <div className="mapBoxContainer">
            <div id="map" style={style} />
        </div>
    )
}

export default Map