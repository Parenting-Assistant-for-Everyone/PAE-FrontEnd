import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LocationAssistant: React.FC = () => {
  const navigation = useNavigation();
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [address, setAddress] = useState<string>('');
  const [locationList, setLocationList] = useState<{ latitude: number; longitude: number; memberId: number, boardId: number }[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMember, setSelectedMember] = useState<{ memberId: number; boardId: number } | null>(null);
  const webviewRef = useRef<WebView>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      const memberId = await AsyncStorage.getItem('memberId');
      console.log("멤버 id:", memberId);

      if (memberId) {
        const addressParts = address.split(' ');
        const city = addressParts[0] || '';
        const district = addressParts[1] || '';
        const neighborhood = addressParts[2] || '';
        fetch(`http://172.30.1.64:8080/member/findAtLocation?city=${city}&district=${district}&neighborhood=${neighborhood}`)
          .then(response => response.json())
          .then(data => {
            if (data.httpStatusCode === 200) {
              const locations = data.data.locationList.map((loc: any) => ({
                latitude: loc.latitude,
                longitude: loc.longitude,
                memberId: loc.memberId,
                boardId: loc.boardId,
                type: loc.type
              }));
              setLocationList(locations);
              console.log('주소 : ', city, district, neighborhood);
              console.log('마커 표시되어야 할 데이터:', locations);
              if (webviewRef.current) {
                const jsCode = `window.addMarkers(${JSON.stringify(locations)});`;
                webviewRef.current.injectJavaScript(jsCode);
              }
            }
          })
          .catch(error => {
            console.error('Error fetching locations:', error);
          });
      }

      let { coords } = await Location.getCurrentPositionAsync({});
      setLocation({ latitude: coords.latitude, longitude: coords.longitude });
    })();
  }, [address]);

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
          var map, geocoder, markerArray = [];

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

            if (markerArray.length > 0) {
              markerArray.forEach(marker => marker.setMap(null));
              markerArray = [];
            }

            markerArray.push(new kakao.maps.Marker({
              map: map,
              position: coords,
              image: new kakao.maps.MarkerImage(
                'https://cdn0.iconfinder.com/data/icons/twitter-23/512/157_Twitter_Location_Map-256.png',
                new kakao.maps.Size(40, 40)
              )
            }));

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
            return fetch('http://172.30.1.64:8080/member/getAddress', {
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

function addMarkers(locations) {
  locations.forEach(location => {
    var coords = new kakao.maps.LatLng(location.latitude, location.longitude);
    
    // 마커의 type에 따라 다른 아이콘 설정
    var markerImage;
    switch (location.type) {
      case 'EXPERT':
        markerImage = new kakao.maps.MarkerImage(
          'https://cdn-icons-png.flaticon.com/128/6313/6313595.png', // 전문가 아이콘 이미지 URL
          new kakao.maps.Size(35, 35)
        );
        break;
      case 'MOTHER_WITH_KIDS':
        markerImage = new kakao.maps.MarkerImage(
          'https://cdn-icons-png.flaticon.com/128/4527/4527820.png', // 아이와 함께하는 엄마 아이콘 이미지 URL
          new kakao.maps.Size(40, 40)
        );
        break;
      case 'COLLEGE_STUDENT':
        markerImage = new kakao.maps.MarkerImage(
          'https://cdn-icons-png.flaticon.com/128/3429/3429402.png', // 대학생 아이콘 이미지 URL
          new kakao.maps.Size(40, 40)
        );
        break;
      default:
        markerImage = new kakao.maps.MarkerImage(
          'https://example.com/default_icon.png', // 기본 아이콘 이미지 URL
          new kakao.maps.Size(40, 40)
        );
    }
    
    var marker = new kakao.maps.Marker({
      map: map,
      position: coords,
      image: markerImage
    });

    // 마커 클릭 이벤트 리스너 추가
    kakao.maps.event.addListener(marker, 'click', function() {
      window.ReactNativeWebView.postMessage(JSON.stringify({ memberId: location.memberId, boardId: location.boardId }));
    });
    
    markerArray.push(marker);
  });
}


          window.onload = function() {
            initMap();
            window.addMarkers = addMarkers;
          };

          window.updateMapLocation = updateMapLocation;
          window.addMarkers = addMarkers;
        </script>
      </body>
    </html>
  `;

  const onMessage = async (event: any) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      if (data.latitude && data.longitude) {
        const address = await fetchAddress(data.latitude, data.longitude);
        console.log("응답:", address);
        setAddress(address);
      } else if (data.memberId && data.boardId) {
        setSelectedMember({ memberId: data.memberId, boardId: data.boardId });
        setModalVisible(true);
      }
    } catch (error) {
      console.error('Error handling message:', error);
      setAddress(''); // 오류 발생 시 주소 상태 초기화
    }
  };

  function fetchAddress(latitude: number, longitude: number): Promise<string> {
    return fetch('http://172.30.1.64:8080/member/getAddress', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        latitude: latitude,
        longitude: longitude,
        memberId: 1,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        return data.data;
      })
      .catch((error) => {
        console.error('Error fetching address:', error);
        return '';
      });
  }

  const onLoadEnd = () => {
    if (location) {
      const { latitude, longitude } = location;
      const jsCode = `
        if (window.updateMapLocation) {
          window.updateMapLocation(${latitude}, ${longitude});
        }
        if (window.addMarkers && ${locationList.length > 0}) {
          window.addMarkers(${JSON.stringify(locationList)});
        } else {
          console.log('No locations to add markers for');
        }
      `;
      webviewRef.current?.injectJavaScript(jsCode);
    }
  };

  const handleProfileView = () => {
    setModalVisible(false);
    navigation.navigate('ProfileDetail',{id:selectedMember.memberId});
  };

  const handleBoardNavigation = () => {
    setModalVisible(false);
    if (selectedMember) {
      navigation.navigate('MatchingBoardDetail', { id: selectedMember.boardId });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        <Icon onPress={() => navigation.goBack()} style={styles.icon} name='arrow-back-ios' />
        <View style={styles.addressContainer}>
          <Text style={styles.addressText}>{address}</Text>
        </View>
      </View>
      <WebView
        source={{ html: html }}
        style={styles.webview}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        ref={webviewRef}
        onLoadEnd={onLoadEnd}
        onError={(error) => console.log('WebView error: ', error)}
        onMessage={onMessage}
      />
      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>선택하세요</Text>
            <TouchableOpacity style={styles.modalButton} onPress={handleProfileView}>
              <Text style={styles.modalButtonText}>프로필 정보 보기</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={handleBoardNavigation}>
              <Text style={styles.modalButtonText}>게시글 이동하기</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={() => setModalVisible(false)}>
              <Text style={styles.modalButtonText}>취소</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    paddingHorizontal: 50,
    paddingVertical: 15,
  },
  addressText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  webview: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#FFD700',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: 'gray',
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default LocationAssistant;
