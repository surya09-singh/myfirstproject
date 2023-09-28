import { useState } from "react";
import {Form, Button} from "react-bootstrap";
// import{useNavigate} from "react-router-dom";

function Register(){
    const[name,setName] = useState('');
    const[email,setEmail] = useState('');
    const[password,setPassword] = useState('');

    // const navigate = useNavigate()

    const submit = e =>{
        e.preventDefault()
        const user = {
            name : name,
            email : email,
            password : password,
        }
        fetch(" http://localhost:5000/register",{
            method: 'POST',
            body: JSON.stringify(user),
            headers: {'Content-Type': 'application/json'},
        })
        .then(res => res.json())
        .then(response =>{
            console.log(response)
            localStorage.setItem('token',response.accessToken)

        })
    }

    return(
        <Form onSubmit={submit}>
            <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="name" placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)} />
        </Form.Group>
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
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    )
}
export default Register;