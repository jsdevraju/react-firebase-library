"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
        while (_) try {
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
exports.__esModule = true;
exports.getCollection = exports.getCollections = exports.deleteCollection = exports.updateCollection = exports.createCollection = exports.signOutApi = exports.forgotPassApi = exports.facebookApi = exports.googleApi = exports.loginApi = exports.registerApi = exports.uploadFiles = void 0;
var storage_1 = require("firebase/storage");
var firestore_1 = require("firebase/firestore");
var auth_1 = require("firebase/auth");
// File Upload
var uploadFiles = function (storage, folder, files) { return __awaiter(void 0, void 0, void 0, function () {
    var promises, result, urlPromises, urls;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                promises = [];
                files.forEach(function (file) {
                    var storageRef = (0, storage_1.ref)(storage, "".concat(folder, "/").concat(file.name));
                    var uploadTask = (0, storage_1.uploadBytesResumable)(storageRef, file);
                    promises.push(uploadTask);
                });
                result = [];
                return [4 /*yield*/, Promise.allSettled(promises).then(function (res) {
                        res.forEach(function (item) {
                            if (item.status === "fulfilled") {
                                result.push(item.value);
                            }
                        });
                    })];
            case 1:
                _a.sent();
                urlPromises = result.map(function (item) {
                    var path = item.ref.toString();
                    return (0, storage_1.getDownloadURL)((0, storage_1.ref)(storage, path));
                });
                urls = [];
                return [4 /*yield*/, Promise.allSettled(urlPromises).then(function (res) {
                        res.forEach(function (item) {
                            if (item.status === "fulfilled") {
                                urls.push(item.value);
                            }
                        });
                    })];
            case 2:
                _a.sent();
                return [2 /*return*/, urls];
        }
    });
}); };
exports.uploadFiles = uploadFiles;
// When user try to Register email and password fire this function
var registerApi = function (auth, user) { return __awaiter(void 0, void 0, void 0, function () {
    var res, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, auth_1.createUserWithEmailAndPassword)(auth, user.email, user.password)];
            case 1:
                res = _a.sent();
                return [2 /*return*/, res.user];
            case 2:
                err_1 = _a.sent();
                console.log(err_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.registerApi = registerApi;
// When user try to login with email and password fire this function
var loginApi = function (auth, user) { return __awaiter(void 0, void 0, void 0, function () {
    var email, password, res, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                email = user.email, password = user.password;
                return [4 /*yield*/, (0, auth_1.signInWithEmailAndPassword)(auth, email, password)];
            case 1:
                res = _a.sent();
                return [2 /*return*/, res.user];
            case 2:
                err_2 = _a.sent();
                console.log(err_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.loginApi = loginApi;
// When user try to login Google Provider fire this function
var googleApi = function (auth, provierGoogle) { return __awaiter(void 0, void 0, void 0, function () {
    var res, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, auth_1.signInWithPopup)(auth, provierGoogle)];
            case 1:
                res = _a.sent();
                return [2 /*return*/, res.user];
            case 2:
                err_3 = _a.sent();
                console.log(err_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.googleApi = googleApi;
// When user try to login Facebook Provider fire this function
var facebookApi = function (auth, provierFacebook) { return __awaiter(void 0, void 0, void 0, function () {
    var res, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, auth_1.signInWithPopup)(auth, provierFacebook)];
            case 1:
                res = _a.sent();
                return [2 /*return*/, res.user];
            case 2:
                err_4 = _a.sent();
                console.log(err_4);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.facebookApi = facebookApi;
// When user click forgot password fire this function
var forgotPassApi = function (auth, email) { return __awaiter(void 0, void 0, void 0, function () {
    var err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, auth_1.sendPasswordResetEmail)(auth, email)];
            case 1:
                _a.sent();
                console.log("Success! Check your email.");
                return [3 /*break*/, 3];
            case 2:
                err_5 = _a.sent();
                console.log(err_5);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.forgotPassApi = forgotPassApi;
// When user try to login out fire this function
var signOutApi = function (auth) { return __awaiter(void 0, void 0, void 0, function () {
    var err_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, auth_1.signOut)(auth)];
            case 1:
                _a.sent();
                return [3 /*break*/, 3];
            case 2:
                err_6 = _a.sent();
                console.log(err_6);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.signOutApi = signOutApi;
// Collection Api
var createCollection = function (db, collectionName, data) { return __awaiter(void 0, void 0, void 0, function () {
    var res, err_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, firestore_1.addDoc)((0, firestore_1.collection)(db, "".concat(collectionName)), data)];
            case 1:
                res = _a.sent();
                return [2 /*return*/, __assign(__assign({}, data), { id: res.id })];
            case 2:
                err_7 = _a.sent();
                console.log(err_7);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.createCollection = createCollection;
// when user update any specific collection data fire this function
var updateCollection = function (db, collectionName, data) { return __awaiter(void 0, void 0, void 0, function () {
    var err_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, firestore_1.updateDoc)((0, firestore_1.doc)(db, "".concat(collectionName, "/").concat(data.id)), data)];
            case 1:
                _a.sent();
                console.log("Update Success!");
                return [3 /*break*/, 3];
            case 2:
                err_8 = _a.sent();
                console.log(err_8);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.updateCollection = updateCollection;
// when user delete any specific collection data fire this function
var deleteCollection = function (db, collectionName, data) { return __awaiter(void 0, void 0, void 0, function () {
    var err_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, firestore_1.deleteDoc)((0, firestore_1.doc)(db, "".concat(collectionName, "/").concat(data.id)))];
            case 1:
                _a.sent();
                console.log("Delete Success!");
                return [3 /*break*/, 3];
            case 2:
                err_9 = _a.sent();
                console.log(err_9);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.deleteCollection = deleteCollection;
// when user get all data with pagination any specific collection data fire this function
var getCollections = function (db, collectionName) { return __awaiter(void 0, void 0, void 0, function () {
    var data_1, q, querySnapshot, err_10;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                data_1 = [];
                q = (0, firestore_1.query)((0, firestore_1.collection)(db, "".concat(collectionName)));
                return [4 /*yield*/, (0, firestore_1.getDocs)(q)];
            case 1:
                querySnapshot = _a.sent();
                querySnapshot.forEach(function (doc) {
                    data_1.push(__assign(__assign({}, doc.data()), { id: doc.id }));
                });
                return [2 /*return*/, data_1];
            case 2:
                err_10 = _a.sent();
                console.log(err_10);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getCollections = getCollections;
// Single Data Collection
var getCollection = function (collectionName, db, id) { return __awaiter(void 0, void 0, void 0, function () {
    var docRef, docSnap, err_11;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                docRef = (0, firestore_1.doc)(db, "".concat(collectionName, "/").concat(id));
                return [4 /*yield*/, (0, firestore_1.getDoc)(docRef)];
            case 1:
                docSnap = _a.sent();
                if (docSnap.exists())
                    return [2 /*return*/, docSnap.data()];
                return [3 /*break*/, 3];
            case 2:
                err_11 = _a.sent();
                console.log(err_11);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getCollection = getCollection;
