import { StyleSheet } from 'react-native';
import { Colors } from "styles";
import { WINDOW_WIDTH } from 'styles/mixins';
import { FONT_SIZE_16, FONT_WEIGHT_REGULAR } from "styles/typography";
const styles = (props) => StyleSheet .create({
    inputContainer:{
    marginBottom:20,
    width:WINDOW_WIDTH*0.8,
    padding:8,
    }
});
  export default styles;