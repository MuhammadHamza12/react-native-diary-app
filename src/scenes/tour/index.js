import { TourDetails } from 'components/molecules';
import { Swiper } from 'components/organisms'
import React, { useRef } from 'react'
import { View, Text } from 'react-native'

export default function({tourData}){
    const swipeRef = useRef(null);
  
    const onChangeTourInfo=()=>{
        swipeRef.current.scrollBy(1,true)
    }
    return (
        <Swiper swipeRef={swipeRef} >
        {
          tourData?.map((tour,index)=>(
            <TourDetails
            id={index}
            onChangeTourInfo={onChangeTourInfo}
            subtitle={tour.subtitle} 
            imgRelativeURL={tour.imgRelativeURL}
            buttonName={tour.buttonName}
            titleText={tour.titleText}
            />
          ))
        }
        </Swiper> 
    )
}
