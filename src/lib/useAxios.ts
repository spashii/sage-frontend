import axios from 'axios';
import config from '../config';

const instance = axios.create({
	baseURL: config.apiRoot,
});

const useAxios = () => {
	return [instance];
};

export default useAxios;
