import React, { useRef, useState, useCallback, useEffect } from 'react'
import { StyleSheet, SafeAreaView, Text, View, TouchableOpacity, Image, TouchableHighlight, Alert } from 'react-native'
import { useNavigation} from '@react-navigation/native'
import { removeMedicine } from '../data/privateMediService'

export default function Items({props, isDur, listRemoved}){//약품 리스트 포멧
    const navigation = useNavigation()
    const moveList = useCallback(() => navigation.navigate('BottomTabNav'),[])
    const moveMediInfo = useCallback(() => navigation.navigate('MediInfo', {route: {
        id: props.id,
        medName: props.medName,
        companyName: props.companyName,
        image: props.image,
        medClass: props.medClass,
        medType: props.medType,
        effect: props.effect,
        pillCheck: props.pillCheck,
        medInteraction: props.medInteraction,
        underlyingConditionWarn: props.underlyingConditionWarn,
        genaralWarn: props.genaralWarn,
        pregnancyWarn: props.pregnancyWarn,
        foodInteraction: props.foodInteraction,
        suppInteraction: props.suppInteraction,
        howToUse: props.howToUse,
        howToStore: props.howToStore,
        detailedCriticalInfo: props.detailedCriticalInfo,
        detailedWarning: props.detailedWarning,
        detailedInteraction: props.detailedInteraction,
        detailedSideEffect: props.detailedSideEffect
    }}),[])
    
    const remove = (id) =>{
        removeMedicine(id)
        listRemoved
    }

    const _onLongPressButton = () => {
        Alert.alert(
        "삭제", 
        "삭제하시겠습니까?", 
        [
            {text: '취소', onPress: ()=>{}, style: 'cancel'},
            {text: '삭제', onPress: ()=>{remove(props.id.toString())}, style: 'destructive'}
        ],
        {cancelable: true,
            onDismiss: ()=>{}})
    }

    return(
        <SafeAreaView>
            <TouchableOpacity style={isDur ? styles.durViewBox : styles.viewBox} onPress={moveMediInfo} onLongPress={_onLongPressButton}>
                <Image src={props.image} style={styles.image}/>
                <View style={styles.textBox}>
                    <Text style={styles.mediName}>
                        {props.medName}
                    </Text>
                    <Text style={styles.entpName}>
                        {props.companyName}
                    </Text>
                </View>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    viewBox: { flexDirection: "row", padding: 5, marginBottom: 5, borderWidth: 1, borderColor: 'black'},
    durViewBox: { flexDirection: "row", padding: 5, marginBottom: 5, borderWidth: 3, borderColor: 'red'},
    image: {width: 120, height: 65, borderWidth: 1, borderColor: 'black'},
    textBox: {marginHorizontal: 10, flex:1},
    mediName: {fontSize : 15, fontWeight: 'bold', color: 'black'},
    entpName: {fontSize: 12, color: 'gray'}
})