import { getData, removeData, storeData, getAllKeys, getMultiple } from "./AsyncService";
import data from './dummyData.json'
import { Medicine } from "../model";

export const getMedicine = async (key) =>{
    try{
        const value = await getData(key)
        return value
    }catch(error){
        console.error("데이터 불러오는중 에러", error)
    }
}

export const getAllMedicines = async () =>{
    try{
        const keys = await getAllKeys()
        const valuesPromises = keys.map(key=>getMedicine(key))
        const values = await Promise.all(valuesPromises)
        return values
    }catch(error){
        console.error("모든 데이터 불러오는중 에러", error)
    }
}

export const removeMedicine = async (key) =>{
    await removeData(key)
}

// export const removeAllMedicines = async() => {
//     const keys = await getAllKeys()
//     await removeData('curList')
//     console.log("데이터 제거 완료")
// }

export const storeMedicine = async(key, value) => {
    await storeData(key, value)
}