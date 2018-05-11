import { Moment } from "moment";
import * as moment from "moment";
import { FridayService } from "../Services/FridayService";

export interface IMemberBase {
    absentDate: Moment;
    isAbsent: boolean;
}

export class MemberBase implements IMemberBase {
    private lastFriday: Moment;
    private upcomingFriday: Moment;

    constructor(public absentDate: Moment = FridayService.getOutOfBoundsFriday()) {
        this.lastFriday = FridayService.getLastFriday();
        this.upcomingFriday = FridayService.getUpcomingFriday();
    }

    public get isAbsent(): boolean {
        if(moment() < this.upcomingFriday) {
            return this.absentDate > this.lastFriday
                && this.absentDate < this.upcomingFriday;
        } else {
            return this.absentDate > this.upcomingFriday;
        }
    }
}