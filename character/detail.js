import React, {useEffect, useState} from 'react';
import {useDefaultNavigation} from '../common/hooks/default-navigation.hook';
import {
  Image,
  SafeAreaView,
  Text,
  View,
  Dimensions,
  ScrollView,
} from 'react-native';
import DefaultStyle from '../common/styles/default.style';
import useAPIFetch, {removeBaseURLAPI} from '../common/hooks/api-fetch.hook';
import CharacterStyle from './style';
import {reducerCharacters} from '../characters';
import LoaderComponent from '../common/components/loader.component';
import ItemListComponent from '../common/components/item-list.component';

const CharacterDetail = ({route, navigation}) => {
  const {id} = route.params;
  const widthScreen = Dimensions.get('window').width;
  useDefaultNavigation(navigation);
  const [isLoading, response] = useAPIFetch(`characters/${id}`, {}, [id]);
  const character = response
    ? reducerCharacters(response.data.results)[0]
    : null;

  const exploreComics = comics => {
    const resourceURI = removeBaseURLAPI(comics.resourceURI);
    navigation.push('Comics', {comics: {...comics, resourceURI}});
  };

  const borderStyle = () => {
    return {...CharacterStyle.BorderTitleSection, width: widthScreen / 4};
  };

  return (
    <SafeAreaView style={DefaultStyle.SafeAreaView}>
      <LoaderComponent
        isLoading={isLoading}
        defaultComponent={
          character ? (
            <ScrollView>
              <Image
                source={{uri: character.thumbnail}}
                style={{height: widthScreen, resizeMode: 'contain'}}
              />
              <View style={DefaultStyle.Section}>
                <Text style={CharacterStyle.NameDetail}>{character.name}</Text>
              </View>
              <View style={DefaultStyle.Section}>
                <View style={borderStyle()} />
                <Text style={CharacterStyle.SectionDetailTitle}>
                  {'BIOGRAPHY'}
                </Text>
              </View>
              <View style={DefaultStyle.Section}>
                <Text style={CharacterStyle.DescriptionDetail}>
                  {character.description || 'no description'}
                </Text>
              </View>
              <View style={DefaultStyle.Section}>
                <View style={borderStyle()} />
                <Text style={CharacterStyle.SectionDetailTitle}>
                  {'EXPLORE COMICS'}
                </Text>
              </View>
              <View style={DefaultStyle.Section}>
                {character.comics.map(c => (
                  <ItemListComponent
                    key={c.name}
                    name={c.name}
                    onPress={() => exploreComics(c)}
                  />
                ))}
              </View>
            </ScrollView>
          ) : null
        }
      />
    </SafeAreaView>
  );
};

export default CharacterDetail;
