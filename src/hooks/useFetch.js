
import { useEffect,useState } from "react";

export const useFetch = (url,options) => {
    const[response,setresponse] = useState(null);
    const [error,seterror] = useState(null);
    const [loading,setloading] = useState(false);

    const fetchData = async () =>
    {
        setloading(true);
        try{
            const res = await fetch(url,options)

            const data = await res.json();

            setresponse(data);
            setloading(false);
        }
        catch(error)
        {
            seterror(error)
            setloading(false)
        }
    
    }
    
    useEffect(()=>{
        fetchData();
        // eslint-disable-next-line
    },[])

    return {response,error,loading,fetchData}
}


