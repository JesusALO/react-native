import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import BadgesTabNavigator from '../BadgesScreen/BadgesTabNavigator'
import Login from '../UsersScreen/Login'
import Signup from '../UsersScreen/Signup'
import BadgesEdit from '../BadgesEdit/BadgesEdit'
import Colors from '../../res/Colors'
import BadgesDetail from '../BadgesDetail/BadgesDetail'

const Stack = createStackNavigator();

const AppStack = () => {
    return(
        <Stack.Navigator 
            screenOptions={{
                headerShown: false,
                headerStyle: {
                    BackgroundColor: Colors.charade,
                    shadowColor: Colors.charade,
                },
                headerTintColor: Colors.white,
            }}>

            <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
            />
            <Stack.Screen
            name="Signup"
            component={Signup}
            options={{headerShown: false}}
            />

            <Stack.Screen name="BadgesEdit" component={BadgesEdit} />
            <Stack.Screen name="BadgesDetail" component={BadgesDetail} />
            <Stack.Screen name="FavoritesDetails" component={BadgesDetail} />
            <Stack.Screen name="BadgesTabNavigator" component={BadgesTabNavigator} />
        </Stack.Navigator>
    );
};

export default AppStack;