import { useState } from "react";
import { AppAction, AppState } from "../store/StateReducer";
import { useBaseContext } from "../store/use-base-context";
import { Attributes } from "../types"

interface ClassProps {
    className: string;
    requirements: Attributes;
}

export const Class = ({className, requirements}: ClassProps) => {
    const { state } = useBaseContext<
        AppState,
        AppAction
      >();
    
    const [open, setOpen] = useState<boolean>(false);
    
    const {selectedAttribute} = state;

    const isValid = selectedAttribute && selectedAttribute.value >= requirements[selectedAttribute.attribute];
    
      
    return (
        <div style={{display: 'flex', flexDirection: 'column', gap: '4px'}}>
            <p style={{color: !isValid ? 'red' : 'white', cursor: 'pointer'}} onClick={() => setOpen(true)}>{className}</p>
            {open && <div style={{border: '1px solid black', display: 'flex', flexDirection: 'column', gap: '2px'}}>
                    {Object.keys(requirements).map(requirement => (
                        <p>{requirement} - {requirements[requirement]}</p>
                    ))}
                    <button onClick={() => setOpen(false)}>Close Requirements</button>
                </div>}
        </div>
    )
}