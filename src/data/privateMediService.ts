import { getData, removeData, storeData } from "./AsyncService";
import data from './dummyData.json'
import { Medicine } from "../model";

export const initMeidicine = async (): Promise<boolean> => {
    await storeData(data)
    return true
}

export const getMedicine = async (): Promise<Medicine[]> =>{
    const medicines = await getData("curList")
    return medicines
}

export const removeAllMedicines = async() => {
    await removeData('curList')
}

export const storeMedicine = async(value: any) => {
    await storeData(value)
}