function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map(child => typeof child === 'object' ? child : createTextVDom(child))
    }
  }
}
function createTextVDom(text) {
  return {
    type: "text",
    props: {
      nodeValue: text,
      children: []
    }
  }
}

function render(vDom,rDom){
  if(typeof vDom !=='object'){
    dom=document.createTextNode(vDom)
  }else{
    dom = document.createElement(vDom.type)
  }
  if(vDom.props){
    Object.keys(vDom.props).forEach(x=>{
      if(x!='children') dom[x]=vDom[x]
    })
  }
  if(vDom.children){
    
  }
}

export default {
  createElement,
  render
}