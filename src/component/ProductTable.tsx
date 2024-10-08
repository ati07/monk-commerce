import {
    Text,
    useIndexResourceState,
    IndexTable,
    useBreakpoints,
    Card,
  } from '@shopify/polaris';
  import type {IndexTableRowProps, IndexTableProps} from '@shopify/polaris';
  import React, {Fragment} from 'react';
  
  export function ProductTable() {
    interface Product {
      id: string;
    //   position:number;
      title?: string;
      quantity?: number;
      price: string;
      variants?:any;
      size?: string;
      color?: string;
      image?: {};
      disabled?: boolean;
    }
  
    interface ProductRow extends Product {
      position: number;
    }
  
    interface ProductGroup {
      id: string;
      position: number;
      products: ProductRow[];
    }
  
    interface Groups {
      [key: string]: ProductGroup;
    }
  
    const rows: Product[] = [
      {
        id: '3411',
        quantity: 11,
        price: '$2,400',
        size: 'Small',
        color: 'Orange',
      },
      {
        id: '2562',
        quantity: 30,
        price: '$975',
        size: 'Medium',
        color: 'Orange',
      },
      {
        id: '4102',
        quantity: 27,
        price: '$2885',
        size: 'Large',
        color: 'Orange',
      },
      {
        id: '2564',
        quantity: 19,
        price: '$1,209',
        size: 'Small',
        color: 'Red',
        disabled: true,
      },
      {
        id: '2563',
        quantity: 22,
        price: '$1,400',
        size: 'Small',
        color: 'Green',
      },
    ];
  
    const columnHeadings = [
      {title: 'title', id: 'column-header--size'},
      {
        hidden: false,
        id: 'column-header--price',
        title: 'Price',
      },
    //   {
    //     alignment: 'end',
    //     id: 'column-header--quantity',
    //     title: 'Available',
    //   },
    ];
  
    const groupRowsByGroupKey = (
      groupKey: keyof Product,
      resolveId: (groupVal: string) => string,
    ) => {
      let position = -1;
      const groups: any = rows.reduce((groups: any, product: any) => {
        const groupVal: string = product[groupKey] as string;
        if (!groups[groupVal]) {
          position += 1;
  
          groups[groupVal] = {
            position,
            products: [],
            id: resolveId(groupVal),
          };
        }
        groups[groupVal].products.push({
          ...product,
          position: position + 1,
        });
  
        position += 1;
        return groups;
      }, {});
  
      return groups;
    };
  
    const resourceName = {
      singular: 'product',
      plural: 'products',
    };
  
    let data = [
        {
            "id": '77',
            "position":0,
            "title": "Fog Linen Chambray Towel - Beige Stripe",
            "variants": [
                {
                    "id": '1',
                    "product_id": 77,
                    "title": "XS / Silver",
                    "price": "49"
                },
                {
                    "id": 2,
                    "product_id": 77,
                    "title": "S / Silver",
                    "price": "49"
                },
                {
                    "id": 3,
                    "product_id": 77,
                    "title": "M / Silver",
                    "price": "49"
                }
            ],
            "image": {
                "id": 266,
                "product_id": 77,
                "src": "https://cdn11.bigcommerce.com/s-p1xcugzp89/products/77/images/266/foglinenbeigestripetowel1b.1647248662.386.513.jpg?c=1"
            }
        },
        {
            "id": '80',
            "position":1,
            "title": "Orbit Terrarium - Large",
            "variants": [
                {
                    "id": '64',
                    "product_id": 80,
                    "title": "Default Title",
                    "price": "109"
                }
            ],
            "image": {
                "id": 272,
                "product_id": 80,
                "src": "https://cdn11.bigcommerce.com/s-p1xcugzp89/products/80/images/272/roundterrariumlarge.1647248662.386.513.jpg?c=1"
            }
        }
    ]
    let groupData:any = {}
    data.map((i:any,j:number)=>{
        groupData[i.title] = i
    })
    const {selectedResources, allResourcesSelected, handleSelectionChange} =
      useIndexResourceState(rows as unknown as {[key: string]: unknown}[], {
        resourceFilter: ({disabled}) => !disabled,
      });
      
    const groupedProducts = groupRowsByGroupKey(
      'color',
      (color) => `color--${color.toLowerCase()}`,
    );
  
    
    
    
    console.log('groupedProducts',groupedProducts,groupData)
    // const rowMarkup = Object.keys(groupedProducts).map((color, index) => {
    //   const {products, position, id: productId} = groupedProducts[color];
    //   let selected: IndexTableRowProps['selected'] = false;
  
    //   const someProductsSelected = products.some(({id}:any) =>
    //     selectedResources.includes(id),
    //   );
  
    //   const allProductsSelected = products.every(({id}:any) =>
    //     selectedResources.includes(id),
    //   );
  
    //   if (allProductsSelected) {
    //     selected = true;
    //   } else if (someProductsSelected) {
    //     selected = 'indeterminate';
    //   }
  
    //   const selectableRows = rows.filter(({disabled}) => !disabled);
    //   const rowRange: IndexTableRowProps['selectionRange'] = [
    //     selectableRows.findIndex((row) => row.id === products[0].id),
    //     selectableRows.findIndex(
    //       (row) => row.id === products[products.length - 1].id,
    //     ),
    //   ];
  
    //   const disabled = products.every(({disabled}:any) => disabled);
  
    //   return (
    //     <Fragment key={productId}>
    //       <IndexTable.Row
    //         rowType="data"
    //         selectionRange={rowRange}
    //         id={`Parent-${index}`}
    //         position={position}
    //         selected={selected}
    //         disabled={disabled}
    //         accessibilityLabel={`Select all products which have color ${color}`}
    //       >
    //         <IndexTable.Cell scope="col" id={productId}>
    //           <Text as="span" fontWeight="semibold">
    //             {color}
    //           </Text>
    //         </IndexTable.Cell>
    //         <IndexTable.Cell />
    //         <IndexTable.Cell />
    //       </IndexTable.Row>
    //       {products.map(
    //         ({id, size, quantity, price, position, disabled}:any, rowIndex:number) => (
    //           <IndexTable.Row
    //             rowType="child"
    //             key={rowIndex}
    //             id={id}
    //             position={position}
    //             selected={selectedResources.includes(id)}
    //             disabled={disabled}
    //           >
    //             <IndexTable.Cell
    //               scope="row"
    //               headers={`${columnHeadings[0].id} ${productId}`}
    //             >
    //               <Text variant="bodyMd" as="span">
    //                 {size}
    //               </Text>
    //             </IndexTable.Cell>
    //             <IndexTable.Cell>
    //               <Text as="span" numeric>
    //                 {price}
    //               </Text>
    //             </IndexTable.Cell>
    //             <IndexTable.Cell>
    //               <Text as="span" alignment="end" numeric>
    //                 {quantity}
    //               </Text>
    //             </IndexTable.Cell>
    //           </IndexTable.Row>
    //         ),
    //       )}
    //     </Fragment>
    //   );
    // });
  
    // let selectedResources:any[] = []
    // let allResourcesSelected = false;
    const rw = Object.keys(groupData).map((title, index) => {
        const {variants, position, id: productId} = groupData[title];
        let selected: IndexTableRowProps['selected'] = false;
    
        const someProductsSelected = variants.some(({id}:any) =>
          selectedResources.includes(id),
        );
    
        const allProductsSelected = variants.every(({id}:any) =>
          selectedResources.includes(id),
        );
    
        if (allProductsSelected) {
          selected = true;
        } else if (someProductsSelected) {
          selected = 'indeterminate';
        }
    
        // const selectableRows = rows.filter(({disabled}) => !disabled);
        const selectableRows = variants.concat(data)

        const rowRange: IndexTableRowProps['selectionRange'] = [
          selectableRows.findIndex((row:any) => row.id === variants[0].id),
          selectableRows.findIndex(
            (row:any) => row.id === variants[variants.length - 1].id,
          ),
        ];
    
        const disabled = variants.every(({disabled}:any) => disabled);
    
        return (
          <Fragment key={productId}>
            <IndexTable.Row
              rowType="data"
              selectionRange={rowRange}
              id={`Parent-${index}`}
              position={position}
              selected={selected}
              disabled={disabled}
              accessibilityLabel={`Select all products which have color ${title}`}
            >
              <IndexTable.Cell scope="col" id={productId}>
                <Text as="span" fontWeight="semibold">
                  {title}
                </Text>
              </IndexTable.Cell>
              <IndexTable.Cell />
              <IndexTable.Cell />
            </IndexTable.Row>
            {variants.map(
              ({id, size, quantity, price, position, disabled}:any, rowIndex:number) => (
                <IndexTable.Row
                  rowType="child"
                  key={rowIndex}
                  id={id}
                  position={position}
                  selected={selectedResources.includes(id)}
                  disabled={disabled}
                >
                  <IndexTable.Cell
                    scope="row"
                    headers={`${columnHeadings[0].id} ${productId}`}
                  >
                    <Text variant="bodyMd" as="span">
                      {size}
                    </Text>
                  </IndexTable.Cell>
                  <IndexTable.Cell>
                    <Text as="span" numeric>
                      {price}
                    </Text>
                  </IndexTable.Cell>
                  <IndexTable.Cell>
                    <Text as="span" alignment="end" numeric>
                      {quantity}
                    </Text>
                  </IndexTable.Cell>
                </IndexTable.Row>
              ),
            )}
          </Fragment>
        );
      });
    // let handleSelectionChange=(e:any)=>{
    //     console.log('e',e)
    // }

    return (
      <Card>
        <IndexTable
          condensed={useBreakpoints().smDown}
          onSelectionChange={handleSelectionChange}
          selectedItemsCount={
            allResourcesSelected ? 'All' : selectedResources.length
          }
          resourceName={resourceName}
          itemCount={data.length}
          headings={columnHeadings as IndexTableProps['headings']}
        >
          {/* {rowMarkup} */}
          {rw}
        </IndexTable>
      </Card>
    );
  }