import React, { useEffect, useState } from 'react'
import { TouchableOpacity, Text, View, ScrollView, StyleSheet, FlatList } from 'react-native'

import filterData from '../data/unique_values.json'
import { Dropdown } from 'react-native-element-dropdown'
import axios from 'axios'


export default function FilterComponent(){
    const [isOpen, setIsOpen] = useState(false)
    const [drugShape, setDrugShape] = useState(null);
    const [colorClass1, setColorClass1] = useState(null);
    const [colorClass2, setColorClass2] = useState(null);
    const [lineFront, setLineFront] = useState(null);
    const [lineBack, setLineBack] = useState(null);

    async function sendData(){
        try{
            const response = await axios.post('https://yakhakdasik.up.railway.app/pills', {
                drugShape : drugShape,
                colorClass1 : colorClass1,
                colorClass2 : colorClass2,
                lineFront : lineFront,
                lineBack : lineBack,
            })
        }catch(error){
            console.error('필터 항목 전송중 에러', error)
        }
    }

    const filterList = (data) => {
        const res = data.map((ele, i) =>{
            return(
                <Text>
                    {ele.item}
                </Text>
            )
        })
    }

    const filter = () =>{
        const res = filterData.map((ele, i)=>{
            return(
                <View>
                    <Text>
                        {ele.name}
                    </Text>
                    {filterList(ele.items)}
                </View>

            )
        })
    }

    const showList=()=>{

    }
    
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

const styles = StyleSheet.create({
    filterButton: {alignItems: 'flex-end'},
    itemText: {margin: 5}
})