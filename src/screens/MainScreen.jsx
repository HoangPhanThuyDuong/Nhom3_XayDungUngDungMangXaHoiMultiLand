import React from 'react';
import Header from '../components/Header';
import BottomTabbar from '../navigation/BottomTabbar';
import UserManagementScreen from './admin/UserManagementScreen';
import auth from '@react-native-firebase/auth';
import AdminMainScreen from './admin/AdminMainScreen';

const MainScreen = ({navigation}) => {

    return (
  
        auth().currentUser.email != 'account2@gmail.com'
        ?
        <>
        <Header navigation={navigation} /> 
        <BottomTabbar navigation={navigation}  /> 
        </>
        :
      <AdminMainScreen navigation={navigation}  />
  
   
  );
};

export default MainScreen;
