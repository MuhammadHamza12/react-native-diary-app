import React, { useEffect, useRef, useState } from 'react'
import { View, useWindowDimensions, TouchableOpacity } from 'react-native'
import WebView from 'react-native-webview';
import styles from './WebView.style';
import HTML from "react-native-render-html";
import { Card, Text } from 'native-base';
import { Colors } from 'styles';
import QuillEditor, { QuillToolbar } from 'react-native-cn-quill';

import { FONT_SIZE_12, FONT_SIZE_14 } from 'styles/typography';
import runes from 'runes';
import { NotesContext } from 'context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Animated from 'react-native-animatable';
export default function CustomWebView(props) {
  const { html, date, index, list, onDeleteHandler, id,key } = props;
  const notesContext = React.useContext(NotesContext);
  const { notes } = notesContext;
  const contentWidth = useWindowDimensions().width;
  const [newHtml, setstate] = useState(html)
  const _editor = useRef(null);
  useEffect(() => {
    console.log('in useEffect: ')
    _editor.current.update();
    _editor.current.enable(false);
    console.log('in matching condition', notes.selectedNote.noteText);
    console.log('selected Date: ',notes.selectedNote.date)
    console.log('receving date: : ',date)
    if (notes.selectedNote.date === date || notes.selectedDate == date ) {
      console.log('in matching condition', notes.selectedNote.noteText);
      if(notes.selectedNote.noteText){
        _editor.current.dangerouslyPasteHTML(
          notes.selectedNote.noteText
          )
        }
    }
  }, [_editor, notes.selectedNote.noteText])

  useEffect(() => {
    if (notes.selectedDate == date) {
      console.log('in matching condition', notes.selectedNote.noteText);
      if(notes.selectedDate == date){
          console.log('new html: ',newHtml)
          _editor.current.dangerouslyPasteHTML(
            html
            )
        }
    }
  }, [date,notes.selectedDate])
  // function replaceAll(str, find, replace) {

  //     let getConvertedString = str.replace(new RegExp(find, 'g'), replace);
  //     console.log('get converted string: ',getConvertedString)
  //     return getConvertedString;
  //   }
  debugger;
  return (
    <View key={key} style={styles(props).main}  >

      <Card style={styles(props).webViewContainer} >
        <View style={list ? styles(props).row : { flex: 1 }} >

          {list &&
            <TouchableOpacity onPress={() => onDeleteHandler(id)} >
              <Icon color={Colors.ALERT} size={30} name={'delete-variant'} />
            </TouchableOpacity>
          }
          <Animated.View style={{flex:1}} animation='slideInDown' useNativeDriver duration={1000} >
          <QuillEditor
            style={styles(props).editorStyle}
            ref={_editor}
            initialHtml={newHtml}
            />
            </Animated.View>
        </View>
        <Text style={styles(props).topText} >{new Date(date).toDateString()}</Text>
      </Card>
    </View>
  )
}
