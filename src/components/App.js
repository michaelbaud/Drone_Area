import '../css/App.css'

// Components
import Map from './Map'
import Footer from './Footer'
import Header from './Header'

const App = () => {

    return (
        <div className="App">
            <Header />
            <Map />
            <Footer />
        </div>
    )
}

export default App