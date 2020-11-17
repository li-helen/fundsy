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
var DataSource = require('apollo-datasource').DataSource;
var Transaction = require('../schema/db').Transaction;
var TransactionAPI = /** @class */ (function (_super) {
    __extends(TransactionAPI, _super);
    function TransactionAPI() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.getAllCategories = function () {
            return Transaction.findAll({
                where: {
                    userId: _this.context.user.id
                }
            });
        };
        return _this;
    }
    TransactionAPI.prototype.initialize = function (config) {
        this.context = config.context;
    };
    return TransactionAPI;
}(DataSource));
module.exports = TransactionAPI;
