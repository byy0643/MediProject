import AsyncStorage from "@react-native-async-storage/async-storage";
import { Medicine } from "../model";

export const storeData = async (key, value) =>{
    try{
        const stringValue = JSON.stringify(value)
        await AsyncStorage.setItem(key, stringValue)
        console.log("데이터 저장 완료", stringValue)
    }catch(e){
        console.error(e.message)
    }

}  

export const getData = async (key) => {
    try{
        const value = await AsyncStorage.getItem(key)
        if(value !== null){
            const data = JSON.parse(value)
            return data
        }
    }catch(e){
        console.error(e.message)
    }
}


export const removeData = async (key) => {
    try{
        await AsyncStorage.removeItem(key)
    }catch(e){
        console.error(e.message)
    }
}

export const getAllKeys = async() =>{
    try{
        const keys = await AsyncStorage.getAllKeys()
        return keys
    }catch(e){
        console.error(e.message)
    }

}

export const getMultiple = async (keys) =>{
    try{
        const values = await AsyncStorage.multiGet(keys)
        return values
    }catch(e){
        console.error(e.message)
    }
}