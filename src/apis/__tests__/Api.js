/* @flow */
import Api from '../Api';

describe('constructor', () => {
    it('should throw an error if <baseURL> parameter is missing', () => {
        // $FlowFixMe - Expected too few arguments error
        expect(() => new Api()).toThrow('Missing baseURL parameter');
    });

    it('should throw an error if <refreshToken> parameter is missing', () => {
        // $FlowFixMe - Expected too few arguments error
        expect(() => new Api('https://some-url.com')).toThrow(
            'Missing refreshToken parameter'
        );
    });
});
