import React, { useEffect, useState } from "react";
import  { useDispatch, useSelector } from "react-redux";
import { getSuggestedUsers } from '../../store/suggested';



function GetSuggested() {
    const [suggested, setSuggested] = useState({});
    const suggestedUsers = useSelector(state => state.suggested.suggested)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getSuggestedUsers())
    }, [dispatch])

    return (
        <div>Testing</div>
    )


}

export default GetSuggested;