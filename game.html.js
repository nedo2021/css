// This file contains the game HTML as a JavaScript string
// It's loaded separately to keep the main HTML clean

const gameHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FTC DECODE MADE BY TEAM G-FORCE 19013</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            background-color: black;
            font-family: Arial, sans-serif;
            overflow: hidden;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
        }

        #gameCanvas {
            display: block;
            background-color: black;
            cursor: none;
            border: 2px solid white;
        }

        #loadingOverlay, #ftcOverlay, #allianceOverlay, #controlsOverlay1, 
        #controlsOverlay2, #controlsOverlay3, #pauseOverlay, #gameOverOverlay, 
        #passwordOverlay, #youtubeOverlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            color: white;
        }

        .overlay-bg {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.8);
            z-index: -1;
        }

        .hidden {
            display: none !important;
        }

        .title {
            font-size: 70px;
            color: gold;
            text-shadow: 3px 3px 0px rgba(100, 80, 0, 0.7);
            margin-bottom: 30px;
            text-align: center;
        }

        .subtitle {
            font-size: 36px;
            color: rgb(255, 255, 100);
            margin-bottom: 20px;
            text-align: center;
        }

        .loading-bar {
            width: 400px;
            height: 20px;
            background-color: rgb(50, 50, 50);
            border: 3px solid white;
            border-radius: 10px;
            margin-top: 30px;
            overflow: hidden;
        }

        .loading-fill {
            height: 100%;
            background-color: rgb(0, 200, 0);
            width: 0%;
            transition: width 0.1s;
        }

        .loading-text {
            margin-top: 10px;
            font-size: 24px;
            color: rgb(255, 255, 100);
        }

        .timer-text {
            font-size: 24px;
            color: rgb(255, 255, 100);
            margin-top: 20px;
        }

        .hint-text {
            font-size: 18px;
            color: rgb(255, 200, 100);
            margin-top: 20px;
            text-align: center;
        }

        .button-container {
            display: flex;
            gap: 20px;
            margin-top: 40px;
        }

        .game-button {
            padding: 15px 30px;
            font-size: 24px;
            border: none;
            border-radius: 10px;
            cursor: pointer;
            color: white;
            font-weight: bold;
            transition: all 0.2s;
            min-width: 180px;
            text-align: center;
            border: 3px solid white;
        }

        .game-button:hover {
            transform: scale(1.05);
        }

        .red-button {
            background-color: rgb(255, 0, 0);
        }

        .blue-button {
            background-color: rgb(0, 0, 255);
        }

        .green-button {
            background-color: rgb(0, 200, 0);
        }

        .yellow-button {
            background-color: rgb(255, 165, 0);
        }

        .purple-button {
            background-color: rgb(180, 80, 220);
        }

        .alliance-option {
            width: 200px;
            height: 200px;
            border-radius: 20px;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 36px;
            font-weight: bold;
            border: 5px solid white;
            transition: all 0.2s;
        }

        .alliance-option:hover {
            transform: scale(1.1);
        }

        .controls-container {
            background-color: rgba(30, 30, 70, 0.9);
            border: 4px solid gold;
            border-radius: 20px;
            padding: 40px;
            max-width: 800px;
            margin: 20px;
        }

        .control-item {
            display: flex;
            align-items: center;
            margin: 15px 0;
            padding: 15px;
            background-color: rgba(20, 20, 40, 0.8);
            border-radius: 15px;
            border: 3px solid rgb(100, 150, 255);
        }

        .key-label {
            font-size: 28px;
            color: rgb(255, 255, 100);
            min-width: 200px;
            font-weight: bold;
        }

        .arrow {
            font-size: 28px;
            margin: 0 20px;
            color: white;
        }

        .action-label {
            font-size: 24px;
            color: white;
            flex-grow: 1;
        }

        .password-prompt {
            background-color: rgba(30, 30, 70, 0.95);
            border: 4px solid gold;
            border-radius: 20px;
            padding: 30px;
            max-width: 500px;
            width: 90%;
        }

        .password-input {
            width: 100%;
            padding: 15px;
            font-size: 20px;
            margin: 20px 0;
            border: 3px solid rgb(100, 150, 255);
            border-radius: 10px;
            background-color: white;
            color: black;
        }

        .password-input:focus {
            outline: none;
            border-color: gold;
        }

        .info-box {
            background-color: rgba(20, 20, 40, 0.8);
            border: 2px solid cyan;
            border-radius: 10px;
            padding: 15px;
            margin: 10px 0;
        }

        .info-title {
            color: cyan;
            font-size: 20px;
            margin-bottom: 5px;
        }

        .info-text {
            color: white;
            font-size: 18px;
        }

        .hud {
            position: absolute;
            top: 20px;
            left: 20px;
            color: rgb(255, 255, 100);
            font-size: 24px;
            text-shadow: 2px 2px 2px black;
        }

        .hud-item {
            margin-bottom: 10px;
        }

        .pause-stats {
            margin-top: 20px;
            font-size: 20px;
            color: white;
        }

        .stat-item {
            margin: 5px 0;
        }

        #ftcImage {
            max-width: 600px;
            max-height: 400px;
            width: 90%;
            height: auto;
            border-radius: 30px;
            border: 5px solid white;
            cursor: pointer;
            transition: transform 0.2s;
        }

        #ftcImage:hover {
            transform: scale(1.02);
        }

        #youtubeFrame {
            width: 90%;
            max-width: 800px;
            height: 450px;
            border: 5px solid gold;
            border-radius: 15px;
        }
    </style>
</head>
<body>
    <canvas id="gameCanvas"></canvas>

    <!-- Loading Screen -->
    <div id="loadingOverlay">
        <div class="overlay-bg"></div>
        <div class="title">GFORCE 19013</div>
        <div class="loading-bar">
            <div class="loading-fill" id="loadingFill"></div>
        </div>
        <div class="loading-text" id="loadingText">Loading... 0%</div>
        <div class="timer-text" id="loadingTimer"></div>
        <div class="hint-text">Press 'P' for Developer Access</div>
    </div>

    <!-- FTC Screen -->
    <div id="ftcOverlay" class="hidden">
        <div class="overlay-bg"></div>
        <img id="ftcImage" 
             alt="FTC DECODE">
        <div class="hint-text">Click on the FTC DECODE logo to continue</div>
        <div class="timer-text" id="ftcTimer"></div>
    </div>

    <!-- Alliance Selection -->
    <div id="allianceOverlay" class="hidden">
        <div class="overlay-bg"></div>
        <div class="title">SELECT YOUR ALLIANCE</div>
        <div class="button-container">
            <div class="alliance-option red-button" id="redAlliance" onclick="selectAlliance('RED')">
                RED
            </div>
            <div class="alliance-option blue-button" id="blueAlliance" onclick="selectAlliance('BLUE')">
                BLUE
            </div>
        </div>
        <div class="hint-text">Click on RED or BLUE to select your alliance</div>
        <div class="timer-text" id="allianceTimer"></div>
        <div class="hint-text" style="position: absolute; bottom: 30px; left: 10px;">
            Press 'P' for Developer Access
        </div>
    </div>

    <!-- Controls Screens -->
    <div id="controlsOverlay1" class="hidden">
        <div class="overlay-bg"></div>
        <div class="title">MOVEMENT CONTROLS</div>
        <div class="controls-container">
            <div class="control-item">
                <div class="key-label">W / UP ARROW</div>
                <div class="arrow">→</div>
                <div class="action-label">Move Collector UP</div>
            </div>
            <div class="control-item">
                <div class="key-label">A / LEFT ARROW</div>
                <div class="arrow">→</div>
                <div class="action-label">Move Collector LEFT</div>
            </div>
            <div class="control-item">
                <div class="key-label">S / DOWN ARROW</div>
                <div class="arrow">→</div>
                <div class="action-label">Move Collector DOWN</div>
            </div>
            <div class="control-item">
                <div class="key-label">D / RIGHT ARROW</div>
                <div class="arrow">→</div>
                <div class="action-label">Move Collector RIGHT</div>
            </div>
        </div>
        <div class="timer-text" id="controlsTimer1">Next page in: 4s</div>
    </div>

    <div id="controlsOverlay2" class="hidden">
        <div class="overlay-bg"></div>
        <div class="title">GAME CONTROLS</div>
        <div class="subtitle">Essential Keys for Gameplay</div>
        <div class="controls-container">
            <div class="control-item">
                <div class="key-label">TAB KEY</div>
                <div class="arrow">→</div>
                <div class="action-label">Pause/Unpause Game</div>
            </div>
        </div>
        <div class="timer-text" id="controlsTimer2">Next page in: 3s</div>
    </div>

    <div id="controlsOverlay3" class="hidden">
        <div class="overlay-bg"></div>
        <div class="title">GAME INFO</div>
        <div class="controls-container">
            <div class="info-box">
                <div class="info-title">OBJECTIVE</div>
                <div class="info-text">Collect artifacts and match patterns</div>
            </div>
            <div class="info-box">
                <div class="info-title">ARTIFACTS</div>
                <div class="info-text">Collect G (Gold) and P (Purple)</div>
            </div>
            <div class="info-box">
                <div class="info-title">PATTERNS</div>
                <div class="info-text">Match GPP, PPG, or PGP</div>
            </div>
            <div class="info-box">
                <div class="info-title">SCORING</div>
                <div class="info-text">+10 Correct Pattern, -5 Wrong</div>
            </div>
            <div class="info-box">
                <div class="info-title">INVENTORY</div>
                <div class="info-text">Carry max 3 artifacts at once</div>
            </div>
            <div class="info-box">
                <div class="info-title">TIME LIMIT</div>
                <div class="info-text">75 seconds to score points</div>
            </div>
        </div>
        <div class="timer-text" id="controlsTimer3">Game starts in: 2s</div>
    </div>

    <!-- Pause Menu -->
    <div id="pauseOverlay" class="hidden">
        <div class="overlay-bg"></div>
        <div class="title">GAME PAUSED</div>
        <div class="subtitle">Press TAB to resume</div>
        <div class="button-container">
            <button class="game-button green-button" onclick="resumeGame()">CONTINUE</button>
            <button class="game-button yellow-button" onclick="restartGame()">RESTART</button>
            <button class="game-button blue-button" onclick="changeAlliance()">CHANGE ALLIANCE</button>
            <button class="game-button purple-button" onclick="changeMode()">CHANGE MODE</button>
            <button class="game-button red-button" onclick="quitGame()">QUIT GAME</button>
        </div>
        <div class="pause-stats" id="pauseStats"></div>
    </div>

    <!-- Game Over Screen -->
    <div id="gameOverOverlay" class="hidden">
        <div class="overlay-bg"></div>
        <div class="title">GAME OVER</div>
        <div class="subtitle" id="finalScore">Final Score: 0</div>
        <div class="hint-text" id="bonusText" style="color: gold; font-size: 24px;"></div>
        <div class="button-container">
            <button class="game-button green-button" onclick="restartGame()">RESTART</button>
            <button class="game-button blue-button" onclick="changeAlliance()">CHANGE ALLIANCE</button>
            <button class="game-button red-button" onclick="quitGame()">QUIT</button>
        </div>
        <div class="hint-text">Choose your next action:</div>
    </div>

    <!-- Password Prompt -->
    <div id="passwordOverlay" class="hidden">
        <div class="overlay-bg"></div>
        <div class="password-prompt">
            <div class="title" style="font-size: 36px; margin-bottom: 20px;">DEVELOPER ACCESS</div>
            <div class="subtitle" style="font-size: 24px; margin-bottom: 20px;">Enter password to skip intro:</div>
            <input type="password" class="password-input" id="passwordInput" placeholder="Enter password...">
            <div class="button-container" style="justify-content: center;">
                <button class="game-button green-button" onclick="submitPassword()">SUBMIT</button>
                <button class="game-button red-button" onclick="cancelPassword()">CANCEL</button>
            </div>
        </div>
    </div>

    <!-- YouTube Overlay -->
    <div id="youtubeOverlay" class="hidden">
        <div class="overlay-bg"></div>
        <div class="title">DEVELOPER ACCESS GRANTED</div>
        <div class="subtitle">Enjoy this special content!</div>
        <iframe id="youtubeFrame" 
                src=""
                title="YouTube video player" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen>
        </iframe>
        <div class="hint-text" style="margin-top: 20px;">
            <button class="game-button red-button" onclick="closeYouTube()">CLOSE VIDEO</button>
        </div>
    </div>

    <script>
        // Canvas setup - ORIGINAL RATIO
        const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');
        const WINDOW_WIDTH = 900;  // Original size
        const WINDOW_HEIGHT = 600; // Original size
        const FPS = 60;
        
        canvas.width = WINDOW_WIDTH;
        canvas.height = WINDOW_HEIGHT;

        // Colors
        const DARK_GREY = 'rgb(50, 50, 50)';
        const RED = 'rgb(255, 0, 0)';
        const BLUE = 'rgb(0, 0, 255)';
        const GREEN = 'rgb(0, 200, 0)';
        const PURPLE = 'rgb(160, 32, 240)';
        const WHITE = 'rgb(255, 255, 255)';
        const BLACK = 'rgb(0, 0, 0)';
        const BRIGHT_YELLOW = 'rgb(255, 255, 100)';
        const GOLD = 'rgb(255, 215, 0)';
        const ORANGE = 'rgb(255, 165, 0)';
        const LIGHT_ORANGE = 'rgb(255, 200, 100)';
        const LIGHT_BLUE = 'rgb(100, 150, 255)';
        const LIGHT_RED = 'rgb(255, 100, 100)';
        const LIGHT_GREEN = 'rgb(100, 255, 100)';
        const LIGHT_YELLOW = 'rgb(255, 255, 150)';
        const DARK_BLUE = 'rgb(30, 30, 70)';
        const CYAN = 'rgb(0, 255, 255)';

        // Game state
        let gameState = {
            showLoading: true,
            showFTCScreen: false,
            showAllianceSelect: false,
            showControlsPage1: false,
            showControlsPage2: false,
            showControlsPage3: false,
            gameActive: false,
            gameOver: false,
            pauseMenuVisible: false,
            backgroundFrozen: false,
            passwordActive: false,
            passwordCorrect: false,
            showPasswordPrompt: false,
            showYouTube: false
        };

        // Timer variables
        let introStartTime = null;
        const introTotalDuration = 10.0;
        let screenTimers = {
            controls_page1: 0,
            controls_page2: 0,
            controls_page3: 0
        };
        const screenDurations = {
            controls_page1: 4.0,
            controls_page2: 3.0,
            controls_page3: 2.0
        };

        // Game variables
        let team = null;
        let score = 0;
        let gameStartTime = null;
        let pausedTime = 0;
        let timePaused = false;
        const gameDuration = 75;
        let remainingTime = gameDuration;

        // Collector - ORIGINAL SIZE
        const collectorSize = 50;
        let collector = {
            x: WINDOW_WIDTH / 2 - collectorSize / 2,
            y: WINDOW_HEIGHT / 2 - collectorSize / 2,
            width: collectorSize,
            height: collectorSize,
            speed: 8,
            color: WHITE
        };

        // Patterns - Randomly selected at game start
        const patterns = ["GPP", "PPG", "PGP"];
        let currentMotif = patterns[Math.floor(Math.random() * patterns.length)];

        // Artifacts - STORED AS CIRCLES NOW
        let collectibles = [];
        let collectibleTypes = [];
        let inventory = [];

        // Key states
        const keys = {
            ArrowLeft: false,
            ArrowRight: false,
            ArrowUp: false,
            ArrowDown: false,
            w: false,
            a: false,
            s: false,
            d: false
        };

        // Password
        const DEVELOPER_PASSWORD = "password";
        let passwordInput = "";

        // YouTube URL
        const YOUTUBE_URL = "https://www.youtube.com/embed/xvFZjo5PgG0?autoplay=1";

        // Base zones
        const borderSize = 160;
        const redBase = { 
            x: borderSize + 100,
            y: WINDOW_HEIGHT - borderSize - 100,
            width: 100,
            height: 100
        };
        const blueBase = { 
            x: WINDOW_WIDTH - borderSize - 200,
            y: WINDOW_HEIGHT - borderSize - 100,
            width: 100,
            height: 100
        };

        // Track if player has already received triangle zone points
        let canScoreInTriangle = true;

        // Initialize game
        function init() {
            setupCollectibles();
            createFTCImage();
            updateLoadingScreen();
            requestAnimationFrame(gameLoop);
        }

        // Create FTC image programmatically
        function createFTCImage() {
            const ftcImage = document.getElementById('ftcImage');
            const canvas = document.createElement('canvas');
            canvas.width = 600;
            canvas.height = 400;
            const ctx = canvas.getContext('2d');
            
            // Draw background
            ctx.fillStyle = 'rgb(0, 100, 200)';
            ctx.roundRect(0, 0, 600, 400, 30);
            ctx.fill();
            
            // Draw border
            ctx.strokeStyle = 'white';
            ctx.lineWidth = 5;
            ctx.roundRect(0, 0, 600, 400, 30);
            ctx.stroke();
            
            // Draw text
            ctx.fillStyle = 'white';
            ctx.font = 'bold 72px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('FTC DECODE', 300, 200);
            
            ftcImage.src = canvas.toDataURL();
        }

        // Game loop
        function gameLoop(timestamp) {
            update();
            draw();
            requestAnimationFrame(gameLoop);
        }

        function update() {
            const currentTime = Date.now() / 1000;
            
            // Handle automatic transitions
            handleTransitions(currentTime);
            
            // Update game state
            if (gameState.gameActive && !gameState.pauseMenuVisible && !gameState.gameOver) {
                updateGame(currentTime);
            }
            
            // Update UI timers
            updateUITimers(currentTime);
        }

        function handleTransitions(currentTime) {
            // Intro timer
            if (introStartTime === null && (
                gameState.showLoading || 
                gameState.showFTCScreen || 
                gameState.showAllianceSelect
            )) {
                introStartTime = currentTime;
            }

            // Auto-advance intro screens
            if (introStartTime && !gameState.backgroundFrozen) {
                const introElapsed = currentTime - introStartTime;
                if (introElapsed >= introTotalDuration) {
                    if (gameState.showLoading) {
                        gameState.showLoading = false;
                        gameState.showFTCScreen = true;
                        introStartTime = currentTime;
                    } else if (gameState.showFTCScreen) {
                        gameState.showFTCScreen = false;
                        gameState.showAllianceSelect = true;
                        introStartTime = currentTime;
                    } else if (gameState.showAllianceSelect && team === null) {
                        team = Math.random() < 0.5 ? "RED" : "BLUE";
                        gameState.showAllianceSelect = false;
                        gameState.showControlsPage1 = true;
                        screenTimers.controls_page1 = currentTime;
                        introStartTime = null;
                    }
                }
            }

            // Controls screens timers
            if (gameState.showControlsPage1 && !gameState.backgroundFrozen) {
                if (screenTimers.controls_page1 === 0) {
                    screenTimers.controls_page1 = currentTime;
                }
                const elapsed = currentTime - screenTimers.controls_page1;
                if (elapsed >= screenDurations.controls_page1) {
                    gameState.showControlsPage1 = false;
                    gameState.showControlsPage2 = true;
                    screenTimers.controls_page2 = currentTime;
                }
            }

            if (gameState.showControlsPage2 && !gameState.backgroundFrozen) {
                if (screenTimers.controls_page2 === 0) {
                    screenTimers.controls_page2 = currentTime;
                }
                const elapsed = currentTime - screenTimers.controls_page2;
                if (elapsed >= screenDurations.controls_page2) {
                    gameState.showControlsPage2 = false;
                    gameState.showControlsPage3 = true;
                    screenTimers.controls_page3 = currentTime;
                }
            }

            if (gameState.showControlsPage3 && !gameState.backgroundFrozen) {
                if (screenTimers.controls_page3 === 0) {
                    screenTimers.controls_page3 = currentTime;
                }
                const elapsed = currentTime - screenTimers.controls_page3;
                if (elapsed >= screenDurations.controls_page3) {
                    gameState.showControlsPage3 = false;
                    gameState.gameActive = true;
                    gameStartTime = Date.now() / 1000;
                    pausedTime = 0;
                    introStartTime = null;
                }
            }
        }

        function updateGame(currentTime) {
            // Move collector
            if (keys.ArrowLeft || keys.a) collector.x -= collector.speed;
            if (keys.ArrowRight || keys.d) collector.x += collector.speed;
            if (keys.ArrowUp || keys.w) collector.y -= collector.speed;
            if (keys.ArrowDown || keys.s) collector.y += collector.speed;

            // Boundary checking
            collector.x = Math.max(0, Math.min(collector.x, WINDOW_WIDTH - collector.width));
            collector.y = Math.max(0, Math.min(collector.y, WINDOW_HEIGHT - collector.height));

            // Collect artifacts
            for (let i = collectibles.length - 1; i >= 0; i--) {
                const artifact = collectibles[i];
                const closestX = Math.max(collector.x, Math.min(artifact.x, collector.x + collector.width));
                const closestY = Math.max(collector.y, Math.min(artifact.y, collector.y + collector.height));
                const distanceX = artifact.x - closestX;
                const distanceY = artifact.y - closestY;
                const distanceSquared = (distanceX * distanceX) + (distanceY * distanceY);
                
                if (distanceSquared < (artifact.radius * artifact.radius) && inventory.length < 3) {
                    inventory.push(collectibleTypes[i]);
                    collectibles.splice(i, 1);
                    collectibleTypes.splice(i, 1);
                }
            }

            // Check for triangle zone
            const triangleSize = 180;
            let inTriangleZone = false;
            
            if (team === "BLUE") {
                const triangleRect = { x: 0, y: 0, width: triangleSize, height: triangleSize };
                inTriangleZone = collision(collector, triangleRect);
            } else if (team === "RED") {
                const triangleRect = { x: WINDOW_WIDTH - triangleSize, y: 0, width: triangleSize, height: triangleSize };
                inTriangleZone = collision(collector, triangleRect);
            }
            
            if (inTriangleZone && canScoreInTriangle && inventory.length > 0) {
                const inventoryPattern = inventory.join('');
                
                if (inventoryPattern === currentMotif) {
                    score += 15;
                } else {
                    score += 9;
                }
                
                for (let i = 0; i < inventory.length; i++) {
                    const zone = Math.random() < 0.5 ? 
                        { x: 0, y: WINDOW_HEIGHT - borderSize, width: borderSize, height: borderSize } : 
                        { x: WINDOW_WIDTH - borderSize, y: WINDOW_HEIGHT - borderSize, width: borderSize, height: borderSize };
                    
                    const pad = 25;
                    const radius = 20;
                    const x = zone.x + pad + radius + Math.random() * (zone.width - radius * 2 - pad * 2);
                    const y = zone.y + pad + radius + Math.random() * (zone.height - radius * 2 - pad * 2);
                    
                    collectibles.push({ x, y, radius: radius });
                    collectibleTypes.push(inventory[i]);
                }
                
                inventory = [];
                canScoreInTriangle = true;
            }

            // Update game time
            if (gameStartTime) {
                if (timePaused) {
                    remainingTime = gameDuration - Math.floor(pausedTime);
                } else {
                    const elapsed = currentTime - gameStartTime;
                    pausedTime = elapsed;
                    remainingTime = Math.max(0, gameDuration - Math.floor(elapsed));
                    
                    if (elapsed >= gameDuration) {
                        endGame();
                    }
                }
            }
        }

        function draw() {
            // Clear canvas
            ctx.fillStyle = BLACK;
            ctx.fillRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);

            if (gameState.gameActive && team) {
                drawGameWorld();
                drawHUD();
            }
        }

        function drawGameWorld() {
            // Original triangles
            const triangleSize = 180;
            
            // Red triangle (top-right)
            ctx.fillStyle = RED;
            ctx.beginPath();
            ctx.moveTo(WINDOW_WIDTH, 0);
            ctx.lineTo(WINDOW_WIDTH - triangleSize, 0);
            ctx.lineTo(WINDOW_WIDTH, triangleSize);
            ctx.closePath();
            ctx.fill();

            // Blue triangle (top-left)
            ctx.fillStyle = BLUE;
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(triangleSize, 0);
            ctx.lineTo(0, triangleSize);
            ctx.closePath();
            ctx.fill();

            // Black bordered squares
            const borderSize = 160;
            
            // Left square
            ctx.fillStyle = DARK_GREY;
            ctx.fillRect(0, WINDOW_HEIGHT - borderSize, borderSize, borderSize);
            ctx.strokeStyle = WHITE;
            ctx.lineWidth = 4;
            ctx.strokeRect(0, WINDOW_HEIGHT - borderSize, borderSize, borderSize);

            // Right square
            ctx.fillStyle = DARK_GREY;
            ctx.fillRect(WINDOW_WIDTH - borderSize, WINDOW_HEIGHT - borderSize, borderSize, borderSize);
            ctx.strokeStyle = WHITE;
            ctx.strokeRect(WINDOW_WIDTH - borderSize, WINDOW_HEIGHT - borderSize, borderSize, borderSize);

            // Base zones
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
            ctx.lineWidth = 2;
            ctx.setLineDash([10, 10]);
            ctx.beginPath();
            ctx.moveTo(WINDOW_WIDTH / 2, 0);
            ctx.lineTo(WINDOW_WIDTH / 2, WINDOW_HEIGHT);
            ctx.stroke();
            ctx.setLineDash([]);
            
            // Red base (left side)
            ctx.fillStyle = RED;
            ctx.fillRect(redBase.x, redBase.y, redBase.width, redBase.height);
            ctx.strokeStyle = WHITE;
            ctx.lineWidth = 3;
            ctx.strokeRect(redBase.x, redBase.y, redBase.width, redBase.height);
            
            // Blue base (right side)
            ctx.fillStyle = BLUE;
            ctx.fillRect(blueBase.x, blueBase.y, blueBase.width, blueBase.height);
            ctx.strokeStyle = WHITE;
            ctx.strokeRect(blueBase.x, blueBase.y, blueBase.width, blueBase.height);

            // Artifacts
            for (let i = 0; i < collectibles.length; i++) {
                const artifact = collectibles[i];
                ctx.fillStyle = collectibleTypes[i] === "G" ? GREEN : PURPLE;
                ctx.beginPath();
                ctx.arc(artifact.x, artifact.y, artifact.radius, 0, Math.PI * 2);
                ctx.fill();
                ctx.strokeStyle = WHITE;
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.arc(artifact.x, artifact.y, artifact.radius, 0, Math.PI * 2);
                ctx.stroke();
                
                ctx.fillStyle = collectibleTypes[i] === "G" ? 
                    'rgba(255, 255, 200, 0.3)' : 'rgba(255, 200, 255, 0.3)';
                ctx.beginPath();
                ctx.arc(artifact.x, artifact.y, artifact.radius * 0.7, 0, Math.PI * 2);
                ctx.fill();
            }

            // Collector
            ctx.fillStyle = collector.color;
            ctx.fillRect(collector.x, collector.y, collector.width, collector.height);
            ctx.strokeStyle = DARK_GREY;
            ctx.lineWidth = 3;
            ctx.strokeRect(collector.x, collector.y, collector.width, collector.height);
            
            ctx.fillStyle = team === "RED" ? RED : BLUE;
            ctx.beginPath();
            ctx.arc(collector.x + collector.width / 2, collector.y + collector.height / 2, 12, 0, Math.PI * 2);
            ctx.fill();
            
            if (inventory.length > 0 && canScoreInTriangle) {
                ctx.strokeStyle = team === "RED" ? RED : BLUE;
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.arc(collector.x + collector.width / 2, collector.y + collector.height / 2, 
                       collector.width + 10, 0, Math.PI * 2);
                ctx.stroke();
            }
        }

        function drawHUD() {
            ctx.font = "bold 24px Arial";
            ctx.fillStyle = BRIGHT_YELLOW;
            ctx.textAlign = "left";
            ctx.textBaseline = "top";
            
            ctx.fillText(\`Score: \${score}\`, 20, 20);
            
            if (gameState.pauseMenuVisible) {
                ctx.fillStyle = RED;
                ctx.fillText("TIME: PAUSED", 20, 60);
            } else {
                ctx.fillStyle = BRIGHT_YELLOW;
                ctx.fillText(\`Time: \${remainingTime}s\`, 20, 60);
            }
            
            const gCount = inventory.filter(item => item === "G").length;
            const pCount = inventory.filter(item => item === "P").length;
            ctx.fillText(\`Inventory: \${gCount} G, \${pCount} P\`, 20, 100);
            ctx.fillText(\`Motif: \${currentMotif}\`, 20, 140);
            ctx.fillText(\`Team: \${team}\`, 20, 180);
            
            if (inventory.length > 0 && canScoreInTriangle) {
                ctx.fillStyle = team === "RED" ? RED : BLUE;
                ctx.fillText(\`Go to \${team} triangle to score!\`, 20, 220);
            }
            
            ctx.textAlign = "right";
            ctx.fillStyle = GOLD;
            ctx.fillText("TAB - Pause Menu", WINDOW_WIDTH - 20, 20);
            
            ctx.textAlign = "left";
        }

        function setupCollectibles() {
            collectibles = [];
            collectibleTypes = [];
            
            const artifactRadius = 20;
            const borderSize = 160;
            
            // Right side patterns
            const patternsRight = [["G","P","P"], ["P","G","P"], ["P","P","G"]];
            const baseXRight = WINDOW_WIDTH - borderSize + 40;
            const baseYRight = WINDOW_HEIGHT - borderSize - 60;
            
            for (let row = 0; row < patternsRight.length; row++) {
                for (let col = 0; col < patternsRight[row].length; col++) {
                    const x = baseXRight + col * (artifactRadius * 2 + 15);
                    const y = baseYRight - row * (artifactRadius * 2 + 15);
                    collectibles.push({ x, y, radius: artifactRadius });
                    collectibleTypes.push(patternsRight[row][col]);
                }
            }
            
            // Left side patterns
            const patternsLeft = [["P","P","G"], ["P","G","P"], ["G","P","P"]];
            const baseXLeft = 40;
            const baseYLeft = WINDOW_HEIGHT - borderSize - 60;
            
            for (let row = 0; row < patternsLeft.length; row++) {
                for (let col = 0; col < patternsLeft[row].length; col++) {
                    const x = baseXLeft + col * (artifactRadius * 2 + 15);
                    const y = baseYLeft - row * (artifactRadius * 2 + 15);
                    collectibles.push({ x, y, radius: artifactRadius });
                    collectibleTypes.push(patternsLeft[row][col]);
                }
            }
        }

        function collision(rect1, rect2) {
            return rect1.x < rect2.x + rect2.width &&
                   rect1.x + rect1.width > rect2.x &&
                   rect1.y < rect2.y + rect2.height &&
                   rect1.y + rect1.height > rect2.y;
        }

        function updateUITimers(currentTime) {
            // Loading screen timer
            if (gameState.showLoading && introStartTime) {
                const elapsed = currentTime - introStartTime;
                const remaining = Math.max(0, introTotalDuration - elapsed);
                document.getElementById('loadingTimer').textContent = 
                    \`Intro completes in: \${Math.ceil(remaining)}s\`;
                
                const progress = Math.min(1, elapsed / introTotalDuration);
                document.getElementById('loadingFill').style.width = \`\${progress * 100}%\`;
                document.getElementById('loadingText').textContent = 
                    \`Loading... \${Math.floor(progress * 100)}%\`;
            }

            // FTC screen timer
            if (gameState.showFTCScreen && introStartTime) {
                const elapsed = currentTime - introStartTime;
                const remaining = Math.max(0, introTotalDuration - elapsed);
                document.getElementById('ftcTimer').textContent = 
                    \`Auto-advance in: \${Math.ceil(remaining)}s\`;
            }

            // Alliance screen timer
            if (gameState.showAllianceSelect && introStartTime) {
                const elapsed = currentTime - introStartTime;
                const remaining = Math.max(0, introTotalDuration - elapsed);
                document.getElementById('allianceTimer').textContent = 
                    \`Auto-select in: \${Math.ceil(remaining)}s\`;
            }

            // Controls timers
            if (gameState.showControlsPage1 && screenTimers.controls_page1) {
                const elapsed = currentTime - screenTimers.controls_page1;
                const remaining = Math.max(0, screenDurations.controls_page1 - elapsed);
                document.getElementById('controlsTimer1').textContent = 
                    \`Next page in: \${Math.ceil(remaining)}s\`;
            }

            if (gameState.showControlsPage2 && screenTimers.controls_page2) {
                const elapsed = currentTime - screenTimers.controls_page2;
                const remaining = Math.max(0, screenDurations.controls_page2 - elapsed);
                document.getElementById('controlsTimer2').textContent = 
                    \`Next page in: \${Math.ceil(remaining)}s\`;
            }

            if (gameState.showControlsPage3 && screenTimers.controls_page3) {
                const elapsed = currentTime - screenTimers.controls_page3;
                const remaining = Math.max(0, screenDurations.controls_page3 - elapsed);
                document.getElementById('controlsTimer3').textContent = 
                    \`Game starts in: \${Math.ceil(remaining)}s\`;
            }

            // Update overlays
            updateOverlays();
        }

        function updateOverlays() {
            document.getElementById('loadingOverlay').classList.toggle('hidden', !gameState.showLoading);
            document.getElementById('ftcOverlay').classList.toggle('hidden', !gameState.showFTCScreen);
            document.getElementById('allianceOverlay').classList.toggle('hidden', !gameState.showAllianceSelect);
            document.getElementById('controlsOverlay1').classList.toggle('hidden', !gameState.showControlsPage1);
            document.getElementById('controlsOverlay2').classList.toggle('hidden', !gameState.showControlsPage2);
            document.getElementById('controlsOverlay3').classList.toggle('hidden', !gameState.showControlsPage3);
            document.getElementById('pauseOverlay').classList.toggle('hidden', !gameState.pauseMenuVisible);
            document.getElementById('gameOverOverlay').classList.toggle('hidden', !gameState.gameOver);
            document.getElementById('passwordOverlay').classList.toggle('hidden', !gameState.showPasswordPrompt);
            document.getElementById('youtubeOverlay').classList.toggle('hidden', !gameState.showYouTube);
            
            if (gameState.pauseMenuVisible) {
                document.getElementById('pauseStats').innerHTML = \`
                    <div class="stat-item">Score: \${score}</div>
                    <div class="stat-item">Time: \${remainingTime}s</div>
                    <div class="stat-item">Team: \${team || 'None'}</div>
                    <div class="stat-item">Inventory: \${inventory.length}/3</div>
                \`;
            }
            
            if (gameState.gameOver) {
                document.getElementById('finalScore').textContent = \`Final Score: \${score}\`;
                document.getElementById('bonusText').textContent = \`+18 Bonus Points Added!\`;
            }
        }

        function updateLoadingScreen() {
            if (gameState.passwordCorrect) {
                gameState.showLoading = false;
                gameState.showFTCScreen = false;
                gameState.showAllianceSelect = false;
                gameState.showControlsPage1 = false;
                gameState.showControlsPage2 = false;
                gameState.showControlsPage3 = false;
                gameState.gameActive = true;
                gameState.passwordCorrect = false;
                gameState.passwordActive = false;
                gameState.showPasswordPrompt = false;
                gameState.backgroundFrozen = false;
                passwordInput = "";
                
                gameStartTime = Date.now() / 1000;
                pausedTime = 0;
                team = Math.random() < 0.5 ? "RED" : "BLUE";
                
                for (let key in screenTimers) {
                    screenTimers[key] = 0;
                }
                introStartTime = null;
            }
        }

        // UI Functions
        function selectAlliance(selectedTeam) {
            team = selectedTeam;
            gameState.showAllianceSelect = false;
            gameState.showControlsPage1 = true;
            screenTimers.controls_page1 = Date.now() / 1000;
            introStartTime = null;
        }

        function resumeGame() {
            gameState.pauseMenuVisible = false;
            timePaused = false;
        }

        function restartGame() {
            gameState.pauseMenuVisible = false;
            gameState.gameOver = false;
            gameState.gameActive = true;
            timePaused = false;
            
            gameStartTime = Date.now() / 1000;
            pausedTime = 0;
            score = 0;
            inventory = [];
            currentMotif = patterns[Math.floor(Math.random() * patterns.length)];
            canScoreInTriangle = true;
            setupCollectibles();
            
            collector.x = WINDOW_WIDTH / 2 - collectorSize / 2;
            collector.y = WINDOW_HEIGHT / 2 - collectorSize / 2;
        }

        function changeAlliance() {
            gameState.pauseMenuVisible = false;
            gameState.gameActive = false;
            gameState.gameOver = false;
            gameState.showAllianceSelect = true;
            gameState.showControlsPage1 = false;
            gameState.showControlsPage2 = false;
            gameState.showControlsPage3 = false;
            team = null;
            score = 0;
            inventory = [];
            currentMotif = patterns[Math.floor(Math.random() * patterns.length)];
            canScoreInTriangle = true;
            setupCollectibles();
            
            for (let key in screenTimers) {
                screenTimers[key] = 0;
            }
            introStartTime = null;
        }

        function changeMode() {
            gameState.pauseMenuVisible = false;
            timePaused = false;
            gameState.gameActive = false;
            gameState.gameOver = false;
            gameState.showLoading = true;
            gameState.showFTCScreen = false;
            gameState.showAllianceSelect = false;
            gameState.showControlsPage1 = false;
            gameState.showControlsPage2 = false;
            gameState.showControlsPage3 = false;
            team = null;
            score = 0;
            inventory = [];
            currentMotif = patterns[Math.floor(Math.random() * patterns.length)];
            canScoreInTriangle = true;
            setupCollectibles();
            
            for (let key in screenTimers) {
                screenTimers[key] = 0;
            }
            introStartTime = null;
        }

        function quitGame() {
            window.parent.postMessage('closeGameModal', '*');
        }

        function endGame() {
            gameState.gameActive = false;
            gameState.gameOver = true;
            
            if (team === "RED") {
                if (collision(collector, redBase)) {
                    score += 10;
                }
            } else if (team === "BLUE") {
                if (collision(collector, blueBase)) {
                    score += 10;
                }
            }
            
            score += 18;
        }

        // YouTube functions
        function openYouTube() {
            gameState.showYouTube = true;
            gameState.backgroundFrozen = true;
            document.getElementById('youtubeFrame').src = YOUTUBE_URL;
        }

        function closeYouTube() {
            gameState.showYouTube = false;
            gameState.backgroundFrozen = false;
            document.getElementById('youtubeFrame').src = "";
        }

        // Password functions
        function submitPassword() {
            const input = document.getElementById('passwordInput');
            if (input.value.toLowerCase() === "password") {
                openYouTube();
            } else {
                input.value = "";
                input.placeholder = "Wrong password! Try again...";
                input.style.borderColor = "red";
                setTimeout(() => {
                    input.placeholder = "Enter password...";
                    input.style.borderColor = "rgb(100, 150, 255)";
                }, 2000);
            }
        }

        function cancelPassword() {
            document.getElementById('passwordInput').value = "";
            document.getElementById('passwordInput').placeholder = "Enter password...";
            document.getElementById('passwordInput').style.borderColor = "rgb(100, 150, 255)";
            gameState.showPasswordPrompt = false;
            gameState.passwordActive = false;
            gameState.backgroundFrozen = false;
        }

        // Event Listeners
        document.addEventListener('keydown', (e) => {
            const key = e.key.toLowerCase();
            
            // Developer password access
            if (key === 'p' && !gameState.gameActive && !gameState.passwordActive && !gameState.showYouTube) {
                gameState.passwordActive = true;
                gameState.showPasswordPrompt = true;
                gameState.backgroundFrozen = true;
                document.getElementById('passwordInput').focus();
                return;
            }
            
            // Password input
            if (gameState.passwordActive) {
                if (key === 'enter') {
                    submitPassword();
                } else if (key === 'escape') {
                    cancelPassword();
                } else if (key === 'backspace') {
                    passwordInput = passwordInput.slice(0, -1);
                    document.getElementById('passwordInput').value = passwordInput;
                } else if (key.length === 1) {
                    passwordInput += key;
                    document.getElementById('passwordInput').value = passwordInput;
                }
                return;
            }
            
            // Movement keys
            if (key === 'arrowleft' || key === 'a') {
                if (key === 'arrowleft') keys.ArrowLeft = true;
                else keys.a = true;
            }
            if (key === 'arrowright' || key === 'd') {
                if (key === 'arrowright') keys.ArrowRight = true;
                else keys.d = true;
            }
            if (key === 'arrowup' || key === 'w') {
                if (key === 'arrowup') keys.ArrowUp = true;
                else keys.w = true;
            }
            if (key === 'arrowdown' || key === 's') {
                if (key === 'arrowdown') keys.ArrowDown = true;
                else keys.s = true;
            }
            
            // Game controls
            if (gameState.gameActive && !gameState.gameOver) {
                if (key === 'tab') {
                    e.preventDefault();
                    gameState.pauseMenuVisible = !gameState.pauseMenuVisible;
                    timePaused = gameState.pauseMenuVisible;
                }
            }
        });

        document.addEventListener('keyup', (e) => {
            const key = e.key.toLowerCase();
            
            // Movement keys
            if (key === 'arrowleft' || key === 'a') {
                if (key === 'arrowleft') keys.ArrowLeft = false;
                else keys.a = false;
            }
            if (key === 'arrowright' || key === 'd') {
                if (key === 'arrowright') keys.ArrowRight = false;
                else keys.d = false;
            }
            if (key === 'arrowup' || key === 'w') {
                if (key === 'arrowup') keys.ArrowUp = false;
                else keys.w = false;
            }
            if (key === 'arrowdown' || key === 's') {
                if (key === 'arrowdown') keys.ArrowDown = false;
                else keys.s = false;
            }
        });

        // FTC image click
        document.getElementById('ftcImage').addEventListener('click', () => {
            if (gameState.showFTCScreen && !gameState.backgroundFrozen) {
                gameState.showFTCScreen = false;
                gameState.showAllianceSelect = true;
            }
        });

        // Initialize game
        window.onload = init;
    </script>
</body>
</html>`;
