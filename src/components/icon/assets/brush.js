import React from 'react';

const WuiIconBrush = ({ title, titleId, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M11.993 8.17c0 .83-.673 1.507-1.499 1.507H5.498A1.505 1.505 0 013.999 8.17V6.662h7.994V8.17zm-2.998 5.998c0 .455-.448.827-.999.827-.55 0-1-.372-1-.827v-3.486h2v3.486zM4 5.658V1.005h1.262v4.653H4zm2.261 0V1.005h1.244v4.653H6.26zm2.244 0V1.005h1.235v4.653H8.504zm2.234 0V1.005h1.254v4.653h-1.254zM3.008 0L3 8.17a2.509 2.509 0 002.498 2.512h.5v3.486c0 1.01.896 1.832 1.998 1.832 1.102 0 1.998-.822 1.998-1.832v-3.486h.5a2.509 2.509 0 002.498-2.512L13 0H3.008z" />
  </svg>
);

export const icon = WuiIconBrush;
