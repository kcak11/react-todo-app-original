import React from 'react';
import FlashMessage from 'components/FlashMessage';

export default (props) => {
  return (
    <div>
      <FlashMessage/>
      {props.children}
    </div>
  )
}
