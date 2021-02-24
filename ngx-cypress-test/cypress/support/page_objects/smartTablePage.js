

export class smartTablePage {

  updateAgeByFirstName(name, age){
    cy.get('tbody').contains('tr', name).then(tableRow =>{
      cy.wrap(tableRow).find('.nb-edit').click()
      //cy.wrap(tableRow).find('td').eq(6).find('.ng-star-inserted').clear().type(age)
      cy.wrap(tableRow).find('[placeholder="Age"]').clear().type(age)
      cy.wrap(tableRow).find('.nb-checkmark').click()
      cy.wrap(tableRow).find('td').eq(6).should('contain', age)
      })

  }

  addNewRecordWithFistAndLastName(firstName, lastName){
    cy.get('thead').find('.nb-plus').click()
    cy.get('tr').eq(2).then(NewRow =>{
      cy.wrap(NewRow).find('[placeholder="First Name"]').type(firstName)
      cy.wrap(NewRow).find('[placeholder="Last Name"]').type(lastName)
      cy.wrap(NewRow).find('.nb-checkmark').click()
    })

    cy.get('tbody tr').first().find('td').then(AddedRow =>{
      cy.wrap(AddedRow).eq(2).should('contain', firstName)
      cy.wrap(AddedRow).eq(3).should('contain', lastName)
    })



    }

   deleteRowByIndex(index){
    const stub = cy.stub()
    cy.on('window:confirm', stub)
    cy.get('tbody tr').eq(index).find('.nb-trash').click().then(()=>{
      expect(stub.getCall(0)).to.be.calledWith('Are you sure you want to delete?')
    })


    }

  }




export const onSmartTablePage = new smartTablePage()
