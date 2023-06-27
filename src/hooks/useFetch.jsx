import { useEffect, useState } from "react";

export default function useFetch( uri, method, dataToSend, token){
    const [ error, setError ] = useState(false)
    const [ loading, setLoading ] = useState(false)
    const [ data, setData ] = useState([])

    const fetchData = async() => {
        setLoading(true)
        try {
            const response = await fetch(`${uri}`, {
                method:method,
                headers:{
                    'Content-Type': 'application/json',
                    'Access-Token':token
                },
                body:dataToSend&&JSON.stringify(dataToSend)
            })
            if(!response.ok){
                const message = await response.json()
                setError(message.message)
                return
            }
            const jsonResponse = await response.json()

            setData(jsonResponse)
            setError()
            setLoading(false)
        } catch (error) {
            // setError(error)
            console.log(error)
        }
    }
    useEffect(()=>{
        fetchData()
    }, [])
    return {error, loading, data, fetchData}
}