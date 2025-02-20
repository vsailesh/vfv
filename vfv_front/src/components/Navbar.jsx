import React from "react";
import { Link as ScrollLink } from "react-scroll";
import useScrollSpy from "../hooks/useScrollSpy";

const Navbar = () => {
  const navHeight = 70;
  const { isNavbarColored } = useScrollSpy(navHeight);

  return (
    <nav className={`navbar fixed-top ${isNavbarColored ? "show-color" : ""}`}>
      <div className="container-fluid">
        <div className="navbar-header">
          <ScrollLink to="home" smooth={true} offset={-70} duration={600}>
            <svg className="lnr lnr-home">
              <use xlinkHref="#lnr-home"></use>
            </svg>
          </ScrollLink>
        </div>
        <div className="collapse navbar-collapse" id="scroll-spy">
          <ul className="nav navbar-nav">
            <li>
              <ScrollLink to="about" smooth={true} offset={-70} duration={600}>
                About
              </ScrollLink>
            </li>
            <li>
              <ScrollLink to="demo" smooth={true} offset={-70} duration={600}>
                Demo
              </ScrollLink>
            </li>
            <li>
              <ScrollLink
                to="features"
                smooth={true}
                offset={-70}
                duration={600}
              >
                Features
              </ScrollLink>
            </li>
            <li>
              <ScrollLink to="howto" smooth={true} offset={-70} duration={600}>
                How To
              </ScrollLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
