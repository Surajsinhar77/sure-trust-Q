# Student-Teacher Q&A Web Application

## Overview

The Student-Teacher Q&A Web Application is a platform designed to facilitate communication and collaboration between students and teachers. It allows students to ask questions related to their courses and receive answers from their peers and teachers.

## Entity-Relationship Diagram (ERD)

[ERD Image Here]

## Data Models

### User
- `id`: Primary Key
- `name`: Name of the user
- `email`: Email address
- `password`: User password
- `role`: Role of the user (student, teacher, admin)
- `isApproved`: Indicates if the user is approved by the admin
- Other attributes: profilePicture, phoneNo, githubLink, linkedinLink, resume, skillSet, experience

### Course
- `id`: Primary Key
- `name`: Name of the course
- `description`: Description of the course

### Batch
- `id`: Primary Key
- `courseId`: Foreign Key referencing Course
- `batchName`: Name of the batch
- `startDate`: Start date of the batch
- `endDate`: End date of the batch

### Question
- `id`: Primary Key
- `userId`: Foreign Key referencing User
- `courseId`: Foreign Key referencing Course
- `batchId`: Foreign Key referencing Batch
- `text`: Question text
- `images`: Images related to the question
- `codeSnippets`: Code snippets related to the question
- `timestamp`: Timestamp of the question

### Answer
- `id`: Primary Key
- `questionId`: Foreign Key referencing Question
- `userId`: Foreign Key referencing User
- `text`: Answer text
- `images`: Images related to the answer
- `codeSnippets`: Code snippets related to the answer
- `timestamp`: Timestamp of the answer

### Enrollment
- `id`: Primary Key
- `userId`: Foreign Key referencing User
- `courseId`: Foreign Key referencing Course
- `batchId`: Foreign Key referencing Batch

## Relationships

- User can ask questions, provide answers, and enroll in courses and batches.
- Questions, Answers, and Enrollments are related to specific Users.
- Questions are related to Courses and Batches.
- Answers are related to Questions.

## Technologies Used

- Node.js
- Express.js
- MongoDB (Mongoose)

## Installation and Setup

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Set up environment variables (if required).
4. Start the server using `npm start`.

## Usage

1. Register as a user.
2. Log in using your credentials.
3. Ask questions related to your courses.
4. Provide answers to questions asked by others.
5. Enroll in courses and batches to access more features.

## Contributing

Contributions are welcome! Please follow the guidelines outlined in CONTRIBUTING.md.

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

For support or inquiries, please contact [Project Maintainer Name](mailto:example@example.com).
