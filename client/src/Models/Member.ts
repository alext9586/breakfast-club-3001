import { IRawMember } from "./RawViewModels";

export interface IMember {
    id: string;
    firstName: string;
    lastName: string;
    slackUsername: string;
    rotationOrder: number;
    isActive: boolean;
}

export interface IMemberFormValues {
    firstName: string;
    lastName: string;
    slackUsername: string;
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

export class MemberConverter {
    public static fromRawMember(raw: IRawMember) {
        return new Member(
            raw.id,
            raw.firstname,
            raw.lastname,
            raw.slackusername,
            raw.rotationorder,
            raw.isactive
        );
    }
}