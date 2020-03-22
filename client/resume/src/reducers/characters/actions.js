import { API_URL } from '../../constants';
import axios from 'axios';

export const SET_CHARACTERS = 'SET_CHARACTERS';

export function getCharacters() {
    return dispatch => {
        axios.get(`${API_URL}/people`)
        .then(characters =>
            dispatch(setCharacters(characters))
        );
    };
}

export function setCharacters(characters) {
    return {
        type: SET_CHARACTERS,
        characters
    };
}