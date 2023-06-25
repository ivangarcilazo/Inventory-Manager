/* eslint-disable react/prop-types */
import NO_IMAGE from '../../../../assets/NO_IMAGE.jpg'
import editButton from '../../../../assets/editButton.svg'
import previewButton from '../../../../assets/previewButton.svg'
import ButtonInventory from './ButtonInventory'
import { useState } from 'react'
import Modal from '../../../../Components/Modal/Modal'
import DeleteButton from './DeleteButton'

export default function Products({data, nit, setNewUpdate, newUpdate, stateAuth}){
    const [ isOpened, setIsOpened ] = useState(false)
    const toUpdateData={
        ...data,
        NIT:nit
    }
    return(
        <>
            <div className="h-64 w-64 shadow-xl border rounded flex flex-col items-center justify-center text-slate-600 p-5 gap-2">
                {data.productImage==='NO_IMAGE'?<img className='border rounded' width={100} src={NO_IMAGE} alt="" />:<img src="" alt="" />}
                <span>{data.productName}</span>
                <div className='w-full flex'>
                    <div className='flex flex-col w-4/5'>
                    <span>Price: ${data.productPrice}</span>
                    <span>Stock: {data.productQuantity}</span>
                    <button onClick={()=>{setIsOpened(true)}}>
                        <img src={previewButton} alt="" width={30} />
                    </button>
                    </div>
                    {
                    stateAuth.isAdmin&&
                    <div className='flex flex-col items-center justify-center'>
                    <ButtonInventory token={stateAuth.token} setNewUpdate={setNewUpdate} newUpdate={newUpdate} method={'PUT'} imgSource={editButton} width={25} data={toUpdateData} title={`Modify item ${data.productName}`} />
                    <DeleteButton token={stateAuth.token} setNewUpdate={setNewUpdate} newUpdate={newUpdate} width={30} data={toUpdateData} uri={'products'}/>
                    </div>
                    }
                    
                </div>
            </div>
            <Modal title={data.productName} isOpened={isOpened} setIsOpened={setIsOpened}>
                {data.productImage==='NO_IMAGE'?<img className='border rounded' width={100} src={NO_IMAGE} alt="" />:<img src="" alt="" />}
                <div className='flex flex-col text-slate-600 gap-2 justify-center items-start'>
                    <span>Price: ${data.productPrice}</span>
                    <span>Stock: {data.productQuantity}</span>
                    <span className='break-words w-80 max-h-40 overflow-scroll overflow-x-hidden'>Description: {data.productDescription}</span>
                </div>
            </Modal>
        </>
    )
}