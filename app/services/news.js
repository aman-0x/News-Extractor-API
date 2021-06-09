const puppeteer = require('puppeteer');
const $ = require('cheerio');
const cheerio = require('cheerio');
const CONST = require('../constants')
const Response = require('../response');

exports.getAllNews = (req, res, next) => {
    const result = [];
    extractNews(
        res,
        result,
        CONST.URL.ALL_NEWS,
        CONST.All_NEWS,
        CONST.ERRORS.All_NEWS_ERROR,
    );
};

exports.getNationalNews = (req, res, next) => {
    const result = [];
    extractNews(
        res,
        result,
        CONST.URL.INDIA,
        CONST.NATIONAL_NEWS,
        CONST.ERRORS.NATIONAL_NEWS_ERROR,
    );
}

exports.getBusinessNews = (req, res, next) => {
    const result = [];
    extractNews(
        res,
        result,
        CONST.URL.BUSINESS,
        CONST.BUSINESS_NEWS,
        CONST.ERRORS.BUSINESS_NEWS_ERROR,
    );
}

exports.getSportsNews = (req, res, next) => {
    const result = [];
    extractNews(
        res,
        result,
        CONST.URL.SPORTS,
        CONST.SPORTS_NEWS,
        CONST.ERRORS.SPORTS_NEWS_ERROR,
    );
}
exports.getWorldNews = (req, res, next) => {
    const result = [];
    extractNews(
        res,
        result,
        CONST.URL.WORLD,
        CONST.WORLD_NEWS,
        CONST.ERRORS.WORLD_NEWS_ERROR,
    );
}

exports.getPoliticsNews = (req, res, next) => {
    const result = [];
    extractNews(
        res,
        result,
        CONST.URL.POLITICS,
        CONST.POLITICS_NEWS,
        CONST.ERRORS.POLITICS_NEWS_ERROR,
    );
}

exports.getTechnologyNews = (req, res, next) => {
    const result = [];
    extractNews(
        res,
        result,
        CONST.URL.TECHNOLOGY,
        CONST.TECHNOLOGY_NEWS,
        CONST.ERRORS.TECHNOLOGY_NEWS_ERROR,
    );
}

exports.getStartupNews = (req, res, next) => {
    const result = [];
    extractNews(
        res,
        result,
        CONST.URL.STARTUP,
        CONST.STARTUP_NEWS,
        CONST.ERRORS.STARTUP_NEWS_ERROR,
    );
}

exports.getEntertainmentNews = (req, res, next) => {
    const result = [];
    extractNews(
        res,
        result,
        CONST.URL.ENTERTAINMENT,
        CONST.ENTERTAINMENT_NEWS,
        CONST.ERRORS.ENTERTAINMENT_NEWS_ERROR,
    );
}

exports.getMiscellaneousNews = (req, res, next) => {
    const result = [];
    extractNews(
        res,
        result,
        CONST.URL.MISCELLANEOUS,
        CONST.MISCELLANEOUS_NEWS,
        CONST.ERRORS.MISCELLANEOUS_NEWS_ERROR,
    );
}

exports.getHatkeNews = (req, res, next) => {
    const result = [];
    extractNews(
        res,
        result,
        CONST.URL.HATKE,
        CONST.HATKE_NEWS,
        CONST.ERRORS.HATKE_NEWS_ERROR,
    );
}

exports.getScienceNews = (req, res, next) => {
    const result = [];
    extractNews(
        res,
        result,
        CONST.URL.SCIENCE,
        CONST.SCIENCE_NEWS,
        CONST.ERRORS.SCIENCE_NEWS_ERROR,
    );
}

exports.getAutomobileNews = (req, res, next) => {
    const result = [];
    extractNews(
        res,
        result,
        CONST.URL.AUTOMOBILE,
        CONST.AUTOMOBILE_NEWS,
        CONST.ERRORS.AUTOMOBILE_NEWS_ERROR,
    );
}

const extractNews = (res, result, url, message, error_message) => {
    puppeteer
        .launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        })
        .then((browser) => {
            return browser.newPage();
        })
        .then((page) => {
            return page.goto(url, {
                waitUntil: 'load',
                timeout: 0
            }).then(() => {
                return page.content();
            });
        })
        .then((html) => {
            const $ = cheerio.load(html);

            $('.card-stack').children().each((i, elem) => {
                if (!$(elem).children('.news-card.z-depth-1').children('.news-card-image').attr('style')) {
                    // console.log(`undefined value`)   
                } else {
                    const image_url = $(elem).children('.news-card.z-depth-1').children('.news-card-image').attr('style')
                    const title = $(elem).children('.news-card.z-depth-1').children('.news-card-title.news-right-box').children('a').text()
                    const news_body = $(elem).children('.news-card.z-depth-1').children('.news-card-content.news-right-box').children().html()
                    // var news_by = $(elem).children('.news-card.z-depth-1').children('.news-card-content.news-right-box').children('.news-card-author-time.news-card-author-time-in-content').html()
                    const author = $(elem).children('.news-card.z-depth-1').children('.news-card-content.news-right-box').children('.news-card-author-time.news-card-author-time-in-content').children('span.author').text();
                    const time = $(elem).children('.news-card.z-depth-1').children('.news-card-content.news-right-box').children('.news-card-author-time.news-card-author-time-in-content').children('span.time').text();
                    const date = $(elem).children('.news-card.z-depth-1').children('.news-card-content.news-right-box').children('.news-card-author-time.news-card-author-time-in-content').children('span.date').text();
                    // const news_read_more = $(elem).children('.news-card.z-depth-1').children('.news-card-footer.news-right-box').html()
                    const read_at = $(elem).children('.news-card.z-depth-1').children('.news-card-footer.news-right-box').children().children('.source').text();
                    var read_at_url = $(elem).children('.news-card.z-depth-1').children('.news-card-footer.news-right-box').children().children('a').attr('href');
                    read_at_url = String(read_at_url)
                    //adding data to result array
                    result.push({
                        // news_no: i,
                        news_title: title.trim(),
                        news_image_url: image_url.slice(23, -3),
                        news_body: news_body.trim(),
                        news_by: {
                            author: author.trim(),
                            time: time.trim(),
                            date: date.trim()
                        },
                        news_read_more: {
                            read_more_at: read_at.trim(),
                            read_more_at_url: read_at_url.trim() == "undefined" ? "" : read_at_url.trim()
                        }
                    });
                }
            });
            return Response(res, CONST.STATUS_CODE.OK, {
                response: CONST.RESPONSE.SUCCESS,
                message: message,
                result: result
            });
        })
        .catch((err) => {
            console.log(`${error_message} = `, err)
            return Response(res, CONST.STATUS_CODE.INTERNAL_SERVER_ERROR, {
                response: CONST.RESPONSE.ERROR,
                message: error_message,
                result: err
            });
        });
}