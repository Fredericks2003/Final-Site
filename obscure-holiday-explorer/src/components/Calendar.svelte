<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte';
  import { format, getDaysInMonth, startOfMonth, addDays } from 'date-fns';
  import holidays from '../data/holidays.json';

  const dispatch = createEventDispatcher();

  let currentDate = new Date();
  let currentMonth = currentDate.getMonth();
  let currentYear = currentDate.getFullYear();
  let daysInMonth: (Date | null)[] = [];
  let holidayMap: { [key: string]: any } = {};

  function generateCalendarDays(year: number, month: number) {
    daysInMonth = [];
    const firstDayOfMonth = startOfMonth(new Date(year, month, 1));
    const days = getDaysInMonth(firstDayOfMonth);
    const firstDayOfWeek = firstDayOfMonth.getDay();

    for (let i = 0; i < firstDayOfWeek; i++) {
      daysInMonth.push(null);
    }
    for (let i = 1; i <= days; i++) {
      daysInMonth.push(new Date(year, month, i));
    }
  }

  function previousMonth() {
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    generateCalendarDays(currentYear, currentMonth);
  }

  function nextMonth() {
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
    generateCalendarDays(currentYear, currentMonth);
  }

  function handleDayClick(day: Date | null) {
    if (day && holidayMap[format(day, 'MM-dd')]) {
      const holidayData = holidayMap[format(day, 'MM-dd')];
      dispatch('navigateToHoliday', holidayData);
    } else if (day) {
      console.log('Clicked on:', format(day, 'MM-dd-yyyy'));
    }
  }

  onMount(() => {
    generateCalendarDays(currentYear, currentMonth);
    holidays.forEach(holiday => {
      holidayMap[holiday.date] = holiday;
    });
    console.log('Loaded holidays:', holidays);
    console.log('Holiday Map:', holidayMap);
  });
</script>

<style>
  .calendar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }

  .calendar {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 5px;
    width: 350px; /* Adjust as needed */
  }

  .day {
    padding: 10px;
    text-align: center;
    border: 1px solid #eee;
    cursor: pointer;
  }

  .day:hover:not(.empty) {
    background-color: #f0f0f0;
  }

  .day-header {
    font-weight: bold;
    cursor: default;
  }

  .day-header:hover {
    background-color: transparent;
  }

  .empty {
    background-color: #f9f9f9;
    border: none;
    cursor: default;
  }

  .holiday {
    background-color: #ffeeee;
    font-weight: bold;
  }

  .holiday-indicator {
    color: red;
    font-size: 0.8em;
    vertical-align: super;
    margin-left: 2px;
  }
</style>

<div class="calendar-header">
  <button on:click={previousMonth}>&lt;</button>
  <span>{format(new Date(currentYear, currentMonth), 'MMMM yyyy')}</span>
  <button on:click={nextMonth}>&gt;</button>
</div>

<div class="calendar">
  {#each ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as dayName}
    <div class="day day-header">{dayName}</div>
  {/each}

  {#each daysInMonth as day}
    <div 
      class="day" 
      class:empty={!day} 
      class:holiday={day && holidayMap[format(day, 'MM-dd')]}
      on:click={() => handleDayClick(day)}
    >
      {#if day}
        {format(day, 'd')}
        {#if holidayMap[format(day, 'MM-dd')] as holiday}
          <span class="holiday-indicator">*</span>
        {/if}
      {/if}
    </div>
  {/each}
</div>