import {  StyleSheet, TouchableHighlight, View, Text, Alert } from "react-native"
import firestore from '@react-native-firebase/firestore'

import AntDesign from 'react-native-vector-icons/AntDesign'

export default OnePostItemComponent = ({navigation,item}) => {

    const onEditUser = (type,title) => {
        navigation.navigate({name:'UserInformationScreen',params:{item:item, type:type, title:title}})
    }

    const onShowDeleted = () => {
        Alert.alert('Xóa người dùng','Bạn có chắc chắn muốn xóa người dùng ' + `${item.name}` + " không ?"+
        ' Thao toán này sẽ xóa hoàn toàn người dùng ra khỏi cơ sở sửa liệu!',[{text:'Xóa',onPress:onDeleteUser}, {text:'Hủy',onPress:()=>{}}])  
    }


    const onDeleteUser = () => {
        firestore().collection('users').doc(item.uid).delete();
        ToastAndroid.show('Xóa thành công',ToastAndroid.LONG)
    }

  

    return (
        <TouchableHighlight onPress={()=>{onEditUser('view', 'Thông tin tài khoản')}} underlayColor='#eee'>
            <View style={styles.item_container} >
            <View style={{flex:1}}>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                    <Text>Tên người dùng: </Text>
                    <Text>{item.userName}</Text>
                </View>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                    <Text>Nội dung: </Text>
                    <Text>{item.content.toString().slice(0, 30)+"..."}</Text>
                </View>
            </View>
            <View style={styles.item_container_child}>
                    <TouchableHighlight onPress={onShowDeleted} underlayColor='#bbb'  style={{...styles.item_container_child, padding:5}} >
                        <AntDesign name='delete' size={20} />
                    </TouchableHighlight>
                    <TouchableHighlight onPress={()=>{onEditUser('edit','Chỉnh sửa thông tin')}} underlayColor='#bbb' style={{...styles.item_container_child, padding:5}} >
                        <AntDesign name='edit' size={20} />
                    </TouchableHighlight>
               </View>
        </View>
        </TouchableHighlight>
        )
}

const styles = StyleSheet.create({
    item_container: {
        flexDirection:'row', 
        alignItems:'center', 
        marginTop:30,
        paddingBottom:5,
        borderBottomWidth:1,
        borderBottomColor:'#ccc' 
    },
    item_container_child: {
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingHorizontal:10,
    },
})