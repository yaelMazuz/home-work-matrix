📌 Project Improvements Summary

This project includes a series of improvements and refactoring on both the client (Angular) and the server (C# / backend API) in order to enhance performance, maintainability, and code structure.

🖥️ Client (Frontend - Angular)

🔹 API Optimization
Implemented a single API call to retrieve posts using OnInit, avoiding duplicate requests.
Posts schema is handled within the same request to eliminate redundant network calls.

🔹 State Management Improvement
Introduced a global posts count variable.
Managed via subscription (subscribe) instead of post-processing logic, ensuring data availability at the correct lifecycle stage.

🔹 Forms Enhancement
Replaced simple form with a reactive form.
Added:
Form validations
Custom error messages for better UX

🔹 Project Structure
Improved folder organization for better scalability and maintainability.

🔹 Performance Optimization
Added trackBy function in blog loops to improve rendering performance and reduce unnecessary DOM re-renders.


🛠️ Server (Backend - C# / API)

🔹 Architecture Refactoring
Separated business logic into clean layered architecture (Controller / Service / Logic layers).

🔹 Validation
Added server-side validation to ensure data integrity and prevent invalid requests.

🔹 Bug Fixes
Fixed incorrect calculation of TOTAL_CALLS value.



🚀 Result
These improvements resulted in:

🔹Better performance on the client side
🔹Cleaner and more maintainable backend architecture
🔹Improved scalability
🔹Reduced redundant API calls
🔹Enhanced user experience with proper validation and UI feedback