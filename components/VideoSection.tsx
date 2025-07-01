import React from 'react';

const VideoSection = () => {
  return (
    <section className="py-12 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Mira cómo funciona
          </h2>
          <p className="text-lg text-gray-600 mt-2">
            Descubre lo fácil que es gestionar tus pedidos con Venta Click.
          </p>
        </div>
        <div className="flex justify-center">
          <div className="w-full max-w-4xl">
            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ" // Placeholder video
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                className="rounded-lg shadow-lg"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
