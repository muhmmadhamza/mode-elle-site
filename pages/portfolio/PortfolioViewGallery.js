//@ts-nocheck
import { Box, Container, Center, MediaQuery } from "@mantine/core";
import Gallery from "./Gallery";
import { useMediaQuery } from "@mantine/hooks";
import { useViewportSize } from "@mantine/hooks";

export default function PortfolioViewGallery(props) {
  const largeScreen = useMediaQuery("(min-width: 1100px)");
  const { height, width } = useViewportSize();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        padding: 0,
        width: "100%",
      }}
    >
      <Center>
        <Container
          sx={(theme) => ({
            padding: "0 !important",
            //width: 400,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",

            "@media (min-width: 900px)": {
              //width: 700,
            },
          })}
        >
          <Gallery
            width={largeScreen ? 900 : width}
            height={largeScreen ? 1050 : 640}
            {...props}
          />
        </Container>
      </Center>
    </Box>
  );
}
