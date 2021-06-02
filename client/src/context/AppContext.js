/* eslint-disable no-console,no-undef,no-unused-vars */
import createDataContext from './createDataContext';
import expressApi from '../api/expressApi';
import history from '../history';
import getError from '../components/error/getError'
import { LineItemData, homeData, april2019Data, may2019Data, may2019Data1, may2019Data2, june2019Data } from '../fixtures/staticdata.json.js'

/**
     errorMessage: { message: "Incorrect email or password", status: 401 }
{
    authUser: {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjA2MTExNzUxMDUiLCJwYXNzd29yZCI6ImFiYyIsIm5hbWUiOiJNciBCaGFza2FyIFZlbGlnZXRpIiwicm9sZSI6IkFkbWluaXN0cmF0b3IiLCJpYXQiOjE1OTMxMDY0NTB9.9kWrAfwRh8MRKiSS26AZwbIfymwMemmEAsBXh2SoMbI",
        "username": "0611175105",
        "name": "Mr Bhaskar Veligeti",
        "role": "Administrator"
    }
}
 */


let response;
/************************************************************* step 1:initial values ***********************************************************/
const INITIAL_STATE = {
    send: '',
    receive: '',
    errorMessage: null,
    loading: false,
    authUser: null,
    navId: 0,
    showComponent: null,
    showModal: false,
    menuItems: [{ "key": 1, "name": 'May - 2019 ( 1000 )' }, { "key": 2, "name": 'June - 2019 ( 1000 )' }],//, { "key": 2, "name": 'June - 2019 ( 127816 )' }
    selectedMenu: null,
    // may2019: may2019Data1,
    // june2019: june2019Data,
    mayPrediction: [],// may2019Data2,
    junePrediction: [],
    // prediction: [{ "action": 1, "TotalBillAmount": 1.64, "accuracy": 99.25 }],
    prediction: [],
    lineItems: LineItemData,
    success: false,
    accuracy: null,
    action: null,
    homeItems: homeData,
    homeItemID: 0,
    showHomeLink: 0
};

/*************************************************** step 2:creating  reducer  ...state = take all existing data ***********************************/
const appReducer = (state, action) => {
    switch (action.type) {
        /*--------------------------------------------------------------------------------------------------------------*/
        /** send: requset start time  | receive: response completed time */
        case 'request_send':
            return { ...state, send: new Date(), loading: true };
        case 'response_receive':
            return { ...state, receive: new Date(), loading: false };
        case 'try_catch_errors':
            return { ...state, errorMessage: action.payload, loading: false };
        case 'initialState':
            return { ...state, ...INITIAL_STATE };
        case 'clear_messages':
            return { ...state, errorMessage: null, loading: false };
        case 'refresh':
            return { ...state, refreshing: action.payload };
        case 'auth_user':
            return { ...state, authUser: action.payload, errorMessage: null, loading: false };
        case 'signout':
            return { ...state, loading: false, ...INITIAL_STATE };
        case 'taggle_nav':
            return { ...state, navId: action.payload, showComponent: 0, selectedMenu: null, };
        case 'taggle_component':
            return { ...state, showComponent: action.payload.id, selectedMenu: action.payload.menu };
        case 'modal':
            return { ...state, showModal: action.payload };
        case 'action':
            return { ...state, action: action.payload };
        case 'predict_request_send':
            return { ...state, send: new Date(), loading: true, showModal: true };
        case 'may_predict_sales':
            return {
                ...state,
                mayPrediction: action.payload.data,
                accuracy: action.payload.accuracy,
                action: action.payload.action,
                receive: new Date(), loading: false, showModal: false, success: true,
            };
        case 'june_predict_sales':
            return {
                ...state,
                junePrediction: action.payload.data,
                accuracy: action.payload.accuracy,
                action: action.payload.action,
                receive: new Date(), loading: false, showModal: false, success: true,
            };
        default:
            return state;
    }
};








/*...........................................1.Prediction........................................................*/
/*------------predictSales----------------------*/
const _predictSales = (dispatch) => async (input) => {
    // console.log('input@_predictSales :', input);
    try {
        /* step 1: make api request */
        dispatch({ type: 'predict_request_send' });
        response = await expressApi.post('/predictsales', input);
        // console.log('@response:', response.data.prediction.data[0]); //{ action: 1, data: array of arrays,accuracy:74.01 }
        if (response.data.message !== undefined) { // for Express Error
            let err = {
                "response": { status: response.data.status, data: response.data.message }
            }
            dispatch(getError(err));
        }
        else { //  Dispatch an action
            let data = []
            response.data.prediction.data.forEach((d, i) => {
                let dataObject = {
                    "ordinal": d[0],
                    "month": d[1],
                    "year": d[2],
                    "rateaccount": d[3],
                    "property": d[4],
                    "sgid": d[5],
                    "type": d[6],
                    "streetnumber": d[7],
                    "streetname": d[8],
                    "suburb": d[9],
                    "account": d[10],
                    "install": d[11],
                    "device": d[12],
                    "uomdesc": d[13],
                    "uom": d[14],
                    "readings": d[15],
                    "afterrandvalue": d[16],
                    "randvalue": d[17]
                }
                data.push(dataObject)
            })
            let _action = response.data.prediction.action
            let _accuracy = response.data.prediction.accuracy
            let _data = { action: _action, data, accuracy: _accuracy }
            console.log('response.data.prediction.action:', _action, ' Data array :', _data.data.length);
            _action === 1 ? dispatch({ type: 'may_predict_sales', payload: _data }) : dispatch({ type: 'june_predict_sales', payload: _data })
        }
    } catch (err) {
        // console.log('error@_signIn:', err);
        dispatch(getError(err));
    }
};
/*------------Taggle Nav----------------------*/
const _taggleNav = (dispatch) => async (taggle) => {
    // console.log('@_taggleNav:', taggle);
    dispatch({ type: 'taggle_nav', payload: taggle });
    taggle === 0 ? history.push('/home') : history.push('/predict');

};
/*------------Taggle Component----------------------*/
const _taggleComponent = (dispatch) => async (taggle) => {
    // console.log('@_taggleComponent:', taggle);
    dispatch({ type: 'taggle_component', payload: taggle });
};
const toggleModal = dispatch => (boolean) => {
    dispatch({ type: 'modal', payload: boolean });
};
/*------------Authentication by Express server----------------------*/
const _signIn = (dispatch) => async (input) => {
    // console.log('input@_signIn :', input);
    try {
        /* step 1: make api request */
        dispatch({ type: 'request_send' });
        response = await expressApi.post('/web/signin', input);
        // console.log('@response:', response.data);
        if (response.data.message !== undefined) { // for Express Error
            let err = {
                "response": { status: response.data.status, data: response.data.message }
            }
            dispatch(getError(err));
        }
        else { //  Dispatch an action
            /* step 2: Take JWT we get from API and store it on the localstorage */
            localStorage.setItem('user', JSON.stringify(response.data.authUser)); // convert into string object
            /* step 3:  Dispatch an action to put the token and user,role into state object as an object */
            dispatch({ type: 'auth_user', payload: response.data.authUser });
            /* step 4: Navigate the user to the 'Home' */
            history.push('/home');
        }

    } catch (err) {
        // console.log('error@_signIn:', err);
        dispatch(getError(err));
    }
};
const signOut = dispatch => async () => {
    // step 1: remove token
    try {
        dispatch({ type: 'request_send' });
        await localStorage.removeItem('user');
        dispatch({ type: 'signout' });
        history.push('/');
    } catch (error) {
        // console.log('error@signOut:', error.response.data);
        dispatch({ type: 'try_catch_errors', payload: error.response.data })
    }
}
const onRefresh = dispatch => (boolean) => {
    dispatch({ type: 'refresh', payload: boolean });
};
const clearMessages = dispatch => () => {
    dispatch({ type: 'clear_messages' });
};

/**************************************************************** : END :************************************************************************************* */



const actions = {
    onRefresh, clearMessages,
    _signIn, signOut,
    _taggleNav, _taggleComponent, toggleModal, _predictSales

}
/****************************** calling auotmatic context and passing reducer,actions,defauit state ---- it is magic part **************************/
export const { Context, Provider } = createDataContext(appReducer, actions, INITIAL_STATE);
