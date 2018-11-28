const React     = require('react')
const ReactDOM  = require('react-dom')

const Trix      = require('trix'); require('trix/dist/trix.css');
window.Trix     = Trix

const App       = require('./App')

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
