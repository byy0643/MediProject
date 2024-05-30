import React from 'react'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import MediList from "./MediList";
import Icon from 'react-native-vector-icons/FontAwesome5'
import BriefDiag from "./BriefDiag";
import Interaction from "./Interaction";

const Tab = createBottomTabNavigator()

export default function BottomTabNav(){
    return (

        <Tab.Navigator initialRouteName="MediList">
            <Tab.Screen
                name="MediList"
                component={MediList}
                options={{
                    title: '나의 약품보기',
                    tabBarIcon: () => (
                        <Icon name="briefcase-medical" color={'black'} size={24}/>
                    ),
                }}
            />
            <Tab.Screen
                name="BriefDiag"
                component={BriefDiag}
                options={{
                    title: '간단진단',
                    tabBarIcon: () => (
                        <Icon name="hospital-user" color={'black'} size={24}/>
                    ),
                }}
            />
            <Tab.Screen
                name="Interaction"
                component={Interaction}
                options={{
                    title: '영양제, 음식',
                    tabBarIcon: () => (
                        <Icon name="user-plus" color={'black'} size={24}/>
                    ),
                }}
            />
        </Tab.Navigator>

    )
}