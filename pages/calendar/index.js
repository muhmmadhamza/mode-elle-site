// Update the path for your API client file.
import axios from "axios";
import styled from "styled-components";

import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import listPlugin from "@fullcalendar/list"; // a plugin!
import luxon2Plugin from "@fullcalendar/luxon2";
import { useRef } from "react";

// Update the path for your route resolver file.

const PageWrapper = styled.div`
  //padding: 16px 0;
`;

const Page = ({ data }) => {
  const windowSize =
    typeof window !== "undefined"
      ? useRef([window.innerWidth, window.innerHeight])
      : 1000;

  const initialView =
    windowSize?.current && windowSize.current[0] >= 900
      ? "dayGridMonth"
      : "listWeek";

  return (
    <>
      <div style={{ width: "100%", maxWidth: 1400, padding: 32 }}>
        <FullCalendar
          plugins={[dayGridPlugin, listPlugin, luxon2Plugin]}
          initialView={initialView}
          initialEvents={data.events}
          timeZone="America/Toronto"
          height={
            windowSize?.current && windowSize.current[0] >= 900 ? 1200 : 800
          }
        />
      </div>
    </>
  );
};

export async function getStaticProps() {
  const domain =
    process.env.NODE_ENV === "production"
      ? "https://www.example.com"
      : "http://localhost:3000";

  const { data } = await axios.get(`${domain}/api/my-mode-elle/calendar`);

  return {
    props: {
      data,
    },
  };
}

export default Page;
