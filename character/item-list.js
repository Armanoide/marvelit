import React from 'react';
import {Text, View, Image, TouchableWithoutFeedback} from 'react-native';
import CharacterStyle from './style';

const CharacterItemList = ({character, onPress}) => {
  return character ? (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={CharacterStyle.ContainerList}>
        <View style={{flex: 1}}>
          <Image
            style={CharacterStyle.Avatar}
            source={{uri: character.thumbnail}}
          />
        </View>
        <View style={{flex: 3, justifyContent: 'center'}}>
          <Text style={CharacterStyle.NameList}>{character.name}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  ) : null;
};

export default CharacterItemList;
