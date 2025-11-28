import React from 'react';

const PuzzleCaptcha = ({ 
  sliderPosition, 
  targetPosition, 
  captchaCompleted, 
  isDragging, 
  sliderContainerRef,
  handleSliderMouseDown,
  handleSliderTouchStart 
}) => {
  // Calculate if piece is in correct position
  const pieceInPlace = Math.abs(sliderPosition - targetPosition) < 20;
  
  // Playing Card Component
  const PlayingCard = ({ isSlot = false, style = {} }) => (
    <div 
      className={`relative ${isSlot ? 'opacity-50' : ''}`}
      style={{
        width: '70px',
        height: '100px',
        ...style
      }}
    >
      {isSlot ? (
        // Empty slot design
        <div className="w-full h-full rounded-lg border-3 border-dashed border-gray-400 bg-gray-800/30 shadow-inner flex items-center justify-center">
          <div className="text-center">
            <span className="text-3xl text-gray-400">?</span>
            <div className="text-[10px] text-gray-400 mt-1">SLOT</div>
          </div>
        </div>
      ) : (
        // Actual playing card
        <div className="w-full h-full rounded-lg bg-white border-2 border-gray-800 shadow-xl relative overflow-hidden">
          {/* Card pattern background */}
          <div className="absolute inset-0 bg-gradient-to-br from-red-600 to-red-800"></div>
          
          {/* Card symbols */}
          <div className="absolute inset-0 flex flex-col justify-between p-1">
            <div className="text-white text-xs font-bold text-left">J♠</div>
            <div className="text-white text-3xl font-bold text-center">♠</div>
            <div className="text-white text-xs font-bold text-right rotate-180">J♠</div>
          </div>
          
          {/* Center design */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white/20 rounded-full w-12 h-12 flex items-center justify-center">
              <span className="text-white font-black text-lg">J</span>
            </div>
          </div>
          
          {/* Card shine effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent pointer-events-none"></div>
        </div>
      )}
    </div>
  );
  
  return (
    <div className="w-full">
      <p className="text-gray-700 text-sm mb-3 text-center font-medium">
        🎰 İskambil kartını doğru yere yerleştirin
      </p>
      
      {/* Casino-themed Puzzle Container */}
      <div className="relative w-full h-[160px] rounded-lg overflow-visible mb-6 shadow-xl" 
        style={{
          background: 'radial-gradient(ellipse at center, #1a5f1a 0%, #0d2e0d 100%)'
        }}
      >
        {/* Casino table pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full" style={{
            backgroundImage: `repeating-linear-gradient(
              90deg,
              transparent,
              transparent 20px,
              rgba(255,255,255,.05) 20px,
              rgba(255,255,255,.05) 21px
            ), repeating-linear-gradient(
              0deg,
              transparent,
              transparent 20px,
              rgba(255,255,255,.05) 20px,
              rgba(255,255,255,.05) 21px
            )`
          }}></div>
        </div>

        {/* Casino chips decoration */}
        <div className="absolute top-2 left-4 w-8 h-8 rounded-full bg-red-600 border-4 border-white opacity-50"></div>
        <div className="absolute bottom-2 right-4 w-8 h-8 rounded-full bg-blue-600 border-4 border-white opacity-50"></div>
        <div className="absolute top-2 right-8 w-8 h-8 rounded-full bg-green-600 border-4 border-white opacity-50"></div>

        {/* Main game area */}
        <div className="absolute inset-0 flex items-center justify-between px-8">
          {/* Left side - Starting position indicator */}
          <div className="relative" style={{ width: '70px', height: '100px' }}>
            <div className="absolute inset-0 border-2 border-dashed border-yellow-400/50 rounded-lg"></div>
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-yellow-400 text-xs">START</div>
          </div>

          {/* Center arrows */}
          <div className="flex items-center gap-2 opacity-30">
            <span className="text-white text-2xl animate-pulse">→</span>
            <span className="text-white text-2xl animate-pulse animation-delay-100">→</span>
            <span className="text-white text-2xl animate-pulse animation-delay-200">→</span>
          </div>

          {/* Right side - Target slot */}
          <div className="relative">
            <PlayingCard isSlot={true} />
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-yellow-400 text-xs font-bold">TARGET</div>
          </div>
        </div>

        {/* Moving playing card - positioned to align with slot */}
        <div 
          className={`absolute z-20 transition-all ${
            pieceInPlace && captchaCompleted ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
          }`}
          style={{ 
            // Adjusted calculation: at 250px slider position (80%), card should be at slot position
            // Slot is at right: 30px from the container edge (container width ~400px)
            // So slot is approximately at 300px from left
            // When slider is at 250px, card should be at 300px
            // Formula: 30 (start) + sliderPosition * 1.08 (scale factor)
            left: `${30 + sliderPosition * 0.94}px`,
            top: '50%',
            transform: `translateY(-50%) ${isDragging ? 'rotate(-5deg) scale(1.1)' : 'rotate(0deg) scale(1)'}`,
            transition: isDragging ? 'left 0.02s linear, transform 0.1s' : 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          <PlayingCard />
        </div>

        {/* Success animation - JACKPOT style */}
        {captchaCompleted && (
          <div className="absolute inset-0 pointer-events-none z-30">
            <div className="absolute inset-0 bg-gradient-to-r from-green-400/30 to-emerald-400/30 animate-pulse rounded-lg"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                <div className="absolute inset-0 bg-yellow-400 rounded-full animate-ping"></div>
                <div className="relative bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full p-4 shadow-2xl">
                  <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                <span className="text-yellow-400 font-black text-lg animate-pulse">JACKPOT!</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Slider Track - Casino style */}
      <div 
        ref={sliderContainerRef}
        className="relative w-full h-[50px] rounded-xl select-none touch-none shadow-inner overflow-hidden border-2 border-gray-700"
        style={{
          background: 'linear-gradient(to right, #2d3748 0%, #1a202c 50%, #000000 100%)'
        }}
      >
        {/* Gold trim decoration */}
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600"></div>
        
        {/* Track background text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <p className={`text-sm font-bold transition-all duration-300 ${
            captchaCompleted ? 'text-yellow-400 scale-110' : 'text-gray-400'
          }`}>
            {captchaCompleted ? '🎰 WIN!' : '← SLIDE →'}
          </p>
        </div>

        {/* Progress bar */}
        <div 
          className={`absolute left-0 top-0 h-full pointer-events-none z-0 transition-all`}
          style={{ 
            width: `${sliderPosition + 55}px`,
            transition: isDragging ? 'none' : 'all 0.3s ease',
            background: captchaCompleted 
              ? 'linear-gradient(to right, rgba(250, 204, 21, 0.3), rgba(250, 204, 21, 0.5))'
              : 'linear-gradient(to right, rgba(239, 68, 68, 0.2), rgba(239, 68, 68, 0.4))'
          }}
        ></div>

        {/* Slider Button - Casino Chip Style */}
        <div 
          className={`absolute left-0 top-1/2 -translate-y-1/2 h-[40px] w-[55px] z-20 rounded-full flex items-center justify-center transition-all ${
            captchaCompleted 
              ? 'bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-yellow-500/50' 
              : 'bg-gradient-to-br from-red-600 to-red-800 shadow-red-500/50'
          } ${
            isDragging ? 'cursor-grabbing scale-110' : 'cursor-grab scale-100 hover:scale-105'
          } shadow-xl border-4 border-white`}
          style={{ 
            left: `${sliderPosition}px`,
            transition: isDragging ? 'left 0.02s linear' : 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
          onMouseDown={handleSliderMouseDown}
          onTouchStart={handleSliderTouchStart}
        >
          {/* Casino chip design */}
          <div className="absolute inset-1 rounded-full border-2 border-white/50"></div>
          
          {/* Button content */}
          <div className="relative z-10">
            {captchaCompleted ? (
              <span className="text-white font-black text-lg">$</span>
            ) : (
              <span className="text-white font-black text-sm">♠♦</span>
            )}
          </div>
          
          {/* Chip shine effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/20 to-white/30 rounded-full pointer-events-none"></div>
        </div>
      </div>
    </div>
  );
};

export default PuzzleCaptcha;
