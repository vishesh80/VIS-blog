
const profileReducer = (state = {}, action) => {
    switch (action.type) {
       
        case 'GET_PROFILE': return action.profile;

        case 'EDIT_PROFILE': return action.profile;

        case 'CLEAR_PROFILE': return {};

        default: return state;
    }
}

export default profileReducer;