# TOGGLE SWITCH

How to toggle multiple items at the same time?

## TABLE OF CONTENTS
1. [REACT HOOKS]
2. [EXAMPLES]
3. [REFERENCES]


```
import PropTypes from 'prop-types';
import classnames from 'classnames';
import isString from 'lodash/isString';
import React, { Component } from 'react';
import isBoolean from 'lodash/isBoolean';
import isFunction from 'lodash/isFunction';
import './index.scss';

class ToggleSwitch extends Component {}

ToggleSwitch.propTypes = {
  theme: PropTypes.string,
  enabled: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.func
  ]),
  onStateChanged: PropTypes.func
}

export default ToggleSwitch;
```

## REFERENCES

- https://www.digitalocean.com/community/tutorials/how-to-build-a-custom-toggle-switch-with-react
- https://javascript.plainenglish.io/how-to-do-conditional-rendering-in-react-and-create-a-toggle-button-4a0e3b5565ed 
