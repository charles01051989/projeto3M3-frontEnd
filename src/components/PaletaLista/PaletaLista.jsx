// eslint-disable-next-line
import React, { useState, useEffect } from 'react';
import PaletaListaItem from 'components/PaletaListaItem/PaletaListaItem';
import { PaletaService } from 'services/PaletaService';
import PaletaDetalhesModal from 'components/PaletaDetalhesModal/PaletaDetalhesModal';

import './PaletaLista.css';

function PaletaLista() {
    const [paletas, setPaletas] = useState([]);

    const [paletaSelecionada, setPaletaSelecionada] = useState({});

    const [paletaModal, setPaletaModal] = useState(false);

    const adicionarItem = paletaIndex => {
        const paleta = {
            [paletaIndex]: Number(paletaSelecionada[paletaIndex] || 0) + 1,
        };
        setPaletaSelecionada({ ...paletaSelecionada, ...paleta });
    };

    const removerItem = paletaIndex => {
        const paleta = {
            [paletaIndex]: Number(paletaSelecionada[paletaIndex] || 0) - 1,
        };
        setPaletaSelecionada({ ...paletaSelecionada, ...paleta });
    };

    const getLista = async () => {
        const response = await PaletaService.getLista();
        setPaletas(response);
    };

    const getPaletaByID = async paletaId => {
        const response = await PaletaService.getById(paletaId);
        setPaletaModal(response);
    };

    useEffect(() => {
        getLista();
    }, []);

    return (
        <div className="PaletaLista">
            {paletas.map((paleta, index) => (
                <PaletaListaItem
                    key={`PaletaListaItem-${index}`}
                    paleta={paleta}
                    quantidadeSelecionada={paletaSelecionada[index]}
                    index={index}
                    onRemove={index => removerItem(index)}
                    onAdd={index => adicionarItem(index)}
                    clickItem={paletaId => getPaletaByID(paletaId)}
                />
            ))}
            {paletaModal && (
                <PaletaDetalhesModal
                    paleta={paletaModal}
                    closeModal={() => setPaletaModal(false)}
                />
            )}
        </div>
    );
}

export default PaletaLista;
