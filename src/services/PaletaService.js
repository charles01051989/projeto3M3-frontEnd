// import { response } from "express";
import { Api } from 'helpers/Api';
// import { paletas } from "mocks/paletas";

const parseResponse = response => response.json();

const transformPaleta = paleta => {
    const [sabor, recheio] = paleta.sabor.split(' com ');

    return {
        ...paleta,
        id: paleta._id,
        titulo: paleta.sabor,
        sabor,
        ...(recheio && { recheio }),
        possuiRecheio: Boolean(recheio),
    };
};

const parseTransformLista = response =>
    parseResponse(response).then(paletas => paletas.map(transformPaleta));

const parseTransformItem = response =>
    parseResponse(response).then(transformPaleta);

export const PaletaService = {
    getLista: () =>
        fetch(Api.paletaLista(), { method: 'GET' }).then(parseTransformLista),
    getById: id =>
        fetch(Api.paletaById(id), { method: 'GET' }).then(parseTransformItem),
    create: () =>
        fetch(Api.createPaleta(), { method: 'POST' }).then(parseResponse),
    updateById: id =>
        fetch(Api.updatePaletaById(id), { method: 'PUT' }).then(parseResponse),
    deleteById: id =>
        fetch(Api.deletePaletaById(id), { method: 'DELETE' }).then(
            parseResponse,
        ),
};
