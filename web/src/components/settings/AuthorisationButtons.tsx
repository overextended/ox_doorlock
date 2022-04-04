import { Button } from '@mui/material';

const AuthorisationButtons: React.FC = () => {
  return (
    <>
      <Button fullWidth style={{ marginBottom: '0.7rem' }} variant="outlined" href="job_auth">
        Job Authorisation
      </Button>

      <Button fullWidth style={{ marginBottom: '0.7rem' }} variant="outlined" href="item_auth">
        Item Authorisation
      </Button>
    </>
  );
};

export default AuthorisationButtons;
