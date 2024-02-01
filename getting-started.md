#user stories:

- Get list of cars:
  As users visit the page, the front-end will make a Get request to the backend server to read all information of cars.
  User see cars infos includes name, style, size, transmission type, price, year
  User see buttons to interact with each car (Edit/Delete)
  User see a portion of the result only and is able to paginate through

- Add new car:
  User can create a new car with infos
  User can see the added car immediately and in all future reading requests.

- Edit a car:
  User can edit a specific car infos
  User can see this update immediately and in any future reading request

- Delete a car:
  User can delete a car
  User can no longer see the deleted car immediately and in any future reading request.
  ................................................

#Endpoint APIs:

- Get list of cars:
  READ
  @route GET /car

- Add new car:
  CREATE
  @route POST /car

- Edit a car:
  UPDATE
  @route PUT /car/:id

- Delete a car:
  DELETE
  @route DELETE /car/:id
