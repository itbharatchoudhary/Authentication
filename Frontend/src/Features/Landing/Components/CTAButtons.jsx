import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button.jsx';
import { ROUTES } from '../../../utils/constants.js';

export default function CTAButtons({ guestMode }) {
  const navigate = useNavigate();
  return (
    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
      <Button size="lg" onClick={() => navigate(ROUTES.REGISTER)}>Get Started — Free</Button>
      <Button variant="ghost" size="lg" onClick={() => navigate(ROUTES.HOME)}>
        {guestMode ? 'Continue Exploring →' : 'Browse as Guest →'}
      </Button>
    </div>
  );
}