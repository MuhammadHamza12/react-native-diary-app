import { Input, Item } from 'native-base'
import React from 'react'
import { View, Text } from 'react-native'
import styles from './CustomTextInput.style';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colors } from 'styles';

export default function CustomTextInput(props) {
  const { name , round , placeholderText , preIcon , secureTextEntry , keyboardType , handleChange , value } = props;  
  return  <Item style={styles(props).inputContainer} rounded={round} >
           {
             preIcon &&  <Icon name={preIcon} size={30} color={Colors.SECONDARY} />
           } 
            <Input value={value} onChange={handleChange} keyboardType={keyboardType} name={name} secureTextEntry={secureTextEntry} placeholder={placeholderText || 'Default Text'}/>
            </Item>
    
}
