import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface ProfileProps {
  id: number;
  name: string;
  introduce: string;
  age: number;
  gender: string;
  type: string;
  careerList: { size: number; dto: { company: string; period: string }[] };
  certificationStatus: string;
  precaution: string;
}

const Profile: React.FC<ProfileProps> = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params as { id: number };

  const [profileData, setProfileData] = useState<ProfileProps | null>(null);

  useEffect(() => {
    fetch(`http://172.30.1.64:8080/assistant/getProfile/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setProfileData(data.data);
      })
      .catch((error) => {
        console.error('Error fetching profile data:', error);
      });
  }, [id]);

  if (!profileData) {
    return (
      <View style={styles.container}>
        <Text></Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>프로필</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.profileHeader}>
          <Image
            source={{ uri: 'https://via.placeholder.com/100' }} // Replace with actual image URL
            style={styles.profileImage}
          />
          <View style={styles.profileTextContainer}>
            <Text style={styles.nickname}>{profileData.name}</Text>
            <Text style={styles.introduction}>{profileData.introduce}</Text>
          </View>
          <Icon name="chat" size={24} color="black" style={styles.chatIcon} />
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>나이</Text>
            <Text style={styles.infoValue}>{profileData.age}세</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>성별</Text>
            <Text style={styles.infoValue}>{profileData.gender === 'MALE' ? '남성' : '여성'}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>직업</Text>
            <Text style={styles.infoValue}>{profileData.type}</Text>
          </View>
        </View>

        <View style={styles.careerContainer}>
          <Text style={styles.sectionTitle}>경력</Text>
          {profileData.careerList.size > 0 ? (
            profileData.careerList.dto.map((career, index) => (
              <View key={index} style={styles.careerItem}>
                <Text>{career.period}</Text>
                <Text>{career.company}</Text>
              </View>
            ))
          ) : (
            <Text>경력이 없습니다.</Text>
          )}
        </View>

        <View style={styles.certificationsContainer}>
          <Text style={styles.sectionTitle}>자격증</Text>
          <View style={styles.certifications}>
            <Text
              style={[
                styles.certificationBadge,
                profileData.certificationStatus === 'NOT_HAVE' ? styles.badgeGray : styles.badgeYellow,
              ]}
            >
              {profileData.certificationStatus === 'NOT_HAVE' ? '무' : '유'}
            </Text>
          </View>
        </View>

        <View style={styles.precautionContainer}>
          <Text style={styles.sectionTitle}>주의사항</Text>
          <Text style={styles.precautionText}>{profileData.precaution || '없음'}</Text>
        </View>

        <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('EditProfile')}>
          <Text style={styles.editButtonText}>매칭하기</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop : 50,
    paddingLeft:20
  },
  headerTitle: {
    marginLeft: 10,
    fontSize: 24,
    fontWeight: 'bold',
    paddingLeft:90
  },
  content: {
    padding: 20,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 15,
  },
  profileTextContainer: {
    flex: 1,
  },
  nickname: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  introduction: {
    fontSize: 16,
    color: '#555',
  },
  chatIcon: {
    marginLeft: 10,
  },
  infoContainer: {
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  infoLabel: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  infoValue: {
    fontSize: 16,
  },
  careerContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
  careerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  certificationsContainer: {
    marginBottom: 20,
  },
  certifications: {
    flexDirection: 'row',
  },
  certificationBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginRight: 10,
    color: '#fff',
    textAlign: 'center',
    minWidth: 40,
  },
  badgeYellow: {
    backgroundColor: '#FFD700',
  },
  badgeGray: {
    backgroundColor: '#BEBEBE',
  },
  precautionContainer: {
    marginBottom: 20,
  },
  precautionText: {
    fontSize: 16,
    color: '#555',
    backgroundColor: '#F0F0F0',
    padding: 10,
    borderRadius: 5,
  },
  editButton: {
    backgroundColor: '#FFD700',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  editButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default Profile;
