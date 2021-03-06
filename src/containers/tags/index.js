import React, { Component } from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { Preloader } from '../../components/preloader/preloader'
import { Errors } from '../../components/errors/errors'

import {
  getTagsAsync
} from '../../modules/tags'


class Tags extends Component { 
 
 
  componentDidMount() { 
  

	     this.props.getTagsAsync();

      
  } 
  
  getAlphabetizing(arr) {
	  let alphabet = ["А","Б","В","Г","Д","Е","Ё","Ж","З","И","К","Л","М","Н","О","П","Р","С","Т","У","Ф","Х","Ц","Ч","Ш","Щ","Э","Ю","Я","[0-9]",
                      "A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
	  let alphabetResult = {};
	  
	  for(let i in alphabet) {
		  
		  let tags  = [];
		  
		  for(let n in arr) {
		  
		      let re = new RegExp("^"+alphabet[i], "i");
			  
			  if(re.test(arr[n].name)) tags.push(arr[n]);
		  
		  } // end for
		  
		  
		  // сортируем по алфавиту и добавляем в результирующий массив
		  if(tags.length > 0) alphabetResult[alphabet[i]] = tags.sort((a, b) => a.name.localeCompare(b.name));
	  } // end for
	  
	  console.log(alphabetResult);
	  
	  return alphabetResult;
  }
  
  
  getTagsColomn(numCol, atags) {
	  
	  
	  let cols = [];
	      cols[0] = ["А","Б","В","Г","Д","Е","Ё","Ж","З","И"];
	      cols[1] = ["К","Л","М","Н","О","П","Р","С","Т","У"];
		  cols[2] = ["Ф","Х","Ц","Ч","Ш","Щ","Э","Ю","Я","[0-9]"];
          
	      cols[3] = ["A","B","C","D","E","F","G","H","I"];
	      cols[4] = ["J","K","L","M","N","O","P","Q","R"];
		  cols[5] = ["S","T","U","V","W","X","Y","Z"];

		  
	  let resultcol = [];	  
		  
		  for(let i in cols[numCol]) {
			  if(typeof atags[cols[numCol][i]] !== "undefined") resultcol.push({"letter": cols[numCol][i], "tags": atags[cols[numCol][i]]});
		  }

	
	  return resultcol.map((t) =>
			<div className="letter"  key={t.letter}>
			   <h2>{t.letter}</h2>
			   
			  <ul> 
			   {t.tags.map((tag) => <li key={tag.id}><a href={"/tag/"+tag.id} onClick={(e) =>  {e.preventDefault(); return this.props.openTag(tag.id)}}>{tag.name}</a></li>)}
			  </ul>

			</div>
      );

  }

  
  
  render() {
	  

	  let atags  = this.getAlphabetizing(this.props.tags)
	  
	  return (
		  <div>
          
            <Preloader isShow={this.props.isLoad} />
          
			<h1>Теги</h1>
            
            <Errors isError={this.props.isError} errors={this.props.errors}/>
          
		

  <div className="alphabet">
   <div className="col1">{this.getTagsColomn(0, atags)}</div>
   <div className="col2">{this.getTagsColomn(1, atags)}</div>
   <div className="col3">{this.getTagsColomn(2, atags)}</div>
   <div className="col-clear"></div>
  </div>
  
  <div className="alphabet">
   <div className="col1">{this.getTagsColomn(3, atags)}</div>
   <div className="col2">{this.getTagsColomn(4, atags)}</div>
   <div className="col3">{this.getTagsColomn(5, atags)}</div>
   <div className="col-clear"></div>
  </div>
			
			
		  </div>
		);
  }
 
} 


const mapStateToProps = ({ tags  }) => ({

  tags: tags.tags,
  isTags: tags.isTags,
  isLoad: tags.isLoad,
  isError: tags.isError,
  errors: tags.errors
})


const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
	  getTagsAsync,
	  openTag:  (id) => push('/tag/'+id),
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tags)
