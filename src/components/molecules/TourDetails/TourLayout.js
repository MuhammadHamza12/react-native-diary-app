import React from 'react'
import { Text } from 'components/atoms';
import { View } from 'react-native'
import styles from './TourLayout.style';

export default function TourDetail(props) {
    const { children } = props;
    return (
        <View style={styles(props).tourLayoutContainer}>
            <View>
                <Text type={'ANCHOR_TEXT'} position='flex-end' text={'Skip Tour'} />
                {children}
            </View>
        </View>
    )
}