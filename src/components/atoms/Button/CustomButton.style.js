import { StyleSheet } from 'react-native';
import { Colors } from "styles";
import { WINDOW_WIDTH } from 'styles/mixins';
import { FONT_SIZE_16, FONT_WEIGHT_REGULAR } from "styles/typography";
const styles = ({fullWidth,position}) => StyleSheet .create({
    buttonContainer: {      
        alignSelf: position,  
        justifyContent:'center',
        borderRadius:5,
        backgroundColor:Colors.SECONDARY,
        width: fullWidth ? WINDOW_WIDTH*0.9 : WINDOW_WIDTH*0.5, 
        height:60, 
      },
      buttonText: {
        color: Colors.WHITE,
        fontWeight:FONT_WEIGHT_REGULAR,
        fontSize: FONT_SIZE_16,
      }
});
  export default styles;