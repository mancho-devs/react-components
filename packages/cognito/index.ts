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

  signIn(username: string, password: string): Promise<CognitoSigninResponse> {
    return new Promise((resolve, reject) => {
      const cognitoAuthenticationDetails = new AuthenticationDetails({
        Username: username,
        Password: password,
      });

      const cognitoUser = new CognitoUser({
        Username: username,
        Pool: this.userPool,
      });

      cognitoUser.authenticateUser(cognitoAuthenticationDetails, {
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

  signUpConfirmCode(username: string, verificationCode: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const forceAliasCreation = false;

      const cognitoUser = new CognitoUser({
        Username: username,
        Pool: this.userPool,
      });

      cognitoUser.confirmRegistration(verificationCode, forceAliasCreation, function (err, result) {
        if (err) {
          return reject(err);
        }

        resolve(result);
      });
    });
  }
}
