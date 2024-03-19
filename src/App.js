
import Attandance from './components/Attandance';
import { Route, Routes } from 'react-router-dom';
import Signin from './components/Signin';
import {Toaster} from 'react-hot-toast'
import { Backdrop, CircularProgress } from '@mui/material';
import useContextHook from './components/context/contextHook';
import Student from './components/Student';
import Admin from './components/Admin';
import Page404 from './components/Page404';


function App() {
  const {backdrop}=useContextHook()
  return (
    <>
      <Routes>
          <Route path='/' element={<Signin/>}/>
          <Route path='/attendance' element={<Attandance/>}/>
          <Route path='/student' element={<Student/>}/>
          <Route path='/admin' element={<Admin/>}/>
          <Route path='*' element={<Page404/>}></Route>
      </Routes>
      <Toaster
  position="top-center"
  reverseOrder={false}
/>
<Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={backdrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  
  );
}

export default App;
