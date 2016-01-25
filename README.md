# soundcloud-react-native

##Install React Native
[Docs](https://facebook.github.io/react-native/docs/getting-started.html)

##Set up
###Important. This works and tested for android only (because i haven't iphone and macbook)
1. cd to project folder
2. type ```adb reverse tcp:8081 tcp:8081```. This needs because android trying to fetch js bundle from phone localhost
3. In constants/constants.js change ```REQUEST_URL``` to your ip adress. Live port 3000.
4. type ```react-native run-android```

To back in navigetion use swipe like on ios.

##Screens
![Main scene](https://github.com/38Slava/soundcloud-react-native/blob/master/Screenshot_2016-01-25-21-22-35.jpg "Main scene")
![Main scene](https://github.com/38Slava/soundcloud-react-native/blob/master/Screenshot_2016-01-25-21-22-54.jpg "Followings scene")
![Main scene](https://github.com/38Slava/soundcloud-react-native/blob/master/Screenshot_2016-01-25-21-23-07.jpg "Back on navigation")