<script lang="ts">
  import { onMount } from 'svelte';
  import holidays from '../data/holidays.json';
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';
  import { fade } from 'svelte/transition';
  
  function getHolidayColor(name) {
    const colors = [
      '#4a7c59',
      '#845EC2',
      '#D65DB1',
      '#FF6F91',
      '#FF9671',
      '#FFC75F',
      '#2C73D2',
      '#0089BA',
      '#008F7A',
      '#C34A36'
    ];
    
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = ((hash << 5) - hash) + name.charCodeAt(i);
      hash |= 0;
    }
    
    const index = Math.abs(hash) % colors.length;
    return colors[index];
  }
  
  function getHolidayEmoji(holiday) {
    const tagEmojis = {
      'food': '🍽️',
      'quirky': '🤪',
      'global': '🌎',
      'awareness': '🧠',
      'technology': '💻',
      'animals': '🐾',
      'environment': '🌱',
      'education': '📚',
      'fun': '🎉',
      'science': '🔬',
      'nature': '🌿',
      'family': '👪',
      'health': '❤️',
      'language': '💬',
      'pop culture': '🎬',
      'peace': '☮️',
      'mathematics': '🔢',
      'conservation': '🌍',
      'communication': '📱',
      'humor': '😂',
      'movies': '🎬',
      'sci-fi': '👽',
      'pets': '🐶',
      'digital': '💾'
    };
    
    if (holiday.tags && holiday.tags.length > 0) {
      for (const tag of holiday.tags) {
        if (tagEmojis[tag]) {
          return tagEmojis[tag];
        }
      }
    }
    
    if (holiday.name.includes('Pi Day')) return '🥧';
    if (holiday.name.includes('Star Wars')) return '✨';
    if (holiday.name.includes('Emoji')) return '😀';
    if (holiday.name.includes('Cat')) return '😺';
    if (holiday.name.includes('Penguin')) return '🐧';
    if (holiday.name.includes('Family')) return '👪';
    if (holiday.name.includes('Ice Cream')) return '🍦';
    if (holiday.name.includes('Nothing')) return '🤷';
    if (holiday.name.includes('Pirate')) return '🏴‍☠️';
    if (holiday.name.includes('Mountain')) return '🏔️';
    if (holiday.name.includes('Tongue Twister')) return '👅';
    
    return '🎊';
  }
  
  let selectedHoliday = null;
  let isSpinning = false;
  let confetti = [];
  
  const rotation = tweened(0, {
    duration: 2000,
    easing: cubicOut
  });
  
  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  function getRandomHoliday() {
    isSpinning = true;
    selectedHoliday = null;
    
    rotation.set(0, { duration: 0 });
    
    rotation.set(360 * 3 + getRandomNumber(0, 360), {
      duration: 3000,
      easing: cubicOut
    });
    
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * holidays.length);
      selectedHoliday = holidays[randomIndex];
      isSpinning = false;
      createConfetti();
    }, 3000);
  }
  
  function createConfetti() {
    confetti = [];
    for (let i = 0; i < 100; i++) {
      confetti.push({
        x: 50,
        y: 50,
        size: getRandomNumber(5, 10),
        color: getRandomColor(),
        speedX: getRandomNumber(-5, 5),
        speedY: getRandomNumber(-2, 5),
        opacity: 1
      });
    }
    
    let frameId;
    const animateConfetti = () => {
      confetti = confetti.map(particle => {
        return {
          ...particle,
          x: particle.x + particle.speedX,
          y: particle.y + particle.speedY,
          opacity: particle.opacity - 0.01
        };
      }).filter(particle => particle.opacity > 0);
      
      if (confetti.length > 0) {
        frameId = requestAnimationFrame(animateConfetti);
      }
    };
    
    frameId = requestAnimationFrame(animateConfetti);
    
    return () => {
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
    };
  }
  
  function getRandomColor() {
    const colors = [
      '#FF5252',
      '#FFEB3B',
      '#2196F3',
      '#4CAF50',
      '#9C27B0',
      '#FF9800'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }
  
  function viewHolidayDetails() {
    if (selectedHoliday) {
      window.location.href = `#/holiday/${selectedHoliday.date}`;
    }
  }
  
  onMount(() => {});
</script>

<div class="random-holiday-page">
  <h1>Holiday Randomizer</h1>
  <p class="subtitle">Spin the wheel to discover an obscure holiday!</p>
  
  <div class="wheel-container">
    <div class="confetti-container">
      {#each confetti as particle}
        <div 
          class="confetti" 
          style="left: {particle.x}%; top: {particle.y}%; width: {particle.size}px; height: {particle.size}px; background-color: {particle.color}; opacity: {particle.opacity};">
        </div>
      {/each}
    </div>
    
    <div 
      class="wheel" 
      style="transform: rotate({$rotation}deg);"
    >
      <!-- Wheel segments representing holidays -->
      {#each Array(12) as _, i}
        <div 
          class="segment" 
          style="transform: rotate({i * 30}deg);"
        >
          <div class="segment-content" style="background-color: {getRandomColor()};">
            {i + 1}
          </div>
        </div>
      {/each}
      
      <!-- Center of wheel -->
      <div class="wheel-center"></div>
    </div>
    
    <!-- Spinner arrow -->
    <div class="spinner-arrow"></div>
  </div>
  
  <button 
    class="spin-button" 
    on:click={getRandomHoliday} 
    disabled={isSpinning}
  >
    {isSpinning ? 'Spinning...' : 'Spin the Wheel!'}
  </button>
  
  {#if selectedHoliday}
    <div class="result-container" in:fade={{ duration: 500 }}>
      <h2>{selectedHoliday.name}</h2>
      <p class="date">{selectedHoliday.date}</p>
      
      <div class="holiday-preview">
        <div class="image-container">
          <div 
            class="placeholder-image" 
            style="background-color: {getHolidayColor(selectedHoliday.name)}; color: white; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center;"
          >
            <div style="font-size: 3rem; margin-bottom: 1rem;">
              {getHolidayEmoji(selectedHoliday)}
            </div>
            <h3 style="margin: 0;">{selectedHoliday.name}</h3>
          </div>
        </div>
        
        <div class="holiday-info">
          <p class="description">{selectedHoliday.description}</p>
          
          {#if selectedHoliday.tags && selectedHoliday.tags.length > 0}
            <div class="tags">
              {#each selectedHoliday.tags as tag}
                <span class="tag">{tag}</span>
              {/each}
            </div>
          {/if}
          
          <button class="view-button" on:click={viewHolidayDetails}>
            View Full Details
          </button>
        </div>
      </div>
    </div>
  {/if}
</div>

<style>
  .random-holiday-page {
    max-width: 1000px;
    margin: 0 auto;
    padding: 2rem;
    text-align: center;
  }
  
  h1 {
    color: darkslateblue;
    margin-bottom: 0.5rem;
  }
  
  .subtitle {
    color: #666;
    margin-bottom: 3rem;
  }
  
  .wheel-container {
    position: relative;
    width: 300px;
    height: 300px;
    margin: 0 auto 3rem;
  }
  
  .wheel {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #f0f0f0;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    transition: transform 3s cubic-bezier(0.2, 0.8, 0.2, 1);
  }
  
  .wheel-center {
    position: absolute;
    width: 30px;
    height: 30px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: darkslateblue;
    border-radius: 50%;
    z-index: 2;
  }
  
  .segment {
    position: absolute;
    width: 50%;
    height: 2px;
    background: transparent;
    top: 50%;
    left: 50%;
    transform-origin: left center;
    z-index: 1;
  }
  
  .segment-content {
    position: absolute;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
    right: -20px;
    top: -20px;
  }
  
  .spinner-arrow {
    position: absolute;
    top: -20px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 15px solid transparent;
    border-right: 15px solid transparent;
    border-top: 30px solid darkslateblue;
    z-index: 3;
  }
  
  .spin-button {
    background-color: darkslateblue;
    color: white;
    border: none;
    border-radius: 30px;
    padding: 1rem 2rem;
    font-size: 1.2rem;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.2s;
    margin-bottom: 2rem;
  }
  
  .spin-button:hover:not(:disabled) {
    background-color: #483d8b;
    transform: scale(1.05);
  }
  
  .spin-button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  
  .result-container {
    margin-top: 2rem;
    padding: 2rem;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  .result-container h2 {
    color: darkslateblue;
    margin-top: 0;
  }
  
  .date {
    font-weight: bold;
    color: #666;
    margin-bottom: 1.5rem;
  }
  
  .holiday-preview {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
  
  @media (min-width: 768px) {
    .holiday-preview {
      flex-direction: row;
      align-items: center;
    }
  }
  
  .image-container {
    flex: 1;
    max-width: 300px;
    margin: 0 auto;
  }
  
  img {
    width: 100%;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  .placeholder-image {
    background-color: #f5f5f5;
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    color: #999;
  }
  
  .holiday-info {
    flex: 2;
    text-align: left;
  }
  
  .description {
    line-height: 1.6;
  }
  
  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
  }
  
  .tag {
    background-color: #f0f0f0;
    color: darkslateblue;
    padding: 0.3rem 0.8rem;
    border-radius: 20px;
    font-size: 0.9rem;
    display: inline-block;
  }
  
  .view-button {
    background-color: darkslateblue;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 0.75rem 1.5rem;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .view-button:hover {
    background-color: #483d8b;
  }
  
  .confetti-container {
    position: absolute;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 10;
  }
  
  .confetti {
    position: absolute;
    border-radius: 50%;
  }
  
  /* Fade-in animation for result container */
  @keyframes fade {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  .fade {
    animation: fade 0.5s;
  }
</style>