export interface IMemberTableActions {
    memberUp: Function,
    memberDown: Function,
    updateMember: Function,
    deleteMember: Function,
    addArrivalEntry: Function
}

export class MemberTableActions {
    public static create(
        memberUp: Function,
        memberDown: Function,
        updateMember: Function,
        deleteMember: Function,
        addArrivalEntry: Function): IMemberTableActions {
        return <IMemberTableActions>{
            memberUp: memberUp,
            memberDown: memberDown,
            updateMember: updateMember,
            deleteMember: deleteMember,
            addArrivalEntry: addArrivalEntry
        };
    }
}