export interface NoteType {
    id?: string;
    title: string;
    content: string;
}

export interface OptionalNote {
    id?: string;
    title?: string;
    content?: string;
}

export interface UserType {
    uid: string;
    name: string;
    email: string;
    isNewUser: boolean;
    imgURL: string;
    signInMethod: string;
    createdTime: string;
    lastSignInTime: string;
    phoneNumber?: number;
    isAnonymous?: boolean;
}
