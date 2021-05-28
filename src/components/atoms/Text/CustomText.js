import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import {Button} from 'native-base';
import styles from './CustomText.style';
export default function CustomText(props) {
    const { text , type , position , onClick , isTouchOpacity=false } = props;
    return isTouchOpacity ? <TouchableOpacity> 
        <Text onPress={onClick} style={styles(props).textContainer} >{ text || 'Default name' }</Text>
    </TouchableOpacity> : <Text onPress={onClick} style={styles(props).textContainer} >{ text || 'Default name' }</Text>
  
}
