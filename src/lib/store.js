import engine from 'store/src/store-engine'
import sessionStorage from 'store/storages/sessionStorage'

export default engine.createStore(sessionStorage)
