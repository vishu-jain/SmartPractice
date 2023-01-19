// import STRINGS from '../constants/strings';
import {useSelector} from 'react-redux';

function emailValidation(text) {
  let re = /\S+@\S+\.\S+/;
  let regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

  if (re.test(text) || regex.test(text)) {
    return true;
  } else {
    return false;
  }
}

function passwordValidation(text) {
  const passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$/;
  if (passwordRegex.test(text)) {
    return true;
  } else {
    return false;
  }
}

function nameValidation(text) {
  const isOnlyAlphabetsWithSpace = /^[a-zA-Z]{2,40}( [a-zA-Z]{2,40})+$/;
  if (!isOnlyAlphabetsWithSpace.test(text)) {
    return false;
  } else {
    return true;
  }
}
function letterValidation(text) {
  const isOnlyAlphabets = /^[A-Za-z]+$/;
  if (!isOnlyAlphabets.test(text)) {
    return true;
  } else {
    return false;
  }
}

function phoneValidation(number) {
  const containsDigits = /\d{10}/;
  if (containsDigits.test(number)) {
    return true;
  } else {
    return false;
  }
}

export {
  emailValidation,
  passwordValidation,
  letterValidation,
  phoneValidation,
  nameValidation,
};
