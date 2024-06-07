import React, { useCallback, useState, useMemo, useEffect } from 'react'
import { StyleSheet, SafeAreaView, Text, View, TouchableOpacity, Alert } from 'react-native'
import { NavigationContainer, ParamListBase, useNavigation } from '@react-navigation/native'
import {MD2Colors} from "react-native-paper"
import { launchCamera } from 'react-native-image-picker'
import { getTextFromImage } from './GoogleVision'
import {Medicine} from '../data/dummyData.json'
import { getAllMedicines, removeAllMedicines, storeDurInfo, storeMedicine } from '../data/privateMediService'
import axios from 'axios'
import { removeAllListeners } from 'process'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { storeData } from '../data/AsyncService'


export default function AddRoute (){
    const [imageData, setImageData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [desc, setDesc] = useState('')
    const [medication, setMedication] = useState('')
    const [resend, setResend] = useState({})
    const [medicines, setMedicines] = useState([])
    const [ids, setIds] = useState([])

    const navigation = useNavigation()
    const moveSearch = useCallback(() => navigation.navigate('Search'),[])
    const moveList = useCallback(() => navigation.navigate('BottomTabNav'),[])

    const openCamera = async() =>{
        try{
            console.log("카메라 열림")
            const res = await launchCamera({mediaType: 'photo', includeBase64: true})
            if(!res.didCancel){
                setImageData(res) 
            }
        }catch(error){
            console.error("카메라 오류", error)
        }
        
    }

    const getListIDs = async () =>{
        try{
            const res = await getAllMedicines()
            setMedicines(res)

            setMedicines(prevState => {
                const keyAry = medicines.map(element=>element.id)
                setIds({currentMedications: keyAry})
                console.log("키 받아오기", { currentMedications: keyAry });
                return prevState;
            })
        }catch(error){
            console.error(error)
        }
    }

    const testRemove = () =>{
        AsyncStorage.clear()
        setLoading(false)
    }

    const sendData = async (data) => {//OCR 정보 전송
        try{
            const response = await axios.post("https://yakhakdasik.up.railway.app/meds/extract", data)
            setResend(response.data)
            var value = JSON.stringify(response.data)
            var obj = JSON.parse(value)
            var medications = obj.medications 
            console.log ("백엔드로 데이터 전송 완료\n", obj.medications)
            let str = ""
            for(let prop in medications){
                str+=(medications[prop]+'\n')
            }
            setMedication(str)
            console.log("재전송 데이터 삽입\n", str)
            await getListIDs()
            setLoading(true)
        }catch (error){
            console.error('백엔드로 데이터 전송 중 오류', error)
        }
    }

    const resendData = async (data) => {//사용자에게 보여준 뒤 정보 가져오기
        try{
            Object.assign(data, ids)
            console.log("재전송할 데이터\n", data)
            const response = await axios.post("https://yakhakdasik.up.railway.app/meds/get-info", data, 
                {
                    headers: {
                        'Accept': '*/*',
                        'Content-Type': 'application/json'
                    }
                }
            )
            var value = JSON.stringify(response.data)
            var obj = JSON.parse(value)
            console.log("약품정보 불러오기 성공\n", response.data)

            for(idx in response.data.medInfos){
                const key = response.data.medInfos[idx].id.toString()
                await storeMedicine(key, response.data.medInfos[idx])
            }

            if(response.data.durInfos.length > 0){
                await storeDurInfo(response.data.durInfos)
            }

            moveList()
            setLoading(false)
        }catch(error){
            console.error('데이터 재전송중 에러', error)
        }
    }

    useEffect(()=> {
        if(ids.length < 1){
            getListIDs()
        }
        if(imageData !== null){//사진을 받으면 곧바로 OCR요청
            getData()
        }
        if(loading){//화면이 렌더링 되었을때 같이 발생하는것을 방지
            Alert.alert(
                '추출 결과',
                medication,
                [
                    {text: '취소', onPress: ()=>{testRemove()}, style: 'cancel'},
                    {text: '추가', onPress: ()=>{resendData(resend)}, style: 'destructive'}
                ],
                {cancelable: true,
                onDismiss: ()=>{}}
            )
        }     
    }, [loading, imageData])

    const getData= async() => {
        try{
            console.log("데이터 받기 시도")
            const res = await getTextFromImage(imageData.assets[0].base64)
            setImageData(null)
            console.log(res.responses[0].textAnnotations[0].description)
            setDesc(res.responses[0].textAnnotations[0].description)
            await sendData({"text": res.responses[0].textAnnotations[0].description})
        }
        catch (error){
            console.log('오류발생', error)
        }
    }

    return(
        <SafeAreaView style={styles.layout}>
            <View style={styles.content}>
                <Text style={styles.text}>다양한 방법으로{'\n'}복용하고 있는 약품을 등록할 수 있습니다.</Text>
                <View style={styles.bContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => {openCamera()}}>
                        <Text style={styles.text}>카메라를 이용하여{'\n'}추가하기</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={moveSearch}>
                        <Text style={styles.text}>의약품 직접{'\n'}검색하기</Text>
                    </TouchableOpacity>
                </View>  
            </View>
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    layout: {flex: 1, marginHorizontal: 20, marginVertical: 10, justifyContent: 'space-around' },
    text: {width: '100%', fontSize: 16, textAlign: 'center'},
    content: { alignItems: 'center', flexDirection: 'row', flexWrap: 'wrap'},
    button: {width: 150, height: 150, borderWidth: 1, justifyContent: 'space-around', borderRadius: 10},
    bContainer: { width: '100%', flexDirection: 'row', marginTop: 80, justifyContent: 'space-around'}
})