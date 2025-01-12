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

function App() {
  const navigate = useNavigate();

  const token = useSelector((state:{token:TokenSliceState}) => {
    return state?.token?.token;
  });
 
  if(!token) {
    navigate("/", { replace: true } );

   return <>
   <Login/></>
  }

  return (
<>
<Header title="Todo App"/>
      <main className='container mx-auto p-0'>
      <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/search" element={<SearchPartner/>}/>
          <Route path="/partnertodos" element={<PartnerTodos/>}/>

          </Routes>
          </main>
    </>  );
}

export default App;