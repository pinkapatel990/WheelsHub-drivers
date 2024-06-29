import './style.css'
const Custominput = (props) => {
    return (
        <input
            type={props.type ? props.type : "text"}
            className={props.className?props.className :"input-control col-12"}
            placeholder={props.placeholder}
            onChange={props.onChange}
 
        />
    )
}
export default Custominput; 