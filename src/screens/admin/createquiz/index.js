import React, { useEffect, useState } from 'react'
import { Text, View,TouchableOpacity } from 'react-native'
import CommonButton from '../../../components/common/commonButton'
import CommonTextInput from '../../../components/common/commonTextInput'
import styles from './style'
import { createQuiz } from '../../../utils/database'
import Fontisto from 'react-native-vector-icons/Fontisto'
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function Createquiz({navigation}) {
            
    const [title,setTitle]=useState('')
    const [description,setDescription]=useState('')
  //   const [time,setTime]=useState('')
  //   const [lastdate,setLastdate]=useState('')
  //   const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  // const showDatePicker = () => {
  //   console.log('first')
  //   setDatePickerVisibility(true);
  // };

  // const hideDatePicker = () => {
  //   setDatePickerVisibility(false);
  // };

  // const handleConfirm = (date) => {
  //   setLastdate(date);
  //   hideDatePicker();
  // };
  // useEffect(() => {
  //   setDob(getDate());
  // }, [date])

  // const getDate = () => {
  //   let tempDate = date.toString().split(' ');
  //   return date !== '' ? `${tempDate[2]} ${tempDate[1]} ${tempDate[3]}` : '';
  // };

   
   const handleQuizsave=async()=>{
     const currentQuizId = Math.floor(100000+Math.random() * 9000).toString()
     await createQuiz(currentQuizId,title,description)

     navigation.navigate('Addquestion',{
         currentQuizId:currentQuizId,
        currentQuiztitle:title,
     })

  
     setDescription('');
     setTitle('');
    //  setLastdate('');
    //  setTime('');
   }
    return (
      <View >
        <CommonTextInput label='Title'
         placeholder='Enter Title' 
         value={title}
         onChangeText={data => setTitle(data)}
         />
        <CommonTextInput label='Description' 
        placeholder='Enter Description' 
        value={description} 
        textInputStyle={styles.descstyle}
        onChangeText={data => setDescription(data)}
        />
        {/* <View style={styles.dateView}>
            <Text style={styles.labelstyle}>Assignment last date </Text>
            <TouchableOpacity style={styles.calendarView} onPress={showDatePicker}>
              <View style={styles.calendarInput}>
                <Text style={styles.textStyle}>{lastdate}</Text>
                <Fontisto
                  name='date'
                  size={16}
                  color={"grey"}
                />
              </View>
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                display={"inline"}
              />
            </TouchableOpacity>
          </View> */}
        <CommonButton title='Save quiz' onPress={()=>handleQuizsave()}/>
      </View>
    )
  }