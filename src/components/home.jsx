import React, { useEffect } from 'react';
import NavBar from './NavBar';
import AOS from 'aos'; // Assure-toi que AOS est bien installé via npm
import 'aos/dist/aos.css';
import "./Home.css";
const Home = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 }); // Initialisation de AOS pour les animations
  }, []);

  return (
    <div className="home-page">
      <NavBar />
      <section className="home" id="home">
        <div className="content" data-aos="fade-down">
          <br /><br /><br /><br />
          <h3>Votre application d'intervention <br /> aussi simple qu'une tarte</h3>
          {/* <a href="#" className="btn">voir plus d'infos</a> */}
        </div>
      </section>
    </div>
  );
};

export default Home;
