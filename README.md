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
- Users can chat with each other through real time
- Users can like and comment on Posts
- Users can follow other users
- Users can view Posts, Profile, Comments and Likes of own as well as other users
- Users will recieve notifications when they are followed etc.

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
appName="Name_of_your_app"
tagLine="a_tag_line"

__DEV__="developement_or_production"
DEV_BASE_URL="dev_base_endpoint_url"
PROD_BASE_URL="production_base_endpoint"

apiVersion="api_version_if_any"
default_profile_picture="default_profile_image"
```
