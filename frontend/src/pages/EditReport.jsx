import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import API from "../api/axios";

const LocationPicker = ({ setLocation }) => {
  useMapEvents({
    async click(e) {
      const { lat, lng } = e.latlng;

      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      const data = await res.json();

      setLocation((prev) => ({
        ...prev,
        latitude: lat,
        longitude: lng,
        area:
          data.address?.suburb ||
          data.address?.road ||
          data.display_name,
      }));
    },
  });
  return null;
};

const EditReport = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("traffic");
  const [location, setLocation] = useState({
    area: "",
    latitude: 12.9716,
    longitude: 77.5946,
  });

  useEffect(() => {
    const fetchReport = async () => {
      const res = await API.get(`/reports/${id}`);
      const r = res.data.data;

      setTitle(r.title);
      setDescription(r.description);
      setType(r.type);
      setLocation(r.location);
    };

    fetchReport();
  }, [id]);

  const submitHandler = async (e) => {
    e.preventDefault();

    await API.put(`/reports/${id}`, {
      title,
      description,
      type,
      location,
    });

    navigate("/dashboard");
  };

  return (
    <div className="container mt-4">
      <h2>Edit Report</h2>

      <form onSubmit={submitHandler}>
        <input
          className="form-control mb-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="form-control mb-2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <select
          className="form-control mb-2"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="traffic">Traffic</option>
          <option value="pothole">Pothole</option>
        </select>

        <input
          className="form-control mb-2"
          value={location.area}
          onChange={(e) =>
            setLocation({ ...location, area: e.target.value })
          }
        />

        <MapContainer
          center={[location.latitude, location.longitude]}
          zoom={13}
          style={{ height: "350px", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[location.latitude, location.longitude]} />
          <LocationPicker setLocation={setLocation} />
        </MapContainer>

        <button className="btn btn-primary w-100 mt-3">
          Update Report
        </button>
      </form>
    </div>
  );
};

export default EditReport;
