### [react-trix-editor](https://github.com/warren-bank/react-trix-editor)

React component for [Basecamp's _Trix_ rich text editor](https://github.com/basecamp/trix)

#### Origin story

* I'm adding an HTML editor to [Secure-Webmail](https://github.com/warren-bank/Secure-Webmail)
  * did a quick survey of what's available:

    | library       | size (min+gzip) | size (min) | jquery | bootstrap | react | link |
    |---------------|-----------------|------------|--------|-----------|-------|------|
    | pell          | 1.38kB          | 3.54kB     |        |           |       | https://github.com/jaredreich/pell |
    | squire        | 16kB            | 49kB       |        |           |       | https://github.com/neilj/Squire |
    | medium-editor | 27kB            | 105kB      |        |           |       | https://github.com/yabwe/medium-editor |
    | quill         | 43kB            | 205kB      |        |           |       | https://github.com/quilljs/quill |
    | trix          | 47kB            | 204kB      |        |           |       | https://github.com/basecamp/trix |
    | ckeditor      | 163kB           | 551kB      |        |           |       | https://ckeditor.com |
    | trumbowyg     | 8kB             | 23kB       | x      |           |       | https://github.com/Alex-D/Trumbowyg |
    | summernote    | 26kB            | 93kB       | x      | x         |       | https://github.com/summernote/summernote |
    | draft         | 46kB            | 147kB      |        |           | x     | https://github.com/facebook/draft-js |
    | froala        | 52kB            | 186kB      | x      |           |       | https://github.com/froala/wysiwyg-editor |
    | tinymce       | 157kB           | 491kB      | x      |           |       | https://github.com/tinymce/tinymce |
  * ruled out the ones that depend on _jQuery_
  * tried out the rest
    * _Trix_ is the only html editor that could properly generate nested lists

#### What this is, and what this is not..

* _Trix_ uses a very non-opinionated approach
  * the library provides a lot of low-level events to enable deep customization, but doesn't provide much high-level functionality out-of-the-box
* the purpose of this library is to:
  * provide a React component wrapper around _Trix_
  * encapsulate all of the customizations that I want for my particular use-case
  * share the result for anyone who has a similar need

#### Customizations

* file attachments:
  * are __NOT__ uploaded to any server
  * the only files of any interest are images, which are embedded (using a `data:` URI)
* additional toolbar buttons:
  * Embed an image
    * opens a file-chooser dialog
    * embeds the image(s)
  * Horizontal rule
    * adds an `<hr />` tag
* behavior:
  * the editor is a fixed height, and a vertical scrollbar is used (when necessary)
  * the editor automatically scrolls, such that the cursor is visible in the middle of the viewport, when:
    * image(s) are embedded
    * rich text content is pasted into the editor

#### React props

* `set_exportHTML`
* `set_exportDocument`
* `document`

#### Anti-Pattern

* `set_exportHTML`
* `set_exportDocument`
  * these are both functions passed to `TrixEditor`
  * `TrixEditor` calls these functions when:
    * _componentDidMount_
    * _componentDidUpdate_
  * `TrixEditor` passes a (corresponding) function back to the parent component
    * after the parent component has received a reference to these functions, they can be called to obtain (corresponding) data from the `TrixEditor` component

* specifically:
  * `set_exportHTML` is passed a reference to the function: `exportHTML`
    * `exportHTML` returns: a string of HTML text
  * `set_exportDocument` is passed a reference to the function: `exportDocument`
    * `exportDocument` returns: an immutable Object representation of the current state of the document in the editor
      * the data type of this immutable Object is the same as the React prop: `document`

#### Installation:

```bash
npm install --save @warren-bank/react-trix-editor
```

#### Dependencies:

* I chose to __not__ bundle _Trix_ with this component
  * it expects the global: `window.Trix`
    * this can be satisfied in 1 of 2 ways:
      * include _Trix_ externally
        * example: from a CDN
          ```html
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/trix/1.0.0/trix.css" />
            <script src="https://cdnjs.cloudflare.com/ajax/libs/trix/1.0.0/trix.js"></script>
          ```
      * include _Trix_ internally
        * add as a project dependency
        * in the script used as the entry-point for Webpack:
          ```javascript
            const Trix = require('trix'); require('trix/dist/trix.css');
            window.Trix = Trix
          ```

#### Demos:

1. [include _Trix_ externally](https://github.com/warren-bank/react-trix-editor/blob/master/demos/1-trix-global/src/index.js)
   * [run demo](https://gitcdn.link/cdn/warren-bank/react-trix-editor/master/demos/1-trix-global/dist/index.html)
2. [include _Trix_ internally](https://github.com/warren-bank/react-trix-editor/blob/master/demos/2-trix-bundle/src/index.js)
   * [run demo](https://gitcdn.link/cdn/warren-bank/react-trix-editor/master/demos/2-trix-bundle/dist/index.html)

__notes:__

* both demos are nearly identical; they only differ in the way _Trix_ is included
* in addition to rendering an instance of the `TrixEditor` component:
  * the _App_ component sets 2 interval timers:
    * every 5 seconds:
      * a reference to the immutable Object representation of the current state of the document in the editor is stored in a class instance property
    * every 1 second:
      * this class instance property is saved to _state_
      * the `TrixEditor` component will update _only if_ `this.state.document` has changed
        * when this does occur, the position of the cursor in the editor jumps to the beginning
          * makes the demo(s) annoying to use, but does effectively prove that the feature is working
          * this methodology would never be used in a real app; it's entirely contrived

#### Legal:

* copyright: [Warren Bank](https://github.com/warren-bank)
* license: [GPL-2.0](https://www.gnu.org/licenses/old-licenses/gpl-2.0.txt)
