import React, { useContext } from 'react';
import { Image, Modal, Carousel, Button, Form } from 'react-bootstrap'
import { WordleImages, ViajesImages, FacultadImages, HelplabImages, CAHImages, QWQImages, ArgImages, DarioVillarImages, SyzygyImages, NextPlanImages } from '../assets/screenshots';
import { LanguageContext } from './languageContext';

export const PortfolioItemModalComponent = ({ index, imagenes, titulo, fechaRealizacion, duracion, descripcion, mejoras, tecnologiasUtilizadas, pageLink, gitHubLink, showModal, handleClose }) => {
    const { isSpanish } = useContext(LanguageContext);
    const images = {
        Wordle: WordleImages,
        Viajes: ViajesImages,
        Facultad: FacultadImages,
        Helplab: HelplabImages,
        CAH: CAHImages,
        QWQ: QWQImages,
        Arg: ArgImages,
        DarioVillar: DarioVillarImages,
        Syzygy: SyzygyImages,
        NextPlan: NextPlanImages
    }

    return (
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title> {titulo} </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Carousel>
                    {images[`${imagenes}`].map((x, i) => {
                        return (<Carousel.Item>
                            <Image
                                className="d-block w-100"
                                src={x.src}
                                alt={'Slide ' + (i + 1)}
                            />
                        </Carousel.Item>)
                    }
                    )}
                </Carousel>
                <div id="infoSyzygy">
                    <p><i class='fas portfolioIcon fa-calendar'></i> {fechaRealizacion} <i class='fas portfolioIcon fa-clock'></i> {duracion} </p>
                    <p><i class='fas portfolioIcon fa-list'></i> {descripcion}
                    </p>
                    {(mejoras && mejoras !== '') && (<p><i class='fas portfolioIcon fa-long-arrow-alt-right'></i><b>{isSpanish ? "Proyecto: " : "Project: "} </b> {mejoras} </p>)}
                    <p><i class='fas portfolioIcon fa-rocket'></i><b>{isSpanish ? "Tecnologías utilizadas: " : "Used technologies: "} </b> </p>
                    <h4> {tecnologiasUtilizadas.length > 0 && tecnologiasUtilizadas.map((tech, index) => {
                        return (index !== 0 ? ' - ' + tech : tech);
                    })} </h4>
                    {pageLink && <Form method='get' action={pageLink}>
                        <Button variant='outline-primary' className='w-100 py-2 mb-2 rounded-4' type='submit'>
                            <i className='fas portfolioIcon fa-wifi'></i>
                            {isSpanish ? 'Ir a la Página' : 'Go to Page'}
                        </Button>
                    </Form>}
                    {gitHubLink && <Form method='get' action={gitHubLink}>
                        <Button variant='outline-secondary' className='w-100 py-2 mb-2 rounded-4' type='submit'>
                            <i className='fab portfolioIcon fa-github'></i>
                            {isSpanish ? 'Ver en GitHub' : 'Watch on GitHub'}
                        </Button>
                    </Form>}
                    {(!pageLink && !gitHubLink) && <Form method='get' action={gitHubLink}>
                        <Button variant='outline-primary' className='w-100 py-2 mb-2 rounded-4' type='submit'>
                            <i className='fas portfolioIcon fa-wifi'></i>
                            {isSpanish ? 'Volver' : 'Go Back'}
                        </Button>
                    </Form>}
                </div>
            </Modal.Body>
        </Modal>
    )
}