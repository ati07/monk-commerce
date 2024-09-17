import { Box, LinearProgress } from '@mui/material';
import {Autocomplete, Icon} from '@shopify/polaris';
import {SearchIcon} from '@shopify/polaris-icons';
import {useState, useCallback, useMemo} from 'react';

function AutocompleteSearch({Loading,handleSearch}:any) {

  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const updateText = useCallback(
    (value: string) => {
      setInputValue(value);
      handleSearch(value)
      if (!loading) {
        setLoading(true);
      }
       
      setTimeout(() => {
        if (value === '') {
          setLoading(false);
          return;
        }
        setLoading(false);
      }, 300);
    },
    [loading],
  );

  const updateSelection = useCallback(
    (selected: string[]) => {
      
    },
    [options],
  );

  const textField = (
    <Autocomplete.TextField
      onChange={updateText}
      label=""
      value={inputValue}
      prefix={<Icon source={SearchIcon} tone="base" />}
      placeholder="Search"
      autoComplete="off"
      
    />
  );

  return (
    <div style={{height: '50px',width:'100%',position:'sticky',top:0}}>
      <Autocomplete
        options={[]}
        selected={selectedOptions}
        onSelect={updateSelection}
        loading={loading}
        textField={textField}
      />
      {Loading && <Box sx={{ width: '100%' }}>
      <LinearProgress style={{color:'gray'}}/>
    </Box>}
    </div>
  );
}

export default AutocompleteSearch