<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte';
  import { format, getDaysInMonth, startOfMonth, addDays } from 'date-fns';
  import holidays from '../data/holidays.json';

  const dispatch = createEventDispatcher();
  
  let currentDate = new Date();
  let calendar = [];
  
  const holidayMap = {};
  holidays.forEach(holiday => {
    const dateKey = holiday.date;
    holidayMap[dateKey] = holiday;
  });
  
  function generateCalendarData() {
    const firstDayOfMonth = startOfMonth(currentDate);
    const daysInMonth = getDaysInMonth(currentDate);
    const startDay = firstDayOfMonth.getDay();
    
    calendar = [];
    
    let week = Array(7).fill(null);
    for (let i = 0; i < startDay; i++) {
      week[i] = null;
    }
    
    let currentDay = 1;
    for (let i = startDay; i < 7; i++) {
      if (currentDay <= daysInMonth) {
        const dayDate = addDays(firstDayOfMonth, currentDay - 1);
        week[i] = dayDate;
        currentDay++;
      }
    }
    calendar.push(week);
    
    while (currentDay <= daysInMonth) {
      week = Array(7).fill(null);
      for (let i = 0; i < 7 && currentDay <= daysInMonth; i++) {
        const dayDate = addDays(firstDayOfMonth, currentDay - 1);
        week[i] = dayDate;
        currentDay++;
      }
      calendar.push(week);
    }
  }
  
  function handleDayClick(day) {
    if (!day) return;
    
    const dateString = format(day, 'MM-dd');
    const holiday = holidayMap[dateString];
    
    if (holiday) {
      dispatch('navigateToHoliday', { holiday });
    }
  }
  
  function previousMonth() {
    currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    generateCalendarData();
  }
  
  function nextMonth() {
    currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    generateCalendarData();
  }
  
  onMount(() => {
    generateCalendarData();
  });
</script>

<div class="calendar">
  <h1 class="calendar-title">Obscure Holiday Calendar</h1>
  <p class="calendar-description">Browse through the months to discover unusual and fun holidays!</p>
  
  <div class="calendar-header">
    <button on:click={previousMonth}>Previous</button>
    <h2>{format(currentDate, 'MMMM yyyy')}</h2>
    <button on:click={nextMonth}>Next</button>
  </div>
  
  <div class="calendar-grid">
    <div class="weekday">Sun</div>
    <div class="weekday">Mon</div>
    <div class="weekday">Tue</div>
    <div class="weekday">Wed</div>
    <div class="weekday">Thu</div>
    <div class="weekday">Fri</div>
    <div class="weekday">Sat</div>
    
    {#each calendar as week}
      {#each week as day, i}
        <div 
          class="day" 
          class:empty={!day} 
          class:holiday={day && holidayMap[format(day, 'MM-dd')]}
          on:click={() => handleDayClick(day)}
        >
          {#if day}
            <span class="day-number">{format(day, 'd')}</span>
            {#if holidayMap[format(day, 'MM-dd')]}
              <span class="holiday-marker">*</span>
              <div class="tooltip">
                {holidayMap[format(day, 'MM-dd')].name}
                <div class="tooltip-arrow"></div>
              </div>
            {/if}
          {/if}
        </div>
      {/each}
    {/each}
  </div>
</div>

<style>
  .calendar {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    max-width: 1000px;
    margin: 0 auto;
  }
  
  .calendar-title {
    color: darkslateblue;
    text-align: center;
    margin: 1.5rem 0 0.5rem;
  }
  
  .calendar-description {
    text-align: center;
    color: #666;
    margin: 0 0 1.5rem;
  }
  
  .calendar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background-color: darkslateblue;
    color: white;
  }
  
  .calendar-header h2 {
    margin: 0;
    font-size: 1.5rem;
    color: white;
  }
  
  .calendar-header button {
    background-color: white;
    border: none;
    border-radius: 4px;
    padding: 0.5rem 1rem;
    cursor: pointer;
    font-weight: bold;
    color: darkslateblue;
    transition: all 0.2s;
  }
  
  .calendar-header button:hover {
    background-color: #f0f0f0;
  }
  
  .calendar-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    background-color: #f9f9f9;
  }
  
  .weekday {
    padding: 0.75rem;
    text-align: center;
    font-weight: bold;
    background-color: #e9e9e9;
    border-bottom: 1px solid #ddd;
  }
  
  .day {
    height: 100px;
    padding: 0.5rem;
    border: 1px solid #ddd;
    background-color: white;
    position: relative;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .day:hover {
    background-color: #f0f0ff;
  }
  
  .day.empty {
    background-color: #f9f9f9;
    cursor: default;
  }
  
  .day.holiday {
    position: relative;
  }
  
  .day-number {
    font-weight: bold;
    display: inline-block;
  }
  
  .holiday-marker {
    color: red;
    font-weight: bold;
    font-size: 1.2rem;
    margin-left: 0.25rem;
    display: inline-block;
  }
  
  .tooltip {
    visibility: hidden;
    background-color: darkslateblue;
    color: white;
    text-align: center;
    border-radius: 4px;
    padding: 0.5rem;
    position: absolute;
    z-index: 10;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    white-space: nowrap;
    opacity: 0;
    transition: opacity 0.3s;
    font-size: 0.8rem;
  }
  
  .tooltip-arrow {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: darkslateblue transparent transparent transparent;
  }
  
  .day.holiday:hover .tooltip {
    visibility: visible;
    opacity: 1;
  }
</style>