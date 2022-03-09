// Packages Imports
import { useEffect, useState } from "react";
import { Keyboard, View } from "react-native";

// Local Imports
import AppContainer from "../../components/AppContainer";
import AppLoading from "../../components/AppLoading";
import { AppScreenProps } from "../../navigation/NavigationProps";
import AppScrollContainer from "../../components/AppScrollContainer";
import AppText from "../../components/AppText";
import AppTextInput from "../../components/AppTextInput";
import { ChatUserProps } from "../../store/chats/types";
import ColorPallete from "../../constants/ColorPallete";
import FontNames from "../../constants/FontNames";
import Helper from "../../utils/Helper";
import IconNames from "../../constants/IconNames";
import PeopleCard from "../../components/PeopleCard";
import ScreenNames from "../../navigation/ScreenNames";
import useAppEndpoints from "../../api/useAppEndpoints";

// function component for NewChatScreen
function NewChatScreen(props: AppScreenProps<"NewChatScreen">) {
  // Destructuring props
  const { navigation } = props;

  // Dispatches
  const { GetNewChatUsers, GetOrCreateChatRoom, SearchChatUsers } = useAppEndpoints();

  // Local States
  const [Loading, SetLoading] = useState(true);
  const [ChatCreateLoading, SetChatCreateLoading] = useState(false);
  const [Searching, SetSearching] = useState(false);
  const [People, SetPeople] = useState([]);
  const [Refreshing, SetRefreshing] = useState(false);
  const [SearchQuery, SetSearchQuery] = useState("");
  const [Results, SetResults] = useState([]);

  useEffect(() => {
    InitialCall();
  }, []);

  // Search query Updation Search
  // This useEffect makes sure that whenever the user types for something,
  // the search takes place only when the user has stopped typing for a second
  useEffect(() => {
    const typeDelayFunction = setTimeout(() => {
      if (SearchQuery.length) SearchChatUsersAPI();
      else SetResults([]);
    }, 500);

    return () => clearTimeout(typeDelayFunction);
  }, [SearchQuery]);

  const InitialCall = async () => {
    try {
      SetLoading(true);
      await GetNewChatsUsersAPI();
      SetLoading(false);
    } catch (error) {
      SetLoading(false);
    }
  };

  // Set Chats
  const GetNewChatsUsersAPI = async () => {
    try {
      const apiResponse = await GetNewChatUsers();

      if (apiResponse.ok && apiResponse !== null) {
        SetPeople(apiResponse.data.people);
      } else {
        Helper.ShowToast(apiResponse.data.message);
      }
    } catch (error) {}
  };

  // funtion to call to create chat
  const CreateChatAPI = async (item: ChatUserProps) => {
    try {
      SetChatCreateLoading(true);
      const apiResponse = await GetOrCreateChatRoom(item._id);
      SetChatCreateLoading(false);

      if (apiResponse.ok && apiResponse !== null) {
        navigation.navigate(ScreenNames.ChatRoomScreen, {
          chat_id: apiResponse.data.chat._id,
          username: item.username,
        });
      } else {
        Helper.ShowToast(apiResponse.data.message);
      }
    } catch (error) {
      SetChatCreateLoading(false);
    }
  };

  // api to call for search
  const SearchChatUsersAPI = async () => {
    try {
      SetSearching(true);
      const apiResponse = await SearchChatUsers(SearchQuery);
      SetSearching(false);

      if (apiResponse.ok) {
        SetResults(apiResponse.data.users);
      }
    } catch (error) {
      SetSearching(false);
    }
  };

  // onRefresh
  const onRefresh = async () => {
    try {
      SetRefreshing(true);
      await GetNewChatsUsersAPI();
      SetRefreshing(false);
    } catch (error) {
      SetRefreshing(false);
    }
  };

  // render
  return Loading ? (
    <AppLoading loadingText="Getting Users..." visible={Loading} />
  ) : (
    <AppContainer>
      <AppScrollContainer onRefresh={onRefresh} refreshing={Refreshing}>
        <AppTextInput
          placeholder="Search for People"
          value={SearchQuery}
          controlled
          roundness={100}
          style={{ height: 50 }}
          containerStyle={{ marginLeft: 15, marginRight: 15 }}
          onChangeText={SetSearchQuery}
          leftIconProps={{ family: IconNames.FontAwesome, name: "search", size: 20, marginTop: 5 }}
          rightIconProps={{
            family: IconNames.FontAwesome,
            name: "remove",
            size: 20,
            loading: Loading,
            onPress: () => {
              SetSearchQuery("");
              Keyboard.dismiss();
            },
            marginTop: 5,
            marginRight: 10,
          }}
        />

        {SearchQuery.length ? (
          Results.length > 0 ? (
            <>
              {Results.map((item: ChatUserProps) => (
                <PeopleCard
                  key={item._id}
                  title={item.name}
                  subtitle={item.username}
                  firstButtonTitle="Message"
                  profile_picture={item.profile_picture}
                  imageProps={{ size: 40 }}
                  firstButtonProps={{
                    backgroundColor: ColorPallete.primary,
                    color: ColorPallete.white,
                  }}
                  firstButtonOnPress={() => CreateChatAPI(item)}
                />
              ))}
            </>
          ) : (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
              <AppText
                text={Searching ? "Searching..." : "No Results"}
                size={20}
                family={FontNames.PoppinsBold}
              />
            </View>
          )
        ) : (
          People.map((item: ChatUserProps) => (
            <PeopleCard
              key={item._id}
              title={item.name}
              subtitle={item.username}
              firstButtonTitle="Message"
              profile_picture={item.profile_picture}
              imageProps={{ size: 40 }}
              firstButtonProps={{
                backgroundColor: ColorPallete.primary,
                color: ColorPallete.white,
              }}
              firstButtonOnPress={() => CreateChatAPI(item)}
            />
          ))
        )}
      </AppScrollContainer>

      {ChatCreateLoading ? (
        <AppLoading loadingText="Creating Chat.." visible={ChatCreateLoading} />
      ) : null}
    </AppContainer>
  );
}

// connect and export
export default NewChatScreen;
