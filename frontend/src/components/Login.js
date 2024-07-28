import {React,useState} from "react";
import { useNavigate,Link } from "react-router-dom"
import axios from 'axios';




function Login({currentUser,setCurrentUser,getCurrentUser}) {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorText, setErrorText] = useState("");


    const loginAction = (event) => {
        event.preventDefault();
        let payload = {
            "email":email,
            "password":password
          }
          //console.log(payload);
      
      setIsSubmitting(true)
      setErrorText('');
      console.log(process.env.REACT_APP_USER_LOGIN);
      axios.post(process.env.REACT_APP_USER_LOGIN, payload ).then((res)=>{
        setIsSubmitting(false);
        console.log("y",res.data);
        localStorage.setItem('token', res.data)
        getCurrentUser();
        navigate("/");
      }).catch((e)=> {
        setIsSubmitting(false);
        // alert(e.data.errors);
        console.log("N",e);
        console.log("N",e.response.data);
      
        setErrorText(e.response.data);
      })
    };


  return (
    <div className="pl-8 pr-8 bg-gray-300 h-screen">
      <div class="flex justify-center items-center p-4 ">
        <div class="flex  border rounded-3xl w-[50%] bg-white shadow-2xl">
          <div class="flex justify-center items-center p-8 w-[80%] shadow-sm">
            <form onSubmit={(e)=>loginAction(e)}>
              <h1 class="text-center mb-10 font-bold text-4xl">Login</h1>
              <input
                type="email"
                class=" bg-gray-100 border outline-none rounded-md py-3 w-full px-4 mb-3"
                placeholder="Email"
                required
                onChange={(e)=>{setEmail(e.target.value)}}
              />
              <input
                type="password"
                class=" bg-gray-100 border outline-none rounded-md py-3 w-full px-4 mb-3"
                placeholder="Password"
                required
                onChange={(e)=>{setPassword(e.target.value)}}
              />
              <p className='text-red-500'>{errorText}</p>
              <button
              disabled = {isSubmitting}
                type="submit"
                class=" bg-yellow-400 hover:bg-yellow-500 border outline-none rounded-md py-2 w-full px-2 font-semibold text-white ml-[0px]"
              >
                submit
                
              </button>
              <p  className=" mt-4">Don't have account? <Link to="/register">Register here</Link></p>
            </form>
          </div>
          <div class="">
            <img
              src="https://feelgoodfoodie.net/wp-content/uploads/2018/08/Quinoa-Burger-10.jpg"
              class="rounded-3xl"
              className="loginImage"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
