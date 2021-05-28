import { StyleSheet } from 'react-native';
import { Colors } from "styles";
import { WINDOW_WIDTH } from 'styles/mixins';
import { FONT_SIZE_16, FONT_WEIGHT_REGULAR } from "styles/typography";
const styles = ({fullWidth,position}) => StyleSheet .create({
    midButtonContainer: {      
        position: 'absolute',
        bottom: 20, // space from bottombar
        height: 58,
        width: 58,
        borderRadius: 58,
        backgroundColor: Colors.SECONDARY,
        justifyContent: 'center',
        alignItems: 'center',
      },
      buttonText: {
        color: Colors.WHITE,
        fontWeight:FONT_WEIGHT_REGULAR,
        fontSize: FONT_SIZE_16,
      }
});
  export default styles;