import { useEffect } from "react";
import { useNavigate} from "react-router-dom";

function Protected(props){
    const {Component} = props;
    const navigate = useNavigate();
    useEffect(()=>{
        const login = localStorage.getItem('token')
        if(login == undefined || login == '' || login == null){
            navigate('/login')
        }
    });
    return(
        <div>
            <Component/>
        </div>
    )

}
export default  Protected