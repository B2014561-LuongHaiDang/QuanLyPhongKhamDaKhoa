import { useState, useEffect } from 'react';

const ImageSlider = () => {
    const images = [
        'https://cdn.hellobacsi.com/wp-content/uploads/2024/11/TIKI_Livestream_tap3_1920x416.png',
        'https://cdn.hellobacsi.com/wp-content/uploads/2024/08/Home-banner-desktop-1920x416_1908.png',
        'https://cdn.hellobacsi.com/wp-content/uploads/2024/08/1920x416.png',
        'https://cdn.hellobacsi.com/wp-content/uploads/2024/11/1920x416.png',
    ];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 2000); // Chuyển ảnh sau mỗi 2 giây

        return () => clearInterval(interval); // Clear interval khi component bị unmount
    }, [images.length]);

    return (
        <div className="slider-container">
            <img
                src={images[currentImageIndex]}
                alt="slider"
                className="w-full h-64 object-cover rounded-lg shadow-lg"
            />
        </div>
    );
};

export default ImageSlider;
