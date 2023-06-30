/* eslint-disable react/prop-types */
import React from 'react'
import useFetch from '../../../hooks/useFetch'
import DeleteButton from './Components/DeleteButton'
import EditImage from '../../../assets/editButton.svg'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import ActionCompanies from './Components/ActionCompanies'
import AddButton from '../../../assets/AddButton.svg'
import { useNavigate } from 'react-router-dom'


export default function CompaniesList({stateAuth}){
    const [ newUpdate, setNewUpdate ] = useState(false)
    const { data, loading, fetchData, error } = useFetch('https://imagineapp-prueba.netlify.app/.netlify/functions/app/company', 'GET',null, stateAuth.token)

    useEffect(()=>{
        fetchData()
    }, [newUpdate])

    const navigate = useNavigate()
    if(error){
        navigate('/login')
    }
    
    return(
        <div className="h-5/6 w-screen lg:w-fit rounded-xl lg:m-2 shadow-xl">
            <div className="w-full rounded-t-xl h-1/6 flex items-center justify-around" style={{backgroundColor:'#F38704'}}>
                <span className="text-xl">Companies</span>
                {
                    stateAuth.statusAdmin&&<ActionCompanies dataTestID={'buttonAddNewCompany'} token={stateAuth.token} newUpdate={newUpdate} setNewUpdate={setNewUpdate} title={'Companies'} imageSource={AddButton} method={'POST'} modalTitle={'Add new company'} path={'register'} />
                }
            </div>
            <div className="h-5/6 border- rounded-b-xl text-slate-600 border overflow-y-scroll bg-white">
                <table className="w-full">
                    <thead className="sticky top-0 bg-white z-0">
                        <tr className="">
                        <th className="py-2 px-4 border">Name:</th>
                        <th className="py-2 px-4 border">Address:</th>
                        <th className="py-2 px-4 border">NIT:</th>
                        <th className="py-2 px-4 border">Phone:</th>
                        <th className="py-2 px-4 border"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                        <tr>
                            {!error?(
                                <td colSpan="5" className="py-2 px-4 text-center">Loading</td>
                            ):(
                                <td colSpan="5" className="py-2 px-4 text-center p-1 bg-red-600 text-white">{error}</td>
                            )
                            }
                        </tr>
                        ) : (
                            data.length===0?(
                                <tr>
                                    <td className='font-bold pl-3'>No companies yet.</td>
                                </tr>
                            ):(         
                                data.map((data, index) => (
                                    <tr key={index} className="pt-1 pb-1 ">
                                    <td className="py-1 px-2 border break-words whitespace-normal text-sm">
                                        <Link to={`/${data.NIT}`} className='underline'>
                                            {data.name}
                                        </Link>
                                    </td>
                                    <td className="py-1 px-4 border text-sm">{data.address}</td>
                                    <td className="py-2 px-4 border text-sm">{data.NIT}</td>
                                    <td className="py-2 px-4 border text-sm">{data.phoneNumber}</td>
                                    {
                                    stateAuth.statusAdmin&&
                                    <td className="py-2 px-1 border text-sm">
                                        {/* Edit company button */}
                                        <ActionCompanies  dataTestID={'buttonEditExistingCompany'} newUpdate={newUpdate} setNewUpdate={setNewUpdate} path={'/modify'} token={stateAuth.token} method={'PUT'} data={data} imageSource={EditImage} modalTitle={`Edit company of ${data.name}`} />
                                        <DeleteButton dataTestID={'deleteButtonCompany'} redirect={true} uri={'https://imagineapp-prueba.netlify.app/.netlify/functions/app/company'} token={stateAuth.token} width={30} setNewUpdate={setNewUpdate} newUpdate={newUpdate}  data={data} />
                                    </td>
                                    }
                                    </tr>
                                ))
                            )
                        )
                        }
                    </tbody>
                </table>
            </div>

        </div>
    )
}