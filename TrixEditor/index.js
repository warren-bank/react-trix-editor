const React      = require('react')
const PropTypes  = require('prop-types')

const {initializeEditor, updateEditor, finalizeEditor, exportDocument, exportHTML} = require('./initializeEditor')

require('./configureTrix')
require('./style.css')

class TrixEditor extends React.Component {
  constructor(props) {
    super(props)

    this.elementId = `trix-editor-${Date.now()}`
  }

  componentDidMount() {
    if (this.props.set_exportDocument) {
      this.props.set_exportDocument(
        this.get_exportDocument()
      )
    }

    if (this.props.set_exportHTML) {
      this.props.set_exportHTML(
        this.get_exportHTML()
      )
    }

    this.initializeEditor()
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.set_exportDocument && (nextProps.set_exportDocument !== this.props.set_exportDocument)) {
      nextProps.set_exportDocument(
        this.get_exportDocument()
      )
    }

    if (nextProps.set_exportHTML && (nextProps.set_exportHTML !== this.props.set_exportHTML)) {
      nextProps.set_exportHTML(
        this.get_exportHTML()
      )
    }

    return (nextProps.document !== this.props.document)
  }

  componentDidUpdate() {
    this.updateEditor()
  }

  componentWillUnmount() {
    if (this.props.set_exportDocument) {
      this.props.set_exportDocument(null)
    }

    if (this.props.set_exportHTML) {
      this.props.set_exportHTML(null)
    }

    this.finalizeEditor()
  }

  getTrixElement() {
    return document.getElementById( this.elementId )
  }

  initializeEditor() {
    const trix = this.getTrixElement()
    initializeEditor(trix, this.props.document)
  }

  updateEditor() {
    const trix = this.getTrixElement()
    updateEditor(trix, this.props.document)
  }

  finalizeEditor() {
    const trix = this.getTrixElement()
    finalizeEditor(trix)
  }

  get_exportDocument() {
    const func = () => {
      const  trix = this.getTrixElement()
      const  doc  = exportDocument(trix)
      return doc
    }
    return func.bind(this)
  }

  get_exportHTML() {
    const func = () => {
      const  trix = this.getTrixElement()
      const  html = exportHTML(trix)
      return html
    }
    return func.bind(this)
  }

  render() {
    return (
      React.createElement("trix-editor", {
        "class":     "trix-content",
        "autofocus": "true",
        "id":        this.elementId
      })
    )
  }

}

TrixEditor.propTypes = {
  document:            PropTypes.object,
  set_exportDocument:  PropTypes.func,
  set_exportHTML:      PropTypes.func
}

module.exports = TrixEditor
