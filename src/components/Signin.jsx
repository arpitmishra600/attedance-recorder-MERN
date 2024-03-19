import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Chip } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import PersonIcon from '@mui/icons-material/Person';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useContextHook from './context/contextHook';



// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Signin() {

  const navigate=useNavigate()
  const [username,setUsername]=useState()
  const [password,setPassword]=useState()
  const {setBackdrop,setUser}=useContextHook()
  const [focus,setFocus]=useState()


  const handleSubmit = async(event) => {
    setBackdrop(true)
    event.preventDefault();

    const payload={
      name:username,
      password: password,
    }

    try{
      
      const response=await axios.post(`${process.env.REACT_APP_URL}/login`,payload)
      setBackdrop(false)
      if(response.data){
        localStorage.setItem('user',JSON.stringify(response.data))
        setUser(response.data)
        console.log(response.data)
        if (response.data.designation === 'teacher') {
          navigate('/attendance');
        } else if (response.data.designation === 'student') {
          navigate('/student');
        } else if (response.data.designation === 'admin') {
          navigate('/admin');
        }
      }
    }catch(erro){
      toast.error(erro.response.data.err)
    }finally{
      setBackdrop(false)
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Username"
              focused={focus}
              onChange={(e)=>setUsername(e.target.value) }
              value={username}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              id="password"
              value={password} focused={focus} onChange={(e)=>setPassword(e.target.value)}
            />

            <Box sx={{display:'flex',justifyContent:'space-evenly',alignItems:'center'}}>
                <Chip icon={<SchoolIcon />} label="Student" sx={{cursor:'pointer',width:'30%'}} onClick={()=>{setUsername("Amit Kumar");setPassword("12345");setFocus(true)}}/>
                <Chip icon={<PersonIcon />} label="Teacher" sx={{cursor:'pointer',width:'30%'}} onClick={()=>{setUsername("Nitin J");setPassword("1234567");setFocus(true)}}/>
                <Chip icon={<AdminPanelSettingsIcon />} label="Admin" sx={{cursor:'pointer',width:'30%'}} onClick={()=>{setUsername("ADMIN");setPassword("123");setFocus(true)}}/>
            </Box>
            

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link  variant="body2" onClick={()=>toast("comming soon",{icon:'🔜'})}>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link variant="body2" onClick={()=>toast("comming soon",{icon:'🔜'})}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}