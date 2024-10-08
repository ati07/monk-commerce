import { Droppable } from "react-beautiful-dnd";

export const Drop = ({ id, type, ...props }:any) => {
  return (
    <Droppable droppableId={`${id}`} type={type}>
      {(provided) => {
        return (
          <div ref={provided.innerRef} {...provided.droppableProps} {...props}>
            {props.children}
            {provided.placeholder}
          </div>
        );
      }}
    </Droppable>
  );
};
