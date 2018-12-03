import React from 'react';
import { ScrollView, StyleSheet, View, Platform } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import MapView from 'react-native-maps';
import { Constants, Location, Permissions } from 'expo';

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  state = {
    location: null,
    errorMessage: null,
  };

  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator',
      });
    } else {
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    console.log("location", location);
    this.setState({ location });
  };
  render() {

    return (

      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 50.0517273,
            longitude: 14.4286503,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  map: {
    flex: 1,
  }
});
