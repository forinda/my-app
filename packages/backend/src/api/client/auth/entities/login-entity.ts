export class LoginEntity {
  public static createResponseEntity<T extends Record<string, any> = any>(
    data: T
  ) {
    const keys =
      'id,first_name,last_name,email,gender,username,is_active,is_email_verified,last_login_at,last_login_ip,needs_to_reset_password,last_password_reset_at'.split(
        ','
      );

    return keys.reduce<Record<string, any>>((acc, key) => {
      acc[key] = data[key];

      return acc;
    }, {});
  }
}
