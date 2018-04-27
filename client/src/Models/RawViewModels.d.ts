export interface IRawMember {
    id: string;
    firstname: string;
    lastname: string;
    slackusername: string;
    rotationorder: number;
    isactive: boolean;
}

export interface IRawArrival {
    id: string;
    memberid: string;
    membername: string;
    arrivaltime: string;
    notes: string;
}