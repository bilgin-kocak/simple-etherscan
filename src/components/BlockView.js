import React from 'react';
import Block from './Block';

function BlockView(props) {
  return (
    <div className="row">
      {props.blockList.map((block) => (
        <div key={block.number} className="col-3">
          <Block block={block}></Block>
        </div>
      ))}
    </div>
  );
}

export default BlockView;
