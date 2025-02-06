To reproduce the bug:

1. Install dependencies in this project (`pnpm install`)
1. Build and sync (`pnpm run build && npx cap sync`)
1. Run the iOS app on a real device (not a simulator)
1. Click "Test the database" button. You will get error that "notes" table doesn't exist. This is fine.

Now we have the app running, but we still need to copy over the large (120MB) database file that we'll be testing against.

1. In Xcode, open Window -> Devices and Simulators
1. Select your physical device in the left sidebar
1. You'll see a list of installed apps. Find "dbtest". Click "..." button and select "Download Container"
1. Find container on your disk, right click, and select "Show Package Contents"
1. Navigate to `./AppData/Library/Bazinga`. There you should see a file named `mydbSQLite.db`
1. Download our 120MB db file. (Part of this repo.) Make sure the names are matching, and replace the small file with the large file.

Now you've modified the container and it's time to upload it back to your iPhone.

1. Go back to Devices and Simulators
1. Locate your device in the sidebar and `dbtest` app in the list of apps.
1. Click on "..." button and select Replace Container
1. Select the modified container on your disk. It should be 120MB+ now that we've replaced the database file inside of it.

Run the app again. This time after clicking the "Test" button, it should print the correct count of notes (10k+)

Quit the app and run it again. Don't click the test button yet.

1. Open Safari
1. In the Develop menu (you may need to enable developer tools in Safari preferences), select your device and open the website inspector
1. Go into Timelines tab. Unselect all tools, except for "Memory".
1. Start recording
1. Click the "Test" button

Voila. You'll see the memory growing and never being garbage collected.
