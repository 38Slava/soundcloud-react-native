/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

import React, {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
} from 'react-native';
import Root from './components/root';
import Followers from './components/followers';
import Followings from './components/followings';
import {REQUEST_URL, GLOBAL_STYLES} from './constants/constants';

class SoundCloudRN extends React.Component {
  renderScene(route, navigator) {
    switch(route.id) {
      case 'Root':
        return <Root navigator={navigator}/>
      case 'Followers':
        return <Followers navigator={navigator} uri={`${REQUEST_URL}/followers`}/>
      case 'Followings':
        return <Followings navigator={navigator} uri={`${REQUEST_URL}/followings`}/>
    }
  }
  render() {
    return (
      <Navigator
        style={styles.container}
        initialRoute={{
          name: 'Root',
          id: 'Root',
        }}
        renderScene={this.renderScene}
      />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});

AppRegistry.registerComponent('SoundCloudRN', () => SoundCloudRN);
