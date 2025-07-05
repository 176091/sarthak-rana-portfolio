import React, { useState, useEffect } from "react";
import { certificates } from "../../constants";

const Certificates = () => {
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  // Smooth scroll functionality
  useEffect(() => {
    const handleScrollToSection = (sectionId) => {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    };

    // Expose scroll function globally for navigation
    window.scrollToCertificates = () => handleScrollToSection('certificates');
    
    return () => {
      delete window.scrollToCertificates;
    };
  }, []);

  const handleOpenModal = (certificate) => {
    setSelectedCertificate(certificate);
  };

  const handleCloseModal = () => {
    setSelectedCertificate(null);
  };

  return (
    <section
      id="certificates"
      className="py-24 pb-24 px-[12vw] md:px-[7vw] lg:px-[20vw] font-sans relative"
    >
      {/* Section Title */}
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-white">CERTIFICATES</h2>
        <div className="w-32 h-1 bg-purple-500 mx-auto mt-4"></div>
        <p className="text-gray-400 mt-4 text-lg font-semibold">
          A collection of my professional certifications and achievements
        </p>
      </div>

      {/* Certificates Grid */}
      <div className="grid gap-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {certificates.map((certificate, index) => (
          <div
            key={certificate.id}
            onClick={() => handleOpenModal(certificate)}
            className="border border-white bg-gray-900 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden cursor-pointer hover:shadow-purple-500/50 hover:-translate-y-2 transition-all duration-500 ease-in-out transform hover:scale-105"
            style={{
              animationDelay: `${index * 200}ms`,
              animation: 'fadeInUp 0.6s ease-out forwards'
            }}
          >
            <div className="p-4">
              <img
                src={certificate.image}
                alt={certificate.title}
                className="w-full h-48 object-cover rounded-xl"
              />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-white mb-2">
                {certificate.title}
              </h3>
              <p className="text-gray-500 mb-4 pt-4 line-clamp-3">
                {certificate.description}
              </p>
              <div className="mb-4">
                {certificate.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-block bg-[#251f38] text-xs font-semibold text-purple-500 rounded-full px-2 py-1 mr-2 mb-2"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="text-sm text-gray-400">
                <p>Issued: {certificate.issuedDate}</p>
                <p>Issuer: {certificate.issuer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Container */}
      {selectedCertificate && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[95vh] overflow-y-auto modal-scroll">
            <div className="relative">
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 text-white text-3xl hover:text-purple-500 z-10 bg-gray-800 rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-700 transition-colors"
              >
                ×
              </button>
              
              {/* Certificate Image */}
              <div className="relative">
                <img
                  src={selectedCertificate.image}
                  alt={selectedCertificate.title}
                  className="w-full h-64 md:h-80 object-cover rounded-t-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent rounded-t-2xl"></div>
              </div>
              
              {/* Certificate Content */}
              <div className="p-6 md:p-8 space-y-6">
                {/* Title */}
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    {selectedCertificate.title}
                  </h3>
                  <div className="w-20 h-1 bg-purple-500 rounded"></div>
                </div>
                
                {/* Description */}
                <div>
                  <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                    {selectedCertificate.description}
                  </p>
                </div>
                

                
                {/* Certificate Details */}
                <div className="bg-gray-800/50 rounded-xl p-4 space-y-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-purple-400 font-semibold">📅 Issued:</span>
                    <span className="text-gray-300">{selectedCertificate.issuedDate}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-purple-400 font-semibold">🏢 Issuer:</span>
                    <span className="text-gray-300">{selectedCertificate.issuer}</span>
                  </div>
                  {selectedCertificate.validUntil && (
                    <div className="flex items-center space-x-3">
                      <span className="text-purple-400 font-semibold">⏰ Valid Until:</span>
                      <span className="text-gray-300">{selectedCertificate.validUntil}</span>
                    </div>
                  )}
                </div>
                
                {/* Action Button */}
                {selectedCertificate.credentialUrl && selectedCertificate.credentialUrl !== "#" && (
                  <div className="pt-4">
                    <a
                      href={selectedCertificate.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-6 py-3 rounded-xl text-center font-semibold transition-all duration-300 transform hover:scale-105 inline-block"
                    >
                      🔗 View Credential
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Certificates; 