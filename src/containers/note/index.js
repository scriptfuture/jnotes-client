import React, { Component } from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { Preloader } from '../../components/preloader/preloader'
import { Errors } from '../../components/errors/errors'


import {
  getNoteAsync,
  removeNote
} from '../../modules/notes'


class Note extends Component { 
 
 
  componentDidMount() { 
  
      let id = 1;
      if(typeof this.props.match.params.id !== "undefined") id = this.props.match.params.id;
  

	  this.props.getNoteAsync(id); 
	 

  } 
  
  
  getTags(tags) {
		
	  return tags.map((tag) =>
			<span className="tag" key={tag.id} onClick={(e) => this.props.openTag(tag.id)}>{tag.name}</span>
      );
  }
  
  
  remove(id) {
	  
	  if(window.confirm("Удалить заметку?")) {
		  this.props.removeNote(id, (res) => this.props.openNotes());
	  } // end if
  }
  
  update(id) {
	  this.props.openUpdateNote(id);
  }

  
  render() {

	
    let note = {"id": 0, "title": "", "text":"", "tags": []};
    

     if(typeof this.props.note !== 'undefined') {
        note = this.props.note;
        
        if(typeof this.props.note.tags === 'undefined') {
            note.tags = [];
        }
     }

	  
	  
	  return (<div className="notepage-container">
            <Preloader isShow={this.props.isLoad} />
            <Errors isError={this.props.isError} errors={this.props.errors}/>
      
		  <div className="notepage">
          
			<div className="num">{note.id}</div>

			<div className="header">{note.title}</div>
            
         
			<div className="tags">{this.getTags(note.tags)}</div>
            

			<div className="text">
                {note.text}
            
			    <div className="pull">
					<div className="pull-right"><a href="" onClick={(e) => {e.preventDefault(); return this.props.history.goBack()}}>&larr;назад</a></div>
				   
					<div className="pull-left">
					
					  <a href={"/update-note/"+note.id} onClick={(e) => {e.preventDefault(); return this.update(note.id)}}>Редактировать</a> &nbsp;
					  <a href="" onClick={(e) => {e.preventDefault(); return this.remove(note.id)}}>Удалить</a>
					</div>
				</div>
            </div>

			
		  </div>
		</div>);
  }
 
} 


const mapStateToProps = ({ notes  }) => ({

  note: notes.note,
  isNote: notes.isNote,
  isRemove: notes.isRemove,
  isLoad: notes.isLoad,
  isError: notes.isError,
  errors: notes.errors
  
})


const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getNoteAsync,
	  removeNote,

	  openNotes:  () => push('/notes'),
	  openTag:  (id) => push('/tag/'+id),
	  openUpdateNote:  (id) => push('/update-note/'+id),
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Note)
