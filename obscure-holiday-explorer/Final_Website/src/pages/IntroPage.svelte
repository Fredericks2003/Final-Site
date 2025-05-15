<script>

</script>

<div class="intro-page">
  <div class="intro-card">
    <h1>Welcome to the Obscure Holiday Explorer</h1>
    <p class="subtitle">ICS-200 Final Project</p>
    
    <div class="intro-content">
      <p>
        This interactive website showcases unusual and lesser known holidays throughout the year. 
        Discover quirky celebrations like "Talk Like a Pirate Day" or educational observances like "Pi Day" through our five interactive pages.
      </p>
      
      <h2>Project Features</h2>
      
      <div class="features">
        <div class="feature">
          <div class="feature-icon">📅</div>
          <div class="feature-info">
            <h3>Calendar</h3>
            <p>Browse the interactive calendar to discover obscure holidays throughout the year. Holidays are highlighted and can be clicked to view more details.</p>
          </div>
        </div>
        
        <div class="feature">
          <div class="feature-icon">📖</div>
          <div class="feature-info">
            <h3>Holiday Details</h3>
            <p>Learn about each obscure holiday with detailed information, fun facts, and categorization tags. Each holiday is assigned a thematic color and relevant emoji.</p>
          </div>
        </div>
        
        <div class="feature">
          <div class="feature-icon">🎲</div>
          <div class="feature-info">
            <h3>Holiday Randomizer</h3>
            <p>Can't decide which holiday to explore? Use our animated spinning wheel to randomly select a holiday, complete with celebratory confetti effects.</p>
          </div>
        </div>
        
        <div class="feature">
          <div class="feature-icon">🎮</div>
          <div class="feature-info">
            <h3>Holiday Quiz</h3>
            <p>Test your knowledge of obscure holidays with our interactive quiz. Answer questions about holiday dates, descriptions, and fun facts to earn badges.</p>
          </div>
        </div>
        
        <div class="feature">
          <div class="feature-icon">✏️</div>
          <div class="feature-info">
            <h3>Create-A-Holiday</h3>
            <p>Design your own obscure holiday with our interactive form. Add details, fun facts, and tags, then preview how it would look in our system.</p>
          </div>
        </div>
      </div>
      
      <h2>Technical Details</h2>
      <p>This project was built using Svelte and TypeScript, with custom CSS for styling. Features include:</p>
      <ul>
        <li>Interactive components with animation effects</li>
        <li>Hash-based routing for page navigation</li>
        <li>Dynamic content generation based on holiday data</li>
        <li>Responsive design for various device sizes</li>
        <li>Client-side form validation</li>
      </ul>
      
      <div class="call-to-action">
        <p>Use the navigation menu above to begin exploring obscure holidays!</p>
      </div>
    </div>
  </div>
</div>

<style>
  .intro-page {
    max-width: 1000px;
    margin: 0 auto 2rem;
    padding: 0 1rem;
  }
  
  .intro-card {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    padding: 2rem;
  }
  
  h1 {
    color: darkslateblue;
    margin-bottom: 0.5rem;
    text-align: center;
  }
  
  .subtitle {
    color: #666;
    text-align: center;
    margin-bottom: 2rem;
    font-style: italic;
  }
  
  .intro-content p {
    line-height: 1.6;
    margin-bottom: 1.5rem;
  }
  
  h2 {
    color: darkslateblue;
    margin: 2rem 0 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #eee;
  }
  
  .features {
    display: grid;
    gap: 1.5rem;
    margin: 2rem 0;
  }
  
  @media (min-width: 768px) {
    .features {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  .feature {
    display: flex;
    gap: 1rem;
    align-items: flex-start;
  }
  
  .feature-icon {
    font-size: 2rem;
    flex-shrink: 0;
    color: darkslateblue;
  }
  
  .feature-info h3 {
    color: darkslateblue;
    margin: 0 0 0.5rem 0;
  }
  
  .feature-info p {
    margin: 0;
    font-size: 0.95rem;
  }
  
  ul {
    line-height: 1.6;
    margin-bottom: 2rem;
  }
  
  .call-to-action {
    background-color: #f0f0ff;
    border-left: 4px solid darkslateblue;
    padding: 1rem;
    border-radius: 0 4px 4px 0;
    margin: 2rem 0 1rem;
    text-align: center;
  }
  
  .call-to-action p {
    margin: 0;
    font-weight: bold;
    color: darkslateblue;
  }
</style>