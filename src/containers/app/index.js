import React from 'react'
import { Route, Link } from 'react-router-dom'
import Home from '../home'
import About from '../about'
import Notes from '../notes'
import Note from '../note'
import NewNote from '../note/newnote'
import UpdateNote from '../note/update-note'

import Tag from '../tag'
import Tags from '../tags'

const App = () => (
  <div>
    <header>
      <Link to="/">Главная</Link>
      <Link to="/about-us">О проекте</Link>
	  <Link to="/newnote">Новая заметка</Link>
	  <Link to="/notes">Заметки</Link>
	  <Link to="/tags">Теги</Link>
    </header>

    <main>
      <Route exact path="/" component={Home} /> 
      <Route exact path="/about-us" component={About} /> 
	  
	  <Route exact path="/newnote" component={NewNote} />
	  <Route exact path="/update-note/:id" component={UpdateNote} />
	  
	  <Route exact path="/notes/:page" component={Notes} />
	  <Route exact path="/notes" component={Notes} />
	  
	  <Route exact path="/note/:id" component={Note} />
	  
	  <Route exact path="/tags" component={Tags} />
      <Route exact path="/tag/:id/:page" component={Tag} />
	  <Route exact path="/tag/:id" component={Tag} />
    </main>
  </div>
)

export default App
