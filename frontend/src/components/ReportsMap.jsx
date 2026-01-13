import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const ReportsMap = ({ reports }) => {
  const validReports = reports.filter(
    (r) =>
      r.location &&
      r.location.latitude &&
      r.location.longitude
  );

  if (validReports.length === 0) {
    return (
      <p className="text-center text-muted">
        No locations to display on map
      </p>
    );
  }

  return (
    <MapContainer
      center={[
        validReports[0].location.latitude,
        validReports[0].location.longitude,
      ]}
      zoom={12}
      style={{ height: "400px", width: "100%", borderRadius: "12px" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="© OpenStreetMap"
      />

      {validReports.map((r) => (
        <Marker
          key={r._id}
          position={[
            r.location.latitude,
            r.location.longitude,
          ]}
        >
          <Popup>
            <strong>{r.title}</strong>
            <br />
            {r.location.area}
            <br />
            <small>{r.createdBy?.email}</small>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default ReportsMap;
