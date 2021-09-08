import React, {useState} from 'react';
import {useDefaultNavigation} from '../common/hooks/default-navigation.hook';
import useAPIFetch from '../common/hooks/api-fetch.hook';
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import DefaultStyle from '../common/styles/default.style';
import ComicsStyle from './style';
import CharacterStyle from '../character/style';
import {priceEnum} from '../common/enum/price-type.enum';
import moment from 'moment';
import ItemListComponent from '../common/components/item-list.component';
import LoaderComponent from '../common/components/loader.component';

const reduceComics = response => {
  let data = response.data.results[0];

  return {
    title: data.title,
    description: data.description,
    thumbnail: `${data.thumbnail.path}.${data.thumbnail.extension}`,
    prices: data.prices,
    creators: data.creators.items,
    date: data.dates[0].date,
    characters: data.characters.items,
  };
};

const Comics = ({route, navigation}) => {
  useDefaultNavigation(navigation);
  const widthScreen = Dimensions.get('window').width;
  const url = route.params.comics.resourceURI;
  const [isLoading, response] = useAPIFetch(url, {}, [url]);
  const comics = response ? reduceComics(response) : null;

  const borderStyle = () => {
    return {...CharacterStyle.BorderTitleSection, width: widthScreen / 4};
  };

  const displayCharacters = character => {
    const id = character.resourceURI.split('characters/')[1];
    navigation.push('CharacterDetail', {id});
  };

  return (
    <>
      <LoaderComponent
        isLoading={isLoading}
        defaultComponent={
          comics ? (
            <SafeAreaView style={DefaultStyle.SafeAreaView}>
              <ScrollView>
                <View style={DefaultStyle.Container}>
                  <Text style={ComicsStyle.Title}>{comics.title}</Text>
                </View>
                <View style={DefaultStyle.Container}>
                  <Image
                    style={{height: widthScreen, resizeMode: 'contain'}}
                    source={{uri: comics.thumbnail}}
                  />
                </View>
                <View style={DefaultStyle.Section}>
                  <Text style={ComicsStyle.Description}>
                    {comics.description || 'no description'}
                  </Text>
                </View>
                <View style={DefaultStyle.Section}>
                  <View style={borderStyle()} />
                  <Text style={ComicsStyle.SectionDetailTitle}>
                    {'Published'}
                  </Text>
                </View>
                <View style={DefaultStyle.Container}>
                  <Text style={ComicsStyle.Published}>
                    {moment(comics.date).format('MMMM Do YYYY')}
                  </Text>
                </View>
                <View style={DefaultStyle.Section}>
                  <View style={borderStyle()} />
                  <Text style={ComicsStyle.SectionDetailTitle}>
                    {'Characters'}
                  </Text>
                </View>
                <View style={DefaultStyle.Container}>
                  {comics.characters.map(c => (
                    <View style={DefaultStyle.Container}>
                      <ItemListComponent
                        key={c.name}
                        name={c.name}
                        onPress={() => displayCharacters(c)}
                      />
                    </View>
                  ))}
                </View>
                <View style={DefaultStyle.Section}>
                  <View style={borderStyle()} />
                  <Text style={ComicsStyle.SectionDetailTitle}>{'Prices'}</Text>
                </View>
                <View style={DefaultStyle.Container}>
                  {comics.prices.map(p => (
                    <View style={DefaultStyle.Container}>
                      <View style={{flexDirection: 'row'}}>
                        <Text style={ComicsStyle.PriceType}>
                          {priceEnum(p.type)}
                        </Text>
                        <Text style={{color: 'white'}}>{p.price}$</Text>
                      </View>
                    </View>
                  ))}
                </View>
                <View style={DefaultStyle.Section}>
                  <View style={borderStyle()} />
                  <Text style={ComicsStyle.SectionDetailTitle}>
                    {'Authors'}
                  </Text>
                </View>
                <View style={DefaultStyle.Container}>
                  {comics.creators.map(c => (
                    <View style={DefaultStyle.Container}>
                      <View style={{flexDirection: 'row'}}>
                        <Text style={ComicsStyle.RoleCreator}>{c.role}</Text>
                        <Text style={{color: 'white'}}>{c.name}</Text>
                      </View>
                    </View>
                  ))}
                </View>
              </ScrollView>
            </SafeAreaView>
          ) : null
        }
      />
    </>
  );
};

export default Comics;
