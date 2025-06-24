import React, { useEffect, useRef, useState, useCallback } from "react";
import GameCanvas from "@/components/GameCanvas";

interface GameState {
  playerY: number;
  playerVelocity: number;
  obstacles: Array<{ x: number; height: number; type: "spike" | "block" }>;
  score: number;
  gameOver: boolean;
  gameStarted: boolean;
}

const GameCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const [gameState, setGameState] = useState<GameState>({
    playerY: 300,
    playerVelocity: 0,
    obstacles: [],
    score: 0,
    gameOver: false,
    gameStarted: false,
  });

  const GRAVITY = 0.8;
  const JUMP_FORCE = -15;
  const PLAYER_SIZE = 30;
  const GROUND_Y = 350;
  const GAME_SPEED = 4;

  const resetGame = useCallback(() => {
    setGameState({
      playerY: GROUND_Y - PLAYER_SIZE,
      playerVelocity: 0,
      obstacles: [],
      score: 0,
      gameOver: false,
      gameStarted: true,
    });
  }, []);

  const jump = useCallback(() => {
    if (!gameState.gameStarted) {
      resetGame();
      return;
    }

    if (
      !gameState.gameOver &&
      gameState.playerY >= GROUND_Y - PLAYER_SIZE - 5
    ) {
      setGameState((prev) => ({ ...prev, playerVelocity: JUMP_FORCE }));
    }
  }, [gameState.gameStarted, gameState.gameOver, gameState.playerY, resetGame]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        jump();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [jump]);

  const drawPixelBlock = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    size: number,
    color: string,
    borderColor: string,
  ) => {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, size, size);
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, size, size);
  };

  const gameLoop = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = "#87CEEB";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw ground
    for (let x = 0; x < canvas.width; x += 30) {
      drawPixelBlock(ctx, x, GROUND_Y, 30, "#8B7355", "#654321");
    }

    if (!gameState.gameStarted) {
      // Start screen
      ctx.fillStyle = "#000";
      ctx.font = "32px monospace";
      ctx.textAlign = "center";
      ctx.fillText("MINECRAFTDASH", canvas.width / 2, 150);
      ctx.font = "16px monospace";
      ctx.fillText("Нажми ПРОБЕЛ чтобы играть", canvas.width / 2, 200);
      ctx.fillText("Избегай препятствий!", canvas.width / 2, 220);
      return;
    }

    if (gameState.gameOver) {
      // Game over screen
      ctx.fillStyle = "rgba(0,0,0,0.7)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#fff";
      ctx.font = "32px monospace";
      ctx.textAlign = "center";
      ctx.fillText("ИГРА ОКОНЧЕНА", canvas.width / 2, 150);
      ctx.font = "16px monospace";
      ctx.fillText(`Счет: ${gameState.score}`, canvas.width / 2, 180);
      ctx.fillText("Нажми ПРОБЕЛ для рестарта", canvas.width / 2, 210);
      return;
    }

    // Update game state
    setGameState((prev) => {
      const newState = { ...prev };

      // Update player physics
      newState.playerVelocity += GRAVITY;
      newState.playerY += newState.playerVelocity;

      // Keep player on ground
      if (newState.playerY > GROUND_Y - PLAYER_SIZE) {
        newState.playerY = GROUND_Y - PLAYER_SIZE;
        newState.playerVelocity = 0;
      }

      // Generate obstacles
      if (Math.random() < 0.005) {
        const obstacleType = Math.random() < 0.5 ? "spike" : "block";
        newState.obstacles.push({
          x: canvas.width,
          height: obstacleType === "spike" ? 30 : 60,
          type: obstacleType,
        });
      }

      // Update obstacles
      newState.obstacles = newState.obstacles
        .map((obs) => ({ ...obs, x: obs.x - GAME_SPEED }))
        .filter((obs) => obs.x > -50);

      // Check collisions
      const playerRect = {
        x: 50,
        y: newState.playerY,
        width: PLAYER_SIZE,
        height: PLAYER_SIZE,
      };

      for (const obstacle of newState.obstacles) {
        const obsRect = {
          x: obstacle.x,
          y: GROUND_Y - obstacle.height,
          width: 30,
          height: obstacle.height,
        };

        if (
          playerRect.x < obsRect.x + obsRect.width &&
          playerRect.x + playerRect.width > obsRect.x &&
          playerRect.y < obsRect.y + obsRect.height &&
          playerRect.y + playerRect.height > obsRect.y
        ) {
          newState.gameOver = true;
        }
      }

      // Update score
      newState.score += 1;

      return newState;
    });

    // Draw player (pixelated Steve-like character)
    drawPixelBlock(
      ctx,
      50,
      gameState.playerY,
      PLAYER_SIZE,
      "#00AA00",
      "#008800",
    );
    // Player face
    ctx.fillStyle = "#FFE4B5";
    ctx.fillRect(55, gameState.playerY + 5, 20, 20);
    // Eyes
    ctx.fillStyle = "#000";
    ctx.fillRect(58, gameState.playerY + 8, 3, 3);
    ctx.fillRect(69, gameState.playerY + 8, 3, 3);

    // Draw obstacles
    gameState.obstacles.forEach((obstacle) => {
      if (obstacle.type === "spike") {
        drawPixelBlock(
          ctx,
          obstacle.x,
          GROUND_Y - obstacle.height,
          30,
          "#FF4444",
          "#CC0000",
        );
        // Spike pattern
        ctx.fillStyle = "#AA0000";
        ctx.fillRect(obstacle.x + 5, GROUND_Y - obstacle.height + 5, 20, 10);
      } else {
        drawPixelBlock(
          ctx,
          obstacle.x,
          GROUND_Y - obstacle.height,
          30,
          "#666666",
          "#333333",
        );
        drawPixelBlock(
          ctx,
          obstacle.x,
          GROUND_Y - 30,
          30,
          "#666666",
          "#333333",
        );
      }
    });

    // Draw score
    ctx.fillStyle = "#000";
    ctx.font = "20px monospace";
    ctx.textAlign = "left";
    ctx.fillText(`Счет: ${gameState.score}`, 10, 30);

    animationRef.current = requestAnimationFrame(gameLoop);
  }, [gameState]);

  useEffect(() => {
    if (gameState.gameStarted && !gameState.gameOver) {
      animationRef.current = requestAnimationFrame(gameLoop);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [gameLoop, gameState.gameStarted, gameState.gameOver]);

  useEffect(() => {
    gameLoop();
  }, [gameLoop]);

  return (
    <div className="bg-minecraft-grass rounded-2xl p-6 shadow-lg border-4 border-minecraft-dirt">
      <div className="text-center mb-4">
        <h2 className="text-minecraft-brown text-2xl font-bold mb-2 font-mono pixelated">
          🎮 MINECRAFTDASH
        </h2>
      </div>

      <canvas
        ref={canvasRef}
        width={800}
        height={400}
        className="border-4 border-minecraft-stone bg-sky-200 rounded-lg cursor-pointer"
        onClick={jump}
      />

      <div className="mt-4 text-center">
        <p className="text-minecraft-brown text-sm font-mono">
          ПРОБЕЛ или клик для прыжка • Избегай препятствий!
        </p>
      </div>
    </div>
  );
};

export default GameCanvas;
