const express = require('express');
const router =  express.Router();

const newsService = require('../services/news');

router.get('/all', (req, res, next) => {
    newsService.getAllNews(req, res, next);
});

router.get('/national', (req, res, next) => {
    newsService.getNationalNews(req, res, next);
});

router.get('/business', (req, res, next) => {
    newsService.getBusinessNews(req, res, next);
});

router.get('/sports', (req, res, next) => {
    newsService.getSportsNews(req, res, next);
});

router.get('/world', (req, res, next) => {
    newsService.getWorldNews(req, res, next);
});

router.get('/politics', (req, res, next) => {
    newsService.getPoliticsNews(req, res, next);
});

router.get('/technology', (req, res, next) => {
    newsService.getTechnologyNews(req, res, next);
});

router.get('/startup', (req, res, next) => {
    newsService.getStartupNews(req, res, next);
});

router.get('/entertainment', (req, res, next) => {
    newsService.getEntertainmentNews(req, res, next);
});

router.get('/miscellaneous', (req, res, next) => {
    newsService.getMiscellaneousNews(req, res, next);
});

router.get('/hatke', (req, res, next) => {
    newsService.getHatkeNews(req, res, next);
});

router.get('/science', (req, res, next) => {
    newsService.getScienceNews(req, res, next);
});

router.get('/automobile', (req, res, next) => {
    newsService.getAutomobileNews(req, res, next);
});

module.exports = router;