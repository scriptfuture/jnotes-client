import $ from "jquery";

import {getUrl} from "./../stubs";

export const GETTAGS_REQUESTED = 'tags/GETTAGS_REQUESTED'
export const GETTAGS = 'tags/GETTAGS'

export const SHOW_ERROR = 'notes/SHOW_ERROR'
export const HIDE_ERROR = 'notes/HIDE_ERROR'



const initialState = {
  tags: [],
  isTags: false,
  isLoad: false,
  isError: false,
  errors: []
}

export default (state = initialState, action) => {
	
  switch (action.type) {
    case SHOW_ERROR:
      return {
        ...state,
        errors: action.errors,
		isError: true,
        isLoad: false
        
      }

    case HIDE_ERROR:
      return {
        ...state,
		isError: false,
        isLoad: false
      }
      
    case GETTAGS_REQUESTED:
      return {
        ...state,
		isTags: true,
        isLoad: true
      }

    case GETTAGS:
      return {
        ...state,
		isTags: false,
        tags: action.data.tags,
        isLoad: false
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
      dataType: "json",
	  url: getUrl("/tags"),
	  data: {},
    }).done(function( result ) {
          

		  dispatch({
			type: GETTAGS,
			data: result
		  });

	}).fail(function(jqXHR, textStatus) {
        
        
	    dispatch({
	        type: SHOW_ERROR,
			errors: [{code: jqXHR.status, text: ""}]
		});

	});
    
	
  }
}