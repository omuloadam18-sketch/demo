/* =========================================================
   GOOGLE STORAGE — GALLERY IMAGE CONFIG
   =========================================================
   This file is the single place you edit to add real photos
   of Loving Blooms Academy to the Facilities/Gallery page.
   You do NOT need to touch any HTML, CSS, or JS files.

   ---------------------------------------------------------
   HOW TO CONNECT REAL GOOGLE CLOUD STORAGE IMAGES
   ---------------------------------------------------------
   1. Create (or use) a Google Cloud Storage bucket, e.g.
        gs://loving-blooms-academy-photos
   2. Upload your photos to the bucket.
   3. Make the bucket (or the individual objects) publicly
      readable:
        - Cloud Console -> Bucket -> Permissions -> Grant
          "allUsers" the role "Storage Object Viewer"
      OR make a folder public, e.g. bucket/gallery/
   4. Each uploaded file gets a public URL of the form:
        https://storage.googleapis.com/BUCKET_NAME/FILE_NAME
      Example:
        https://storage.googleapis.com/loving-blooms-academy-photos/classroom-1.jpg
   5. Paste that URL into the "src" field of an entry below.

   ---------------------------------------------------------
   ALTERNATIVE — GOOGLE DRIVE (simpler, no billing account)
   ---------------------------------------------------------
   1. Upload a photo to a Google Drive folder.
   2. Right click the file -> Share -> "Anyone with the link".
   3. Copy the file ID from the share link:
        https://drive.google.com/file/d/FILE_ID_HERE/view
   4. Use this URL format as the "src":
        https://drive.google.com/uc?export=view&id=FILE_ID_HERE

   ---------------------------------------------------------
   ADDING A NEW PHOTO
   ---------------------------------------------------------
   Copy one object inside the GALLERY_IMAGES array below,
   paste it as a new entry, then edit "src", "caption" and
   "category". Categories currently used across the site:
     "classrooms", "outdoor", "events", "facilities"
   You can add more categories - the gallery filter chips on
   the Facilities page will pick up any category used here
   automatically. Leave the array empty and the gallery page
   will show a friendly "photos coming soon" placeholder.
   ========================================================= */

const GALLERY_IMAGES = [
  // Example entry (uncomment and edit once you have a real photo):
  // {
  //   src: "https://storage.googleapis.com/loving-blooms-academy-photos/classroom-1.jpg",
  //   caption: "Grade 3 CBC classroom",
  //   category: "classrooms"
  // },
];

// Exposed for gallery.js to consume.
window.GALLERY_IMAGES = GALLERY_IMAGES;
