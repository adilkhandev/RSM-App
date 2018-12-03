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
      latlng: { "latitude": 28.716499, "longitude": 77.170505 },
      title: "Chrysler Group Llc",
      description: "Manufactures motor vehicles & car bodies"
    }, {
      latlng: { "latitude": 28.566828, "longitude": 77.279372 },
      title: "Metal heat treating nsk",
      description: "Metal Heat Treating"
    }, {
      latlng: { "latitude": 28.385961, "longitude": 77.31343 },
      title: "30893 Century Drive",
      description: "Professional equipment nec nsk"
    }, {
      latlng: { "latitude": 28.56404, "longitude": 77.334269 },
      title: "Combi Packaging Systems Llc",
      description: "Packaging Machinery Manufacturing"
    }, {
      latlng: { "latitude": 28.552322, "longitude": 77.033463 },
      title: "Distinctive Mfg Group Llc",
      description: "General industrial machinery nec nsk"
    }, {
      latlng: { "latitude": 28.729923, "longitude": 77.10222 },
      title: "Aaf Flanders Inc.",
      description: "I forwarded information that the customer requested."
    }, {
      latlng: { "latitude": 28.548833, "longitude": 77.120696 },
      title: "Cameron Diversified Products",
      description: "Rolled Steel Shape Manufacturing"
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
    console.log("666", location);
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
          <Marker
            coordinate={{ "latitude": 28.6931858, "longitude": 77.1501815 }}
            image={require('../assets/images/location.png')}
            
          />
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
