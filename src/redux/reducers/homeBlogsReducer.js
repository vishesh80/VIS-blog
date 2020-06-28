const homeBlogsReducer = (state = [], action) => {
    switch (action.type) {

        case 'RECENT' : return [...state,...action.blogs];

        case 'POPULAR': return [...state,...action.blogs];

        case 'SEARCH': return action.blogs;

        case 'CLEAR_HOMEBLOGS': return [];
        
        default: return state;
    }
}

export default homeBlogsReducer;