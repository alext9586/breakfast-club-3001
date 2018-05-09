import { Moment } from "moment";
import * as moment from "moment";

export interface IFridayBounds {
    lastFriday: Moment;
    upcomingFriday: Moment;
    outOfBoundsFriday: Moment;
}

export class FridayService {
    private static friday = 5;

    private static setTimeToNoon(dateTime: Moment): void {
        dateTime.set({hour: 12, minute: 0, second: 0, millisecond: 0});
    }

    public static getOutOfBoundsFriday(): Moment {
        let result = moment().subtract(2, 'weeks').isoWeekday(this.friday);
        this.setTimeToNoon(result);
        return result;
    }

    public static getLastFriday(): Moment {
        let result = moment().subtract(1, 'weeks').isoWeekday(this.friday);
        this.setTimeToNoon(result);
        return result;
    }

    public static getUpcomingFriday(): Moment {
        let result = moment();

        if(moment().isoWeekday() <= this.friday) {
            result.isoWeekday(this.friday);
        } else {
            result.add(1, 'weeks').isoWeekday(this.friday);
        }

        this.setTimeToNoon(result);
        return result;
    }
}