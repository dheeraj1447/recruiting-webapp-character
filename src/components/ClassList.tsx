import { CLASS_LIST } from "../consts"
import { Class } from "./Class";

export const ClassList = () => {
    return (
    <>
        {Object.keys(CLASS_LIST).map(cls => {
            return (
                <Class key={cls} className={cls} requirements={CLASS_LIST[cls]} />
            );
        })}
    </>
    )
}