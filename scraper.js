"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var puppeteer_1 = __importDefault(require("puppeteer"));
var cheerio_1 = __importDefault(require("cheerio"));
var PendingXHR = require('pending-xhr-puppeteer').PendingXHR;
var width = 1440;
var height = 900;
function scrapePropertyTaxInformation() {
    return __awaiter(this, void 0, void 0, function () {
        var browser, page, url, searchInput, info_1, htmlContent, $_1, rows, realInfo, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, puppeteer_1.default.launch({
                        headless: false,
                        ignoreHTTPSErrors: true,
                        args: ["--window-size=".concat(width, ",").concat(height)]
                    })];
                case 1:
                    browser = _a.sent();
                    return [4 /*yield*/, browser.newPage()];
                case 2:
                    page = _a.sent();
                    url = 'https://stage.travis.prodigycad.com/property-search';
                    searchInput = 'dede';
                    _a.label = 3;
                case 3:
                    _a.trys.push([3, 9, 10, 11]);
                    // Navigate to the TCAD website, wait till it all loads
                    return [4 /*yield*/, page.goto(url, { waitUntil: "networkidle0" })];
                case 4:
                    // Navigate to the TCAD website, wait till it all loads
                    _a.sent();
                    // Input 'abcd' into the search field
                    return [4 /*yield*/, page.type('input[type="text"]', 'dede')];
                case 5:
                    // Input 'abcd' into the search field
                    _a.sent();
                    // Submit the search form
                    return [4 /*yield*/, page.keyboard.press('Enter')];
                case 6:
                    // Submit the search form
                    _a.sent();
                    // wait for columns to load
                    return [4 /*yield*/, page.waitForSelector('[role="gridcell"]')];
                case 7:
                    // wait for columns to load
                    _a.sent();
                    info_1 = [];
                    return [4 /*yield*/, page.content()];
                case 8:
                    htmlContent = _a.sent();
                    $_1 = cheerio_1.default.load(htmlContent);
                    rows = $_1('[aria-label="Press SPACE to select this row."]').filter('[role="row"]');
                    // Extract property tax information for the ten most valuable properties (modify selectors accordingly)
                    rows.each(function (index, row) {
                        var val = $_1(row).find('[col-id="appraisedValue"]');
                        //      console.log(val.text());
                        info_1.push({
                            name: $_1(row).find('[col-id="name"]').text(),
                            propType: $_1(row).find('[col-id="propType"]').text(),
                            city: $_1(row).find('[col-id="city"]').text(),
                            propertyAddress: $_1(row).find('[col-id="streetPrimary"]').text(),
                            assessedValue: $_1(row).find('.assessedValue').text(),
                            propertyID: $_1(row).find('[col-id="pid"]').text(),
                            appraisedValue: val.text(),
                            description: $_1(row).find('[col-id="legalDescription"]').text(),
                            geoID: $_1(row).find('[col-id="geoID"]').text(),
                        });
                    });
                    realInfo = info_1.filter(function (elem) { return elem.propertyAddress != ''; });
                    console.log(realInfo);
                    return [3 /*break*/, 11];
                case 9:
                    error_1 = _a.sent();
                    console.error('Error:', error_1);
                    return [3 /*break*/, 11];
                case 10: return [7 /*endfinally*/];
                case 11: return [2 /*return*/];
            }
        });
    });
}
//TODO : implement
/*
function extract(string colName, Element row) => {
  return $(row).find('col-id="'+colName+'"');
}
*/
// Call the scraping function
scrapePropertyTaxInformation();
