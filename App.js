/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const gallery = require('./gallery.jpg');

const marker = require('./marker-icon.png');

const App: () => React$Node = () => {
  const [markerList, setMarkerList] = useState([]);
  const {
    height: markerImageHeight,
    width: markerImageWidth,
  } = Image.resolveAssetSource(marker);

  const handleImagePress = (event) => {
    const {locationX, locationY} = event.nativeEvent;

    console.log('img clicked', locationX, locationY);

    setMarkerList([
      ...new Set(markerList),
      {
        x: locationX,
        y: locationY,
      },
    ]);
  };
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View
            style={{
              flex: 1,
              position: 'relative',
              backgroundColor: 'gray',
            }}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={(e) => handleImagePress(e)}>
              <Image
                source={gallery}
                style={{
                  position: 'relative',
                  zIndex: 0,
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  aspectRatio: 4 / 3,
                }}
              />
            </TouchableOpacity>
            {Boolean(markerList.length) &&
              markerList.map((markerItem) => {
                const {x, y} = markerItem;

                const _x = Number(x);
                const _y = Number(y);
                const left = _x;

                const top =
                  markerImageHeight > _y ? _y : _y - markerImageHeight;

                const keyVal = `x${left}-y${top}`;
                return (
                  <TouchableOpacity
                    key={keyVal}
                    onPress={() => alert(`marker clicked -  ${keyVal}`)}
                    style={{
                      position: 'absolute',
                      zIndex: 1,
                      left,
                      top,
                    }}>
                    <Image
                      source={marker}
                      style={{
                        width: markerImageWidth,
                        height: markerImageHeight,
                      }}
                    />
                  </TouchableOpacity>
                );
              })}

            {/* <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Step One</Text>
              <Text style={styles.sectionDescription}>
                Edit <Text style={styles.highlight}>App.js</Text> to change this
                screen and then come back to see your edits.
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>See Your Changes</Text>
              <Text style={styles.sectionDescription}>
                <ReloadInstructions />
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Debug</Text>
              <Text style={styles.sectionDescription}>
                <DebugInstructions />
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Learn More</Text>
              <Text style={styles.sectionDescription}>
                Read the docs to discover what to do next:
              </Text>
            </View>
            <LearnMoreLinks /> */}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
