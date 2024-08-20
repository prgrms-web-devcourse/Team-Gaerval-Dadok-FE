export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GOOGLE_ID;

type GTagEventTypes = {
  action: string;
  category: string;
  label: string;
  value: number;
};

export const pageview = (url: string) => {
  window.gtag('config', GA_TRACKING_ID as string, {
    page_path: url,
  });
};

export const event = ({ action, category, label, value }: GTagEventTypes) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};
