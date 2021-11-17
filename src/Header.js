import {Dimensions, StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';

import Animated from 'react-native-reanimated';

const headerTitle = 'HEADER';
const {width: SCREEN_WIDTH} = Dimensions.get('screen');

const Header = ({style}) => {
  return (
    <Animated.View style={[styles.header, style]}>
      <Animated.Text
        style={{
          textAlign: 'center',
          fontSize: 18,
          color: 'black',
          marginTop: 28,
        }}>
        {headerTitle}
      </Animated.Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'lightblue',
    position: 'absolute',
    width: SCREEN_WIDTH,
    top: 0,
    left: 0,
    zIndex: 9999,
  },
});

export default Header;
