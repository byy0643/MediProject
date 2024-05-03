import React from "react"
import {createStackNavigator} from '@react-navigation/stack'
import MediList from './MediList'
import CameraPage from './CameraPage'
import AddRoute from "./AddRoute"

export default function MainNavigator(){
    const Stack = createStackNavigator()
    return(
        <Stack.Navigator initialRouteName="MediList">
            <Stack.Screen name="MediList" component={MediList} options={{title: '나의 약품 보기'}} />
            <Stack.Screen name="AddRoute" component={AddRoute} options={{headerShown: false}} />
            <Stack.Screen name="CameraPage" component={CameraPage} />
        </Stack.Navigator>
    )
}