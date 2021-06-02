import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AIcon from 'react-native-vector-icons/AntDesign';
import { AllNotes } from 'scenes';
import { Colors } from 'styles';
const AllNotesStack = createStackNavigator();
export default function (props) {
       console.log('notes props: ',props)
       const { logOut } = props.route.params;
    return (<AllNotesStack.Navigator>
        <AllNotesStack.Screen
            options={{
                headerRight:()=> <TouchableOpacity onPress={logOut} >
                    <AIcon style={{padding:10}} name='logout' size={30} color={Colors.WHITE} />
                </TouchableOpacity>,
                headerLeft: () => <Icon style={{ padding: 10 }} color={Colors.WHITE} size={30} name='my-library-books' />,
                headerTintColor: Colors.WHITE,
                headerStyle: {
                    borderBottomEndRadius: 15,
                    backgroundColor: Colors.SECONDARY
                },
            }}
            name="All Notes"
            component={AllNotes}
        />

    </AllNotesStack.Navigator>)
}