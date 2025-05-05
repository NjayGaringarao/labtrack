export interface ISignUp {
  id: string;
  name: [string, string?, string];
  email: string;
  password: string;
  user_info: {
    dep_prog: string;
    year_level: string;
    face_descriptor: string;
  };
}

export interface IUpdateUserInfo {
  user_id: string;
  dep_prog: string;
  year_level: string;
  face_descriptor: string;
}

export interface ILogItem {
  id: string;
  name: [string, string?, string];
  user_info: User;
  logs: Log[];
}
