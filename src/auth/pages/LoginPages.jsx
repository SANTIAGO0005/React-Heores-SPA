import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../context"

export const LoginPages = () => {
  
  const {login} =useContext(AuthContext)
  const navigate = useNavigate()

  const onLogin = ()=>{

    login('Santiago Cifuentes')


    navigate('/',{
      replace:true
    })
  }
  
  return (
    <>
        <div className="container mt-5">
        <h1>Login</h1>

        <button
        className="btn btn-primary"
        onClick={onLogin}>
          Login
        </button>
        </div>
    </>
  )
}

