// ProfileDrawerNavigator.tsx
import React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Dimensions } from 'react-native';

import ProfileScreen from './ProfileScreen';
import EditProfileScreen from './EditProfileScreen';
import ChangeClassesScreen from './ChangeClassesScreen';

const Drawer = createDrawerNavigator();

export default function ProfileDrawerNavigator() {
  return (
    <Drawer.Navigator
      //  Custom Drawer Config
      initialRouteName="Profile Home"
      screenOptions={{
        headerShown: false,
        drawerType: 'back', // 'back' ensures the drawer slides over the content
        drawerPosition: 'right', // sets drawer to open from the right
        overlayColor: 'rgba(0,0,0,0.3)', // adds overlay background
        drawerStyle: {
          width: Dimensions.get('window').width * 0.6, // ~60% screen width
        },
      }}
      // Security Settings can be added to the drawer
    >
      <Drawer.Screen name="Profile Home" component={ProfileScreen} />
      <Drawer.Screen name="Edit Profile" component={EditProfileScreen} />
      <Drawer.Screen name="Change Classes" component={ChangeClassesScreen} />
    </Drawer.Navigator>
  );
}
