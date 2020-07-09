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
  TextInput,
  Button,
  KeyboardAvoidingView,
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
const addIcon = require('./add-icon.png');

const App = () => {
  const [markerList, setMarkerList] = useState([]);
  const [markerText, setMarkerText] = useState('');
  const [selectedMarker, setSelectedMarker] = useState(-1);
  const commentTextInput = React.createRef();
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
        comment: '',
      },
    ]);
    console.log(markerList.length);
    setSelectedMarker(markerList.length);
    setMarkerText('');
    if(selectedMarker >= 0) {
      commentTextInput.current.focus();
    }
  };

  const handleInputChange = (text) => {
    setMarkerText(text);
  }

  const handleMarkerClick = (index) => {
    //Store the Index of current selected Marker. So the value can be updated using text input.
    setSelectedMarker(index);
    //Set Marker value to Text Input
    setMarkerText(markerList[index].comment);
  }
  
  //updating the marker comment value.
  const handleOkClick = () => {
    if(markerText.trim() == ''){
      alert('Please enter the marker text');
    }else{
      const tempArray = [...markerList];
      tempArray[selectedMarker].comment = markerText;
      setMarkerList(tempArray);
      setSelectedMarker(-1);
      alert('Done');
    }
  }

  let inputContainer = null;
  let imageContainer = null;
  
  console.log(selectedMarker);
  
  if(selectedMarker >= 0) {
    inputContainer = ( <View style={{ height:50, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', }}>
      <View style={{position: "absolute",bottom:0, flexDirection:'row' }}>
      <View style={{flex:1}}>
        <TextInput ref={commentTextInput} autoFocus onChangeText={handleInputChange} value={markerText} placeholder='Enter Marker Text'  style={{width: 'auto', height: 50, paddingHorizontal:15}} /> 
      </View>
      <View style={{width:60, justifyContent:'center'}} >
        <TouchableOpacity style={{alignItems:'center', justifyContent:'center'}} onPress={handleOkClick}>
          <Image
            style={styles.addLogo}
            source={addIcon}
          />
        </TouchableOpacity>
      </View>
      </View>
    </View>
    )
  }
  if(Boolean(markerList.length)) {
    imageContainer = markerList.map((markerItem, markerIndex) => {
      const {x, y} = markerItem;

      const _x = Number(x);
      const _y = Number(y);
      const left = _x;

      const top = markerImageHeight > _y ? _y : _y - markerImageHeight;

      const keyVal = `x${left}-y${top}`;
      return (
        <TouchableOpacity 
          key={keyVal}
          //onPress={() => alert(`marker clicked -  ${keyVal}`)}
          onPress={() => handleMarkerClick(markerIndex)}
          style={{
            flex: 8,
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
    });
  }
  
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{ flex: 1}}>

      <KeyboardAvoidingView style={{ flex: 1}} behavior={Platform.select({ios: 'padding', android: null})}  >
      <View style={{ flex: 1}}>

        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',  }}>
        
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View
            style={{
              flex: 1,
              position: 'relative',
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
            {imageContainer}

          </View>
         
          
        </ScrollView>
        </View>

            {inputContainer}
      </View>
        </KeyboardAvoidingView>

      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  addLogo: {
    width: 40,
    height: 40,
  },
});

export default App;
