import {Component} from 'react'
import {v4} from 'uuid'
import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {title: '', date: '', appointments: [], isStarredActive: false}

  starredItems = () => {
    this.setState(prevState => ({isStarredActive: !prevState.isStarredActive}))
  }

  toggleStar = id => {
    this.setState(prevState => ({
      appointments: prevState.appointments.map(each => {
        if (each.id === id) {
          return {...each, isStarred: !each.isStarred}
        }
        return each
      }),
    }))
  }

  getFilteredItems = () => {
    const {appointments, isStarredActive} = this.state
    if (isStarredActive) {
      return appointments.filter(each => each.isStarred === true)
    }
    return appointments
  }

  addAppointment = event => {
    event.preventDefault()
    const {title, date} = this.state

    const newAppointment = {
      id: v4(),
      title,
      date,
      isStarred: false,
    }

    this.setState(prevState => ({
      appointments: [...prevState.appointments, newAppointment],
      title: '',
      date: '',
    }))
  }

  titleInput = event => this.setState({title: event.target.value})

  dateInput = event => this.setState({date: event.target.value})

  render() {
    const {title, date, isStarredActive} = this.state
    const activeStarredButton = isStarredActive ? 'button active' : 'button'
    const filteredAppointments = this.getFilteredItems()
    return (
      <div className="bg-container">
        <div className="app-container">
          <div className="appointments-container">
            <div className="appointments-inputs">
              <form className="form" onSubmit={this.addAppointment}>
                <h1 className="heading">Add Appointments</h1>
                <label htmlFor="title" className="label">
                  TITLE
                </label>
                <input
                  id="title"
                  className="inputs"
                  type="text"
                  value={title}
                  onChange={this.titleInput}
                />
                <label htmlFor="date" className="label">
                  DATE
                </label>
                <input
                  id="date"
                  type="date"
                  className="inputs"
                  value={date}
                  onChange={this.dateInput}
                />
                <button type="submit" className="add-button">
                  Add
                </button>
              </form>
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="image"
              />
            </div>
            <hr className="line" />
            <div className="starred-button-container">
              <p className="appointments">Appointments</p>
              <button
                type="button"
                className={activeStarredButton}
                onClick={this.starredItems}
              >
                Starred
              </button>
            </div>
            <ul className="lists-container">
              {filteredAppointments.map(each => (
                <AppointmentItem
                  details={each}
                  key={each.id}
                  toggleStar={this.toggleStar}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
