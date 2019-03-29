import { SystemState } from "../Models/ReduxState";
import { Stages } from "../Stages";
import { ISimpleMember } from "../Models/SimpleMember";
import { IArrival } from "../Models/Arrival";

export const LOADING = "LOADING";
export const VIEW_MAIN = "VIEW_MAIN";

export function loading() {
	return { type: LOADING };
}

export function viewMain(membersList: ISimpleMember[], arrivalLog: IArrival[]) {
	return {
		type: VIEW_MAIN,
		payload: <SystemState>{
			stage: Stages.View,
			membersList: membersList,
			arrivalLog: arrivalLog
		}
	};
}
