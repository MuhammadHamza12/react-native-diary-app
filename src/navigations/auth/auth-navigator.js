import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import React from 'react';
import { Login, SignUp } from 'scenes';
import { Screen_Constants } from 'utils';

const Stack = createStackNavigator();

export default function AuthNavigator(props) {
    return (
        <Stack.Navigator
            screenOptions={{
                gestureEnabled: true,
                cardOverlayEnabled: true,
                ...TransitionPresets.SlideFromRightIOS,
            }}  
        >
            <Stack.Screen
                options={{
                    headerShown: false, gestureEnabled: true, gestureDirection: 'horizontal',
                }} name={Screen_Constants.LOGIN_SCENE} component={Login} />
            <Stack.Screen options={{
                headerShown: false,
                gestureEnabled: true,
                gestureDirection:
                    'horizontal'
            }}
                name={Screen_Constants.SIGNUP_SCENE}
                component={SignUp}
            />
        </Stack.Navigator>
    );
}