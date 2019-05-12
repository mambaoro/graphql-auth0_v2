/**
 *
 * Asynchronously loads the component for Nav
 *
 */

import loadable from 'loadable-components';

export default loadable(() => import('./index'));
