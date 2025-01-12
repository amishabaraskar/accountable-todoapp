import { useState } from "react";
import LoginForm from "../Components/loginForm";
import SignUpForm from "../Components/signUpForm";

export default function Login() {
  const [currentForm, setCurrentForm] = useState<string>('login');

  return(
    <div>
      {currentForm == 'login' && <LoginForm  setCurrentForm={setCurrentForm}/>}
      {currentForm == 'signup' && <SignUpForm setCurrentForm={setCurrentForm}/>}

      {/* <>Create an account</Link> */}
      </div>
    )
}  