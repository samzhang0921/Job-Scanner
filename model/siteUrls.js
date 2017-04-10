module.exports = [
    {
        "name": "monster",
        "base": "https://www.monster.co.uk/jobs/search/",
        "type": "query",
        "pageKey": "page",
        "keyword": "q",
        "selector": "#resultsWrapper"
    }, {
        "name": "reed",
        "base": "https://www.reed.co.uk/jobs",
        "type": "query",
        "pageKey": "pageno",
        "keyword": "keywords",
        "selector": "#server-results"
    }, {
        "name": "totaljob",
        "base": "https://www.totaljobs.com/jobs",
        "type": "param",
        "pageKey": "page",
        "keyword": "",
        "selector": ".job-results"
    }
];
