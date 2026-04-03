# Smart Patient Queue Management System (PQMS)

A lightweight client-side queue management web app for patient registration and queue monitoring. Built using plain HTML, CSS, and vanilla JavaScript with data persisted using `localStorage`.

## 📁 Project Structure

- `index.html` – Live queue monitoring dashboard (Now Serving, Next Patient, full waiting list).
- `registration.html` – Patient registration form (name, age, triage category).
- `Queue.html` – Alternate queue status panel for quick queue updates.
- `contact.html` – Contact form with validation.
- `style.css` – Shared visual styles.
- `queue_val.js` – Core queue management logic and UI rendering.
- `reg_val.js` – Registration input validation.
- `cont_val.js` – Contact form validation.

## 🚀 Features

- Patient registration with token generation:
  - Emergency tokens prefixed `E-` and prioritized.
  - Normal tokens prefixed `N-`.
- Triage-based queue ordering:
  - Emergency patients are always moved ahead of normal patients.
  - Same category sorted by registration time.
- Current queue state persistence through `localStorage`.
- "Call Next" flows:
  - Marks current serving patient complete and advances next waiting patient.
- Form validation and user feedback alerts.

## 🛠️ How to Run

1. Open the project folder in your browser or ideally use a local server (recommended).
2. Open `registration.html` to add patients.
3. Open `index.html` for the queue dashboard or `Queue.html` for status.
4. Use the `Update / Call Next` button to advance queue.

### Optional local server

- Using Python 3:
  - `python -m http.server 8000` (from project folder)
  - Go to `http://localhost:8000/`.

## 🧾 Behavior Details

- Registration requires: first name, age (1–120), category.
- `queue_val.js` stores data in `localStorage` key `patientList`.
- Queue table color-coded for emergency rows.
- Contact page validates name and email format.

## 🧹 Known Limitations

- No backend: server integration or multi-user sync not supported.
- Multi-tab concurrency is not handled (race conditions possible).
- No persistent history besides `localStorage`.

## 🧪 Testing

- Register a patient and confirm token output and queue updates.
- Add emergency and normal patients to verify priority sort.
- On `index.html`, press `Update / Call Next` and confirm served status advances.
- On `contact.html`, submit invalid email to see error alert.

## 📝 Author

- Created by: Yosef Melaku
- Simple educational queue management prototype.
