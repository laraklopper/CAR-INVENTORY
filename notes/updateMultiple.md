# UPDATE MULTIPLE CARS

```
 const updateMultipleCars = async () => {
    try {
      const response = await fetch('http://localhost:3001/updateMultipleCars', {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          oldOwner: 'oldOwner',
          newOwner: 'newOwner',
          oldMake: 'oldMake',
          newMake: 'newMake',
          oldRegistration: 'oldRegistration',
          newRegistration: 'newRegistration',
          oldModel: 'oldModel',
          newModel: 'newModel'
        }),
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('No cars found for update');
        } else {
          throw new Error('Failed to update car details');
        }
      }

      const updatedCars = await response.json();
      console.log('Cars updated successfully', updatedCars);
    } catch (error) {
      console.error('Error updating cars:', error.message);
      setError('Error updating cars:', error.message);
    }
  };
  ```
