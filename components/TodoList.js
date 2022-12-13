import * as React from 'react';
import { todosData } from '../data/todo';

import { FlatList, Text, View } from 'react-native'


export default function TodoList() {
    return (
        <FlatList 
            data={todosData}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => <Text>{item.text}</Text>}
        />
    )
}