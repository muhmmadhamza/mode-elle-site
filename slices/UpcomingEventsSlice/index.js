import styled from "styled-components";
import { RichText } from "prismic-reactjs";
import MaxWidthContent from "../../components/MaxWidthContent/MaxWidthContent";
import SectionHeadingArea from "../../components/SectionHeadingArea/SectionHeadingArea";
import SectionHeading from "../../components/SectionHeading/SectionHeading";

import { useCalendarEvents } from "../../lib/swr-hooks";
import { format } from "date-fns";
import Link from "next/link";
import { DateTime } from "luxon";

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

const InnerWrapper = styled.div`
  height: 400px;
  width: 400px;
  position: relative;
  padding: 0 24px;

  @media screen and (min-width: 1000px) {
    top: calc(-400px - 24px);
    margin-bottom: -400px;
  }

  .calendar-more {
    margin-top: 8px;
    text-decoration: underline;
    font-size: 14.5px;
  }
`;

const CardTest = styled.div`
  width: 100%;
  height: 64px;
  margin-bottom: 12px;
  box-shadow: hsl(36deg 4% 96%) 0px 1px 15px 0px,
    hsl(36deg 4% 70%) 0px 1px 2px 0px;
  background-color: #fff;

  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 16px;
`;

const UpcomingEventsSectionHeadingArea = styled(SectionHeadingArea)`
  //margin: 0 16px 16px 16px;
`;

const UpcomingEventsSectionHeading = styled(SectionHeading)`
  margin-top: 0;
`;

const CardsWrapper = styled.div`
  ///margin: 0 8px;
  //padding-top: 8px;
`;

const DateLabel = styled.div`
  font-size: 80%;
  width: 110px;
  span {
    background-color: #eae8e5;
    padding: 5px 6px;
    border-radius: 2px;
  }
`;

const EventTitle = styled.div`
  padding-left: 8px;
  flex: 1;
  font-size: 90%;
`;

const More = styled.div`
  display: flex;
  flex: 1;
`;

const UpcomingEventsSlice = ({ slice }) => {
  const { data } = useCalendarEvents();
  const SHOW = 5;

  const now = DateTime.now();

  const futureEvents = data?.events?.flatMap((event) => {
    const eventDate = DateTime.fromISO(event.start);
    if (eventDate < now) {
      return [];
    }
    return [event];
  });

  return (
    <MaxWidthContent>
      <Wrapper>
        <InnerWrapper>
          <UpcomingEventsSectionHeadingArea>
            <UpcomingEventsSectionHeading>
              Upcoming events
            </UpcomingEventsSectionHeading>
          </UpcomingEventsSectionHeadingArea>
          {data?.events && (
            <CardsWrapper>
              {futureEvents.slice(0, 4).map((event, i) => {
                return (
                  <CardTest key={i}>
                    <DateLabel>
                      <span>{format(new Date(event.start), "MMMM dd")}</span>
                    </DateLabel>
                    <EventTitle>{event.title}</EventTitle>
                  </CardTest>
                );
              })}
            </CardsWrapper>
          )}
          <More>
            <Link href="/calendar">
              <a className="calendar-more">More events</a>
            </Link>
          </More>
        </InnerWrapper>
      </Wrapper>
    </MaxWidthContent>
  );
};

export default UpcomingEventsSlice;
