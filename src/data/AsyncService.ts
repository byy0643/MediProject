import AsyncStorage from "@react-native-async-storage/async-storage";
import { Medicine } from "../model";

export const storeData = async (value: any) =>{
    try{
        const stringValue = JSON.stringify(value)
        if(getData('curList') !== null){
            await AsyncStorage.mergeItem('curList', stringValue)
        }
        else{
            await AsyncStorage.setItem('curList', stringValue)
        }

    }catch(e:any){
        console.error(e.message)
    }

}  

export const getData = async (key: string) => {
    try{
        const value = await AsyncStorage.getItem(key)
        if(value !== null){
            const data = JSON.parse(value)
            return data
        }
    }catch(e: any){
        console.error(e.message)
    }
}

export const removeData = async (key: string) => {
    try{
        await AsyncStorage.removeItem(key)
    }catch(e: any){
        console.error(e.message)
    }
}
