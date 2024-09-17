import React, { useCallback, useEffect, useRef, useState } from 'react'
import { BlockStack, Button } from '@shopify/polaris';
import { Frame, Modal } from '@shopify/polaris';
import { EditIcon } from '@shopify/polaris-icons';
import AutocompleteSearch from "./Searchbar.tsx";
import IndexTable from "./IndexTable.tsx";
import { Box, Divider, LinearProgress } from "@mui/material";
import axios from 'axios';
import { debounce } from 'lodash';
import CircularProgress from '@mui/material/CircularProgress';


function Model({ categories, setCategories, id }: any) {
  const [active, setActive] = useState(false);
  const handleChange = useCallback(() => setActive(!active), [active]);
  const activator = <Button icon={EditIcon} onClick={handleChange} ></Button>;
  const [selectedProduct, setSelectedProduct] = useState<any[]>([])
  const [data, setData] = useState<any[]>([])
  const [page, setPage] = useState(1); // Start from page 1
  const [loading, setLoading] = useState(false);
  const [callApi, setCallApi] = useState(false);
  const [hasMore, setHasMore] = useState(true); // Flag to check if more products are available
  const [searchQuery, setSearchQuery] = useState(''); // Default search query
  const observer = useRef();

  const handleAddChange = useCallback(() => {
    // console.log("categories", selectedProduct, categories);

    setActive(!active)
    // setCategories((prev:any)=>[...prev,...selectedProduct])
    let data = [...categories]
    const index = categories.findIndex((i: any) => i?.id === id);

    selectedProduct.map((i: any, j: number) => {

      if (j === 0) {
        data.splice(index + j, 1, i)
      }else {
      data.splice(index + j, 0, i)
      } 
      // let checkExt = data.filter((obj: any) => obj.id == i.id)
      // if (checkExt.length === 0) {
      //   if (j === 0) {
      //     data.splice(index + j, 1, i)
      //   }else {
      //   data.splice(index + j, 0, i)
      //   } 
      // } 
    
  
    })


  setCategories((prev: any) => [...data])
  setData([])
}, [active, categories, selectedProduct])

const callback = (d: any) => {
  let sp = [...selectedProduct]
  try {


    if (typeof d !== 'object') {
      const index = selectedProduct.findIndex((i: any) => i?.id == d);
      if (index !== -1) {
        // If the product exists, update it
        sp.splice(index, 1)
      }
    } else {
      // setSelectedProduct([...selectedProduct,d]);
      const index = selectedProduct.findIndex((i: any) => i?.id == d.id);
      // console.log('indx', index)
      if (index !== -1) {
        // If the product exists, update it
        sp[index] = d;
      } else {
        // If the product doesn't exist, add it
        sp.push(d);
      }
    }

  } catch (e) {
    console.log('Error:', e);
  }
  setSelectedProduct(sp); // Update the state with the new list
  // Update the state with the new list

}

// Debounced function to handle search
const handleSearch = useCallback(
  debounce((query: any) => {
    setData([]); // Clear previous products on new search
    setPage(1); // Reset to page 1
    setHasMore(true); // Reset the flag for new search
    setSearchQuery(query); // Set the search query
  }, 1000), // 500ms delay before hitting the API
  []
);
// Fetch products from the API
const fetchProducts = async (pageNum: number, query: string) => {
  setLoading(true);
  setCallApi(true)
  let url = 'https://stageapi.monkcommerce.app/task/products/search'
  try {
    const response = await axios.get(
      // `/api/task/products/search`,
      url,
      {
        params: {
          search: query,
          page: pageNum,
          limit: 10
        },
        headers: {
          'x-api-key': '72njgfa948d9aS7gs5',
        }
      }
    );

    const newProducts = response.data || []; // Assuming products come in this format
    setData((prevProducts:any) => {
    // Remove objects from array1 that exist in array2 based on the 'id' property
    const filteredArray = [...prevProducts, ...newProducts].filter(
      item1 => !categories.some((item2:any) => item1.id == item2.id)
    );
      return filteredArray
    }
    );

    // If no new products are loaded, we have reached the end
    if (newProducts.length === 0) {
      setHasMore(false);
    }
  } catch (error) {
    console.error('Error fetching products:', error);
  } finally {
    setLoading(false);
  }
};

// UseEffect to load initial products or on search query/page change
useEffect(() => {
  (async () => await fetchProducts(page, searchQuery))()
}, [page, searchQuery]);

// Load more products when the last product is in view
const lastProductElementRef = (node: any) => {
  // console.log('node',node);
  if (loading) return;
  if (observer.current) (observer.current as any)?.disconnect();

  (observer as any).current = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && hasMore) {
      setPage((prevPage) => prevPage + 1); // Load the next page when reaching the end
    }
  });

  if (node) (observer as any)?.current.observe(node);
};

return (
  <Frame>
    <Modal
      activator={activator}
      open={active}
      onClose={handleChange}
      title="Select Products"

    >
      <div style={{ display: 'flex', height: '50px', zIndex: 10000, background: 'rgb(255 255 255)', position: 'sticky', top: 0, padding: '10px' }}>
        <AutocompleteSearch handleSearch={handleSearch} Loading={loading} />
        
      </div>
      <Modal.Section>


        <BlockStack>
          <Divider orientation="horizontal" style={{ marginTop: '10px', width: '105%', marginLeft: '-15px' }} />
          {data.length > 0 && data.map((i: any, j: number) => <div key={j} ref={lastProductElementRef} ><IndexTable key={j} ref={lastProductElementRef} loading={loading} data={i} callback={callback} /><div key={j} ref={lastProductElementRef} ></div></div>)}
          
        </BlockStack>

        {/* <div style={{}}> */}

        <div style={{ display: 'flex', justifyContent: 'flex-end', height: '50px', background: '#fff', position: 'sticky', bottom: 0, width: '100%', alignItems: 'center', marginTop: '16px' }}>
          <button className='cancel' onClick={handleChange}>Cancel</button>
          <button className='add' onClick={handleAddChange}>Add</button>

        </div>
        {/* </div> */}
      </Modal.Section>
    </Modal>
  </Frame>
)
}

export default Model