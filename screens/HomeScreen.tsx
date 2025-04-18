import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, ActivityIndicator } from "react-native";
import Swiper from "react-native-deck-swiper";
import { supabase } from "../supabase";
const BUCKET_NAME = "profilepictures";
const SUPABASE_URL = "https://ssolcjnuddlznarnojud.supabase.co";

type Profile = {
  id: string;
  name: string;
  bio: string;
  image: string;
  classes: string[];
};

const HomeScreen: React.FC = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [profileIndex, setProfileIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchProfiles = async () => {
      console.log("Fetching users...");
      setLoading(true);

      // Fetch users
      const { data: users, error: userError } = await supabase
        .from("user_data")
        .select("*");
      if (userError) {
        console.error("User fetch error:", userError.message);
        setLoading(false);
        return;
      }

      console.log("Fetched users:", users);

      // Fetch user classes
      const { data: userClasses, error: classError } = await supabase
        .from("user_classes")
        .select("*");
      if (classError) {
        console.error("Classes fetch error:", classError.message);
        setLoading(false);
        return;
      }

      console.log("Fetched classes:", userClasses);

      const profilesWithClasses = users.map((user: any) => {
        const classes = userClasses
          .filter((c: any) => c.user_id === user.id)
          .map((c: any) => c.class_name);

        const imageUrl = user.image_url
          ? `${SUPABASE_URL}/storage/v1/object/public/${BUCKET_NAME}/${user.image_url}`
          : "https://via.placeholder.com/300";

        return {
          id: user.id,
          name: user.name,
          bio: user.bio,
          image: imageUrl,
          classes,
        };
      });

      console.log("Profiles with classes:", profilesWithClasses);
      setProfiles(profilesWithClasses);
      setLoading(false);
    };

    fetchProfiles();
  }, []);

  const handleSwipe = () => {
    setProfileIndex((prevIndex) => (prevIndex + 1) % profiles.length);
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: "center" }]}>
        <ActivityIndicator size="large" color="#00aa00" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={require("../assets/logo2.png")} style={styles.logo} />

      <View style={styles.swiperContainer}>
        <Swiper
          cards={profiles}
          renderCard={(profile) =>
            profile ? (
              <View style={styles.card}>
                <Image source={{ uri: profile.image }} style={styles.image} />
                <View style={styles.overlay}>
                  <Text style={styles.name}>{profile.name}</Text>
                  <Text style={styles.classesLabel}>{profile.bio}</Text>
                  <Text style={styles.classesLabel}>Classes</Text>
                  {profile.classes.map((className, idx) => (
                    <Text key={idx} style={styles.class}>
                      {className}
                    </Text>
                  ))}
                </View>
              </View>
            ) : null
          }
          onSwipedRight={handleSwipe}
          onSwipedLeft={handleSwipe}
          cardIndex={profileIndex}
          backgroundColor={"#fff"}
          stackSize={3}
        />
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  logo: {
    width: 300,
    height: 90,
    alignSelf: "center",
    marginTop: 60,
  },
  swiperContainer: {
    width: 380,
    height: 640,
    marginTop: -50,
    paddingBottom: 0,
  },
  card: {
    width: "100%",
    height: "90%",
    borderRadius: 10,
    marginTop: -40,
    backgroundColor: "#eee",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  overlay: {
    position: "absolute",
    bottom: 20,
    left: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
  },
  class: {
    fontSize: 16,
    color: "black",
    marginTop: 2,
  },
  classesLabel: {
    color: "black",
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 8,
  },
});
