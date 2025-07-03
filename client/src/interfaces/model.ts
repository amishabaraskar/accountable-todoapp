export interface TodoType {
_id:string,
    user_id:string,
    task_name:string,
    task_desc:string,
    due_date:string,
    checked:boolean,
    important:boolean
}

export interface UserType {
    username:string,
    email:string,
    password:string,
    partner_id:string
    _id:string
}
export interface RequestType {
_id:string,
from_user_id:string,
from_username:string,
to_user_id:string,
to_username:string
}