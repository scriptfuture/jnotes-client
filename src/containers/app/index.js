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
    <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
    <div className="container">
      <Link className="navbar-brand" to="/">Заметки</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarCollapse">
      
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link className="nav-link" to="/">Главная <span className="sr-only">(current)</span></Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/about-us">О проекте</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/newnote">Новая заметка</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/notes">Заметки</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/tags">Теги</Link>
          </li>
        </ul>
        
      </div>
    </div>
    </nav>

    <main role="main"className="container">
      <div className="row">
        <div className="col content">


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

        </div>
      </div>

    <br />
      
      
    </main>
  
  </div>
)

export default App
