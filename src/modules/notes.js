import $ from "jquery";

import {getUrl, getMethod} from "./../stubs";

export const GETNOTE_REQUESTED = 'notes/GETNOTE_REQUESTED'
export const GETNOTE = 'notes/GETNOTE'

export const CHANGEPAGE_REQUESTED = 'notes/CHANGEPAGE_REQUESTED'
export const CHANGEPAGE = 'notes/CHANGEPAGE'

export const GETTAG_REQUESTED = 'notes/GETTAG_REQUESTED'
export const GETTAG = 'notes/GETTAG'

export const REMOVENOTE_REQUESTED = 'notes/REMOVENOTE_REQUESTED'
export const REMOVENOTE = 'notes/REMOVENOTE'

export const NEWNOTE_REQUESTED = 'notes/NEWNOTE_REQUESTED'
export const NEWNOTE = 'notes/NEWNOTE_REQUESTED'

export const UPDATENOTE_REQUESTED = 'notes/UPDATENOTE_REQUESTED'
export const UPDATENOTE = 'notes/UPDATENOTE_REQUESTED'

export const SHOW_ERROR = 'notes/SHOW_ERROR'
export const HIDE_ERROR = 'notes/HIDE_ERROR'

const initialState = {
  notes: [],
  totalPages: 1,
  note: {},
  tag:{},
  isNotes: false,
  isNote: false,
  isTag: false,
  currentPage: 1,
  isRemove: false,
  isNew: false,
  isUpdate: false,
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
        errors: [],
		isError: false,
        isLoad: false
      }
      
      
    case GETNOTE_REQUESTED:
      return {
        ...state,
		isNote: true,
        note: action.data,
        isLoad: true
        
      }

    case GETNOTE:
      return {
        ...state,
		isNote: false,
        note: action.data,
        isLoad: false
      }
	  
    case CHANGEPAGE_REQUESTED:
      return {
        ...state,
        currentPage: action.page,
        isLoad: true
      }

    case CHANGEPAGE:
      return {
        ...state,
        currentPage: action.page,
        notes: action.data.notes,
		totalPages: action.data.totalPages,
        isLoad: false
      }
      
      
    case GETTAG_REQUESTED:
      return {
        ...state,
		isTag: true,
        isLoad: true
      }

    case GETTAG:
      return {
        ...state,
        currentPage: action.page,
        notes: action.data.notes,
		totalPages: action.data.totalPages,
		isTag: false,
        tag: action.data.tag,
        isLoad: false
      }
	  
    case REMOVENOTE_REQUESTED:
      return {
        ...state,
		isRemove: false,
        isLoad: true
      }

    case REMOVENOTE:
      return {
        ...state,
        isRemove: true,
        isLoad: false
      }
      
    case NEWNOTE_REQUESTED:
      return {
        ...state,
		isNew: false,
        isLoad: true
      }

    case NEWNOTE:
      return {
        ...state,
        isNew: true,
        isLoad: false
      }
      
    case UPDATENOTE_REQUESTED:
      return {
        ...state,
		isUpdate: false,
        isLoad: true
      }

    case UPDATENOTE:
      return {
        ...state,
        isUpdate: true,
        isLoad: false
      }

    default:
      return state
  }
}

export const getNoteAsync = (id) => {
  return dispatch => {
    dispatch({
      type: GETNOTE_REQUESTED
    });

    
	return $.ajax({
      dataType: "json",
	  type: "GET",
	  url: getUrl("/notes/one"),
	  data: {
		id: id
	  },
    }).done(function( result ) {

		  dispatch({
			type: GETNOTE,
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


export const changePageNotes = (page) => {

  return dispatch => {
    dispatch({
      type: CHANGEPAGE_REQUESTED
    });
	
	return $.ajax({
      dataType: "json",
	  type: "GET",
	  url: getUrl("/notes"),
	  data: {
		page: page
      }
    }).done(function( result ) {
        
		  dispatch({
			type: CHANGEPAGE,
			data: result,
			page: page
		  });

	}).fail(function(jqXHR, textStatus) {
        
	    dispatch({
	        type: SHOW_ERROR,
			errors: [{code: jqXHR.status, text: ""}]
		});

	});
	
 
  }
}


export const changePageTag = (id, page) => {
  return dispatch => {
    dispatch({
      type: GETTAG_REQUESTED
    });
    
    
	return $.ajax({
      dataType: "json",
	  type: "GET",
	  url: getUrl("/notes/tag"),
	  data: {
		id: id,
		page: page
	  },
    }).done(function( result ) {
          
		  dispatch({
			type: GETTAG,
			data: result,
		    id: id,
		    page: page
		  });

	}).fail(function(jqXHR, textStatus) {
        
	    dispatch({
	        type: SHOW_ERROR,
			errors: [{code: jqXHR.status, text: ""}]
		});

	});
	
  }
}

export const removeNote = (id, callback) => {
  return dispatch => {
    dispatch({
      type: REMOVENOTE_REQUESTED
    });
    

	return $.ajax({
      dataType: "json",
	  type: "GET",
	  url: getUrl("/notes/delete"),
	  data: {
		id: id
	  },
    }).done(function( result ) {
          
		  dispatch({
			type: REMOVENOTE,
			data: result,
		    id: id
		  });
		  
		  callback(result);

	}).fail(function(jqXHR, textStatus) {
        
	    dispatch({
	        type: SHOW_ERROR,
			errors: [{code: jqXHR.status, text: ""}]
		});

	});
    
	
  }
}

export const newNote = (title, text, tags, callback) => {
  return dispatch => {
    dispatch({
      type: NEWNOTE_REQUESTED
    });
    
	return $.ajax({
      dataType: "json",
	  type: getMethod("POST"),
	  url: getUrl("/notes/new"),
	  data: {
		title: title,
        text: text,
        tags: tags
	  },
    }).done(function( result ) {

		  dispatch({
			type: NEWNOTE,
			data: result,
            title: title,
            text: text,
            tags: tags
		  });
		  
		  callback(result);
          

	}).fail(function(jqXHR, textStatus) {
        
	    dispatch({
	        type: SHOW_ERROR,
			errors: [{code: jqXHR.status, text: ""}]
		});

	});
    
	
  }
}

export const updateNote = (id, title, text, tags, callback) => {
  return dispatch => {
    dispatch({
      type: UPDATENOTE_REQUESTED
    });
	
    
	return $.ajax({
      dataType: "json",
	  type: getMethod("POST"),
	  url: getUrl("/notes/update"),
	  data: {
        id: id,
		title: title,
        text: text,
        tags: tags
	  },
    }).done(function( result ) {

    
		  dispatch({
			type: UPDATENOTE,
			data: result,
            id: id,
            title: title,
            text: text,
            tags: tags
		  });
		  
		  callback(result);


	}).fail(function(jqXHR, textStatus) {
        
	    dispatch({
	        type: SHOW_ERROR,
			errors: [{code: jqXHR.status, text: ""}]
		});

	});

	
  }
}