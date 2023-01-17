import React, { Component, useState } from 'react'
import { KeyboardAvoidingView, Text, View, ScrollView, ToastAndroid } from 'react-native'
import CommonButton from '../../../components/common/commonButton'
import CommonTextInput from '../../../components/common/commonTextInput'
import COLORS from '../../../constants/colors'
import { createQuestion } from '../../../utils/database'

export default function Addquestion({ navigation, route }) {

  const [currentQuizId, setCurrentQuizId] = useState(route.params.currentQuizId)
  const [currentQuizTitle, setCurrentQuizTitle] = useState(route.params.currentQuizTitle)

  const [question, setQuestion] = useState('')
  const [correctAnswer, setcorrectAnswer] = useState('')
  const [optionTwo, setOptionTwo] = useState('')
  const [optionThree, setOptionThree] = useState('')
  const [optionFour, setOptionFour] = useState('')

  const handleQuestionSave = async () => {

     if(
      question == '' ||
      correctAnswer == '' ||
      optionTwo == '' ||
      optionThree == '' ||
      optionFour == ''
     ){
      return
     }
    let currentQuestionId = Math.floor(100000 + Math.random() * 9000).toString()

    await createQuestion(currentQuizId, currentQuestionId, {
      question: question,
      correct_answer: correctAnswer,
      incorrect_answer: [optionTwo, optionThree, optionFour]
    })
    ToastAndroid.show('Question saved',ToastAndroid.SHORT)

    setQuestion('')
    setcorrectAnswer('')
    setOptionTwo('')
    setOptionThree('')
    setOptionFour('')
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1, backgroundColor: COLORS.WHITE }}>
        <View>
          <CommonTextInput
            label='Question'
            placeholder='Enter question'
            onChangeText={val => setQuestion(val)}
            value={question}
          />
          <View style={{ marginTop: 30 }}>
            <CommonTextInput
              label='Correct Answer'
              onChangeText={val => setcorrectAnswer(val)}
              value={correctAnswer}
            />
            <CommonTextInput
              label='Option 2'
              value={optionTwo}
              onChangeText={val => setOptionTwo(val)}
            />
            <CommonTextInput
              label='Option 3'
              onChangeText={val => setOptionThree(val)}
              value={optionThree}
            />
            <CommonTextInput
              label='Option 4'
              onChangeText={val => setOptionFour(val)}
              value={optionFour}
            />
          </View>
          <CommonButton
            title='Save Question'
            onPress={handleQuestionSave}
            style={{ backgroundColor: COLORS.GRAY }}
          />
          <CommonButton
            title='Done & Go Home'
            onPress={() => {
              setCurrentQuizId('')
              navigation.navigate('AdminDrawer')
            }}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}