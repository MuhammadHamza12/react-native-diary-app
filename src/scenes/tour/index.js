import { TourDetails } from 'components/molecules';
import { Swiper } from 'components/organisms'
import { AuthContext } from 'context';
import React, { useContext, useRef } from 'react'
import { View, Text } from 'react-native'
import LocalService from 'services/LocalService';
import { Async_Constants } from 'utils';

export default function({tourData}){
    const swipeRef = useRef(null);
    const authContext = useContext(AuthContext);
    
    const onChangeTourInfo=(index)=>{
        swipeRef.current.scrollBy(1,true)
        if(index==2) onSkipHandler();
    }
    const onSkipHandler= async () => {
      let cloneContext = {...authContext.userData};
      await LocalService.storeDataAsStringKeyPairs(Async_Constants.isTourCompleted,'true');
      cloneContext['isTourCompleted']=true;
      authContext.setUserData(cloneContext);
    }
    return (
        <Swiper swipeRef={swipeRef} >
        {
          tourData?.map((tour,index)=>(
            <TourDetails
            onSkipHandler={onSkipHandler}
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
