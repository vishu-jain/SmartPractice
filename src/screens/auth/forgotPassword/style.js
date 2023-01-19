import {StyleSheet} from 'react-native';
import COLORS from '../../../constants/colors';
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    alignSelf: 'center',
    marginTop: 60,
    marginBottom: 50,
  },
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button1: {
    width: 150,
  },
  button2: {
    width: 150,
    backgroundColor: COLORS.GREY,
  },
});

export default styles;
