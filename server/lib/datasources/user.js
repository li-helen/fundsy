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
exports.UserAPI = void 0;
var apollo_datasource_1 = require("apollo-datasource");
var User = require('../schema/db').User;
var UserAPI = /** @class */ (function (_super) {
    __extends(UserAPI, _super);
    function UserAPI() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UserAPI.prototype.initialize = function (config) {
        this.context = config.context;
    };
    return UserAPI;
}(apollo_datasource_1.DataSource));
exports.UserAPI = UserAPI;
