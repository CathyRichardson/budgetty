import axios from 'axios';

//sets initial state for the store
const initialState = {
    purchases: [],
    budgetLimit: null,
    loading: false
}

//The base action types
const REQUEST_BUDGET_DATA = "REQUEST_BUDGET_DATA";

// Action Creator
export function requestBudgetData() {
    let data = axios.get('/api/budget-data').then(({ data }) => data)
    return {
        type: REQUEST_BUDGET_DATA,
        payload: data
    }
}


export default function reducer(state = initialState, action) {
    switch (action.type) {
        case REQUEST_BUDGET_DATA + "_PENDING":
            // IN ORDER TO KEEP VALUES PREVIOUSLY STORED ON STATE, WE SPREAD THE CURRENT STATE OBJECT
            // INTO THE RETURNED OBJECT AND UPDATE ONLY THE VALUES IN STATE WE WANT TO CHANGE
            return {
                ...state,
                loading: true
            }
        case REQUEST_BUDGET_DATA + "_FULFILLED":
            return {
                ...state,
                ...action.payload,
                loading: false
            }
        default: return state;
    }
}