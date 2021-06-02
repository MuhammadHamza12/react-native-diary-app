import { AuthContext } from 'context';
import { AppNavigator, AuthNavigator } from 'navigations';
import React, { useContext, useEffect } from 'react';
import { Tour } from 'scenes';
import LocalService from 'services/LocalService';
import { tourData } from 'utils';

export default function (props) {
    const authContext = useContext(AuthContext);
    const { userData } = authContext;
   
    console.log('is Auth Context',authContext);
    return !userData.isTourCompleted ? 
    <Tour 
    tourData={tourData} 
    /> : !userData.isAuth ? 
    <AuthNavigator /> : 
    <AppNavigator />
}
