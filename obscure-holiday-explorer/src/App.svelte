<script lang="ts">
  import { onMount } from 'svelte';
  import Calendar from './components/Calendar.svelte';
  import HolidayDetail from './pages/HolidayDetail.svelte';
  import RandomHoliday from './pages/RandomHoliday.svelte';
  import HolidayQuiz from './pages/HolidayQuiz.svelte';
  import CreateHoliday from './pages/CreateHoliday.svelte';
  import IntroPage from './pages/IntroPage.svelte';
  import { writable } from 'svelte/store';
  import holidays from './data/holidays.json';
  
  const selectedHolidayStore = writable(null);
  let currentPage = '/';
  
  function navigateTo(page) {
    currentPage = page;
    window.location.hash = `#${page}`;
  }
  
  function handleNavigateToHoliday(event) {
    const holiday = event.detail.holiday;
    selectedHolidayStore.set(holiday);
    navigateTo(`/holiday/${holiday.date}`);
  }
  
  function parseHash() {
    let hash = window.location.hash;
    
    if (hash.startsWith('#')) {
      hash = hash.substring(1);
    }
    
    if (!hash) {
      hash = '/';
    }
    
    if (hash.startsWith('/holiday/')) {
      const dateParam = hash.split('/').pop();
      if (dateParam) {
        const foundHoliday = holidays.find(h => h.date === dateParam);
        if (foundHoliday) {
          selectedHolidayStore.set(foundHoliday);
        }
      }
    }
    
    return hash;
  }
  
  onMount(() => {
    currentPage = parseHash();
    
    const handleHashChange = () => {
      currentPage = parseHash();
    };
    
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  });
</script>

<div class="app">
  <header>
    <div class="header-content">
      <h1>Obscure Holiday Explorer</h1>
      <p class="subtitle">Discover unusual and fun holidays throughout the year!</p>
    </div>
  </header>
  
  <nav class="main-nav">
    <div class="nav-container">
      <a href="#/" on:click|preventDefault={() => navigateTo('/')} class:active={currentPage === '/'}>
        <span class="icon">📅</span>
        <span class="label">Calendar</span>
      </a>
      <a href="#/random" on:click|preventDefault={() => navigateTo('/random')} class:active={currentPage === '/random'}>
        <span class="icon">🎲</span>
        <span class="label">Randomizer</span>
      </a>
      <a href="#/quiz" on:click|preventDefault={() => navigateTo('/quiz')} class:active={currentPage === '/quiz'}>
        <span class="icon">🎮</span>
        <span class="label">Quiz</span>
      </a>
      <a href="#/create" on:click|preventDefault={() => navigateTo('/create')} class:active={currentPage === '/create'}>
        <span class="icon">✏️</span>
        <span class="label">Create</span>
      </a>
    </div>
  </nav>
  
  <main>
    {#if currentPage === '/'}
      <IntroPage />
      <Calendar on:navigateToHoliday={handleNavigateToHoliday} />
    {:else if currentPage.startsWith('/holiday/')}
      <HolidayDetail holiday={$selectedHolidayStore} />
    {:else if currentPage === '/random'}
      <RandomHoliday />
    {:else if currentPage === '/quiz'}
      <HolidayQuiz />
    {:else if currentPage === '/create'}
      <CreateHoliday />
    {/if}
  </main>
    
    <footer>
      <p>Obscure Holiday Explorer - ICS-200 Final Project</p>
      <p class="tagline">Because every day deserves to be celebrated!</p>
    </footer>
  </div>

<style>
  .app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    font-family: 'Arial', sans-serif;
  }
  
  header {
    background-color: darkslateblue;
    color: white;
    padding: 1.5rem;
  }
  
  .header-content {
    max-width: 1200px;
    margin: 0 auto;
    text-align: center;
  }
  
  h1 {
    margin: 0;
    font-size: 2rem;
  }
  
  .subtitle {
    margin: 0.5rem 0;
    font-size: 1rem;
    opacity: 0.9;
  }
  
  .main-nav {
    background-color: var(--nav-bg);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    position: sticky;
    top: 0;
    z-index: 100;
  }
  
  .nav-container {
    display: flex;
    justify-content: space-around;
    max-width: 800px;
    margin: 0 auto;
  }
  
  .main-nav a {
    color: var(--nav-text);
    text-decoration: none;
    padding: 1rem 0;
    flex: 1;
    text-align: center;
    border-bottom: 3px solid transparent;
    transition: all 0.3s;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .main-nav a:hover {
    color: var(--nav-active-text);
    background-color: var(--nav-hover-bg);
    text-decoration: none;
  }
  
  .main-nav a.active {
    color: var(--nav-active-text);
    border-bottom: 3px solid var(--nav-active-border);
    font-weight: bold;
  }
  
  .icon {
    font-size: 1.5rem;
    margin-bottom: 0.25rem;
  }
  
  .label {
    font-size: 0.9rem;
    font-weight: bold;
  }
  
  /* Responsive styles for mobile devices */
  @media (max-width: 480px) {
    .icon {
      font-size: 1.2rem;
    }
    
    .label {
      font-size: 0.7rem;
    }
    
    .main-nav a {
      padding: 0.75rem 0;
    }
  }
  
  main {
    flex: 1;
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
    background-color: #f9f9f9;
  }
  
  footer {
    background-color: #f0f0f0;
    padding: 1rem;
    text-align: center;
    margin-top: auto;
    border-top: 1px solid #ddd;
  }
  
  .tagline {
    margin-top: 0.25rem;
    font-size: 0.9rem;
    color: #666;
  }
</style>