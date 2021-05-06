const GET_ACTIVITIES = 'activity/GET_ACTIVITIES'

const setActivities = (activities) => ({
    type: GET_ACTIVITIES,
    payload: activities
})

export const getActivities = () => async (dispatch) => {
    const response = await fetch("/api/activities")

    if (response.ok){
        const activities = await response.json();
        dispatch(setActivities(activities))
        return activities
    }
}

const initialState = {activities: null}

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
        default:
            return state
    }
}