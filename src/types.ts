export type User = {
  _id: string;
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
