import React, { useRef, useState } from 'react'
import { StyleSheet, SafeAreaView, Text, View, TouchableOpacity } from 'react-native'
import axios from 'axios'

export default function MediInfo(props){
    const [mediInfo, setMediInfo] = useState()
    const getData = async () =>{
        try{
            axios.get("https://yakhakdasik.up.railway.app/meds/get-info", {
                params:{
                    id: props.id,
                    name: props.name
                }
            }).then(function(response){
                setMediInfo(response)
            })
        }catch(error){
            console.error("약품 정보 받아오는 중 오류 발생", error)
        }
    }

    return(
        <SafeAreaView>
            <View>
                <Text>
                    {mediInfo.name}
                </Text>
                <Text>
                    {mediInfo.companyName}
                </Text>
                <Text>
                    효능
                </Text>
                <Text>
                    경고
                </Text>

            </View>

        </SafeAreaView>
    )
}
