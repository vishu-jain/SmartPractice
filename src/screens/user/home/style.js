import { StyleSheet } from "react-native"
import COLORS from "../../../constants/colors";
const styles = StyleSheet.create({
   liststyle: {
      padding: 20,
      borderRadius: 5,
      marginVertical: 5,
      marginHorizontal: 10,
      backgroundColor: COLORS.WHITE,
      elevation: 2
   },
   titleView: {
      flexDirection: 'row',
      justifyContent: 'space-between'
   },
   titlestyle: {
      fontSize: 25,
      color: COLORS.BLACK,
      fontWeight: 'bold'
   },
   buttonstyle: {
      height: 30,
      fontSize: 20,
      marginTop: 0,
      marginBottom: 0,
      width: 80,
   },
   buttontextstyle: {
      fontSize: 20,
      fontWeight:'500'
   },
   descriptionstyle: {
      fontSize: 18,
      color: COLORS.BLACK,
   },
   timeview: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 5
   },
   liststyle1: {
      padding: 20,
      borderRadius: 5,
      marginVertical: 5,
      marginHorizontal: 10,
      backgroundColor: COLORS.GRAY,
      elevation: 2
   },

})

export default styles;