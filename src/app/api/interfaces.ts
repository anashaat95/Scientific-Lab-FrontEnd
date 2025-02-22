export interface ILoginResponse {
  accessToken: IToken;
  refreshToken: IToken;
}
export interface IToken {
  token: string;
  expiresIn: string;
}
