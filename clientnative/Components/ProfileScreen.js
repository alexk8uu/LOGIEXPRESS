import React, {useState, useEffect, useContext } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    SafeAreaView
} from 'react-native';



const ProfileScreen = () => {
    return (
        <SafeAreaView style={{flex:1, backgroundColor:'#fff'}}>
            <ScrollView 
            style={styles.container}
            contentContainerStyle={{justifyContent:'center', alignItems:'center'}}
            showsVerticalScrollIndicator={false}>
                <Image style={styles.userImg} source={require('./Utils/foto1.jpg')}/>
                <Text style={styles.userName}>Bill Gate</Text>
                <View style={styles.userBtnWrapper}>
                  <TouchableOpacity style={styles.userBtn}>
                    <Text style={styles.userBtnTxt}>Datos Personales</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.userBtn}>
                    <Text style={styles.userBtnTxt}>Historial de Viaje</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.userBtn}>
                    <Text style={styles.userBtnTxt}>Datos Personales</Text>
                  </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}


export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 20,
    },
    userImg: {
      height: 150,
      width: 150,
      borderRadius: 75,
    },
    userName: {
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: 10,
      marginBottom: 10,
    },
    aboutUser: {
      fontSize: 12,
      fontWeight: '600',
      color: '#666',
      textAlign: 'center',
      marginBottom: 10,
    },
    userBtnWrapper: {
      justifyContent: 'center',
      flexDirection: 'row',
      maxWidth: '100%',
      flex:1,
      marginBottom: 10,
    },
    userBtn: {
      borderColor: '#2e64e5',
      borderWidth: 2,
      borderRadius: 3,
      paddingVertical: 8,
      paddingHorizontal: 12,
      marginHorizontal: 5,
      width: '45%',
      justifyContent: 'center',
      flex:1,
      
    },
    userBtnTxt: {
      color: '#2e64e5',
      textAlign: 'center',
      fontSize: 15,
    },
    userInfoWrapper: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%',
      marginVertical: 20,
    },
    userInfoItem: {
      justifyContent: 'center',
    },
    userInfoTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 5,
      textAlign: 'center',
    },
    userInfoSubTitle: {
      fontSize: 12,
      color: '#666',
      textAlign: 'center',
    },
  });