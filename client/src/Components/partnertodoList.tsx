import { MouseEvent, useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import { TokenSliceState } from "../store/slices/token";
import { useSelector } from "react-redux";
import axios from "axios";
import { TodoType } from "../interfaces/model";
import {  Calendar } from 'lucide-react';

interface props {
  todos:undefined| TodoType[],
  setpartnername:(name:String)=>void,

}

function PartnerTodoList({todos,setpartnername}:props) {
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
                                setpartnername(user.username)

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
        <div className=" mx-3 my-10 grid grid-cols-4  gap-6 ">
            {todos?.map((todo)=>{
            return(
 <div className=" flex   bg-violet-700 flex-col shadow-2xl h-60 p-4 rounded relative" key={todo._id}>
                    <div className="flex-1 text-left">
                    {/* <div className="flex mx-auto "> */}
                        {/* <input id="default-checkbox" type="checkbox" onClick={() => onChangeBox(todo._id)} defaultChecked={todo.checked} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" /> */}
                        <h3 className="text-lg mb-2 text-gray-100">{todo.task_name}</h3>
                    {/* </div> */}
                    {/* <hr /> */}
                        {/* <h3 className="text-md mb-2 font-bold">{todo.task_name}</h3> */}
                        <p className="text-sm mb-2 mt-2 text-gray-200">
                            {todo.task_desc}
                        </p>
                        </div>
                        <div className="flex gap-2">
                            <Calendar className="h-5 mx-0 text-gray-300"/>
                        <p className="text-sm mb-2 relative bottom-0 text-gray-300">
                            {todo.due_date.split('T')[0]}
                        </p> 
                        </div> 
                            {/* <button className="btn mb-3" type='button' onClick={(e)=>handleSubmit(e,todo)} disabled={loading && !to_name}><Bell  />
                            </button> */}
                        <button className="w-auto h-8 mt-1 text-sm px-2 rounded-lg hover:bg-red-300  bg-red-100 text-red-800"  onClick={(e)=>handleSubmit(e,todo)} disabled={loading && !to_name}>Send Reminder</button>  

                                                  </div>
    
        )
        })}</div></>
      );
}

export default PartnerTodoList;