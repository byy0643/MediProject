import { getData, removeData, storeData } from "./AsyncService";
import data from './dummyData.json'
import { Medicine } from "../model";

export const initMeidicine = async (): Promise<boolean> => {
    await storeData("private-medicine", data)
    return true
}

export const getMedicine = async (): Promise<Medicine[]> =>{
    const medicines = await getData("private-medicine")
    return medicines
}

export const removeAllMedicines = async() => {
    await removeData('private-medicine')
}