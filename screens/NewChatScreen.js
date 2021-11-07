import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import { connect } from "react-redux";

import API from "../api/API";
import config from "../config/config";
import ColorPallete from "../config/ColorPallete";
import Container from "../components/Container";
import NewChatCard from "../components/NewChatCard";
import Text from "../components/Text";
import TextInput from "./../components/TextInput";

function NewChatScreen({ navigation, User }) {
  const [Selected, SetSelected] = useState(null);
  const [Search, SetSearch] = useState("");
  const [SearchList, SetSearchList] = useState([]);
  const [Loading, SetLoading] = useState(false);

  useEffect(() => {
    if (Search.length) SearchForPerson();
    else SetSearchList([]);
  }, [Search]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        Loading ? (
          <ActivityIndicator
            size="small"
            color={ColorPallete.primary}
            marginRight={20}
          />
        ) : (
          <Text
            text="Chat"
            color={Selected === null ? null : ColorPallete.primary}
            size={18}
            marginRight={20}
            style={{ opacity: Selected === null ? 0.5 : 1 }}
            family="InterBold"
            onPress={Loading ? null : Selected === null ? null : StartChat}
          />
        ),
    });
  });

  const SearchForPerson = async () => {
    try {
      if (Search.length) {
        const response = await API.SearchQuery(Search, User.Token);
        if (response.ok) SetSearchList(response.data.Users);
      }
    } catch (error) {}
  };

  const StartChat = async () => {
    try {
      SetLoading(true);
      const response = await API.CreateNewChat(
        {
          user_id: Selected._id,
        },
        User.Token
      );
      SetLoading(false);
      if (response.ok) {
        navigation.replace("ChatRoom", {
          RoomID: response.data.Room._id,
          OtherUser: response.data.Room.chatting_with,
        });
      } else {
        ToastAndroid.show(response.data, 3000);
      }
    } catch (error) {
      SetLoading(false);
      ToastAndroid.show(config.messages.ServerError, 3000);
    }
  };

  const RenderItem = ({ item }) =>
    item._id === User._id ? null : (
      <NewChatCard
        Selected={Selected}
        onPress={
          Selected?._id === item._id
            ? () => SetSelected(null)
            : () => SetSelected(item)
        }
        Name={item.Name}
        Username={item.Username}
        ProfilePicture={item.ProfilePicture}
        _id={item._id}
      />
    );

  return (
    <Container style={styles.container}>
      <Text text="To" family="InterBold" marginTop={10} />
      <TextInput
        mode="flat"
        label="Search"
        onChangeText={(text) => SetSearch(text)}
      />
      <Text
        text="Suggested"
        family="InterBold"
        marginTop={10}
        marginBottom={10}
      />
      <FlatList
        data={SearchList}
        renderItem={RenderItem}
        contentContainerStyle={{ flex: 1 }}
        keyExtractor={(item) => item._id.toString()}
        ListEmptyComponent={
          <View style={styles.ListEmpty}>
            <Text
              text={
                Search.length
                  ? "No Users Found"
                  : "Start typing to search users..."
              }
              size={18}
              style={{ textAlign: "center" }}
            />
          </View>
        }
      />
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    User: state.User,
  };
};

export default connect(mapStateToProps)(NewChatScreen);

const styles = StyleSheet.create({
  container: { paddingLeft: 15, paddingRight: 15 },
  ListEmpty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
