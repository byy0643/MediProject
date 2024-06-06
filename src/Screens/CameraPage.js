import { ScrollView, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, {useState} from 'react'
import { launchCamera } from 'react-native-image-picker'
import { getTextFromImage } from './GoogleVision'
import { NavigationContainer, ParamListBase, useNavigation } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'



const CameraPage = () => {
  //const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>(null)
  const [imageData, setImageData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [desc, setDesc] = useState('')
  const openCamera = async() =>{
    const res = await launchCamera({mediaType: 'photo', includeBase64: true})
    if(!res.didCancel){
      setImageData(res)
    }
  }
  
  const getData= () => {
    setLoading(true)
    getTextFromImage(imageData.assets[0].base64).then(res=>{
      setLoading(false)
      console.log(res.responses[0].textAnnotations[0].description)
      setDesc(res.responses[0].textAnnotations[0].description)
    })
  }
  return(
    <ScrollView>
      {imageData != null && (<Image source={{uri: imageData.assets[0].uri}} style = {{width: '90%', height: 300, alignSelf: 'center'}}/>)}
      <TouchableOpacity 
      style={{
        width: '90%', 
        marginTop: 30, 
        height: 50, 
        alignSelf: 'center', 
        backgroundColor: 'black', 
        justifyContent: 'center', 
        alignItems: 'center'}}
        onPress={() => {
          openCamera()
        }}
        >
        <Text style={{color: 'white', fontSize: 20}}>Click Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={{
        width: '90%', 
        marginTop: 30, 
        height: 50, 
        alignSelf: 'center', 
        backgroundColor: 'black', 
        justifyContent: 'center', 
        alignItems: 'center'}}
        onPress={() => {
          getData()
        }}
        >
        <Text style={{color: 'white', fontSize: 20}}>Get Text From Image</Text>
      </TouchableOpacity>
      {loading && <ActivityIndicator style={{alignSelf: 'center'}} size={'large'}/>}
      <Text style={{width: '90%', alignSelf: 'center', marginTop: 20}}>{desc}</Text>
    </ScrollView>
  )
}
export default CameraPage