import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react';
import noTask from '../../assets/nothing.png'
import flechaDiagonal from '../../assets/flecha-diagonal.png'
import { ImageAnimation } from '../Animation/ImageAnimation';

export default function NoTask() {
    return (
        <View style={styles.container}>
            <Image source={noTask} style={{width: 170, height: 360,}}/> 
            <Text style={{paddingTop: 5, fontSize:17, fontWeight: 'bold'}}>No Task</Text>
            
            <View style={{paddingTop: 3, }}>
                <Text style={{fontSize: 14, fontWeight: 'bold', color: '#00000080',}}>Add a task for 
                    <Text style={{fontSize: 15, fontWeight: 'bold', color: '#000'}}> Today </Text>
                    or 
                    <Text style={{fontSize: 15, fontWeight: 'bold', color: '#000'}}> Tomorrow</Text>
                </Text>
            </View>
            <ImageAnimation>
                <Image source={flechaDiagonal}  style={styles.iconRow}/>
            </ImageAnimation>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        paddingTop: '25%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    iconRow: {
        width:60, 
        height: 60,
        borderColor: '#000',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: .3,
        shadowRadius: 5,
        elevation: 5,
    }
})