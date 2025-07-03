import { useSelector } from "react-redux";
import RequestList from "../Components/requestList";
import UserList from "../Components/userList";
import { TokenSliceState } from "../store/slices/token";

function SearchPartner(){
    const logged_in_user = useSelector((state:{token:TokenSliceState}) => {
        return state?.token;
      });


    return (
        <div>
            <h1 className="text-xl my-3 text-left text-gray-700 font-semibold">Received Requests</h1>
            <RequestList curr_user={logged_in_user}/>
<hr className="text-gray-500 my-4 border-dashed border-2"/>
        <h1 className="text-xl my-3 text-left text-gray-700 font-semibold">Send accountable partner request</h1>

            <UserList curr_user={logged_in_user}/>
        </div>
    )
}
export default SearchPartner;