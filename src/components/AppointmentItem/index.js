import {format} from 'date-fns'

import './index.css'

const AppointmentItem = props => {
  const {details, toggleStar} = props
  const {id, title, date, isStarred} = details
  const appointmentDate = format(new Date(date), 'dd MMMM yyyy, EEEE')
  const starredImage = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onClickStar = () => {
    toggleStar(id)
  }

  return (
    <li className="appointment-item">
      <div className="title-container">
        <p className="title">{title}</p>
        <button
          type="button"
          className="star"
          data-testid="star"
          onClick={onClickStar}
        >
          <img src={starredImage} alt="star" className="star-image" />
        </button>
      </div>
      <p className="date">Date: {appointmentDate}</p>
    </li>
  )
}

export default AppointmentItem
