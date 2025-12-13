const Map = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "400px",
        borderRadius: "12px",
        overflow: "hidden",
      }}
    >
      <iframe
        title="Google Map - Iwo, Osun"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63269.52065310281!2d4.141436849380919!3d7.645995546618408!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1039db0e6d74358b%3A0xcc0948ba39ef7541!2sIwo%20232102%2C%20Osun!5e0!3m2!1sen!2sng!4v1759619001977!5m2!1sen!2sng"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default Map;
