import { WebView } from 'components/organisms';
import { NotesContext } from 'context';
import { Content, List, Text, Toast, View } from 'native-base';
import React from 'react';
import { Image } from 'react-native';
import LocalService from 'services/LocalService';
import { Async_Constants } from 'utils';
import styles from './index.style'
import * as Animated from 'react-native-animatable'
export default function(props) {
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
    //   <View style={styles(props).main} >
          
        
            <Animated.View style={{flex:1}}  useNativeDriver duration={1000} animation='slideInDown' >

                   { notesContext?.notes.notesData.length < 1 ? 
                    <View style={styles(props).subMain} >
                    <Image source={require('../../../assets/images/empty.png')}  />
                    <Text>No Notes</Text>
                    </View>:
                      <Content style={styles(props).main} >
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
                            </Animated.View>
        
    //   </View>
    );
  }