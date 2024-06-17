import React, { useCallback, useMemo, useState, useEffect } from 'react'
import { StyleSheet, SafeAreaView, Text, View, TouchableOpacity, FlatList, Item, ScrollView, Alert } from 'react-native'
import { NavigationContainer, ParamListBase, useNavigation, useIsFocused } from '@react-navigation/native'
import { NativeStackNavigationProp, createNativeStackNavigator } from '@react-navigation/native-stack'
import {Medicine} from '../model'
import { getAllMedicines, getDurInfo, getMedicine, removeDurInfo } from '../data/privateMediService'
import { getData } from '../data/AsyncService'
import Items from './Items'

export default function MediList (){
    const navigation = useNavigation()
    const moveAddRoute = useCallback(() => navigation.navigate('AddRoute'),[])
    const [medicines, setMedicines] = useState([])
    const [durInfo, setDurInfo] = useState([])
    const [isDurCondition, setIsDurCondition] = useState(false)
    const [isRemoved, setIsRemoved] = useState(false)
    const isFocused = useIsFocused()
    let durMessage = ''

    useEffect(()=>{
        getAllMedicines().then(res=>{
            setMedicines(res)
        })
        if(durInfo === undefined || durInfo.length < 1){
            getDurInfo().then(res=>{
                setDurInfo(res)
            })
        }
        checkDur()
        if(isDurCondition){//화면이 렌더링 되었을때 같이 발생하는것을 방지
            Alert.alert(
                '병용 금기',
                durMessage,
                [
                    {text: '취소', onPress: ()=>{}, style: 'cancel'},
                    {text: '확인', onPress: ()=>{removeDurInfo()}, style: 'destructive'}
                ],
                {cancelable: true,
                onDismiss: ()=>{}}
            )
        }
        setRemovedFalse()

    }, [isDurCondition, durInfo, isFocused, isRemoved])

    const checkDur = () =>{
        if(durInfo !== undefined && durInfo.length > 0){
            setIsDurCondition(true)
            console.log("Change True")
            for(idx in durInfo){
                durMessage = durMessage + durInfo[idx].contraindicateReason + '\n'
            }
        }
    }

    const isDur = (chkid) =>{
        if(isDurCondition){
            for(idx in durInfo){
                for(j in durInfo[idx].ids){
                    if(chkid === durInfo[idx].ids[j]) return true
                }
            }
        }
        return false
    }

    const setRemovedFalse = () =>{
        if(isRemoved === true){
            setIsRemoved(false)
            console.log("reset")
        }


    }

    const setRemovedTrue = async () => {
        setIsRemoved(true)
        await getAllMedicines().then(res=>{
            setMedicines(res)
        })
        console.log("Removed")
    }

    return(
        <SafeAreaView style={styles.layout}>
            {medicines !== undefined && medicines.length > 0 ? (
                <FlatList
                    data={medicines}
                    keyExtractor={(item, index) => item.id}
                    renderItem={({item}) => 
                        {   
                            if(isDur(item.id)){
                                return(
                                    <Items props={item} isDur={true} listRemoved={setRemovedTrue}/>
                                )
                            }
                            else{
                                return(
                                    <Items props={item} isDur={false} listRemoved={setRemovedTrue}/>
                                )
                            }
                        }
                    }
                    />
            ) : (
                <View style={styles.content}>
                <Text style={styles.text}>현재 약통이 비어있습니다!</Text>
                <TouchableOpacity style={styles.button} onPress={moveAddRoute}>
                    <Text style={styles.text}>내 의약품 추가하기</Text>
                </TouchableOpacity>
                </View>
            )}
            
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    layout: {flex: 1, marginHorizontal: 20, marginVertical: 10 },
    text: {fontSize: 16},
    content: {flex: 1, alignItems: 'center', justifyContent: 'center'},
    button: {marginTop: 10, paddingVertical: 10, paddingHorizontal: 60, borderWidth: 1, alignItems: 'center'}
})