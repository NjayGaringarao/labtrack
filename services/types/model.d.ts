export type Device = {
  id: string;
  location: string;
  isOccupied: boolean;
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
  log_time?: Date | null;
};

export type Log = {
  id: string;
  log_time: Date;
  device: Device;
  user: User;
  log_type: string;
};
