import { IMember, Member, MemberConverter } from "./Member";
import { IRawArrival } from "./RawViewModels";

export interface IArrival {
    id: string;
    memberId: string;
    memberName: string;
    arrivalTime: string;
    notes: string;
}

export class Arrival implements IArrival {
    constructor(
        public id: string = "",
        public memberId: string = "",
        public memberName: string = "",
        public arrivalTime: string = "",
        public notes: string = "") {
    }
}

export class ArrivalConverter {
    public static fromRawArrival(raw: IRawArrival) {
        let time = new Date(raw.arrivaltime);
        // let timezoneOffset = time.getTimezoneOffset();
        // time.setMinutes(time.getMinutes() - timezoneOffset);
        return new Arrival(raw.id, raw.memberid, raw.membername, time.toLocaleString("en-US"), raw.notes);
    }
}