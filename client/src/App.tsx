 import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import {   Route, Routes, useNavigate } from 'react-router-dom';
import Login from './Screens/loginPage';
import Home from './Screens/homePage';
import SearchPartner from './Screens/searchPartner';
import { useSelector } from 'react-redux';
import { TokenSliceState } from "./store/slices/token";
import Header from './Components/header';
import PartnerTodos from './Screens/partnerTodos';
import  Sidebar from './Components/sideBar';
import { useState } from 'react';
import Important from './Screens/importantTasks';

function App() {
  const navigate = useNavigate();

  const token = useSelector((state:{token:TokenSliceState}) => {
    return state?.token?.token;
  });
        const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    // console.log(sidebarOpen)
  };

 
  if(!token) {
    navigate("/", { replace: true } );

   return <>
   <Login/></>
  }

  return (
<>
<div className='flex gap-8'>
<Sidebar  show={sidebarOpen} toggleSidebar={toggleSidebar} /> 
    <main className=' mx-3  p-0 flex-1'>
      <Header show={sidebarOpen} title="Todo App" toggleSidebar={toggleSidebar}/>

      <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/search" element={<SearchPartner/>}/>
          <Route path="/partnertodos" element={<PartnerTodos/>}/>
          <Route path="/imptodos" element={<Important/>}/>

          </Routes>
          </main>
          </div>
    </>  );
}

export default App;