import React from 'react';
import {View} from 'react-native';
import {Bars} from 'react-native-loader';

const LoaderComponent = ({isLoading, condition, defaultComponent}) => {
  let _condition =
    condition == null || condition === undefined ? true : condition;
  return isLoading && _condition ? (
    <View
      style={{
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Bars color={'#FFFFFF'} />
    </View>
  ) : (
    defaultComponent
  );
};

export default LoaderComponent;
