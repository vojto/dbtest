# Capacitor Memory Leak Demo

This project demonstrates a potential memory leak when repeatedly passing messages between native code and JavaScript using a Capacitor plugin.

## Setup Instructions

1. Install dependencies in this project:

```bash
pnpm install
```

2. Build and sync the project:

```bash
pnpm run build && npx cap sync
```

3. Run the iOS app on a real device (not a simulator)

## Testing the Memory Leak

1. Open Safari
2. In the Develop menu (you may need to enable developer tools in Safari preferences), select your device and open the website inspector
3. Go into Timelines tab. Unselect all tools, except for "Memory"
4. Start recording
5. Click the "Test Echo Plugin" button

The app will:

- Send 30 messages from native to JavaScript
- Wait 2 seconds between each message
- Display a counter of received messages

## Expected Behavior

You should observe:

1. The memory usage growing over time
2. Memory not being properly garbage collected
3. A counter incrementing from 1 to 30 as messages are received

This demonstrates a potential memory leak in the bridge between native code and JavaScript when passing frequent messages.
