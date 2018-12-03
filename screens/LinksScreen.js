import React from 'react';
import { ScrollView, StyleSheet, View, Platform } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import MapView, { Marker } from 'react-native-maps';
import { Constants, Location, Permissions } from 'expo';

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  state = {
    location: null,
    errorMessage: null,
    markers: [{
      latlng: { "latitude": 28.6931858, "longitude": 77.1501815 },
      title: "adil",
      description: "dadsdas"
    }]
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
        errorMessage: 'Permission to access location was',
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
            latitude: 28.6931858,
            longitude: 77.1501815,
            latitudeDelta: 0,
            longitudeDelta: 0.02
          }}
        >
          {this.state.markers.map((marker) => {
            return (
              <Marker
                key={marker.title}
              
                coordinate={marker.latlng}
                title={marker.title}
                image={require('../assets/images/light-green.png')}
                description={marker.description}
              />
            )
          })}
        </MapView>
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
