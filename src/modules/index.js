import { combineReducers } from 'redux'
import notes from './notes'
import tags from './tags'

export default combineReducers({
  notes,
  tags
})
