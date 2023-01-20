import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import CommonButton from '../../../components/common/commonButton';
import CommonTextInput from '../../../components/common/commonTextInput';
import Commonheader from '../../../components/common/commonheader';
import styles from './style';
import {createQuiz} from '../../../utils/database';
import Fontisto from 'react-native-vector-icons/Fontisto';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export default function Createquiz({navigation}) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [time, setTime] = useState('');
  const [lastdate, setLastdate] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState('');
  const [status,setStatus] = useState('Active');
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    setLastdate(getDate(date));
    hideDatePicker();
  };
  // useEffect(() => {
  //   setLastdate(getDate(date));
  // }, [date])

  const getDate = date => {
    let tempDate = date.toString().split(' ');
    return date !== '' ? `${tempDate[2]} ${tempDate[1]} ${tempDate[3]}` : '';
  };

  const handleQuizsave = async () => {
    if (!title) {
      Alert.alert('Enter title of assignment');
    } else if (!description) {
      Alert.alert('Enter description of assignment');
    } else if (!lastdate) {
      Alert.alert('Enter last date of assignment');
    } else if (!time) {
      Alert.alert('Enter time duration of assignment');
    } else {
      const currentQuizId = Math.floor(
        100000 + Math.random() * 9000,
      ).toString();
      await createQuiz(currentQuizId, title, description, lastdate, time,status);
      navigation.navigate('Addquestion', {
        currentQuizId: currentQuizId,
        currentQuiztitle: title,
      });
      setDescription('');
      setTitle('');
      setLastdate('');
      setTime('');
    }
  };
  return (
    <View style={{flex: 1}}>
      <KeyboardAwareScrollView>
        <Commonheader
          heading="Createquiz"
          iconName="chevron-back"
          onPress={() => navigation.goBack()}
        />
        <CommonTextInput
          label="Title"
          placeholder="Enter Title"
          value={title}
          onChangeText={data => setTitle(data)}
        />
        <CommonTextInput
          label="Description"
          placeholder="Enter Description"
          value={description}
          // textInputStyle={styles.descstyle}
          onChangeText={data => setDescription(data)}
        />
        <View style={styles.dateView}>
          <Text style={styles.labelstyle}>Assignment last date </Text>
          <TouchableOpacity
            style={styles.calendarView}
            onPress={showDatePicker}>
            <View style={styles.calendarInput}>
              <Text style={styles.textStyle}>{lastdate}</Text>
              <Fontisto name="date" size={16} color={'grey'} />
            </View>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
              display={'inline'}
            />
          </TouchableOpacity>
        </View>
        <CommonTextInput
          label="Time Duration"
          placeholder="Enter time in minutes"
          value={time}
          onChangeText={data => setTime(data)}
          keyboardType="numeric"
        />
        <CommonButton title="Save quiz" onPress={() => handleQuizsave()} />
      </KeyboardAwareScrollView>
    </View>
  );
}
