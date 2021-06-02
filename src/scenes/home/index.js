import { NotesContext } from 'context';
import React from 'react';
import LocalService from 'services/LocalService';
import { Async_Constants, datesWhitelist } from 'utils';
import moment from 'moment';
import CalendarStrip from 'react-native-calendar-strip';
import { Text, View } from 'native-base';
import { Image, ScrollView, TouchableOpacity } from 'react-native';
import { WebView } from 'components/organisms';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './index.style';
import { WINDOW_WIDTH } from 'styles/mixins';
import { Colors } from 'styles';
import { TransitionView } from 'components/molecules';
import * as Animatable from 'react-native-animatable';

export default function (props) {
    const { navigation } = props;
    const notesContext = React.useContext(NotesContext);
    console.log('notes: ', notesContext.notes)
    console.log('check updates updates: ', notesContext);


    const onMoveEditDiary = (data) => {
        let cloneNotes = { ...notesContext.notes }

        cloneNotes['selectedNote'] = data;
        LocalService.storeDataAsObject(Async_Constants.notes_details, cloneNotes);

        notesContext.setNotesData(cloneNotes);
        navigation.navigate('AddDiary', {
            data
        })
    }

    const onMoveAddScreen = () => {
        let cloneNotes = { ...notesContext.notes }
        cloneNotes['selectedNote'] = {};
        LocalService.storeDataAsObject(Async_Constants.notes_details, cloneNotes);
        notesContext.setNotesData(cloneNotes);
        navigation.navigate('AddDiary')
    }

    const dateFilter = (date) => {
        let cloneNotes = { ...notesContext.notes }
        let getData = [...cloneNotes['notesData']];
        let getSelectedDate = moment(date).toISOString().split('T')[0];
        let getFilteredResult = getData.filter((note) => note.date == getSelectedDate);
        cloneNotes['filteredResults'] = [...getFilteredResult];
        cloneNotes['selectedDate'] = getSelectedDate;
        console.log('filter results: ', getFilteredResult);
        LocalService.storeDataAsObject(Async_Constants.notes_details, cloneNotes);
        notesContext.setNotesData(cloneNotes);
    }

    return (
        <View style={styles(props).main}>
            <View style={styles(props).subMain} >
<Animatable.View useNativeDriver duration={2000} animation='fadeIn' >

                <CalendarStrip
                    scrollable
                    showDate
                    onDateSelected={dateFilter}
                    selectedDate={moment().toDate()}
                    minDate={new Date(1).toDateString()}
                    maxDate={moment().add(6, 'days')}
                    calendarAnimation={{ type: 'sequence', duration: 30 }}
                    daySelectionAnimation={{ type: 'border', duration: 200, borderWidth: 1, borderHighlightColor: 'white' }}
                    style={{ height: 100, paddingTop: 20, paddingBottom: 10, width: WINDOW_WIDTH }}
                    calendarHeaderStyle={{ color: 'white' }}
                    calendarColor={Colors.SECONDARY}
                    dateNumberStyle={{ color: 'white' }}
                    dateNameStyle={{ color: 'white' }}
                    highlightDateNumberStyle={{ color: 'black' }}
                    highlightDateContainerStyle={{ borderRadius: 5 }}
                    highlightDateNameStyle={{ color: 'black' }}
                    disabledDateNameStyle={{ color: 'red' }}
                    disabledDateNumberStyle={{ color: 'red' }}
                    datesWhitelist={datesWhitelist}
                    //  datesBlacklist={datesBlacklist}
                    iconContainer={{ flex: 0.1 }}
                    />
                <Text style={{alignSelf:'center',backgroundColor:Colors.PRIMARY,color:Colors.WHITE,padding:5,borderBottomRightRadius:5,borderBottomLeftRadius:5}} >{notesContext.notes.selectedDate}</Text>
                    </Animatable.View>
            </View>
            <ScrollView style={styles(props).scroll} >

                <View style={styles(props).scrollDirectView} >
                    {
                        notesContext?.notes?.filteredResults.length < 1 ?
                            <View style={styles(props).center}>
                                <Image source={require('../../assets/images/create.png')} />
                                <Text>Create New Notes</Text>
                            </View> :
                                
                                    notesContext?.notes?.filteredResults.map((note, index) => (
                                        <TouchableOpacity onPress={() => onMoveEditDiary(note)} >
                                                <Animatable.View key={index} style={{margin:10}} useNativeDriver duration={1000} animation='slideInDown' >
                                                <WebView
                                                    html={note.noteText}
                                                    date={note.date}
                                                    index={index}
                                                />
                             </Animatable.View>
                                            </TouchableOpacity>
                                        
                                    ))}
                    
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
