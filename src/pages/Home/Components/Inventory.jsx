/* eslint-disable react/prop-types */
import React from 'react'
import { useEffect, useState } from 'react'
import addButton from '../../../assets/AddButton.svg'
import useFetch from '../../../hooks/useFetch'
import ButtonInventory from './Components/ButtonInventory'
import { useParams } from 'react-router-dom'
import Products from './Components/Products'
import PDFRender from './Components/PDFRender'
import Carrousel from '../../../Components/Carrousel/Carrousel'

export default function Inventory({stateAuth}){
    const { nit } = useParams()
    const [ newUpdate, setNewUpdate ] = useState(false)
    
    const { data, fetchData } = useFetch(`https://imagineapp-prueba.netlify.app/.netlify/functions/app/company/${nit}`,'GET', null, stateAuth.token)
    useEffect(()=>{
        fetchData()
    }, [nit, newUpdate])

    return(
        <>
            <div className="w-full lg:h-20 h-1/6 bg-slate-400 rounded-b-xl flex justify-around items-center gap-5">
                {
                    data.length===0||nit===undefined?(
                        <h2 className="text-2xl m-0 p-0">Choose a company to see inventary!</h2>
                    )
                    :
                    (
                        <>
                        <h2 className="text-2xl m-0 p-0">Company inventory of<br /> <span className='font-bold'>{data.name}</span> </h2>
                        {stateAuth.statusAdmin&&<ButtonInventory dataTestID={'buttonAddProduct'} token={stateAuth.token} newUpdate={newUpdate} setNewUpdate={setNewUpdate} method={'POST'} data={data} imgSource={addButton} width={30} title={`Add new product of ${data.name}`} />}
                        </>
                    )
                }
                
            </div>
            
            <div className='h-5/6 lg:h-3/4'>
            {
                !data?.inventory || nit===undefined?(
                    
                    <div>
                        {
                            nit===undefined?(
                                <Carrousel />
                            ):(
                                stateAuth.length===0?<h1 className='font-bold text-orange-500'>You need to Login first.</h1>    :<h1 className='font-bold text-orange-500'>Loading inventory...</h1>                            )
                        }
                    </div>
                ):
                (
                <div className='flex flex-wrap justify-center items-center overflow-scroll gap-5 pt-4 h-full mt-2 overflow-x-hidden'>
                    {data.inventory.length===0?(
                        <div className='text-black text-center'>
                            <h1 className='font-bold'>{data.name} doesnt have any product yet.</h1>
                            {
                                stateAuth.statusAdmin?(
                                    <span>With the <b>+</b> button you can add new products.</span>
                                ):(
                                    <span>Please, Contact an administrator to add products. </span>
                                )
                            }
                        </div>
                    ):(
                        data.inventory.map((dataOfProducts,index)=>{ 
                            return(
                            <Products stateAuth={stateAuth} setNewUpdate={setNewUpdate} newUpdate={newUpdate} key={index} data={dataOfProducts} nit={nit}/>
                            )
                        })
                    
                    )}

                </div>
                )
            }
            </div>
            <div className='flex w-full justify-start lg:justify-end pt-2 lg:pt-10 lg:pr-5 '>
                {data.length===0 ||  data.inventory.length===0 || nit === undefined?<span></span>:(
                <PDFRender data={data.inventory} />
                )}
                
            </div>
        </>
    )
}