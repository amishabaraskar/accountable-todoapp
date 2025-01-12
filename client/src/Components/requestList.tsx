import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { setPartner, TokenSliceState } from "../store/slices/token";
import { RequestType } from "../interfaces/model";

function RequestList({curr_user}:{curr_user:TokenSliceState}) {
    const [requests,setRequests]=useState<null|RequestType[]>([])
    const dispatch = useDispatch()

    async function getrequests(){
        const response = await axios.get('http://localhost:5000/requests/'+curr_user.token).then(res=> {return res.data})
console.log(response)
        setRequests(response)
}

    useEffect( ()=>{

getrequests()    
}
,[])

const acceptRequest=async (request_whole:RequestType )=>{
    console.log("from accept")
    console.log(request_whole)
    const {from_user_id:from,to_user_id:to}=request_whole

     await axios.patch('http://localhost:5000/requests/', {
        headers: {
          'Content-Type': 'application/json'
        },
        request:{from,to}
      }).then(()=> getrequests())
      await axios.patch('http://localhost:5000/user/',{
        headers: {
          'Content-Type': 'application/json'
        },
        request:{from,to}}).then(()=>   dispatch(setPartner(from)) 
        )
}


    return ( <>
        <ul>
        {requests?.map((request)=>{

        return(
        <li className=" flex justify-between text-left font-medium text-lg py-3 px-2 my-1 w-full rounded-md border-b-gray-600 border-2  ">
        {request.from_username}
        <button  className=" hover:bg-slate-300 border-indigo-800 border-1 rounded-md text-sm px-2" 
        onClick={ ()=>acceptRequest(request)}>Accept request</button>
        </li>
        )
    })}
    
    </ul></>
    );
}

export default RequestList;