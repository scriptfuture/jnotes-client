import $ from "jquery";


export const GETTAGS_REQUESTED = 'tags/GETTAGS_REQUESTED'
export const GETTAGS = 'tags/GETTAGS'


const initialState = {
  tags: [],
  isTags: false
}

export default (state = initialState, action) => {
	
  switch (action.type) {
    case GETTAGS_REQUESTED:
      return {
        ...state,
		isTags: true
      }

    case GETTAGS:
      return {
        ...state,
		isTags: false,
        tags: action.data.tags
      }
	 

    default:
      return state
  }
}

export const getTagsAsync = () => {
  return dispatch => {
    dispatch({
      type: GETTAGS_REQUESTED
    });
	
    return $.ajax({
	  url: "/api/tags.json",
	  data: {},
	  success: function( result ) {

		  dispatch({
			type: GETTAGS,
			data: result
		  });
		  
	  }
	});
	
  }
}