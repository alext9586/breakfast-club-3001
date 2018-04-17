export interface IMember {
    id: string;
    firstName: string;
    lastName: string;
    slackUsername: string;
    isActive: boolean;
}

export class Member implements IMember {
    constructor(
        public id: string,
        public firstName: string,
        public lastName: string,
        public slackUsername: string,
        public isActive: boolean = true) {
    }
}