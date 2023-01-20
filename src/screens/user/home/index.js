import React, {Component, useEffect, useState} from 'react';
import {FlatList, Text, View, SafeAreaView, StatusBar} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import CommonButton from '../../../components/common/commonButton';
import Commonheader from '../../../components/common/commonheader';
import {getQuizzes} from '../../../utils/database';
import LinearGradient from 'react-native-linear-gradient';
import styles from './style';
import COLORS from '../../../constants/colors';
import moment from 'moment';

export default function Home({navigation}) {
  const [allQuizzes, setAllQuizzes] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const getAllQuizzes = async () => {
    setRefreshing(true);
    const quizzes = await getQuizzes();

    let tempQuizzes = [];
    await quizzes.docs.forEach(async quiz => {
      await tempQuizzes.push({id: quiz.id, ...quiz.data()});
    });
    await setAllQuizzes([...tempQuizzes]);
    setRefreshing(false);
  };
  useEffect(() => {
    getAllQuizzes();
  }, []);

  var currentdate = moment().format('D MMM YYYY').toString();

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar backgroundColor={COLORS.WHITE} barStyle={'dark-content'} />
      <LinearGradient
        colors={['#7eafe0', '#adcded', '#c7dbf0']}
        style={{flex: 1}}>
        <FlatList
          data={allQuizzes}
          onRefresh={getAllQuizzes}
          refreshing={refreshing}
          showsVerticalScrollIndicator={false}
          style={{paddingVertical: 20}}
          renderItem={({item: quiz}) => {
            if (quiz.lastdate >= currentdate) {
              return (
                <View style={styles.liststyle}>
                  <View style={styles.titleView}>
                    <Text style={styles.titlestyle}>{quiz.title}</Text>
                    <CommonButton
                      title="Start"
                      style={styles.buttonstyle}
                      textstyle={styles.buttontextstyle}
                      onPress={() => {
                        navigation.navigate('Assessmentstack', {
                          screen: 'Startassessment',
                          params: {
                            quizId: quiz.id,
                          },
                        });
                      }}
                    />
                  </View>
                  <Text style={styles.descriptionstyle}>
                    {quiz.description}
                  </Text>
                  <View style={styles.timeview}>
                    <Text>Time Duration : {quiz.time} minutes</Text>
                    <Text>
                      Status :<Text style={{color: COLORS.GREEN}}> {quiz.status}</Text>
                    </Text>
                  </View>
                  <Text>Last date of assignment : {quiz.lastdate}</Text>
                </View>
              );
            } else {
              return (
                <View style={styles.liststyle1}>
                  <View style={styles.titleView}>
                    <Text style={styles.titlestyle}>{quiz.title}</Text>
                  </View>
                  <Text style={styles.descriptionstyle}>
                    {quiz.description}
                  </Text>
                  <View style={styles.timeview}>
                    <Text>
                      Time Duration : {quiz.time} minutes</Text>
                    <Text>
                      Status : <Text style={{color: COLORS.RED}}>Missed</Text>
                    </Text>
                  </View>
                  <Text>Last date of assignment : {quiz.lastdate}</Text>
                </View>
              );
            }
          }}
        />
      </LinearGradient>
    </SafeAreaView>
  );
}
