<script lang="ts">
  import { onMount } from 'svelte';
  import holidays from '../data/holidays.json';
  
  export let holiday = null;
  
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
  
  function goBackToCalendar() {
    window.location.hash = "#/";
  }
</script>

<div class="holiday-detail">
  <button class="back-button" on:click={goBackToCalendar}>← Back to Calendar</button>
  
  {#if !holiday}
    <div class="loading">
      <p>No holiday selected or holiday information couldn't be loaded.</p>
      <button class="return-button" on:click={goBackToCalendar}>Return to Calendar</button>
    </div>
  {:else}
    <h2>{holiday.name}</h2>
    
    <div class="holiday-content">
      <div class="image-container">
        <div 
          class="placeholder-image" 
          style="background-color: {getHolidayColor(holiday.name)}; color: white; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center;"
        >
          <div style="font-size: 3rem; margin-bottom: 1rem;">
            {getHolidayEmoji(holiday)}
          </div>
          <h3 style="margin: 0;">{holiday.name}</h3>
        </div>
      </div>
      
      <div class="holiday-info">
        <p class="date">Date: {holiday.date}</p>
        <p class="description">{holiday.description}</p>
        
        {#if holiday.funFact}
          <div class="fun-fact">
            <h3>Fun Fact</h3>
            <p>{holiday.funFact}</p>
          </div>
        {/if}
        
        {#if holiday.tags && holiday.tags.length > 0}
          <div class="tags">
            <h3>Tags</h3>
            <div class="tag-list">
              {#each holiday.tags as tag}
                <span class="tag">{tag}</span>
              {/each}
            </div>
          </div>
        {/if}
      </div>
    </div>
  {/if}
</div>

<style>
  .holiday-detail {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    padding: 2rem;
    max-width: 800px;
    margin: 0 auto;
  }
  
  .back-button {
    background-color: darkslateblue;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 0.5rem 1rem;
    cursor: pointer;
    margin-bottom: 1rem;
    transition: background-color 0.2s;
  }
  
  .back-button:hover {
    background-color: #483d8b;
  }
  
  h2 {
    color: darkslateblue;
    border-bottom: 2px solid darkslateblue;
    padding-bottom: 0.5rem;
    margin-bottom: 1.5rem;
  }
  
  h3 {
    color: darkslateblue;
    margin-top: 1.5rem;
    margin-bottom: 0.5rem;
  }
  
  .holiday-content {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
  
  @media (min-width: 768px) {
    .holiday-content {
      flex-direction: row;
    }
  }
  
  .image-container {
    flex: 1;
  }
  
  img {
    width: 100%;
    max-width: 400px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  .placeholder-image {
    background-color: #f5f5f5;
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    color: #999;
  }
  
  .holiday-info {
    flex: 1;
  }
  
  .date {
    font-weight: bold;
    color: darkslateblue;
    margin-bottom: 1rem;
  }
  
  .description {
    line-height: 1.6;
    margin-bottom: 1rem;
  }
  
  .fun-fact {
    background-color: #f9f9f9;
    border-left: 4px solid darkslateblue;
    padding: 1rem;
    border-radius: 0 4px 4px 0;
    margin: 1.5rem 0;
  }
  
  .tag-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  
  .tag {
    background-color: #f0f0f0;
    color: darkslateblue;
    padding: 0.3rem 0.8rem;
    border-radius: 20px;
    font-size: 0.9rem;
    display: inline-block;
  }
  
  .loading {
    text-align: center;
    padding: 2rem;
    color: #666;
  }
  
  .return-button {
    background-color: darkslateblue;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 0.5rem 1rem;
    cursor: pointer;
    margin-top: 1rem;
    transition: background-color 0.2s;
  }
  
  .return-button:hover {
    background-color: #483d8b;
  }
</style>