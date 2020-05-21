import React from "react";

import './styles.css';

const Header = ({title}) => (
    <header>
        <h1 className="font-weight-bold"> {title ? title : 'Defina um Título'} </h1>
    </header>
);

export default Header;