import React from 'react'
import { View, Text } from 'react-native'
import {Button} from 'native-base';
import styles from './CustomText.style';
export default function CustomText(props) {
    const { text , type , position } = props;
    return <Text style={styles(props).textContainer} >{ text || 'Default name' }</Text>
}
