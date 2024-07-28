import {React,useState} from "react";
import { useNavigate,Link } from "react-router-dom"
import axios from 'axios';
function Register({currentUser,setCurrentUser,getCurrentUser}) {

  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorText, setErrorText] = useState("");


  const registerAction = (event) => {
    event.preventDefault();
    let payload = {
        "name":name,
        "email":email,
        "password":password,
        "phone":phone
      }
      console.log(payload);
  
  setIsSubmitting(true)
  setErrorText('');
  
  axios.post(process.env.REACT_APP_USER_REGISTER, payload ).then((res)=>{
    setIsSubmitting(false);
    console.log("y",res.data);
    localStorage.setItem('token', res.data.accesToken)
    getCurrentUser();
    navigate("/");
  }).catch((e)=> {
    setIsSubmitting(false);
    // alert(e.data.errors);
    console.log("N",e);
    setErrorText(e.response.data.message);
  })
};
  return (
    <div className="pl-8 pr-8 bg-gray-300 h-screen">
    <div class="flex justify-center items-center p-4 ">
      <div class="flex  border rounded-3xl w-[50%] bg-white shadow-2xl">
        <div class="flex justify-center items-center p-8 w-[80%] shadow-sm">
          <form onSubmit={(e)=>registerAction(e)}>
            <h1 class="text-center mb-10 font-bold text-4xl">Register</h1>
            <input
              type="text"
              class=" bg-gray-100 border outline-none rounded-md py-3 w-full px-4 mb-3"
              placeholder="Name"
              required
              onChange={(e)=>{setName(e.target.value)}}
            />
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
            <input
              type="tel"
              class=" bg-gray-100 border outline-none rounded-md py-3 w-full px-4 mb-3"
              placeholder="Phone"
              required
              onChange={(e)=>{setPhone(e.target.value)}}
              
            />
            <p className='text-red-500'>{errorText}</p>
            <button
            disabled = {isSubmitting}
              type="submit"
              class=" bg-yellow-400 hover:bg-yellow-500 border outline-none rounded-md py-2 w-full px-2 font-semibold text-white ml-[0px]"
            >
              submit
              
            </button>
            <p  className=" mt-4">Already a user? <Link to="/login">Login here</Link></p>
          </form>
        </div>
        <div class="">
          <img
            src="https://www.licious.in/blog/wp-content/uploads/2023/01/Shutterstock_2047827035-750x500.jpg"
            class="rounded-3xl"
            className="loginImage"
            alt=""
          />
        </div>
      </div>
    </div>
  </div>
  )
}

export default Register