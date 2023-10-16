/* Local dependencies */
import CustomCognitoUserSession from './cognito-user-session';

export interface CognitoSigninResponse {
  session: CustomCognitoUserSession;
  userConfirmationNecessary?: boolean;
}
