import React from 'react';
import FlashMessage from 'FlashMessage';

export default (props) => {
  return (
    <div>
      <FlashMessage/>
      {props.children}
    </div>
  )
}
