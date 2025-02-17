export type MongoObject = {
  _id: string;
};

export type User = MongoObject & {
  username: string;
};

export type UserData = User & {
  status: string;
  ghId: number;
  ghUser: string;
  joined: string;
  settings: UserSettings;
};

export type UserSettings = {
  defaultNameColor: string;
  defaultInvisible: boolean;
};

export type Channel = MongoObject & {
  title: string;
  admin: string;
  users: string[];
  lastActivity: string;
};

export type ChannelData = MongoObject & {
  title: string;
  admin: User;
};
