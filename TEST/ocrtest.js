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
const { createWorker } = require('tesseract.js');
const worker = createWorker();
function getTextFromImage() {
    return __awaiter(this, void 0, void 0, function* () {
        yield worker.load();
        yield worker.loadLanguage('eng');
        yield worker.initialize('eng');
        const { data: { text } } = yield worker.recognize('./img/oko.png');
        yield worker.terminate();
    });
}
getTextFromImage()
    .then(console.log);
//# sourceMappingURL=ocrtest.js.map