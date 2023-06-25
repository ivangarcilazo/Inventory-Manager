import { useRef, useState, useContext } from "react"
import { ContextAuth } from "../Context/ContextAuth"
import Types from "../Provider/Types"
import { checkGeneralData } from './utils/checkData'
import { useNavigate } from "react-router-dom"

export default function Form(){
    const emailRef = useRef(null)
    const passwordRef = useRef(null)

    const { dispatch } = useContext(ContextAuth)

    const [ errorForm, setErrorForm ] = useState()
    const navigate = useNavigate()
    const handlerSubmit = async(e) =>{
        e.preventDefault()
        const email = emailRef.current.value
        const password = passwordRef.current.value

        if(!checkGeneralData(email, password, setErrorForm)) return
        
        const data = ({
            email:email,
            password:password
        })

        try {
            const response = await fetch('http://localhost:3000/users/login',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(data)
            })
            if(!response.ok){
                const message = await response.json()
                setErrorForm(message)
                throw new Error
            }

            const dataResponse = await response.json()
            dispatch({
                type:Types.ADD_DATA_AUTH,
                payload:dataResponse
            })
            navigate('/')
        } catch (error) {
            console.error(error)
        }
    }

    return(
        <div className="w-1/2 flex items-center justify-center">
            <div className="w-96 h-96 rounded flex flex-col justify-center items-center gap-5 shadow-xl"  style={{backgroundColor:'#c45800'}}>
                <h2 className="font-semibold text-4xl text-white text-center">Welcome to <br></br> Imagine App!</h2>
                <form action="" className="flex flex-col p-2 gap-5 items-start" onSubmit={handlerSubmit}>
                    <div className="flex flex-col items-start">
                        <label className="text-white" htmlFor="email">Email: </label>
                        <input ref={emailRef} type="email" className="rounded focus:outline-none pl-2 pr-2 pt-1 pb-1"/>
                    </div>
                    <div className="flex flex-col items-start">
                            <label className="text-white" htmlFor="password">Password: </label>
                        <input ref={passwordRef} type="password" name="" id="password" className="rounded focus:outline-none pl-2 pr-2 pt-1 pb-1" />
                    </div>
                    <button className="self-center">Submit</button>
                </form>
                {errorForm?<span className="font-bold text-red-600 bg-white rounded pl-1 pr-1">{errorForm.message}</span>:(<span></span>)}
            </div>
        </div>
    )
}