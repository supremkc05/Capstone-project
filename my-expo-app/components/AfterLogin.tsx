import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faExpand, faGear, faFile} from '@fortawesome/free-solid-svg-icons';
import Home from './Home';
import AllData from './AllData';
import Settings from './Settings';




const Tab = createBottomTabNavigator();

export default function AfterLogin() {
  return (
<Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#021F61',
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: 'bold',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={faExpand} size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="AllData"
        component={AllData}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={faFile} size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={faGear} size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
