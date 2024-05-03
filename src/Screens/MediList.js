import React, { useCallback, useMemo, useState } from 'react'
import { StyleSheet, SafeAreaView, Text, View, TouchableOpacity, FlatList, Item } from 'react-native'
import { NavigationContainer, ParamListBase, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp, createNativeStackNavigator } from '@react-navigation/native-stack'
import {Medicine} from '../model'
import { getMedicine } from '../data/privateMediService'

export default function MediList (){
    const navigation = useNavigation()
    const moveAddRoute = useCallback(() => navigation.navigate('AddRoute'),[])
    const [medicines, setMedicine] = useState([])
    const [count, setCount] = useState(0)

    // useEffect(()=>{
    //     async function getData(){
    //         const _medicines = await getMedicine()
    //         setMedicine(_medicines)
    //         setCount(_medicines.length)
    //     }
    //     getData()
    // }, [])

    const renderItem = ({medicines}) => (
        <><Text>{medicines.name}</Text><Text>{medicines.entpName}</Text></>
    )

    return(
        <SafeAreaView style={styles.layout}>

            <View style={styles.content}>
                <Text style={styles.text}>현재 약통이 비어있습니다!</Text>
                <TouchableOpacity style={styles.button} onPress={moveAddRoute}>
                    <Text style={styles.text}>내 의약품 추가하기</Text>
                </TouchableOpacity>
                {/* <FlatList
                    data={medicines}
                    renderItem = {renderItem}
                    keyExtractor={(medicines, index) => medicines.name}
                    ItemSeparatorComponent={() => <View/>} /> */}
            </View>
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    title: {fontSize: 24, paddingBottom: 10},
    layout: {flex: 1, marginHorizontal: 20, marginVertical: 10 },
    text: {fontSize: 16},
    content: {flex: 1, alignItems: 'center', justifyContent: 'center'},
    button: {marginTop: 10, paddingVertical: 10, paddingHorizontal: 60, borderWidth: 1, alignItems: 'center'}
})