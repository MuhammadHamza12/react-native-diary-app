import { useNavigation } from '@react-navigation/core';
import { Button, Input, Text } from 'components/atoms';
import { Logo } from 'components/molecules';
import { Content, Toast } from 'native-base';
import React, { useState } from 'react'
// import { Input , Item } from 'native-base'

import { Image, ScrollView, View } from 'react-native'
import { Screen_Constants } from 'utils';
import styles from './index.style';
export default function(props) {
    const [formData, setFormData] = useState({
        username:'',email:'',password:''
    });

    const navigation = useNavigation();
    const onLogInScreenHandler=()=>{
        navigation.navigate(Screen_Constants.LOGIN_SCENE);
    }
    const handleInput = e => {
        let cloneFormData = {...formData};
        cloneFormData[e._dispatchInstances.pendingProps.name]=e.nativeEvent.text;
        setFormData(cloneFormData);
	};
    const handleSubmit=()=>{
        const {email , username , password} = formData;
        if(email && username && password ){
          console.log('everything is fine')
          Toast.show({
            text: "Successfully SignIn!",
            buttonText: "Okay",
            type: "success"
        })
        }else{
            Toast.show({
                text: "Field required!",
                buttonText: "Okay",
                type: "warning"
            })
        }
        console.log('form Data: ',formData);
    }
    return (
        <Content contentContainerStyle={styles(props).loginContainer} >
           <Image source={require('../../assets/images/logo/logo.png')} />
           <Text type={'HEAD_TEXT'} text={'Daily Diary'} />
           <Input value={formData.email} handleChange={handleInput} keyboardType={'email-address'} name='email' preIcon='mail' placeholderText={'Email'} round />
           <Input value={formData.username} handleChange={handleInput} keyboardType={'default'} name='username' preIcon='mail' placeholderText={'Username'} round />
           <Input value={formData.password} handleChange={handleInput} name='password' secureTextEntry type={'password'} preIcon='lock' placeholderText={'Password'} round />
           <Button onClick={handleSubmit} name={'Sign In'}  />
           <View style={styles(props).login_referal} >
               <Text text={`Have an account ? `} />
               <Text onClick={onLogInScreenHandler} type={'ANCHOR_TEXT'} text={`Login now`} />
           </View>
            </Content>
    )
}
