
const CustomButton = (props) =>{
    <button
    onClick={props.onClick}
    className={props.className}
    >
           {props.children}
    </button>
}
export default CustomButton;