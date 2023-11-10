# MODULAR CODE

Modular code in React.js refers to organizing your codebase into smaller, independent, and reusable modules or components. This approach helps improve code readability, maintainability, and reusability. 
The approach is to define each component into different files.

## CONCEPT

### KEY CONCEPTS AND PRACTICES FOR WRITING MODULAR CODE IN REACT.JS:

1. **Component-Based Architecture:**
   - Break your UI into small, reusable components.
   - Each component should ideally have a single responsibility.

```jsx
// Example of a modular React component

// Header.js
import React from 'react';

const Header = () => {
  return <header>My App Header</header>;
};

export default Header;
```

2. **Directory Structure:**
   - Organize your components into a clear directory structure.
   - Group related components together.

```plaintext
src/
|-- components/
|   |-- Header.js
|   |-- Sidebar.js
|   |-- MainContent.js
|-- App.js
|-- index.js
```

3. **Reusable Components:**
   - Design components to be reusable across different parts of your application.
   - Pass data to components using props.

```jsx
// Reusable Button component
import React from 'react';

const Button = ({ onClick, label }) => {
  return <button onClick={onClick}>{label}</button>;
};

export default Button;
```

4. **Container and Presentational Components:**
   - Differentiate between container components (manage state, logic) and presentational components (render UI).
   - This helps in separating concerns and makes your code more modular.

```jsx
// Container Component
import React, { useState } from 'react';
import Button from './Button';

const CounterContainer = () => {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <Button onClick={handleIncrement} label="Increment" />
    </div>
  );
};

export default CounterContainer;
```

5. **State Management:**
   - Use state management libraries like Redux for managing global state.
   - Keep the component state local whenever possible.

6. **React Hooks:**
   - Use React hooks to manage state and side effects in functional components.

```jsx
import React, { useState, useEffect } from 'react';

const ExampleComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data or perform side effects
    // Update state with setData
  }, []); // dependency array to control when the effect runs

  return <div>{/* Render UI using the data */}</div>;
};

export default ExampleComponent;
```

7. **Code Splitting:**
   - Use code splitting to load only the necessary code for a particular route or feature, improving performance.

```jsx
// Using React.lazy for code splitting
const MyComponent = React.lazy(() => import('./MyComponent'));
```

## REFERENCES
- https://www.geeksforgeeks.org/how-to-modularize-code-in-reactjs/ 
