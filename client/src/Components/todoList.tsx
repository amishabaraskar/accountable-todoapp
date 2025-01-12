import { TodoType } from "../interfaces/model"

interface props {
  todos:undefined| TodoType[],
  onChangeBox:(id:string)=>Promise<void>
}

export default function TodoList({onChangeBox,todos}:props){
return(
    <>
    <div className=" mx-3 my-10 grid grid-cols-6 gap-4 content-start ">
        {todos?.map((todo)=>{
        return(
        // <TodoCard todo={todo} onChangeBox={onChangeBox}/>
        <div className="bg-indigo-300 p-4 rounded relative" key={todo._id}>
                    <div className="text-center ">
                    <div className="flex mx-auto ">
                        <input id="default-checkbox" type="checkbox" onClick={() => onChangeBox(todo._id)} defaultChecked={todo.checked} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <h3 className="mx-10 text-md mb-2 font-bold">{todo.task_name}</h3>
                    </div>
                    <hr />
                        {/* <h3 className="text-md mb-2 font-bold">{todo.task_name}</h3> */}
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
)
}