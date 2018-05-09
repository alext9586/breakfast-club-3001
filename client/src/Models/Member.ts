import { IRawMember } from "./RawViewModels";
import { Moment } from "moment";
import * as moment from "moment";
import { FridayService } from "../Services/FridayService";
import { MemberBase, IMemberBase } from "./MemberBase";

export interface IMember extends IMemberBase {
    id: string;
    firstName: string;
    lastName: string;
    slackUsername: string;
    rotationOrder: number;
    isActive: boolean;
}

export class Member extends MemberBase implements IMember {
    constructor(
        public id: string = "",
        public firstName: string = "",
        public lastName: string = "",
        public slackUsername: string = "",
        public rotationOrder: number = -1,
        public isActive: boolean = true,
        public absentDate: Moment = FridayService.getOutOfBoundsFriday()) {
        super(absentDate);
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
            raw.isactive,
            raw.absentdate ? moment(raw.absentdate) : FridayService.getOutOfBoundsFriday()
        );
    }
}