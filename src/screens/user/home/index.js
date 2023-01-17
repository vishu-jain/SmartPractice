import React, { Component, useEffect, useState } from 'react'
import { FlatList, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import CommonButton from '../../../components/common/commonButton'
import Commonheader from '../../../components/common/commonheader'
import { getQuizzes } from '../../../utils/database'
import LinearGradient from 'react-native-linear-gradient'
import styles from './style'
export default function Home({ navigation }) {

  const [allQuizzes, setAllQuizzes] = useState([])
  const [refreshing, setRefreshing] = useState(false)

  const getAllQuizzes = async () => {
    setRefreshing(true)
    const quizzes = await getQuizzes();

    let tempQuizzes = []
    await quizzes.docs.forEach(async quiz =>{
      await tempQuizzes.push({id:quiz.id, ...quiz.data()})
    })
    await setAllQuizzes([...tempQuizzes])
    setRefreshing(false)
  }

  useEffect(()=>{
    getAllQuizzes();
  },[])
  return (
    <View style={{flex:1}}>
      <FlatList
        data={allQuizzes}
        onRefresh={getAllQuizzes}
        refreshing={refreshing}
        showsVerticalScrollIndicator={false}
        style={{ paddingVertical: 20 }}
      
      renderItem={({ item: quiz }) => (
          <View style={styles.liststyle}>
            <View style={styles.titleView}>
            <Text style={styles.titlestyle}>{quiz.title}</Text>
            <CommonButton title='Start' style={styles.buttonstyle} textstyle={styles.buttontextstyle} 
            onPress={()=>{
              navigation.navigate('Assessmentstack',{
                screen:'Startassessment',
                params:{
                  quizId:quiz.id
                }
              })
            }}
            />
            </View>
            <Text style={styles.descriptionstyle}>{quiz.description}</Text>
            <View style={styles.timeview}>
              <Text>Time Duration : 10 minutes</Text>
              <Text>Status : Active</Text>
            </View>
          </View>
      )}
      />
    </View>
  )
}