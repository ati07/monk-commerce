import { Icon } from "@shopify/polaris";
import { Draggable } from "react-beautiful-dnd";
import { EditIcon, MenuVerticalIcon } from '@shopify/polaris-icons';

export const Drag = ({ id, index,style, ...props }: any) => {
  return (
    <Draggable draggableId={`${id}`} index={index}>
      {(provided, snapshot: any) => {
        return (
          <div ref={provided.innerRef} {...provided.draggableProps} {...props} >
            <div className="drag-handle" {...provided.dragHandleProps}>
              {/* style={{display: 'flex',alignItems:'normal'}} */}
              
              <svg style={style} width="7" height="14" viewBox="0 0 7 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="1" cy="7" r="1" fill="black" fill-opacity="0.5" />
                <circle cx="6" cy="7" r="1" fill="black" fill-opacity="0.5" />
                <circle cx="1" cy="1" r="1" fill="black" fill-opacity="0.5" />
                <circle cx="6" cy="1" r="1" fill="black" fill-opacity="0.5" />
                <circle cx="1" cy="13" r="1" fill="black" fill-opacity="0.5" />
                <circle cx="6" cy="13" r="1" fill="black" fill-opacity="0.5" />
              </svg>

            </div>
            {/* <div className="drag-handle" {...provided.dragHandleProps}>
              Drag
            </div> */}
            {props.children}
          </div>
        );
      }}
    </Draggable>
  );
};
