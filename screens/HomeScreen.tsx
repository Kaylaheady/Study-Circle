import React, { useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Swiper from "react-native-deck-swiper";

const profiles = [
  { id: 1, name: "Alex", age: 22, image: "https://via.placeholder.com/300" },
  { id: 2, name: "Jordan", age: 25, image: "https://via.placeholder.com/300" },
  { id: 3, name: "Taylor", age: 23, image: "https://via.placeholder.com/300" },
  { id: 4, name: "Sam", age: 24, image: "../assets/logo.png" },
  { id: 5, name: "Chris", age: 26, image: "https://via.placeholder.com/300" },
  { id: 1, name: "Alex", age: 22, image: "https://via.placeholder.com/300" },
  { id: 2, name: "Jordan", age: 25, image: "https://via.placeholder.com/300" },
  { id: 3, name: "Taylor", age: 23, image: "https://via.placeholder.com/300" },
  { id: 4, name: "Sam", age: 24, image: "../assets/logo.png" },
  { id: 5, name: "Chris", age: 26, image: "https://via.placeholder.com/300" },
  { id: 1, name: "Alex", age: 22, image: "https://via.placeholder.com/300" },
  { id: 2, name: "Jordan", age: 25, image: "https://via.placeholder.com/300" },
  { id: 3, name: "Taylor", age: 23, image: "https://via.placeholder.com/300" },
  { id: 4, name: "Sam", age: 24, image: "../assets/logo.png" },
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
                {/* <Image source={{ uri: profile.image }} style={styles.image} /> */}
                {/* <View style={styles.name}>
                  <Text style={styles.name}>
                    {profile.name}, {profile.age}
                  </Text>
                </View> */}
              </View>
            ) : null
          }
          onSwipedRight={handleSwipeRight}
          onSwipedLeft={handleSwipeLeft}
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
    width: 380, // Fixed width for the swiper container
    height: 630, // Fixed height for the swiper container
    borderColor: "blue", // Optional for debugging
    borderWidth: 1, // Optional for debugging
    marginTop: -30, // Adjust marginTop to move the container closer to the top
    paddingBottom: 0, // Remove paddingBottom if you want it to be closer to the top
  },
  card: {
    width: "100%", // Ensure card takes up the full width of the swiper container
    height: "20%", // Ensure card takes up the full height of the swiper container
    borderRadius: 10,
    backgroundColor: "green",
    zIndex: 1,
    paddingBottom: 600,
  },
  // image: {
  //   width: "100%",
  //   height: "100%",
  //   borderRadius: 10,
  // },
  // name: {
  //   justifyContent: "flex-end",
  //   alignItems: "center",
  //   fontSize: 22,
  //   fontWeight: "bold",
  //   marginTop: 10,
  //   color: "white",
  //   backgroundColor: "rgba(0, 0, 0, 0.5)",
  //   paddingHorizontal: 10,
  //   paddingVertical: 15,
  //   borderRadius: 5,
  // },
});
