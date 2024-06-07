import React, {useCallback} from 'react'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MediList from "./MediList";
import Icon from 'react-native-vector-icons/FontAwesome5'
import BriefDiag from "./BriefDiag";
import Interaction from "./Interaction";
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer, ParamListBase, useNavigation } from '@react-navigation/native'

const Tab = createBottomTabNavigator()

export default function BottomTabNav(){
    const navigation = useNavigation()
    const moveAddRoute = useCallback(() => navigation.navigate('AddRoute'),[])
    return (

        <Tab.Navigator initialRouteName="MediList">
            <Tab.Screen
                name="MediList"
                component={MediList}
                options={{
                    title: '나의 약품보기',
                    headerRight: ()=>(
                        <TouchableOpacity
                            onPress={()=>moveAddRoute()}
                            style={{width: 30, height: 30, borderWidth: 1, borderColor: 'black', marginRight: 20, justifyContent: 'center', alignItems:'center'}}
                        >
                            <Icon name="plus" color={'black'} size={24}/>
                        </TouchableOpacity>
                    ),
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

