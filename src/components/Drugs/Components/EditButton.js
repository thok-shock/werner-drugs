import React from 'react'
import { PencilSquare } from 'react-bootstrap-icons';

export default function EditButton(props) {
    
    if (props.user) {
            return <PencilSquare
              className="cursor-hover"
              role="button"
              onClick={() => {
                props.setEditMode(true);
              }}
            />         
    } else {
        return <></>
    }
}