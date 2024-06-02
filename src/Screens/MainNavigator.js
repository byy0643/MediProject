import React from "react"
import {createStackNavigator} from '@react-navigation/stack'
import MediList from './MediList'
import CameraPage from './CameraPage'
import AddRoute from "./AddRoute"
import BottomTabNav from "./BottomTabNav"
import Search from "./Search"
import MediInfo from "./MediInfo"

export default function MainNavigator(){
    const Stack = createStackNavigator()
    return(
        <Stack.Navigator initialRouteName="BottomTabNav">
            <Stack.Screen name="MediList" component={MediList} options={{title: '나의 약품 보기'}} />
            <Stack.Screen name="BottomTabNav" component={BottomTabNav} options={{headerShown: false, animationEnabled: false}} />
            <Stack.Screen name="Search" component={Search} options={{headerShown: false}} />
            <Stack.Screen name="AddRoute" component={AddRoute} options={{headerShown: false}} />
            <Stack.Screen name="MediInfo" component={MediInfo} options={{title: '약품 정보'}}/>
            <Stack.Screen name="CameraPage" component={CameraPage} />
        </Stack.Navigator>
    )
}