import { StyleSheet } from "react-native"
import COLORS from "../../../constants/colors";

const styles = StyleSheet.create({
   mainView:{
    flex:1,
   },
   descstyle:{
    height:100
   },
   dateView:{
      marginHorizontal: 20,
      marginTop:10
    },
    labelstyle: {
      color: COLORS.LIGHTGREY,
      fontSize: 18,
      marginTop: 15,
      fontWeight: '400',
      fontStyle: 'normal',
    },
    calendarView:{
      borderWidth: 1,
      borderColor: COLORS.PRIMARY,
      height: 40,
      borderRadius: 8,
      paddingLeft: 8,
      paddingRight:8,
      // flex:1,
    },
    calendarInput:{
      flex:1,
      flexDirection:'row',
      justifyContent:'space-between',
      marginTop:10
    },
    textStyle:{
      fontSize:16,
    },
})

export default styles;