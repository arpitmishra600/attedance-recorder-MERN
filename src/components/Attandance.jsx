import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  styled,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Radio,
  FormControlLabel,
  Box,
} from '@mui/material';
import Calender from './Calender';
import CloseIcon from '@mui/icons-material/Close';
import dayjs from 'dayjs';
import useContextHook from './context/contextHook';
import axios from 'axios';
import toast from 'react-hot-toast';
import { CalendarIcon } from '@mui/x-date-pickers';
import { pink, red } from '@mui/material/colors';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';

const TableCellHeader = styled(TableCell)({
  fontWeight: 'bold',
});


const AttendanceForm = () => {
  const [attendanceData, setAttendanceData] = useState([
    { id: 1, name: 'John Doe', present: false, absent: false },
    { id: 2, name: 'Jane Smith', present: false, absent: false },
    // Add more students as needed
  ]);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const {selectedDate,user,setBackdrop}=useContextHook()
  const navigate=useNavigate()

  const handleAttendanceChange = (id, type) => {
    const updatedAttendanceData = attendanceData.map((student) =>
      student.id === id
        ? { ...student, [type]: !student[type], [type === 'present' ? 'absent' : 'present']: false }
        : student
    );
    setAttendanceData(updatedAttendanceData);
  };

  const handleSubmit = async() => {
    setBackdrop(true)
    let entries={}
    attendanceData.map((item)=>{
      entries={...entries,[item.id]:item.present?'p':'a'}
    })
    try {
      const {data}=await axios.put(`${process.env.REACT_APP_URL}/putAttendance`,{entries,date:selectedDate.format("YYYY-MM-DD")},config)
      if(data.msg){
        toast.success(data.msg)
      }
    } catch (err) {
      toast.error(err)
    }finally{
      setBackdrop(false)
    }
    console.log('Attendance submitted:', entries);
  };

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const isSubmitDisabled = () => {
    return attendanceData.some((student) => (!student.present && !student.absent));
  };

  const config={
    headers:{
      "Content-Type":"application/json",
      Authorization:`Bearer ${user.token}`
    }
  }
const fetchAttendance=async()=>{
  setBackdrop(true)
  try {
    const response=await axios.post(`${process.env.REACT_APP_URL}/fetchAttendance`,{date:selectedDate.format('YYYY-MM-DD')},config)
    console.log(response)
    let data=[]
    response.data.map((item)=>{
      data.push({id:item.student._id,name:item.student.name,present:item.isPresent==="p",absent:item.isPresent==="a"})
    })
    console.log(data)
    setAttendanceData(data)
  } catch (error) {
    toast.error(error)
  }finally{
    setBackdrop(false)
  }
}
  useEffect(()=>{
    setDrawerOpen(false)
    fetchAttendance()

  },[selectedDate])

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        {`Attendance Record : ${selectedDate.format('YYYY-MM-DD')}`}
      </Typography>
      <Box sx={{display:"flex",justifyContent:'space-between',margin:"20px 0px"}}>
      <Button onClick={toggleDrawer(true)} variant="contained" color="secondary" endIcon={<CalendarIcon/>} sx={{borderRadius:3,p:"6px 15px"}}>
       calender
      </Button>
      <Typography variant='h6'>
         User : {user.name} ,({user.designation})
      </Typography>
      </Box>
      <Drawer anchor="top" open={drawerOpen} onClose={toggleDrawer(false)}>
        <CloseIcon sx={{position:'absolute',right:4,top:2,cursor:'pointer'}} onClick={toggleDrawer(false)}/>
        <Box display={'flex'} justifyContent={'center'} >
          <Calender/>
        </Box>
      </Drawer>
      <TableContainer component={Paper}>
        <Table aria-label="attendance table">
          <TableHead>
            <TableRow>
              <TableCellHeader>Student Name</TableCellHeader>
              <TableCellHeader>Present</TableCellHeader>
              <TableCellHeader>Absent</TableCellHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {attendanceData.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.name}</TableCell>
                <TableCell>
                  <FormControlLabel
                    control={
                      <Radio
                      color='success'
                        checked={student.present}
                        onChange={() => handleAttendanceChange(student.id, 'present')}
                      />
                    }
                    label=""
                  />
                </TableCell>
                <TableCell>
                  <FormControlLabel
                    control={
                      <Radio
                        checked={student.absent}
                        onChange={() => handleAttendanceChange(student.id, 'absent')}
                        sx={{
                          color: red[800],
                          '&.Mui-checked': {
                            color: red[600],
                          },
                        }}
                      />
                    }
                    label=""
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Button
          variant="contained"
          onClick={handleSubmit}
          color='secondary'
          disabled={isSubmitDisabled()}
          sx={{borderRadius:3,p:"6px 15px",m:"0px 10px"}}
          endIcon={<FileUploadIcon/>}
        >
          Update
        </Button>
        <Button
          variant="outlined"
          onClick={()=>{
            localStorage.removeItem("user")
            navigate('/')
          }}
          color='secondary'
          sx={{borderRadius:3,p:"6px 15px",m:"0px 10px"}}
          endIcon={<LogoutIcon/>}
        >
          logout
        </Button>
      </div>
    </Container>
  );
};

export default AttendanceForm;
