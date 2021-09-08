import {StyleSheet} from 'react-native';
import DefaultStyle from '../common/styles/default.style';

export default StyleSheet.create({
  Avatar: {
    width: 75,
    height: 75,
    borderRadius: 75 / 2,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'red',
  },
  ContainerList: {
    flexDirection: 'row',
    ...DefaultStyle.Container,
  },
  NameList: {
    textAlign: 'left',
    color: '#FFF',
  },
  NameDetail: {
    color: 'white',
    fontSize: 40,
    textAlign: 'center',
  },
  SectionDetailTitle: {
    color: '#AAA',
    fontSize: 20,
    textAlign: 'left',
  },
  BorderTitleSection: {
    height: 1,
    backgroundColor: 'red',
    marginTop: 10,
    marginBottom: 10,
  },
  DescriptionDetail: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
  },
});
