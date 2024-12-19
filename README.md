dummy emails:-
user@example.com
sam@example.com

Demo URL:- https://kudospot-7rfs.onrender.com/

Note:- Demo is hosted on render free plan so might be slow on first load (Your free instance will spin down with inactivity, which can delay requests by 50 seconds or more.)

Steps to start:-

1. Run `sh build.sh` at root of repo.
2. Run `cd server && node index.js` to start server.
3. Client will be server at root url.
   Example:- https://kudospot-7rfs.onrender.com/

Schema Description

kudosSchema
toperson (String, Required): The recipient of the kudos.
badge (String, Required): The type of recognition given.
reason (String, Required): The reason for awarding the kudos.
user (String, Optional): The user who gave the kudos.
likedBy ([String]): An array of users who liked the kudos.

userSchema
username (String, Optional): The name of the user.
email (String, Required, Unique): The email address of the user, must be unique.
