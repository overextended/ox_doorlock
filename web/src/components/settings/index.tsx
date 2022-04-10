import { Typography, Box } from "@mui/material";
import Checkboxes from "./Checkboxes";
import AuthorisationButtons from "./AuthorisationButtons";
import TextFields from "./TextFields";
import Submit from "./Submit";
import DoorName from "./DoorName";

const Settings: React.FC = () => {
  return (
    <>
      <Box
        height="fit-content"
        bgcolor="rgba(0, 0, 0, 0.8)"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        color="white"
        p={3}
        pt={2}
        width={250}
        borderRadius={1}
        textAlign="center"
      >
        <Typography style={{ marginBottom: "0.7rem" }}>
          Optional settings
        </Typography>
        <DoorName />
        <AuthorisationButtons />
        <TextFields />
        <Checkboxes />
        <Submit />
      </Box>
    </>
  );
};

export default Settings;
