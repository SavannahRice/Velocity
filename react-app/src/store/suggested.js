// constants

const GET_USERS = "suggested/GET_USERS";
const REMOVE_SUGGESTION = "suggested/REMOVE_SUGGESTED";

const getUsers = (users) => ({
    type: GET_USERS,
    payload: users
})

const removeUser = (user) => ({
    type: REMOVE_SUGGESTION,
    payload: user
})

export const getSuggestedUsers = () => async dispatch => {
    const response = await fetch('/api/suggested/')
    const data = await response.json();
    dispatch(getUsers(data))

}

const initialState = {suggested: null};

export default function reducer(state = initialState, action){
    switch (action.type){
        case GET_USERS:
            const suggested = action.payload.users;
            const suggestedObj = {};
            for (const user of suggested){
                suggestedObj[user.id] = user
            }
            return {...state, suggested: suggestedObj}
        default:
            return state;
            
    }
}

