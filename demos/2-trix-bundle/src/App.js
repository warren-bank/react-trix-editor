const React  = require('react')

const TrixEditor  = require('../../../TrixEditor')

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state                  = {document: null}

    this.exportTrixElement      = null
    this.exportHTML             = null
    this.exportDocument         = null
    this.prevDocument           = null

    this.set_exportTrixElement  = this.set_exportTrixElement.bind(this)
    this.set_exportHTML         = this.set_exportHTML.bind(this)
    this.set_exportDocument     = this.set_exportDocument.bind(this)

    this.timer_1                = null
    this.timer_2                = null
    this.start_timers()
  }

  set_exportTrixElement(func) {
    this.exportTrixElement = func
  }

  set_exportHTML(func) {
    this.exportHTML = func
  }

  set_exportDocument(func) {
    this.exportDocument = func
  }

  start_timers() {
    this.timer_1 = setInterval(
      () => {
        if (this.exportDocument)
          this.prevDocument = this.exportDocument()
      },
      5000
    )

    this.timer_2 = setInterval(
      () => {
        if (this.prevDocument)
          this.setState({document: this.prevDocument})
      },
      1000
    )
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (nextState.document !== this.state.document)
  }

  render() {
    console.clear()
    console.log('rendering: App')
    if (this.exportTrixElement) console.log('Trix element:', this.exportTrixElement())
    if (this.exportHTML)        console.log('Trix HTML:',     this.exportHTML())

    const props = {
      set_exportTrixElement:  this.set_exportTrixElement,
      set_exportHTML:         this.set_exportHTML,
      set_exportDocument:     this.set_exportDocument,
      document:               this.state.document,
      autofocus:              false,
      placeholder:            ''
    }

    return (
      <TrixEditor {...props} />
    )
  }

}

module.exports = App
