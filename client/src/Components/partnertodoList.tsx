import { MouseEvent, useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import { TokenSliceState } from "../store/slices/token";
import { useSelector } from "react-redux";
import axios from "axios";
import { TodoType } from "../interfaces/model";
import { Bell } from 'lucide-react';

interface props {
  todos:undefined| TodoType[],
}

function PartnerTodoList({todos}:props) {
    const [loading, setLoading] = useState(false);
    const from_name = useSelector((state:{token:TokenSliceState}) => {
        return state?.token?.username;
      });
      const partner_id = useSelector((state:{token:TokenSliceState}) => {
        return state?.token?.partner_id;
      });

      const [to_name,settoname]=useState("")
      const [to_email,settoemail]=useState("")
      useEffect(()=>{
        async function getdata(){
            console.log("from getdata of partner user")
            await axios.get(`http://localhost:5000/users/${partner_id}`).then(res=> {return res.data}).then((user)=>
             {
                settoname(user.username)
                settoemail(user.email)
    })   
        }
         getdata()
    }
        ,[])

    const handleSubmit = async (e:MouseEvent<HTMLButtonElement>,todo:TodoType) => {
console.log(to_email,to_name)
        e.preventDefault();
        const serviceId = import.meta.env.VITE_GMAIL_SERVICE_ID
        const templateId = import.meta.env.VITE_EMAIL_TEMPLATE_ID;
        try {
          setLoading(true);

            emailjs.send(serviceId, templateId,{
           from_name,
            to_name,
            to_email,
            message:`${todo.task_name} ${todo.due_date}`
          },{
            publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
          }).then(res => console.log(JSON.stringify(res)));
          alert("email successfully sent check inbox");
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      };

    return (
        <>
        <div className=" mx-3 my-10 grid grid-cols-6 gap-4 content-start ">
            {todos?.map((todo)=>{
            return(
            <div className="bg-indigo-300 p-4 rounded relative" key={todo._id}>
                        <div className="text-center ">
                        <div className="flex justify-between">
                            <h3 className="mr-10 text-md  font-bold">{todo.task_name}</h3>
                            <button className="btn mb-3" type='button' onClick={(e)=>handleSubmit(e,todo)} disabled={loading && !to_name}>                              <Bell  />
                            </button>
                        </div>
                        <hr />
                            <p className="text-sm mb-2 mt-2 font-semibold">
                                {todo.task_desc}
                            </p>
                            <p className="text-sm mb-2 font-semibold">
                                {todo.due_date.split('T')[0]}
                            </p>       
                             </div>
                             </div>
    
        )
        })}</div></>
      );
}

export default PartnerTodoList;