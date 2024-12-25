import React from 'react';
import { IoMdAdd } from "react-icons/io";
import { Link } from 'react-router-dom';
import { IconButton } from '../../SectionStyles';

export default function AddModule({ pageId, sectionId }) {

    return (
        <>
            <Link to={`/modules/${pageId}/${sectionId}`}>
                <IconButton aria-label="Add module" data-tooltip="Add module"><IoMdAdd /></IconButton>
            </Link>
        </>
    )
}
