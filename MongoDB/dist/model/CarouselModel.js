"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CarouselModel = function CarouselModel(model) {
    _classCallCheck(this, CarouselModel);

    this.newsID = model.newsId;
    this.title = model.title;
    this.imageUrl = model.imageUrl;
    this.type = model.type;
    this.adUrl = model.url;
};

exports.default = CarouselModel;