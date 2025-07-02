function formatExposureTime(exposureTime) {
  if (!exposureTime) return '';
  return exposureTime < 1 ? `1/${Math.round(1 / exposureTime)}` : exposureTime.toString();
}

module.exports = { formatExposureTime };
