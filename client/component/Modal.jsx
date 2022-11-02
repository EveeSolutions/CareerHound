import { produceWithPatches } from "immer";
import React from "react";
import JobCardForm from "./JobCardForm";

function Modal (props) {
    if (!props.show) {
        return null
    }
    return (
      <div className="modal"> 
        <div className="modal-content">
            <div className="modal-header">
                
            <button onClick={props.onClose} className="button">Close</button>
                {/* <h4 className="nodal-title">Modal Title</h4> */}
            </div>
            <div className="modal-body">
                <JobCardForm />
            </div>
            <div className="modal-footer">
            </div>   
        </div>
      </div>
    )
}

export default Modal;