export type Device = {
  id: string;
  alias: string;
  location: string;
  device_session: Session | null;
  created_at: Date;
};

export type Credentials = {
  id: string;
  email: string;
};

export type UserInfo = {
  id: string;
  name: [string, string?, string];
  picture_id?: string;
  dep_prog?: string;
  year_level?: string;
  face_descriptor?: string;
  employee_role?: string;
  device_session: Session | null;
};

export type Session = {
  id: string;
  user?: UserInfo | null;
  device?: Device | null;
  created_at: Date;
};

export type Log = {
  id: string;
  device?: Device;
  user?: User;
  start: Date;
  end: Date;
  user_id: string;
  user_name: string;
  user_role: string;
  device_id: string;
  device_alias: string;
  device_location: string;
};
