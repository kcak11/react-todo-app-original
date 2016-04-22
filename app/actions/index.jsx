import * as actionGenerators from 'app/actions/action-generators';
import * as asyncActions from 'app/actions/async-actions';

module.exports = {
    ...actionGenerators,
    ...asyncActions
};
