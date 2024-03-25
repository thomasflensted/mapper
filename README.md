## Mapper

[Try it out right here](https://mapper-ki3d.onrender.com/).

### What is it?

Mapper is a web app that allows anybody with an account to create their own maps on which they can create and save places. You can create as many maps as you like and as many places as you like. Each map has a name and a description and places have a name, description and type. When you open a map, you can view it in *marker* mode or *list* mode, In marker mode, when you click one of your places on a map, a popup with info about the place is shown. In list mode, all your places are listed in a container inside the map. Apart from all map functions, you can edit your email address, password and names.

### Why did I create it?

I created Mapper because I found that Google Map's list option does not have all the functionaly I wanted. More importantly, I created Mapper to practice my programming skills.

### What technologies did I use?

I used many different technologies for Mapper, many of them for the first time. Here's a rundown:

**Backend**:

The backend is a classic **Node** server with **Express** that connects to a **Mongo** database with **Mongoose**. User authentication is handled with [**JWT**](https://jwt.io/). All routes go through a custom piece of middleware to ensure no unauthorized users can access data they're not allowed to - [try it yourself](https://mapper-6zs3.onrender.com/api/map). The application is dependent on three custom Mongoose models: User, Map and Place. Each map is associated with a user and each place is associated with a map - using their respective MongoDB IDs. I handled hashing and salting of passwords with [**bcrypt**](https://www.npmjs.com/package/bcrypt) and validation of email and strength validation of passwords I handled with [**validator**](https://www.npmjs.com/package/validator). 

Before even touching any frontend development I created all models, routes and controllers and took care of all error handling. I tested all of this using **Postman**. This ensured I had data and functionality to work with from the get-go when I started building the frontend.

**Frontend**:

The frontend is entirely built in **React** with **TypeScript** using functional components. Maps, markers and popups I created with [**MapBox**](https://www.mapbox.com/) and [**React Map GL**](https://visgl.github.io/react-map-gl/) which is a React wrapper around the MapBox API. Not all native MapBox map methods are accessible through React Map GL however, but by initializing a ref and attaching it to the map, I got access to all functionality included in MapBox' own [API](https://docs.mapbox.com/mapbox-gl-js/guides).

I handled all styling of the app with **TailwindCSS**. For some components - dropdowns and dialogs mainly - I used [**Radix UI**](https://www.radix-ui.com/)'s unstyled primitives. For animation I either created them just with CSS or used [**Framer Motion**](https://www.framer.com/motion/). All icons are from [React Icons](https://react-icons.github.io/react-icons/).

The project is deployed on [render.com](www.render.com).

### What did I learn?

*TypeScript*: This was my first project using TypeScript. In the beginning it took some extra work and I couldn't really see the benefits - probably mostly because I was tired of my percieved inefficiency. However, that changed quickly as I realized how efficent it was: Way fewer bugs because TypeScript warned me immediately and less ambiguity in my code.

*Limitations of plain React*: While building the project, I realized I should've used a framework like Next.js for a project like this. React is good for single-page applications, but for multi-page applications like this, Next.js would have been the better option. Its server rendering of components would make the user experience smoother (especially the Framer Motion animations) and converting some of the app's state to URL params (which is encouraged in Next.js) would also make the experience smoother for the user. With the current setup, I had to set up some redirect/rewrite rules in order to not get a 404 on reloads. With Next.js this would not have been necessary.

*State management*: As the amount of state grew and I implemented more and more contexts, reducers and hooks, I realized that it probably would've been better to gather a lot of that in the same place using [Redux](https://redux.js.org/) or [Zustand](https://zustand-demo.pmnd.rs/).

*TailwindCSS*: Tailwind makes styling so much faster and more efficient. It enabled me to style components immediately and see the result immediately. No coming up with classnames and remembering classnames I created days earlier.

*Using components libraries*: I used Radix for some components in this project. It is fast, especially combined with Tailwind, but it also introduces some complexity that I am not sure was worth it. Maybe I'll just create my own modals and dropdowns next time.


### To do / upcoming features

- Convert the project to a Next.js project
- Implement image uploads with Amazon S3 and multer.
- Implement *have been/want to go* on place. The property is already built into the Place type and model and I designed it too.
- Auto-add place to another map when place goes from *want to go* to *have been*.
- Share maps and places between users
- Collaborate on maps
- Auto-zoom to markers on load
- Duplicate map and all associated places