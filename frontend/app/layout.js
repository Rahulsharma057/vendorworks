import Providers from "@/components/Providers";
import SiteChrome from "@/components/SiteChrome";
import "./globals.css";

export const metadata = {
  title: "Rana Maintenance & Construction | Gate, Paint, Wiring, Road & Building Work",
  description:
    "Local maintenance and construction vendor — gate repair, painting, fencing, wiring, road work and full building construction. Browse completed jobs and get in touch.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
          <SiteChrome />
        </Providers>
      </body>
    </html>
  );
}
