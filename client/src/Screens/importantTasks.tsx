import {  useState } from "react";
import TodoList from "../Components/todoList";
import ImpTodoList from "../Components/impTodoList";

function Important(){
     

    return (
        <div >
            <h1 className="text-3xl my-3 text-gray-700 text-left font-bold" >Important Tasks</h1>


{/* <hr className="mb-1"/>
<hr/> */}
{/* <div className="flex justify-between">

    <h1 className="text-xl my-3 text-left font-bold" >InProgress Tasks</h1>
    <button  className=" bg-violet-600 text-white rounded-lg w-24 h-10 mt-2" onClick={()=>setShow(true)}>+ Add Task</button>

</div> */}
{/* <hr/> */}

<ImpTodoList  />   

     </div>
    )
}
export default Important;