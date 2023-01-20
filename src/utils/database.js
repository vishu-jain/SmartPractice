import firestore from '@react-native-firebase/firestore';

export const createQuiz = (
  currentQuizId,
  title,
  description,
  lastdate,
  time,
  status
) => {
  return firestore().collection('Quizzes').doc(currentQuizId).set({
    title,
    description,
    lastdate,
    time,
    status
  });
};

export const createQuestion = (currentQuizId, currentQuestionId, question) => {
  return firestore()
    .collection('Quizzes')
    .doc(currentQuizId)
    .collection('QNA')
    .doc(currentQuestionId)
    .set(question);
};

export const getQuizzes = () => {
  return firestore().collection('Quizzes').get();
};

export const getQuestions = currentQuizId => {
  return firestore().collection('Quizzes').doc(currentQuizId).get();
};

// export const getQuizById = currentQuizId => {
//     return firestore().collection('Quizzes').doc(currentQuizId).get();
//   };

export const getQuestionsByQuizId = currentQuesId => {
  return firestore()
    .collection('Quizzes')
    .doc(currentQuesId)
    .collection('QNA')
    .get();
};

// get user details
export const getUserDetails= (userid) => {
  return firestore().collection('users').doc(userid).get();
};

