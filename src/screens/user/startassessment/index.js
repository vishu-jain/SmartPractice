import React, { useState, useEffect,useRef } from 'react'
import { View, Text, Dimensions, FlatList, TouchableOpacity } from 'react-native'
import Commonheader from '../../../components/common/commonheader';
import CommonButton from '../../../components/common/commonButton';
import { getQuestions, getQuestionsByQuizId } from '../../../utils/database';
import COLORS from '../../../constants/colors';
import styles from './style';
import ResultModal from '../../../components/resultmodal';
import {Timer, Countdown} from 'react-native-element-timer';

export default function Startassessment({ navigation, route }) {

    const { width } = Dimensions.get('window');

    const [currentQuizId, setCurrentQuizId] = useState(route.params.quizId);
    console.log(currentQuizId);
    const [title, setTitle] = useState('');

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
        console.log(currentQuiz,'Quiz')
        currentQuiz = currentQuiz.data();
        setTitle(currentQuiz.title);

        const questions = await getQuestionsByQuizId(currentQuizId);
        let tempQuestions = [];
        await questions.docs.forEach(async res => {
            let question = res.data();
            // Shuffle the options of question
            question.allOptions = shuffleArray([
                ...question.incorrect_answer,
                question.correct_answer,
            ]);
            console.log()
            await tempQuestions.push(question);
        });
        setQuestions([...tempQuestions]);
    }

    useEffect(() => {
        getQuestiondetails();
    }, []);

        const countdownRef = useRef(null);


        // useEffect(()=>{
        //     countdownRef.current.start();
        // },[])
   
    console.log('play quiz')

    return (
        <View style={{flex:1}}>
            <Commonheader heading={title} onPress={() => {
                navigation.goBack()
            }} />
             <Countdown
                    ref={countdownRef}
                    // style={styles.timer}
                    // textStyle={styles.timerText}
                    initialSeconds={10}

                    // autoStart={true}
                    onTimes={e => {}}
                    onPause={e => {}}
                    onEnd={(e) => {}}
                />
            <FlatList
                horizontal
                ref={ref}
                onScroll={e => {
                    const x = e.nativeEvent.contentOffset.x / width;
                    setCurrentIndex(x.toFixed(0));
                    console.log(currentIndex)
                }}
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    justifyContent: 'center',
                }}
                data={questions}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item.question}
                renderItem={({ item, index }) => (
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
                                                { backgroundColor: getOptionColor(item, option) },
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
                                                    { color: getOptionTextColor(item, option) },
                                                ]}>
                                                {optionIndex + 1}.
                                            </Text>
                                            <Text
                                                style={[
                                                    styles.option,
                                                    { color: getOptionTextColor(item, option) },
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
        </View>
    )
}