import { Button, Input, Text } from 'components/atoms';
import { Logo } from 'components/molecules';
import { Content, Toast } from 'native-base';
import React, { useState } from 'react'
// import { Input , Item } from 'native-base'
import { useNavigation } from '@react-navigation/native'; 
import { Image, ScrollView, View } from 'react-native'
import styles from './index.style';
import { Screen_Constants } from 'utils';
export default function(props) {
    const [formData, setFormData] = useState({
        email:'',password:''
    });

    
    
    const handleInput = e => {
        let cloneFormData = {...formData};
        cloneFormData[e._dispatchInstances.pendingProps.name]=e.nativeEvent.text;
        setFormData(cloneFormData);
	};
    const handleSubmit=()=>{
        const {email , password} = formData;
        if(email  && password ){
          console.log('everything is fine')
          Toast.show({
            text: "Successfully Login!",
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
    const navigation = useNavigation();
    const onSignInScreenHandler=()=>{
        navigation.navigate(Screen_Constants.SIGNUP_SCENE);
    }
    return (
        <Content contentContainerStyle={styles(props).loginContainer} >
           <Image source={require('../../assets/images/logo/logo.png')} />
           <Text type={'HEAD_TEXT'} text={'Daily Diary'} />
           <Input value={formData.email} handleChange={handleInput} keyboardType='email-address' name='email' preIcon='mail' placeholderText={'Email'} round />
           <Input value={formData.password} handleChange={handleInput} name='password' secureTextEntry type={'password'} preIcon='lock' placeholderText={'Password'} round />
             <Button onClick={handleSubmit} name={'Log In'}  />
           <View style={styles(props).signup_referal} >
               <Text text={`Don't have any account? `} />
               <Text onClick={onSignInScreenHandler} type='ANCHOR_TEXT' text={'Sign In Now'} isTouchOpacity />
           </View>
            </Content>
    )
}
