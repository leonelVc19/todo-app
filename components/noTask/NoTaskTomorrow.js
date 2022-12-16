import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react';

import nothingToday from '../../assets/nothingToday.png';
import { ImageAnimation } from '../Animation/ImageAnimation';

export default function NoTaskTomorrow() {
    return (
        <View style={styles.container}>
            <View style={{alignItems: 'center', justifyContent: 'space-between', paddingTop: 5}}>
                <ImageAnimation>
                    <Image source={nothingToday} style={{width: 150, height: 155, }}/> 
                </ImageAnimation>
            </View>
            <View style={{alignItems: 'center', paddingTop: 15}}> 
                <Text style={{fontSize: 14, fontWeight: 'bold', color: '#'}}>NICE!</Text>
                <Text>Nothing is schedule for tomorrow...</Text>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    }
})