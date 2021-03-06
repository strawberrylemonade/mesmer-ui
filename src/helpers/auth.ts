import { MsalAuthProvider, LoginType } from 'react-aad-msal';
import { Configuration } from 'msal';
 
const config: Configuration = {
  auth: {
    authority: window.MESMER_ENVIRONMENT['AUTH_AUTORITY'],
    clientId: window.MESMER_ENVIRONMENT['CLIENT_ID'],
    redirectUri: window.location.href
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: true
  }
};
 
const authenticationParameters = {
  scopes: [
    'openid',
    'user.read'
  ]
}
 
// Options
const options = {
  loginType: LoginType.Redirect,
  tokenRefreshUri: window.location.origin
}
 
const authProvider = new MsalAuthProvider(config, authenticationParameters, options)
export default authProvider;


/*

    <Authenticate OidcSettings={{    
      authority: 'https://login.microsoftonline.com/6306a961-c48b-4f30-a998-e34f353dc0c3',
      client_id: '3dccce73-06c4-4c9e-b762-a84c0e7416a0',
      redirect_uri: 'https://localhost:3000/',    
      response_type: 'id_token token',
      scope: 'openid profile',
      post_logout_redirect_uri: 'https://localhost:3000/'      
    }} userLoaded={() => {}} userunLoaded={() => {}} renderNotAuthenticated={() => <h1>Nope!</h1>}>

*/