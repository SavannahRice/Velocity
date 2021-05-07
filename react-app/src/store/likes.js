// const GET_LIKES = 'likes/GET_LIKES'


// const setLikes = (likes) => ({
//     type: GET_LIKES,
//     likes
// })

// export const getLikes = () => async (dispatch) => {
//     const response = await fetch("/api/activities/likes")

//     if (response.ok) {
//         const likes = await response.json();
//         dispatch(setLikes(likes))
//         return likes
//     }
// }

// const initialState = {likes: null}

// export default function reducer(state = initialState, action){
//     switch(action.type){
//         case GET_LIKES: {
//             const likes = action.likes.likes;
//             // console.log(likes)
            
//             const likesObj = {}
//             for (const like of likes){
//                 likesObj[like.id] = like
//             }
//             return {...state, likes: likesObj}
//         }
//         default:
//             return state
//     }

// }