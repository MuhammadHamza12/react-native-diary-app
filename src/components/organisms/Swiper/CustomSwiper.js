import React from 'react';
import { View } from 'react-native';
import Swiper from 'react-native-swiper';
import styles from './CustomSwipter.style';

export default function CustomSwiper(props) {
    const { swipeRef , children } = props;
    return (
        <Swiper
        loop={false}
        removeClippedSubviews={false}        
            ref={swipeRef}
            activeDot={
                <View style={styles(props).activeDotsStyle} />
            }
            showsButtons={false}>
            {children}
        
        </Swiper>
    )
}
