import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const LocationSignup: React.FC = () => {
  const [regions, setRegions] = useState([]);
  const [subRegions, setSubRegions] = useState([]);
  const [detailedAddresses, setDetailedAddresses] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedSubRegion, setSelectedSubRegion] = useState<string | null>(null);
  const navigation = useNavigation();

  useEffect(() => {
    fetchSGISData();
  }, []);

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

      setRegions(addressResponse.data.result);
    } catch (error) {
      console.error('SGIS API Error:', error);
    }
  };

  const fetchSubRegions = async (cd: string) => {
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

      const subRegionResponse = await axios.get(
        `https://sgisapi.kostat.go.kr/OpenAPI3/addr/stage.json`,
        {
          params: {
            accessToken: accessToken,
            cd: cd,
          },
        }
      );

      setSubRegions(subRegionResponse.data.result);
      setDetailedAddresses([]); // Clear detailed addresses when fetching sub-regions
    } catch (error) {
      console.error('SGIS API Error:', error);
    }
  };

  const fetchDetailedAddresses = async (cd: string) => {
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

      // Fetch detailed address data using sub-region's cd
      const detailedResponse = await axios.get(
        `https://sgisapi.kostat.go.kr/OpenAPI3/addr/stage.json`,
        {
          params: {
            accessToken: accessToken,
            cd: cd,
          },
        }
      );

      setDetailedAddresses(detailedResponse.data.result);
      setSubRegions([]); // Clear sub-regions when fetching detailed addresses
    } catch (error) {
      console.error('SGIS API Error:', error);
    }
  };

  const handleRegionClick = (region: any) => {
    setSelectedRegion(region.addr_name);
    fetchSubRegions(region.cd);
  };

  const handleSubRegionClick = (subRegion: any) => {
    setSelectedSubRegion(subRegion.addr_name);
    fetchDetailedAddresses(subRegion.cd);
  };

  const handleBackClick = () => {
    if (detailedAddresses.length > 0) {
      setDetailedAddresses([]); // Go back to sub-regions
    } else if (subRegions.length > 0) {
      setSubRegions([]); // Go back to regions
      setSelectedRegion(null);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>지역을 선택해 주세요</Text>

      <View style={styles.tabContainer}>
        <TouchableOpacity style={[styles.tabButton, styles.selectedTab]}>
          <Text style={styles.tabText}>지역순</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton1}>
          <Text style={styles.tabText}>가나다순</Text>
        </TouchableOpacity>
      </View>

      {/* Horizontally Scrollable Region Buttons */}
      {regions.length > 0 && (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {regions.map((region: any) => (
            <TouchableOpacity
              key={region.cd}
              style={[
                styles.regionButton,
                selectedRegion === region.addr_name ? styles.selectedRegion : null,
              ]}
              onPress={() => handleRegionClick(region)}
            >
              <Text style={[
                styles.regionText,
                selectedRegion === region.addr_name ? styles.selectedRegionText : null
              ]}>
                {region.addr_name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      {/* Display Sub-Regions or Detailed Addresses */}
      <ScrollView style={styles.scrollContainer}>
        {subRegions.length > 0 && subRegions.map((subRegion: any) => (
          <TouchableOpacity
            key={subRegion.cd}
            style={styles.subRegionButton}
            onPress={() => handleSubRegionClick(subRegion)}
          >
            <Text style={styles.subRegionText}>{subRegion.addr_name}</Text>
          </TouchableOpacity>
        ))}

        {detailedAddresses.length > 0 && detailedAddresses.map((detail: any) => (
          <TouchableOpacity
            key={detail.cd}
            style={styles.subRegionButton}
          >
            <Text style={styles.subRegionText}>{detail.addr_name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Back Button */}
      {(subRegions.length > 0 || detailedAddresses.length > 0) && (
        <TouchableOpacity style={styles.backButton} onPress={handleBackClick}>
          <Text style={styles.backButtonText}>뒤로가기</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity style={styles.submitButton} onPress={() => navigation.navigate('WhendayPage')}>
        <Text style={styles.submitButtonText}>다음</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: '15%',
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  tabButton1: {
    flex: 1,
    paddingVertical: 12,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  selectedTab: {
    backgroundColor: '#FFE082',
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
  horizontalScroll: {
    marginBottom: 5,
    height: 70,
    flex: 0,
  },
  regionButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    height: 40,
  },
  selectedRegion: {
    backgroundColor: '#FFE082',
  },
  regionText: {
    fontSize: 14,
    color: '#333333',
  },
  selectedRegionText: {
    fontWeight: 'bold',
    color: '#000000',
  },
  scrollContainer: {
    marginBottom: 20,
  },
  subRegionButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 5,
    borderRadius: 10,
    backgroundColor: '#F5F5F5',
    height: 40,
  },
  subRegionText: {
    fontSize: 14,
    color: '#333333',
  },
  backButton: {
    alignItems: 'center',
    marginVertical: 10,
  },
  backButtonText: {
    fontSize: 14,
    color: '#999999',
  },
  submitButton: {
    backgroundColor: '#FDD835',
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default LocationSignup;
