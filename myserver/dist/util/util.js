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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLocalFiles = exports.filterImageFromURL = void 0;
const fs_1 = __importDefault(require("fs"));
const jimp_1 = __importDefault(require("jimp"));
const axios_1 = __importDefault(require("axios"));
// filterImageFromURL
// helper function to download, filter, and save the filtered image locally
// returns the absolute path to the local image
// INPUTS
//    inputURL: string - a publicly accessible url to an image file
// RETURNS
//    an absolute path to a filtered image locally saved file
function filterImageFromURL(inputURL) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const photoBuffer = yield axios_1.default.get(inputURL, {
                    responseType: "arraybuffer",
                });
                const photo = yield jimp_1.default.read(Buffer.from(photoBuffer === null || photoBuffer === void 0 ? void 0 : photoBuffer.data, "binary"));
                const outpath = "/tmp/filtered." + Math.floor(Math.random() * 2000) + ".jpg";
                yield photo
                    .resize(1920, 1080) // resize
                    .quality(100) // set JPEG quality
                    .greyscale() // set greyscale
                    .write(outpath, (img) => {
                    resolve(outpath);
                });
            }
            catch (error) {
                reject(error);
            }
        }));
    });
}
exports.filterImageFromURL = filterImageFromURL;
// deleteLocalFiles
// helper function to delete files on the local disk
// useful to cleanup after tasks
// INPUTS
//    files: Array<string> an array of absolute paths to files
function deleteLocalFiles(files) {
    return __awaiter(this, void 0, void 0, function* () {
        for (let file of files) {
            fs_1.default.unlinkSync(file);
        }
    });
}
exports.deleteLocalFiles = deleteLocalFiles;
