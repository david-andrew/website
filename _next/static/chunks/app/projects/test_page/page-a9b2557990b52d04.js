(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[9883],{9257:function(t,e,r){Promise.resolve().then(r.bind(r,83908))},77705:function(t,e,r){"use strict";r.r(e),r.d(e,{Code:function(){return g},CodeBlock:function(){return f},CodeEditor:function(){return h}});var n=r(57437),o=r(35934),i=r(57518),a=r(6374),s=r(34155),l=r(43490),c=r(98116),u=r(2265);o.Z.registerLanguage("bash",i.Z),o.Z.registerLanguage("python",a.Z);let d={hybrid:s.Z,railscasts:l.Z},f=t=>{let{language:e,style:r,code:i}=t;return(0,n.jsx)("div",{className:"rounded-md overflow-hidden mb-6",children:(0,n.jsx)(o.Z,{language:e,style:r?d[r]:l.Z,children:i})})},g=t=>{let{language:e,style:r,code:i}=t,a=r?d[r]:l.Z,s=a.hljs.background;return(0,n.jsx)("span",{className:"rounded-md",children:(0,n.jsx)(o.Z,{language:e,style:a,customStyle:{display:"inline",padding:"0.125rem 0.25rem",margin:"0 0.125rem",backgroundColor:s,border:"1px solid #444444",borderRadius:"inherit"},children:i})})},h=t=>{let{text:e,setText:r,theme:o,language:i,onFocus:a,className:s}=t,l=(0,u.useRef)(null),{setContainer:d}=(0,c.Uq)({container:l.current,theme:o,value:e,extensions:[i],onChange:t=>{r(t)},basicSetup:{lineNumbers:!1,foldGutter:!1,drawSelection:!1,allowMultipleSelections:!1,highlightActiveLine:!0,highlightSelectionMatches:!1,dropCursor:!1,indentOnInput:!1,rectangularSelection:!1,tabSize:4,closeBracketsKeymap:!1,searchKeymap:!1,foldKeymap:!1,completionKeymap:!1,lintKeymap:!1,autocompletion:!1}});return(0,u.useEffect)(()=>{l.current&&d(l.current)}),(0,n.jsx)("div",{className:s,onFocus:a,children:(0,n.jsx)("div",{ref:l})})}},25589:function(t,e,r){"use strict";r.d(e,{y:function(){return f},E:function(){return g}});var n=r(30684),o=r(48262),i=r(35209);let a=0,s=t=>{if(t.startsWith("\\u")||t.startsWith("\\U")||t.startsWith("\\x")||t.startsWith("\\X")){let e=2;for(;e<t.length&&/[0-9a-fA-F]/.test(t[e]);)e++;return{type:"number",start:0,end:e}}},l=t=>{if(t.startsWith("\\"))return"n"==t[1]||"r"==t[1]||"t"==t[1]||"v"==t[1]||"b"==t[1]||"f"==t[1]||t[1],{type:"escape",start:0,end:2}},c={'"':'"',"'":"'","{":"}"},u=[t=>{let e=0;if(t.startsWith("/{")&&(a+=1,e=2),0!=a){for(;a>0&&e<t.length;){if(t.startsWith("/{",e)){a++,e+=2;continue}if(t.startsWith("}/",e)){a--,e+=2;continue}e++}return{type:"comment",start:0,end:e}}},t=>{if(t.startsWith("//")){let e=2;for(;e<t.length&&"\n"!=t[e];)e++;return{type:"comment",start:0,end:e}}},t=>t.startsWith("ϵ")?{type:"null",start:0,end:1}:t.startsWith("\\e")||t.startsWith("''")||t.startsWith('""')||t.startsWith("{}")?{type:"null",start:0,end:2}:void 0,t=>t.startsWith("\\u")||t.startsWith("\\U")||t.startsWith("\\x")||t.startsWith("\\X")?{type:"unit",start:0,end:2}:t.startsWith("V")||t.startsWith("U")||t.startsWith("ξ")?{type:"unit",start:0,end:1}:void 0,s,t=>{let e=0;for(;e<t.length&&/[0-9]/.test(t[e]);)e++;if(e>0)return{type:"number",start:0,end:e}},t=>{if(t.startsWith("#")){let e=1;for(;e<t.length&&/[a-zA-Z0-9_]/.test(t[e]);)e++;return{type:"tagName",start:0,end:e}}},t=>{if(t.startsWith("[")){let e=[{type:"bracket",start:0,end:1}],r=1;for(;r<t.length;){let n;if("\n"==t[r]||" "==t[r]){r++;continue}if((n=s(t.slice(r)))||(n=l(t.slice(r)))){n.start+=r,n.end+=r,e.push(n),r=n.end;continue}if("-"==t[r]){e.push({type:"operator",start:r,end:r+1}),r++;continue}if("["==t[r]&&(e.push({type:"invalid",start:r,end:r+1}),r++),"]"==t[r])return e.push({type:"bracket",start:r,end:r+1}),e;e.push({type:"literal",start:r,end:r+1}),r++}}},t=>{let e;if(t.length<=2)return;let r=t[0];if(!('"'==r||"'"==r||"{"==r))return;let n=c[r],o=1,i=[{type:"literal",start:0,end:1}];for(;o<t.length;){if((e=s(t.slice(o)))||(e=l(t.slice(o)))){e.start+=o,e.end+=o,i.push(e),o=e.end;continue}if(t[o]==n)return[...i,{type:"literal",start:o,end:o+1}];i.push({type:"literal",start:o,end:o+1}),o++}},t=>{if(t.startsWith("(")||t.startsWith(")"))return{type:"paren",start:0,end:1}},t=>{if(".*+?~".includes(t[0]))return{type:"logicOperator",start:0,end:1}},t=>{if("=|-/>".includes(t[0]))return{type:"operator",start:0,end:1}},t=>{if(";"==t[0])return{type:"punctuation",start:0,end:1}}],d=t=>{let e=[],r=0;for(;r<t.length;){let n=u.reduce((e,n)=>e||n(t.slice(r)),void 0);n?Array.isArray(n)?(e.push(...n.map(t=>(t.start+=r,t.end+=r,t))),r=n[n.length-1].end):(n.start+=r,n.end+=r,e.push(n),r=n.end):(e.push({type:"invalid",start:r,end:r+1}),r++)}return e},f=()=>new n.ri(n.il.define({token:(t,e)=>{if(e.index>=e.tokens.length&&(e.tokens=d(t.string),e.index=0),e.index<e.tokens.length){let r=e.tokens[e.index++];return t.pos=r.end,r.type}return t.skipToEnd(),null},startState:()=>({tokens:[],index:0})})),g=(t=>{var{theme:e,settings:r={},styles:i=[]}=t,a={".cm-gutters":{}},s={};r.background&&(s.backgroundColor=r.background),r.backgroundImage&&(s.backgroundImage=r.backgroundImage),r.foreground&&(s.color=r.foreground),(r.background||r.foreground)&&(a["&"]=s),r.fontFamily&&(a["&.cm-editor .cm-scroller"]={fontFamily:r.fontFamily}),r.gutterBackground&&(a[".cm-gutters"].backgroundColor=r.gutterBackground),r.gutterForeground&&(a[".cm-gutters"].color=r.gutterForeground),r.gutterBorder&&(a[".cm-gutters"].borderRightColor=r.gutterBorder),r.caret&&(a[".cm-content"]={caretColor:r.caret},a[".cm-cursor, .cm-dropCursor"]={borderLeftColor:r.caret});var l={};r.gutterActiveForeground&&(l.color=r.gutterActiveForeground),r.lineHighlight&&(a[".cm-activeLine"]={backgroundColor:r.lineHighlight},l.backgroundColor=r.lineHighlight),a[".cm-activeLineGutter"]=l,r.selection&&(a["&.cm-focused .cm-selectionBackground, & .cm-line::selection, & .cm-selectionLayer .cm-selectionBackground, .cm-content ::selection"]={background:r.selection+" !important"}),r.selectionMatch&&(a["& .cm-selectionMatch"]={backgroundColor:r.selectionMatch});var c=o.tk.theme(a,{dark:"dark"===e}),u=n.Qf.define(i);return[c,(0,n.nF)(u)]})({theme:"light",settings:{background:"#232323",caret:"#AEAFAD",selection:"#356282",selectionMatch:"#00ff00",lineHighlight:"#333333"},styles:[{tag:i.pJ.comment,color:"#787b80"},{tag:i.pJ.literal,color:"#ce9178"},{tag:i.pJ.bracket,color:"#179fff"},{tag:i.pJ.escape,color:"#d7ba7d"},{tag:i.pJ.number,color:"#b5cea8"},{tag:i.pJ.tagName,color:"#9cdcfe"},{tag:i.pJ.null,color:"#00ff00"},{tag:i.pJ.unit,color:"#ff00ff"},{tag:i.pJ.paren,color:"#ffd700"},{tag:i.pJ.operator,color:"#ffffff"},{tag:i.pJ.punctuation,color:"#ffffff"},{tag:i.pJ.logicOperator,color:"#d44c4c"},{tag:i.pJ.invalid,color:"#ff0000"}]})},83908:function(t,e,r){"use strict";r.r(e);var n=r(57437),o=r(2265),i=r(77705),a=r(25589);e.default=()=>{let[t,e]=(0,o.useState)("");return(0,n.jsx)(n.Fragment,{children:(0,n.jsx)("div",{children:(0,n.jsx)(i.CodeEditor,{theme:a.E,text:t,setText:e,language:(0,a.y)()})})})}},30622:function(t,e,r){"use strict";/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var n=r(2265),o=Symbol.for("react.element"),i=Symbol.for("react.fragment"),a=Object.prototype.hasOwnProperty,s=n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,l={key:!0,ref:!0,__self:!0,__source:!0};function c(t,e,r){var n,i={},c=null,u=null;for(n in void 0!==r&&(c=""+r),void 0!==e.key&&(c=""+e.key),void 0!==e.ref&&(u=e.ref),e)a.call(e,n)&&!l.hasOwnProperty(n)&&(i[n]=e[n]);if(t&&t.defaultProps)for(n in e=t.defaultProps)void 0===i[n]&&(i[n]=e[n]);return{$$typeof:o,type:t,key:c,ref:u,props:i,_owner:s.current}}e.Fragment=i,e.jsx=c,e.jsxs=c},57437:function(t,e,r){"use strict";t.exports=r(30622)}},function(t){t.O(0,[6401,504,2971,596,1744],function(){return t(t.s=9257)}),_N_E=t.O()}]);