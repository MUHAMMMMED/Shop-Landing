import React from 'react';

export default function Description({ details }) {
    return (
        <div>
            <div dangerouslySetInnerHTML={{ __html: details }} />
        </div>
    );
}