import './index.css'
const SucessMsg = (props) => {
    return (
        <>
            <div className="popup w3-animate-top">
                <span class="popuptext" id="myPopup">{props.message}</span>
            </div>
        </>
    )
}

export default SucessMsg;