import { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import API from "../api/axios";

const LocationPicker = ({ setLocation }) => {
  useMapEvents({
    async click(e) {
      const { lat, lng } = e.latlng;

      // 🔁 Reverse Geocoding
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
          data.address?.neighbourhood ||
          data.address?.road ||
          data.display_name ||
          "",
      }));
    },
  });
  return null;
};

const CreateReport = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("traffic");
  const [location, setLocation] = useState({
    area: "",
    latitude: 12.9716,
    longitude: 77.5946,
  });

  // 🔍 Forward Geocoding (search by area)
  const searchLocation = async () => {
    if (!location.area) return;

    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${location.area}`
    );
    const data = await res.json();

    if (data.length > 0) {
      setLocation((prev) => ({
        ...prev,
        latitude: parseFloat(data[0].lat),
        longitude: parseFloat(data[0].lon),
      }));
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    await API.post("/reports", {
      title,
      description,
      type,
      location,
    });

    alert("Report submitted successfully");
  };

  return (
    <div className="container mt-4">
      <h2>Create Report</h2>

      <form onSubmit={submitHandler}>
        <input
          className="form-control mb-2"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          className="form-control mb-2"
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <select
          className="form-control mb-2"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="traffic">Traffic</option>
          <option value="pothole">Pothole</option>
        </select>

        {/* 📍 AREA INPUT */}
        <div className="d-flex mb-2 gap-2">
          <input
            className="form-control"
            placeholder="Area / Address"
            value={location.area}
            onChange={(e) =>
              setLocation({ ...location, area: e.target.value })
            }
          />
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={searchLocation}
          >
            Search
          </button>
        </div>

        {/* 🗺️ MAP */}
        <MapContainer
          center={[location.latitude, location.longitude]}
          zoom={13}
          style={{ height: "350px", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="© OpenStreetMap"
          />
          <Marker position={[location.latitude, location.longitude]} />
          <LocationPicker setLocation={setLocation} />
        </MapContainer>

        <button className="btn btn-success w-100 mt-3">
          Submit Report
        </button>
      </form>
    </div>
  );
};

export default CreateReport;
