import React, { Component } from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'


import { Preloader } from '../../components/preloader/preloader'

import { Errors } from '../../components/errors/errors'


import {
  newNote
} from '../../modules/notes'


class NewNote extends Component { 
 
 
  constructor() { 
       super();
   
       this.state = {
           isSuccess: false
       };

  } 
  
  componentDidMount() {} 
  
  handleSubmit(event, self) {
        event.preventDefault();
        event.stopPropagation();

        const title = self.refs.title.value;
        const text = self.refs.text.value;
        const tags = self.refs.tags.value;
        
        self.setState({isSuccess: true});
        

        setTimeout(
            () => self.props.newNote(title, text, tags, (res) => self.props.openNotes()), 
            2000
        );
        
        return false;
  }
  
  render() {

	

	  
	  return (
		  <div className="page-form">
            <Preloader isShow={this.props.isLoad} />
          
		    <h1>Новая заметка</h1>
            <br />
            
      
            <div className={this.state.isSuccess?"alert alert-success":"alert alert-success hide"} role="alert">
              Запись сохранена
            </div>
            
            <Errors isError={this.props.isError} errors={this.props.errors}/>
            
		  
			<form onSubmit={(e) => this.handleSubmit(e, this)} action="#" method="post">
				<div className="form-group">
					<label htmlFor="title">Заголовок</label><br />
					<input type="text" id="title" name="title" className="form-control" ref='title'/>
				</div>
				<div className="form-group">
					<label htmlFor="text">Текст</label><br />
				    <textarea rows="10" id="text" name="text" className="form-control" ref='text'></textarea>
				</div>
				<div className="form-group">
					<label htmlFor="tags">Теги (через запятую)</label><br />
					<input type="text" id="tags" name="tags" className="form-control" ref='tags'/>
				</div>
				
			    <p><button type="submit" className="btn btn-primary">Отправить</button></p>
               
			</form>
			

		  </div>
		);
  }
 
} 


const mapStateToProps = ({ notes  }) => ({
    
  isLoad: notes.isLoad,
  isError: notes.isError,
  errors: notes.errors
  
})


const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      newNote,

	  openNotes: () => push('/notes'), 
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewNote)