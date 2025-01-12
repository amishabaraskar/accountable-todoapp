import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { clear } from "../store/slices/token";

export default function Header({title}:{title:string}) {
    const dispatch=useDispatch()
    return (
        <>
            <header className="bg-indigo-950 text-white p-4 ">
            <div className="flex justify-between">
            <h1 className="text-2xl text-left">
                <Link to="/">{title}</Link>
                    </h1>
                    <div className="flex justify-items-end  ">
                    <h2  className="mx-10" ><Link to="/partnertodos">Partner Todos</Link></h2>

    <h2  className="mx-10" ><Link to="/search">Search Partner</Link></h2>
    <h2  className="mx-10" ><Link to="/"><button onClick={()=>  dispatch(clear()) 
    }>LogOut</button></Link></h2>

</div></div>

=            </header>
        </>
    )
}

