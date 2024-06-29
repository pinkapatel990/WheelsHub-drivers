import React from 'react'
// import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
// import "./index.css"

export default function Notification() {
    const [showModal, setShowModal] = useState(false);

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    return (
        <>
            <div>
                <button type="button" className="btn btn-primary" onClick={handleShow}>
                    Launch demo modal
                </button>

                <div className={`modal fade ${showModal ? 'show' : ''}`} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden={!showModal}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                                <button type="button" className="close" onClick={handleClose} aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                ...
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleClose}>Close</button>
                                <button type="button" className="btn btn-primary">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
