import { useEffect, useState } from "react";
import { initMeidicine } from "./privateMediService";

export default function useCachedResources(){
    const [isLoadingComplete, setIsLoadingComplete] = useState(false)

    useEffect(()=>{
        async function loadResourcesAndDataAsync(){
            try{
                await initMeidicine();
            }catch(e){
                console.warn(e)
            }finally{
                setIsLoadingComplete(true)
            }
        }

        loadResourcesAndDataAsync()
    }, [isLoadingComplete])

    return isLoadingComplete
}