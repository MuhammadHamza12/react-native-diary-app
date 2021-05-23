import { Text } from 'components/atoms'
import React from 'react'
import styles from './Logo.style';
import { View, Image } from 'react-native'

export default function Logo(props) {
    const {name}= props;
    return (
        <View style={styles(props).logoContainer} >
            <Image source={require('../../../assets/images/logo/logo.png')} />
            <Text text={name} />
        </View>
    )
}
