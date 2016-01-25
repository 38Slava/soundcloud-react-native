import React, {
	StyleSheet,
  Text,
  View,
  Image,
  ListView,
} from 'react-native';

export default class Followings extends React.Component {
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
		this.fetchFollowingsData();
	}
	fetchFollowingsData = () => {
		fetch(this.props.uri)
		.then(response => response.json())
		.then((responseData) => {
			console.log(responseData);
			this.setState({
				dataSource: this.state.dataSource.cloneWithRows(responseData.collection),
				loaded: true,
			});
		})
		.done();
	}
	renderFollowings = (data) => {
		let response = {
			avatar: data.avatar_url,
			username: data.username,
			followers: data.followers_count,
			city: () => {
				if(!data.city) return ''
				return data.city.replace(' %', ',')
			}
		};
		return (
			<View style={styles.listItem}>
				<Image
					source={{uri: response.avatar}}
					style={styles.avatar}
				/>
				<View style={styles.textContainer}>
					<Text style={[styles.text, styles.username]}>{response.username}</Text>
					<Text style={styles.text}>{response.city}</Text>
					<Text style={[styles.text, styles.followersCount]}>Followers: {response.followers}</Text>
				</View>
			</View>
		)
	}
	renderSeparator = (sectionID, rowID, adjacentRowHighlighted) => {
		return (
			<View key={rowID} style={styles.listSeparator}></View>
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
				style={styles.list}
				dataSource={this.state.dataSource}
				renderRow={this.renderFollowings}
				renderSeparator={this.renderSeparator}		
			/>
		);
	}
}

const styles = StyleSheet.create({
  list: {
    backgroundColor: '#F5FCFF',
  },
  listItem: {
		flex: 1,
		flexDirection: 'row',
		padding: 15,
  },
  username: {
  	color: '#000'
  },
  followersCount: {
  	fontSize: 12
  },
  avatar: {
  	width: 64,
  	height: 64,
  	borderRadius: 50,
  },
  listSeparator: {
  	borderBottomWidth: 1,
  	borderBottomColor: '#ededed'
  },
  text: {
  	paddingTop: 2,
  	paddingBottom: 2,
  },
  textContainer: {
  	flex: 1,
  	alignSelf: 'center',
  	paddingLeft: 15,
  }
});