import React, { useContext, useState } from 'react';
import { Image } from 'react-bootstrap'
import { LanguageContext } from './languageContext';
import { PortfolioItemModalComponent } from './PortfolioItemModalComponent';

export const PortfolioItemComponent = ({ index, proyecto }) => {
    const { isSpanish } = useContext(LanguageContext);
    const [showInfo, setShowInfo] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const modalId = "#modal" + proyecto.imagenes;
    const handleClose = () => {
        setShowModal(false);
    }

    return (
        <>
            <div className='containerImagen'
                onMouseOver={() => setShowInfo(true)}
                onMouseOut={() => setShowInfo(false)}
            >
                <Image
                    src={require(`../assets/screenshots/${proyecto.imagenes.toLowerCase()}1.png`)}
                    className={showInfo
                        ? 'filterClassName vistaPrevia animate__animated animate__fadeInDown'
                        : 'vistaPrevia animate__animated animate__fadeInDown'}
                    alt={isSpanish ? proyecto.tituloEsp : proyecto.tituloEng} />

                <h6 className={showInfo
                    ? 'visibleInfo tituloProyecto'
                    : 'tituloProyecto'}> {isSpanish ? proyecto.tituloEsp : proyecto.tituloEng} </h6>
                <button className={showInfo
                    ? 'visibleInfo verMasModal redButton'
                    : 'verMasModal redButton'} data-bs-toggle="modal" data-bs-target={modalId} onClick={() => setShowModal(true)}>{isSpanish ? "Ver este Proyecto" : "Watch this Project"} </button>
            </div>
            <PortfolioItemModalComponent
                key={index}
                proyecto={proyecto}
                showModal={showModal}
                handleClose={handleClose} />
        </>

    )
}