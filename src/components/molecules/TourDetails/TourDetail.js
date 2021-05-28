import React from 'react'
import { Button, Text } from 'components/atoms';
import { View, Image } from 'react-native'
import TourLayout from './TourLayout';
import styles from './TourDetail.style';

export default function TourDetail(props) {
    const { id ,titleText, subtitle, buttonName, imgRelativeURL, onChangeTourInfo , onSkipHandler } = props;
    return <TourLayout onSkipHandler={onSkipHandler} >

        <View key={id} style={styles(props).tourDetailContainer} >
            <Image
                source={imgRelativeURL}
            />
            <Text type={'HEAD_TEXT'} text={titleText} />

            <Text position='center' text={subtitle} />

            <Button onClick={()=>onChangeTourInfo(id)} position={'center'} name={buttonName} fullWidth />

        </View>
    </TourLayout>


}
