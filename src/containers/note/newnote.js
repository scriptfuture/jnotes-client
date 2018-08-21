import React, { Component } from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'


import {
  newNote
} from '../../modules/notes'


class NewNote extends Component { 
 
 
  componentDidMount() { 
   

  } 
  
  handleSubmit(event, self) {
        event.preventDefault();
        event.stopPropagation();

        const title = self.refs.title.value;
        const text = self.refs.text.value;
        const tags = self.refs.tags.value;

        self.props.newNote(title, text, tags, (res) => self.props.openNotes());
        
        return false;
  }
  
  render() {

	

	  
	  return (
		  <div className="page-form">
		    <h1>Новая заметка</h1>
		  
			<form onSubmit={(e) => this.handleSubmit(e, this)} action="#" method="post">
				<p>
					<label htmlFor="name">Заголовок</label><br />
					<input type="text" id="title" name="title"  ref='title'/>
				</p>
				<p>
					<label htmlFor="name">Текст</label><br />
				    <textarea rows="10" name="text"  ref='text'></textarea>
				</p>
				<p>
					<label htmlFor="name">Теги (через запятую)</label><br />
					<input type="text" id="tags" name="tags"  ref='tags'/>
				</p>
				
			    <p><button type="submit">Отправить</button></p>
			</form>
			

		  </div>
		);
  }
 
} 


const mapStateToProps = ({ notes  }) => ({

  
})


const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      newNote,

	  openNotes:  () => push('/notes')
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewNote)