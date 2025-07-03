import { useEffect, useState } from "react";
import axios from "axios";
import { UserType } from "../interfaces/model";
import { TokenSliceState } from "../store/slices/token";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for styling

export default function UserList({curr_user}:{curr_user:TokenSliceState}){
    const [users,setUsers]=useState<null|UserType[]>([])


    useEffect( ()=>{
        async function getdata(){
                    const response = await axios.get('http://localhost:5000/users').then(res=> {return res.data.filter((user:UserType)=>{return(user._id != curr_user.token)})})
            setUsers(response)
        }

       
        getdata()    
        }
    ,[])

    const sendRequest=async (to_username:string,to_user_id:string)=>{
        const request = {from_user_id:curr_user.token,from_username:curr_user.username,to_user_id,to_username}
        await axios.post('http://localhost:5000/users/request/', {
            headers: {
              'Content-Type': 'application/json'
            },
            request
          }).then(response=> {
            if(response.status == 200){
                            console.log(response.status)

                      toast.success('Request sent successfully!');
            }
            else
                  toast.error('Failed to send request.');

          }  )     
    }
return(
    <>
        <div className=" mx-3 my-10  content-start ">
        <ul>
        {users?.map((user)=>{
        return(<li className=" flex justify-between text-left font-medium text-md py-2 px-2 my-7 w-full rounded-md border-b-gray-600 bordder-b-2  shadow-md border-l-4 border-l-gray-600  ">
        {user.username}
        <button onClick={()=>sendRequest(user.username,user._id)} className=" hover:bg-violet-900 h-7 w-28 text-white bg-violet-700  rounded-full text-sm font-light px-2 ">Send request</button>
        </li>)
    })}
    </ul>
              <ToastContainer position="bottom-left"
 />

    </div>
</>
)
}