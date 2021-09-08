import {StyleSheet} from 'react-native';

const Container = {
  backgroundColor: 'transparent',
  marginLeft: 15,
  marginRight: 15,
  marginTop: 10,
};

export default StyleSheet.create({
  SafeAreaView: {
    backgroundColor: '#202020',
    height: '100%',
  },
  Container,
  Section: {
    ...Container,
    marginTop: 50,
  },
  ItemButtonList: {
    height: 50,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  ItemButtonListText: {
    fontSize: 15,
    color: '#FFF',
    fontWeight: 'bold',
  },
});
