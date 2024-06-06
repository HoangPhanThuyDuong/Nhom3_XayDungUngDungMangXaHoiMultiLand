import { useEffect, useState } from "react"
import { FlatList, StyleSheet, TouchableHighlight, View } from "react-native"
import firestore from '@react-native-firebase/firestore'
import { Text } from "react-native-paper";
import OneUserItemComponent from "../../components/admin/OneUserItemComponent";
import Ionicons from 'react-native-vector-icons/Ionicons'

export default UserManagementScreen = ({navigation}) => {

    const [userData, setUserData] = useState();
    
    useEffect(()=>{
        let arr = []
        firestore().collection('users').onSnapshot(document => {
            document.forEach(item =>{
                arr.push(item.data())
            });
            setUserData(arr);
        })
    },[])
    
    const onAddNewUser = () => {
        navigation.navigate({name:'UserInformationScreen',params:{type:'add', item:{uid:null}, title:'Thêm tài khoản mới'}})
    }
   
    return (
        <View>
            <Text style={styles.title}>QUẢN LÝ USER</Text>
            <View style={{padding:10,flexDirection:'row',alignItems:'center',justifyContent:'flex-end', marginRight:20}}>
            <Text style={{fontSize:18,color:'#888', fontWeight:'bold', paddingRight:10}}>Thêm mới user</Text>
            <TouchableHighlight style={{padding:5}} onPress={onAddNewUser} underlayColor='#ccc'>
                <Ionicons name='add-circle-outline' size={30} />
            </TouchableHighlight>
            </View>
            <FlatList style={styles.container} data={userData} 
                renderItem={({item})=>(<OneUserItemComponent navigation={navigation} item={item} />)} />
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        margin:40,
        paddingBottom:5,
        fontSize:20,
        textAlign:'center',
        fontWeight:'bold',
        color:'#ff22d0',
        borderBottomColor:'#ddd',
        borderBottomWidth:2,
    },
    container: {
        marginHorizontal:10,
    },
   
})