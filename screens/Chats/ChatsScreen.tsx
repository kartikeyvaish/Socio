// Packages Imports
import { useContext, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { connect, useDispatch } from "react-redux";
import { useIsFocused } from "@react-navigation/native";

// Local Imports
import AppButton from "../../components/AppButton";
import AppContainer from "../../components/AppContainer";
import AppLoading from "../../components/AppLoading";
import { AppScreenProps } from "../../navigation/NavigationProps";
import AppScrollContainer from "../../components/AppScrollContainer";
import ChatsActions from "../../store/chats/actions";
import ChatsCard from "../../components/ChatsCard";
import { ChatItemProps } from "../../store/chats/types";
import GlobalContext from "../../context/GlobalContext";
import ScreenNames from "../../navigation/ScreenNames";
import { StoreStateInterface } from "../../types/StoreTypes";
import useAppEndpoints from "../../api/useAppEndpoints";

// function component for ChatsScreen
function ChatsScreen(props: AppScreenProps<"ChatsScreen"> & ReturnType<typeof mapStateToProps>) {
  // Destructuring props
  const { Chats, navigation } = props;

  // Dispatches
  const dispatch = useDispatch();
  const { GetChats, DeleteChat } = useAppEndpoints();
  const isFocused = useIsFocused();
  const { User } = useContext(GlobalContext);

  // Local States
  const [Loading, SetLoading] = useState(true);
  const [Refreshing, SetRefreshing] = useState(false);
  const [CurrentSelected, SetCurrentSelected] = useState("");

  useEffect(() => {
    InitialCall();
  }, []);

  const InitialCall = async () => {
    try {
      SetLoading(true);
      await GetChatsAPI();
      SetLoading(false);
    } catch (error) {
      SetLoading(false);
    }
  };

  // Set Chats
  const GetChatsAPI = async () => {
    try {
      const apiResponse = await GetChats();

      if (apiResponse.ok && apiResponse !== null)
        dispatch(ChatsActions.SetChats(apiResponse.data.chats));
    } catch (error) {}
  };

  // onRefresh
  const onRefresh = async () => {
    try {
      SetRefreshing(true);
      await GetChatsAPI();
      SetRefreshing(false);
    } catch (error) {
      SetRefreshing(false);
    }
  };

  // api call to delete chat
  const DeleteChatAPI = async () => {
    try {
      dispatch(ChatsActions.DeleteChat(CurrentSelected));

      await DeleteChat(CurrentSelected);
    } catch (error) {}
  };

  // onNewChatPress
  const NewChatPress = async () => {
    try {
      SetCurrentSelected("");
      navigation.navigate(ScreenNames.NewChatScreen);
    } catch (error) {}
  };

  // mark chat as read and go to other room
  const MarkAndNavigate = async (item: ChatItemProps) => {
    try {
      if (item.last_message?.sender_id !== User?._id)
        dispatch(ChatsActions.MarkChatAsRead(item._id));

      navigation.navigate(ScreenNames.ChatRoomScreen, {
        chat_id: item._id,
        username: item.chatting_with.username,
        profile_picture: item.chatting_with.profile_picture,
      });
    } catch (error) {}
  };

  // render
  return !isFocused ? null : Loading ? (
    <AppLoading loadingText="Getting Chats..." visible={true} />
  ) : (
    <AppContainer style={styles.container}>
      <AppScrollContainer onRefresh={onRefresh} refreshing={Refreshing}>
        {Chats.map((item: ChatItemProps) => (
          <ChatsCard
            key={item._id}
            {...item}
            onPress={() => MarkAndNavigate(item)}
            onSwipeableClose={() => SetCurrentSelected("")}
            onSwipeableOpen={() => SetCurrentSelected(item._id)}
            currentSelected={CurrentSelected}
            onDeletePress={DeleteChatAPI}
          />
        ))}
      </AppScrollContainer>

      <AppButton title="+ New Chat" onPress={NewChatPress} />
    </AppContainer>
  );
}

// Mapping Redux state to props
const mapStateToProps = (state: StoreStateInterface) => ({
  Chats: state.ChatsState.chats,
});

// connect and export
export default connect(mapStateToProps, null)(ChatsScreen);

// styles
const styles = StyleSheet.create({
  container: {},
});
