ionic capacitor run ios -l --external

Amplify codegen
Amplify codegen models

to serve local app
```
ionic serve
```



Hackathon tutorials

Local install npm 
Get FM AWS credentials add config!!
Get credentials on citrix
Access AWS off of Citrix


Ionic CLI https://ionicframework.com/docs/CLI

https://ionicframework.com/docs
Elements
Native
Capacitor vs Cordova

Aws Amplify https://docs.Amplify.AWS

https://docs.Amplify.AWS/CLI

# Intro

Developing a mobile app on two platforms, an admin interface, and hooking it up to a back end is quite a challenge in one week. To make this process a bit easier we pre-selected six mobile development frameworks for which we provided some more information. You are free to choose any of these or choose one of your own, but for these six selected ones we provide some documentation and sample apps. All the selected frameworks produce apps that can be submitted to the Apple and Google app stores.

Similarly we provide a Fannie Mae AWS sandbox for your back end code. On it we enabled  AWS Amplify which can be used to set up a back end with minimal to no coding.

For any question regarding this documentation please reach out to maarten_ottens@fanniemae.com

# Front End - Code Frameworks

We selected three code frameworks representing the top (open source) frameworks currently out there. There are several other frameworks available, but they mostly, if not all, follow the same underlying tech stacks. Even several commercial tools are build on these frameworks, like the Fannie Mae approved Powwow Mobile, which uses Ionic. 

The frameworks can all be used to create iOS and Android apps (and even web apps), they come with a great developer experience, including hot reloading, being able to run code locally on simulators and offering pre-built components to quickly scaffold your apps.

These frameworks are especially powerful if used alongside AWS Amplify for the back end since Amplify has libraries for all three, vastly speeding up full stack development.

## Ionic / Angular / Cordova (Fannie Mae recommended)

The Ionic framework is a well established JavaScript framework that uses Cordova to invoke native phone functionality. It can be used with Angular, React or Vue. For our demo we focus on Angular for coding the mobile UI. Ionic provides standard components to create a UI and add native functionality like camera access. It can be used both for creating mobile apps and potentially a web based admin interface.

Documentation / Tutorial / useful links

The easiest way to get started is to go to the official documentation site and install the cli
https://ionicframework.com/docs/cli

Tutorials

Tutorials can be found at https://ionicframework.com/docs/intro/next

Notes for development 

- For install on a Fannie Mae system see section on Fannie Mae Installs below
- There is an issue with Ionic 4 and Angular 8 with the web version (used for rapid development). To prevent "uncaught ReferenceError: global is not defined" follow the instructions here:
https://stackoverflow.com/questions/57586472/ionic-4-angular-8-uncaught-referenceerror-global-is-not-defined

## React Native / Expo / React Native Elements

React Native is a JavaScript framework originating with react, but focused on mobile app development. Expo is used to improve the development experience allowing for hot reloading of the app in a web container in the Expo app, creating downloadable builds and much more. React Native, like react itself, is a bare bones framework. Custom components and functionality can be added via libraries. We used React Native Elements to bring in the most common reusable components.

tutorial

git repo

links
https://reactnative.dev
https://expo.io
https://reactnativeelements.com

Prerequisites expo account (free)

Notes for development 

- For install on a Fannie Mae system see section on Fannie Mae Installs below
## Flutter

Flutter is Google’s UI toolkit for building natively compiled applications for mobile, web and desktop from a single codebase. It uses the Dart language. “Dart is an object-oriented, class-based, garbage-collected language with C-style syntax. Dart can compile to either native code or JavaScript.” Development can be done using Android Studio 4.1 or other IDEs.

https://flutter.dev/
https://dart.dev

Notes for development 

- For install on a Fannie Mae system see section on Fannie Mae Installs below

# Front End - Code/Configuration frameworks 
(also called low code/no code)

Low-code and no-code frameworks are popping up everywhere, and Fannie Mae approved the use of two such frameworks for use in-house.


## Powwow Mobile (Fannie Mae approved)
Powwow is a no-code framework that allows you to build screens and action flows using drag and drop interfaces while mapping the elements on your screen to api call results. It is built on top of Ionic/Cordova and the underlying code can be accessed directly.

https://community.powwowmobile.com/ you have to sign up to get access. 

## Salesforce (Fannie Mae approved)
Salesforce offers a mobile app service that works on different levels, from using the salesforce app to custom apps using the salesforce backed open source lightning web components (

https://lwc.dev



## Thunkable

 


# The back end

For the back end we recommend you use AWS as the cloud of choice for Fannie Mae. We set up a sandbox with access to all FM approved AWS services as well as AWS Amplify: a service to quickly setup a full fledged back end in AWS. 

## Back End - the FM sandbox

## Back End - AWS Amplify
“AWS Amplify is a set of tools and services that can be used together or on their own, to help front-end web and mobile developers build scalable full stack applications, powered by AWS. With Amplify, you can configure app back ends and connect your app in minutes, deploy static web apps in a few CLIcks, and easily manage app content outside the AWS console.” AWS Amplify has a CLI for setting up the different AWS services supported, like APIs, Authentication, Storage, et cetera. It also provides libraries for seamless integration with ionic, react native and flutter, as well as direct iOS and Android development.

The sandbox is configured to allow Amplify CLI access. As we are using a federated login accessing the sandbox through the CLI there are a few steps that need to be taken by any user who wants to use the Amplify CLI or any other AWS CLI. 
1. Request access
2. Configure 


# Setting 
Installing frameworks on your Fannie Mae issues computer



Using Amplify with the Fannie Mae sandbox

1. Follow the instructions to install and be able to run the federated python script to retrieve your AWS credentials https://fnma.sharepoint.com/sites/AWSTransformation/Guides/AWS%20API%20or%20CLI%20with%20Federated%20Authentication%20(Python).aspx
2. Install Amplify CLI (update how you install  see: https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally)
3. Run the federated python script while on citrix vpn to obtain your AWS credentials
4. Run Amplify configure with the retrieved access key and secret to setup Amplify (note: you only need to this once)
5. **Log off from citrix vpn to be able to access Amplify using the CLI.** (The outgoing calls from the Amplify CLI to the sandbox are blocked by the vpn firewall)
6. Start adding apis, authorization et cetera using Amplify