"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryAPI = void 0;
var apollo_datasource_1 = require("apollo-datasource");
var Category = require('../schema/db').Category;
var CategoryAPI = /** @class */ (function (_super) {
    __extends(CategoryAPI, _super);
    function CategoryAPI() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.getAllCategories = function () {
            return Category.findAll({
                where: {
                    userId: _this.context.user.id
                }
            });
        };
        return _this;
    }
    CategoryAPI.prototype.initialize = function (config) {
        this.context = config.context;
    };
    return CategoryAPI;
}(apollo_datasource_1.DataSource));
exports.CategoryAPI = CategoryAPI;
