import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TextInput,
  Pressable,
  FlatList,
} from "react-native";
import { useTheme, useIsFocused } from "@react-navigation/native";
import { connect } from "react-redux";

import API from "../api/API";
import Container from "./../components/Container";
import Icon from "./../components/Icon";
import PersonCard from "../components/PersonCard";
import Text from "./../components/Text";
import { useBackHandler } from "./../hooks/useBackHandler";
import ScreenNames from "../navigation/ScreenNames";

const ScreenWidth = Dimensions.get("screen").width;

function DiscoverScreen({ navigation, User }) {
  const [Searching, SetSearching] = useState(false);
  const [SearchQuery, SetSearchQuery] = useState("");
  const [Results, SetResults] = useState([]);
  const { colors, dark } = useTheme();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (SearchQuery.length) {
      SearchForPerson();
    } else {
      SetResults([]);
    }
  }, [SearchQuery]);

  useBackHandler(() => {
    if (Searching === true && isFocused === true) {
      SetSearching(false);
      return true;
    }
    return false;
  });

  const TextInputStyle = {
    backgroundColor: dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
    flex: 1,
    borderRadius: 12,
    alignItems: "center",
    flexDirection: "row",
    marginRight: 10,
  };

  const SearchForPerson = async () => {
    try {
      if (SearchQuery.length) {
        const response = await API.SearchQuery(SearchQuery, User.Token);
        if (response.ok) {
          if (response.data.UsersCount) {
            SetResults(response.data.Users);
          }
        }
      }
    } catch (error) {}
  };

  const GetSearchingScreen = () => {
    return (
      <View style={styles.SearchHeaderBox}>
        <Icon
          Name="Ionicons"
          IconName="arrow-back"
          size={30}
          marginRight={20}
          onPress={() => SetSearching(false)}
        />
        <View style={TextInputStyle}>
          <TextInput
            style={[styles.SearchInput, { color: colors.text }]}
            placeholder="Search"
            value={SearchQuery}
            onChangeText={(value) => SetSearchQuery(value)}
            placeholderTextColor={colors.text}
            autoFocus={true}
          />
          <Icon
            Name="Feather"
            IconName="x"
            size={24}
            marginRight={10}
            onPress={() => SetSearchQuery("")}
          />
        </View>
      </View>
    );
  };

  const GetDiscoveryScreen = () => {
    return (
      <View style={{ flex: 1 }}>
        <Pressable style={styles.Header} onPress={() => SetSearching(true)}>
          <View
            style={{
              backgroundColor: dark
                ? "rgba(255,255,255,0.1)"
                : "rgba(0,0,0,0.1)",
              flex: 1,
              borderRadius: 12,
              alignItems: "center",
              flexDirection: "row",
              paddingLeft: 10,
            }}
          >
            <Icon Name="AntDesign" IconName="search1" />
            <Text text="Search" marginLeft={20} size={20} />
          </View>
        </Pressable>
      </View>
    );
  };

  const RenderPersonCard = ({ item }) =>
    User._id !== item._id ? (
      <PersonCard
        Name={item.Name}
        Username={item.Username}
        ProfilePicture={item.ProfilePicture}
        onPress={
          User._id === item._id
            ? () => navigation.navigate(ScreenNames.ProfileScreen)
            : () =>
                navigation.navigate(ScreenNames.PersonProfile, {
                  title: item.Username,
                  _id: item._id,
                })
        }
      />
    ) : null;

  return (
    <Container style={styles.container}>
      {Searching ? GetSearchingScreen() : GetDiscoveryScreen()}
      {Searching ? (
        <View style={{ flex: 1 }}>
          <FlatList
            data={Results}
            renderItem={RenderPersonCard}
            keyExtractor={(item) => item._id.toString()}
            keyboardShouldPersistTaps="always"
          />
        </View>
      ) : null}
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    User: state.AuthState.User,
  };
};

export default connect(mapStateToProps)(DiscoverScreen);

const styles = StyleSheet.create({
  container: {},
  Header: {
    width: ScreenWidth,
    height: 55,
    padding: 10,
  },
  SearchHeaderBox: {
    width: ScreenWidth,
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
  },
  SearchInput: {
    borderRadius: 5,
    paddingLeft: 15,
    paddingTop: 3,
    paddingBottom: 3,
    flex: 1,
  },
});
