import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CommonActions } from '@react-navigation/native';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import { Editor, WebView } from 'components/organisms';
import { AuthContext, NotesContext } from 'context';
import moment from 'moment';
import { Content, List, Toast } from 'native-base';
import * as React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { AllNotes, Diary, Home } from 'scenes';
import LocalService from 'services/LocalService';
import { Colors } from 'styles';
import { WINDOW_WIDTH } from 'styles/mixins';
import { Async_Constants, datesWhitelist } from 'utils';
import styles from './app-navigator.style';
import {NotesStack} from '../../navigations/navigator/stack'


const Tab = createBottomTabNavigator();

function HomeScreen(props) {
  const { navigation } = props;
  const notesContext = React.useContext(NotesContext);
  console.log('notes: ', notesContext.notes)
  console.log('check updates updates: ', notesContext);
  
  
  const onMoveEditDiary = (data) => {
    let cloneNotes = { ...notesContext.notes }
    
    cloneNotes['selectedNote'] = data;
    LocalService.storeDataAsObject(Async_Constants.notes_details,cloneNotes);
    
    notesContext.setNotesData(cloneNotes);
    navigation.navigate('AddDiary', {
      data
    })
  }
  
  const onMoveAddScreen = () => {
    let cloneNotes = { ...notesContext.notes }
    cloneNotes['selectedNote'] = {};
    LocalService.storeDataAsObject(Async_Constants.notes_details,cloneNotes);
    notesContext.setNotesData(cloneNotes);
    navigation.navigate('AddDiary')
  }
  
  const dateFilter =(date)=>{
    let cloneNotes = { ...notesContext.notes }
    let getData = [...cloneNotes['notesData']];
    let getSelectedDate = moment(date).toISOString().split('T')[0];
    let getFilteredResult = getData.filter((note)=> note.date == getSelectedDate);
    cloneNotes['filteredResults']= [...getFilteredResult];
    cloneNotes['selectedDate']=getSelectedDate;
    console.log('filter results: ',getFilteredResult);
    LocalService.storeDataAsObject(Async_Constants.notes_details,cloneNotes);
    notesContext.setNotesData(cloneNotes);
  }
  
  return (
    <View style={{ flex: 1, display: 'flex', justifyContent: 'space-between' }} >
      <View style={{ flex: 0.3, alignItems: 'center', justifyContent: 'center' }} >

        <CalendarStrip
           scrollable
           showDate
           onDateSelected={dateFilter}
           selectedDate={moment().toDate()}
           minDate={new Date(1).toDateString()}
           maxDate={moment().add(6,'days')}
           calendarAnimation={{type: 'sequence', duration: 30}}
           daySelectionAnimation={{type: 'border', duration: 200, borderWidth: 1, borderHighlightColor: 'white'}}
           style={{height: 100, paddingTop: 20, paddingBottom: 10,width:WINDOW_WIDTH}}
           calendarHeaderStyle={{color: 'white'}}
           calendarColor={Colors.SECONDARY}
           dateNumberStyle={{color: 'white'}}
           dateNameStyle={{color: 'white'}}
           highlightDateNumberStyle={{color: 'black'}}
           highlightDateContainerStyle={{borderRadius:5}}
           highlightDateNameStyle={{color: 'black'}}
           disabledDateNameStyle={{color: 'red'}}
           disabledDateNumberStyle={{color: 'red'}}
           datesWhitelist={datesWhitelist}
           //  datesBlacklist={datesBlacklist}
           iconContainer={{flex: 0.1}}
           />
        <Text>{notesContext.notes.selectedDate}</Text>
      </View>
      <ScrollView style={{ flex: 1 }} >

        <View style={{ flex: 0.7, flexDirection: 'row', justifyContent: 'flex-start', flexWrap: 'wrap' }} >
          {
            notesContext?.notes?.filteredResults.length < 1 ? 
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}} >
             <Image source={require('../../assets/images/create.png')} />
            <Text>Create New Notes</Text> 
            </View>:
              notesContext?.notes?.filteredResults.map((note, index) => (
                <View key={index} style={{margin:10}} >
                  
                <TouchableOpacity onPress={() => onMoveEditDiary(note)} >
                  <WebView
                    html={note.noteText}
                    date={note.date}
                    index={index}
                    />
                </TouchableOpacity>
                    </View>
              ))
            }
        </View>
      </ScrollView>
      <View>
        <TouchableOpacity onPress={onMoveAddScreen} style={styles(props).midButtonContainer} >
          <Icon name={'add'} size={30} color={Colors.WHITE} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
// const AllNotesStack = createStackNavigator();
// function AllNoteStackScreen(props){
  
//   return <AllNotesStack.Navigator>
      
//       <AllNotesStack.Screen
      
//       options={{
        
//         headerLeft:()=> <Icon style={{padding:10}}  color={Colors.WHITE} size={30} name='my-library-books' />,
//         headerTintColor:Colors.WHITE,
//         headerStyle: {
//           borderBottomEndRadius:15,
//           backgroundColor: Colors.SECONDARY
//         },
//       }}   
//       name="All Notes"
//       component={AllNotes} 
//       />
     
//     </AllNotesStack.Navigator>
// }
const HomeStack = createStackNavigator();
function HomeStackScreen(props) {
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
      CommonActions.reset({
        index: 0,
        routes: [
          { name: 'Home' }
        ],
      }))
    }

  const onAddNoteHandler = () => {

    console.log('on add call');
    let cloneNotes = { ...notesContext.notes }
    let getNotes = [...cloneNotes.notesData];
    let note = {
      id: new Date().getTime(),
      noteText: html,
      date:cloneNotes['selectedDate']
    }
    setHtml('')
    getNotes.push(note);
    let getFilterResult = getNotes.filter((note)=> note.date === notesContext.notes.selectedDate);
    cloneNotes['notesData'] = [...getNotes];
    cloneNotes['filteredResults'] = [...getFilterResult];
    cloneNotes['selectedNote'] = {};
    console.log('checkk add notes: ', cloneNotes)
    LocalService.storeDataAsObject(Async_Constants.notes_details,cloneNotes.notes)
    notesContext.setNotesData(cloneNotes);
    
    props.navigation.dispatch(
      CommonActions.reset({
        key:props.route.key,
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

          // <Icon size={30} color={Colors.WHITE} name='keyboard-backspace' />
          // </TouchableOpacity>,
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

function AllNotesScreen() {
  const notesContext = React.useContext(NotesContext);
 
  const onDeleteHandler = (id) => {
    let cloneNotes = { ...notesContext.notes }
    let getNotes = [...cloneNotes.notesData];
    console.log('check selected Data: ',cloneNotes);
    console.log('selected Id : ',id)
    let filterNotes = getNotes.filter((note) => note.id !== id);
    console.log('check filterd results ',filterNotes);
    cloneNotes['notesData'] = [...filterNotes];
    cloneNotes['filteredResults'] = [...filterNotes];
    console.log('checkk add notes: ', cloneNotes);
    LocalService.storeDataAsObject(Async_Constants.notes_details,cloneNotes.notes)
    notesContext.setNotesData(cloneNotes);

    Toast.show({
      text: 'Remove Successfully!',
      type: 'success',
      duration: 1000
    })
  }
  return (
    <View style={{ flex: 1}} >
      {
                  notesContext?.notes.notesData.length < 1 ? 
                  <View style={{flex:1,justifyContent:'center',alignItems:'center'}} >
                  <Image source={require('../../assets/images/empty.png')}  />
                  <Text>No Notes</Text>
                  </View>:
                    <Content style={{flex:1}} >
                    <List>
                      {
                        notesContext?.notes.notesData?.map((note, index) => (
                          <WebView
                            key={index}
                            onDeleteHandler={onDeleteHandler}
                            list={true}
                            html={note.noteText}
                            date={note.date}
                            id={note.id}
                            index={index}
                          />
                        ))
                      }
        
                    </List>
              </Content>
      }
    </View>
  );
}
function AddDiary(props) {
  console.log('add diary props: ', props);
  const noteContext = React.useContext(NotesContext);
  console.log('context in diary:', noteContext)
  console.log('add diary text: ', props?.data);
  const { html, setHtml, data } = props?.route?.params;
  console.log('props check in diary: ', props?.route?.params);
  return (
    <View style={{ flex: 1 }} >
      <Editor html={data && data.noteText ? data.noteText : html} sethtml={setHtml} />
    </View>
  );
}

export default function AppNavigator(props) {
  const authContext = React.useContext(AuthContext);


  const logOut = async () => {
    let clone = { ...authContext.userData };
    clone['isAuth'] = false;
    authContext.setUserData(clone);
    await LocalService.removeValue(Async_Constants.auth_details);
  }
  return (
    <Tab.Navigator
    
    initialRouteName={'Home'} 
    tabBarOptions={{
       activeTintColor: '#fff',
       inactiveTintColor: 'lightgray',
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
        component={HomeStackScreen}
      />
      <Tab.Screen
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
