export interface IMemberTableActions {
    memberUp: Function,
    memberDown: Function,
    updateMember: Function,
    deleteMember: Function
}

export class MemberTableActions {
    public static create(
        memberUp: Function,
        memberDown: Function,
        updateMember: Function,
        deleteMember: Function): IMemberTableActions {
        return <IMemberTableActions>{
            memberUp: memberUp,
            memberDown: memberDown,
            updateMember: updateMember,
            deleteMember: deleteMember
        };
    }
}