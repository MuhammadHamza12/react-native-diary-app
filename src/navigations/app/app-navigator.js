import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthContext } from 'context';
import * as React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LocalService from 'services/LocalService';
import { Colors } from 'styles';
import { Async_Constants } from 'utils';
import { HomeStack, NotesStack } from '../../navigations/navigator/stack';


const Tab = createBottomTabNavigator();
export default function AppNavigator(props) {
  const authContext = React.useContext(AuthContext);
  const logOut = async () => {
 

    let clone = { ...authContext.userData };
    clone['isAuth'] = false;
    authContext.setUserData(clone);
    await LocalService.storeDataAsObject(Async_Constants.auth_details,clone);
  }
  return (
    <Tab.Navigator
    initialRouteName={'Home'} 
    tabBarOptions={{
       activeTintColor: Colors.WHITE,
       inactiveTintColor: Colors.GRAY_LIGHT,
       activeBackgroundColor: Colors.PRIMARY,
       tabStyle:{borderRadius:20, margin:1},
           style: {
             borderRadius:20,
                 backgroundColor: Colors.SECONDARY,
                 paddingBottom: 3
           }
          }}
    >
      <Tab.Screen
        options={{
          tabBarIcon: ({ tintColor }) => (
            <Icon style={[tintColor]} name={'home'} size={30} color={Colors.WHITE} />
          ),
        }}
        name="Home"
        component={HomeStack}
      />
      <Tab.Screen
      initialParams={
        {
          logOut
        }
      }
        options={{
          tabBarIcon: ({ tintColor }) => (
            <Icon style={[tintColor]} name={'list'} size={30} color={Colors.WHITE} />
          ),
        }}
        name="All"
        component={NotesStack}
      />
    </Tab.Navigator>
  );
}
