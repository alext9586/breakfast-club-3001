import { IRawSimpleMember } from "./RawViewModels";

export interface ISimpleMember {
    id: string;
    fullname: string;
    rotationOrder: number;
}

export class SimpleMember implements ISimpleMember {
    constructor(
        public id: string = "",
        public fullname: string = "",
        public rotationOrder: number = -1) {
    }
}

export class SimpleMemberConverter {
    public static fromRawMember(raw: IRawSimpleMember) {
        return new SimpleMember(
            raw.id,
            raw.fullname,
            raw.rotationorder
        );
    }
}