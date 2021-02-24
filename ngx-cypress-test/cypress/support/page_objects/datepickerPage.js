

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
            //cy.get('nb-calendar-day-picker [class="day-cell ng-star-inserted"]').contains(futureDay).click()
            cy.get('.day-cell').not('.bounding-month').contains(futureDay).click()

          }
        })
        return DateAssert
      }


export class datepickerPage {

  selectDatePickerFromToday(dateFromToday) {

    cy.contains('nb-card', 'Common Datepicker').find('input').then(input => {
      cy.wrap(input).click()
      let DateAssert = selectDayFromCurrent(dateFromToday)
      cy.wrap(input).invoke('prop', 'value').should('contain', DateAssert)
    })

  }

  selectDateRangeFromToday(firstDay, secondDay) {
    cy.contains('nb-card', 'Datepicker With Range').find('input').then(input => {
      cy.wrap(input).click()
      let DateAssertIsFirst = selectDayFromCurrent(firstDay)
      let DateAssertIsSecond = selectDayFromCurrent(secondDay)
      const finalDateRange = DateAssertIsFirst + ' - ' + DateAssertIsSecond

      cy.wrap(input).invoke('prop', 'value').should('contain', finalDateRange)

    })

  }
}

export const onDatepickerPage = new datepickerPage()

