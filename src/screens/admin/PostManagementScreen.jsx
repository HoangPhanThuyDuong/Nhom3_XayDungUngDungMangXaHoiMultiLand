import { useEffect, useState } from "react"
import { FlatList, StyleSheet, TouchableHighlight, View } from "react-native"
import firestore from '@react-native-firebase/firestore'
import { Text } from "react-native-paper";
import OneUserItemComponent from "../../components/admin/OneUserItemComponent";
import Ionicons from 'react-native-vector-icons/Ionicons'
import OnePostItemComponent from "../../components/admin/OnePostItemComponent";

export default PostManagementScreen = ({navigation}) => {

    const [userData, setUserData] = useState();
    
    useEffect(()=>{
        let arr = []
        firestore().collection('posts').onSnapshot(document => {
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
            <Text style={styles.title}>QUẢN LÝ BÀI VIẾT</Text>
          
            <FlatList style={styles.container} data={userData} 
                renderItem={({item})=>(<OnePostItemComponent navigation={navigation} item={item} />)} />
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