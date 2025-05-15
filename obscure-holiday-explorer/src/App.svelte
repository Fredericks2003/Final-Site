<script lang="ts">
  import { Router, Route, Link } from 'svelte-routing';
  import Calendar from './components/Calendar.svelte';
  import HolidayDetail from './pages/HolidayDetail.svelte';
  import { writable } from 'svelte/store';

  // Create a store for selected holiday to persist between route changes
  const selectedHolidayStore = writable(null);

  // Export the base URL for the router
  export let url = '';

  function handleNavigateToHoliday(event) {
    const holiday = event.detail;
    selectedHolidayStore.set(holiday);
    window.location.href = `#/holiday/${holiday.date}`;
  }
</script>

<main>
  <h1>Obscure Holiday Explorer</h1>
  <Router url={url}>
    <div>
      <Route path="/">
        <Calendar on:navigateToHoliday={handleNavigateToHoliday} />
      </Route>
      <Route path="/holiday/:date" let:params>
        <HolidayDetail holiday={$selectedHolidayStore} />
      </Route>
    </div>
  </Router>
</main>

<style>
  main {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
  }

  h1 {
    margin-bottom: 20px;
  }
</style>