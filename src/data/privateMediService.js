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
        const noDurKeys = keys.filter((element) => element !== "DurInfo")
        const valuesPromises = noDurKeys.map(key=>getMedicine(key))
        const values = await Promise.all(valuesPromises)
        return values
    }catch(error){
        console.error("모든 데이터 불러오는중 에러", error)
    }
}

export const removeDurInfo = async() => {
    await removeData("DurInfo")
}

export const getDurInfo = async() =>{
    try{
        const value = await getData("DurInfo")
        return value
    }catch(error){
        console.error("데이터 불러오는 중 에러", error)
    }
}



export const storeDurInfo = async (value) =>{
    try{
        await storeData("DurInfo", value)
    }catch(error){
        console.error("DUR 정보 저장중 오류", error)
    }
}

export const removeMedicine = async (key) =>{
    let isDurRemoved = false
    const durInfo = await getDurInfo()
    for(i in durInfo){
        const idx = durInfo[i].ids.indexOf(Number(key))
        console.log(idx)
        if(idx !== -1){
            durInfo.splice(i, 1)
            isDurRemoved = true
        }
    }
    if(isDurRemoved){
        await storeDurInfo(durInfo)
    }
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