import Card from "react-bootstrap/Card";
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import { RingLoader } from "react-spinners";
import {useNavigate} from 'react-router-dom';
// import { reduce } from "json-server-auth";


export default function Dashboard() {
    const [users,setUsers] = useState([]);
    const [show, setShow] = useState(false);
    const [detail,setDetail] = useState();
    const [refresh,setRefresh] = useState(false);
    const [amount,setAmount] = useState();
    const [loading, setLoading] = useState(true);
    const [totle, setTotle] = useState(0)
    const [totalincome,setTotalincome] = useState(0)
    const [totalexpence,setTotalexpence] = useState(0)
    const [type,setType] = useState('');
    const [date,setDate] = useState();
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const navigate = useNavigate()
   
  const handleSubmit = () => {
    const user ={
        detail:detail,
        amount:amount,
        date:date,
        type:type,
    }
    fetch('http://localhost:5000/transition',{
        method: 'POST',
        body: JSON.stringify(user),
        headers: {'Content-Type': 'application/json'},

    })
    .then(res => res.json())
    .then((data) => {
        console.log(data)
        setDetail('')
        setAmount('')
        setType('')
        handleClose()
        getData()
        setRefresh(!refresh)
    })
  }

  const getData = () => {
    setLoading(true)
    fetch('http://localhost:5000/transition')
    .then((response)=>response.json())
    .then((data)=>{
        setUsers(data)
        setLoading(false)
        // const value = data.reduce((previousValue, currentValue)=> 
        //    previousValue + parseInt(currentValue.amount)
        // , 0)
        let dataValueExpance = 0
        let dataValue = 0
        const expCharacters = data.filter(filter => {
        if(filter.type === 'expence'){
          dataValueExpance = dataValueExpance + parseInt(filter.amount)
        }
        })
        const tngCharacters = data.filter(filter => {
          if(filter.type === 'income'){
          dataValue = dataValue + parseInt(filter.amount)
          }
          })
          setTotalexpence(dataValueExpance)
        setTotalincome(dataValue)
        setTotle(dataValue - dataValueExpance)
    })
    
  }
  const LogoutSubmit = () => {
    localStorage.clear()
    navigate('/login')
  }

  useEffect(()=>{
    getData()
    var curr = new Date();
    curr.setDate(curr.getDate());
    setDate(curr.toISOString().substring(0,10));
  },[refresh])
  return (
    
     <>
      <Button  variant="primary" onClick={handleShow}>
        Add
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Income Expence Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Detail</Form.Label>
              <Form.Control
                type="detail"
                placeholder="Enter Detail"
                value={detail}
                onChange={(e)=>setDetail(e.target.value)}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="amount"
                placeholder="Enter Amount"
                value={amount}
                onChange={(e)=>setAmount(e.target.value)}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                placeholder="Enter Date"
                name="date"
                value={date}
                readOnly='true'
                // onChange={(e)=>setDate(e.target.value)}
                disabled
                autoFocus
              />
            </Form.Group>
            <Form.Select value={type} onChange={(e)=>setType(e.target.value)} aria-label="Default select example">
      <option name="type"  >Open this select menu</option>
      <option name='income' value= "income" >Income</option>
      <option name='expence' value= "expence" >Expence</option>
    </Form.Select>
          
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>handleSubmit(users.id)}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
      
      <div>
      <Button variant="primary" onClick={()=>LogoutSubmit()}>
            Logout
          </Button>
      </div>
  
    
    <div style={{display:"flex", gap:"300px",padding:"20px"}} >
       <div> 
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>Total Income</Card.Title>
          <Card.Text>
          {totalincome}
          </Card.Text>
        </Card.Body>
      </Card>
      </div>
      <div>
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>Total Amount</Card.Title>
          <Card.Text>
    {totle}
          </Card.Text>
        </Card.Body>
      </Card>
      </div>
      <div>
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>Total Expence</Card.Title>
          <Card.Text>
           {totalexpence}
          </Card.Text>
        </Card.Body>
      </Card>
     
      </div>
    </div>
    <div style={{justifyContent:"center", alignItems:"center"}}>
      <Table striped bordered hover variant="dark"justifyContent="center" alignItems="center">
        <thead>
          <tr>
            <th>#</th>
            <th>detail</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Type</th>
          </tr>
        </thead>
        <RingLoader color="#d65836" loading={loading} size={50} />   
        <tbody>
        {users &&
        users.map((user,index)=>{
          return(  <tr key={index}>
                <td>{user?.id}</td>
                <td>{user?.detail}</td>
                <td>{user?.amount}</td>
                <td>{user?.date}</td>
                <td>{user?.type}</td>
                </tr>
        )})}
      </tbody>
      </Table>
      </div>
    </>

    
  );
}
