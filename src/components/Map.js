import { useEffect, useState } from 'react'

import Loader from './Loader'

const { REACT_APP_KEY } = process.env

const style = {
    width: "100%",
    height: "300px",
    maxWidth: "1000px",
    margin: "50px auto",
    borderRadius: "10px",
}

const Map = ({ id, options, onMapLoad }) => {

    const [isLoading, setIsLoading] = useState(true)

    const onScriptLoad = () => {
        const map = new window.google.maps.Map(document.getElementById(id), options)
        onMapLoad(map)
    }

    useEffect(() => {
        if (!window.google) {
            var s = document.createElement('script')
            s.type = 'text/javascript'
            s.src = `https://maps.google.com/maps/api/js?key=${REACT_APP_KEY}`
            var x = document.getElementsByTagName('script')[0]
            x.parentNode.insertBefore(s, x)
            s.addEventListener('load', () => {
                onScriptLoad()
            })
            setIsLoading(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="mapBoxContainer">
            {isLoading ? <Loader /> : null}
            <div style={style} id={id} />
        </div>
    )
}

export default Map