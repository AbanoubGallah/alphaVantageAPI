const testData = require('../../../fixtures/apiTestData.json');

describe('TIME_SERIES_INTRADAY API', () => {

    beforeEach(() => {
        cy.fixture('apiTestData').then((data) => {
            testData = data;
        });
    });

    // Test for successful API call with default parameters
    it('successfully retrieves the latest 100 intraday OHLCV bars', () => {
        cy.request({
            method: 'GET',
            url: `${testData.baseUrl}?function=TIME_SERIES_INTRADAY&symbol=${testData.symbol}&interval=${testData.interval}&apikey=${testData.apiKey}`,
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('Time Series (5min)');
        });
    });

    // Test for successful API call with full output size
    it('successfully retrieves the full 30 days of intraday data', () => {
        cy.request({
            method: 'GET',
            url: `${testData.baseUrl}?function=TIME_SERIES_INTRADAY&symbol=${testData.symbol}&interval=${testData.interval}&outputsize=full&apikey=${testData.apiKey}`,
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('Time Series (5min)');
            expect(Object.keys(response.body['Time Series (5min)'])).to.have.lengthOf.at.least(100);
        });
    });

    // Test for successful API call with historical month data
    it('successfully retrieves intraday data for a specific historical month', () => {
        cy.request({
            method: 'GET',
            url: `${testData.baseUrl}?function=TIME_SERIES_INTRADAY&symbol=${testData.symbol}&interval=${testData.interval}&month=${testData.month}&outputsize=full&apikey=${testData.apiKey}`,
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('Time Series (5min)');
        });
    });

    // Test for error condition when required 'symbol' parameter is missing
    it('fails when the required symbol parameter is missing', () => {
        cy.request({
            method: 'GET',
            url: `${testData.baseUrl}?function=TIME_SERIES_INTRADAY&interval=${testData.interval}&apikey=${testData.apiKey}`,
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).to.be.oneOf([400, 401, 403, 404]);
        });
    });

    // Test for error condition when invalid 'apikey' is provided
    it('fails when an invalid apikey is provided', () => {
        cy.request({
            method: 'GET',
            url: `${testData.baseUrl}?function=TIME_SERIES_INTRADAY&symbol=${testData.symbol}&interval=${testData.interval}&apikey=${testData.invalidApiKey}`,
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).to.be.oneOf([400, 401, 403, 404]);
        });
    });
});