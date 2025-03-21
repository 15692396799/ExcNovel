import React from 'react';


const BannerList = ({ banners }) => {
    return (
    <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel">
        {/*<!-- 轮播指示器 -->*/}
        <div class="carousel-indicators">
            {/* // <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
            // <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
            // <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button> */}
            {banners.map((banner, index) => (
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to={index} class={index === 0 ? "active" : ""} 
                aria-current={index === 0} aria-label={"Slide " + (index + 1)}></button>
            ))}
        </div>

        {/*<!-- 轮播内容 -->*/}
        <div class="carousel-inner">
            {banners.map((banner, index) => (
                <div class={index === 0 ? "carousel-item active" : "carousel-item"} data-bs-interval="3000">
                    <img src={banner.image} class="d-block w-100" alt={banner.title} />
                    <div class="carousel-caption d-none d-md-block">
                        <h5>{banner.title}</h5>
                        <p>{banner.description}</p>
                    </div>
                </div>
            ))}
            {/* <div class="carousel-item active" data-bs-interval="3000">
            <img src="https://via.placeholder.com/800x400?text=Slide+1" class="d-block w-100" alt="Slide 1" />
            <div class="carousel-caption d-none d-md-block">
                <h5>First Slide Title</h5>
                <p>Some representative placeholder content for the first slide.</p>
            </div>
            </div>
            <div class="carousel-item" data-bs-interval="3000">
            <img src="https://via.placeholder.com/800x400?text=Slide+2" class="d-block w-100" alt="Slide 2" />
            <div class="carousel-caption d-none d-md-block">
                <h5>Second Slide Title</h5>
                <p>Some representative placeholder content for the second slide.</p>
            </div>
            </div>
            <div class="carousel-item" data-bs-interval="3000">
            <img src="https://via.placeholder.com/800x400?text=Slide+3" class="d-block w-100" alt="Slide 3" />
            <div class="carousel-caption d-none d-md-block">
                <h5>Third Slide Title</h5>
                <p>Some representative placeholder content for the third slide.</p>
            </div>
            </div> */}
        </div>

        {/*<!-- 轮播控制按钮 -->*/}
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
    </div>
    );
}

export default BannerList;