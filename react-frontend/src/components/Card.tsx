import React, { useEffect, useState } from 'react';
import useToken from '../context/useToken';
import { PersonType } from '../types';

type Props = {
  person: PersonType;
  fetchPeople: () => void;
};

const Card: React.FC<Props> = ({ person, fetchPeople }) => {
  const [time, setTime] = useState('');
  const [isActive, setIsActive] = useState<boolean>(false);
  const { token } = useToken();
  const toggleIsActive = () =>
    setIsActive((previousIsActive) => !previousIsActive);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(
        new Date().toLocaleTimeString('en', { timeZone: person.timeZoneId })
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const deletePerson = async () => {
    await fetch(`http://localhost:8080/people/${person._id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    });

    fetchPeople();
  };

  const [hour, minute] = time.split(':');
  const ampm = time.split(' ')[1];

  const [hour24] = new Date()
    .toLocaleTimeString('en', { timeZone: person.timeZoneId, hour12: false })
    .split(':');
  const timeOfDay =
    Number(hour24) >= 5 && Number(hour24) <= 10
      ? 'morning'
      : Number(hour24) >= 11 && Number(hour24) <= 16
      ? 'afternoon'
      : Number(hour24) >= 17 && Number(hour24) <= 20
      ? 'evening'
      : 'night';

  return (
    <div className={`card card--${timeOfDay}`} onClick={toggleIsActive}>
      {isActive && (
        <div className="card__delete" onClick={deletePerson}>
          x
        </div>
      )}
      <p className="card__name">{person.name}</p>
      <p className="card__location">
        {person.city}, {person.country}
      </p>
      <p className="card__time">
        {hour}:{minute} {ampm}
      </p>
    </div>
  );
};

export default Card;
