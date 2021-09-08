import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import DefaultStyle from '../styles/default.style';
import Icon from 'react-native-vector-icons/FontAwesome';

const ItemListComponent = ({name, onPress, key}) => {
  return (
    <View key={key}>
      <TouchableOpacity onPress={onPress}>
        <View style={DefaultStyle.ItemButtonList}>
          <View style={{flex: 0.9}}>
            <Text style={DefaultStyle.ItemButtonListText}>{name}</Text>
          </View>
          <View style={{flex: 0.1}}>
            <Icon name="arrow-right" size={15} color="red" />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ItemListComponent;
