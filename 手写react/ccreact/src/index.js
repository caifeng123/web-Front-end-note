import React from './ccreact';
import ReactDOM from 'react-dom';

const jsx = <div id="1">
  <span name="2">2</span>
</div>

let a = React.createElement(
  'div',
  { id: '111' },
  React.createElement(
    'span',
    { name: '111' },
    'ccc'
  )
)

ReactDOM.render(
  <div>q</div>,
  document.getElementById('root')
);