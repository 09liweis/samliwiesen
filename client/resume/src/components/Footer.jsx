import React from 'react';
import styled from 'styled-components';

import '../css/footer.css';

const Footer = () => 
    <footer id="footer">
        Made with React and By Sam Li © {new Date().getFullYear()}
    </footer>;
export default Footer;