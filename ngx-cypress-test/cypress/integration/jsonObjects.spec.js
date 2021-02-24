

describe('JSON objects', () =>{
  it('JSON objects', () =>{
    cy.openHomePage()

    const simpleObject = {"key": "value","key2": "value2"}

    const simpleArrayOfValues = ["one", "two", "three"]

    const arrayOfObjects = [{"key": "value"},
      {"key2": "value1"},
      {"key3": "value2"} ]

    const typesofData = {"String": "this is a string", "number": 10}

    const mix = {
      "FirstName": "Santiago",
      "LastName": "Vel",
      "Age": 45,
      "Students": [
        {"firstName": "Maria",
        "lastName": "Fal"
        },
        {
          "fistName": "Luis",
          "lastName": "Perez"
        }
      ]

    }


    console.log(simpleObject.key2)
    console.log(simpleObject["key2"])
    console.log(simpleArrayOfValues[1])
    console.log(arrayOfObjects[2].key3)
    console.log(mix.Students[0].firstName)


  })



})
