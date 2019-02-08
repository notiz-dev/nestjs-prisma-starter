export interface UpdateMePayload {
  name?: string;
}

// TODO add github
export enum OAuthProvider {
  EMAIL = 'email',
  GOOGLE = 'google',
}

export interface GoogleProfile {
  id: string;
  displayName: string;
  name: GoogleName;
  emails: GoogleEmail[];
  photos: GooglePhoto[];
  gender: string;
  provider: string;
}

export interface GoogleName {
  familyName: string;
  givenName: string;
}

export interface GoogleEmail {
  value: string;
  type: string;
}

export interface GooglePhoto {
  value: string;
}
