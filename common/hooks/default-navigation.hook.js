import React, {useState, useEffect, useRef} from 'react';
import {Image, TouchableOpacity} from 'react-native';

export const useDefaultNavigation = (navigation, options, dependencies) => {
  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Image
          source={require('../../assets/logo.png')}
          style={{height: 30, resizeMode: 'contain'}}
        />
      ),
    });
  }, []);
  /*const willMount = useRef(true);
  if (willMount.current) {

    willMount.current = false;
  }*/
};
