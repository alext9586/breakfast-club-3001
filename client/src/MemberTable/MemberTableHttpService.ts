import { IMember } from "../Models/Member";

export interface IMemberTableHttpService {
    getAllMembers();
    updateMember(member: IMember);
    deleteMember(memberId: string);
}

export class MemberTableHttpService {
    private static async waitForResponse(response: Response) {
        const body = await response.json();

        if (response.status !== 200) throw Error(body.message);

        return body;
    }

    public static async getAllMembers() {
        const response = await fetch('/api/members/all');
        
        return this.waitForResponse(response);
    }

    public static async updateMember(member: IMember) {
        const response = await fetch('/api/members/update', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(member)
        });

        return this.waitForResponse(response);
    }

    public static async deleteMember(memberId: string) {
        var data = {
            memberId: memberId
        };
        
        const response = await fetch('/api/members/delete', {
            method: 'DELETE',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        return this.waitForResponse(response);
    }
}