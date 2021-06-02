import { NotesContext } from 'context';
import React, { useContext } from 'react';
import { SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import QuillEditor, { QuillToolbar } from 'react-native-cn-quill';
import { Colors } from 'styles';
import { WINDOW_WIDTH } from 'styles/mixins';
export default function App({sethtml,html}) {
  const _editor = React.createRef();
  const notesContext = useContext(NotesContext);
  const { notes } = notesContext;
  const onHandleEditSelectData = (html)=>{
    let cloneNotes = {...notesContext.notes}
    console.log('running: ')
    cloneNotes['selectedNote']['noteText']=html
    notesContext.setNotesData(cloneNotes);
   
  }
  return (
    <SafeAreaView style={styles.root}>
      {/* <StatusBar
     backgroundColor={Colors.SECONDARY}
      animated
      style="auto" /> */}
      <QuillEditor 
       options={[
        ['bold', 'italic', 'underline'],
        [{ header: 1 }, { header: 2 }],
        [{ align: [] }],
        [
          { color: ['#000000', '#e60000', '#ff9900', 'yellow'] },
          { background: [] },
        ],
        ['image', 'clock'],
      ]}
         onHtmlChange={(event)=> notes && notes.selectedNote && Object.keys(notes.selectedNote)?.length > 0 ? onHandleEditSelectData(event.html) : sethtml(event.html)}
         onTextChange={(event)=> console.log(event)}
          style={styles.editor}
          ref={_editor}
          initialHtml={ notes && notes.selectedNote && Object.keys(notes.selectedNote)?.length > 0 ? notes.selectedNote.noteText :  html}
      />
      <QuillToolbar styles={{
      toolbar:{
        backgroundColor:Colors.WHITE,
        borderColor:Colors.WHITE,
        borderWidth:0,
        borderTopColor:Colors.WHITE
      }
      }} editor={_editor} options="full" theme="light" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    alignSelf: 'center',
    paddingVertical: 10,
  },
  root: {
    flex: 1,
    // marginTop: StatusBar.currentHeight || 0,
    backgroundColor: '#eaeaea',
  },
  editor: {
    flex: 1,
    justifyContent:'center',
    width:WINDOW_WIDTH,
    padding: 0,
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 5,
    backgroundColor: 'white',
  },
});