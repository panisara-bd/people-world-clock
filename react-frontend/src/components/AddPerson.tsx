import React, {
  FormEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import useToken from '../context/useToken';
import { API_BASE_URL, API_KEY } from '../config';

type LocationInfo = {
  city: string;
  country: string;
  timeZoneId: string;
};

type Props = {
  fetchPeople: () => void;
};

const AddPerson: React.FC<Props> = ({ fetchPeople }) => {
  const [name, setName] = useState('');
  const [locationInfo, setLocationInfo] = useState<LocationInfo | null>(null);
  const [errMessage, setErrMessage] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);
  const mapOptions = {
    fields: ['address_components', 'geometry', 'name'],
    types: ['locality'],
  };
  useEffect(() => {
    const autocomplete = new window.google.maps.places.Autocomplete(
      inputRef.current as any,
      mapOptions
    );

    autocomplete.addListener('place_changed', async () => {
      const place = autocomplete.getPlace();
      const city =
        place.address_components?.find((component) =>
          component.types.includes('locality')
        )?.long_name || '';
      const country =
        place.address_components?.find((component) =>
          component.types.includes('country')
        )?.long_name || '';
      const lat = place.geometry?.location?.lat();
      const lng = place.geometry?.location?.lng();
      const timestamp = Math.round(Date.now() / 1000);
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/timezone/json?location=${lat}%2C${lng}&timestamp=${timestamp}&key=${API_KEY}`
      );
      const { timeZoneId } = await response.json();
      setLocationInfo({ city, country, timeZoneId });
    });
  }, []);
  const { token } = useToken();
  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrMessage('');

    if (name === '' || locationInfo === null) {
      setErrMessage('Please provide name and location');
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/people`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          ...locationInfo,
        }),
      });
      if (res.status === 201) {
        setName('');
        setLocationInfo(null);
        fetchPeople();
      } else {
        setErrMessage('Please provide name and location');
      }
    } catch (err) {
      setErrMessage('Cannot create person');
    }
  };
  const onLocationFocus = () => {
    if (!inputRef.current) {
      return;
    }
    inputRef.current.value = '';
    setLocationInfo(null);
  };
  return (
    <div>
      <form className="add-person__form" onSubmit={handleFormSubmit}>
        <label className="add-person__label" htmlFor="name">
          Name:
        </label>
        <input
          className="add-person__input"
          type="text"
          id="name"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="off"
        />
        <label className="add-person__label" htmlFor="name">
          Location:
        </label>
        <input
          className="add-person__input"
          ref={inputRef}
          onFocus={onLocationFocus}
        />
        <button className="add-person__button" id="addPerson" type="submit">
          Add
        </button>
      </form>
      <div className="add-person__err-message">
        {errMessage ? <p className="errorMessage">{errMessage}</p> : null}
      </div>
    </div>
  );
};

export default AddPerson;
