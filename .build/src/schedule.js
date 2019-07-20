"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tag_1 = __importDefault(require("graphql-tag"));
const getClient_1 = require("./utils/getClient");
const response_1 = require("./utils/response");
exports.default = (function (event) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = yield getClient_1.getClient();
        const { data } = yield client.query({
            query: graphql_tag_1.default `
      query getSchedule($date: String!) {
        schedule(date: $date) {
          gameId
          clock
          isGameActivated
          startDateEastern
          startTimeUTC
          nugget
          period {
            current
            isEndOfPeriod
            isHalftime
            maxRegular
          }
          hTeam {
            triCode
            score
            win
            loss
            city
            fullName
            confName
            divName
            logo
          }
          vTeam {
            triCode
            score
            win
            loss
            city
            fullName
            confName
            divName
            logo
          }
        }
      }
    `,
            fetchPolicy: 'network-only',
            variables: { date: '20190101' },
        });
        return response_1.success(data.schedule);
    });
});
//# sourceMappingURL=schedule.js.map