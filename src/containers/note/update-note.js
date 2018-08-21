import React, { Component } from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'


import {
  getNoteAsync,
  updateNote
} from '../../modules/notes'


class UpdateNote extends Component { 
 
 
  componentDidMount() { 
   
      let id = null;
      if(typeof this.props.match.params.id !== "undefined") id = this.props.match.params.id;
  

	  this.props.getNoteAsync(id); 

  } 
  
  handleSubmit(event, self) {
        event.preventDefault();
        event.stopPropagation();

        const title = self.refs.title.value;
        const text = self.refs.text.value;
        const tags = self.refs.tags.value;
        
        let id = null;
        if(typeof this.props.match.params.id !== "undefined") id = this.props.match.params.id;

        if(id !== null) self.props.updateNote(id, title, text, tags, (res) => self.props.openNotes());
        
        return false;
  }
  
  render() {

    let note = {"id": 0, "title": "", "text":"", "tags": []}, ts = [];
    

     if(typeof this.props.note !== 'undefined') {
        note = this.props.note;
        
        if(typeof this.props.note.tags === 'undefined') {
            note.tags = [];
        }
		
		for(let i in note.tags) {
			ts.push(note.tags[i].name);
		} // end for
     }

	  
	  return (
		  <div className="page-form">
		    <h1>Редактирование заметки ID: {note.id}</h1>
		  
			<form onSubmit={(e) => this.handleSubmit(e, this)} action="#" method="post">
				<p>
					<label htmlFor="name">Заголовок</label><br />
					<input type="text" id="title" name="title"  ref='title' defaultValue={note.title} />
				</p>
				<p>
					<label htmlFor="name">Текст</label><br />
				    <textarea rows="10" name="text"  ref='text' >{note.text}</textarea>
				</p>
				<p>
					<label htmlFor="name">Теги (через запятую)</label><br />
					<input type="text" id="tags" name="tags"  ref='tags' defaultValue={ts.join(", ")} />
				</p>
				
				
			    <p><button type="submit">Отправить</button></p>
			</form>
			

		  </div>
		);
  }
 
} 


const mapStateToProps = ({ notes  }) => ({
   
    note: notes.note,
    isNote: notes.isNote
})


const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getNoteAsync,
      updateNote,
	  
	  openNotes:  () => push('/notes')
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateNote)