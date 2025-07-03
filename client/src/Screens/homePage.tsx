import {  useState } from "react";
import TodoList from "../Components/todoList";
import ModalForm from "../Components/modalForm";

function Home(){
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
      // const partner_id = useSelector((state:{token:TokenSliceState}) => {
      //   return state?.token?.partner_id;
      // });

     

    return (
        <>
<div className="flex ml-10">
            <h1 className="text-3xl my-3 text-left text-gray-700 font-bold" >All Tasks</h1>
                <button  className=" fixed right-20  bg-violet-600 text-white rounded-lg w-40 h-10 mt-2" onClick={()=>setShow(true)}>+ Add Task</button>
</div>

{/* <hr className="mb-1"/>
<hr/> */}
{/* <div className="flex justify-between">

    <h1 className="text-xl my-3 text-left font-bold" >InProgress Tasks</h1>
    <button  className=" bg-violet-600 text-white rounded-lg w-24 h-10 mt-2" onClick={()=>setShow(true)}>+ Add Task</button>

</div> */}
{/* <hr/> */}

<TodoList  show={show}/>   
{/* <div>
    <h1 className="text-xl my-3 text-left font-bold" >Completed Tasks</h1>
    <hr/>
</div>

<TodoList onChangeBox={onChangeBox} todos={todos?.filter((todo)=>{return(todo.checked == true)})} />    */}

<ModalForm show={show} handleClose={handleClose} />
     </>
    )
}
export default Home;