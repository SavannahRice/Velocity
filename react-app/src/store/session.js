// constants
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";
// const ALL_USERS = "session/ALL_USERS"

const setUser = (user) => ({
    type: SET_USER,
    payload: user
})

const removeUser = () => ({
    type: REMOVE_USER
})

// const allUsers = () => ({
//     type: ALL_USERS,
//     payload: users
// })



// thunks
export const authenticate = () => async (dispatch) => {
    const response = await fetch('/api/auth/', {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const data = await response.json();
    if (data.errors) {
        return;
    }
    dispatch(setUser(data))
    
}

export const login = (email, password) => async (dispatch) => {
    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    });
    const data = await response.json();
    if (data.errors) {
        return data;
    }
    dispatch(setUser(data));
    return {};
}

export const logout = () => async (dispatch) => {
    const response = await fetch("/api/auth/logout", {
        headers: {
            "Content-Type": "application/json",
        }
    });
    const data = await response.json();
    dispatch(removeUser());
};

export const getUser = (id) => async (dispatch) => {
    const response = await fetch(`api/users/${id}`)
    const data = await response.json();
    dispatch(setUser(data))
}

export const signUp = (username, email, city, state, avatar, password) => async (dispatch)=> {
    
    
    const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        
        // body: formData,
        body: JSON.stringify({
            username,
            email,
            city,
            state,
            password,
        }),
    });
    const data = await response.json();
    if (response.ok){

        dispatch(setUser(data));
    }
}

// reducer
const initialState = { user: null};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_USER:
            return { user: action.payload };
        case REMOVE_USER:
            return { user: null };
        default:
            return state;
    }
}
