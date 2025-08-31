import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.bc791585fb4e45ebb300ace9460b6ec2',
  appName: 'Food Facts Scanner',
  webDir: 'dist',
  server: {
    url: 'https://bc791585-fb4e-45eb-b300-ace9460b6ec2.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    Camera: {
      permissions: ['camera']
    }
  }
};

export default config;