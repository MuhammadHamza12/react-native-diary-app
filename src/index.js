import { Text } from 'components/atoms';
import { Logo, TourDetails } from 'components/molecules';
import { BasicSetup, Swiper } from 'components/organisms';
import { Root, Spinner, View } from 'native-base';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, SafeAreaView } from 'react-native';
import { Tour } from 'scenes';
import { tourData } from 'utils';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { GlobalAuthContext, GlobalNotesContext } from './context';
import { Navigator } from 'navigations';
const App = () => {
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setisLoading(false)
    }, 2000);
  }, [])

  return (
    <Root>
      <GlobalAuthContext>
        <GlobalNotesContext>
          <BasicSetup>
            <NavigationContainer>
              <SafeAreaView style={{ flex: 1 }} >
                {
                  isLoading ? <Logo name={'Daily Diary'} /> :
                    <Navigator />
                }
              </SafeAreaView>
            </NavigationContainer>
          </BasicSetup>
        </GlobalNotesContext>
      </GlobalAuthContext>
    </Root>
  )
}
export default App;