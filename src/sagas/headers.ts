
// function getSessionRoomId() {
//     //let jsonData = sessionStorage.getItem('oidc.user:https://identity-server-1.herokuapp.com:leviossacv')
//     let jsonData = sessionStorage.getItem('oidc.user:https://localhost:5001:leviossacv')
//     return jsonData !== null ? JSON.parse(jsonData) : null
// }

let config: any;

// const token = getSessionRoomId();

// if (token !== null) {
    config = {
        headers: {
            // 'Authorization': `Bearer ${token.access_token}`,
            'Access-Control-Allow-Origin': '*',
        //     "Access-Control-Allow-Credentials": "true",
        //     "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
        //     "Access-Control-Allow-Headers": "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers",
        }
    }
export default config;