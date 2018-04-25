export interface IMember {
    id: string;
    firstName: string;
    lastName: string;
    slackUsername: string;
    rotationOrder: number;
    isActive: boolean;
}

export class Member implements IMember {
    constructor(
        public id: string = "",
        public firstName: string = "",
        public lastName: string = "",
        public slackUsername: string = "",
        public rotationOrder: number = -1,
        public isActive: boolean = true) {
    }
}