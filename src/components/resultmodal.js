import React from 'react';
import {View, Text, Modal, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import CommonButton from './common/commonButton';
import COLORS from '../constants/colors';

const ResultModal = ({
  isModalVisible,
  correctCount,
  incorrectCount,
  totalCount,
  handleOnClose,
  navigation,
  handleHome,
}) => {
  return (
    <Modal
      animationType={'slide'}
      transparent={true}
      visible={isModalVisible}
      onRequestClose={handleOnClose}>
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.SHADOW,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: '90%',
            borderRadius: 10,
            elevation: 10,
            backgroundColor: COLORS.WHITE,
            padding: 40,
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 35}}>
            Results
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View style={{alignItems: 'center', padding: 20}}>
              <Text style={{fontSize: 30}}>
                {correctCount}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Icon name="checkmark" size={25} color="green" />
                <Text style={{fontSize: 18}}>
                  Correct
                </Text>
              </View>
            </View>
            <View style={{alignItems: 'center', padding: 20}}>
              <Text style={{fontSize: 30}}>
                {incorrectCount}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Icon name="close" size={25} color="red" />
                <Text style={{fontSize: 18}}>
                  Incorrect
                </Text>
              </View>
            </View>
          </View>
          <Text style={{fontSize: 18}}>
            {totalCount - (incorrectCount + correctCount)} Unattempted
          </Text>
          <View style={{marginTop: 20}}>
            <CommonButton title='Go Home' onPress={handleHome} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ResultModal;