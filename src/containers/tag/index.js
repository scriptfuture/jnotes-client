import React, { Component } from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import {
  changePageTag
} from '../../modules/notes'


class Tag extends Component { 
 
 
  componentDidMount() { 
  
     console.log(this.props.match.params);
  
     let page = 1;
     if(typeof this.props.match.params.page !== "undefined") page = this.props.match.params.page;
  
     if(typeof this.props.match.params.id !== "undefined") {
	     this.props.changePageTag(this.props.match.params.id, page);
	 }

  } 
  
  
  getTags(tags) {
		
	  return tags.map((tag) =>
			<span className="tag" key={tag.id} onClick={(e) => this.props.openTag(tag.id)}>{tag.name}</span>
      );
  }
  
  getNotes() {
	  
	  let notes = [];
	  if(typeof this.props.notes !== "undefined") notes = this.props.notes;
	  
	  return notes.map((note) =>
			<div className="note" key={note.id}>
			   <div className="num">{note.id}</div>
			   <div className="header"><a onClick={(e) => this.props.openNote(note.id)}>{note.title}</a></div>
			
			   <div className="text">{note.text}</div>
			   <div className="tags">{this.getTags(note.tags)}</div>
			</div>
      );
  }
  
  getPages() {
	  
	  let pages = [];
	  
	  if(typeof this.props.totalPages !== "undefined" && typeof this.props.currentPage !== "undefined") {
		  for(let i = 1; i <= this.props.totalPages; i++) {
			  pages.push({"num": i, "isCurrent": parseInt(this.props.currentPage, 10) === i});
		  } // end for
	  }
	
	  return pages.map((page) =>
			<div className={page.isCurrent?"c-page":"page"} key={page.num} onClick={(e) => this.props.changePage(page.num, this.props)}>{page.num}</div>
      );
	
  }
  
  render() {
	  
	  let numPlus = 1, numMinus = 1;
	  
	  // навигация по страницам пагинации
	  if(typeof this.props.totalPages !== "undefined" && typeof this.props.currentPage !== "undefined") {
		  
		  if(this.props.currentPage === 1) {
			  
			  numPlus = this.props.currentPage + 1; 
			  numMinus = this.props.totalPages;
		  } else if(this.props.currentPage === this.props.totalPages) {
			  
			  numPlus = 1; 
			  numMinus = this.props.currentPage - 1;
		  } else {
			  
			  numPlus = this.props.currentPage + 1; 
			  numMinus = this.props.currentPage - 1;
		  } // end if
		  
	  }
	  
	  return (
		  <div>
			<h1>Тег: {this.props.tag.name}</h1>

			<div className="notes">
			
				{this.getNotes()}
				<div className="note-clear"></div>
			
			</div>

			
		{this.props.totalPages <= 1?(
		    <div className="pages">
			     <div className="c-page">1</div>
				 <div className="note-clear"></div>
			</div>
		    ):(
			<div className="pages">
			
				<div className="page"  onClick={(e) => this.props.changePage(numMinus, this.props)}>&lsaquo; </div>  
				{this.getPages()} 

				<div className="page"  onClick={(e) => this.props.changePage(numPlus, this.props)}>&rsaquo;</div>
				<div className="note-clear"></div>	

            </div>)}

			
			
		  </div>
		);
  }
 
} 


const mapStateToProps = ({ counter, notes  }) => ({
	
  notes: notes.notes,
  isNotes: notes.isNotes,
  currentPage:  notes.currentPage,
  totalPages:  notes.totalPages,
  tag: notes.tag
})


const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      changePageTag,
	  
	  changePage:  function(page, props) { props.changePageTag(props.match.params.id, page); return push('/tag/'+props.match.params.id); },
	  openNote:  (id) => push('/note/'+id),
	  openTag:  (id) => push('/tag/'+id)
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tag)

