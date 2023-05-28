import { useState, useEffect } from 'react';
import './SliderImageProducts.css';

function SliderImageProducts({ images }) {
    const [imageOne, setImageOne] = useState();
    useEffect(() => {
        if (images) {
            setImageOne(images[0].urlImage);
        }
    }, [images]);
    return (
        <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <img
                        class="d-block w-100"
                        // src={imageOne !== undefined ? `/productImage/${imageOne}` : ''}
                        src={imageOne !== undefined ? `${imageOne}` : ''}
                        alt=""
                    ></img>
                </div>
                {images?.map((product) => {
                    return (
                        <>
                            {product.id !== images[0].id && (
                                <div key={product?.key} class={`carousel-item`}>
                                    <img
                                        class="d-block w-100"
                                        // src={`/productImage/${product?.image}`}
                                        src={`${product?.image}`}
                                        alt=""
                                    ></img>
                                </div>
                            )}
                        </>
                    );
                })}
            </div>
            <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon css-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                <span class="carousel-control-next-icon css-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
            </a>
        </div>
    );
}
export default SliderImageProducts;
