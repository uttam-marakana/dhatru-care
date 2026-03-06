import PropTypes from "prop-types";

export default function GoogleMapEmbed({
  height = "450px",
  title = "Dhatru Care Hospital Location",
  className = "",
}) {
  const mapEmbedUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3719.123456789!2d70.7890123456789!3d21.960123456789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e9b123456789%3A0xabcdef123456789!2sGondal%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1698765432100!5m2!1sen!2sin";

  return (
    <div
      className={`
      group
      w-full rounded-2xl overflow-hidden
      border border-[var(--border)]
      bg-[var(--card)]
      transition-all duration-500
      hover:-translate-y-1
      hover:border-[var(--color-primary)]/40
      hover:shadow-[0_0_40px_var(--glow-soft)]
      ${className}
      `}
    >
      <iframe
        src={mapEmbedUrl}
        width="100%"
        height={height}
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={title}
      />
    </div>
  );
}

GoogleMapEmbed.propTypes = {
  height: PropTypes.string,
  title: PropTypes.string,
  className: PropTypes.string,
};
