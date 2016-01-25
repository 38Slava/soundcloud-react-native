'use strict';

import React,{
	View,
	StyleSheet,
} from 'react-native';
import Profile from './profile';
import Favorites from './favorites';

import {REQUEST_URL} from '../constants/constants';

export default class Root extends React.Component {
	render() {
		console.log(REQUEST_URL);
		return (
			<View style={styles.container}>
        <Profile uri={REQUEST_URL} navigator={this.props.navigator}/>
        <Favorites uri={`${REQUEST_URL}/favorites`}/>
      </View>
		);
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});