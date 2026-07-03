/* =========================================================
   CONTACT API BRIDGE
   =========================================================
   The contact form has no traditional backend server, so this
   file sends submissions to a free Google Apps Script "Web App",
   which writes every inquiry as a new row into a Google Sheet.
   That Sheet is your inquiry database - open-able any time,
   exportable to Excel/Power Query, no hosting cost.

   ---------------------------------------------------------
   ONE-TIME SETUP (about 5 minutes)
   ---------------------------------------------------------
   1. Create a new Google Sheet named "Loving Blooms Inquiries".
      Add headers in row 1: Timestamp | Name | Email | Phone | Grade | Message

   2. In the Sheet, go to Extensions -> Apps Script, delete the
      placeholder code and paste this:

        function doPost(e) {
          const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
          const data = JSON.parse(e.postData.contents);
          sheet.appendRow([
            new Date(),
            data.name,
            data.email,
            data.phone,
            data.grade,
            data.message
          ]);
          return ContentService
            .createTextOutput(JSON.stringify({ result: "success" }))
            .setMimeType(ContentService.MimeType.JSON);
        }

   3. Click Deploy -> New deployment -> type: "Web app".
        - Execute as: Me
        - Who has access: Anyone
      Click Deploy and copy the generated Web App URL.

   4. Paste that URL below as CONTACT_API_ENDPOINT.

   Until step 4 is done, the form still works: it validates
   input and shows a success message, but nothing is stored
   remotely yet (see the DEMO MODE note in submitInquiry()).
   ========================================================= */

const CONTACT_API_ENDPOINT = ""; // <-- paste your Google Apps Script Web App URL here

/**
 * Sends a contact form payload to the configured API endpoint.
 * @param {{name:string, email:string, phone:string, grade:string, message:string}} payload
 * @returns {Promise<{ok:boolean, demo?:boolean}>}
 */
async function submitInquiry(payload) {
  if (!CONTACT_API_ENDPOINT) {
    // DEMO MODE: no endpoint configured yet. Simulate a short delay
    // so the UI still feels real, and let the caller know it's demo data.
    await new Promise((resolve) => setTimeout(resolve, 700));
    console.info("[contact-api] DEMO MODE — payload was NOT sent anywhere:", payload);
    return { ok: true, demo: true };
  }

  try {
    await fetch(CONTACT_API_ENDPOINT, {
      method: "POST",
      mode: "no-cors", // Apps Script web apps commonly require no-cors from the browser
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
    });
    // With mode:"no-cors" we can't read the response body, so we optimistically
    // treat a non-throwing fetch as success.
    return { ok: true, demo: false };
  } catch (err) {
    console.error("[contact-api] submission failed:", err);
    return { ok: false, demo: false };
  }
}

window.submitInquiry = submitInquiry;
