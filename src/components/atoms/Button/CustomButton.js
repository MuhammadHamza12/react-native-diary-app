import React from 'react'
import { View, Text } from 'react-native'
import {Button} from 'native-base';
import styles from './CustomButton.style';
export default function CustomButton(props) {
    const { name , onClick } = props;
    return (
        <Button onPress={onClick} style={styles(props).buttonContainer} >
           {name && <Text style={styles(props).buttonText} >{ name || 'Default name' }</Text>} 
        </Button>
    )
}
