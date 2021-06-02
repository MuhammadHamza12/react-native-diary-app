import { useNavigation } from '@react-navigation/core';
import { Button, Input, Text } from 'components/atoms';
import { Logo } from 'components/molecules';
import { Content, Toast } from 'native-base';
import React, { useState } from 'react'
// import { Input , Item } from 'native-base'

import { Image, ScrollView, View } from 'react-native'
import LocalService from 'services/LocalService';
import { Async_Constants, Screen_Constants } from 'utils';
import styles from './index.style';
export default function(props) {
    const [isLoading, setIsLoading] = useState(false);
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
    const handleSubmit= async ()=> {
        const {email , username , password} = formData;
        if(email && username && password ){
            let user = {
                email , username , password
            };
            let database_users = await LocalService.getDataAsObject(Async_Constants.database_users);
            setIsLoading(true);
            setTimeout( async () => {
                if(database_users !== null){
                    let clone_database_users = [...database_users];
                    if(clone_database_users.some((user)=> user.email == email)){
                        Toast.show({
                            text: "Email exist!",
                            buttonText: "Okay",
                            type: "warning"
                        })
            setIsLoading(false);
                        return;
                    }else{
                        clone_database_users.push(user);
                        let set_database_user = await LocalService.storeDataAsObject(Async_Constants.database_users,clone_database_users);
                        console.log('when have some record set_datbase_user success');
                    }
                }  
                if(database_users == null || typeof database_users === 'undefined'){
                    let users = [];
                    users.push(user);
                    let set_datbase_user = await LocalService.storeDataAsObject(Async_Constants.database_users,users);
                    console.log('when zero record set_datbase_user success');
                }
                console.log('everything is fine')
                onLogInScreenHandler();
                Toast.show({
                    text: "Successfully SignIn!",
                    buttonText: "Okay",
                    type: "success"
                })

            setIsLoading(false);
            }, 3000);
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
           <Input value={formData.username} handleChange={handleInput} keyboardType={'default'} name='username' preIcon='person' placeholderText={'Username'} round />
           <Input value={formData.password} handleChange={handleInput} name='password' secureTextEntry type={'password'} preIcon='lock' placeholderText={'Password'} round />
           <Button isLoading={isLoading} onClick={handleSubmit} name={'Sign In'}  />
           <View style={styles(props).login_referal} >
               <Text text={`Have an account ? `} />
               <Text onClick={onLogInScreenHandler} type={'ANCHOR_TEXT'} text={`Login now`} />
           </View>
            </Content>
    )
}
