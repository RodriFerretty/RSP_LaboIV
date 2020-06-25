import { UserInfo } from 'firebase';

export class User implements UserInfo {
    //User attributes
    //--None yet
    //UserInfo implementation
    displayName: string;
    email: string;
    phoneNumber: string;
    photoURL: string;
    providerId: string;
    uid: string;
}
