import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import VectorIcon from '../utils/VectorIcon';
import {Colors} from '../utils/Colors';
import {TabData} from '../data/TabData';
import { View } from 'react-native';



const Tab = createMaterialBottomTabNavigator();

const BottomTabbar = ({navigation}) => {
  return (
    <>
      <Tab.Navigator style={{height:150}}
      backBehavior='history'
        screenOptions={() => ({
          tabBarShowLabel: false,
          tabBarActiveTintColor: Colors.primaryColor,
          tabBarInactiveTintColor: Colors.grey,
        })} barStyle={{height:60, marginBottom:0 }}>

        {TabData.map(tab => (
          <Tab.Screen 

          
                            key={tab.id}
                            name={tab.name}
                            navigation={navigation}
                            component={tab.route}
                            style = {{backgroundColor:tab.backgroundColor}}
                            options={{
                              tabBarIcon: ({color, focused}) => (
                               <View>
                                 <VectorIcon
                                  type={tab.iconType}
                                  name={tab.iconName}
                                  size={tab.unFocusSize}
                                  color='#a5a'
                                  
                                  style={focused?{width:'100%',height:'100%'}:{}}
                                />
                               </View>
                              ),
                              tabBarLabel:false,
                                                         
            }}
          />
        ))}
      </Tab.Navigator>
    </>
  );
};

export default BottomTabbar;
