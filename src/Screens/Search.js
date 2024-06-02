import React, {useState} from 'react';
import {ScrollView, Text, StyleSheet, View, TextInput, SafeAreaView, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'
import DropDownPicker from 'react-native-dropdown-picker';
import FilterComponent from './FilterComponent';
import { Dropdown } from 'react-native-element-dropdown'
import filterData from '../data/unique_values.json'
import axios from 'axios'

const filterString = JSON.stringify(filterData)
const filterObj = JSON.parse(filterString)


export default function Search(){
    const [isOpen, setIsOpen] = useState(false)
    const [filterList, setFilterList] = useState({
        drugShape: '',
        colorClass1: '',
        colorClass2: '',
        lineFront: '',
        lineBack: '',
        formCodeName: '',
    })
    const [drugShape, setDrugShape] = useState(null);
    const [colorClass1, setColorClass1] = useState(null);
    const [colorClass2, setColorClass2] = useState(null);
    const [lineFront, setLineFront] = useState(null);
    const [lineBack, setLineBack] = useState(null);



    async function sendData(){
        try{
            console.log("보낼 데이터", filterList)
            const response = await axios.post("https://yakhakdasik.up.railway.app/pills?page=5&limit=5", JSON.stringify(filterList))
            console.log("필터 항목 전송 성공", response.data)
        }catch(error){
            console.error('필터 항목 전송중 에러', error)
        }
    }

    const FilterComp =()=>{
        if(!isOpen){
            return (
                <View>
                    <TouchableOpacity style={styles.filterButton} onPress={()=>setIsOpen(true)}>
                        <Text>필터검색▼</Text>
                    </TouchableOpacity>
                </View>
            )
        }
        else{
            return(
                <View style={{borderBottomWidth: 1, height: '60%'}}>
                    <ScrollView>
                        <Dropdown
                            data = {filterObj.Filters[0].items}
                            search
                            labelField='item'
                            valueField='id'
                            placeholder='모양'
                            searchPlaceholder='Search..'
                            value={drugShape}
                            onChange={item=>{
                                setDrugShape(item.id)
                                setFilterList(filterList=>({...filterList, drugShape: item.item}))
                                console.log("모양 ", item.item)
                                console.log("데이터 업데이트", filterList)
                            }}
                        />
                        <Dropdown
                            data = {filterData.Filters[1].items}
                            search
                            labelField="item"
                            valueField="id"
                            placeholder='색상(앞)'
                            searchPlaceholder='Search..'
                            value={colorClass1}
                            onChange={item=>{
                                setColorClass1(item.id)
                                setFilterList(filterList=>({...filterList, colorClass1: item.item}))
                                console.log("색상(앞) ", item.item)
                                console.log("데이터 업데이트", filterList)
                            }}
                        />
                        <Dropdown
                            data = {filterObj.Filters[2].items}
                            search
                            labelField="item"
                            valueField="id"
                            placeholder='색상(뒤)'
                            searchPlaceholder='Search..'
                            value={colorClass2}
                            onChange={item=>{
                                setColorClass2(item.id)                                
                                setFilterList(filterList=>({...filterList, colorClass2: item.item}))
                                console.log("모양 ", item.item)
                                console.log("데이터 업데이트", filterList)
                            }}
                        />
                        <Dropdown
                            data = {filterObj.Filters[3].items}
                            search
                            labelField="item"
                            valueField="id"
                            placeholder='분할선(앞)'
                            searchPlaceholder='Search..'
                            value={lineFront}
                            onChange={item=>{
                                setLineFront(item.id)
                                setFilterList(filterList=>({...filterList, lineFront: item.item}))
                                console.log("모양 ", item.item)
                                console.log("데이터 업데이트", filterList)
                            }}
                        />
                        <Dropdown
                            data = {filterObj.Filters[4].items}
                            search
                            labelField="item"
                            valueField="id"
                            placeholder='분할선(뒤)'
                            searchPlaceholder='Search..'
                            value={lineBack}
                            onChange={item=>{
                                setLineBack(item.id)
                                setFilterList(filterList=>({...filterList, lineBack: item.item}))
                                console.log("모양 ", item.item)
                                console.log("데이터 업데이트", filterList)
                            }}
                        />
                    </ScrollView>
                    <TouchableOpacity style={styles.filterButton} onPress={()=>setIsOpen(false)}>
                        <Text>필터검색▲</Text>
                    </TouchableOpacity>
                </View>
            )
        }
    }

    return (
        <SafeAreaView style={styles.layout}>
            <View style={styles.searchArea}>
                <TextInput style={styles.textInput} placeholder='약품명 또는 식별문자' autoFocus/>
                <TouchableOpacity onPress={()=>sendData()}>
                    <Icon name="search" color='black' size={30}/>
                </TouchableOpacity>
            </View>
            <View>
                <FilterComp/>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    layout: {flex: 1, marginHorizontal: 20, marginVertical: 10 },
    searchArea: {flexDirection: 'row', alignItems: 'center'},
    textInput: {borderWidth: 1, width: '90%', marginRight: 10},
    filterButton: {alignItems: 'flex-end'}
})