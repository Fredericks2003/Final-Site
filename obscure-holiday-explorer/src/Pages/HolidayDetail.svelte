<script lang="ts">
  import { onMount } from 'svelte';
  import { getContext } from 'svelte';
  import holidays from '../data/holidays.json';
  import { useParams } from 'svelte-routing';
  import { navigate } from 'svelte-routing';

  export let holiday;

  const params = useParams();
  let currentHoliday;

  onMount(() => {
    const holidayDate = params.date;
    currentHoliday = holidays.find(h => h.date === holidayDate);

    if (!currentHoliday) {
      navigate('/');
    }
  });

  function goBackToCalendar() {
    navigate('/');
  }
</script>

<style>
  .holiday-detail {
    padding: 20px;
    max-width: 600px;
    margin: 20px auto;
    border: 1px solid #eee;
    border-radius: 8px;
    background-color: #f9f9f9;
  }

  h2 {
    color: darkslateblue;
    margin-bottom: 10px;
  }

  .date {
    font-style: italic;
    color: #777;
    margin-bottom: 15px;
  }

  .description {
    line-height: 1.6;
    margin-bottom: 15px;
  }

  .fun-fact-title {
    font-weight: bold;
    margin-top: 15px;
    color: darkslategray;
  }

  .media-container {
    margin-top: 20px;
    text-align: center;
  }

  .media {
    max-width: 100%;
    height: auto;
    border-radius: 4px;
  }

  button {
    padding: 10px 15px;
    background-color: #eee;
    border: 1px solid #ccc;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1em;
    margin-top: 20px;
  }

  button:hover {
    background-color: #ddd;
  }
</style>

<div class="holiday-detail">
  {#if currentHoliday}
    <h2>{currentHoliday.name}</h2>
    <p class="date">{currentHoliday.date}</p>
    <p class="description">{currentHoliday.description}</p>

    {#if currentHoliday.funFact}
      <p class="fun-fact-title">Fun Fact:</p>
      <p>{currentHoliday.funFact}</p>
    {/if}

    {#if currentHoliday.media}
      <div class="media-container">
        <img src={`/media/${currentHoliday.media}`} alt={currentHoliday.name} class="media">
      </div>
    {/if}

    <button on:click={goBackToCalendar}>Back to Calendar</button>
  {:else}
    <p>Holiday details not found.</p>
  {/if}
</div>