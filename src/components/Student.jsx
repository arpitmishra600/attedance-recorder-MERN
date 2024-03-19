import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import useContextHook from './context/contextHook';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';


export default function Student() {

    const {user}=useContextHook()
    const navigate=useNavigate()
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
         Student Details
        </Typography>
        <Typography variant="h5" component="div">
          {user.name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {user.email}
        </Typography>
        <Typography variant="body2">
            This is a demo student page with demo data, all data present here is completely imagianry and relevance to any real life event is coincidental.
        </Typography>
      </CardContent>
      <Button
          variant="outlined"
          onClick={()=>{
            localStorage.removeItem("user")
            navigate('/')
          }}
          color='secondary'
          sx={{borderRadius:3,p:"6px 15px",m:"10px"}}
          endIcon={<LogoutIcon/>}
        >
          logout
        </Button>
    </Card>
  );
}