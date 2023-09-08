import { useState, useEffect } from 'react';

function SliderImageProducts({ images }) {
    const [imageOne, setImageOne] = useState();
    useEffect(() => {
        if (images) {
            setImageOne(images[0].urlImage);
        }
    }, [images]);
    return (
        <div id="carouselExampleIndicators" className="carousel" data-ride="carousel">
            <div className="">
                <div className="carousel-item active ">
                    <img
                        className="d-block max-md:h-[200px] md:h-[400px] "
                        src={imageOne !== undefined ? `${imageOne}` : ''}
                        alt=""
                    ></img>
                </div>
                {images?.map((product) => {
                    return (
                        <>
                            {product.id !== images[0].id && (
                                <div key={product?.key} className={`carousel-item`}>
                                    <img className="d-block w-100" src={`${product?.image}`} alt=""></img>
                                </div>
                            )}
                        </>
                    );
                })}
            </div>
            <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon css-icon" aria-hidden="true"></span>
            </a>
            <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                <span className="carousel-control-next-icon css-icon" aria-hidden="true"></span>
            </a>
        </div>
    );
}
export default SliderImageProducts;
