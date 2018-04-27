import { IMember, Member, MemberConverter } from "./Member";
import { IRawArrival } from "./RawViewModels";

export interface IArrival {
    id: string;
    member: IMember;
    when: Date;
    notes: string;
}

export class Arrival implements IArrival {
    constructor(
        public id: string = "",
        public member: IMember,
        public when: Date = new Date(),
        public notes: string = "") {
    }
}

export class ArrivalConverter {
    public static fromRawArrival(raw: IRawArrival) {
        let member = MemberConverter.fromRawMember(raw.member);
        return new Arrival(raw.id, member, raw.when, raw.notes);
    }
}