import React, { Component } from 'react';

class Header extends Component {
    render() {
        return (
            <div className="header-container">
                <div className="header-content">
                    <div className="header-title">REPARTITION DU TEMPS DE PAROLE DANS LES MEDIAS EN FRANCE DE 2012 A 2019</div>
                    <div className="header-details">
                        <p>A l'aide d'<a href="https://www.isca-speech.org/archive/JEP_2018/pdfs/192838.pdf">une étude de David Doukhan et Jean Carrive</a>, et des données rendues disponibles par le portail <a href="https://www.data.gouv.fr/fr/datasets/temps-de-parole-des-hommes-et-des-femmes-a-la-television-et-a-la-radio/">data.gouv.fr</a>, cette visualisation interactive permet la comparaison sur plusieurs années de la répartition du temps de parole.</p>
                        <p>Le pourcentage de temps de parole est calculé par rapport au temps de parole total des différents médias.</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;