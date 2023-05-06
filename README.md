## React Star Wars Game

This is a 3D game built with React, ReactThree, Three.js, Cannon.js, and Zustand. It is a simple game where the player can move around a scene and shoot projectiles or use the Force to move objects.

### Technologies Used

- React
- Three.js
- ReactThree
- Cannon.js
- Zustand
- Express.js

### Setup

1. Clone the repository.
2. Install the dependencies using `npm install`.
3. Run the development server using `npm run dev`.
4. Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

### Features

- The player can move around the scene using the arrow keys and jump with the space bar.
- The player can aim with the mouse and shoot by clicking the mouse.
- The player can switch between weapons using the "1" and "2" keys.
- The player can activate the Force using the "F" key.
- The player can hold up his/her hand to the camera to use the Force.
- The game has a simple physics engine that uses ReactThree, Three.js and Cannon.js.
- The game state is managed using Zustand, a simple state management library.

### Components

- `Game` - The main component that renders the game scene and manages the game state.
- `Player` - A component that renders the player model and handles player movement and jumping.
- `Ground` - A component that renders the ground model and handles collisions with other objects.
- `Projectile` - A component that renders a projectile model and handles its movement and collisions.
- `Forceprojectile` - A component that renders a Force projectile model and handles its movement and collisions.
- `Hall` - A component that renders a Hall model.
- `Carbonite` - A component that renders a Carbonite model.
- `Darth` - A component that renders a Darth model.
- `ATAT` - A component that renders an ATAT model.

### License

This project is licensed under the MIT License.
