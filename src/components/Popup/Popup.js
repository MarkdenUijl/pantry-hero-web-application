import React from "react";

// COMPONENTS
import Button from "../Button/Button";

// STYLES
import "./Popup.css"

function Popup ({ children, onConfirm, onCancel }) {

    return (
        <div className="popup-container">
            <div className="popup">

                <div className="content">{ children }</div>

                <div className="buttons">
                    <Button
                        textValue="Cancel"
                        type="button"
                        clickHandler={ onCancel }
                        filledStatus={ false }
                    />
                    <Button
                        textValue="Confirm"
                        type="button"
                        clickHandler={ onConfirm }
                        filledStatus={ true }
                    />
                </div>
            </div>
        </div>
    );
}

export default Popup;