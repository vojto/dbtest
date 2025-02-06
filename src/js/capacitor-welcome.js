import { SplashScreen } from '@capacitor/splash-screen';
import { CapacitorSQLite, SQLiteConnection } from '@capacitor-community/sqlite';

let globalDb = null;

window.customElements.define(
  'capacitor-welcome',
  class extends HTMLElement {
    constructor() {
      super();

      SplashScreen.hide();

      const root = this.attachShadow({ mode: 'open' });

      root.innerHTML = `
    <style>
      :host {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        display: block;
        width: 100%;
        height: 100%;
      }
      h1, h2, h3, h4, h5 {
        text-transform: uppercase;
      }
      .button {
        display: inline-block;
        padding: 10px;
        background-color: #73B5F6;
        color: #fff;
        font-size: 0.9em;
        border: 0;
        border-radius: 3px;
        text-decoration: none;
        cursor: pointer;
      }
      main {
        padding: 15px;
      }
      main hr { height: 1px; background-color: #eee; border: 0; }
      main h1 {
        font-size: 1.4em;
        text-transform: uppercase;
        letter-spacing: 1px;
      }
      main h2 {
        font-size: 1.1em;
      }
      main h3 {
        font-size: 0.9em;
      }
      main p {
        color: #333;
      }
      main pre {
        white-space: pre-line;
      }
    </style>
    <div>
      <capacitor-welcome-titlebar>
        <h1>Capacitor</h1>
      </capacitor-welcome-titlebar>
      <main>
        <h2>SQLite Demo</h2>
        <p>
          This demo shows how to use SQLite with Capacitor. Click the button to test database operations!
        </p>
        <p>
          <button class="button" id="take-photo">Test the database</button>
        </p>
        <p id="db-results"></p>
        <p id="db-path"></p>
      </main>
    </div>
    `;
    }

    connectedCallback() {
      const self = this;

      self.shadowRoot.querySelector('#take-photo').addEventListener('click', async function (e) {
        try {
          const resultsElement = self.shadowRoot.querySelector('#db-results');
          const pathElement = self.shadowRoot.querySelector('#db-path');
          
          // Initialize database connection if not already initialized
          if (!globalDb) {
            const sqliteConnection = new SQLiteConnection(CapacitorSQLite);
            globalDb = await sqliteConnection.createConnection('mydb', false, 'no-encryption', 1);
            await globalDb.open();
            
            // Get database path
            const dbList = await sqliteConnection.getDatabaseList();
            pathElement.textContent = `Database path: ${JSON.stringify(dbList)}`;
          }
          
          // Count rows in notes table
          const result = await globalDb.query(`
            SELECT COUNT(*) as count FROM notes;
          `);
          
          // Display count
          resultsElement.textContent = `Number of notes: ${result.values[0].count}`;

          // Paginate through all notes
          let offset = 0;
          const pageSize = 500;
          let hasMore = true;
          let pageNum = 1;

          while (hasMore) {
            let pageResult = await globalDb.query(`
              SELECT * FROM notes 
              LIMIT ${pageSize} 
              OFFSET ${offset}
            `);

            const resultLength = pageResult.values.length;
            
            if (resultLength === 0) {
              hasMore = false;
            } else {
              console.log(`Page ${pageNum}: Retrieved ${resultLength} notes`);
              
              // Clear the reference to allow garbage collection
              pageResult = null;
              
              offset += pageSize;
              pageNum++;
              
              // Sleep between pages
              await sleep(2000);
            }
          }
        } catch (error) {
          console.error('Database Error:', error);
          alert('Error: ' + error.message);
        }
      });
    }
  },
);

window.customElements.define(
  'capacitor-welcome-titlebar',
  class extends HTMLElement {
    constructor() {
      super();
      const root = this.attachShadow({ mode: 'open' });
      root.innerHTML = `
    <style>
      :host {
        position: relative;
        display: block;
        padding: 15px 15px 15px 15px;
        text-align: center;
        background-color: #73B5F6;
      }
      ::slotted(h1) {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        font-size: 0.9em;
        font-weight: 600;
        color: #fff;
      }
    </style>
    <slot></slot>
    `;
    }
  },
);

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
