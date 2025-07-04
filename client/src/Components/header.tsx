import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { clear } from "../store/slices/token";
import { Menu } from "lucide-react";
export default function Header({show,title,toggleSidebar}:{show:boolean,title:string,toggleSidebar:()=>void}) {
    const dispatch=useDispatch()

    return (
        <>
            <header className=" text-gray-800 py-4  ">
            <div className="flex justify-between">
            <div className="flex justify-items-start">{
            !show &&
                        <div className="menu-icon mt-1">
          <Menu onClick={toggleSidebar} />
        </div>
}
{
            !show &&
            <h1 className="text-2xl text-gray-700 font-semibold mx-3">
                <Link to="/">{title}</Link>
                    </h1>}
                    </div>
                    <div className="flex justify-items-end  ">
                    {/* <h2  className="mx-10 rounded-3xl w-40 py-1 shadow-lg hover:shadow-lg transition-shadow" ><Link to="/partnertodos">Partner Todos</Link></h2> */}

    <h2  className="mx-10 rounded-3xl w-40 py-1 shadow-md hover:shadow-lg transition-shadow" ><Link to="/search">Search Partner</Link></h2>
    <h2  className="mx-10 rounded-3xl w-40 py-1  shadow-md hover:shadow-lg transition-shadow" ><Link to="/"><button onClick={()=>  dispatch(clear()) 
    }>LogOut</button></Link></h2>

</div></div>
           </header>

        </>
    )
}

