import { useEffect, useState } from "react";
import TodoList from "../Components/todoList";
import ModalForm from "../Components/modalForm";
import { useSelector } from "react-redux";
import { TokenSliceState } from "../store/slices/token";
import axios from "axios";
import { TodoType } from "../interfaces/model";

function Home(){
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [todos,setTodos]=useState<null| TodoType[]>([])
    // const [partnertodos,setPartnerTodos]=useState([])

    const token = useSelector((state:{token:TokenSliceState}) => {
        return state?.token?.token;
      });
      // const partner_id = useSelector((state:{token:TokenSliceState}) => {
      //   return state?.token?.partner_id;
      // });

      const onChangeBox = async (id:string) => {

        //addtask(tasks.map(task => task.id === id ? { ...task, checked: !task.checked } : task))
        await axios.patch(`http://localhost:5000/todos/${id}`, {
            headers: {
              'Content-Type': 'application/json'
            },
          })
          const response = await axios.get(`http://localhost:5000/todos/${token}`).then(res=> {return res.data})
          setTodos(response)

                  
         }

    useEffect( ()=>{
        async function getdata(){
            const todos=await axios.get(`http://localhost:5000/todos/${token}`).then(res=> {return res.data})
            // const partnertodos =await axios.get(`http://localhost:5000/todos/${partner_id}`).then(res=> {return res.data})   
            setTodos(todos)
            // setPartnerTodos(partnertodos)
            // console.log(todos)
            // console.log(partnertodos)
        }
        getdata()    
        }
    ,[show])

    return (
        <div>
            <h1 className="text-3xl my-3 text-left font-bold" >Your Todos</h1>
<hr className="mb-1"/>
<hr/>
<div className="flex justify-between">

    <h1 className="text-xl my-3 text-left font-bold" >InProgress Tasks</h1>
    <button  className=" bg-blue-950 text-white rounded-lg w-24 h-10 mt-2" onClick={()=>setShow(true)}>+ Add Task</button>

</div>
<hr/>

<TodoList  onChangeBox={onChangeBox} todos={todos?.filter((todo)=>{return(todo.checked == false)})}/>   
<div>
    <h1 className="text-xl my-3 text-left font-bold" >Completed Tasks</h1>
    <hr/>
</div>

<TodoList onChangeBox={onChangeBox} todos={todos?.filter((todo)=>{return(todo.checked == true)})} />   

<ModalForm show={show} handleClose={handleClose} />
     </div>
    )
}
export default Home;