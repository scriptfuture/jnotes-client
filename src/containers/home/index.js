import React from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'



const Home = props => (
  <div>
    <h1>Главная</h1>
	

    <p>
      <button className="btn btn-primary btn-lg" onClick={() => props.changePage()}>
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
