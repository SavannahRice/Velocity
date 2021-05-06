const GET_ACTIVITIES = 'activity/GET_ACTIVITIES'
const GET_FOLLOWING_ACTIVITIES = 'activity/GET_FOLLOWING_ACTIVITIES'
const ACTIVITY_LIKED = 'activity/ACTIVITY_LIKED'

const setActivities = (activities) => ({
    type: GET_ACTIVITIES,
    payload: activities
})

const setFollowingActivities = (activities) => ({
    type: GET_FOLLOWING_ACTIVITIES,
     activities
})


export const getActivities = () => async (dispatch) => {
    const response = await fetch("/api/activities")

    if (response.ok){
        const activities = await response.json();
        dispatch(setActivities(activities))
        return activities
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
        if (allActivities) {
        dispatch(setFollowingActivities(allActivities))
    }
    })
    
}

export const likeActivity = (activityId) => async (dispatch) => {

    const response = await fetch(`/api/activities/like/${activityId}`, {
        method: "POST"
    })

    const data = await response.json()
    return
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

const initialState = {activities: null, friends: null, liked: null}

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

        default:
            return state
    }
}