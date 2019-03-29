import { Stages } from "../Stages";
import { ISimpleMember } from "./SimpleMember";
import { IArrival } from "./Arrival";

export interface SystemState {
	stage: Stages;
	membersList: ISimpleMember[];
	arrivalLog: IArrival[];
}

export interface IActions {
	type: string;
	payload: SystemState;
}

export type SystemActionTypes = IActions;
