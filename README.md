### Wiki Coding Task

- Used a personal reference template for a basic Node.js REST server, which can be found [here](https://github.com/jord2097/rest_ref)

## Technologies

- Node.js with Express for the server
- MongoDB database using Mongoose as ORM

## Checklist 

- [x] Schema Design of Documents and Revisions Collections
- [x] View all available titles (latest revision)
- [x] View list of revisions of any document
- [x] View document as it was at an exact timestamp
- [x] View latest version of a document
- [x] Post a new document or update an existing document with a new revision
- [x] Error handling for common errors - such as invalid titles, incorrect timestamp format and where there are no results.
- [ ] Testing using Jest and Supertest, to ensure proper error handling
- [ ] Dynamic timestamp search e.g. two versions at 1pm/3pm, searching 2pm provides 1pm as result