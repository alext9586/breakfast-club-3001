export interface IRawMember {
    id: string;
    firstname: string;
    lastname: string;
    slackusername: string;
    absentdate: string;
    rotationorder: number;
    isactive: boolean;    
}

export interface IRawSimpleMember {
    id: string;
    fullname: string;
    rotationorder: number;
    absentdate: string;
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