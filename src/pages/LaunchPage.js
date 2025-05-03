import React, { useEffect } from 'react'; 
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useNavigate } from 'react-router-dom';

const LaunchPage = () => {
  const navigate = useNavigate(); // ✅ FIXED: define navigate properly here

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const backgroundImageStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: "url('/background.jpg') center/cover no-repeat",
    zIndex: 0,
  };

  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    zIndex: 1,
  };

  const mainContentStyle = {
    position: 'relative',
    zIndex: 2,
    paddingTop: '8rem',
    paddingBottom: '5rem',
    fontFamily: "'Montserrat', sans-serif",
  };

  const headingStyle = {
    fontSize: '5rem',
    fontWeight: 700,
    letterSpacing: '2px',
    marginBottom: '2.5rem',
    fontFamily: "'Playfair Display', serif",
    textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
  };

  const subHeadingStyle = {
    fontSize: '1.8rem',
    marginBottom: '3rem',
    fontWeight: 400,
    fontFamily: "'Montserrat', sans-serif",
    letterSpacing: '1px',
  };

  const descriptionStyle = {
    maxWidth: '700px',
    margin: '0 auto 3rem',
    lineHeight: '1.8',
    fontSize: '1.2rem',
    fontFamily: "'Open Sans', sans-serif",
  };

  const statCardStyle = {
    width: '280px',
    margin: '1.5rem auto',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    backgroundColor: 'rgba(33,37,41,0.25)',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
  };

  const statNumberStyle = {
    fontSize: '2.5rem',
    fontWeight: '700',
    fontFamily: "'Montserrat', sans-serif",
  };

  const statLabelStyle = {
    fontSize: '1.2rem',
    fontFamily: "'Open Sans', sans-serif",
  };

  const footerStyle = {
    textAlign: 'center',
    padding: '1rem 0',
    color: 'white',
    backgroundColor: 'rgba(33,37,41,0.5)',
    borderTop: '1px solid #6c757d',
    fontFamily: "'Open Sans', sans-serif",
  };

  const buttonStyle = {
    padding: '0.85rem 3.5rem',
    fontSize: '1.25rem',
    border: '2px solid #fff',
    color: '#fff',
    backgroundColor: 'transparent',
    borderRadius: '50px',
    transition: 'all 0.3s ease',
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: '600',
    letterSpacing: '1px',
    textTransform: 'uppercase',
  };

  return (
    <div style={{ fontFamily: "'Montserrat', sans-serif" }} className="d-flex flex-column min-vh-100 position-relative">
      {/* Font imports */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&family=Open+Sans:wght@400;600&family=Playfair+Display:wght@700&display=swap" rel="stylesheet" />
      
      {/* Background Layers */}
      <div style={backgroundImageStyle}></div>
      <div style={overlayStyle}></div>

      {/* Main Content */}
      <main style={mainContentStyle} className="container text-white text-center flex-grow-1 d-flex flex-column justify-content-center px-3">
        <h1 style={headingStyle} data-aos="fade-down">GlobeScope</h1>
        <h2 style={subHeadingStyle} data-aos="fade-up" data-aos-delay="100">
          Your Gateway to World Exploration
        </h2>
        <p style={descriptionStyle} className="lead" data-aos="fade-up" data-aos-delay="300">
          Discover extraordinary destinations across the globe, immerse yourself in diverse cultures,
          and create memories that will last a lifetime with our curated travel experiences.
        </p>

        <div className="mb-5" data-aos="zoom-in" data-aos-delay="500">
          <button 
            style={buttonStyle} 
            className="btn"
            onClick={() => navigate('/home')}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)';
              e.currentTarget.style.transform = 'translateY(-3px)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Explore More
          </button>
        </div>

        {/* Stats Cards */}
        <div className="d-flex flex-column align-items-center">
          {[
            { number: '190+', label: 'Countries', delay: 0 },
            { number: '5000+', label: 'Destinations', delay: 200 },
            { number: '1M+', label: 'Travelers', delay: 400 }
          ].map((stat, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={stat.delay}
              style={statCardStyle}
              className="p-4 border rounded"
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.3)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
              }}
            >
              <h3 style={statNumberStyle}>{stat.number}</h3>
              <p style={statLabelStyle}>{stat.label}</p>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer style={footerStyle}>
        © {new Date().getFullYear()} GlobeScope | Discover. Journey. Remember.
      </footer>
    </div>
  );
};

export default LaunchPage;
