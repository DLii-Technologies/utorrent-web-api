"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * The possible access settings
 */
var Access;
(function (Access) {
    Access["ReadOnly"] = "R";
    Access["WriteOnly"] = "W";
    Access["ReadWrite"] = "Y";
})(Access = exports.Access || (exports.Access = {}));
/**
 * The possible torrent priorities
 */
var Priority;
(function (Priority) {
    Priority[Priority["Skip"] = 0] = "Skip";
    Priority[Priority["Low"] = 1] = "Low";
    Priority[Priority["Normal"] = 2] = "Normal";
    Priority[Priority["High"] = 3] = "High";
})(Priority = exports.Priority || (exports.Priority = {}));
/**
 * The possible status bit-flags
 */
var Status;
(function (Status) {
    Status[Status["Started"] = 1] = "Started";
    Status[Status["Checking"] = 2] = "Checking";
    Status[Status["StartAfterChecking"] = 4] = "StartAfterChecking";
    Status[Status["Checked"] = 8] = "Checked";
    Status[Status["Error"] = 16] = "Error";
    Status[Status["Paused"] = 32] = "Paused";
    Status[Status["Queued"] = 64] = "Queued";
    Status[Status["Loaded"] = 128] = "Loaded";
})(Status = exports.Status || (exports.Status = {}));
//# sourceMappingURL=types.js.map