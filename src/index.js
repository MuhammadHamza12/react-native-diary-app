import { Text } from 'components/atoms';
import { Logo, TourDetails } from 'components/molecules';
import { Swiper } from 'components/organisms';
import { Spinner, View } from 'native-base';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, SafeAreaView } from 'react-native';
import { Tour } from 'scenes';
import { tourData } from 'utils';

const App = () => {
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setisLoading(false)
    }, 2000);
  }, [])
 
  return <SafeAreaView style={{ flex: 1}} >
    {
      isLoading ? <Logo name={'Daily Diary'} /> :
        <Tour tourData={tourData} />

    }
  </SafeAreaView>

}
export default App;