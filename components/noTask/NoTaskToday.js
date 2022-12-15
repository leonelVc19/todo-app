import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react';
import noTask from '../../assets/nothing.png'
import flechaDiagonal from '../../assets/flecha-diagonal.png'
import { ImageAnimation } from '../Animation/ImageAnimation';

export default function NoTaskToday() {
    return (
        <View style={styles.container}>
            <Image source={noTask} style={{width: 170, height: 360, borderWidth: 1, borderColor: 'black', borderRadius: 5}}/> 
            <Text style={{paddingTop: 5, fontSize:17, fontWeight: 'bold'}}>No Task</Text>
            <View style={{paddingTop: 5}}>
                <Text style={{fontSize: 14, fontWeight: 'bold'}}>Add a task for today or tomorrow</Text>
                <ImageAnimation>
                    <Image source={flechaDiagonal}  style={{width:60, height: 60}}/>
                </ImageAnimation>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    }
})