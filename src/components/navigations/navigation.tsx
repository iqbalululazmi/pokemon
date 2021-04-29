import React from "react";
import { Nav, NavItem } from "reactstrap";
import { NavLink } from "react-router-dom";
import "./navigation.css";
import pikachu from "./../../assets/icon/pikachu.png";
import pokedex from "../../assets/icon/pokedex.png";
import pokeball from "../../assets/icon/pokeball.png";

const tabs = [
    {
        route: "/pokemon",
        icon: pikachu,
        label: "Pokemon",
    },
    {
        route: "/pokedex",
        icon: pokedex,
        label: "Pokedex",
    },
];

const Navigation = (props: any) => {
    return (
        <div>
            {/* Top Bar*/}
            <nav className="navbar navbar-expand-md navbar-light d-none d-lg-block sticky-top" role="navigation">
                <nav className="navbar navbar-expand-md navbar-light sticky-top" role="navigation">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="/pokemon">
                            <img className="nav-icon" src={pokeball} alt="" />
                        </a>
                        <Nav className="ml-auto">
                            <NavItem>
                                <NavLink to="/pokemon" className="nav-link">
                                    Pokemon
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="/pokedex" className="nav-link">
                                    Pokedex
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </div>
                </nav>{" "}
            </nav>

            {/* Bottom Tab Navigator*/}
            <nav className="navbar fixed-bottom navbar-light d-block d-lg-none bottom-tab-nav" role="navigation">
                <Nav className="w-100">
                    <div className=" d-flex flex-row justify-content-around w-100">
                        {tabs.map((tab, index) => (
                            <NavItem key={`tab-${index}`}>
                                <NavLink to={tab.route} className="nav-link bottom-nav-link" activeClassName="active">
                                    <div className="row d-flex flex-column justify-content-center align-items-center">
                                        <img className="nav-icon" src={tab.icon} alt="" />
                                        <div className="bottom-tab-label">{tab.label}</div>
                                    </div>
                                </NavLink>
                            </NavItem>
                        ))}
                    </div>
                </Nav>
            </nav>
        </div>
    );
};
export default Navigation;
