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
 * Defined actions
 */
var Action;
(function (Action) {
    Action["AddFile"] = "add-file";
    Action["AddUrl"] = "add-url";
    Action["ConfigureRemote"] = "configureremote";
    Action["ForceStart"] = "forcestart";
    Action["GetFiles"] = "getfiles";
    Action["GetSessions"] = "getsessions";
    Action["GetSettings"] = "getsettings";
    Action["GetTransferHistory"] = "getxferhist";
    Action["List"] = "list";
    Action["ListDirectories"] = "list-dirs";
    Action["Logout"] = "logout";
    Action["Pause"] = "pause";
    Action["Recheck"] = "recheck";
    Action["Remove"] = "remove";
    Action["RemoveData"] = "removedata";
    Action["RemoveTorrent"] = "removetorrent";
    Action["RemoveTorrentData"] = "removetorrentdata";
    Action["ResetTransferHistory"] = "resetxferhist";
    Action["SetFilePriority"] = "setprio";
    Action["SetSetting"] = "setsetting";
    Action["Start"] = "start";
    Action["Stop"] = "stop";
    Action["Unpause"] = "unpause";
})(Action = exports.Action || (exports.Action = {}));
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
var TorrentStatus;
(function (TorrentStatus) {
    TorrentStatus[TorrentStatus["Started"] = 1] = "Started";
    TorrentStatus[TorrentStatus["Checking"] = 2] = "Checking";
    TorrentStatus[TorrentStatus["StartAfterChecking"] = 4] = "StartAfterChecking";
    TorrentStatus[TorrentStatus["Checked"] = 8] = "Checked";
    TorrentStatus[TorrentStatus["Error"] = 16] = "Error";
    TorrentStatus[TorrentStatus["Paused"] = 32] = "Paused";
    TorrentStatus[TorrentStatus["Queued"] = 64] = "Queued";
    TorrentStatus[TorrentStatus["Loaded"] = 128] = "Loaded";
})(TorrentStatus = exports.TorrentStatus || (exports.TorrentStatus = {}));
//# sourceMappingURL=types.js.map