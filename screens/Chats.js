import React, { useEffect, useState, useLayoutEffect } from "react";
import { connect } from "react-redux";

import API from "../api/API";
import ChatCard from "../components/ChatCard";
import config from "../config/config";
import Container from "./../components/Container";
import { FlatList } from "react-native";
import Icon from "./../components/Icon";
import { ToastAndroid } from "react-native";
import { SetChats } from "../store/chats/actions";

function Chats({ navigation, User, UpdateChats, Chats }) {
  const [Refresing, SetRefresing] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Icon
          Name="Ionicons"
          IconName="ios-create"
          marginRight={20}
          onPress={() => navigation.navigate("NewChatScreen")}
        />
      ),
    });
  }, [navigation]);

  useEffect(() => {
    InitialLoad();
  }, []);

  const InitialLoad = async () => {
    try {
      if (Chats.length === 0) await GetChats();
    } catch (error) {}
  };

  const GetChats = async () => {
    try {
      const response = await API.GetChats(User.Token);

      if (response.ok) UpdateChats(response.data.Chats);
      else ToastAndroid.show(response.data, 3000);
    } catch (error) {
      ToastAndroid.show(config.messages.ServerError, 3000);
    }
  };

  const Refresh = async () => {
    try {
      SetRefresing(true);
      await GetChats();
      SetRefresing(false);
    } catch (error) {}
  };

  return (
    <Container>
      <FlatList
        data={Chats}
        onRefresh={Refresh}
        refreshing={Refresing}
        renderItem={({ item }) =>
          item.last_message_details ? (
            <>
              <ChatCard
                {...item}
                current_user={User._id}
                onPress={() =>
                  navigation.navigate("ChatRoom", {
                    RoomID: item._id,
                    OtherUser: item.chatting_with,
                  })
                }
              />
            </>
          ) : null
        }
        keyExtractor={(item) => item._id.toString()}
      />
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    User: state.AuthState.User,
    Chats: state.ChatsState.Chats,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    UpdateChats: (chats) => dispatch(SetChats(chats)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chats);
