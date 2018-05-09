export interface IRawMember {
    id: string;
    firstname: string;
    lastname: string;
    slackusername: string;
    rotationorder: number;
    isactive: boolean;
    isabsent: boolean;
}

export interface IRawSimpleMember {
    id: string;
    fullname: string;
    rotationorder: number;
    isabsent: boolean;
}

export interface IRawArrival {
    id: string;
    memberid: string;
    membername: string;
    arrivaltime: string;
    notes: string;
}

export interface IArrivalSend {
    memberId: string;
    arrivalTime: Date;
    notes: string;
}