# TOGGLE SWITCH
In React, a toggle functionality is commonly implemented to switch between two states, such as showing and hiding content or changing the appearance of an element. 


## TABLE OF CONTENTS
1. [EXAMPLES](#examples)
2. [REFERENCES](#references)

## EXAMPLES

```
import React, { useState } from 'react';

// Functional component named Toggle
export default function Toggle() {
  // State variable isToggleOn with initial value true, and setToggleOn is the function to update it
  const [isToggleOn, setToggleOn] = useState(true);

  // Event handler function for the button click
  const handleClick = () => {
    // Updating the state based on the previous state using the functional update form
    setToggleOn(prevState => !prevState);
  };

//===================JSX RENDERING=============================
  // Rendering the button with an onClick event that triggers the handleClick function
  return (
    <button onClick={handleClick}>
      {/* Displaying 'ON' if isToggleOn is true, 'OFF' otherwise */}
      {isToggleOn ? 'ON' : 'OFF'}
    </button>
  );
}
```
```
import { useState } from 'react'

export const Toggle = ({ label, toggled, onClick }) => {
    const [isToggled, toggle] = useState(toggled)

    const callback = () => {
        toggle(!isToggled)
        onClick(!isToggled)
    }

    return (
        <label>
            <input type="checkbox" defaultChecked={isToggled} onClick={callback} />
            <span />
            <strong>{label}</strong>
        </label>
    )
}
```
```
import React, { useState } from "react";

export default function App() {
  let [changeText, setChangeText] = useState(true);
  const handleChange = () => {
    return setChangeText(!changeText);
  };

  return (
    <div>
      <button onClick={() => handleChange()}>click me</button>
      {changeText ? "Apple" : "Banana"}
    </div>
  );
}
```
## REFERENCES

- https://www.digitalocean.com/community/tutorials/how-to-build-a-custom-toggle-switch-with-react
- https://javascript.plainenglish.io/how-to-do-conditional-rendering-in-react-and-create-a-toggle-button-4a0e3b5565ed
- https://webtips.dev/toggle-buttons-in-react 
