
import './App.css';
import Employee from './pages/Employee';
import Manager from './pages/Manager';
import PendingApprovals from './pages/PendingApprovals';
import MyRewards from './pages/MyRewards';
import EmployeeRequests from './pages/EmployeeRequests';
import { BrowserRouter as Router, Route, Switch, Routes, Navigate, useNavigate } from 'react-router-dom';
import Login from './pages/login';

function App() {
  
  return (
   <>
   <Routes>
    <Route path='/' element={<Login/>}/>
    <Route path='/employee' element={<Employee/>}/>
    <Route path='/myrewards' element={<MyRewards/>}/>
    <Route path='/pendingapprovals' element={<PendingApprovals/>}/>
    <Route path='/manager' element={<Manager/>}/>
    <Route path='/employeerequests' element={<EmployeeRequests/>}/> 
    <Route path='*'element={<div>Page Not Found!</div>}/>
   </Routes>
   </>
  );
}

export default App;
