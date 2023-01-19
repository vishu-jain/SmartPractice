import React, {Component, useEffect, useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import CommonButton from '../../../components/common/commonButton';
import Commonheader from '../../../components/common/commonheader';
import {getQuizzes} from '../../../utils/database';
import styles from './style';
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
  return (
    <View style={{flex: 1}}>
      <FlatList
        data={allQuizzes}
        onRefresh={getAllQuizzes}
        refreshing={refreshing}
        showsVerticalScrollIndicator={false}
        style={{paddingVertical: 20}}
        renderItem={({item: quiz}) => (
          <View style={styles.liststyle}>
            <Text style={styles.titlestyle}>{quiz.title}</Text>
            <Text style={styles.descriptionstyle}>{quiz.description}</Text>
          </View>
        )}
      />
      <CommonButton
        title="Create Quiz"
        onPress={() => {
          navigation.navigate('Quizstack');
        }}
      />
    </View>
  );
}
