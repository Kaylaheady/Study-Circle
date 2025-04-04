import React, { useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Swiper from "react-native-deck-swiper";

const profiles = [
  { id: 1, name: "Alex", age: 22, image: "https://via.placeholder.com/300" },
  { id: 2, name: "Jordan", age: 25, image: "https://via.placeholder.com/300" },
  { id: 3, name: "Taylor", age: 23, image: "https://via.placeholder.com/300" },
  { id: 4, name: "Sam", age: 24, image: require("../assets/logo.png") },
  { id: 5, name: "Chris", age: 26, image: "https://via.placeholder.com/300" },
];

// TODO: add profiles from Supabase

const HomeScreen: React.FC = () => {
  const [profileIndex, setProfileIndex] = useState(0);

  const handleSwipeRight = () => {
    console.log("Matched with", profiles[profileIndex]?.name);
    setProfileIndex((prevIndex) => (prevIndex + 1) % profiles.length);
  };

  const handleSwipeLeft = () => {
    console.log("Skipped", profiles[profileIndex]?.name);
    setProfileIndex((prevIndex) => (prevIndex + 1) % profiles.length);
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image source={require("../assets/logo2.png")} style={styles.logo} />

      {/* Profile Swiper */}
      <View style={styles.swiperContainer}>
        <Swiper
          cards={profiles}
          renderCard={(profile) =>
            profile ? (
              <View style={styles.card}>
                <Image
                  source={
                    typeof profile.image === "string"
                      ? { uri: profile.image }
                      : profile.image
                  }
                  style={styles.image}
                />
                <View style={styles.nameContainer}>
                  <Text style={styles.nameText}>
                    {profile.name}
                    {profile.age ? `, ${profile.age}` : ""}
                  </Text>
                </View>
              </View>
            ) : null
          }
          onSwipedRight={handleSwipeRight}
          onSwipedLeft={handleSwipeLeft}
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
    height: 100,
    alignSelf: "center",
    marginTop: 50,
  },
  swiperContainer: {
    width: 380,
    marginTop: -90,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: "100%",
    height: 650,
    borderRadius: 10,
    backgroundColor: "green",
    alignSelf: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  nameContainer: {
    position: "absolute",
    bottom: 20,
    left: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  nameText: {
    fontSize: 22,
    color: "white",
  },
});
