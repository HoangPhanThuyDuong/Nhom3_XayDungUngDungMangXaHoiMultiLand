import { useEffect, useState } from "react"
import { Image, StyleSheet, ToastAndroid, TouchableOpacity, View } from "react-native"
import { Text,  TextInput } from "react-native-paper"
import AntDesign from 'react-native-vector-icons/AntDesign'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
export default UserInformationScreen = ({navigation,route}) => {

    const [item, setItem] = useState({});
    const [editable, setEditable] = useState(false);
    const [name,setName] = useState(route.params.item.name);
    const [email,setEmail] = useState(route.params.item.email);
    const [password, setPassword] = useState(route.params.item.password);
    const [avatar,setAvatar] = useState(route.params.item.avatar);

    useEffect(()=>{
        setItem(route.params.item);
        route.params.type == 'view' ? setEditable(false) : setEditable(true);
    },[])

    const GetImage =({source}) => {
        if(source=="" || source == null) {   return;  }
        else {   return (   
            <Image source={{uri:source}} 
            style={{width:'100%', height:250, marginBottom:20,}}/>  )  }
    }
    const openImage = () => {

    }

    const onCancle = () => {
        navigation.goBack();
    }

    const onSubmit = () => {
        if(route.params.type == 'add') 
        {
            onAddNewUser();
            ToastAndroid.show('Thêm thành công',ToastAndroid.LONG);
            navigation.goBack();
        }
        else {
            onUpdateUser();
            ToastAndroid.show('Cập nhật thành công!',ToastAndroid.LONG)
            navigation.goBack();
        }
        
    }

    const onUpdateUser = () => {
        firestore().collection('users').doc(route.params.item.uid).update({
            name:name,
            email:email,
            password:password,
        })
    };

    const onAddNewUser = () => {
        if (email && password) { 
            const time = Date.now().toString();
       
                firestore()
                    .collection('users')
                    .doc(time)
                    .set({
                        name: name,
                        email: email,
                        password: password,
                        avatar: "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg",
                        phoneNumber: "",
                        sex: true,
                        birthday: Date.now(),
                        uid: time,
                        following: 0,
                        follower: 0,
                        })
                    .then(() => { });
        } 
      };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{route.params.title}</Text>
            <View style={styles.item_container} >
                <Text style={styles.item_title}>Tên</Text>
                <TextInput onChangeText={(value=>{setName(value)})} editable={editable} style={styles.item_value} value={name} />
            </View>
            <View style={styles.item_container} >
                <Text style={styles.item_title}>Email</Text>
                <TextInput onChangeText={(value=>{setEmail(value)})} editable={editable} style={styles.item_value} value={email} />
            </View>
            <View  style={styles.item_container} >
                <Text style={styles.item_title}>Mật khẩu</Text>
                <TextInput onChangeText={(value=>{setPassword(value)})} editable={editable} style={styles.item_value} value={password} />
            </View>
            <View style={styles.item_container} >
                <Text style={styles.item_title}>Avatar</Text>
                {
                    route.params.type != 'view' 
                    ?
                    <TouchableOpacity onPress={openImage} style={styles.photo}>
                        <AntDesign name="picture" size={30}      />
                    </TouchableOpacity>
                    :
                    null
                }
            </View>
            <GetImage source={avatar} />
           {
            route.params.type != 'view'
            ?
            <View style={{...styles.item_container,alignSelf:'center'}}>
                <TouchableOpacity activeOpacity={0.5} style={styles.btn_button} onPress={onCancle}>
                    <Text style={styles.btn_title}>Hủy</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.5} style={styles.btn_button} onPress={onSubmit}>
                    <Text style={styles.btn_title}>Lưu</Text>
                </TouchableOpacity>
            </View>
            :
            null
           }
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        margin:20,
    },
    title: {
        margin:30,
        paddingBottom:5,
        fontSize:20,
        textAlign:'center',
        fontWeight:'bold',
        color:'#ff22d0',
        borderBottomColor:'#ddd',
        borderBottomWidth:2,
    },
    item_container: {
        flexDirection:'row',
        alignItems:'center',
        marginVertical:10,
    },
    item_title: {
        fontSize:14,
        fontWeight:'bold',
        minWidth:50,
        marginRight:10,
    },
    item_value: {
        fontSize:14,
        flex:1,
    },
    btn_button: {
        width:100,
        padding:10,
        margin:2,
        backgroundColor:'#2222ff',
        borderRadius:25,
    },
    btn_title: {
        fontSize:16,
        fontWeight:'bold',
        color:'#fff',
        textAlign:'center',
    }
})