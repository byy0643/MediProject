import React, {useState} from 'react';
import {ScrollView, Text, StyleSheet, View, TextInput, SafeAreaView, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'
import DropDownPicker from 'react-native-dropdown-picker';
import FilterComponent from './FilterComponent';
import { Dropdown } from 'react-native-element-dropdown'
import filterData from '../data/unique_values.json'
import axios from 'axios'

export default function Search(){
    const [isOpen, setIsOpen] = useState(false)
    const [drugShape, setDrugShape] = useState(null);
    const [colorClass1, setColorClass1] = useState(null);
    const [colorClass2, setColorClass2] = useState(null);
    const [lineFront, setLineFront] = useState(null);
    const [lineBack, setLineBack] = useState(null);

    async function sendData(){
        try{
            const response = await axios.post("https://yakhakdasik.up.railway.app/pills", {
                "drugShape" : drugShape,
                "colorClass1" : colorClass1,
                "colorClass2" : colorClass2,
                "lineFront" : lineFront,
                "lineBack" : lineBack,
                "formCodeName" : null,
            })
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
                            data = {filterData.Filters[0].items}
                            search
                            labelField="item"
                            valueField="id"
                            placeholder='모양'
                            searchPlaceholder='Search..'
                            value={drugShape}
                            onChange={item=>{
                                setDrugShape(item.value)
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
                                setColorClass1(item.value)
                            }}
                        />
                        <Dropdown
                            data = {filterData.Filters[2].items}
                            search
                            labelField="item"
                            valueField="id"
                            placeholder='색상(뒤)'
                            searchPlaceholder='Search..'
                            value={colorClass2}
                            onChange={item=>{
                                setColorClass2(item.value)
                            }}
                        />
                        <Dropdown
                            data = {filterData.Filters[3].items}
                            search
                            labelField="item"
                            valueField="id"
                            placeholder='분할선(앞)'
                            searchPlaceholder='Search..'
                            value={lineFront}
                            onChange={item=>{
                                setLineFront(item.value)
                            }}
                        />
                        <Dropdown
                            data = {filterData.Filters[4].items}
                            search
                            labelField="item"
                            valueField="id"
                            placeholder='분할선(뒤)'
                            searchPlaceholder='Search..'
                            value={lineBack}
                            onChange={item=>{
                                setLineBack(item.value)
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