import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Modal,
  ScrollView,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { supabase } from "../supabase";

const EditProfileScreen = () => {
  const navigation = useNavigation();
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [bio, setBio] = useState("");
  const [gradYear, setGradYear] = useState<string | null>(null);
  const [gradYearModalVisible, setGradYearModalVisible] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("users")
        .select("profilePic, bio, gradYear")
        .eq("id", user.id)
        .single();

      if (data) {
        setProfilePic(data.profilePic);
        setBio(data.bio);
        setGradYear(data.gradYear);
      } else if (error) {
        Alert.alert("Error", error.message);
      }
    };

    fetchUserData();
  }, []);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access media library is required!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setProfilePic(uri);
    }
  };

  const handleSaveChanges = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase
      .from("users")
      .update({ profilePic, bio, gradYear })
      .eq("id", user.id);

    if (error) {
      Alert.alert("Error", error.message);
    } else {
      Alert.alert("Success", "Profile updated successfully!");
      navigation.goBack();
    }
  };

  const gradYears = Array.from({ length: 10 }, (_, i) => (2025 + i).toString());

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={30} color="#014AAD" />
        </TouchableOpacity>
        <Text style={styles.title}>Edit Profile</Text>
      </View>

      <View style={styles.profilePictureContainer}>
        <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
          {profilePic ? (
            <Image source={{ uri: profilePic }} style={styles.profileImage} />
          ) : (
            <Text style={styles.imageText}>Profile Picture</Text>
          )}
        </TouchableOpacity>
      </View>

      <Text style={styles.text}>Bio</Text>
      <TextInput style={styles.input} value={bio} onChangeText={setBio} />

      <Text style={styles.text}>Graduation Year</Text>
      <TouchableOpacity
        style={styles.collegeBox}
        onPress={() => setGradYearModalVisible(true)}
      >
        <Text style={{ color: "#6F6F71", fontSize: 16 }}>
          {gradYear || "Select Year"}
        </Text>
        <Ionicons name="chevron-down" size={20} color="#888" />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={gradYearModalVisible}
        onRequestClose={() => setGradYearModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ScrollView>
              {gradYears.map((year) => (
                <TouchableOpacity
                  key={year}
                  onPress={() => {
                    setGradYear(year);
                    setGradYearModalVisible(false);
                  }}
                  style={styles.option}
                >
                  <Text style={styles.optionText}>{year}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity
              style={{ marginTop: 10, padding: 12, alignItems: "center" }}
              onPress={() => setGradYearModalVisible(false)}
            >
              <Text style={{ color: "#014AAD", fontSize: 18, fontWeight: "bold" }}>
                Done
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <TouchableOpacity style={styles.nextButton} onPress={handleSaveChanges}>
        <Text style={styles.nextButtonText}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: "#fff",
    },
    title: {
      fontSize: 30,
      fontWeight: "bold",
      textAlign: "center",
      color: "#014AAD",
    },
    header: {
      width: "100%",
      marginTop: 20,
      marginBottom: 16,
      height: 80,
      justifyContent: "center",
    },
    profilePictureContainer: {
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 12,
    },
    imagePicker: {
      width: 120,
      height: 120,
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 60,
      justifyContent: "center",
      alignItems: "center",
    },
    profileImage: {
      width: 100,
      height: 100,
      borderRadius: 50,
    },
    imageText: {
      color: "#888",
      fontSize: 16,
      textAlign: "center",
    },
    text: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#014AAD",
      marginTop: 8,
      marginBottom: 4,
    },
    input: {
      height: 50,
      borderColor: "#ccc",
      borderWidth: 1,
      borderRadius: 8,
      paddingLeft: 16,
      fontSize: 16,
      marginBottom: 12,
    },
    collegeBox: {
      height: 50,
      borderColor: "#ccc",
      borderWidth: 1,
      borderRadius: 8,
      marginBottom: 16,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 16,
    },
    nextButton: {
      backgroundColor: "#89c7d6",
      paddingVertical: 14,
      borderRadius: 8,
      marginTop: 20,
      alignItems: "center",
    },
    nextButtonText: {
      color: "#fff",
      fontSize: 18,
      fontWeight: "bold",
    },
    modalContainer: {
      flex: 1,
      justifyContent: "flex-end",
      alignItems: "center",
    },
    modalContent: {
      width: "100%",
      backgroundColor: "white",
      padding: 20,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    option: {
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
    optionText: {
      fontSize: 16,
      color: "#333",
    },
  });

export default EditProfileScreen;
