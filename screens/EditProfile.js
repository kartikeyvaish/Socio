import React, { useState } from "react";
import { View, StyleSheet, Dimensions, Image, Pressable } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { connect } from "react-redux";

import API from "../api/API";
import Button from "./../components/Button";
import config from "../config/config";
import Helper from "../config/Helper";
import ColorPallete from "../config/ColorPallete";
import HyperLinkText from "./../components/HyperLinkText";
import Icon from "../components/Icon";
import ScrollContainer from "./../components/ScrollContainer";
import TextInput from "./../components/TextInput";
import Toast from "../components/Toast";
import { UpdateUser } from "../store/actions";

const ScreenWidth = Dimensions.get("screen").width;

function EditProfile({ navigation, route, User, SetUser }) {
  const [Loading, SetLoading] = useState(false);
  const [ProfileImage, SetProfileImage] = useState(User.ProfilePicture);
  const [Name, SetName] = useState(User.Name);
  const [Username, SetUsername] = useState(User.Username);
  const [Bio, SetBio] = useState(User.Bio);

  const EditProfileAPI = async () => {
    try {
      SetLoading(true);
      let formData = new FormData();

      formData.append("Name", Name);
      formData.append("Bio", Bio);
      formData.append("Username", Username);
      if (ProfileImage !== User.ProfilePicture) {
        formData.append("ProfilePicture", {
          uri: ProfileImage,
          type: Helper.GiveMimeType(ProfileImage),
          name: "profilePicture." + Helper.GetExtension(ProfileImage),
        });
      }

      const response = await API.EditProfile(formData, User.Token);
      SetLoading(false);

      if (response.ok) {
        await SetUser(response.data.User);
        navigation.goBack();
      } else {
        Toast.show({ text: response.data });
      }
    } catch (error) {
      Toast.show({ text: config.messages.ServerError });
      SetLoading(false);
    }
  };

  const ChangeImage = async () => {
    try {
      const response = await DocumentPicker.getDocumentAsync({
        type: "image/*",
      });
      if (response.type !== "cancel") SetProfileImage("file://" + response.uri);
    } catch (error) {
      Toast.show({ text: "Some Error Occured while selecting image" });
    }
  };

  return (
    <ScrollContainer style={styles.container}>
      <View style={{ justifyContent: "center" }}>
        <View style={styles.ImageBox}>
          <View>
            <Image
              source={{
                uri: ProfileImage,
              }}
              style={styles.Image}
            />
            {ProfileImage !== User.ProfilePicture ? (
              <Pressable
                style={styles.RemoveBTN}
                onPress={() => SetProfileImage(User.ProfilePicture)}
              >
                <Icon
                  Name="Entypo"
                  IconName="circle-with-cross"
                  color={ColorPallete.primary}
                  size={22}
                />
              </Pressable>
            ) : null}
          </View>

          {ProfileImage === User.ProfilePicture ? (
            <HyperLinkText
              Title="Change Profile Picture"
              size={18}
              family="InterBold"
              onPress={ChangeImage}
            />
          ) : null}
        </View>
      </View>

      <TextInput
        label="Name"
        mode="flat"
        onChangeText={SetName}
        helperPadding="normal"
        value={Name}
      />

      <TextInput
        label="Username"
        mode="flat"
        helperPadding="none"
        value={Username}
        onChangeText={SetUsername}
      />

      <TextInput
        label="Email"
        mode="flat"
        helperPadding="normal"
        value={route?.params?.Email || ""}
        disabled={true}
        normalText="Email is Verified"
        normalTextColor={ColorPallete.primary}
      />

      <TextInput
        label="Bio"
        mode="flat"
        onChangeText={SetBio}
        helperPadding="normal"
        value={Bio}
      />

      <Button
        title="Edit Profile"
        marginTop={20}
        width="50%"
        style={{ alignSelf: "center" }}
        loading={Loading}
        onPress={EditProfileAPI}
      />
    </ScrollContainer>
  );
}

const mapStateToProps = (state) => {
  return {
    User: state.User,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    SetUser: (User) => dispatch(UpdateUser(User)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);

const styles = StyleSheet.create({
  container: {
    paddingLeft: 15,
    paddingRight: 15,
    width: ScreenWidth,
  },
  innerContainer: {
    flex: 1,
    width: ScreenWidth,
    paddingLeft: 15,
    paddingRight: 15,
  },
  RemainingBox: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    margin: 20,
  },
  ImageBox: {
    alignItems: "center",
  },
  Image: {
    width: 80,
    height: 80,
    borderRadius: 100,
    resizeMode: "cover",
    marginBottom: 10,
    marginTop: 20,
  },
  RemoveBTN: {
    position: "absolute",
    top: 15,
    right: 0,
    zIndex: 10,
    backgroundColor: "white",
    borderRadius: 50,
  },
});
