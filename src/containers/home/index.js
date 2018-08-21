import React from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'



const Home = props => (
  <div>
    <h1>Главная</h1>
	
	{/*
<form action="" method="get">
  <input name="s" placeholder="Искать здесь..." type="search" />
  <button type="submit">Поиск</button>
</form>

	*/}
	
	

    <p>
      <button onClick={() => props.changePage()}>
        Список заметок
      </button>
    </p>
  </div>
)

const mapStateToProps = ({ counter, notes  }) => ({

})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {

      changePage: () => push('/notes'),

    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
