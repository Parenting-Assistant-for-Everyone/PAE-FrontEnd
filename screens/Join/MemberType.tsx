import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MemberType: React.FC = () => {
  const navigation = useNavigation();

  const handleParentMemberPress = () => {
    // Navigate to the Parent Membership Signup screen
    navigation.navigate('ParentSignup');
  };

  const handleHelperMemberPress = () => {
    // Navigate to the Helper Membership Signup screen
    navigation.navigate('HelperSignup');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.card} onPress={handleParentMemberPress}>
        <View style={styles.cardContent}>
          <Image source={require('../../assets/parent.png')} style={styles.icon} />
          <View>
            <Text style={styles.title}>          아이를 키우는 부모회원이에요!</Text>
            <Text style={styles.subtitle}>            부모 회원가입 {'>'}</Text>
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={handleHelperMemberPress}>
        <View style={styles.cardContent}>
          <Image source={require('../../assets/assistant.png')} style={styles.icon1} />
          <View>
            <Text style={styles.title}>도우미로 활동하고 싶어요!</Text>
            <Text style={styles.subtitle}>도우미 회원 가입 {'>'} </Text>
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.footerText}>건너뛰기</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FFD54F',
    padding: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 40,
    height: 40,
  },
  icon1:{
    width: 42,
    height: 40,
    marginRight: 27,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    color: '#666666',
  },
  footerText: {
    fontSize: 14,
    color: '#000000',
    textAlign: 'center',
    marginTop: 24,
  },
});

export default MemberType;
