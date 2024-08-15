import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import * as Location from 'expo-location';

const LocationAssistant: React.FC = () => {
  const navigation = useNavigation();
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [address, setAddress] = useState<string>(''); // 서버 응답 주소 상태
  const webviewRef = useRef<WebView>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      let { coords } = await Location.getCurrentPositionAsync({});
      setLocation({ latitude: coords.latitude, longitude: coords.longitude });
    })();
  }, []);

  const html = `
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <script type="text/javascript" src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=28007ffd9c8ca904dfa82a53af861944&libraries=services,clusterer,drawing"></script>
        <style>
          html, body {
            margin: 0;
            padding: 0;
            height: 100%;
            width: 100%;
            overflow: hidden;
          }
          #map {
            width: 100%;
            height: 100%;
          }
        </style>
      </head>
      <body>
        <div id="map"></div>
        <script type="text/javascript">
          var map, geocoder, marker;

          function initMap() {
            var container = document.getElementById('map');
            var options = {
              center: new kakao.maps.LatLng(33.450701, 126.570667),
              level: 4
            };

            map = new kakao.maps.Map(container, options);
            geocoder = new kakao.maps.services.Geocoder();

            function sendLocation() {
              var center = map.getCenter();
              window.ReactNativeWebView.postMessage(JSON.stringify({
                latitude: center.getLat(),
                longitude: center.getLng()
              }));
            }

            kakao.maps.event.addListener(map, 'idle', sendLocation);
          }

          function updateMapLocation(latitude, longitude) {
            var coords = new kakao.maps.LatLng(latitude, longitude);
            map.setCenter(coords);

            if (marker) {
              marker.setMap(null);
            }

            marker = new kakao.maps.Marker({
              map: map,
              position: coords,
              image: new kakao.maps.MarkerImage(
                'https://cdn0.iconfinder.com/data/icons/twitter-23/512/157_Twitter_Location_Map-256.png',
                new kakao.maps.Size(40, 40)
              )
            });

            fetchAddress(latitude, longitude).then(address => {
              var customOverlay = new kakao.maps.CustomOverlay({
                content: '<div style="padding:5px;">' + address + '</div>',
                map: map,
                position: coords
              });
              window.ReactNativeWebView.postMessage(JSON.stringify({
                latitude: latitude,
                longitude: longitude,
                address: address
              }));
            });
          }

          function fetchAddress(latitude, longitude) {
            return fetch('http://172.30.1.5:8080/member/getAddress', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                latitude: latitude,
                longitude: longitude,
                memberId: 1
              })
            })
            .then(response => response.json())
            .then(data => {
              return data.data;
            })
            .catch(error => {
              console.error('Error fetching address:', error);
              return '';
            });
          }

          window.onload = function() {
            initMap();
          };

          window.updateMapLocation = updateMapLocation;
        </script>
      </body>
    </html>
  `;

  const onMessage = (event: any) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      setAddress(data.address || ''); // 서버에서 받은 주소 상태에 저장
    } catch (error) {
      console.error('Error handling message:', error);
      setAddress(''); // 오류 발생 시 주소 상태 초기화
    }
  };

  const onLoadEnd = () => {
    if (location) {
      const { latitude, longitude } = location;
      const jsCode = `
        if (window.updateMapLocation) {
          window.updateMapLocation(${latitude}, ${longitude});
        }
      `;
      webviewRef.current?.injectJavaScript(jsCode);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        <Icon onPress={() => navigation.goBack()} style={styles.icon} name='arrow-back-ios' />
      </View>
      <View style={styles.addressContainer}>
        <Text style={styles.addressText}>{address}</Text>
      </View>
      <WebView
        source={{ html: html }}
        style={styles.webview}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        ref={webviewRef}
        onLoadEnd={onLoadEnd}
        onError={(error) => console.log('WebView error: ', error)}
        onMessage={onMessage} // 메시지 핸들러 추가
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#fff',
  },
  grid: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  icon: {
    fontSize: 26,
  },
  addressContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  addressText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  webview: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});

export default LocationAssistant;
