/**
 *
 * Asynchronously loads the component for GuardedRoute
 *
 */

import loadable from 'loadable-components';

export default loadable(() => import('./index'));
