import { createContainer } from 'unstated-next';
import useStore from './useStore';

const Store = createContainer(useStore);

export default Store;
