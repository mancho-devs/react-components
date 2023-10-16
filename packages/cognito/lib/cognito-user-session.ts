/* External dependencies */
import { CognitoUserSession } from 'amazon-cognito-identity-js';

export default class CustomCognitoUserSession extends CognitoUserSession {
  // CognitoUserSession's `isValid` seems to be broken. The `clockDrift` property
  // equals to `606438` while the `now = 1630084239`, thus the difference ends up
  // being `adjusted = 1629477801` which is less than the expiration time of the
  // `accessTokenExp = 1629481401`. Therefore, this code cannot be used. Instead
  // we will override the `clockDrift`.
  public calculateClockDrift() {
    return 0;
  }
}
