import { ThemeProvider } from '@emotion/react';
import './App.css';
import LandingPage from './pages/Landing/Landing';
import theme from './theme/theme';
import Dashboard from './pages/Dashboard/Dashboard';
import Sidebar from './components/Sidebar';
import RequestForm from './components/RequestForm';
import { Navigate, Route, Routes } from 'react-router-dom';
import PasswordChangeForm from './pages/PasswordChange/PasswordChangeForm';
import MyRewards from './pages/Rewards/MyRewards';
import MyTeamRewards from './pages/Rewards/MyTeamRewards';
import PendingApprovals from './pages/Rewards/PendingApprovals';
import EmployeeRequests from './pages/Rewards/EmployeeRequests';
import PrivateRoute from './pages/Service/PrivateRoute';
import { useEffect, useState } from 'react';
import axios from 'axios';
localStorage.setItem('BASE_URL','http://item-s099971:8080')



function App() {
  const empId=localStorage.getItem('empId');
  const BASE_URL=localStorage.getItem('BASE_URL');
  const token=localStorage.getItem('token');
  const [name,setName]=useState('');
  useEffect(()=>{
    const fetchEmpName=async()=>{
      try{
        const response=await axios.get(`${BASE_URL}/api/getname/${empId}`,{
          headers:{
            'Content-Type':'application/json',
            'Authorization':'Bearer '+token
          },
        });
        setName(response.data);
        console.log(response.data)
      }catch(error){
        console.error('Error fetching Name:',error);
      }
    };
    fetchEmpName();
  },[]);
  localStorage.setItem('empName',name)
  return (
    <>
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/Dashboard' element={<Dashboard/>}/>
        <Route path='myrewards' element={<MyRewards/>}/>
        <Route path='myteamrewards' element={<MyTeamRewards/>}/>
        <Route path='/passwordchange' element={<PasswordChangeForm/>}/>
        <Route path='/pendingapprovals' element={<PendingApprovals/>}/>
        <Route path='/employeerequests' element={<ManagerElement><EmployeeRequests/></ManagerElement>}/>
      </Routes>
      {/* <PasswordChangeForm/> */}
    </ThemeProvider>
    
    </>
  );
}

function ManagerElement({children}){
  const role=localStorage.getItem('role')
  if(role=='ROLE_MANAGER'){
    return<>{children}</>;
}else{
  alert('You are not manager! Logging you out...Please login again')
  return <Navigate to={'/'}/>;
}
}

export default App;
