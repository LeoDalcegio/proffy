<div align="center">

<img width="500px" align="center" src="https://user-images.githubusercontent.com/54639269/89223832-dd796380-d5ad-11ea-9a39-fc852538ca13.png"></img>

</div>

<br>
<p align="center">
    Online teaching platform to connect students to their Proffys made during the <a src="https://nextlevelweek.com"> NLW (Next Level Week) #02</a>🚀
</p>

### Content

-   [Getting Started](#Getting-Started-)
    -   [Requirements](#Requirements)
        -   [Server](#Server)
        -   [Web](#Web)
        -   [Mobile](#Mobile)
-   [Techs](#Techs)
-   [Todo](#Todo-)
-   [License](#License-)

### Getting Started 🚀

```ps
# Clone the repository using git
$ git clone https://github.com/pmqueiroz/proffy.git

# Access the project folder
$ cd proffy
```

#### Requirements 🦺

-   [Node.js][https://nodejs.org/en]
-   [Yarn][https://classic.yarnpkg.com/] or [npm][https://www.npmjs.com/]
-   [Expo][https://expo.io/]

##### Server 💾

```ps
$ cd server

$ yarn install
```

Database migration:

```

$ yarn knex:migrate

```

Backend start:

```

$ yarn start

```

##### Web 🖥️

```ps
$ cd web

$ yarn install

$ yarn start
```

##### Mobile 📱

```ps
$ cd mobile

# Installing all fonts
$ expo install expo-font @expo-google-fonts/archivo @expo-google-fonts/poppins

# Installing all dependencies
$ yarn install

$ yarn start
```

#### Techs 🤙

-   Node.js
-   React.js
-   React Native
-   Axios

### Todo 📌

Version 2.0 Features

-   Web & Mobile
-   [ ] Splash screen
-   [ ] User Authentication
    -   [ ] Login
    -   [ ] Remember me
    -   [ ] Sign In
    -   [ ] Succeed Screen
    -   [ ] User logout
    -   [ ] Password recovery
-   [ ] Pagination of classes result
-   [ ] Show teacher schedule hours
-   [ ] Deploy

-   Web
-   [ ] Save favorite teachers
-   [ ] Rating system
-   [ ] Teacher profile

-   Mobile
-   [ ] Save favorite teachers

### License 📝

This project is under the MIT license. See the [LICENSE][https://github.com/leodalcegio/proffy/blob/master/license] for more information.
