<!-- VARS -->

[node-url]: https://nodejs.org/en
[yarn-url]: https://classic.yarnpkg.com/
[npm-url]: https://www.npmjs.com/
[expo-url]: https://expo.io/
[license-url]: https://github.com/leodalcegio/proffy/blob/master/license

<!-- VARS -->

<div align="center">

<img width="500px" align="center" src=".github/proffy-initial.jfif"></img>

</div>

<br>
<p align="center">
    Online teaching platform to connect students to their Proffys made during the <a src="https://nextlevelweek.com"> NLW (Next Level Week) #02</a>🚀
</p>

### Content

- [Getting Started](#Getting-Started-)
  - [Requirements](#Requirements)
    - [Server](#Server)
    - [Web](#Web)
    - [Mobile](#Mobile)
- [Techs](#Techs)
- [Todo](#Todo-)
- [License](#License-)

### Getting Started 🚀

```ps
# Clone the repository using git
$ git clone https://github.com/LeoDalcegio/proffy.git

# Access the project folder
$ cd proffy
```

#### Requirements 🦺

- [Node.js][node-url]
- [Yarn][yarn-url] or [npm][npm-url]
- [Expo][expo-url]

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

- Node.js
- React.js
- React Native
- Axios

### Todo 📌

Version 2.0 Features

See the <a href="https://github.com/LeoDalcegio/proffy/issues">Issues</a>

### License 📝

This project is under the MIT license. See the [LICENSE][license-url] for more information.
