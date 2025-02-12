# Job Seeker Chrome Extension

The **Job Seeker** extension helps job hunters easily extract job details from popular job listing sites (e.g., Indeed, CV-Library) and save them directly to their own Google Sheets. Each user can authenticate with their Google account, create a new spreadsheet (or use an existing one), and append job data for easy tracking.

## Features

-   **Job Data Extraction:** Extracts details such as job title, company name, deadline, and application link from supported job sites.
-   **Personalized Data Storage:** Each user creates their own Google Sheet to store their job applications.
-   **OAuth2 Integration:** Securely authenticates with Google to access the Sheets API.
-   **Logout Functionality:** Users can log out (revoke the cached OAuth token) to force reauthentication if needed.

## Installation & Running Locally

Follow these steps to run the extension locally:

1.  **Clone or Download the Repository:**
    ```bash
    git clone https://github.com/your-username/jobseeker-ch-extension.git
    cd jobseeker-ch-extension
    ```
2.  **Configure OAuth Client:**

    -   Ensure you have set up an OAuth client in the Google Cloud Console.
    -   Update the client_id field in manifest.json with your actual OAuth client ID:

    ```bash
    "oauth2": {
        "client_id": "YOUR_CLIENT_ID_FROM_GOOGLE.apps.googleusercontent.com",
            "scopes": [
            "https://www.googleapis.com/auth/spreadsheets",
            "https://www.googleapis.com/auth/userinfo.email"
            ]
    }
    ```

3.  **Load the Extension in Chrome:**

    -   Open Chrome and navigate to: chrome://extensions/
    -   Enable Developer mode (toggle in the top right corner).
    -   Click Load unpacked and select the extension folder (e.g., jobseeker-ch-extension).

4.  **Test the Extension:**
    -   Setup Your Google Sheet:
        Click on the extension’s icon, then click the “Setup your Google Sheet” link in the popup. This will open the Options page where you can create a new Google Sheet. Follow the prompts to authenticate and create your personal job application spreadsheet.
    -   Extract and Save Job Data:
        Navigate to a supported job listing page (e.g., Indeed or CV-Library), then click the “Save Job” button in the extension popup. The extension will extract the job details and append them to your spreadsheet.
    -   Log Out (Optional):
        Use the “Log Out” button (if provided in the popup or Options page) to revoke your OAuth token. This forces a reauthentication on the next use.

## Additional Resources

    -   [Homepage](https://akshaybenny.github.io/jobseeker-ch-extension/homepage.html)
    -   [Terms and Conditions](https://akshaybenny.github.io/jobseeker-ch-extension/terms-and-conditions.html)
    -   [Privacy Policy](https://akshaybenny.github.io/jobseeker-ch-extension/privacy-policy.html)
