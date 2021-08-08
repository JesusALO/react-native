import React from 'react'
import { Image } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import BadgesStack from './BadgesStack'
import UserStack from '../UsersScreen/UserStack'
import Favorites from '../Favorites/Favorites'
import Colors from '../../res/Colors'

const Tab = createBottomTabNavigator();

const BadgesTabNavigator = () => {
    return(
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                headerStyle:{
                    backgroundColor: Colors.blackPearl,
                    shadowColor: Colors.blackPearl,
                },
                headerTintColor: Colors.white,
            }}
        >
            <Tab.Screen 
                name="User"
                component={UserStack}
                options={{
                    tabBarIcon: ({size, color}) => (
                            <Image style={{tintColor: color, width: size, height: size}} 
                            source={require('../../assets/profile.png')}
                        />
                    ),
                }}
            />
            <Tab.Screen 
                name="BadgesStack"
                component={BadgesStack}
                options={{
                    tabBarIcon: ({size, color}) => (
                            <Image style={{tintColor: color, width: size, height: size}} 
                            source={require('../../assets/home.png')}
                        />
                    ),
                }}
            />
            <Tab.Screen 
                name="Favorites"
                component={Favorites}
                options={{
                    tabBarIcon: ({size, color}) => (
                            <Image style={{tintColor: color, width: size, height: size}} 
                            source={require('../../assets/notFavorite.png')}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default BadgesTabNavigator;