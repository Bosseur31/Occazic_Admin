export interface User {
  [prop: string]: any;

  id: number | string | null;
  username?: string;
  email?: string;
  avatar?: string;
  roles?: any[];
  permissions?: any[];
}

export interface Token {
  [prop: string]: any;

  user_id: string;
  access_token: string;
  token_type: string;
}
