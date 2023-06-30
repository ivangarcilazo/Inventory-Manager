/* eslint-disable react/prop-types */
import React from "react"

export default function FormCompanies(props){
    const {
        dataCompany,
        onSubmit
    } = props
    
        
    return(
        <form action="" className="flex flex-col text-slate-800 gap-5" onSubmit={onSubmit} >
            {
                dataCompany.map((data, index)=>{
                    return(
                        <div className="flex gap-2" key={index}>
                            <label htmlFor="">{data.label}</label>
                            <input ref={data?.ref} style={{borderBottom:'#ffa357 1px solid'}} className="rounded pl-1 pr-1 focus:outline-none" type="text" placeholder={data?.value?data.value:data.placeholder}/>
                        </div>
                    )
                })
            }
            
        </form>       
    )
}