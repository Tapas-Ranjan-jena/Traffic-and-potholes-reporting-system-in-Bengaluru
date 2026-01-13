import { MapContainer, TileLayer, Marker } from "react-leaflet";

const ReportPreviewMap = ({ latitude, longitude }) => {
  if (!latitude || !longitude) return null;

  return (
    <MapContainer
      center={[latitude, longitude]}
      zoom={15}
      style={{
        height: "180px",
        width: "100%",
        borderRadius: "12px",
      }}
      dragging={false}
      scrollWheelZoom={false}
      doubleClickZoom={false}
      zoomControl={false}
      attributionControl={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[latitude, longitude]} />
    </MapContainer>
  );
};

export default ReportPreviewMap;
