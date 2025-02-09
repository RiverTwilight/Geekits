import React from "react";
import Box from "@mui/material/Box";

interface MainSectionProps {
  children: React.ReactNode;
}

const MainSection: React.FC<MainSectionProps> = ({ children }) => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        marginTop: "65px", // 65px is the height of the header, plus some padding
        marginRight: {
          xs: "0",
          sm: "8px",
        },
        marginBottom: {
          xs: "0",
          sm: "8px",
        },
        paddingX: { sm: 4, xs: 3 },
        paddingY: 2,
        background: (theme) => theme.palette.background.paper,
        borderRadius: { xs: "0px", sm: "24px" },
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          maxWidth: "1180px",
          width: "100%",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default MainSection; 
