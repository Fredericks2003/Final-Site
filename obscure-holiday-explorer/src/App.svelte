<script lang="ts">
  import Calendar from './components/Calendar.svelte';
</script>

<main>
  <h1>Obscure Holiday Explorer</h1>
  <Calendar />
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