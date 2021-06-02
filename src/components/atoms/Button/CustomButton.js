import React from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import {Button} from 'native-base';
import styles from './CustomButton.style';
import { Colors } from 'styles';
export default function CustomButton(props) {
    const { name , onClick , isLoading } = props;
    return (
        <Button onPress={onClick} style={styles(props).buttonContainer} >
            {isLoading && <ActivityIndicator size={'large'} color={Colors.WHITE} /> } 
           {name && !isLoading && <Text style={styles(props).buttonText} >{ name || 'Default name' }</Text>} 
        </Button>
    )
}
