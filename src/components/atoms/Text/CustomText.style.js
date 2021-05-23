import { StyleSheet } from 'react-native';
import { ANCHOR_BLUE } from 'styles/colors';
import { textStyle } from 'styles/mixins';
import { FONT_FAMILY_BOLD, FONT_FAMILY_REGULAR, FONT_SIZE_16, FONT_WEIGHT_BOLD, FONT_WEIGHT_REGULAR, HEAD_FONT_SIZE_24 } from "styles/typography";

const styles = ({type,position}) => StyleSheet .create({
    textContainer: type == 'ANCHOR_TEXT' ? 
    textStyle(FONT_SIZE_16,FONT_WEIGHT_REGULAR,FONT_FAMILY_REGULAR,ANCHOR_BLUE,'font',position,'','','ANCHOR_TEXT') :type == 'HEAD_TEXT' ? 
    textStyle(HEAD_FONT_SIZE_24,FONT_WEIGHT_BOLD,FONT_FAMILY_REGULAR,'','font',position):
    textStyle(FONT_SIZE_16,FONT_WEIGHT_REGULAR,FONT_FAMILY_REGULAR,'','font',position,20)
});
  export default styles;