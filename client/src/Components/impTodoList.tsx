import { TodoType } from "../interfaces/model"
import { Calendar,Trash2Icon } from 'lucide-react';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { TokenSliceState } from "../store/slices/token";
import axios from "axios";


export default function ImpTodoList(){
        const [todos,setTodos]=useState<null| TodoType[]>([])
    // const [partnertodos,setPartnerTodos]=useState([])

    const token = useSelector((state:{token:TokenSliceState}) => {
        return state?.token?.token;
      });

           const delete_todo = async (id:string) => {
    
            //addtask(tasks.map(task => task.id === id ? { ...task, checked: !task.checked } : task))
            await axios.delete(`http://localhost:5000/todos/${id}`, {
                headers: {
                  'Content-Type': 'application/json'
                },
              })
              const response = await axios.get(`http://localhost:5000/todos/${token}`).then(res=> {return res.data})
              setTodos(response.filter((task: TodoType)=>task.important == true ))
    
                      
             }

     const onChangeBox = async (id:string,attr:string) => {
    
            //addtask(tasks.map(task => task.id === id ? { ...task, checked: !task.checked } : task))
            await axios.patch(`http://localhost:5000/todos/${id}`, {
                headers: {
                  'Content-Type': 'application/json'
                },
                attr
              })
              const response = await axios.get(`http://localhost:5000/todos/${token}`).then(res=> {return res.data})
              setTodos(response.filter((task: TodoType)=>task.important == true ))
    
                      
             }
    
        useEffect( ()=>{
            async function getdata(){
                const todos=await axios.get(`http://localhost:5000/todos/${token}`).then(res=> {return res.data})
                // const partnertodos =await axios.get(`http://localhost:5000/todos/${partner_id}`).then(res=> {return res.data})   
              setTodos(todos.filter((task: TodoType)=>task.important == true ))
                // setPartnerTodos(partnertodos)
                // console.log(todos)
                // console.log(partnertodos)
            }
            getdata()    
            }
        ,[])
return(
    <>
    <div className=" mx-3 my-10 grid grid-cols-4  gap-4 content-start ">
        {todos?.length ==0 ? <h2>No important tasks to display</h2>: todos?.map((todo)=>{
        return(
        // <TodoCard todo={todo} onChangeBox={onChangeBox}/>
        <div className=" flex flex-col shadow-2xl h-60 p-4 rounded relative" key={todo._id}>
                    <div className="flex-1 text-left">
                    {/* <div className="flex mx-auto "> */}
                        {/* <input id="default-checkbox" type="checkbox" onClick={() => onChangeBox(todo._id)} defaultChecked={todo.checked} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" /> */}
                        <h3 className="text-lg mb-2 text-gray-900">{todo.task_name}</h3>
                    {/* </div> */}
                    {/* <hr /> */}
                        {/* <h3 className="text-md mb-2 font-bold">{todo.task_name}</h3> */}
                        <p className="text-sm mb-2 mt-2 text-gray-700">
                            {todo.task_desc}
                        </p>
                        </div>
                        <div className="flex gap-2">
                            <Calendar className="h-5 mx-0 text-gray-500"/>
                        <p className="text-sm mb-2 relative bottom-0 text-gray-700">
                            {todo.due_date.split('T')[0]}
                        </p> 
                        </div>    
                        <div className="flex justify-between">
                        <button className={`w-auto h-6 text-sm px-2 rounded-2xl   ${todo.checked ==true ? 'bg-green-200 text-green-500': 'bg-amber-200 text-amber-500'}`}  onClick={() => onChangeBox(todo._id,"checked")}>{todo.checked ==true ? "completed" : "uncompleted"}</button>  
                         <div className="flex gap-3">
                         <Trash2Icon onClick ={()=>delete_todo(todo._id)} className="h-6 mx-0 hover:text-gray-800 text-gray-600"/>
                              <button onClick={() => onChangeBox(todo._id,"star")} className="transition hover:text-slate-700 dark:hover:text-slate-200 ml-auto"><svg xmlns="http://www.w3.org/2000/svg" fill={todo.important==true ? "#f25278" : "black"} viewBox="0 0 24 24" stroke-width="2" stroke={todo.important==true ? "#f25278" : "black"} className={`w-5 h-5 sm:w-6 sm:h-6 ${todo.important==false ? 'fill-none':''}`}><path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"></path></svg></button>                         
                            </div>
                           
                            </div>
                         </div>

    )
    })}</div></>
)
}