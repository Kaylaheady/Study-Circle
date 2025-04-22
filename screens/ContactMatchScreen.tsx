import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Linking,
  ActivityIndicator,
} from "react-native";
import { supabase } from "../supabase";

interface MatchedUser {
  id: string;
  name: string;
  phone_number: string;
}

const ContactMatchScreen: React.FC = () => {
  const [matchedUsers, setMatchedUsers] = useState<MatchedUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      setLoading(true);

      // Get current user ID
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) {
        Alert.alert("Error", "Could not get current user.");
        setLoading(false);
        return;
      }

      const userId = user.id;

      // MIGHT NEED TO BE EDITED LATER:
      // Assumption: 'matches' table stores matches in user1_id/user2_id format
      const { data: matches, error: matchError } = await supabase
        .from("matches")
        .select("*")
        .or(`user1_id.eq.${userId},user2_id.eq.${userId}`);

      if (matchError) {
        Alert.alert("Error", matchError.message);
        setLoading(false);
        return;
      }

      const matchedUserIds = matches
        ?.map((match) =>
          match.user1_id === userId ? match.user2_id : match.user1_id
        )
        .filter(Boolean);

      if (!matchedUserIds.length) {
        setMatchedUsers([]);
        setLoading(false);
        return;
      }

      // NEED TO ADD phone_number AT SIGN UP:
      // Assumption: user_data table contains phone_number
      const { data: users, error: userError } = await supabase
        .from("user_data")
        .select("id, name, phone_number")
        .in("id", matchedUserIds);

      if (userError) {
        Alert.alert("Error", userError.message);
      } else {
        setMatchedUsers(users);
      }

      setLoading(false);
    };

    fetchMatches();
  }, []);

  const openMessagingApp = (name: string, phone: string) => {
    Alert.alert(
      `Contact ${name}`,
      `Would you like to open your messaging app to text ${name}?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Open",
          onPress: () => {
            const smsUrl = `sms:${phone}`;
            Linking.openURL(smsUrl).catch((err) =>
              Alert.alert("Error", "Failed to open messaging app.")
            );
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#014AAD" />
        <Text style={{ marginTop: 10 }}>Loading contacts...</Text>
      </View>
    );
  }

  if (matchedUsers.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.noMatchText}>No matched contacts yet 😔</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Matched Contacts</Text>
      <FlatList
        data={matchedUsers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.contactItem}
            onPress={() => openMessagingApp(item.name, item.phone_number)}
          >
            <Text style={styles.contactName}>{item.name}</Text>
            <Text style={styles.contactPhone}>{item.phone_number}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default ContactMatchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#014AAD",
    marginBottom: 16,
  },
  contactItem: {
    padding: 16,
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
  },
  contactName: {
    fontSize: 18,
    fontWeight: "600",
  },
  contactPhone: {
    fontSize: 14,
    color: "#666",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noMatchText: {
    fontSize: 18,
    color: "#888",
  },
});

