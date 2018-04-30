export interface IMemberTableActions {
    memberUp: Function,
    memberDown: Function,
    toggleActive: Function,
    editMember: Function,
    updateMember: Function,
    deleteMember: Function,
    addArrivalEntry: Function
}

export class MemberTableActions {
    public static create(
        memberUp: Function,
        memberDown: Function,
        toggleActive: Function,
        editMember: Function,
        updateMember: Function,
        deleteMember: Function,
        addArrivalEntry: Function): IMemberTableActions {
        return <IMemberTableActions>{
            memberUp: memberUp,
            memberDown: memberDown,
            toggleActive: toggleActive,
            editMember: editMember,
            updateMember: updateMember,
            deleteMember: deleteMember,
            addArrivalEntry: addArrivalEntry
        };
    }
}