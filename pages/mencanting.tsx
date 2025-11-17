import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Play, Pause, Volume2, VolumeX, RotateCcw, Award, Star, Target } from 'lucide-react';

const MencantingGame = () => {
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'finished'>('idle');
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // Sample batik patterns for different levels
  const batikPatterns = {
    1: {
      name: "Motif Kawung Dasar",
      image: "/kawung-pattern.png",
      description: "Ikuti pola lingkaran kawung dengan tepat",
      targetScore: 80,
      timeLimit: 180
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = 800;
    canvas.height = 600;

    // Initialize canvas
    ctx.fillStyle = '#fef3c7';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#92400e';

    // Draw sample guide (in real app, this would be the batik pattern image)
    drawGuidePattern(ctx);
  }, []);

  const drawGuidePattern = (ctx: CanvasRenderingContext2D) => {
    // Draw a simple guide pattern (circles for kawung)
    ctx.strokeStyle = '#d1d5db';
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);

    const centerX = 400;
    const centerY = 300;
    const radius = 200;

    // Draw main circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.stroke();

    // Draw smaller circles
    for (let i = 0; i < 8; i++) {
      const angle = (i * Math.PI) / 4;
      const x = centerX + Math.cos(angle) * radius * 0.6;
      const y = centerY + Math.sin(angle) * radius * 0.6;
      
      ctx.beginPath();
      ctx.arc(x, y, radius * 0.2, 0, 2 * Math.PI);
      ctx.stroke();
    }

    ctx.setLineDash([]);
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (gameState !== 'playing') return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setIsDrawing(true);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = '#92400e';
    ctx.lineWidth = 3;
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || gameState !== 'playing') return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();

    // Update progress based on drawing (simplified)
    setProgress(prev => Math.min(prev + 0.1, 100));
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const startGame = () => {
    setGameState('playing');
    setProgress(0);
    setScore(0);
    // In real app, start timer and game logic
  };

  const finishGame = () => {
    setGameState('finished');
    const finalScore = Math.min(100, Math.floor(progress + Math.random() * 20));
    setScore(finalScore);
  };

  const resetGame = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = '#fef3c7';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawGuidePattern(ctx);

    setGameState('idle');
    setProgress(0);
    setScore(0);
  };

  const toggleMusic = () => {
    setIsMusicPlaying(!isMusicPlaying);
    // In real app, this would control background music
  };

  const currentLevel = batikPatterns[level as keyof typeof batikPatterns];

  return (
    <>
      <Head>
        <title>Game Mencanting - Desa Wisata Batik Giriloyo</title>
        <meta name="description" content="Belajar membatik secara virtual dengan game mencanting interaktif" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
        <Navbar />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          {/* Header */}
          <div className="text-center mb-8 lg:mb-12">
            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-bold mb-4">
              <Target className="w-5 h-5" />
              <span>Game Edukasi</span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-stone-800 mb-4">
              Mencanting Virtual
            </h1>
            <p className="text-lg lg:text-xl text-stone-600 max-w-2xl mx-auto">
              Rasakan pengalaman membatik secara digital! Ikuti pola tradisional dan pelajari seni batik tulis.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Game Area */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                {/* Game Header */}
                <div className="bg-gradient-to-r from-amber-800 to-amber-900 text-white p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold">{currentLevel.name}</h2>
                      <p className="text-amber-200">{currentLevel.description}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-amber-200 text-sm">Level</p>
                        <p className="text-xl font-bold">{level}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-amber-200 text-sm">Skor</p>
                        <p className="text-xl font-bold">{score}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="bg-amber-50 px-6 py-3">
                  <div className="flex items-center justify-between text-sm text-amber-800 mb-2">
                    <span>Progress Mencanting</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <div className="w-full bg-amber-200 rounded-full h-3">
                    <div 
                      className="bg-amber-600 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Canvas Area */}
                <div className="p-6">
                  <div className="relative bg-stone-100 rounded-2xl overflow-hidden border-4 border-stone-200">
                    {/* Batik Pattern Background */}
                    <div 
                      className="absolute inset-0 opacity-20"
                      style={{
                        backgroundImage: `url('${currentLevel.image}')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                      }}
                    />
                    
                    {/* Drawing Canvas */}
                    <canvas
                      ref={canvasRef}
                      onMouseDown={startDrawing}
                      onMouseMove={draw}
                      onMouseUp={stopDrawing}
                      onMouseLeave={stopDrawing}
                      className="relative z-10 w-full h-96 lg:h-[500px] cursor-crosshair bg-transparent"
                    />
                    
                    {/* Game Overlay */}
                    {gameState === 'idle' && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20">
                        <div className="text-center text-white p-8">
                          <Target size={64} className="mx-auto mb-4" />
                          <h3 className="text-2xl font-bold mb-4">Siap Mencanting?</h3>
                          <p className="text-amber-200 mb-6">Ikuti pola batik di bawah dengan canting virtual</p>
                          <button
                            onClick={startGame}
                            className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-8 py-4 rounded-full font-bold hover:shadow-xl transition transform hover:scale-105"
                          >
                            Mulai Mencanting
                          </button>
                        </div>
                      </div>
                    )}

                    {gameState === 'finished' && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20">
                        <div className="text-center text-white p-8">
                          <Award size={64} className="mx-auto mb-4 text-amber-400" />
                          <h3 className="text-2xl font-bold mb-2">Selamat!</h3>
                          <p className="text-2xl font-bold text-amber-400 mb-4">{score} Poin</p>
                          <p className="text-amber-200 mb-6">
                            {score >= currentLevel.targetScore 
                              ? 'Luar biasa! Hasil cantingan Anda sangat bagus! 🎉'
                              : 'Bagus! Terus latih keterampilan mencanting Anda! ✨'
                            }
                          </p>
                          <div className="flex gap-4 justify-center">
                            <button
                              onClick={resetGame}
                              className="bg-white text-amber-800 px-6 py-3 rounded-full font-bold hover:bg-amber-50 transition"
                            >
                              Main Lagi
                            </button>
                            <button className="bg-amber-600 text-white px-6 py-3 rounded-full font-bold hover:bg-amber-700 transition">
                              Level Berikutnya
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between mt-6">
                <div className="flex items-center gap-4">
                  <button
                    onClick={resetGame}
                    className="bg-white text-stone-800 border-2 border-stone-300 p-3 rounded-full hover:bg-stone-100 transition"
                  >
                    <RotateCcw size={20} />
                  </button>
                  
                  <button
                    onClick={toggleMusic}
                    className="bg-white text-stone-800 border-2 border-stone-300 p-3 rounded-full hover:bg-stone-100 transition"
                  >
                    {isMusicPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
                  </button>
                </div>

                {gameState === 'playing' && (
                  <button
                    onClick={finishGame}
                    className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-full font-bold hover:shadow-xl transition"
                  >
                    Selesai Mencanting
                  </button>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Instructions */}
              <div className="bg-white rounded-3xl shadow-xl p-6 lg:p-8">
                <h3 className="text-xl font-bold text-stone-800 mb-4 flex items-center gap-2">
                  <Star className="text-amber-600" />
                  Cara Bermain
                </h3>
                <div className="space-y-3 text-stone-600">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-amber-800 font-bold text-sm">1</span>
                    </div>
                    <p>Klik dan tahan mouse untuk mulai mencanting</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-amber-800 font-bold text-sm">2</span>
                    </div>
                    <p>Ikuti pola batik yang terlihat samar di latar belakang</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-amber-800 font-bold text-sm">3</span>
                    </div>
                    <p>Usahakan garis rapi dan mengikuti pola dengan tepat</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-amber-800 font-bold text-sm">4</span>
                    </div>
                    <p>Klik "Selesai Mencanting" ketika sudah selesai</p>
                  </div>
                </div>
              </div>

              {/* Level Info */}
              <div className="bg-gradient-to-br from-amber-100 to-orange-100 rounded-3xl p-6 lg:p-8 border border-amber-200">
                <h3 className="font-bold text-stone-800 mb-4">Level {level}</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-stone-600">Motif:</span>
                    <span className="font-semibold text-stone-800">{currentLevel.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-600">Target Skor:</span>
                    <span className="font-semibold text-amber-700">{currentLevel.targetScore}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-600">Waktu:</span>
                    <span className="font-semibold text-stone-800">{currentLevel.timeLimit}s</span>
                  </div>
                </div>
              </div>

              {/* Achievement */}
              <div className="bg-white rounded-3xl shadow-xl p-6 lg:p-8">
                <h3 className="text-xl font-bold text-stone-800 mb-4">Pencapaian</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-2xl">
                    <Award className="text-amber-600" size={24} />
                    <div>
                      <p className="font-semibold text-stone-800">Pemula Batik</p>
                      <p className="text-sm text-stone-600">Selesaikan Level 1</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-stone-100 rounded-2xl opacity-50">
                    <Award className="text-stone-400" size={24} />
                    <div>
                      <p className="font-semibold text-stone-400">Ahli Canting</p>
                      <p className="text-sm text-stone-400">Capai skor 90 di semua level</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default MencantingGame;