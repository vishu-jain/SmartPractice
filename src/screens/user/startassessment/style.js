import {StyleSheet, Dimensions} from 'react-native';
const {height, width} = Dimensions.get('window');
import COLORS from '../../../constants/colors';
const styles = StyleSheet.create({
  quizTitle: {
    fontSize: 40,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  quizView: {
    width: width,
    height: height,

    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  questionView: {
    marginTop: 14,

    padding: 20,
    height: '60%',
    elevation: 10,
    borderRadius: 10,
    width: '90%',
    backgroundColor: COLORS.WHITE,
  },
  question: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  optionView: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  option: {
    fontSize: 20,
    padding: 5,
  },
  optionButton: {
    flexDirection: 'row',
    borderColor: COLORS.PRIMARY,
    borderWidth: 2,
    marginTop: 10,
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    bottom: 30,
  },
  nextButton: {
    width: '48%',
    backgroundColor: COLORS.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonTitle: {
    fontSize: 20,
    padding: 15,
    color: COLORS.WHITE,
  },
  submitButton: {
    width: '48%',
    backgroundColor: COLORS.GREEN,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});
export default styles;