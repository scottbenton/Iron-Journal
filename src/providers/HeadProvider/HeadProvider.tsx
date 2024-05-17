import { appDetails } from "config/appDetails.config";
import { getPublicAssetPath } from "functions/getPublicAssetPath";
import { useGameSystemValue } from "hooks/useGameSystemValue";
import { PropsWithChildren } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useLocation } from "react-router-dom";

export function HeadProvider(props: PropsWithChildren) {
  const { children } = props;

  const pathname = useLocation().pathname;
  const url = window.location.origin + pathname;

  const details = useGameSystemValue(appDetails);

  return (
    <HelmetProvider>
      <Helmet>
        <title>{details.title}</title>
        <meta property="og:site_name" content={details.title} />
        <meta property="og:title" content={details.title} />
        <link rel="icon" type="image/svg+xml" href={details.icon} />
        <meta property="og:description" content={details.description} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content={getPublicAssetPath("opengraph-default.png")}
        />
        <meta
          property="og:image:secure_url"
          content={getPublicAssetPath("opengraph-default.png")}
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:image"
          content={getPublicAssetPath("opengraph-default.png")}
        />
      </Helmet>
      {children}
    </HelmetProvider>
  );
}
