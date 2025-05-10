export type Device = {
  id: string;
  alias: string;
  location: string;
  device_session: Session | null;
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
  user: UserInfo;
  device: Device;
  created_at: Date;
};

export type Log = {
  id: string;
  log_time: Date;
  device: Device;
  user: User;
  log_type: string;
};
