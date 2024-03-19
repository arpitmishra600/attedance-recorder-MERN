import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Grid } from '@mui/material';
import axios from 'axios';
import useContextHook from './context/contextHook';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';

const Admin = () => {

  
  const navigate=useNavigate()
    const {user,setBackdrop}=useContextHook()
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [designation,setDesignation]=useState("")
  const [data, setData] = useState([
    { _id: 1, name: 'Item 1', email: 'item1@example.com', password: 'password1', designation: 'Designer' },
    { _id: 2, name: 'Item 2', email: 'item2@example.com', password: 'password2', designation: 'Developer' },
    { _id: 3, name: 'Item 3', email: 'item3@example.com', password: 'password3', designation: 'Manager' },
  ]);

  const config={
    headers:{
      "Content-Type":"application/json",
      Authorization:`Bearer ${user.token}`
    }
  }

  window.addEventListener('beforeunload',(e)=>{
    e.preventDefault()
    localStorage.removeItem("user")
            navigate('/')
    
  })

  const handleAdd = async() => {
    setBackdrop(true)
    try {
      const response=await axios.post(`${process.env.REACT_APP_URL}/adminAdder`,{name,email,password,designation},config)
      if(response.data.msg){
        toast.success(response.data.msg)
      }
    } catch (error) {
      toast.error(error)
    }finally{
      fetchAll()
      setName("")
      setEmail("")
      setPassword("")
      setDesignation("")
      setBackdrop(false)
    }
  };

  const handleLogout = () => {
    // Your logout logic goes here
    console.log("Logout clicked");
  };

  const handleRemove = async(id) => {
    console.log(id)
    setBackdrop(true)
    try {
      const response=await axios.post(`${process.env.REACT_APP_URL}/adminRemover`,{id},config)
      if(response.data.msg){
        toast.success(response.data.msg)
      }
    } catch (error) {
      toast.error(error)
    }finally{
      setBackdrop(false)
      fetchAll()
    }

  };

  const fetchAll=async()=>{
    const response=await axios.get(`${process.env.REACT_APP_URL}/adminFetchAll`,config)
    console.log(response)
    setData(response.data)
    
  }

  useState(()=>{
    fetchAll()
  },[])
    
 

  return (
    <div>
      <TableContainer component={Paper} style={{ maxHeight: '50vh', overflowY: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Designation</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row._id}>
                <TableCell>{row._id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.designation}</TableCell>
                <TableCell>
                  <Button variant="contained" color="secondary" onClick={() => handleRemove(row._id)}>Remove</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container spacing={2} style={{ marginTop: '20px' }}>
        <Grid item xs={12} sm={6} md={3}>
          <TextField 
            label="Name" 
            variant="outlined" 
            name="name" 
            value={name} 
            onChange={(e)=>setName(e.target.value)} 
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField 
            label="Email" 
            variant="outlined" 
            name="email" 
            value={email} 
            onChange={(e)=>setEmail(e.target.value)} 
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField 
            label="Password" 
            variant="outlined" 
            name="password" 
            type="password" 
            value={password} 
            onChange={(e)=>setPassword(e.target.value)} 
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField 
            label="Designation" 
            variant="outlined" 
            name="designation" 
            value={designation} 
            onChange={(e)=>setDesignation(e.target.value)} 
            fullWidth
          />
        </Grid>
        <Grid item xs={12} style={{ textAlign: 'center' }}>
          <Button variant="contained" color="primary" onClick={handleAdd}>Add</Button>
        </Grid>
      </Grid>
      <div style={{ textAlign: 'center', marginTop: '10px' }}>
      <Button
          variant="outlined"
          onClick={()=>{
            localStorage.removeItem("user")
            navigate('/')
          }}
          color='secondary'
          endIcon={<LogoutIcon/>}
        >
          logout
        </Button>
      </div>
    </div>
  );
};

export default Admin;
