import { X } from "lucide-react";
import { Link } from "react-router-dom";

function Sidebar({ show, toggleSidebar }:{show:boolean, toggleSidebar:()=>void}) {
    console.log(show)
  return (
    
    		<div className={`${!show && 'hidden'} w-60 flex-none `}>
			<div className="pt-0 pr-0 pb-0 pl-0 mt-0 mr-0 mb-0 ml-0"></div>
			<div className="bg-white">
				
				<div className="flex-col flex  h-screen ">
					<div className="w-full border-b-2 border-gray-200"></div>
					<div className="flex bg-gray-100  overflow-x-hidden">

						<div className="bg-white lg:flex md:w-64 md:flex-col hidden">
				<div className="flex-col justify-evenly">							                                    <div className=" menu-icon">
          <X onClick={toggleSidebar} color="gray" /> <h1 className="text-xl font-bold text-gray-600">Todo App</h1></div>
        </div>


							<div className="flex-col pt-5 flex overflow-y-auto">
								
								<div className="h-full flex-col justify-between  flex">
									<div className="space-y-4">
											
											<Link
												to="/"
												className="font-medium text-md items-center hover:border-r-4 hover border-red-400 text-gray-900 px-4 py-2.5 flex
                    transition-all duration-200 hover:bg-red-100 hover:text-red-700 group cursor-pointer"
											>
												<span>All Tasks</span>
											</Link>
																						<Link
												to="/partnertodos"
												className="font-medium text-md items-center hover:border-r-4 hover border-red-400 text-gray-900 px-4 py-2.5 flex
                    transition-all duration-200 hover:bg-red-100 hover:text-red-700 group cursor-pointer"
											>
												<span>Partner todos</span>
											</Link>

											<Link
												to="/imptodos"
												className="font-medium text-md items-center hover:border-r-4 hover border-red-400 text-gray-900 px-4 py-2.5 flex
                    transition-all duration-200 hover:bg-red-100 hover:text-red-700 group cursor-pointer"
											>
												<span>Important Tasks</span>
											</Link>
										
										
								</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

  );
}

export default Sidebar;
