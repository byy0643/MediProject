import React, {useEffect, useState} from 'react';
import {ScrollView, Text, StyleSheet, View, TextInput, SafeAreaView, TouchableOpacity, FlatList, ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'
import DropDownPicker from 'react-native-dropdown-picker';
import FilterComponent from './FilterComponent';
import { Dropdown } from 'react-native-element-dropdown'
import filterData from '../data/unique_values.json'
import axios from 'axios'
import Items from './Items'

const filterString = JSON.stringify(filterData)
const filterObj = JSON.parse(filterString)


export default function Search(){
    const [isOpen, setIsOpen] = useState(false)
    const [filterList, setFilterList] = useState({
        medName: '',
        drugShape: '',
        colorClass1: '',
        colorClass2: '',
        lineFront: '',
        lineBack: '',
        formCodeName: '',
        lengLongOption: 0,
        lengShortOption: 0,
        thickOption: 0,
    })
    const [drugShape, setDrugShape] = useState(null);
    const [colorClass1, setColorClass1] = useState(null);
    const [colorClass2, setColorClass2] = useState(null)
    const [lineFront, setLineFront] = useState(null)
    const [lineBack, setLineBack] = useState(null)
    const [formName, setFormName] = useState(null)
    const [lengLong, setLengLong] = useState(null)
    const [lengShort, setlengShort] = useState(null)
    const [thick, setThick] = useState(null)

    const [currentPage, setCurrentPage] = useState(1)
    const [mediList, setMediList] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isNextFeed, setIsNextFeed] = useState(true)

    async function sendData(){
        try{
            
                setIsLoading(true)
                setIsOpen(false)
                console.log("보낼 데이터", filterList)
                const response = await axios.post(`https://yakhakdasik.up.railway.app/pills?page=${currentPage.toString()}&limit=20`, 
                    JSON.stringify(filterList), 
                    {
                        headers: {
                            'Accept': '*/*',
                            'Content-Type': 'application/json'
                        }
                    })
                console.log("필터 항목 전송 성공", response.data)
                setMediList(response.data)


                setIsLoading(false)
                console.log(isNextFeed)
            
        }catch(error){
            console.error('필터 항목 전송중 에러', error)
        }
    }



    const onEndReached = () => {
        if(!isLoading){
            sendData();
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
                <View style={{borderWidth: 1, height: '60%', backgroundColor: 'white'}}>
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
                            }}
                        />
                        <Dropdown
                            data = {filterObj.Filters[5].items}
                            search
                            labelField="item"
                            valueField="id"
                            placeholder='제형'
                            searchPlaceholder='Search..'
                            value={formName}
                            onChange={item=>{
                                setFormName(item.id)
                                setFilterList(filterList=>({...filterList, formCodeName: item.item}))
                            }}
                        />
                        <Dropdown
                            data = {filterObj.Filters[6].items}
                            search
                            labelField="item"
                            valueField="id"
                            placeholder='장축길이'
                            searchPlaceholder='Search..'
                            value={lengLong}
                            onChange={item=>{
                                setLengLong(item.id)
                                setFilterList(filterList=>({...filterList, lengLongOption: item.id}))
                            }}
                        />
                        <Dropdown
                            data = {filterObj.Filters[7].items}
                            search
                            labelField="item"
                            valueField="id"
                            placeholder='단축길이'
                            searchPlaceholder='Search..'
                            value={lengShort}
                            onChange={item=>{
                                setlengShort(item.id)
                                setFilterList(filterList=>({...filterList, lengShortOption: item.id}))
                            }}
                        />
                        <Dropdown
                            data = {filterObj.Filters[8].items}
                            search
                            labelField="item"
                            valueField="id"
                            placeholder='두께'
                            searchPlaceholder='Search..'
                            value={thick}
                            onChange={item=>{
                                setThick(item.id)
                                setFilterList(filterList=>({...filterList, thickOption: item.id}))
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
                <TextInput 
                    style={styles.textInput} 
                    placeholder='약품명 또는 식별문자' 
                    autoFocus 
                    onChangeText={newText => setFilterList(filterList=>({...filterList, medName: newText}))}
                />
                <TouchableOpacity onPress={()=>sendData()}>
                    <Icon name="search" color='black' size={30}/>
                </TouchableOpacity>
            </View>
            <FlatList 
                data={mediList}
                renderItem={({item}) => <Items props={item}/>}
                keyExtractor={(item, index) => item.id}
                style={{marginTop: 35}}
                // onEndReached={onEndReached}
                // onEndReachedThreshold={0.5}
                // ListFooterComponent={isLoading && <ActivityIndicator/>}
            />
            <View style={{position: 'absolute', width: '100%', marginTop: 60, height: '50%'}}>
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