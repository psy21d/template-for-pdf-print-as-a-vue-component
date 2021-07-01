<template>
  <div class="view">
    <div class="toolbar">
      <Toolbar
        @print="pdftoserver"
        @settemplate="settemplate"
        @settable="settable"
        @copy="copy"
        :buttons="buttons"
      />
    </div>
      <div class="editor">
      <quill-editor
        v-model:value="state.content"
        :options="state.editorOption"
        :disabled="state.disabled"
        @blur="onEditorBlur($event)"
        @focus="onEditorFocus($event)"
        @ready="onEditorReady($event)"
        @change="onEditorChange($event)"
      />
    </div>
    <stylesComp />
  </div>
</template>

<script>
import { reactive } from 'vue'
import postToServer from "@/api/makepdf.js"
import { makeHtml } from "@/template/makeHtml.js"
import { css } from "@/components/quill/quill.core.css.js"
import Toolbar from "@/components/toolbar/Toolbar.vue"
import { quillEditor, Quill } from 'vue3-quill'
import { defineComponent } from 'vue';
import stylesComp from "@/components/quill/quill.core.css.vue";
var ls = require('local-storage');

//import customQuillModule from 'customQuillModule'
//Quill.register('modules/customQuillModule', customQuillModule)
// import QuillBetterTable from "quill-better-table";

// Quill.register(
//   {
//     "modules/better-table": QuillBetterTable
//   },
//   true
// );

// specify the fonts you would 
var fonts = ['Arial', 'Courier', 'Garamond', 'Tahoma', 'Times New Roman', 'Times Newer Roman', 'Verdana'];
// generate code friendly names
function getFontName(font) {
    return font.toLowerCase().replace(/\s/g, "-");
}
var fontNames = fonts.map(font => getFontName(font));

var Font = Quill.import('formats/font');
Font.whitelist = fontNames;
Quill.register(Font, true);

export default /*#__PURE__*/defineComponent({
  name: 'PdfEditor',
  
  components: {
    Toolbar,
    quillEditor,
    stylesComp,
  },

  props: {
    buttons: {
      type: Object
    }
  },

  setup(props) {
    // Overwrite what is being copied to the clipboard.
    document.addEventListener('copy', function(e) {
    // e.clipboardData is initially empty, but we can set it to the
      // data that we want copied onto the clipboard.
      e.clipboardData.setData('text/plain', ls('savedcontent'));
      e.clipboardData.setData('text/html', ls('savedcontent'));

      // This is necessary to prevent the current document selection from
      // being written to the clipboard.
      e.preventDefault();
      console.log(e)
      console.log(e.clipboardData.setData)
    });

    var toolbarOptions = [
        // ['table'],
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],

        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction

        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': fontNames }],
        [{ 'align': [] }],
        
        ['link', 'image'],

        ['clean'],                                        // remove formatting button
    ];

    // Add fonts to whitelist


    const state = reactive({
      content: ls('savedcontent'),
      _content: '',
      editorOption: {
        placeholder: 'core',
        modules: {
          toolbar: toolbarOptions,
          // table: true
          // [
            // custom toolbars options
            // will override the default configuration
          // ],
          // other moudle options here
          // otherMoudle: {}
        },
        // more options
      },
      disabled: false
    })

    let quill = reactive({})
    window.quill = quill

    const onEditorBlur = (/* quill */) => {
      // console.log('editor blur!', quill)
    }
    const onEditorFocus = (q) => {
      quill = q
      window.quill = quill
      // console.log('editor focus!', quill)
    }
    const onEditorReady = (/* quill */) => {
      // console.log('editor ready!', quill)
    }
    const onEditorChange = ({ /* quill */ html /* text */ }) => {
      // console.log('editor change!', quill, html, text)
      state._content = html;
      ls('savedcontent', html);
    }

    const pdftoserver = () => {
      let pages = document.getElementsByClassName('ql-editor')
      let renderedPages = pages && pages[0] && pages[0].outerHTML
      let html = makeHtml({
        body: renderedPages,
        style: css,
      })
      postToServer({html})
    }

    const settemplate = (tpl) => {
      var selection = quill.getSelection(true);
      quill.insertText(selection.index, '${' + tpl + '}');
    }

    const settable = () => {
      //quill.tableModule.insertTable(3, 3);
    }

    return { state, onEditorBlur, onEditorFocus, onEditorReady, onEditorChange, pdftoserver, settemplate, quill, settable }
  }
})
</script>

<style>
.ql-editor {
  font-family: 'times-newer-roman'
}
.toolbar {
  position: -webkit-sticky; /* Safari */
  width: 260px;
}
.view {
  display: flex;
  flex-direction: row;
}

.ql-snow .ql-picker.ql-font .ql-picker-label[data-value=arial]::before, 
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value=arial]::before {
  content: 'arial';
  font-family: 'arial';
}
        
.ql-font-arial {
  font-family: 'arial';
}

.ql-snow .ql-picker.ql-font .ql-picker-label[data-value=courier]::before, 
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value=courier]::before {
  content: 'courier';
  font-family: 'courier';
}
        
.ql-font-courier {
  font-family: 'courier';
}

.ql-snow .ql-picker.ql-font .ql-picker-label[data-value=garamond]::before, 
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value=garamond]::before {
  content: 'garamond';
  font-family: 'garamond';
}
        
.ql-font-garamond {
  font-family: 'garamond';
}

.ql-snow .ql-picker.ql-font .ql-picker-label[data-value=tahoma]::before, 
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value=tahoma]::before {
  content: 'tahoma';
  font-family: 'tahoma';
}
        
.ql-font-tahoma {
  font-family: 'tahoma';
}

ql-snow .ql-picker.ql-font .ql-picker-label[data-value=times-new-roman]::before, 
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value=times-new-roman]::before {
  content: 'times-new-roman';
  font-family: 'times-new-roman';
}
        
.ql-font-times-new-roman {
  font-family: 'times-new-roman';
}

ql-snow .ql-picker.ql-font .ql-picker-label[data-value=times-newer-roman]::before, 
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value=times-newer-roman]::before {
  content: 'times-newer-roman';
  font-family: 'times-newer-roman';
}
        
.ql-font-times-newer-roman {
  font-family: 'times-newer-roman';
}

ql-snow .ql-picker.ql-font .ql-picker-label[data-value=verdana]::before, 
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value=verdana]::before {
  content: 'verdana';
  font-family: 'verdana';
}
        
.ql-font-verdana {
  font-family: 'verdana';
}
</style>
