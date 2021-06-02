import React from 'react'
import { View, Text } from 'react-native'
import Animatable from 'react-native-animatable';

export default function (props) {
    const { ...rest} = props;
    return (
       <Animatable.View
       {...rest}
       useNativeDriver
       duration={3000}
       animation='fadeIn'
       >
           {props.children}
       </Animatable.View>
    )
}
