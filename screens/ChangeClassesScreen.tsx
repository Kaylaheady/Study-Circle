import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { supabase } from "../supabase";

// Navigation setup
type RootStackParamList = {
  Profile: undefined;
};

type NavigationProps = StackNavigationProp<RootStackParamList, "Profile">;

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

const ChangeClassesScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProps>();
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchClasses = async () => {
      setLoading(true);
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        console.error("User fetch error:", userError);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("users")
        .select("classes")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("Class fetch error:", error);
      } else {
        setSelectedClasses(data.classes || []);
      }
      setLoading(false);
    };

    fetchClasses();
  }, []);

  const toggleClassSelection = (className: string) => {
    setSelectedClasses((prevSelected) =>
      prevSelected.includes(className)
        ? prevSelected.filter((c) => c !== className)
        : [...prevSelected, className]
    );
  };

  const handleSave = async () => {
    if (selectedClasses.length === 0) {
      Alert.alert(
        "Error",
        "Please select at least one class before saving changes."
      );
      return;
    }

    setLoading(true);
    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError || !user) throw new Error("User not found");

      const { error } = await supabase
        .from("users")
        .update({ classes: selectedClasses })
        .eq("id", user.id);

      if (error) throw error;

      Alert.alert("Success", "Classes updated successfully.");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={30} color="#014AAD" />
        </TouchableOpacity>
      </View>

      {/* Title */}
      <Text style={styles.title}>Edit Your Classes</Text>

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

      {/* Save Button */}
      <TouchableOpacity
        style={styles.nextButton}
        onPress={handleSave}
        disabled={loading}
      >
        <Text style={styles.nextButtonText}>
          {loading ? "Saving..." : "Save Changes"}
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

export default ChangeClassesScreen;
