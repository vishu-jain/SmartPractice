import {StyleSheet} from 'react-native';
import COLORS from '../../../constants/colors';

const styles = StyleSheet.create({
  stateLabel: {
    color: COLORS.LIGHTGREY,
    fontSize: 20,
    marginTop: 15,
    fontWeight: '400',
    fontStyle: 'normal',
    paddingLeft: 20,
  },
  dropdown: {
    borderColor: COLORS.PRIMARY,
    borderRadius: 8,
    borderWidth: 1,
    marginHorizontal: 20,
    height: 40,
    paddingHorizontal: 8,
  },
  placeholderStyle: {
    color: COLORS.PLACEHOLDER,
    fontSize: 16,
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
  link: {
    alignSelf: 'center',
    color: COLORS.PRIMARY,
  },
});

export default styles;
