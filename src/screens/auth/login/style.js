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
});

export default styles;
