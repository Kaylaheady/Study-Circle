import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Swiper from "react-native-deck-swiper";

const profiles = [
  { id: 1, name: "Alex", age: 22, image: "https://via.placeholder.com/300" },
  { id: 2, name: "Jordan", age: 25, image: "https://via.placeholder.com/300" },
  { id: 3, name: "Taylor", age: 23, image: "https://via.placeholder.com/300" },
  { id: 1, name: "Alex", age: 22, image: "https://via.placeholder.com/300" },
  { id: 2, name: "Jordan", age: 25, image: "https://via.placeholder.com/300" },
  { id: 3, name: "Taylor", age: 23, image: "https://via.placeholder.com/300" },
  { id: 1, name: "Alex", age: 22, image: "https://via.placeholder.com/300" },
  { id: 2, name: "Jordan", age: 25, image: "https://via.placeholder.com/300" },
  { id: 3, name: "Taylor", age: 23, image: "https://via.placeholder.com/300" },
];
// TODO: add profiles from supabase

const HomeScreen: React.FC = () => {
  const [profileIndex, setProfileIndex] = useState(0);

  const handleSwipeRight = () => {
    console.log("Matched with", profiles[profileIndex]?.name);
    setProfileIndex((prevIndex) => prevIndex + 1);
  };

  const handleSwipeLeft = () => {
    console.log("Skipped", profiles[profileIndex]?.name);
    setProfileIndex((prevIndex) => prevIndex + 1);
  };

  return (
    <View style={styles.container}>
      <Image source={require("../assets/logo2.png")} style={styles.logo} />
      <Swiper
        cards={profiles}
        renderCard={(profile) => (
          <View style={styles.card}>
            <Image source={{ uri: profile.image }} style={styles.image} />
            <Text style={styles.name}>
              {profile.name}, {profile.age}
            </Text>
          </View>
        )}
        onSwipedRight={handleSwipeRight}
        onSwipedLeft={handleSwipeLeft}
        cardIndex={profileIndex}
        backgroundColor={"#fff"}
        stackSize={3}
      />
    </View>
  );
};
export default HomeScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    color: "#014AAD",
    marginTop: 50,
  },
  card: {
    width: "100%",
    height: "95%",
    borderRadius: 10,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "green",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    paddingBottom: 20,
    paddingTop: 50,
    marginTop: 50,
  },
  image: {
    width: "100%",
    height: "75%",
    borderRadius: 10,
  },
  name: {
    justifyContent: "flex-end",
    alignItems: "center",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 10,
    color: "white",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: 20,
  },
});
