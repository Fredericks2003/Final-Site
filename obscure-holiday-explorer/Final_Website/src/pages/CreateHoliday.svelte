<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, slide } from 'svelte/transition';
  
  // Form data
  let formData = {
    name: '',
    date: '',
    description: '',
    funFact: '',
    tags: []
  };
  
  // Form state
  let errors = {};
  let formSubmitted = false;
  let currentTag = '';
  let previewMode = false;
  let formValid = false;
  let availableTags = [
    'food', 'quirky', 'global', 'awareness', 'technology', 
    'animals', 'environment', 'education', 'fun', 'science', 
    'nature', 'family', 'health', 'language', 'pop culture'
  ];
  
  // Validation functions
  function validateForm() {
    errors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Holiday name is required';
    } else if (formData.name.length < 3) {
      errors.name = 'Holiday name must be at least 3 characters';
    }
    
    if (!formData.date) {
      errors.date = 'Date is required';
    }
    
    if (!formData.description.trim()) {
      errors.description = 'Description is required';
    } else if (formData.description.length < 20) {
      errors.description = 'Description must be at least 20 characters';
    }
    
    if (formData.tags.length === 0) {
      errors.tags = 'At least one tag is required';
    }
    
    // Set formValid based on absence of errors
    formValid = Object.keys(errors).length === 0;
    
    return formValid;
  }
  
  // Format date to MM-DD
  function formatDate(dateString) {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${month}-${day}`;
  }
  
  // Handle form submission
  function handleSubmit() {
    if (validateForm()) {
      // Format date for display
      formData.date = formatDate(formData.date);
      formSubmitted = true;
      previewMode = true;
    }
  }
  
  // Add tag
  function addTag() {
    if (currentTag && !formData.tags.includes(currentTag)) {
      formData.tags = [...formData.tags, currentTag];
      currentTag = '';
    }
  }
  
  // Remove tag
  function removeTag(tag) {
    formData.tags = formData.tags.filter(t => t !== tag);
  }
  
  // Add available tag
  function addAvailableTag(tag) {
    if (!formData.tags.includes(tag)) {
      formData.tags = [...formData.tags, tag];
    }
  }
  
  // Create new holiday
  function createNewHoliday() {
    formData = {
      name: '',
      date: '',
      description: '',
      funFact: '',
      tags: []
    };
    formSubmitted = false;
    previewMode = false;
    errors = {};
  }
  
  // Toggle preview mode
  function togglePreview() {
    if (!previewMode && !validateForm()) {
      return;
    }
    previewMode = !previewMode;
  }
  
  // Random holiday ideas
  const holidayIdeas = [
    {
      name: "Procrastination Day",
      description: "A day dedicated to putting things off until tomorrow. Ironically, always celebrated 'next week'.",
      tags: ["quirky", "fun"]
    },
    {
      name: "Digital Detox Day",
      description: "A day for disconnecting from all electronic devices and reconnecting with the physical world.",
      tags: ["awareness", "health"]
    },
    {
      name: "Fictional Character Day",
      description: "A celebration of our favorite fictional characters from books, movies, and TV shows.",
      tags: ["pop culture", "fun"]
    },
    {
      name: "Random Act of Kindness Day",
      description: "A day dedicated to performing unexpected acts of kindness for strangers, friends, or family.",
      tags: ["awareness", "global"]
    },
    {
      name: "Bubble Wrap Appreciation Day",
      description: "A day to celebrate the joy of popping bubble wrap, one of the most satisfying stress relievers.",
      tags: ["quirky", "fun"]
    }
  ];
  
  // Use a holiday idea
  function useHolidayIdea(idea) {
    formData = {
      ...formData,
      name: idea.name,
      description: idea.description,
      tags: idea.tags
    };
  }
</script>

<div class="create-holiday-page">
  <h1>Create-A-Holiday</h1>
  <p class="subtitle">Design your own obscure holiday to celebrate!</p>
  
  <div class="content-wrapper">
    <div class="form-container" class:collapsed={previewMode}>
      {#if !formSubmitted}
        <form on:submit|preventDefault={handleSubmit}>
          <div class="toggle-container">
            <button type="button" class="toggle-button" on:click={togglePreview} disabled={previewMode}>
              Form
            </button>
            <button type="button" class="toggle-button" on:click={togglePreview} disabled={!previewMode}>
              Preview
            </button>
          </div>
          
          <div class="form-group">
            <label for="name">Holiday Name <span class="required">*</span></label>
            <input 
              type="text" 
              id="name" 
              bind:value={formData.name} 
              class:error={errors.name}
              on:blur={validateForm}
            />
            {#if errors.name}
              <span class="error-text" in:slide={{duration: 200}}>{errors.name}</span>
            {/if}
          </div>
          
          <div class="form-group">
            <label for="date">Date <span class="required">*</span></label>
            <input 
              type="date" 
              id="date" 
              bind:value={formData.date} 
              class:error={errors.date}
              on:blur={validateForm}
            />
            {#if errors.date}
              <span class="error-text" in:slide={{duration: 200}}>{errors.date}</span>
            {/if}
          </div>
          
          <div class="form-group">
            <label for="description">Description <span class="required">*</span></label>
            <textarea 
              id="description" 
              bind:value={formData.description} 
              rows="5"
              class:error={errors.description}
              on:blur={validateForm}
            ></textarea>
            {#if errors.description}
              <span class="error-text" in:slide={{duration: 200}}>{errors.description}</span>
            {/if}
          </div>
          
          <div class="form-group">
            <label for="funFact">Fun Fact (Optional)</label>
            <textarea 
              id="funFact" 
              bind:value={formData.funFact} 
              rows="3"
            ></textarea>
          </div>
          
          <div class="form-group">
            <label>Tags <span class="required">*</span></label>
            <div class="tag-input-container">
              <input 
                type="text" 
                placeholder="Add a tag" 
                bind:value={currentTag} 
                on:keydown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
              />
              <button type="button" class="add-tag-button" on:click={addTag}>Add</button>
            </div>
            
            <div class="selected-tags">
              {#each formData.tags as tag}
                <span class="tag">
                  {tag}
                  <button type="button" class="remove-tag" on:click={() => removeTag(tag)}>×</button>
                </span>
              {/each}
            </div>
            
            {#if errors.tags}
              <span class="error-text" in:slide={{duration: 200}}>{errors.tags}</span>
            {/if}
            
            <div class="available-tags">
              <p>Popular Tags:</p>
              <div class="tag-list">
                {#each availableTags as tag}
                  <button 
                    type="button" 
                    class="available-tag" 
                    class:selected={formData.tags.includes(tag)}
                    on:click={() => addAvailableTag(tag)}
                  >
                    {tag}
                  </button>
                {/each}
              </div>
            </div>
          </div>
          
          <button type="submit" class="submit-button">
            Create Holiday
          </button>
        </form>
      {/if}
    </div>
    
    <div class="preview-container" class:expanded={previewMode} in:fade={{duration: 300}}>
      {#if previewMode}
        <div class="toggle-container">
          <button type="button" class="toggle-button" on:click={togglePreview} disabled={previewMode}>
            Form
          </button>
          <button type="button" class="toggle-button" on:click={togglePreview} disabled={!previewMode}>
            Preview
          </button>
        </div>
        
        <div class="holiday-card">
          <h2>{formData.name || 'Holiday Name'}</h2>
          
          <div class="holiday-date">
            {formData.date ? formatDate(formData.date) : 'MM-DD'}
          </div>
          
          <div class="holiday-description">
            <p>{formData.description || 'No description provided.'}</p>
          </div>
          
          {#if formData.funFact}
            <div class="holiday-fun-fact">
              <h3>Fun Fact</h3>
              <p>{formData.funFact}</p>
            </div>
          {/if}
          
          {#if formData.tags.length > 0}
            <div class="holiday-tags">
              <h3>Tags</h3>
              <div class="tag-list">
                {#each formData.tags as tag}
                  <span class="tag">{tag}</span>
                {/each}
              </div>
            </div>
          {/if}
        </div>
        
        {#if formSubmitted}
          <div class="success-message" in:fade={{duration: 300}}>
            <h3>🎉 Holiday Created!</h3>
            <p>Your holiday has been saved. Here's what would happen next in a real application:</p>
            <ul>
              <li>Your holiday would be added to the database</li>
              <li>It would appear in the calendar for others to discover</li>
              <li>You could share it with your friends</li>
            </ul>
            <button class="create-new-button" on:click={createNewHoliday}>
              Create Another Holiday
            </button>
          </div>
        {/if}
      {/if}
    </div>
    
    <div class="inspiration-container">
      <h3>Need Inspiration?</h3>
      <p>Click on any idea below to use it as a starting point:</p>
      
      <div class="ideas-container">
        {#each holidayIdeas as idea}
          <div class="idea-card" on:click={() => useHolidayIdea(idea)}>
            <h4>{idea.name}</h4>
            <p>{idea.description}</p>
            <div class="idea-tags">
              {#each idea.tags as tag}
                <span class="tag small">{tag}</span>
              {/each}
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>

<style>
  .create-holiday-page {
    max-width: 1000px;
    margin: 0 auto;
    padding: 2rem 1rem;
  }
  
  h1, h2, h3, h4 {
    color: darkslateblue;
  }
  
  h1 {
    text-align: center;
    margin-bottom: 0.5rem;
  }
  
  .subtitle {
    text-align: center;
    color: #666;
    margin-bottom: 2rem;
  }
  
  .content-wrapper {
    display: grid;
    gap: 2rem;
  }
  
  @media (min-width: 992px) {
    .content-wrapper {
      grid-template-columns: 1fr 1fr;
    }
    
    .inspiration-container {
      grid-column: 1 / -1;
    }
  }
  
  .form-container, .preview-container {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    padding: 2rem;
    transition: all 0.3s;
  }
  
  .toggle-container {
    display: flex;
    margin-bottom: 1.5rem;
    border-radius: 4px;
    overflow: hidden;
    background-color: #f0f0f0;
  }
  
  .toggle-button {
    flex: 1;
    padding: 0.75rem;
    background: none;
    border: none;
    cursor: pointer;
    font-weight: bold;
    color: #666;
    transition: all 0.2s;
  }
  
  .toggle-button:disabled {
    background-color: darkslateblue;
    color: white;
    font-weight: bold;
  }
  
  @media (min-width: 992px) {
    .form-container.collapsed {
      display: none;
    }
    
    .preview-container.expanded {
      grid-column: 1 / -1;
    }
  }
  
  @media (max-width: 991px) {
    .form-container.collapsed {
      display: none;
    }
  }
  
  .form-group {
    margin-bottom: 1.5rem;
  }
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: bold;
    color: #444;
  }
  
  .required {
    color: #ff3e00;
  }
  
  input[type="text"],
  input[type="date"],
  textarea {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
    font-family: inherit;
  }
  
  input.error,
  textarea.error {
    border-color: #ff3e00;
  }
  
  .error-text {
    color: #ff3e00;
    font-size: 0.9rem;
    margin-top: 0.5rem;
    display: block;
  }
  
  .tag-input-container {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
  }
  
  .add-tag-button {
    background-color: darkslateblue;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 0.5rem 1rem;
    cursor: pointer;
  }
  
  .selected-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }
  
  .tag {
    background-color: #f0f0f0;
    color: darkslateblue;
    padding: 0.3rem 0.8rem;
    border-radius: 20px;
    font-size: 0.9rem;
    display: inline-flex;
    align-items: center;
  }
  
  .tag.small {
    font-size: 0.8rem;
    padding: 0.2rem 0.6rem;
  }
  
  .remove-tag {
    background: none;
    border: none;
    color: #666;
    margin-left: 0.5rem;
    cursor: pointer;
    font-size: 1.2rem;
    line-height: 1;
    padding: 0;
  }
  
  .available-tags {
    margin-top: 1rem;
  }
  
  .available-tags p {
    margin: 0 0 0.5rem 0;
    font-size: 0.9rem;
    color: #666;
  }
  
  .tag-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  
  .available-tag {
    background-color: #f9f9f9;
    color: #666;
    border: 1px solid #ddd;
    padding: 0.3rem 0.8rem;
    border-radius: 20px;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .available-tag:hover {
    background-color: #f0f0ff;
    color: darkslateblue;
  }
  
  .available-tag.selected {
    background-color: darkslateblue;
    color: white;
    border-color: darkslateblue;
  }
  
  .submit-button {
    background-color: darkslateblue;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.2s;
    width: 100%;
  }
  
  .submit-button:hover {
    background-color: #483d8b;
  }
  
  /* Preview styles */
  .holiday-card {
    padding: 1.5rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #f9f9f9;
    margin-bottom: 2rem;
  }
  
  .holiday-card h2 {
    color: darkslateblue;
    margin-top: 0;
    border-bottom: 2px solid darkslateblue;
    padding-bottom: 0.5rem;
  }
  
  .holiday-date {
    font-weight: bold;
    color: darkslateblue;
    margin-bottom: 1rem;
  }
  
  .holiday-description p {
    line-height: 1.6;
  }
  
  .holiday-fun-fact {
    background-color: #f0f0ff;
    border-left: 4px solid darkslateblue;
    padding: 1rem;
    margin: 1.5rem 0;
  }
  
  .holiday-fun-fact h3 {
    margin-top: 0;
    margin-bottom: 0.5rem;
  }
  
  .holiday-fun-fact p {
    margin: 0;
  }
  
  .holiday-tags h3 {
    margin-bottom: 0.5rem;
  }
  
  /* Success message styles */
  .success-message {
    background-color: #e8f5e9;
    border-left: 4px solid #4caf50;
    padding: 1.5rem;
    border-radius: 4px;
  }
  
  .success-message h3 {
    color: #4caf50;
    margin-top: 0;
  }
  
  .create-new-button {
    background-color: darkslateblue;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.2s;
    margin-top: 1rem;
  }
  
  .create-new-button:hover {
    background-color: #483d8b;
  }
  
  /* Inspiration styles */
  .inspiration-container {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    padding: 2rem;
    margin-top: 1rem;
  }
  
  .inspiration-container h3 {
    margin-top: 0;
    text-align: center;
  }
  
  .inspiration-container p {
    text-align: center;
    color: #666;
    margin-bottom: 1.5rem;
  }
  
  .ideas-container {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  }
  
  .idea-card {
    background-color: #f9f9f9;
    border: 1px solid #eee;
    border-radius: 8px;
    padding: 1.5rem;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .idea-card:hover {
    background-color: #f0f0ff;
    border-color: darkslateblue;
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
  
  .idea-card h4 {
    margin-top: 0;
    margin-bottom: 0.5rem;
  }
  
  .idea-card p {
    margin: 0 0 1rem 0;
    text-align: left;
    font-size: 0.9rem;
  }
  
  .idea-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
</style>