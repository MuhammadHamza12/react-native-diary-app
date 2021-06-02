import { CommonActions } from '@react-navigation/routers';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import { NotesContext } from 'context';
import { Toast } from 'native-base';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import  Icon from 'react-native-vector-icons/MaterialIcons';
import { Diary, Home } from 'scenes';
import LocalService from 'services/LocalService';
import { Colors } from 'styles';
import { Async_Constants } from 'utils';

const HomeStack = createStackNavigator(); 
export default function (props) {
  console.log('navigation props: home ', props);
  const [html, setHtml] = React.useState('');
  const notesContext = React.useContext(NotesContext);
  const { notes } = React.useContext(NotesContext);
  const onUpdateParticularDiary = () => {
    let cloneNotes = { ...notesContext }
    console.log('inital context : ', notesContext)
    let getNotes = [...cloneNotes.notes.notesData];
    let getUpdateIndex = getNotes.findIndex((note) => note.id == notesContext.notes.selectedNote.id);
    let getFilterResult = getNotes.filter((note)=> note.date === notesContext.notes.selectedDate);
    getNotes[getUpdateIndex] = { ...notes.selectedNote };
    console.log('UPDATE: ', getNotes);
    cloneNotes['notes']['notesData'] = getNotes;
    cloneNotes['notes']['filteredResults'] = [...getFilterResult];
    console.log('clone Notes: ', cloneNotes)

    notesContext.setNotesData(cloneNotes.notes);
    LocalService.storeDataAsObject(Async_Constants.notes_details,cloneNotes.notes)
    props.navigation.dispatch(
        CommonActions.goBack()
    );
    }
  const onAddNoteHandler = () => {
    let cloneNotes = { ...notesContext.notes }
    let getNotes = [...cloneNotes.notesData];
    let note = {
      id: new Date().getTime(),
      noteText: html,
      date:cloneNotes['selectedDate']
    }
    setHtml('')
    getNotes.push(note);
    cloneNotes['notesData'] = [...getNotes];
    cloneNotes['filteredResults'] = [...getNotes];
    cloneNotes['selectedNote'] = {};
    console.log('checkk add notes: ', cloneNotes)
    LocalService.storeDataAsObject(Async_Constants.notes_details,cloneNotes.notes)
    notesContext.setNotesData(cloneNotes);
    
    props.navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          { name: 'Home' }
        ],
      }))
    Toast.show({
      text: 'Add Notes Successfully!',
      type: 'success',
      duration: 2000
    })
  }

  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        options={{
          headerShown: false
        }}
        name="Home" component={Home} />
      <HomeStack.Screen
        options={{
          title: '',
          headerStyle:{
            backgroundColor:Colors.SECONDARY,
          },
          headerLeft: (props) => (
            <HeaderBackButton
              {...props}
              tintColor={Colors.WHITE}
            />
          ),
          headerRight: () =>
            <TouchableOpacity
              onPress={notes && notes.selectedNote && Object.keys(notes.selectedNote)?.length > 0 ? onUpdateParticularDiary : onAddNoteHandler}
              style={{ padding: 5 }} >
              <Icon name='save' size={30} color={Colors.WHITE} ></Icon>
            </TouchableOpacity>
        }}

        initialParams={{
          html,
          setHtml,
          onAddNoteHandler,

          ...props,
        }}
        name="AddDiary"
        component={Diary} />
    </HomeStack.Navigator>
  );
}