import React, { Component } from 'react';

class Footer extends Component {
    render() {
        return (
            <div className="footer-container">
                <p>Guillaume Meigniez 2019</p>
                <div className="medias">
                    <div className="media"><a href="https://github.com/GuillaumeMMM">Github</a></div>
                    <div className="media"><a href="https://www.linkedin.com/in/guillaume-meigniez/">Linkedin</a></div>
                    <div className="media"><a href="mailto:guillaume.meigniez@gmail.com">Gmail</a></div>
                </div>
            </div>
        );
    }
}

export default Footer;