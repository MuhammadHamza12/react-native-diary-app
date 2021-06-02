import { Button, Input, Text } from 'components/atoms';
import { Logo } from 'components/molecules';
import { Content, Toast } from 'native-base';
import React, { useContext, useState } from 'react'
// import { Input , Item } from 'native-base'
import { useNavigation } from '@react-navigation/native';
import { Image, ScrollView, View } from 'react-native'
import styles from './index.style';
import { Async_Constants, Screen_Constants } from 'utils';
import LocalService from 'services/LocalService';
import { AuthContext } from 'context';
export default function (props) {
    const [isLoading, setIsLoading] = useState(false);
    const authContext = useContext(AuthContext);
    const [formData, setFormData] = useState({
        email: '', password: ''
    });



    const handleInput = e => {
        let cloneFormData = { ...formData };
        cloneFormData[e._dispatchInstances.pendingProps.name] = e.nativeEvent.text;
        setFormData(cloneFormData);
    };
    const handleSubmit = async () => {
        let cloneAuthContext = { ...authContext.userData };
        const { email, password } = formData;
        if (email && password) {
            setIsLoading(true);
            let database_users = await LocalService.getDataAsObject(Async_Constants.database_users);
            let localAuthContext = await LocalService.getDataAsObject(Async_Constants.auth_details);
            setTimeout(async () => {
                if (localAuthContext !== null && database_users !== null && typeof database_users !== 'undefined' && database_users.some((user) => user.email.toLowerCase() == email.toLowerCase() && user.password === password)) {
                    console.log('update during login: ',cloneLocalAuth)
                    authContext.setUserData({ ...cloneAuthContext, isAuth: true })
                    let cloneLocalAuth = {...cloneAuthContext};
                    
                    cloneLocalAuth['isAuth']=true;
                    console.log('update during login: ',cloneLocalAuth)
                   let setAuthData = await LocalService.storeDataAsObject(Async_Constants.auth_details,cloneLocalAuth);
                    Toast.show({
                        text: "Successfully Login!",
                        buttonText: "Okay",
                        type: "success"
                    })
                    setIsLoading(false);
                    return;
                } else {
                    Toast.show({
                        text: "Invalid Credentials",
                        buttonText: "Okay",
                        type: 'danger'
                    })
                    setIsLoading(false);
                    return;
                }
            }, 2000);
            console.log('data_base user: ', database_users);
            console.log('everything is fine')

        } else {
            setIsLoading(false);

            Toast.show({
                text: "Field required!",
                buttonText: "Okay",
                type: "warning"
            })
        }
        console.log('form Data: ', formData);
    }
    const navigation = useNavigation();
    const onSignInScreenHandler = () => {
        navigation.navigate(Screen_Constants.SIGNUP_SCENE);
    }
    return (
        <Content contentContainerStyle={styles(props).loginContainer} >
            <Image source={require('../../assets/images/logo/logo.png')} />
            <Text type={'HEAD_TEXT'} text={'Daily Diary'} />
            <Input value={formData.email} handleChange={handleInput} keyboardType='email-address' name='email' preIcon='mail' placeholderText={'Email'} round />
            <Input value={formData.password} handleChange={handleInput} name='password' secureTextEntry type={'password'} preIcon='lock' placeholderText={'Password'} round />
            <Button isLoading={isLoading} onClick={handleSubmit} name={'Log In'} />
            <View style={styles(props).signup_referal} >
                <Text text={`Don't have any account? `} />
                <Text onClick={onSignInScreenHandler} type='ANCHOR_TEXT' text={'Sign In Now'} isTouchOpacity />
            </View>
        </Content>
    )
}
