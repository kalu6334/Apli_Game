import { Home } from './Home.js';
import { PageList } from './PageList.js';
import { PageDetail } from './PageDetail.js';

const routes = {
    'home': Home,
    '': PageList,
    'pagedetail': PageDetail,
};
export { routes };