import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import * as Updates from "expo-updates";
import { connect } from "react-redux";
import { Switch } from "react-native-paper";

import API from "../api/API";
import Container from "../components/Container";
import ColorPallete from "../config/ColorPallete";
import config from "../config/config";
import Dialog from "../components/Dialog";
import FollowRequestBTN from "../components/FollowRequestBTN";
import { Logout, ToggleMode } from "../store/actions";
import MenuCard from "../components/MenuCard";
import Text from "../components/Text";

function Settings({ navigation, Mode, SetMode, Logout, User }) {
  const [Loading, SetLoading] = useState(false);
  const [LogoutLoading, SetLogoutLoading] = useState(false);
  const [ConfirmationBox, SetConfirmationBox] = useState(false);
  const [ProfilePrivate, SetProfilePrivate] = useState(false);

  const onToggleSwitch = () => {
    if (Mode === "light") {
      SetMode("dark");
    } else {
      SetMode("light");
    }
  };

  const Logout_Function = async () => {
    try {
      SetConfirmationBox(false);
      SetLogoutLoading(true);
      await API.Logout(User.Token);
      SetLogoutLoading(false);
      Logout(null);
    } catch (error) {
      SetLogoutLoading(false);
    }
  };

  const CancelRequestConfirmation = () => {
    return (
      <Dialog
        visible={ConfirmationBox}
        hideDialog={() => SetConfirmationBox(false)}
        title="Sign Out?"
      >
        <Text text={`Are you sure you want to logout of ${config.appName}?`} />
        <View style={styles.DialogBTNs}>
          <View style={{ flex: 1, padding: 10 }}>
            <FollowRequestBTN
              text="Cancel"
              defaultBackground={true}
              onPress={() => SetConfirmationBox(false)}
              Loading={Loading}
            />
          </View>
          <View style={{ flex: 1, padding: 10 }}>
            <FollowRequestBTN
              text="Yes"
              onPress={Logout_Function}
              Loading={Loading}
            />
          </View>
        </View>
      </Dialog>
    );
  };

  const CheckForUpdates = async () => {
    try {
      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        ToastAndroid.show("Downloading New Update..", 2000);
        await Updates.fetchUpdateAsync();
        ToastAndroid.show("Installed Latest Version", 2000);
        await Updates.reloadAsync();
      } else {
        ToastAndroid.show("No Updates Available", 2000);
      }
    } catch (error) {}
  };

  const updateProfilePrivate = async (value) => {
    try {
      SetLoading(true);
      const response = await API.ToggleProfilePrivacy(User.Token);
      SetLoading(false);
      SetProfilePrivate(response.data.private);
    } catch (error) {
      SetLoading(false);
    }
  };

  return (
    <Container style={styles.container}>
      {CancelRequestConfirmation()}
      <View style={styles.RowMenu}>
        <Text text="Dark Mode" family="InterBold" size={18} />
        <Switch
          value={Mode === "dark" ? true : false}
          onValueChange={onToggleSwitch}
        />
      </View>
      <View style={styles.RowMenu}>
        <Text text="Private Profile" family="InterBold" size={18} />
        {Loading ? (
          <ActivityIndicator size="large" color={ColorPallete.primary} />
        ) : (
          <Switch
            value={ProfilePrivate ? true : false}
            onValueChange={updateProfilePrivate}
          />
        )}
      </View>

      <MenuCard
        prefixName="MaterialCommunityIcons"
        prefixIconName="form-textbox-password"
        text="Change Password"
        showSuffixIcon={false}
        onPress={() => navigation.navigate("ChangePassword")}
      />

      <MenuCard
        prefixName="MaterialIcons"
        prefixIconName="system-update"
        text="Check For Updates"
        showSuffixIcon={false}
        onPress={CheckForUpdates}
      />

      <MenuCard
        prefixName="AntDesign"
        prefixIconName="logout"
        text="Logout"
        showSuffixIcon={false}
        color={ColorPallete.red}
        onPress={() => SetConfirmationBox(true)}
        suffixLoading={LogoutLoading}
      />
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    User: state.User,
    Mode: state.Mode,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    SetMode: (colorScheme) => dispatch(ToggleMode(colorScheme)),
    Logout: (User) => dispatch(Logout(User)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);

const styles = StyleSheet.create({
  container: {},
  DialogBTNs: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
    marginTop: 15,
  },
  RowMenu: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    padding: 15,
    paddingLeft: 20,
    paddingRight: 15,
  },
});
