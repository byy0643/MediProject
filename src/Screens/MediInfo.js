import React, { useEffect, useRef, useState, useCallback } from 'react'
import { StyleSheet, SafeAreaView, Text, View, TouchableOpacity, Image, ActivityIndicator, FlatList, ScrollView } from 'react-native'
import axios from 'axios'
import { MD2Colors } from 'react-native-paper'
import Icon from 'react-native-vector-icons/Feather'
import InteractionIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { storeMedicine, getAllMedicines } from '../data/privateMediService'
import {  useNavigation } from '@react-navigation/native'


export default function MediInfo({route}){
    const [mediInfo, setMediInfo] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [warnings, setWarnings] = useState([])
    const [hasInfo, setHasInfo] = useState(false)
    const [ids, setIds] = useState([])
    const [dataObj, setDataObj] = useState({})
    const [medicines, setMedicines] = useState([])

    const navigation = useNavigation()
    const moveList = useCallback(() => navigation.navigate('BottomTabNav'),[])

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

    useEffect(()=>{
        if(ids.length < 1){
            getListIDs()
        }
        if(route.params.route.effect){
            setMediInfo(route.params.route)
            setHasInfo(true)
            setIsLoading(false)
        }
        else{
            getData()
        }
    }, [])

    let medName
    const getData = async () =>{
        try{
            const response = await axios.post("https://yakhakdasik.up.railway.app/meds/get-one", {"id": route.params.route.id},
                {
                    headers: {
                        'Accept': '*/*',
                        'Content-Type': 'application/json'
                    }
                }
            )
            medName = response.data.medName
            setMediInfo(response.data)
            console.log(mediInfo)
        }catch(error){
            console.error("약품 정보 받아오는 중 오류 발생", error)
        }
    }

    if(!mediInfo){
        return (
            <SafeAreaView>
                <View>
                    <ActivityIndicator/>
                </View>
            </SafeAreaView>
        )
    }



    const addMedicine = async () => {
        setDataObj({medications: medName})
        await getListIDs()
        Object.assign(dataObj, ids)
        console.log("재전송할 데이터", dataObj)
        const response = await axios.post("https://yakhakdasik.up.railway.app/meds/get-info", dataObj, 
        {
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json'
            }
        }
        
        )
        console.log(response.data)
        
    }

    return(
        <SafeAreaView style={styles.layout}>
            {
                !hasInfo
                ?   <TouchableOpacity style={{width: '100%', position: 'absolute', alignItems: 'flex-end'}} onPress={()=>addMedicine()}>
                        <Text style={{color: MD2Colors.blue300, fontSize: 16}}>추가</Text>
                    </TouchableOpacity>
                :null
            }
            
            <View style={styles.infoBox}>
                <Image src={mediInfo.image} style={styles.image}/>
                <View style={{marginLeft: 10}}>
                    <Text style={{color: MD2Colors.red200}}>{mediInfo.medClass}</Text>
                    <Text style={{color: 'black', fontSize: 30, flex: 1}}>{mediInfo.medName}</Text>
                    <Text>{mediInfo.companyName}</Text>
                </View>
            </View>
            <View style={{marginBottom: 10}}>
                <Text>{mediInfo.effect}</Text>
            </View>
        <ScrollView>
            <View style={styles.subBox}>
                <FlatList
                    ListHeaderComponent={<Text style={styles.subTitle}>복용하기 전에..</Text>}
                    data={mediInfo.pillCheck}
                    renderItem={({item}) =>
                        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                            <Icon name="check-square" size={24} marginRight={10}/>
                            <Text style={{fontSize: 16, flex: 1}}>{item}</Text>
                        </View>
                    }
                    keyExtractor={(item, index) => item.id}
                    ItemSeparatorComponent={()=> <View style={{marginVertical: 5}}/>}
                />
            </View>
            <View style={styles.subBox}>
                <FlatList
                    ListHeaderComponent={<Text style={styles.subTitle}>유의사항</Text>}
                    data={mediInfo.underlyingConditionWarn}
                    renderItem={({item}) =>
                        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                            <Icon name="chevron-right" size={24} marginRight={10}/>
                            <Text style={{fontSize: 16, flex: 1}}>{item}</Text>
                        </View>
                    }
                    keyExtractor={(item, index) => item.id}
                    ItemSeparatorComponent={()=> <View style={{marginVertical: 5}}/>}
                    ListFooterComponent={<FlatList
                        style={{marginTop: 10}}
                        data={mediInfo.genaralWarn}
                        renderItem={({item}) =>
                            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                                <Icon name="chevron-right" size={24} marginRight={10}/>
                                <Text style={{fontSize: 16, flex: 1}}>{item}</Text>
                            </View>
                        }
                        keyExtractor={(item, index) => item.id}
                        ItemSeparatorComponent={()=> <View style={{marginVertical: 5}}/>}
                    />}
                />
                
            </View>
            <View style={styles.subBox}>
                <Text style={styles.subTitle}>상호작용</Text>
                {
                    mediInfo.foodInteraction
                    ?   <View style={styles.infoBox}>
                        <InteractionIcon name="food-drumstick-outline" size={24} marginRight={10}/>
                        <Text style={{fontSize: 16, flex: 1}}>{mediInfo.foodInteraction}</Text>
                        </View>
                    :null
                }

                <View>
                {
                    mediInfo.suppInteraction
                    ?   <View style={styles.infoBox}>
                        <InteractionIcon name="pill" size={24} marginRight={10}/>
                        <Text style={{fontSize: 16, flex: 1}}>{mediInfo.suppInteraction}</Text>
                        </View>
                    :null
                }
                </View>

            </View>
            <View style={styles.subBox}>
                <Text style={styles.subTitle}>복용 및 보관</Text>
                {
                    mediInfo.howToUse
                    ?   <View style={styles.infoBox}>
                            <InteractionIcon name="clipboard-check-outline" size={24} marginRight={10}/>
                            <Text style={{fontSize: 16, flex: 1}}>{mediInfo.howToUse}</Text>
                        </View>
                    :null
                }
                {
                    mediInfo.howToStore
                    ?   <View style={styles.infoBox}>
                            <InteractionIcon name="archive-outline" size={24} marginRight={10}/>
                            <Text style={{fontSize: 16, flex: 1}}>{mediInfo.howToStore}</Text>
                        </View>
                    :null
                }
            </View>

            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    layout: {flex: 1, paddingHorizontal: 20, paddingVertical: 10 },
    image: {width: 160, height: 80, borderWidth: 1, borderColor: 'black'},
    infoBox: {flexDirection: 'row', marginBottom: 10},
    subBox: {marginBottom: 10},
    subTitle: {fontSize: 20, color: 'black', marginBottom: 10}
})