import { IRawSimpleMember } from "./RawViewModels";
import { Moment } from "moment";
import * as moment from "moment";
import { FridayService } from "../Services/FridayService";
import { MemberBase, IMemberBase } from "./MemberBase";

export interface ISimpleMember extends IMemberBase {
    id: string;
    fullname: string;
    rotationOrder: number;    
}

export class SimpleMember extends MemberBase implements ISimpleMember {
    constructor(
        public id: string = "",
        public fullname: string = "",
        public rotationOrder: number = -1,
        public absentDate: Moment = FridayService.getOutOfBoundsFriday()) {
        super(absentDate);
    }
}

export class SimpleMemberConverter {
    public static fromRawMember(raw: IRawSimpleMember) {
        return new SimpleMember(
            raw.id,
            raw.fullname,
            raw.rotationorder,
            raw.absentdate ? moment(raw.absentdate) : FridayService.getOutOfBoundsFriday()
        );
    }
}