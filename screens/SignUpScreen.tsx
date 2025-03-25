import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
  Modal,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Picker } from "@react-native-picker/picker";

type RootStackParamList = {
  Opening: undefined;
  SignIn: undefined;
  SignUp: undefined;
  SignUpaddClasses: undefined;
};

type NavigationProps = StackNavigationProp<RootStackParamList, "SignUp">;

const SignUpScreen: React.FC = () => {
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [graduationYear, setGraduationYear] = useState("");
  const [college, setCollege] = useState("");
  const navigation = useNavigation<NavigationProps>();
  const [modalVisible, setModalVisible] = useState(false);
  const [gradYear, setGradYear] = useState<string | null>(null);
  const [gradYearModalVisible, setGradYearModalVisible] = useState(false);
  const [password, setPassword] = useState("");

  // Function to pick an image for the profile
  const pickImage = async () => {
    // Request permission to access the gallery (for iOS)
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

    // Check if the user picked an image
    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setProfilePic(uri);
    }
  };

  const handleSubmit = () => {
    if (
      !name ||
      !email ||
      !college ||
      !bio ||
      !gradYear ||
      !profilePic ||
      !password
    ) {
      Alert.alert(
        "Missing Information",
        "Please fill out all fields before signing up.",
      );
      return;
    }

    console.log({ name, email, college, bio, gradYear, profilePic, password });
  };
  const colleges = ["Florida State University"];
  const gradYears = Array.from({ length: 10 }, (_, i) => (2025 + i).toString());

  return (
    <View style={styles.container}>
      {/* Custom Header */}
      <View style={[styles.header]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={30} color="#014AAD" />
        </TouchableOpacity>
        {/* Title */}
        <Text style={styles.title}>Let's Get Started</Text>
      </View>

      {/* Profile Picture */}
      <View style={styles.profilePictureContainer}>
        <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
          {profilePic ? (
            <Image source={{ uri: profilePic }} style={styles.profileImage} />
          ) : (
            <Text style={styles.imageText}>Profile Picture</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Name */}
      <Text style={styles.text}>Name</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />

      <Text style={styles.text}>College Edu</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
        autoCapitalize="none"
        onBlur={() => {
          if (!email.endsWith(".edu")) {
            alert("Please enter a valid .edu email address");
          }
        }}
      />

      {/* College Selection */}
      <Text style={styles.text}>Select Your College</Text>
      <TouchableOpacity
        style={styles.collegeBox}
        onPress={() => setModalVisible(true)}
      >
        <Text style={{ color: "#6F6F71", fontSize: 16 }}>
          {college || "Select College"}
        </Text>
        <Ionicons name="chevron-down" size={20} color="#888" />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* Picker Component */}
            <Picker
              selectedValue={college}
              onValueChange={(itemValue) => {
                setCollege(itemValue);
                setModalVisible(false);
              }}
            >
              <Picker.Item label="Select College" value="" />
              {colleges.map((col) => (
                <Picker.Item key={col} label={col} value={col} />
              ))}
            </Picker>
            {/* Close Button */}
            <TouchableOpacity
              style={{ marginTop: 10, padding: 12, alignItems: "center" }}
              onPress={() => setModalVisible(false)}
            >
              <Text
                style={{ color: "#014AAD", fontSize: 18, fontWeight: "bold" }}
              >
                Done
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

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

      {/* Graduation Year Modal */}
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
              <Text
                style={{ color: "#014AAD", fontSize: 18, fontWeight: "bold" }}
              >
                Done
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Bio*/}
      <Text style={styles.text}> Bio</Text>
      <TextInput style={styles.input} value={bio} onChangeText={setBio} />
      {/* passwrod*/}
      <Text style={styles.text}> Password</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />

      {/* Submit Button */}
      <TouchableOpacity
        style={styles.nextButton}
        onPress={() => {
          navigation.navigate("SignUpaddClasses"); // Navigate to next screen
        }}
      >
        <Text style={styles.nextButtonText}>Next</Text>
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
    fontSize: 35,
    fontWeight: "bold",
    textAlign: "center",
    color: "#014AAD",
  },

  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 4,
    paddingLeft: 16,
    fontSize: 16,
  },
  header: {
    width: "100%",
    marginTop: 20,
    height: 100,
    justifyContent: "center",
  },

  profilePictureContainer: {
    justifyContent: "center",
    alignItems: "center",
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
    fontSize: 20,
    fontWeight: "bold",
    color: "#014AAD",
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
  collegeBox: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingLeft: 16,
    paddingRight: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  option: {
    paddingVertical: 15,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  optionText: {
    fontSize: 18,
    color: "#014AAD",
  },
});

export default SignUpScreen;
