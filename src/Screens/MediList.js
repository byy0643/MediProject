import React, { useCallback, useMemo, useState, useEffect } from 'react'
import { StyleSheet, SafeAreaView, Text, View, TouchableOpacity, FlatList, Item, ScrollView } from 'react-native'
import { NavigationContainer, ParamListBase, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp, createNativeStackNavigator } from '@react-navigation/native-stack'
import {Medicine} from '../model'
import { getAllMedicines, getMedicine } from '../data/privateMediService'
import { getData } from '../data/AsyncService'
import Items from './Items'

export default function MediList (){
    const navigation = useNavigation()
    const moveAddRoute = useCallback(() => navigation.navigate('AddRoute'),[])
    const [medicines, setMedicines] = useState([])

    useEffect(()=>{
        getAllMedicines().then(res=>{
            setMedicines(res)
        })
    }, [])

    return(
        <SafeAreaView style={styles.layout}>
            {medicines.length > 0 ? (
                <FlatList
                    data={medicines}
                    renderItem={({item}) => <Items props={item}/>}
                    keyExtractor={(item, index) => item.id}
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