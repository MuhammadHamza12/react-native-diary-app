import { Editor } from 'components/organisms';
import { NotesContext } from 'context';
import { View } from 'native-base';
import React from 'react';
import styles from './index.style';
export default function (props) {
    console.log('add diary props: ', props);
    const noteContext = React.useContext(NotesContext);
    console.log('context in diary:', noteContext)
    console.log('add diary text: ', props?.data);
    const { html, setHtml, data } = props?.route?.params;
    console.log('props check in diary: ', props?.route?.params);
    return (
      <View style={styles(props).main} >
        <Editor html={data && data.noteText ? data.noteText : html} sethtml={setHtml} />
      </View>
    );
  }