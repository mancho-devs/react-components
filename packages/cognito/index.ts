/* External dependencies */
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserPool,
  ICognitoUserPoolData,
  ISignUpResult,
} from 'amazon-cognito-identity-js';

/* Local dependencies */
import { CognitoSigninResponse } from './lib/cognito-types';
import CustomCognitoUserSession from './lib/cognito-user-session';

export default class CognitoClient {
  private userPool: CognitoUserPool;

  constructor(params: ICognitoUserPoolData) {
    this.userPool = new CognitoUserPool(params);
  }

  /*
   * `confirmPassword()` is called after `forgotPassword()` is called.
   */
  confirmPassword(username: string, verificationCode: string, newPassword: string) {
    return new Promise((resolve, reject) => {
      this.getCognitoUser(username).confirmPassword(verificationCode, newPassword, {
        onFailure: reject,
        onSuccess: resolve,
      });
    });
  }

  /*
   * `forgotPassword()` instructs Amazon Cognito to send a verification code
   * to the provider email or phone number. This will essencially reset the
   * existing password.
   */
  forgotPassword(username: string) {
    return new Promise((resolve, reject) => {
      this.getCognitoUser(username).forgotPassword({
        onFailure: reject,
        onSuccess: resolve,
      });
    });
  }

  signIn(username: string, password: string): Promise<CognitoSigninResponse> {
    return new Promise((resolve, reject) => {
      const cognitoAuthenticationDetails = new AuthenticationDetails({
        Username: username,
        Password: password,
      });

      this.getCognitoUser(username).authenticateUser(cognitoAuthenticationDetails, {
        onFailure: reject,
        onSuccess: function (session, userConfirmationNecessary?: boolean) {
          resolve({
            session: session as CustomCognitoUserSession,
            userConfirmationNecessary,
          });
        },
      });
    });
  }

  signOut(): Promise<void> {
    return new Promise((resolve, reject) => {
      const currentUser = this.userPool.getCurrentUser();

      if (currentUser) {
        currentUser.signOut(() => {
          if (arguments.length) {
            return reject(arguments[0]);
          }

          resolve();
        });
      } else {
        resolve();
      }
    });
  }

  /*
   * `signUp()` instructs Amazon Cognito to send a verification code
   * to the provider email or phone number. This will essencially
   * create a new user in Amazon Cognito and will wait for sign up
   * confirmation via `signUpConfirmCode()`.
   */
  signUp(username: string, password: string): Promise<ISignUpResult> {
    return new Promise((resolve, reject) => {
      const userAttributes = [];
      const validationData = [];

      this.userPool.signUp(username, password, userAttributes, validationData, function (err, result) {
        if (err) {
          return reject(err);
        }

        resolve(result!);
      });
    });
  }

  /*
   * `signUpConfirmCode()` is called after `signUp()` is called.
   */
  signUpConfirmCode(username: string, verificationCode: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const forceAliasCreation = false;

      this.getCognitoUser(username).confirmRegistration(verificationCode, forceAliasCreation, function (err, result) {
        if (err) {
          return reject(err);
        }

        resolve(result);
      });
    });
  }

  private getCognitoUser(username: string) {
    return new CognitoUser({
      Username: username,
      Pool: this.userPool,
    });
  }
}
