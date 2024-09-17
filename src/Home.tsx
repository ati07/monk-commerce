import React, { useState } from "react";
import { DragAndDrop, Drag, Drop } from "./drag-drop";
import { reorder } from "./helper.tsx";
import PopoverWithActionListExample from './component/SelectComponent.tsx'
import TextFieldComponent from './component/TextFieldComponent.tsx';
import CloseIcon from '@mui/icons-material/Close';
import Model from "./component/Model.tsx";
import { Button } from "@shopify/polaris";
import Header from "./component/Header.tsx";

export const NestedListComponent = () => {
  const [visibleDiscount, setVisible] = useState<any[]>([]);
  const [hideID, setHideId] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([
    {
      id: new Date().getTime(),
      title: "Select Product",
      variants: []
    }
    
  ]);

  const handleDragEnd = (result: any) => {
    const { type, source, destination } = result;
    if (!destination) return;

    const sourceCategoryId = source.droppableId;
    const destinationCategoryId = destination.droppableId;

    // Reordering items
    if (type === "droppable-item") {
      // If drag and dropping within the same category
      if (sourceCategoryId == destinationCategoryId) {
        const updatedOrder = reorder(
          categories.find((category: any) => category.id == sourceCategoryId).variants,
          source.index,
          destination.index
        );
        const updatedCategories = categories.map((category: any) =>
          category.id != sourceCategoryId
            ? category
            : { ...category, variants: updatedOrder }
        );

        setCategories(updatedCategories);
      }
    }

    // Reordering categories
    if (type == "droppable-category") {
      const updatedCategories = reorder(
        categories,
        source.index,
        destination.index
      );

      setCategories(updatedCategories);
    }
  };

  const onDiscount = (id: any) => {
    setVisible([...visibleDiscount, id])
  }

  const deleteVariants = (id: any) => {
    // Remove variants with id "abc"
    const updatedData = categories.map((category: any) => ({
      ...category, // Copy the category object
      variants: category.variants.filter((variant: any) => variant.id !== id) // Filter out variant with id "abc"
    }));
    setCategories(updatedData)
  }
  const deleteProduct = (id: string) => {
    // Remove the object with id "q101"
    const updatedData = categories.filter((category: any) => category.id !== id);
    setCategories(updatedData)
  }
  const addproduct = () => {
    setCategories([...categories, {
      id: new Date().getTime(),
      title: "Select Product",
      variants: []
    }])
  }
  
  const onHide = (id: any) => {
    setHideId([...hideID, id])
    
  }
  const onRemoveHide = (id: any) => {
    if (hideID.includes(id)) {

      let ids = [...hideID]

      let index = hideID.indexOf(id)
      ids.splice(index, 1)
      setHideId(ids)
    }

  }
  return (
    <>
    <Header/>
    <div style={{
      display: 'flex', flexDirection: 'column', height: 'auto',minHeight:'600px',
      
      width: '100%',
      paddingLeft: '400px',
      paddingRight: '400px',
      paddingTop: '0px',
      paddingBottom: '30px'

    }}>
      
      <div style={{ display: 'flex', marginBottom: '30px', marginLeft: '40px', fontSize: '15px', fontWeight: 500 }}>
        Add products
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-around', fontSize: '12px', fontWeight: 500 }}>
        <div>Product</div>
        <div>Discount</div>
      </div>
      <DragAndDrop onDragEnd={handleDragEnd}>
        <Drop id="droppable" type="droppable-category">
          {categories.map((category: any, categoryIndex: number) => {
            return (
              <Drag
                className="draggable-category"
                key={category.id}
                id={category.id}
                index={categoryIndex}
                style={{ marginTop: '10px', }}
              >
                <div style={{ marginTop: '6px', fontSize: '15px', color: '#000000CC', fontWeight: 400, }}>{categoryIndex + 1}</div>
                <div className="category-container">

                  <div style={{ width: '100%', display: 'flex' }}>
                    <div className="item" style={{ width: '54%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingLeft: '10px' }}>
                      <h2 className="typography">{category.title}</h2>
                      <Model categories={categories} setCategories={setCategories} id={category.id} />
                    </div>
                    <div style={{ width: '40%', height: '32px', marginLeft: '10px', color: '#fff' }}>
                      {visibleDiscount.includes(category.id)
                        ?
                        <div style={{ display: 'flex', width: '100%' }}>
                          <TextFieldComponent style={{
                            width: '60px',
                            height: '31px',
                            border: '1px',
                            marginRight: '8px',
                            paddingLeft: '8px',
                            fontSize: '15px',
                            boxShadow: '0px 2px 4px 0px #0000001A'
                          }} />
                          <PopoverWithActionListExample />
                        </div>
                        : <button onClick={() => onDiscount(category.id)} style={{ width: '100%', height: '32px', borderRadius: '4px', border: '2px', color: '#fff', background: '#008060', }}>Add Discount</button>}

                    </div>
                    <div style={{ width: '10%', justifyContent: 'center', display: 'flex' }}>
                      {category.variants.length > 0 && <CloseIcon onClick={() => deleteProduct(category.id)} style={{ color: '#00000066' }} />}
                    </div>

                  </div>
                  {category.variants.length > 0 && <div style={{ display: 'flex', alignItems: "center", justifyContent: 'flex-end', paddingRight: '20px', marginTop: '10px' }}>
                    {hideID.includes(category.id)? <><Button variant="plain" onClick={() =>onRemoveHide(category.id)}> Show Variants</Button><svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1.75781 7.75H0.304688L4.28125 0.875H5.39062L9.36719 7.75H7.91406L4.89844 2.21875H4.77344L1.75781 7.75Z" fill="#006EFF" />
                    </svg></>
                      :
                      <>
                        <Button variant="plain" onClick={() =>  onHide(category.id) }> Hide Variants</Button><svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8.24219 0.25L9.69531 0.25L5.71875 7.125H4.60937L0.632812 0.25L2.08594 0.25L5.10156 5.78125H5.22656L8.24219 0.25Z" fill="#006EFF" />
                        </svg></>
                    }
                  </div>}
                  {!hideID.includes(category.id) && <Drop key={category.id} id={category.id} type="droppable-item">
                    {category.variants.map((item: any, index: number) => {
                      return (
                        <Drag
                          className="draggable"
                          key={item.id}
                          id={item.id}
                          index={index}
                          style={{ marginRight: '15px' }}
                        >
                          <div className="item-child">{item.title}</div>
                          <div style={{ width: '174px', height: '32px', marginLeft: '15px', color: '#fff' }}>



                            {visibleDiscount.includes(item.id)
                              ?
                              <div className='child' style={{ display: 'flex', width: '100%' }}>
                                <TextFieldComponent style={{
                                  width: '60px',
                                  height: '31px',
                                  border: '1px',
                                  marginRight: '8px',
                                  paddingLeft: '8px',
                                  fontSize: '15px',
                                  borderRadius: '30px',
                                  boxShadow: '0px 2px 4px 0px #0000001A'
                                }} />
                                <PopoverWithActionListExample />
                              </div>
                              : <button onClick={() => onDiscount(item.id)} style={{ width: '174px', height: '32px', gap: '4px', borderRadius: '4px', border: '2px', color: '#fff', background: '#008060' }}>Add Discount</button>}
                          </div>
                          <div style={{ position: 'relative', left: '7px' }}>
                            {category.variants.length > 1 && <CloseIcon onClick={() => deleteVariants(item.id)} style={{ color: '#00000066' }} />}
                          </div>

                        </Drag>
                      );
                    })}
                  </Drop>}
                </div>
              </Drag>
            );
          })}
        </Drop>
      </DragAndDrop>

      <div style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: '60px' }}>
        <button className="Add_product" onClick={addproduct}>
          Add Product
        </button>
      </div>
    </div>

    </>
    
  );
};
