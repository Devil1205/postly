export interface UserSignupInterface {
  name: string;
  username: string;
  email: string;
  phone?: string;
  profilePic?: string;
  password: string;
}

export interface UserLoginInterface {
  email?: string;
  username?: string;
  password: string;
}
