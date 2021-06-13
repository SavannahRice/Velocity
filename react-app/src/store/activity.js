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
        return activities;
    }
    
}

export const getSingleActivity = (activityId) => async (dispatch) => {
    const id = activityId.id
    const response = await fetch(`/api/activities/${activityId}`)

    if (response.ok){
        const activity = await response.json()
        dispatch(singleActivity(activity))
        return activity
        
        
    }
}

export const getFollowingActivities = () => async (dispatch) => {
        const response = await fetch('/api/activities/following')

        if (response.ok){
            const activities = await response.json();
            dispatch(setFollowingActivities(activities))
        }
}


export const likeActivity = (activityId) => async (dispatch) => {
    const response = await fetch(`/api/activities/like/${activityId}`, {
        method: "POST"
    })
    const like = await response.json()
    dispatch(setLikes(like))
}

export const unlikeActivity = (activityId) => async (dispatch) => {
    const response = await fetch(`/api/activities/like/${activityId}`, {
        method: "DELETE"
    })
    const data = await response.json()
    return
}

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
            const followingActivities = action.activities.activities;
            for (const activity of followingActivities){
                activitiesObj[activity.id] = activity
            }
            return {...state, friends: activitiesObj}

        }
        case GET_LIKES: {
            const likes = action.likes;
        }

        case GET_SINGLE_ACTIVITY: {
            const current = action.activity
            return {...state, activity: current }
        }
        
        default:
            return state
    }
}