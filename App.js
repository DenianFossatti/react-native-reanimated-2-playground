import {AppRegistry, FlatList} from 'react-native';
import {name as appName} from './app.json';

import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  interpolate,
  withSpring,
  Extrapolate,
} from 'react-native-reanimated';

import Header from './src/Header';

const HEADER_EXPANDED_HEIGHT = 200;

const App = () => {
  const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
  const scrollY = useSharedValue(0);

  const headerAnimatedStyles = useAnimatedStyle(() => {
    const opacity = withSpring(
      interpolate(
        scrollY.value,
        [0, HEADER_EXPANDED_HEIGHT / 5],
        [1, 0],
        Extrapolate.CLAMP,
      ),
      {
        damping: 20,
        stiffness: 100,
      },
    );
    const height = withSpring(
      interpolate(
        scrollY.value,
        [0, HEADER_EXPANDED_HEIGHT / 2],
        [HEADER_EXPANDED_HEIGHT, 0],
        Extrapolate.CLAMP,
      ),
      {damping: 20, stiffness: 100},
    );
    return {
      height,
      opacity,
    };
  }, [scrollY.value]);

  const tabViewAnimatedStyles = useAnimatedStyle(() => {
    const paddingTop = withSpring(
      interpolate(
        scrollY.value,
        [0, HEADER_EXPANDED_HEIGHT / 2],
        [HEADER_EXPANDED_HEIGHT, 0],
        Extrapolate.CLAMP,
      ),
      {damping: 20, stiffness: 100},
    );
    return {
      paddingTop,
    };
  }, [scrollY.value]);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  let items = [];

  for (let i = 0; i < 30; i++) {
    items.push(i);
  }

  return (
    <View style={styles.container}>
      <Header style={headerAnimatedStyles} />
      <Animated.View
        style={[{backgroundColor: 'white'}, tabViewAnimatedStyles]}>
        <Text>Tab View</Text>
      </Animated.View>
      <AnimatedFlatList
        contentContainerStyle={styles.scrollContainer}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        renderItem={({item}) => <Text key={item}>item-{item}</Text>}
        data={items}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    padding: 16,
    paddingTop: 70,
  },
  title: {
    marginVertical: 16,
    color: 'black',
    fontWeight: 'bold',
    fontSize: 24,
  },
});

AppRegistry.registerComponent(appName, () => App);

export default App;
