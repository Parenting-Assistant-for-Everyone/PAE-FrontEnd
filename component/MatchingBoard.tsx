import React, { useEffect, useState, useCallback } from 'react';
import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity, TextInput, Modal, FlatList } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BoardList from './Board/BoardList';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

function MatchingBoard() {
  const [selected, setSelected] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSearchVisible, setSearchVisible] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [addressData, setAddressData] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [selectedAddressDetails, setSelectedAddressDetails] = useState([]);
  const [finalAddressName, setFinalAddressName] = useState(''); // 최종 선택된 addr_name
  const [cnt,setCnt] = useState(0);
  const navigation = useNavigation();

  const fetchData = async (keyword = '') => {
    try {
      let url = `http://192.168.0.81:8080/board/matchingBoardList?address=${finalAddressName}&page=1&type=${selected}&keyword=${keyword}`;
      console.log('주소는?',finalAddressName);
      const response = await axios.get(url, {
        headers: { 'Content-Type': 'application/json' },
      });

      const result = response.data.data.boardList;
      setData(result);
      console.log("결과:", response.data.data);
    } catch (error) {
      console.error("Fetch error:", error);
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSGISData = async () => {
    try {
      const authResponse = await axios.get(
        'https://sgisapi.kostat.go.kr/OpenAPI3/auth/authentication.json',
        {
          params: {
            consumer_key: 'fceda0bc936d44b292e9',
            consumer_secret: 'e22535122fc749889edb',
          },
        }
      );

      const accessToken = authResponse.data.result.accessToken;

      const addressResponse = await axios.get(
        `https://sgisapi.kostat.go.kr/OpenAPI3/addr/stage.json`,
        {
          params: {
            accessToken: accessToken,
          },
        }
      );

      setAddressData(addressResponse.data.result);
      console.log("주소 데이터:", addressResponse.data.result);
    } catch (error) {
      console.error("SGIS API Error:", error);
    }
  };

  const fetchDetailedAddress = async (cd) => {
    try {
      const authResponse = await axios.get(
        'https://sgisapi.kostat.go.kr/OpenAPI3/auth/authentication.json',
        {
          params: {
            consumer_key: 'fceda0bc936d44b292e9',
            consumer_secret: 'e22535122fc749889edb',
          },
        }
      );

      const accessToken = authResponse.data.result.accessToken;

      const detailedResponse = await axios.get(
        `https://sgisapi.kostat.go.kr/OpenAPI3/addr/stage.json`,
        {
          params: {
            accessToken: accessToken,
            cd: cd,
          },
        }
      );

      setSelectedAddressDetails(detailedResponse.data.result);
      setAddressData(detailedResponse.data.result); // 모달에 세부 주소를 표시
      console.log("세부 주소 데이터:", detailedResponse.data.result);
    } catch (error) {
      console.error("Detailed Address Error:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      fetchData();
      fetchSGISData(); // SGIS 데이터 가져오기
      AsyncStorage.setItem('memberId', '1');
    }, [selected,isModalVisible])
  );

  const handlePress = (type: string) => {
    setSelected(selected === type ? '' : type);
  };

  const handleCreateBoard = () => {
    navigation.navigate('CreateMatchingBoard');
  };

  const handleSearch = () => {
    fetchData(searchKeyword);
  };

  const search = () => {
    if (isSearchVisible) {
      fetchData(searchKeyword);
    }
    setSearchVisible(!isSearchVisible);
  };

  const handleSelectAddress = (item) => {
    
    if (item.cd) {
      fetchDetailedAddress(item.cd); // 세부 주소를 가져와 모달에 표시
      setCnt(cnt+1);
      console.log('cnt 값:', cnt);
      if(cnt === 2){
        setModalVisible(false);
        setCnt(0);
        setFinalAddressName(item.addr_name); // 최종 선택된 addr_name 저장
        setSelectedAddress(item.full_addr); // full_addr는 저장만 함
      }
    } 
  };
  console.log("선택한 주소:",selectedAddress);

  const handleSaveAddress = async () => {
    try {
      await AsyncStorage.setItem('selectedAddress', selectedAddress);
      console.log('Selected Address Saved:', selectedAddress);
    } catch (error) {
      console.error('Save Address Error:', error);
    }
  };

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        <Icon onPress={() => navigation.goBack()} style={styles.icon} name='arrow-back-ios' />
        {!isSearchVisible ? (
          <Text style={styles.text}>육아도우미 게시판</Text>
        ) : (
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="검색어를 입력하세요"
              value={searchKeyword}
              onChangeText={setSearchKeyword}
            />
          </View>
        )}
        <Icon onPress={() => search()} style={styles.icon} name='search' />
        <Icon onPress={() => navigation.navigate('LocationAssistant')} style={styles.icon} name='map' />
      </View>

      <View style={styles.gridButton}>
        <TouchableOpacity
          style={[
            styles.button,
            selected === 'OFFER' ? styles.selectedButton : styles.unselectedButton,
          ]}
          onPress={() => handlePress('OFFER')}
        >
          <Text style={styles.btnText}>구인</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            selected === 'SEARCH' ? styles.selectedButton : styles.unselectedButton,
          ]}
          onPress={() => handlePress('SEARCH')}
        >
          <Text style={styles.btnText}>구직</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            selected === '전국' ? styles.selectedButton : styles.unselectedButton,
          ]}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.btnText}>{finalAddressName === '' ? '전국' : finalAddressName}</Text>

        </TouchableOpacity>
      </View>

      <SafeAreaView style={styles.boardList}>
        <BoardList items={data} />
      </SafeAreaView>

      <TouchableOpacity style={styles.fab} onPress={handleCreateBoard}>
        <Icon name="add" style={styles.fabIcon} />
      </TouchableOpacity>

      {/* 주소 선택 모달 */}
      <Modal visible={isModalVisible} animationType="slide">
        <SafeAreaView style={styles.modalContainer}>
          <Text style={styles.modalTitle}>주소 선택</Text>
          <FlatList
            data={addressData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleSelectAddress(item)}>
                <Text style={styles.addressItem}>
                  {item.addr_name} ({item.full_addr})
                </Text>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
            <Text style={styles.modalButtonText}>취소</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#fff',
  },
  boardList: {
    marginTop: 10,
    paddingBottom: 100,
  },
  grid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  gridButton: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: 200,
    height: 40,
    marginTop: 25,
    alignSelf: 'center',
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    marginLeft: 8,
  },
  selectedButton: {
    backgroundColor: '#FFD700',
  },
  unselectedButton: {
    backgroundColor: 'rgba(255, 215, 0, 0.3)',
  },
  text: {
    fontSize: 22,
    fontWeight: '500',
  },
  btnText: {
    fontSize: 15,
    fontWeight: '500',
  },
  icon: {
    fontSize: 26,
  },
  fab: {
    position: 'absolute',
    right: 30,
    bottom: 50,
    width: 60,
    height: 60,
    backgroundColor: '#FFD700',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  fabIcon: {
    fontSize: 30,
    color: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 0,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  searchIcon: {
    fontSize: 28,
    color: '#FFD700',
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '500',
    marginBottom: 20,
  },
  addressItem: {
    fontSize: 16,
    marginBottom: 10,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  modalButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#FFD700',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalButtonText: {
    fontSize: 18,
    color: '#fff',
  },
  addressDisplay: {
    padding: 20,
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  saveButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#FFD700',
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    color: '#fff',
  },
});

export default MatchingBoard;
