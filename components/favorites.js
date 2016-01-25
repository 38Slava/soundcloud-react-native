'use strict';

import React, {
  StyleSheet,
  Text,
  View,
  Image,
  ListView,
} from 'react-native';

export default class Favorites extends React.Component {
  constructor(props) {
		super(props);
		this.state = {
			dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
      dataLength: null,
		};
  }
  static defaultProps = {
		uri: null
	}
	static propTypes = {
		uri: React.PropTypes.string.isRequired
	}
	componentDidMount() {
		this.fetchFavoritesData();
	}
	fetchFavoritesData = () => {
		fetch(this.props.uri)
		.then(response => response.json())
		.then((responseData) => {
			console.log('Favorites', responseData);
			this.setState({
				dataSource: this.state.dataSource.cloneWithRows(responseData),
				loaded: true,
				dataLength: responseData.length,
			});
		})
		.done();
	}
	renderFavorites = (data) => {
		let response = {
			image: data.artwork_url || data.user.avatar_url,
			username: data.user.username,
			title: data.title
		};
		return (
			<View style={styles.listItem}>
				<Image
					source={{uri: response.image}}
					style={styles.artworkImage}
				/>
				<View style={styles.textContainer}>
					<Text style={styles.text}>{response.username}</Text>
					<Text style={[styles.text, styles.songTitle]}>{response.title}</Text>
				</View>
			</View>
		)
	}
	renderSeparator = (sectionID, rowID, adjacentRowHighlighted) => {
		return (
			<View key={rowID} style={styles.listSeparator}></View>
		)
	}
	renderTracksCount = () => {
		return (
			<View style={styles.listSeparator}>
				<Text style={styles.tracksCount}>{this.state.dataLength} tracks liked</Text>
			</View>
		)
	}
  render() {
		if (!this.state.loaded) return (
			<View>
				<Text>Loading...</Text>
			</View>
		);
			console.log(this.state.dataSource);
		return (
			<ListView
				dataSource={this.state.dataSource}
				renderRow={this.renderFavorites}
				renderHeader={this.renderTracksCount}
				renderSeparator={this.renderSeparator}		
			/>
		);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  listItem: {
		flex: 1,
		flexDirection: 'row',
		padding: 15,
  },
  tracksCount: {
  	margin: 15,
  },
  artworkImage: {
  	width: 64,
  	height: 64
  },
  listSeparator: {
  	borderBottomWidth: 1,
  	borderBottomColor: '#ededed'
  },
  text: {
  	paddingTop: 2,
  	paddingBottom: 2,
  },
  songTitle: {
		color: '#000000'
  },
  textContainer: {
  	flex: 1,
  	alignSelf: 'center',
  	paddingLeft: 15,
  }
});