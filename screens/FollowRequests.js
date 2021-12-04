import React, { useEffect, useState } from "react";
import { StyleSheet, FlatList } from "react-native";
import { connect } from "react-redux";

import API from "../api/API";
import Container from "../components/Container";
import RequestCard from "../components/RequestCard";
import ScreenNames from "../navigation/ScreenNames";

function FollowRequests({ navigation, User }) {
  const [Loading, SetLoading] = useState(false);
  const [Requests, SetRequests] = useState([]);
  const [Refreshing, SetRefreshing] = useState(false);

  useEffect(() => {
    GetAllFollowRequests();
  }, []);

  const GetAllFollowRequests = async () => {
    try {
      SetRefreshing(true);
      const response = await API.GetAllRequests(User.Token);

      if (response.ok) SetRequests(response.data.Requests);

      SetRefreshing(false);
    } catch (error) {
      SetRefreshing(false);
    }
  };

  const AcceptRequest = async (_id) => {
    try {
      SetLoading(true);

      const filter = Requests.filter((item) => item._id !== _id);
      SetRequests(filter);

      const response = await API.AcceptFollowRequest(
        {
          request_id: _id,
        },
        User.Token
      );

      SetLoading(false);
    } catch (error) {
      SetLoading(false);
    }
  };

  const DeleteRequest = async (_id) => {
    try {
      SetLoading(true);

      const filter = Requests.filter((item) => item._id !== _id);
      SetRequests(filter);

      const response = await API.DeleteFollowRequest(
        {
          request_id: _id,
        },
        User.Token
      );
      SetLoading(false);
    } catch (error) {
      SetLoading(false);
    }
  };

  return (
    <Container style={styles.container}>
      <FlatList
        data={Requests}
        keyExtractor={(item) => item._id.toString()}
        refreshing={Refreshing}
        onRefresh={GetAllFollowRequests}
        renderItem={({ item }) => (
          <RequestCard
            {...item}
            onProfilePress={() =>
              navigation.navigate(ScreenNames.PersonProfile, {
                _id: item.user_details._id,
              })
            }
            loading={Loading}
            onAccept={() => AcceptRequest(item._id)}
            onDecline={() => DeleteRequest(item._id)}
          />
        )}
      />
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    User: state.AuthState.User,
  };
};

export default connect(mapStateToProps)(FollowRequests);

const styles = StyleSheet.create({
  container: {},
});
