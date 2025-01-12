import { useEffect, useState } from "react";
import axios from "axios";
import { UserType } from "../interfaces/model";
import { TokenSliceState } from "../store/slices/token";


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
          })         
console.log("from user list")
console.log(request)
    }
return(
    <>
        <div className=" mx-3 my-10  content-start ">
        <ul>
        {users?.map((user)=>{
        return(<li className=" flex justify-between text-left font-medium text-lg py-3 px-2 my-1 w-full rounded-md border-b-gray-600 border-2  ">
        {user.username}
        <button onClick={()=>sendRequest(user.username,user._id)} className=" hover:bg-slate-300 border-indigo-800 border-1 rounded-md text-sm px-2 ">Send request</button>
        </li>)
    })}
    </ul>
    </div>
</>
)
}