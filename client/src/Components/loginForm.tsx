import axios from "axios";
import { useDispatch,  } from "react-redux";
import { setToken } from "../store/slices/token";
import * as Yup from "yup";
import { Formik } from "formik";
import Header from "./header";
import { Dispatch, SetStateAction } from "react";



const formSchema = Yup.object().shape({
  username: Yup.string().required(),
  password: Yup.string().required(),
});

const LoginForm = ({setCurrentForm}:{setCurrentForm:Dispatch<SetStateAction<string>>}) => {
  const dispatch = useDispatch()

  async function loginUser(credentials: { username: string;  password: string; }) {
    return await axios.post('http://localhost:5000/login', {
      headers: {
        'Content-Type': 'application/json'
      },
      creds: credentials
    }).then(res=> {console.log(res.data);return res.data})
   }
   
  return (
    <>
    <Header title="Todo App"/>

    <Formik
      validationSchema={formSchema}
      onSubmit={async (values) => {
        const user = await loginUser(values);
        console.log(user)
  dispatch(setToken(user)) 
}}
               
        
              
      
      initialValues={{
        username: "",
        password: ""
      }}
    >
      {({ handleSubmit, handleChange, handleBlur, errors, values }) => {
        return (
          <div className="mx-auto bg-gray-300 p-10 w-96 rounded-lg my-3">
            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-4">

                <label className="block text-lg font-medium text-left">User name</label>
                <input
                  type="text"
                  className="bg-gray-700 text-white rounded px-6 py-3 w-full"
                  placeholder="Enter username"
                  name="username"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.username}

                />
                {errors?.username && (
                  <span className="text-red-600">{errors?.username}</span>
                )}
              </div>
              <div className="mb-4">

<label className="block text-lg font-medium text-left">Password</label>
<input
  type="password"
  className="bg-gray-700 text-white rounded px-6 py-3 w-full"
  placeholder="Enter Password"
  name="password"
  onChange={handleChange}
  onBlur={handleBlur}
  value={values.password}

/>
{errors?.password && (
  <span className="text-red-600">{errors?.password}</span>
)}
</div>



              <button
                type="submit"
                className="bg-green-500 text-white px-12 py-4 rounded hover:bg-green-400 w-full"
              >
                Submit
              </button>
            </form>
            <p>Dont have an account?
        <button onClick={()=>setCurrentForm('signup')}>SignUp</button></p>

          </div>
        );
      }}
    </Formik>
    </>

  );
};

export default LoginForm;
