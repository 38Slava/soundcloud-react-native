# soundcloud-react-native

##Install React Native
[Docs](https://facebook.github.io/react-native/docs/getting-started.html)

##Set up
###Important. This works and tested for android only (because i haven't iphone and macbook)
1. cd to project folder
2. type ```adb reverse tcp:8081 tcp:8081```. This needs because android trying to fetch js bundle from phone localhost
3. In constants/constants.js change ```REQUEST_URL``` to your ip adress. Live port 3000.
4. type ```react-native run-android```