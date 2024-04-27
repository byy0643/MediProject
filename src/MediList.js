import React, { useCallback } from 'react'
import { StyleSheet, SafeAreaView, Text, View, TouchableOpacity } from 'react-native'
import { NavigationContainer, ParamListBase, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp, createNativeStackNavigator } from '@react-navigation/native-stack'

export default function MediList (){
    const navigation = useNavigation()
    const moveCameraPage = useCallback(() => navigation.navigate('CameraPage'),[])
    return(
        <SafeAreaView>
            <View style={styles.topBar}>
                <Text style={styles.title}>나의 약품 보기</Text>
            </View>
            
            <View style={styles.content}>
                <Text style={styles.text}>현재 약통이 비어있습니다!</Text>
                <TouchableOpacity style={styles.button} onPress={moveCameraPage}>
                    <Text style={styles.text}>내 의약품 추가하기</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    topBar: {flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1,},
    title: {fontSize: 24, paddingBottom: 10},
    layout: {flex: 1, marginHorizontal: 20, marginVertical: 10 },
    text: {fontSize: 16},
    content: {flex: 1, alignItems: 'center', justifyContent: 'center'},
    button: {marginTop: 10, paddingVertical: 10, paddingHorizontal: 60, borderWidth: 1, alignItems: 'center'}
})