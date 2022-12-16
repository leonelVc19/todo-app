import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import AddTodo from './screens/AddTodo';
import Test from './screens/Test';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Stack = createNativeStackNavigator();

function HomeScreen() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <Home />
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Add')}>
        <Text style={styles.plus}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );  
}

export default function App() {

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='HomeScreen' component={HomeScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen name='Add' component={AddTodo}
            options={{presentation: "modal", headerTitle: 'Task'}}
          />
          <Stack.Screen name='Test' component={Test}
          options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  button: {
    width: 55,
    height: 55,
    borderRadius: 35,
    backgroundColor: '#000',
    position: 'absolute',
    bottom: 60, 
    right: 20,
    shadowColor: '#000',
    shadowOffset: {
        width: 88,
        height: 2,
    },
    shadowOpacity: .5,
    shadowRadius: 5,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plus: {
      fontSize: 50,
      color: '#FFFFFF',
      position: 'absolute',
  }
});