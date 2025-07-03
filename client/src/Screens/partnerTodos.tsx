import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { TokenSliceState } from "../store/slices/token";
import PartnerTodoList from "../Components/partnertodoList";
import axios from "axios";
import { TodoType } from "../interfaces/model";

function PartnerTodos() {
    const [partnertodos,setPartnerTodos]=useState<null|TodoType[]>([])
        const [partnername,setPartnerName]=useState<null|String>("")

    const partner_id = useSelector((state:{token:TokenSliceState}) => {
        return state?.token?.partner_id;
      });
      const setpartnername=(name:String)=>{
setPartnerName(name)
      }

      useEffect( ()=>{
        async function getdata(){
            const partnertodos =await axios.get(`http://localhost:5000/todos/${partner_id}`).then(res=> {return res.data})   
            setPartnerTodos(partnertodos)
            console.log(partnertodos)

        }
        getdata()    
        }
    ,[])

    return ( 
    <div>
            <h1 className="text-3xl text-gray-700 my-3 text-left font-bold" >{partnername}'s Todos</h1>
<PartnerTodoList setpartnername = {setpartnername} todos={partnertodos?.filter((todo)=>{return(todo.checked == false)})}/>

    </div>
      );
}

export default PartnerTodos;