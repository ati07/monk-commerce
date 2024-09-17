import {Select} from '@shopify/polaris';
import {useState, useCallback} from 'react';

function SelectComponent() {
  const [selected, setSelected] = useState('% Off');

  // const handleSelectChange = useCallback(
  //   (value: string) => setSelected(value),
  //   [selected],
  // );
  const handleSelectChange = (value: string) => {
    setSelected(value)
    console.log(`selected:`, value)
  }
  const options = [
    {label: '% Off', value: '% Off'},
    {label: 'Flat Off', value: 'Flat Off'}
  ];

  return (
    <Select
      label=""
      options={options}
      onChange={handleSelectChange}
      value={selected}
      requiredIndicator={false}
    />
  );
}
export default SelectComponent