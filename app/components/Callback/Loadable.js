/**
 *
 * Asynchronously loads the component for Callback
 *
 */

import loadable from 'loadable-components';

export default loadable(() => import('./index'));
