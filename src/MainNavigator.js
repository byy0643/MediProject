import React from "react"
import {createStackNavigator} from '@react-navigation/stack'
import MediList from './MediList'
import CameraPage from './CameraPage'

export default function MainNavigator(){
    const Stack = createStackNavigator()
    return(
        <Stack.Navigator>
            <Stack.Screen name="MediList" component={MediList} />
            <Stack.Screen name="CameraPage" component={CameraPage} />
        </Stack.Navigator>
    )
}