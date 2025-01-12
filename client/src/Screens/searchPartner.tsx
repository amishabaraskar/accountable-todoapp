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
            <h1>SearchPartner</h1>
            <RequestList curr_user={logged_in_user}/>
            <UserList curr_user={logged_in_user}/>
        </div>
    )
}
export default SearchPartner;