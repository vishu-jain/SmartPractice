import {StyleSheet} from 'react-native';
import COLORS from '../../../constants/colors';
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    alignSelf: 'center',
    // marginTop:40,
    // marginBottom:40,
    width: 300,
    height: 300,
  },
  forgotview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 15,
  },
  forgtext: {
    color: COLORS.BLUE,
  },
  passwordLabel: {
    paddingLeft: 20,
    paddingTop: 15,
    color: COLORS.LIGHTGREY,
    fontSize: 18,
  },
  passwordView: {
    borderColor: COLORS.PRIMARY,
    borderWidth: 1,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    height: 40,
    alignItems: 'center',
  },
  inputPassword: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 8,
  },
  passwordIcon: {
    paddingRight: 10,
  },
  calendarView: {
    borderWidth: 1,
    borderColor: COLORS.PRIMARY,
    height: 40,
    borderRadius: 8,
    paddingLeft: 8,
    paddingRight: 8,
    // flex:1,
  },
  calendarInput: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  textStyle: {
    fontSize: 16,
  },
  textArea: {
    height: 80,
    fontSize: 16,
    padding: 8,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    margin:20
  },
});

export default styles;
