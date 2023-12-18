import React from 'react';
import { SobreMiDescripcionComponent } from './SobreMiDescripcionComponent';
import { SobreMiDetalleComponent } from './SobreMiDetalleComponent';

export const SobreMiItemComponent = ({ index, item }) => {

    return (
        <>
            <SobreMiDescripcionComponent key={index} item={item} />
            <SobreMiDetalleComponent key={index} item={item} />
            <hr className='lineaHorizontal' />
        </>
    )
}
