import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { AllNotes } from 'scenes';
import { Colors } from 'styles';
const AllNotesStack = createStackNavigator();
export default function (props) {

    return (<AllNotesStack.Navigator>
        <AllNotesStack.Screen
            options={{
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