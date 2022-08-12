export interface Profile {
  id: string;
  name: {
    givenName: string;
  };
  emails: {
    value: string;
  }[];
}
