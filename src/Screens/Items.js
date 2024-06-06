import React, { useRef, useState, useCallback } from 'react'
import { StyleSheet, SafeAreaView, Text, View, TouchableOpacity, Image } from 'react-native'
import { useNavigation} from '@react-navigation/native'

export default function Items({props}){//약품 리스트 포멧
    const navigation = useNavigation()
    const moveMediInfo = useCallback(() => navigation.navigate('MediInfo'),[])
    return(
        <SafeAreaView>
            <TouchableOpacity style={styles.viewBox} onPress={moveMediInfo}>
                <Image src={props.imageUrl} style={styles.image}/>
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
    image: {width: 100, height: 50, borderWidth: 1, borderColor: 'black'},
    textBox: {marginHorizontal: 10},
    mediName: {fontSize : 16, fontWeight: 'bold'},
    entpName: {fontSize: 10, color: 'gray'}
})