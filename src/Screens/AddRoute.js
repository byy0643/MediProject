import React, { useCallback, useState, useMemo, useEffect } from 'react'
import { StyleSheet, SafeAreaView, Text, View, TouchableOpacity, Alert } from 'react-native'
import { NavigationContainer, ParamListBase, useNavigation } from '@react-navigation/native'
import {MD2Colors} from "react-native-paper"
import { launchCamera } from 'react-native-image-picker'
import { getTextFromImage } from './GoogleVision'
import {Medicine} from '../model'
import { initMeidicine, removeAllMedicines } from '../data/privateMediService'

export default function AddRoute (){
    const [imageData, setImageData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [desc, setDesc] = useState('')


    const navigation = useNavigation()
    
    const moveCameraPage = useCallback(() => navigation.navigate('CameraPage'),[])
    const openCamera = async() =>{
        const res = await launchCamera({mediaType: 'photo', includeBase64: true})
        if(!res.didCancel){
          setImageData(res)
        }
    }

    useEffect(()=> {
        if(loading){
            Alert.alert(
                '추출 결과',
                desc,
                [
                    {text: '취소', onPress: ()=>{}, style: 'cancel'},
                    {text: '추가', onPress: ()=>{}, style: 'destructive'}
                ],
                {cancelable: true,
                onDismiss: ()=>{}}
            )
        }       
    }, [desc, loading])

    const getData= async() => {
        try{
            await openCamera()
            const res = await getTextFromImage(imageData.assets[0].base64)
            setLoading(false)
            console.log(res.responses[0].textAnnotations[0].description)
            setDesc(res.responses[0].textAnnotations[0].description) 
            setLoading(true)
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
                    <TouchableOpacity style={styles.button} onPress={() => {getData()}}>
                        <Text style={styles.text}>카메라를 이용하여{'\n'}추가하기</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
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