/// < reference types="cypress" />"

describe('Our first suite', () =>{

  it('first test', () => {

    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()

    // by Tag Name
    cy.get('input')

    // by id
    cy.get('#inputEmail1')

    // by Class name
    cy.get('.input-full-width')

    // by attribute name
    cy.get('[placeholder]')

    // by name and value
    cy.get('[placeholder="Email"]')

    // by class value
    cy.get('[class="input-full-width size-medium shape-rectangle"]')

    // by Tag name attribute with value
    cy.get('input[placeholder="Email"]')

    // by two different attribute
    cy.get('input[placeholder="Email"][fullwidth][type="email"]')

    // by tag name, attribute value id and class name
    cy.get('input[placeholder="Email"]#inputEmail1.input-full-width')

    // The most recommended way by cypress
    cy.get('[data-cy="inputEmail1"]')


  })

  it('second test', () => {

    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()


    cy.get('[cy-data="SignInButton"]')

    cy.contains('Sign in')

    cy.contains('[status="warning"]', 'Sign in')

    cy.get('#inputEmail3')
      .parents('form')
      .find('button')
      .should('contain', 'Sign in')
      .parents('form')
      .find('nb-checkbox')
      .click()

    cy.contains('nb-card', 'Horizontal form').find('[type="Email"]')


  })

  it('then and wrap methods', () =>{

    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()

    // cy.contains('nb-card', 'Using the Grid').find('[for="inputEmail1"]').should('contain', 'Email')
    // cy.contains('nb-card', 'Using the Grid').find('[for="inputPassword2"]').should('contain', 'Password')
    //
    // cy.contains('nb-card', 'Basic form').find('[for="exampleInputEmail1"]').should('contain', 'Email')
    // cy.contains('nb-card', 'Basic form').find('[for="exampleInputPassword1"]').should('contain', 'Password')

    cy.contains('nb-card', 'Using the Grid').then(firstForm => {
      const emailLabelFirst = firstForm.find('[for="inputEmail1"]').text()
      const passwordLabelFirst = firstForm.find('[for="inputPassword2"]').text()
      expect(emailLabelFirst).to.equal("Email")
      expect(passwordLabelFirst).to.equal("Password")

      cy.contains('nb-card', 'Basic form').then(secondForm => {
        const emailLabelSecond = secondForm.find('[for="exampleInputEmail1"]').text()
        const passwordLabelSecond = secondForm.find('[for="exampleInputPassword1"]').text()
        expect(emailLabelSecond).to.equal("Email address")
        expect(passwordLabelFirst).to.equal(passwordLabelSecond)

        cy.wrap(secondForm).find('[for="exampleInputPassword1"]').should('contain', 'Password')

      })

    })

  })

  it('invoke command', () =>{
    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()

    cy.contains('nb-card', 'Using the Grid').find('[for="inputEmail1"]').should('contain', 'Email')

    cy.get('[for="exampleInputEmail1"]').then(label => {
      expect(label.text()).to.equal('Email address')

    })

    cy.get('[for="exampleInputEmail1"]').invoke('text').then(text => {
      expect(text).to.equal('Email address')
    })

    cy.contains('nb-card', 'Basic form')
      .find('nb-checkbox')
      .click()
      .find('.custom-checkbox')
      .invoke('attr', 'class')
      //.should('contain', 'checked')
      .then(classValue => {
        expect(classValue).to.contain('checked')
      })
  })

  it('assert property', () =>{
    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Datepicker').click()
    cy.contains('nb-card', 'Common Datepicker').find('input').then(input =>{
      cy.wrap(input).click()
      cy.get('nb-calendar-day-picker').contains('17').click()
      cy.wrap(input).invoke('prop', 'value').should('contain', 'Feb 17, 2021')
    })
 })

  it('Radio buttons', () =>{
    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()

    cy.contains('nb-card', "Using the Grid").find('[type="radio"]').then(radioButtons => {
    cy.wrap(radioButtons)
      .first()
      .check({force: true})
      .should('be.checked')

    cy.wrap(radioButtons)
      .eq(1)
      .check({force: true})

     cy.wrap(radioButtons)
      .first()
      .should('not.be.checked')

    cy.wrap(radioButtons)
      .eq(2)
      .should('not.be.checked')

    })

  })

  it('checkboxes', () =>{
    cy.visit('/')
    cy.contains('Modal & Overlays').click()
    cy.contains('Toastr').click()

    //cy.get('[type="checkbox"]').check({force: true})
    cy.get('[type="checkbox"]').first().click({force: true})


  })

  it('list and dropdown', () =>{
    cy.visit('/')
    // cy.get('nav nb-select').click()
    // cy.get('.options-list').contains('Dark').click()
    // cy.get('nav nb-select').should('contain', 'Dark')
    // cy.get('nb-layout-header nav').should('have.css', 'background-color', 'rgb(34, 43, 69)')

    cy.get('nav nb-select').then(dropdown => {
      cy.wrap(dropdown).click()
      cy.get('.options-list nb-option').each((listItem, index) => {
        const itemText = listItem.text().trim()
        const colors = {
          "Light":"rgb(255, 255, 255)",
          "Dark":"rgb(34, 43, 69)",
          "Cosmic":"rgb(50, 50, 89)",
          "Corporate":"rgb(255, 255, 255)"
        }

        cy.wrap(listItem).click()
        cy.wrap(dropdown).should('contain', itemText)
        cy.get('nb-layout-header nav').should('have.css', 'background-color', colors[itemText])
        if(index < 3){
          cy.wrap(dropdown).click()
        }


      })
    })

  })

  it('tables', () =>{

    cy.visit('/')
    cy.contains('Tables & Data').click()
    cy.contains('Smart Table').click()

    // 1
    cy.get('tbody').contains('tr', 'Larry').then(tableRow =>{
      cy.wrap(tableRow).find('.nb-edit').click()
      cy.wrap(tableRow).find('[placeholder="Age"]').clear().type('25')
      cy.wrap(tableRow).find('.nb-checkmark').click()
      cy.wrap(tableRow).find('td').eq(6).should('contain', '25')

    })

    // 2
    cy.get('thead').find('.nb-plus').click()
    cy.get('tr').eq(2).then(NewRow =>{
      cy.wrap(NewRow).find('[placeholder="First Name"]').type('Santiago')
      cy.wrap(NewRow).find('[placeholder="Last Name"]').type('Velez')
      cy.wrap(NewRow).find('.nb-checkmark').click()
    })

    cy.get('tbody tr').first().find('td').then(AddedRow =>{
      cy.wrap(AddedRow).eq(2).should('contain', 'Santiago')
      cy.wrap(AddedRow).eq(3).should('contain', 'Velez')
    })

    // 3
    const Age = [20, 30, 40, 200]

    cy.wrap(Age).each(Age =>{
      cy.get('thead tr').eq(1).find('[placeholder="Age"]').clear().type(Age)
      cy.wait(500)

      cy.get('tbody tr').each((tableRow, index) =>{
        if(Age == 200){
          cy.wrap(tableRow).should('contain', 'No data found')
        }else{
           cy.wrap(tableRow).find('td').eq(6).should('contain', Age)
        }

      })

    })

  })

  it('date picker', () =>{

    function selectDayFromCurrent(day){
        let date = new Date()
        date.setDate(date.getDate() + day)
        let futureDay = date.getDate()
        let futureMonth = date.toLocaleString('default', {month: 'short'})
        let DateAssert = futureMonth+' '+futureDay+', '+date.getFullYear()

        cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then(dateAttribute => {
          if (!dateAttribute.includes(futureMonth)) {
            cy.get('[data-name="chevron-right"]').click()
            selectDayFromCurrent(day)
          } else {
            cy.get('nb-calendar-day-picker [class="day-cell ng-star-inserted"]').contains(futureDay).click()
          }
        })
        return DateAssert
      }

    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Datepicker').click()
    cy.contains('nb-card', 'Common Datepicker').find('input').then(input =>{
      cy.wrap(input).click()
      let DateAssert = selectDayFromCurrent(43)
      cy.wrap(input).invoke('prop', 'value').should('contain', DateAssert)
    })

  })

  it('tool tips', () =>{

    cy.visit('/')
    cy.contains('Modal & Overlay').click()
    cy.contains('Tooltip').click()

    cy.contains('nb-card', 'Colored Tooltips')
      .contains('Default').click()
    cy.get('nb-Tooltip').should('contain', 'This is a tooltip')

  })

  it('dialogBox', () =>{
    cy.visit('/')
    cy.contains('Tables & Data').click()
    cy.contains('Smart Table').click()

    //1
    cy.get('tbody tr').first().find('.nb-trash').click()
    cy.on('window:confirm', (confirm) =>{
      expect(confirm).to.equal('Are you sure you want to delete?')
    })

    // 2
    const stub = cy.stub()
    cy.on('window:confirm', stub)
    cy.get('tbody tr').first().find('.nb-trash').click().then(()=>{
      expect(stub.getCall(0)).to.be.calledWith('Are you sure you want to delete?')
    })

    // 3
    cy.get('tbody tr').first().find('.nb-trash').click()
    cy.on('window:confirm', () => false)



  })

})
