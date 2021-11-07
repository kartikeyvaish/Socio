import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';

function TabBar(props) {
  return <View style={styles.container}></View>;
}

export default TabBar;

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('screen').width,
    height: 50,
    backgroundColor: 'red',
  },
});
