// constants

const GET_USERS = "suggested/GET_USERS";
const REMOVE_SUGGESTION = "suggested/REMOVE_SUGGESTED";

const getUsers = (users) => ({
    type: GET_USERS,
    payload: users
})

const removeUser = (id, data) => ({
    type: REMOVE_SUGGESTION,
    payload: id,
    data
})

export const getSuggestedUsers = () => async dispatch => {
    const response = await fetch('/api/suggested/')
    const data = await response.json();
    dispatch(getUsers(data))

}

export const handleFollow = (id) => async dispatch => {
    const response = await fetch(`/api/users/follow/${id}`, {
        method: "POST"
        })
        const data = await response.json();
        dispatch(removeUser(id, data))

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
        case REMOVE_SUGGESTION:
            const id = action.payload;
            const data = action.data.user[0]
           
            delete state.suggested[id];
           
            state.suggested[data.id] = data
            return {...state}

        default:
            return state;
            
    }
}

