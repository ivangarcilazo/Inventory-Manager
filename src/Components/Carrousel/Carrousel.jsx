import 'animate.css'
import React from 'react'
import firstImage from '../../assets/FirstCarrousel.svg'
import secondImage from '../../assets/SecondCarrousel.svg'
import thirdImage from '../../assets/ThirdCarrousel.svg'
import left from '../../assets/leftArrow.svg'

import { useEffect, useState } from 'react'


const dataCarrousel = [
    {
        image:firstImage,
        text:'Know the inventory of new companies'
    },
    {
        image:secondImage,
        text:'Have the information at the moment.'
    }, {
        image:thirdImage,
        text:'Get to know your company better.'
    }
]


export default function Carrousel(){
    const [ item, setItem ] = useState(0)
    const [ type, setType ] = useState(false)

    const handlerChangeView = (type) =>{
        if(item===dataCarrousel.length-1 && type==='right'){
            setItem(0)
            setType(true)
            return
        }
        if(item===0&&type==='left'){
            setItem(dataCarrousel.length-1)
            setType(false)
            return
        }
        if(type==='right'){
            setItem(item+1)
            setType(true)
            return
        }else{
            setItem(item-1)
            setType(false)
            return
        }
    }
    useEffect(()=>{
        const interval = setInterval(()=>{
            handlerChangeView('right')
        },4500)

        return () => {

            clearInterval(interval);
          };
    }, [item])
    return(
        <div className='flex flex-col gap-5 justify-center items-center overflow-hidden mt-10 h-full '>
            
            <div className='flex justify-center items-center gap-10'>
                <img className='z-10 cursor-pointer hover:scale-125 duration-100' onClick={()=>handlerChangeView('left')} src={left} width={50}/>

                {dataCarrousel.map((data,index)=>{
                    return(
                    <div className={`z-0 bg-inherit animate__animated ${item === index?(type?'animate__slideInRight':'animate__slideInLeft'):'animate__zoomOut'}`} key={index} style={item !== index ?({ position: 'absolute' }): {}}>
                        <img src={data.image} width={400} />
                        <h5 className='font-semibold text-xl lg:text-3xl text-center' style={{color:'#212746'}}>{data.text}</h5>
                    </div>
                    )
                })}
                
                <img src={left} style={{transform:'rotate(180deg)'}} width={50} className='z-10 cursor-pointer hover:scale-125 duration-100' onClick={()=>handlerChangeView('right')} />
            </div>
           <ul className='flex gap-4'>
            {dataCarrousel.map((_,index)=>{
                return(
                    <li key={index} className='rounded-full w-3 h-3 ' style={item===index?{backgroundColor:'orange'}:{backgroundColor:'gray'}}></li>
                )
            })}
           </ul>
        </div>
    )

}
