import React, { Component } from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { Preloader } from '../../components/preloader/preloader'

import { Errors } from '../../components/errors/errors'


import {
  getNoteAsync,
  updateNote
} from '../../modules/notes'


class UpdateNote extends Component { 
 
  constructor() { 
       super();
   
       this.state = {
           isSuccess: false
       };

  } 
 
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

        if(id !== null) { 
        
            self.setState({isSuccess: true});
            

            setTimeout(
                () => self.props.updateNote(id, title, text, tags, (res) => self.props.openNotes()), 
                2000
            );
        }
        
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
            <Preloader isShow={this.props.isLoad} />
          
		    <h1>Редактирование заметки ID: {note.id}</h1>
            <br />
            
      
            <div className={this.state.isSuccess?"alert alert-success":"alert alert-success hide"} role="alert">
              Запись сохранена
            </div>
            
            <Errors isError={this.props.isError} errors={this.props.errors}/>
            
		  
			<form onSubmit={(e) => this.handleSubmit(e, this)} action="#" method="post">
				<div className="form-group">
					<label htmlFor="title">Заголовок</label><br />
					<input type="text" id="title" name="title" className="form-control" ref='title' defaultValue={note.title} />
				</div>
				<div className="form-group">
					<label htmlFor="text">Текст</label><br />
				    <textarea rows="10" id="text" name="text" className="form-control" ref='text'  defaultValue={note.text}></textarea>
				</div>
				<div className="form-group">
					<label htmlFor="tags">Теги (через запятую)</label><br />
					<input type="text" id="tags" name="tags" className="form-control" ref='tags' defaultValue={ts.join(", ")} />
				</div>
				
			    <p><button type="submit" className="btn btn-primary">Сохранить</button></p>
			</form>
			

		  </div>
		);
  }
 
} 


const mapStateToProps = ({ notes  }) => ({
   
    note: notes.note,
    isNote: notes.isNote,
    isLoad: notes.isLoad,
    isError: notes.isError,
    errors: notes.errors
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