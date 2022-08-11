export interface Profile {
  id: string | number;
  name: {
    givenName: string;
  };
  emails: {
    value: string;
  }[];
}
