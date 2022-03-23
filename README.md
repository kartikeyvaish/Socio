# Socio

<p align="center">
  <img width="200" src="https://i.imgur.com/NSZRbpr.png" />
</p>

Socio is a social networking platform where users can pictures and videos as Posts with the world.
Users can chat with each other through real time.

## Features

- Users can create an account
- Users can login
- Users can upload pictures and videos as Posts
- Users can post stories just like Instagram
- Users can chat with each other through real time
- Users can like and comment on Posts
- Users can follow other users
- Users can view Posts, Profile, Comments and Likes of own as well as other users
- Users will recieve notifications when they are followed etc.

## ✨ App Preview

<p align="center">
  <img src="https://i.imgur.com/hbR5uFa.png" width="100%" />
</p>

## Light/Dark Theme

<p align="center">
  <img src="https://i.imgur.com/2v7dna8.png" width="100%" />
</p>

## Chat Section

<p align="center">
  <img src="https://i.imgur.com/gchgrlj.png" width="100%" />
</p>

## Some Other Previews

<p align="center">
  <img src="https://i.imgur.com/UQ4QzlG.png" width="100%" />
</p>

## Development Setup

To set up Socio for development, you need to follow the steps mentioned below:

- Install [Node](https://nodejs.org/en/)
- Install [MongoDB](https://www.mongodb.com/download-center/community)
- Create a `.env` file for environment variables

### Step 1: Install Node.js from the [Node.js official website](https://nodejs.org/en/).

During the developement process, I used node version v14.17.4. You can check your node version by running the following command:

```shell
node -v
```

### Step 2: Setup [React Native](https://reactnative.dev/docs/environment-setup) environment.

Follow the steps mentioned in the official documentation to setup the environment.

### Step 3: Clone the repository

    git clone https://github.com/kartikeyvaish/Socio

### Step 4: Install dependencies

    cd Socio

    npm install

### Step 5: Create a `.env` file for environment variables

You'll have to create a `.env` file for environment variables with the variables listed [here](https://github.com/kartikeyvaish/Socio/blob/main/README.md#env-file)

### Step 6: Running the application

Connect a physical device or an emulator to your computer. You can read more about connecting to a
physical device or emulator [here](https://reactnative.dev/docs/running-on-device).

After this process is completed, just run

    npm run android

## Environemnt Variables

```dosini
mode="development"

OTP_Email_Send_Key=""
SignUP_API_KEY=""

apiVersion=""
dev_base_url=""
prod_base_url=""

auth=""
otp=""
people=""
posts=""
profile=""
stories=""
chats=""

default_channel_id=""
googleApiClientID=""
agoraAppID=""

application_name="Socio"
application_tag_line="Connect with Friends and Family.."
developer_image=""
owner_email=""
owner_github=""
owner_stackoverflow=""
owner_linkedin=""
about_owner=""
about_socio=""
default_profile_picture=""
app_logo=""
```
