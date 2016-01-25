'use strict';

import React, {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableNativeFeedback,
} from 'react-native';


export default class Profile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			profileData: null
		}
	}
	static defaultProps = {
		uri: null
	}
	static propTypes = {
		uri: React.PropTypes.string.isRequired
	}
	componentDidMount() {
    this.fetchProfileData();
  }
  goToFollowers = () => {
  	this.props.navigator.push({
  		name: 'Followers',
  		id: 'Followers'
  	});
  }
  goToFollowings = () => {
  	this.props.navigator.push({
  		name: 'Followings',
  		id: 'Followings'
  	});
  }
	fetchProfileData = () => {
    fetch(this.props.uri)
      .then(response => response.json())
      .then((responseData) => {
        this.setState({
          profileData: responseData
        });
      })
      .done();
  }
	render() {
		if (!this.state.profileData) return (
			<View>
				<Text>Loading...</Text>
			</View>
		);
		let profileData = this.state.profileData; 
		return (
			<View style={styles.container}>
				<Image
         	source={{uri: profileData.avatar_url}} 
         	style={styles.userAvatar}
        />
				<View style={styles.childContainer}>
					<Text style={[styles.text, styles.userName]}>
						{profileData.username}
					</Text>
					<View style={styles.userInfo}>
						<TouchableNativeFeedback
							onPress={this.goToFollowers}
							background={TouchableNativeFeedback.Ripple()}>
							<View style={styles.userInfoItem}>
								<Text style={[styles.text, styles.userInfoCount]}>
							  	{profileData.followers_count}
								</Text>
								<Text style={styles.text}>Followers</Text>
							</View>
						</TouchableNativeFeedback>
						<TouchableNativeFeedback
							onPress={this.goToFollowings}
							background={TouchableNativeFeedback.Ripple()}>
							<View style={styles.userInfoItem}>
								<Text style={[styles.text, styles.userInfoCount]}>
							  	{profileData.followings_count}
								</Text>
								<Text style={styles.text}>Follow</Text>
							</View>
						</TouchableNativeFeedback>
					</View>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
  container: {
  	flexDirection: 'row',
    backgroundColor: '#F5FCFF',
    padding: 15
  },
  childContainer: {
    flex: 1,
    flexDirection: 'column',
    alignSelf: 'center',
    paddingLeft: 10,
  },
  userAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50
  },
  userInfo: {
		flexDirection: 'row',
  },
  userInfoCount: {
		color: '#FF5500',
		fontWeight: '500',
  },
  userInfoItem: {
		flex: 1,
	},
  userName: {
  	fontWeight: '600',
  	fontSize: 18,
  	textAlign: 'left',
  	marginBottom: 10
  },
  text: {
    fontSize: 14,
    textAlign: 'center',
  },
});