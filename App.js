import React, { useRef, useState } from 'react'
import { StyleSheet, SafeAreaView, Text, View, TouchableOpacity } from 'react-native'
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MainNavigator from './src/Screens/MainNavigator'
import { enableScreens } from 'react-native-screens'
import { SafeAreaProvider } from 'react-native-safe-area-context'

//enableScreens()

export default function App(){
    // const navigationContainerRef = useRef()
    // const [initialRoute, setInitialRoute] = useState('MediList')
    // const navigation = useNavigation();

    return(
        <NavigationContainer>
            <MainNavigator />
        </NavigationContainer>
    )
}   
