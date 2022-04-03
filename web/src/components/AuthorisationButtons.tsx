import { Button } from '@mui/material';

const AuthorisationButtons: React.FC = () => {
  return (
    <>
      <Button fullWidth style={{ marginBottom: '0.7rem' }} variant="outlined">
        Job Authorisation
      </Button>
      <Button fullWidth style={{ marginBottom: '0.7rem' }} variant="outlined">
        Item Authorisation
      </Button>
    </>
  );
};

export default AuthorisationButtons;
