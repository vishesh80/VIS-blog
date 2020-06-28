
const myBlogsReducer = (state = [], action) => 
{
    switch(action.type)
    {
        case 'GET_ALL': return [...action.blogs];

        case 'CLEAR' : return [];

        case 'CREATE': return [action.blog , ...state];

        case 'DELETE' : return state.filter(blog => blog._id !== action._id);

        case 'EDIT' : return state.map(blog => (blog._id === action.blog._id)? action.blog : blog);
        
        default: return state;
    }
}

export default myBlogsReducer;