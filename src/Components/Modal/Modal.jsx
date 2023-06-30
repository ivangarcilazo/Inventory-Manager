/* eslint-disable react/prop-types */
import React from "react"

export default function Modal(props){    
    const  {isOpened, 
        setIsOpened, 
        children,
        error,
        statusRequest,
        title,
        onSubmit,
        actionSubmit,
        setError
    } = props
        
    const closeHandler = () =>{
        setIsOpened(false)
        setError&&setError(false)
    }

    return(
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50" style={(isOpened)?{backgroundColor:'rgb(23 24 23 / 15%)', backdropFilter:'blur(2px)'}:{display:'none'}}>

            <div className="bg-white rounded-xl p-6 shadow flex justify-around items-center flex-col " >
                <div className="flex">
                    <span className="text-3xl text-slate-800">{title}</span>
                </div>
                {children}
                <div className="mb-2">
                    <button onClick={closeHandler} className="bg-slate-600 p-1 pr-2 pl-2 rounded mr-2 text-white">Cancel</button>
                    {onSubmit&&<button onClick={onSubmit}  className="self-end mt-5 bg-orange-400 p-1 pr-2 pl-2 text-white rounded">{actionSubmit}</button>}
                </div>
                <div className="flex text-slate-600">

                    {(statusRequest&&!error)&&<span className=" text-white bg-green-400 rounded p-1">Uploading...</span>}
                    {error&&<span className="bg-red-400 p-1 rounded text-white">{error.message}</span>}

                </div>
            </div>
            
        </div>
    )
}