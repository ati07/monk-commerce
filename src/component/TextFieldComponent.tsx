import {TextField} from '@shopify/polaris';
import {useState, useCallback} from 'react';

function TextFieldComponent({style}:any) {
  const [value, setValue] = useState('20');

  const handleChange = (e: any) => setValue(e.target.value)
    
  return (
    <input
      // label=""
      value={value}
      onChange={(newValue:any)=>handleChange(newValue)}
      autoComplete="off"
      style={style}
      
    />
  );
}

export default TextFieldComponent