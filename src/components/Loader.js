import { FaSpinner } from 'react-icons/fa'

const Loader = () => {
    return (
        <div className="loaderContainer">
            <div className="faSpinner--container">
                <FaSpinner className="faSpinner" />
            </div>
        </div>
    )
}

export default Loader