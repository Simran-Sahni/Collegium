# Collegium
## Online Discussion Forum

Built in an attempt to fulfill [Microsoft Engage 2021 FTE Program](https://microsoft.acehacker.com/fte2021/)


# Problem Statement
Make a functional prototype of an online forum to help students be connected with online mode of education amidst pandemic

# Solution approach
Using MERN stack to build a online forum where students can put forth their ideas/doubts/announcements etc 

## Features running in the prototype
-   Login/Signup (independant as well as along with Google Sign-in) 
-   Creating Groups & Posts
-   Liking & deleting posts

## Future scope
-   UI improvement
-   Removing bugs in the current version, along with enabling robust state management, currently using Redux
-   Adding real time 1-1 chat between peers using socket.io


## Helpful Online Projects for inspiration
- [Javascript Mastery MERN memories project](https://youtube.com/playlist?list=PL6QREj8te1P7VSwhrMf3D3Xt4V6_SRkhu)
- [Lama Dev's FB clone project](https://youtu.be/pFHyZvVxce0)

### Replication instructions
- Add a .env file to the backend folder, in that add variables names DB_ADMIN & DB_PASSWORD with your MongoDB database credentials
- Add a myJWTsecret variable to the same .env file
- ```cd frontend``` & ```cd backend``` on 2 terminals, npm install to setup the dependancies
- ```npm start``` in both the terminals

[Video link](https://drive.google.com/file/d/1bhRkGOsrlDpFr-jCJqqBICpJrO5NwV6z/view)

*Special Thanks to my Mentor, Mr Chirag Jindal, from Microsoft, for following up & guiding throughout the way*


