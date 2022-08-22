import '../Styles/Input.scss';
import { useState, useContext } from "react"
import { ConnectValueContext } from "../Context/ConnectValueContext"
import { HostValueContext } from "../Context/HostValueContext"

interface InputProps {
    id: string;
    placeholder?: string;
    width?: string;
    height?: string;
    color?: string;
    font_color?: string;
    render_side?: "left" | "right";
    type?: "text" | "password";
    children?: React.ReactElement<any>;
}

const Input = (props: InputProps) => {

    let { connectValueInstance } = useContext(ConnectValueContext)
    let { hostValueInstance } = useContext(HostValueContext)
    const [Input, setInput] = useState("")

    // if (props.type === "password") {
    //     value = Input.split('').map(() => {return "*"}).join("")
    // } else if(props.type === "id:password") {
    //     try{
    //         value = Input.split(':')[0]
    //         value += ":" + Input.split(':')[1].split('').map(() => {return "*"}).join("")

    if(props.id === "id_input"){
        connectValueInstance.changeIdPasswd(Input.split(':')[0], Input.split(':')[1])
        // console.log(connectValueInstance.getValues())
    } else {
        if(props.id === "host_input"){
            hostValueInstance.changePasswd(Input)
            // console.log(hostValueInstance.getValues())
        }
    }
    //     } catch {}
    // } else {
    //     value = Input
    // }
    

    return (
        <div className='input-container'>
            {props.render_side === "left" ? props.children : null}
            <input value={Input} onChange={e => {setInput(e.target.value)}} type={props.type} style={{width: props.width, height: props.height, backgroundColor: props.color, color: props.font_color}} id={props.id} placeholder={props.placeholder}/>
            {props.render_side === "right" ? props.children : null}
        </div>
    );
}

export { Input };