import { GenderType } from "./state"

type APiResponse<T> = {
  "status":string
  "statusCode": number
  "message": string
  "data": T
}
export type LoginResponse = {
  tokens: {
    access_token: string;
    refresh_token: string;
  };
  user: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    gender: GenderType;
    username: string;
    is_active: boolean;
    is_email_verified: boolean;
    last_login_at: string;
    last_login_ip: string;
    needs_to_reset_password: boolean;
    last_password_reset_at: string;
  };
  session: string;
};

export type LoginResponseData = APiResponse<LoginResponse>;
