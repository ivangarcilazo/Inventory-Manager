/* eslint-disable react/prop-types */
import React from "react"
import { useRef, useState } from "react"
import Modal from "../../../../Components/Modal/Modal"

export default function ButtonInventory({imgSource, width, title, data, method, setNewUpdate, newUpdate, token, dataTestID}){
    const [ isOpened, setIsOpened ] = useState(false)
    const [ error, setError ] = useState(false)
    const [ statusRequest, setStatusRequest ] = useState(false)


    const nameProductRef = useRef(null)
    const quantityProductRef = useRef(null)
    const priceProductRef = useRef(null)
    const descriptionProductRef = useRef(null)
   
    const handlerSubmit = async() => {
        const name=nameProductRef.current.value
        const quantity=quantityProductRef.current.value
        const price=priceProductRef.current.value
        const description=descriptionProductRef.current.value

        if(name===''|| quantity==='' || price===''||description===''){
            setError({
                message:"Fields can't be empty"
            })
            return
        }
        if(price <= 0 || quantity <= 0 ){
            setError({
                message:"The numbers cannot be less than 0."
            })
            return
        }


        const dataToSend = {
            name:name,
            quantity:quantity,
            price:price,
            description:description,
            image:'NO_IMAGE',
            nit:data.NIT,
            idProduct:data._id||null
        }
        setStatusRequest(true)
      
        try {
            const response = await fetch(`https://imagineapp-prueba.netlify.app/.netlify/functions/app/company/products`, {
                method:method,
                headers:{
                    'Content-Type': 'application/json',
                    'access-token':token
                },
                body:JSON.stringify(dataToSend)
            })

            if(!response.ok){
                const message = await response.json()
                setError({
                    message:message
                })
                return
            }
            setStatusRequest(false) 
            setError(false)
            setNewUpdate&&setNewUpdate(!newUpdate)
            setIsOpened(false)
        } catch (error) {
            setError(error)
        }
    }

    const dataForm = [
        {
            label:'Name product: ',
            ref:nameProductRef,
            placeholder:data?.productName?data.productName:'Name',
            type:'text'
        },
        {
            label:'Quantity product: ',
            ref:quantityProductRef,
            placeholder:data?.productQuantity?data.productQuantity:'Quantity',
            type:'number'
        },
        {
            label:'Price product: ',
            ref:priceProductRef,
            placeholder:data?.productPrice?data.productPrice:'$...',
            type:'number'
        },
        {
            label:'Description product: ',
            ref:descriptionProductRef,
            textarea:true,
            type:'text',
            placeholder:data?.productDescription?data.productDescription:'Add description here...',
        },
    ]
    
    return(
        <>
            <button onClick={()=>setIsOpened(true)} data-testid={dataTestID}>
                <img src={imgSource} alt="" width={width} />
            </button>
            <Modal error={error} setError={setError} statusRequest={statusRequest} onSubmit={handlerSubmit} actionSubmit={'Add product'} isOpened={isOpened} title={title} setIsOpened={setIsOpened}>
                <form action="" className="text-slate-600 flex flex-col">
                    {
                        dataForm.map((data, index)=>{
                            return(
                                <div key={index}  className="flex flex-col">
                                    <label htmlFor="">{data.label}</label>
                                    {data?.textarea&&<textarea ref={data.ref} style={{border:'#ffa357 .5px solid'}} className="rounded p-1 focus:outline-none"  />}
                                    {(!data?.textarea)&&(
                                        <input ref={data.ref} style={{borderBottom:'#ffa357 1px solid'}} className="rounded pl-1 pr-1 focus:outline-none" type={data.type} placeholder={data.placeholder} />
                                    )}
                                </div>
                            )
                        })
                    }
                </form>
            </Modal>
        </>
    )
}