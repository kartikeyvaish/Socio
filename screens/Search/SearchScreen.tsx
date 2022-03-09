// Packages Imports
import { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

// Local Imports
import AnimatedText from "../../components/AnimatedText";
import AppScrollContainer from "../../components/AppScrollContainer";
import AppTextInput from "../../components/AppTextInput";
import FontNames from "../../constants/FontNames";
import GlobalContext from "../../context/GlobalContext";
import IconNames from "../../constants/IconNames";
import { Keyboard } from "react-native";
import SearchActions from "../../store/search/actions";
import SearchQueryCard from "../../components/SearchQueryCard";
import ScreenNames from "../../navigation/ScreenNames";
import { TabScreenProps } from "../../navigation/NavigationProps";
import useAppEndpoints from "../../api/useAppEndpoints";

// function component for SearchScreen
function SearchScreen(props: TabScreenProps<"SearchTabScreen">) {
  // Destructuring props
  const { navigation } = props;

  // Hooks and Contexts
  const { User, SearchResults } = useContext(GlobalContext);
  const { Search } = useAppEndpoints();
  const dispatch = useDispatch();

  // Local States
  const [Loading, SetLoading] = useState(false);
  const [Results, SetResults] = useState([]);
  const [SearchQuery, SetSearchQuery] = useState<string>("");

  // Search query Updation Search
  // This useEffect makes sure that whenever the user types for something,
  // the search takes place only when the user has stopped typing for a second
  useEffect(() => {
    const typeDelayFunction = setTimeout(() => {
      if (SearchQuery.length) SearchForPeople();
    }, 500);

    return () => clearTimeout(typeDelayFunction);
  }, [SearchQuery]);

  // API call to get search results
  const SearchForPeople = async () => {
    try {
      SetLoading(true);
      const apiResponse = await Search(SearchQuery);

      if (apiResponse.ok && apiResponse !== null) {
        SetResults(apiResponse.data.results);
        dispatch(SearchActions.AddSearchItems(apiResponse.data.results));
      }
      SetLoading(false);
    } catch (error) {
      SetLoading(false);
    }
  };

  // render
  return (
    <AppScrollContainer>
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

      <AnimatedText
        text={
          Loading
            ? "Searching..."
            : SearchQuery.length
            ? "Results"
            : SearchResults.length
            ? "Past Results"
            : null
        }
        size={20}
        marginLeft={15}
        marginBottom={15}
        family={FontNames.InterBold}
      />

      {SearchQuery.length
        ? Results.map(item => (
            <SearchQueryCard
              key={item._id}
              {...item}
              onPress={() =>
                item._id === User._id
                  ? navigation.navigate(ScreenNames.ProfileTabScreen)
                  : navigation.navigate(ScreenNames.PersonProfileScreen, {
                      ...item,
                      user_id: item._id,
                    })
              }
              removeVisible={false}
            />
          ))
        : SearchResults.map((item: any) => (
            <SearchQueryCard
              key={item._id}
              {...item}
              onPress={() =>
                item._id === User._id
                  ? navigation.navigate(ScreenNames.ProfileTabScreen)
                  : navigation.navigate(ScreenNames.PersonProfileScreen, {
                      ...item,
                      user_id: item._id,
                    })
              }
              removeVisible={false}
            />
          ))}
    </AppScrollContainer>
  );
}

// export the component
export default SearchScreen;
