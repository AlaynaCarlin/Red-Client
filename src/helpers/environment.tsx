let APIURL = '';

switch (window.location.hostname) {
    case 'localhost' || '127.0.0.1':
        APIURL = 'http://localhost:3000';
        break;
    case 'amc-class-and-sass-client.herokuapp.com':
        APIURL = 'https://amc-class-and-sass-server.herokuapp.com'
}

export default APIURL;