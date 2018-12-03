import React from 'react';
import { ScrollView, StyleSheet , View} from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import MapView from 'react-native-maps';

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {

    return (

      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{ // initial region set to Bileto
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
