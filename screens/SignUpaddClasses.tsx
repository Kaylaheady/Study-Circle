import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { supabase } from "../supabase";

type RootStackParamList = {
  SignUpaddClasses: { userID: string };
  Home: undefined;
};

type SignUpClassesScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "SignUpaddClasses"
>;

type SignUpaddClassesRouteProp = RouteProp<
  RootStackParamList,
  "SignUpaddClasses"
>;

const classOptions = [
  "COP 4090L Software Engineering Capstone",
  "COP 4090 Software Engineering",
  "Physics 201",
  "Mac 2311 Calculus I",
  "Mac 2312 Calculus II",
  "BSC 2010 Biology I",
  "COP 3330 Data Structures",
  "BSC 2011 Biology II",
  "ENC 1101 English I",
  "ENC 2135 English II",
  "CHM 1045 Chemistry I",
  "ASL 2160C Advanced American Sign Language",
  "Marketing 101",
];

const SignUpaddClasses: React.FC = () => {
  const route = useRoute<SignUpaddClassesRouteProp>();
  const { userID } = route.params;
  const navigation = useNavigation<SignUpClassesScreenNavigationProp>();
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const toggleClassSelection = (className: string) => {
    setSelectedClasses((prevSelected) =>
      prevSelected.includes(className)
        ? prevSelected.filter((c) => c !== className)
        : [...prevSelected, className],
    );
  };

  const handleSignUp = async () => {
    if (selectedClasses.length === 0) {
      Alert.alert(
        "Error",
        "Please select at least one class before proceeding.",
      );
      return;
    }

    setLoading(true);
    try {
      const insertData = selectedClasses.map((className) => ({
        user_id: userID,
        class_name: className,
      }));

      const { error } = await supabase.from("user_classes").insert(insertData);

      if (error) throw error;

      navigation.navigate("Home");
    } catch (error) {
      Alert.alert("Error", (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Custom Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={30} color="#014AAD" />
        </TouchableOpacity>
      </View>

      {/* Title */}
      <Text style={styles.title}>What classes are you in?</Text>

      {/* Class List */}
      <FlatList
        data={classOptions}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.classItem,
              selectedClasses.includes(item) && styles.selectedClass,
            ]}
            onPress={() => toggleClassSelection(item)}
          >
            <Text
              style={[
                styles.classText,
                selectedClasses.includes(item) && styles.selectedClassText,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        )}
      />

      {/* Next Button */}
      <TouchableOpacity
        style={styles.nextButton}
        onPress={handleSignUp}
        disabled={loading}
      >
        <Text style={styles.nextButtonText}>
          {loading ? "Saving..." : "Sign Up"}
        </Text>
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
  header: {
    width: "100%",
    marginTop: 40,
    marginBottom: 15,
    height: 30,
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    color: "#014AAD",
    marginBottom: 15,
  },
  classItem: {
    padding: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: "#f8f8f8",
  },
  classText: {
    fontSize: 18,
    color: "#333",
  },
  selectedClass: {
    backgroundColor: "#014AAD",
  },
  selectedClassText: {
    color: "#fff",
    fontWeight: "bold",
  },
  nextButton: {
    marginTop: 20,
    backgroundColor: "#89c7d6",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  nextButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default SignUpaddClasses;
