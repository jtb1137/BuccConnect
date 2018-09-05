const initialState = {
  posts: [],
  post: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case POST_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_POSTS:
      return {
        ...state
      };
    case GET_POST:
      return {
        ...state
      };
    case ADD_POST:
      return {
        ...state
      };
    case DELETE_POST:
      return {
        ...state
      };
    default:
      return state;
  }
}
