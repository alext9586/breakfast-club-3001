import * as actions from "../Actions";
import { Stages } from "../Stages";
import { SystemState, SystemActionTypes } from "../Models/ReduxState";

const initialState: SystemState = {
	stage: Stages.Loading,
	membersList: [],
	arrivalLog: []
};

export function bcReducer(state = initialState, action: SystemActionTypes) {
	switch (action.type) {
		case actions.LOADING:
			return Object.assign({}, initialState);

		case actions.VIEW_MAIN:
			return Object.assign({}, state, action.payload);

		default:
			return state;
	}
}
