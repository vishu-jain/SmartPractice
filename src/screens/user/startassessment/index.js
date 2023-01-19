import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  Dimensions,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Commonheader from '../../../components/common/commonheader';
import CommonButton from '../../../components/common/commonButton';
import {getQuestions, getQuestionsByQuizId} from '../../../utils/database';
import COLORS from '../../../constants/colors';
import styles from './style';
import ResultModal from '../../../components/resultmodal';

export default function Startassessment({navigation, route}) {
  const {width} = Dimensions.get('window');

  const [currentQuizId, setCurrentQuizId] = useState(route.params.quizId);
  const [title, setTitle] = useState('');
  const [timeLimit, setTimeLimit] = useState('');
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const ref = useRef();

  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [isResultModalVisible, setIsResultModalVisible] = useState(false);

  //Shuffle array function
  const shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  };

  const getOptionColor = (currentQuestion, currentOpton) => {
    if (currentQuestion.selectedOption) {
      if (currentOpton == currentQuestion.selectedOption) {
        return COLORS.PRIMARY;
      }
    }
  };

  const getOptionTextColor = (currentQuestion, currentOption) => {
    if (currentQuestion.selectedOption) {
      if (currentOption == currentQuestion.selectedOption) {
        return COLORS.WHITE;
      } else {
        return COLORS.BLACK;
      }
    } else {
      return COLORS.BLACK;
    }
  };

  const getQuestiondetails = async () => {
    let currentQuiz = await getQuestions(currentQuizId);
    currentQuiz = currentQuiz.data();
    setTitle(currentQuiz.title);
    setTimeLimit(currentQuiz.time * 60);
    const questions = await getQuestionsByQuizId(currentQuizId);
    let tempQuestions = [];
    await questions.docs.forEach(async res => {
      let question = res.data();
      // Shuffle the options of question
      question.allOptions = shuffleArray([
        ...question.incorrect_answer,
        question.correct_answer,
      ]);
      await tempQuestions.push(question);
    });
    setQuestions([...tempQuestions]);
  };

  useEffect(() => {
    getQuestiondetails();
  }, []);

  let interval = null;
  const [min, setMin] = useState();
  const [sec, setSec] = useState();
  useEffect(() => {
    // let min = Math.floor(timeLimit / 60);

    // let sec = Math.round((timeLimit / 60 - Math.floor(timeLimit / 60)) * 60);
    setMin(Math.floor(timeLimit / 60));
    setSec(Math.round((timeLimit / 60 - Math.floor(timeLimit / 60)) * 60));
    const myInterval = () => {
      if (timeLimit >= 1) {
        setTimeLimit(state => state - 1);
      }
      if (timeLimit === 0) {
        navigation.goBack();
      }
    };
    interval = setTimeout(myInterval, 1000);
    // clean up
    return () => {
      clearTimeout(interval);
    };
  }, [timeLimit]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar backgroundColor={COLORS.WHITE} barStyle={'dark-content'} />
      <View style={styles.timerView}>
        <Text style={styles.titleView}> {title} </Text>
        <Text style={styles.timerStyle}>
          {min}:{sec}
        </Text>
      </View>

      <FlatList
        horizontal
        ref={ref}
        onScroll={e => {
          const x = e.nativeEvent.contentOffset.x / width;
          setCurrentIndex(x.toFixed(0));
          console.log(currentIndex);
        }}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          justifyContent: 'center',
        }}
        data={questions}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.question}
        renderItem={({item, index}) => (
          <View style={styles.quizView}>
            <View style={styles.questionView}>
              <Text style={styles.question}>
                {index + 1}. {item.question}
              </Text>
              <View style={styles.optionView}>
                {item.allOptions.map((option, optionIndex) => {
                  return (
                    <TouchableOpacity
                      style={[
                        styles.optionButton,
                        {backgroundColor: getOptionColor(item, option)},
                      ]}
                      onPress={() => {
                        if (item.selectedOption) {
                          return null;
                        }
                        if (option == item.correct_answer) {
                          setCorrectCount(correctCount + 1);
                        } else {
                          setIncorrectCount(incorrectCount + 1);
                        }
                        let tempQuestions = [...questions];
                        tempQuestions[index].selectedOption = option;
                        setQuestions([...tempQuestions]);
                        console.log(questions);
                      }}>
                      <Text
                        style={[
                          styles.option,
                          {color: getOptionTextColor(item, option)},
                        ]}>
                        {optionIndex + 1}.
                      </Text>
                      <Text
                        style={[
                          styles.option,
                          {color: getOptionTextColor(item, option)},
                        ]}>
                        {option}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </View>
        )}
      />
      <View style={styles.bottom}>
        {currentIndex > 0 ? (
          <TouchableOpacity
            style={styles.nextButton}
            onPress={() => {
              ref.current.scrollToIndex({
                animated: true,
                index: parseInt(currentIndex) - 1,
              });
            }}>
            <Text style={styles.buttonTitle}>Previous</Text>
          </TouchableOpacity>
        ) : null}
        {currentIndex < questions.length - 1 ? (
          <TouchableOpacity
            style={styles.nextButton}
            onPress={() => {
              if (currentIndex < questions.length - 1) {
                ref.current.scrollToIndex({
                  animated: true,
                  index: parseInt(currentIndex) + 1,
                });
              }
            }}>
            <Text style={styles.buttonTitle}>Next</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.submitButton}>
            <Text
              style={styles.buttonTitle}
              onPress={() => {
                setIsResultModalVisible(true);
              }}>
              Submit
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <ResultModal
        isModalVisible={isResultModalVisible}
        correctCount={correctCount}
        incorrectCount={incorrectCount}
        totalCount={questions.length}
        handleOnClose={() => {
          setIsResultModalVisible(false);
        }}
        handleHome={() => {
          navigation.navigate('Home');
        }}
      />
    </SafeAreaView>
  );
}
