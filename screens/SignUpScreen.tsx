import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

const SignUpScreen: React.FC = () => {
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [funFact, setFunFact] = useState("");
  const [graduationYear, setGraduationYear] = useState("");

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
    console.log({ name, email, funFact, graduationYear, profilePic });
  };

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Let's Get Started</Text>

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

      {/* College Email */}
      <Text style={styles.text}>College Edu</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      {/* Fun Fact */}
      <Text style={styles.text}> Fun Fact</Text>
      <TextInput
        style={styles.input}
        value={funFact}
        onChangeText={setFunFact}
      />

      {/* Graduation Year */}
      <Text style={styles.text}>Grad Year</Text>
      <TextInput
        style={styles.input}
        value={graduationYear}
        onChangeText={setGraduationYear}
        keyboardType="numeric"
      />

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Sign Up</Text>
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
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    color: "#014AAD",
    marginBottom: 32,
  },

  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingLeft: 16,
    fontSize: 16,
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
    marginBottom: 16,
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
  submitButton: {
    backgroundColor: "#89c7d6",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default SignUpScreen;
