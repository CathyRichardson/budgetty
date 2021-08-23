import axios from 'axios';

//sets initial state for the store
const initialState = {
    purchases: [],
    budgetLimit: null,
    loading: false
}

//The base action types
const REQUEST_BUDGET_DATA = "REQUEST_BUDGET_DATA";
const ADD_PURCHASE = "ADD_PURCHASE";
const REMOVE_PURCHASE = "REMOVE_PURCHASE";

// Action Creator
export function requestBudgetData() {
    let data = axios.get('/api/budget-data').then(({ data }) => data)
    console.log('request budget data:', data)
    return {
        type: REQUEST_BUDGET_DATA,
        payload: data
    }
}
export function addPurchase(price, description, category) {
    let data = axios.post('/api/budget-data/purchase', { description, price, category }).then(({ data }) => data)
    return {
        type: ADD_PURCHASE,
        payload: data
    }
}
export function removePurchase(id) {
    let data = axios.delete(`/api/budget-data/purchase/${id}`).then(({ data }) => data)
    return {
        type: REMOVE_PURCHASE,
        payload: data
    }
}


export default function reducer(state = initialState, action) {
    switch (action.type) {
        case REQUEST_BUDGET_DATA + "_PENDING":
            console.log("request pending:", action) //action only has type
            // IN ORDER TO KEEP VALUES PREVIOUSLY STORED ON STATE, WE SPREAD THE CURRENT STATE OBJECT
            // INTO THE RETURNED OBJECT AND UPDATE ONLY THE VALUES IN STATE WE WANT TO CHANGE
            return {
                ...state,
                loading: true
            }
        case REQUEST_BUDGET_DATA + "_FULFILLED":
            console.log("request fulfilled:", action) //action has type and payload: with purchases and budget limit.
            return {
                ...state,   //copy the old state into new state
                ...action.payload,  // merging the action.payload object to the new state
                loading: false
            }
        case ADD_PURCHASE + "_PENDING":
            console.log("add pending:", action)
            return {
                ...state,
                loading: true
            }
        case ADD_PURCHASE + "_FULFILLED":
            console.log("add fulfilled:", action) // action is type and payload: array of objects.
            return {
                ...state,
                purchases: action.payload,
                loading: false
            }
        case REMOVE_PURCHASE + "_PENDING":
            console.log("remove pending:", action)
            return {
                ...state,
                loading: true
            }
        case REMOVE_PURCHASE + "_FULFILLED":
            console.log("remove fulfilled:", action) // action is type and payload: array of objects.
            return {
                ...state,
                purchases: action.payload,
                loading: false
            }
        default: return state;
    }
}