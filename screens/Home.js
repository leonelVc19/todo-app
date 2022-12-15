import * as React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, Platform } from 'react-native';
import TodoList from '../components/TodoList';
import { todosData } from '../data/todo';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { hideCompletedReducer, setTodosReducer } from '../redux/todosSlice';
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import moment from 'moment';
import NoTaskTomorrow from '../components/noTask/NoTaskTomorrow';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    })

})

export default function Home() {

    const todos = useSelector( state=> state.todos.todos);

    /*const [localData, setLocalData] = React.useState(
        todosData.sort((a,b) => {return a.isCompleted - b.isCompleted})
    );*/

    const [isHidden, setIsHidden] = React.useState(false);
    const [expoPushToken, setExpoPushToken] = React.useState('');
    
    const navigation = useNavigation();
    const dispatch = useDispatch();

    React.useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token))
        const getTodos = async () => {
            try {
                const todos = await AsyncStorage.getItem("@Todos");
                if(todos !== null) {
                    const todosData = JSON.parse(todos);
                    const todoDataFilter = todosData.filter(todo => {
                        return moment(new Date(todo.hour)).isSameOrAfter(moment(), 'day');

                    })
                    if(todoDataFilter !== null) {
                        await AsyncStorage.setItem("@Todos", JSON.stringify(todoDataFilter));
                        console.log('we delete some passed todo');
                        dispatch(setTodosReducer(todoDataFilter));
                    }
                }
            } catch (e) {
                console.log(e)
            }
        }
        getTodos();
        
    }, []);

    const handlePress = async () => {
        if (isHidden) {
            setIsHidden(false);
            const todos = await AsyncStorage.getItem('@Todos');
            if( todos !== null ) {
                dispatch(setTodosReducer(JSON.parse(todos)));
            } 
            return;
        }
        setIsHidden(true)
        dispatch(hideCompletedReducer());
    }
    ///permisos de aplicacion, para poder utilizar las notificaciones
    const registerForPushNotificationsAsync = async () => {
        let token;
        if (Device.isDevice) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await Notifications.getPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                alert('Failed to get push token for push notifications');
                return;
            }
            token = ( await Notifications.getExpoPushTokenAsync()).data;
            console.log('El token: '+ token)

        } else { return;}
        if(Platform.OS === 'android') {
            Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0,250,250,250],
                lightColor: '#FF231F7C',
            });
        }
        return token;
    }
    //Checa si no hay nada mostrar otra pantalla.
    const todayTodos = todos.filter(todo => moment(todo.hour).isSame(moment() , 'day'))
    const tomorrowTodos = todos.filter(todo => moment(todo.hour).isAfter(moment(), 'day')); 

return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.buttonImage} onPress={() => Alert.alert('TodoApp','Hola soy Komi...')}> 
            <Image 
                source={require('../assets/komi.png')}
                style={styles.image}
            />
        </TouchableOpacity>
        { todos.length > 0 
            ?
            <View>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <Text style={styles.title}>Today</Text>
                    <TouchableOpacity onPress={handlePress} >
                        <Text style={{color: '#3486f6'}}>{ isHidden ? 'Show Completed' : 'Hide Completed'}</Text>
                    </TouchableOpacity>
                </View>
                { todayTodos.length > 0 
                    ? <TodoList todosData={todayTodos} />
                    : <Text>Sin nada para hoy</Text>
                }
                <View>
                    <Text style={styles.title}>Tomorrow</Text>
                    { tomorrowTodos.length > 0 
                        ?  <TodoList todosData={tomorrowTodos} />
                        : <NoTaskTomorrow />
                    }
                </View>
                
            </View>
            : 
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',}}>
            <Text>No cuentas con todos agrega uo</Text>
            <Text>Icon apuntando al add</Text>            
            </View>
        }
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