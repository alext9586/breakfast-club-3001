import { IMember, Member } from "../Models/Member";
import { IArrival } from "../Models/Arrival";
import { IArrivalSend } from "../Models/RawViewModels";

export interface IHttpService {
    getAllSimpleMembers();
    getAllMembers();
    addMember(member: IMember);
    updateMember(member: IMember);
    deleteMember(memberId: string);
    rotate();
    saveList(membersList: IMember[]);

    getAllArrivals();
    getLastTenArrivals();
    addArrival(memberId: string);
}

export class HttpService {
    private static async waitForResponse(response: Response) {
        const body = await response.json();

        if (response.status !== 200) throw Error(body.message);

        return body;
    }

    public static async getAllSimpleMembers() {
        const response = await fetch('/api/members/allSimple');
        
        return this.waitForResponse(response);
    }

    public static async getAllMembers() {
        const response = await fetch('/api/members/all');
        
        return this.waitForResponse(response);
    }

    public static async addMember(member: IMember) {        
        const response = await fetch('/api/members/add', {
            body: JSON.stringify(member),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            method: 'POST'
        });

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

    public static async rotate() {
        const response = await fetch('/api/members/rotate', {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            }
        });

        return this.waitForResponse(response);
    }

    public static async saveList(membersList: IMember[]) {
        var data = {
            membersList: membersList
        };

        const response = await fetch('/api/members/saveList', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        return this.waitForResponse(response);
    }

    public static async changeActive(member: IMember) {
        var data = {
            id: member.id,
            isActive: member.isActive
        };

        const response = await fetch('/api/members/changeActive', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        return this.waitForResponse(response);
    }

    // ----------------------------------------------------------------------------

    public static async getAllArrivals() {
        const response = await fetch('/api/arrivals/all');
        
        return this.waitForResponse(response);
    }

    public static async getLastTenArrivals() {
        const response = await fetch('/api/arrivals/lastTen');
        
        return this.waitForResponse(response);
    }

    public static async addArrival(arrival: IArrivalSend) {
        const response = await fetch('/api/arrivals/add', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(arrival)
        });

        return this.waitForResponse(response);
    }
}