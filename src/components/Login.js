import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
const Login = (props) => {

    const navigate = useNavigate()
    const [credentials, setCredentials] = useState({email:"", password:""});
    const host = "http://localhost:5000"
    const handleClick = async (e)=>{
        e.preventDefault()
        const response = await fetch(`${host}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({email:credentials.email, password:credentials.password})
        })
        const data = await response.json()
        console.log(data)
        if(data.success){
            localStorage.setItem("token" , data.authtoken)
            props.showAlert("Succesfully Logged in" , "success")
            navigate("/")
        }
        else if(data.success === false){
            props.showAlert("Plzz enter correct credentails", "danger")
        }
    }
    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
    return (
        <div>
        <form>
            <h2 className='my-2 mb-5'>Login</h2>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" value={credentials.email} onChange={onChange}/>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={onChange}/>
            </div>
            <button type="submit" className="btn btn-dark" onClick={handleClick}>Submit</button>
            </form>
        </div>
    )
}

export default Login
