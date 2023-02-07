# Online Resume using React and Github API

<!-- Add image banner and center align -->
<p align="center">
  <img src="./readme-images/banner.png" alt="Online Resume using React and Github API">
</p>

This is a single-page React application that displays my personal resume information and projects from Github. The application is built with React, CSS, and HTML and data is fetched from the Github API.

## Features

- Personal information display
- Github project showcase
- Responsive design

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- Npm
- React

### Installing

1. Clone the repository
2. Install the dependencies

```sh
npm install
```

3. Start the development server
```sh
npm start
```

## Customize

1. To change the data displayed on the page, modify the `src/data/data.js` file.
2. To use your Github API key, create a `.env` file and add the following line, replacing `YOUR_API_KEY` with your actual key:
```javascript
REACT_APP_GITHUB_SECRET=YOUR_API_KEY
```
3. To add a custom domain for your Github Page, add a `CNAME` file with your domain name.

## Deployment

The application is deployed using Github Pages and can be accessed at [https://dan3002.tech/](https://dan3002.tech/).

To deploy the application, run the following command:
```sh
npm run deploy
```

## Built With

- [React](https://reactjs.org/)
- [Github API](https://docs.github.com/en/rest/)
- [CSS](https://www.w3.org/Style/CSS/)
- [HTML](https://www.w3.org/html/)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request

## Author

- [D.A.N_3002](https://github.com/DAN3002)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

The design is a modified version of the [Bolby - Portfolio/CV/Resume WordPress Theme](https://themeforest.net/item/bolby-portfoliocvresume-wordpress-theme/25981387).
