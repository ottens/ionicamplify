
# Setup

Install Ionic CLI

```zsh
npm install -g @ionic/cli
```

Install Amplify CLI

```zsh
npm install -g @aws-amplify/cli
```

Install dependencies

```zsh
npm install
```

Initialize Amplify

```zsh
amplify init
```

- ? Do you want to use an existing environment? **No**
- ? Enter a name for the environment **envname**
- ? Choose your default editor: **Visual Studio Code**
- Using default provider  awscloudformation
- ? Do you want to use an AWS profile? **Yes**
- ? Please choose the profile you want to use **default**

Push the backend

```zsh
amplify push  

| Category | Resource name            | Operation | Provider plugin   |
| -------- | ------------------------ | --------- | ----------------- |
| Auth     | myamplifyproject846efcd9 | Create    | awscloudformation |
| Api      | myamplifyproject         | Create    | awscloudformation |
```

- ? Are you sure you want to continue? **Yes**
- ? Do you want to update code for your updated GraphQL API **No**

Start Ionic

```zsh
ionic serve
```

There is an issue with Ionic 4 and Angular 8 with the web version (used for rapid development). To prevent "uncaught ReferenceError: global is not defined" follow the instructions here: https://stackoverflow.com/questions/57586472/ionic-4-angular-8-uncaught-referenceerror-global-is-not-defined


# Frameworks

## Ionic / Angular / Cordova

The Ionic framework is a well established JavaScript framework that uses Cordova (or Capacitor) to invoke native phone functionality. It can be used with Angular, React or Vue. For our demo we use Angular for coding the mobile UI as it is widely used within Fannie Mae. Ionic provides standard components to create a UI and add native functionality like camera access. It can be used both for creating mobile apps and potentially a web based admin interface.

## AWS Amplify

“AWS Amplify is a set of tools and services that can be used together or on their own, to help front-end web and mobile developers build scalable full stack applications, powered by AWS. With Amplify, you can configure app back ends and connect your app in minutes, deploy static web apps in a few CLIcks, and easily manage app content outside the AWS console.” AWS Amplify has a CLI for setting up the different supported AWS services, like APIs, Authentication, Storage, Functions, et cetera. It also provides libraries for seamless integration with Ionic, React Native and Flutter, as well as direct iOS and Android development.

## Tutorials

- https://ionicframework.com/docs/intro/next - Ionic only tutorials
- https://docs.amplify.aws/start/q/integration/ionic - Ionic + Amplify tutorial

## Useful links

- https://ionicframework.com/docs/cli - use the cli for quickly setting up your project
- https://docs.amplify.aws/cli - amplify CLI
