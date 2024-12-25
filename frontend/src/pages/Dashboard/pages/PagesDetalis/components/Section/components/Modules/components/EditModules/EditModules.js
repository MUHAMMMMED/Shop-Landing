import React from 'react';
import { TbEdit } from "react-icons/tb";
import { IconButton } from '../../ModulesStyles';
export default function EditModules() {
    return (
        <>

            {/* <Link to={`/section/${1}`}> */}
            <IconButton aria-label="Edit" data-tooltip="Edit">
                <TbEdit />
            </IconButton>


            {/* </Link> */}

        </>
    )
}
