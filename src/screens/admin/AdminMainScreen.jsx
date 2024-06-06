import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Ionicons from 'react-native-vector-icons/Ionicons'
import UserManagementScreen from "./UserManagementScreen";
import PostManagementScreen from "./PostManagementScreen";
import CommentManagementScreen from "./CommentManagementScreen";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const Tab = createMaterialBottomTabNavigator();

export default AdminMainScreen = ({navigation}) => {

    
    return (
        <Tab.Navigator style={{marginBottom:-20}} initialRouteName="UserManagementScreen" screenOptions={{tabBarLabel:false}}>
          <Tab.Screen navigation={navigation} name="UserManagementScreen" component={UserManagementScreen}
            options={{
              tabBarIcon: ({ props }) => <Ionicons name="people-outline" size={20} />,
            }} />
          <Tab.Screen name="PostManagementScreen" component={PostManagementScreen}
            options={{ 
              tabBarIcon: props => <MaterialCommunityIcons name="post-outline" size={20} />,
            }}  />
          <Tab.Screen name="CommentManagementScreen" component={CommentManagementScreen}
            options={{ 
              tabBarIcon: props => <MaterialCommunityIcons name="comment-text-multiple-outline" size={20} />,
            }}  />
        </Tab.Navigator>
      );
}