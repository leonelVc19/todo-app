import * as React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import TodoList from '../components/TodoList';
import { todosData } from '../data/todo';
import { useNavigation } from '@react-navigation/native';

export default function Home() {

    const [localData, setLocalData] = React.useState(
        todosData.sort((a,b) => {return a.isCompleted - b.isCompleted})
    );

    const [isHidden, setIsHidden] = React.useState(false);
    
    const navigation = useNavigation();

    const handlePress = () => {
        if (isHidden) {
            setIsHidden(false)
            setLocalData(todosData.sort((a,b) => {return a.isCompleted - b.isCompleted}))
            return;
        }
        setIsHidden(!isHidden)
        setLocalData(localData.filter(todo => !todo.isCompleted))
    }

return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.buttonImage} onPress={() => Alert.alert('TodoApp','Hola soy Komi...')}> 
            <Image 
                source={require('../assets/komi.png')}
                style={styles.image}
            />
        </TouchableOpacity>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <Text style={styles.title}>Today</Text>
            <TouchableOpacity onPress={handlePress} >
                <Text style={{color: '#3486f6'}}>{ isHidden ? 'Show Completed' : 'Hide Completed'}</Text>
            </TouchableOpacity>
        </View>

        
        <TodoList todosData={localData.filter(todo => todo.isToday)} />
        <Text style={styles.title}>Tomorrow</Text>
        <TodoList todosData={todosData.filter(todo => !todo.isToday)} />
        <TouchableOpacity onPress={() => navigation.navigate('Add')} style={styles.button}>
            <Text style={styles.plus}>+</Text>
        </TouchableOpacity>
    </View>
);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        paddingHorizontal: 20,
        backgroundColor: '#fff'
    },
    image:{
        width: 50,
        height: 50,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: '#000',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: .3,
        shadowRadius: 5,
        elevation: 5,
        
    },
    buttonImage: {
        alignSelf: 'flex-end',
    },
    title: {
        fontSize: 35,
        fontWeight: 'bold',
        marginBottom: 15,
        marginTop: 10
    },
    button: {
        width: 45,
        height: 45,
        borderRadius: 25,
        backgroundColor: '#000',
        position: 'absolute',
        bottom: 50, 
        right: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: .5,
        shadowRadius: 5,
        elevation: 5,
    },
    plus: {
        fontSize: 45,
        color: '#FFFFFF',
        position: 'absolute',
        top: -6,
        left: 8,

    }
});