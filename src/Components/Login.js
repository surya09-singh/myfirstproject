import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useNavigate} from 'react-router-dom';

function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState()
    const navigate = useNavigate()
    
    const Submit = () => {
        const user= {
            email: email,
            password:password,
        }
        fetch("http://localhost:5000/signin",{
            method:"POST",
            body:JSON.stringify(user),
            headers:{'Content-Type':'application/json'}
        })
        .then(res => res.json())
        .then(response =>{
            console.log(response)
            if(response.accessToken){
            localStorage.setItem('token',response.accessToken)
            navigate('/dashboard')
            }else{
              setError("Login Failed")
              
            }
        })
        .catch(error => {
          console.error('Error checking login status:', error);
          setError("login")
        });
        
    }
    


return(
    <div>
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Email address</Form.Label>
      <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
      <Form.Text className="text-muted">
        We'll never share your email with anyone else.
      </Form.Text>
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
    </Form.Group>
    <Button variant="primary" type="submit" onClick={()=>Submit()}>
      Submit
    </Button>
  </div>
)
}
export default Login;
