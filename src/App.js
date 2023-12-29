
import './App.css';
import RequestForm from './components/RequestForm';

import Dashboard from './pages/Dashboard';
import Employee from './pages/Employee';
import BoxComponent from './components/BoxComponent';
import DataTable from './components/DataTable';
import Manager from './pages/Manager';
import PendingApprovals from './pages/PendingApprovals';
import MyRewards from './pages/MyRewards';
import ApproveTable from './components/ApproveTable';
import EmployeeRequests from './pages/EmployeeRequests';
// Import statements in your main entry file (e.g., App.js)
import { BrowserRouter as Router, Route, Switch, Routes, Navigate, useNavigate } from 'react-router-dom';
import Login from './pages/login';
import ProtectedRoute from './service/ProtectedRoute';
import ForbiddenPage from './pages/ForbiddenPage';
import AuthService from './service/AuthService';

const USER_TYPES={
  PUBLIC:'Public User',
  EMPLOYEE:'Employee',
  MANAGER:'Manager',
  HEAD:'Head'
}
const CURRENT_USER_TYPE=USER_TYPES.PUBLIC

function App() {
  
  return (
   <>
   <Routes>
    <Route path='/' element={<PublicElement><Login/></PublicElement>}/>
    <Route path='/employee' element={<UserElement><Employee/></UserElement>}>
      
    </Route>
    <Route path='/myrewards' element={<MyRewards/>}/>
    <Route path='/pendingapprovals' element={<PendingApprovals/>}/>
    <Route path='/manager' element={<ManagerElement><Manager/></ManagerElement>}/>
    <Route path='/employeerequests' element={<EmployeeRequests/>}/> 
    <Route path='*'element={<div>Page Not Found!</div>}/>
   </Routes>
   </>
  );
}

function PublicElement({children}){
  return <>{children}</>
}
function UserElement({children}){
  const userRole=localStorage.getItem('role')
  if(userRole==='employee'){
    return <>{children}</>
  }else{
    return <div><h1>You do not have access to this page!</h1></div>
  }
  
}

function ManagerElement({children}){
  const navigate=useNavigate()
  const handleLogout=()=>{
    AuthService.logout();
    navigate('/');
  }
  const userRole=localStorage.getItem('role')
  if(userRole==='manager'){
    return <>{children}</>
  }else{
   
    // return <><div>{}</div></>
    return <div><h1>You do not have access to this page!</h1></div>
  }
  
}

export default App;
