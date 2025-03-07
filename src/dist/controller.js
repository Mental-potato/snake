"use strict";
exports.__esModule = true;
exports.GameController = void 0;
var model_1 = require("../src/model");
var view_1 = require("../src/view");
var GameController = /** @class */ (function () {
    function GameController() {
        this.gameLoopId = null;
        this.game = new model_1.SnakeGame();
        this.view = new view_1.GameView(this.game);
        this.setupEventListeners();
    }
    GameController.prototype.startGame = function () {
        var _this = this;
        this.gameLoopId = setInterval(function () {
            _this.game.moveSnake();
            _this.view.render();
            if (_this.game.isGameOver) {
                _this.endGame();
            }
        }, this.getSpeed());
    };
    GameController.prototype.getSpeed = function () {
        switch (this.game.difficulty) {
            case "easy": return 200;
            case "normal": return 150;
            case "hard": return 100;
            default: return 150;
        }
    };
    GameController.prototype.setupEventListeners = function () {
        var _this = this;
        document.addEventListener("keydown", function (event) {
            var directionMap = {
                ArrowUp: { x: 0, y: -1 },
                ArrowDown: { x: 0, y: 1 },
                ArrowLeft: { x: -1, y: 0 },
                ArrowRight: { x: 1, y: 0 }
            };
            if (directionMap[event.key]) {
                _this.game.setDirection(directionMap[event.key]);
            }
        });
    };
    GameController.prototype.endGame = function () {
        if (this.gameLoopId) {
            clearInterval(this.gameLoopId);
        }
        var playerName = prompt("Game Over! Enter your name:");
        if (playerName) {
            this.saveScore(playerName, this.game.score);
        }
    };
    GameController.prototype.saveScore = function (name, score) {
        var scores = JSON.parse(localStorage.getItem("leaderboard") || "[]");
        scores.push({ name: name, score: score });
        scores.sort(function (a, b) { return b.score - a.score; });
        localStorage.setItem("leaderboard", JSON.stringify(scores.slice(0, 5)));
    };
    return GameController;
}());
exports.GameController = GameController;
