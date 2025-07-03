import axios from "axios";
import { setToken } from "../store/slices/token";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { Formik } from "formik";
import Header from "./header";
import { Dispatch, SetStateAction } from "react";


const formSchema = Yup.object().shape({
  username: Yup.string().required(),
  email: Yup.string().email('Please enter a valid email address').required('Email is required'),
  password: Yup.string().required(),
});

const SignUpForm = ({setCurrentForm}:{setCurrentForm:Dispatch<SetStateAction<string>>}) => {
  const dispatch = useDispatch()

  async function signUpUser(credentials: { username: string; email: string; password: string; }) {
    return await axios.post('http://localhost:5000/signup', {
      headers: {
        'Content-Type': 'application/json'
      },
      creds:credentials
    }).then(res=> {console.log(res.data);return res.data})
   }
   
  return (
    <>
    <Header title="Todo App" />

    <Formik
      validationSchema={formSchema}
      onSubmit={async (values) => {
        const user = await signUpUser(values);
  dispatch(setToken(user)) 
}}
               
        
              
      
      initialValues={{
        username: "",
        email:"",
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
                  placeholder="Enter Username"
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

<label className="block text-lg font-medium text-left">Email Address</label>
<input
  type="email"
  className="bg-gray-700 text-white rounded px-6 py-3 w-full"
  placeholder="Enter Email Id"
  name="email"
  onChange={handleChange}
  onBlur={handleBlur}
  value={values.email}

/>
{errors?.email && (
  <span className="text-red-600">{errors?.email}</span>
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
            <p>Already have an account?
        <button onClick={()=>setCurrentForm('login')}> Login</button></p>

          </div>
        );
      }}
    </Formik>
    </>

  );
};

export default SignUpForm;


// export default function SignUpForm({setCurrentForm}) {
//     const [username, setUserName] = useState('');
//     const [email, setEmail] = useState('');
//     const dispatch = useDispatch()

//     const [password, setPassword] = useState('');
//     async function loginUser(credentials: { username: string; email: string; password: string; }) {
//         return await axios.post('http://localhost:5000/signup', {
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           creds:credentials
//         }).then(res=> {console.log(res.data);return res.data.token})
//        }
       
       
//     const handleSubmit = async (e: { preventDefault: () => void; }) => {
//       e.preventDefault();
//       const token = await loginUser({
//         username,
//         email,
//         password
//       });
//       dispatch(setToken(token)) 
//     }
  
//     return(
//       <div className="login-wrapper">
//         <h1>Please Log In</h1>
//         <form onSubmit={handleSubmit}>
//           <label>
//             <p>Username</p>
//             <input type="text" onChange={e => setUserName(e.target.value)} />
//           </label>
//           <label>
//             <p>Email</p>
//             <input type="text" onChange={e => setEmail(e.target.value)} />
//           </label>

//           <label>
//             <p>Password</p>
//             <input type="password" onChange={e => setPassword(e.target.value)} />
//           </label>
//           <div>
//             <button type="submit">Submit</button>
//           </div>
//         </form>
//         <p>Already have an account?
//         <button onClick={()=>setCurrentForm('login')}>Login</button></p>

//       </div>
//     )
// }  