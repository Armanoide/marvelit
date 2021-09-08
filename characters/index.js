import React, {useState} from 'react';
import {SearchBar} from 'react-native-elements';
import {SafeAreaView, FlatList} from 'react-native';
import DefaultStyle from '../common/styles/default.style';
import {useDefaultNavigation} from '../common/hooks/default-navigation.hook';
import useAPIFetch from '../common/hooks/api-fetch.hook';
import CharacterItemList from '../character/item-list';
//import response from './data.json';
import LoaderComponent from '../common/components/loader.component';

export const reducerCharacters = chars => {
  return chars.map(i => {
    return {
      id: i.id,
      name: i.name,
      thumbnail: `${i.thumbnail.path}.${i.thumbnail.extension}`,
      description: i.description,
      comics: i.comics.items,
    };
  });
};

const createParams = searchText => {
  if (!searchText || searchText.length <= 0) {
    return {};
  }
  return {nameStartsWith: searchText};
};

const Characters = ({navigation}) => {
  useDefaultNavigation(navigation);
  const [searchText, setSearchText] = useState('');
  const [isLoading, response] = useAPIFetch(
    'characters',
    {params: createParams(searchText)},
    [searchText],
  );
  const characters = response ? reducerCharacters(response.data.results) : [];
  const updateSearch = search => {
    setSearchText(search);
  };

  const displayDetail = character => {
    navigation.push('CharacterDetail', {id: character.id});
  };

  return (
    <SafeAreaView style={DefaultStyle.SafeAreaView}>
      <SearchBar
        loadingProps={{animating: searchText.length > 0 && isLoading}}
        value={searchText}
        onChangeText={updateSearch}
      />
      <LoaderComponent
        isLoading={isLoading}
        condition={characters.length === 0}
        defaultComponent={
          <FlatList
            style={{height: '100%'}}
            data={characters}
            renderItem={item => (
              <CharacterItemList
                onPress={() => displayDetail(item.item)}
                character={item.item}
              />
            )}
          />
        }
      />
    </SafeAreaView>
  );
};

export default Characters;
