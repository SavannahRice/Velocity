const GET_ACTIVITIES = 'activity/GET_ACTIVITIES'
const GET_FOLLOWING_ACTIVITIES = 'activity/GET_FOLLOWING_ACTIVITIES'
const GET_LIKES = 'likes/GET_LIKES'
const GET_SINGLE_ACTIVITY = 'activity/GET_SINGLE_ACTIVITY'
const INCREMENT = 'activity/INCREMENT'

const setActivities = (activities) => ({
    type: GET_ACTIVITIES,
    payload: activities
})

const setFollowingActivities = (activities) => ({
    type: GET_FOLLOWING_ACTIVITIES,
     activities
})

const setLikes = (likes) => ({
    type: GET_LIKES,
    likes
})

const singleActivity = (activity) => ({
    type: GET_SINGLE_ACTIVITY,
    activity
})




export const getActivities = () => async (dispatch) => {
    const response = await fetch("/api/activities")

    if (response.ok){
        const activities = await response.json();
        dispatch(setActivities(activities))
        // console.log(activities)
        return activities;
    }
    
}

export const getSingleActivity = (activityId) => async (dispatch) => {
    const response = await fetch(`/api/activities/${activityId}`)

    if (response.ok){
        const activity = await response.json()
        console.log('inside getsingleactivity thunk', activity)
        return dispatch(singleActivity(activity))
        
        
    }
}

export const getFollowingActivities = (following) => async (dispatch) => {
    // console.log(following)
    const allActivities = []
    const allActivityObj = {}
    following.map(async (singleUser) =>  {
        const response = await fetch(`/api/activities/following/${singleUser}`)

        if (response.ok){
            const activities = await response.json();
            if (activities.activities.length > 0){
                allActivityObj[singleUser] = activities.activities
                allActivities.push(activities.activities)
                // console.log('Here is activity obj', allActivityObj)
            }
        }
    //     if (allActivities) {
    //     dispatch(setFollowingActivities(allActivities))
    // }
    })

    // const response = await fetch(`/api/activities/following/${singleUser}`)

    if (allActivities) {
        dispatch(setFollowingActivities(allActivities))
    }
    
}

export const likeActivity = (activityId) => async (dispatch) => {

    const response = await fetch(`/api/activities/like/${activityId}`, {
        method: "POST"
    })


    const like = await response.json()
    dispatch(setLikes(like))
    console.log('inside like activity thunk', like)
    
    
}

export const unlikeActivity = (activityId) => async (dispatch) => {
    const response = await fetch(`/api/activities/like/${activityId}`, {
        method: "DELETE"
    })

    const data = await response.json()
    return
}

// export const getActivityLikes = (activityId) => async (dispatch) => {
//     const response = await fetch(`/api/activities/like/${activityId}`)
//     const data = response.json()
//     dispatch(likedActivity(data))

// }

// export const getLikes = () => async (dispatch) => {
//     console.log('inside get likes thunk')
//     const response = await fetch("/api/activities/likes")

//     if (response.ok) {
//         const likes = await response.json();
//         dispatch(setLikes(likes))
//         return likes
//     }
// }

const initialState = {activities: null, friends: null, activity: null, liked: null }

export default function reducer(state = initialState, action){
    switch(action.type){
        case GET_ACTIVITIES: {
            const allActivities = action.payload.activities;
            const activitiesObj = {}
            for (const activity of allActivities){
                activitiesObj[activity.id] = activity
            }
            return {...state, activities: activitiesObj}
        }
        case GET_FOLLOWING_ACTIVITIES: {
           
            const activitiesObj = {}
            const allFollowingActivities = action.activities;

            for (let i = 0; i < allFollowingActivities.length; i++){
                const currentArr = allFollowingActivities[i]
                for (let j = 0; j < currentArr.length; j++){
                    const currentActivity = currentArr[j]
                    activitiesObj[currentActivity.id] = currentActivity
                }
            }

            return {...state, friends: activitiesObj}

        }
        case GET_LIKES: {
            const likes = action.likes;
            console.log('inside getlikes reducer',likes)
            
        }

        case GET_SINGLE_ACTIVITY: {
            const activity = action.activity
            return {...state, activity: activity }
        }
        

        default:
            return state
    }
}