"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
exports.__esModule = true;
exports.getCollection = exports.getCollections = exports.deleteCollection = exports.updateCollection = exports.createCollection = exports.signOutApi = exports.forgotPassApi = exports.facebookApi = exports.googleApi = exports.loginApi = exports.registerApi = exports.uploadFiles = void 0;
var utils_1 = require("./utils");
__createBinding(exports, utils_1, "uploadFiles");
__createBinding(exports, utils_1, "registerApi");
__createBinding(exports, utils_1, "loginApi");
__createBinding(exports, utils_1, "googleApi");
__createBinding(exports, utils_1, "facebookApi");
__createBinding(exports, utils_1, "forgotPassApi");
__createBinding(exports, utils_1, "signOutApi");
__createBinding(exports, utils_1, "createCollection");
__createBinding(exports, utils_1, "updateCollection");
__createBinding(exports, utils_1, "deleteCollection");
__createBinding(exports, utils_1, "getCollections");
__createBinding(exports, utils_1, "getCollection");
