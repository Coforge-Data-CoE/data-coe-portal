import { CircularProgress } from '@mui/material';
import { View } from '@/components/layout/View';
import Flex from '@/components/layout/Flex';
import Panel from '@/components/layout/Panel';
import Button from '@/components/ui/Button';
import { Title } from '@/components/typography/Title';
import { Text } from '@/components/typography/Text';
import { SubTitle } from '@/components/typography/SubTitle';
import { useState } from 'react';

interface LoginFormProps {
  onLogin: (credentials: { email: string; password: string }) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) return;
    
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      onLogin(formData);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <View 
      className="min-h-screen bg-cover bg-no-repeat bg-fixed bg-center flex items-center justify-center p-4" 
      style={{ backgroundImage: 'url(/bg.jfif)' }}
    >
      <View className="w-full max-w-md">
        {/* Coforge Header */}
        <Flex direction="row" justify="center" align="center" sx={{ mb: 4 }}>
          <img 
            src="/coforge-logo-coral-white.png"
            alt="Coforge Logo"
            style={{ width: 150, height: 40, marginRight: 12 }}
          />
          <Text sx={{ color: 'white', fontSize: '2rem', fontWeight: 'normal' }}>
            | DB Analyzer
          </Text>
        </Flex>

        {/* Login Card */}
        <Panel sx={{ 
          backgroundColor: 'rgba(8, 35, 64, 0.53)',
          borderRadius: 2,
          px: 3,
          py: 2,
          width: '100%',
          maxWidth: 400,
          mx: 'auto',
          color: 'white',
          border: 'none'
        }}>
          <Flex direction="column" align="center" sx={{ mb: 3 }}>
            <Title sx={{ color: 'white', textAlign: 'center', fontSize: '1.25rem', fontWeight: 500 }}>
              Login
            </Title>
          </Flex>

          <form onSubmit={handleSubmit}>
            <Flex direction="column" gap={3}>
              {/* Username Field */}
              <View>
                <SubTitle component="label" sx={{ display: 'block', color: 'white', mb: 1, fontSize: '0.875rem' }}>
                  Username
                </SubTitle>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your username"
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded text-black text-base outline-none transition-all duration-200 focus:border-[#f15840]"
                  required
                />
              </View>

              {/* Password Field */}
              <View>
                <SubTitle component="label" sx={{ display: 'block', color: 'white', mb: 1, fontSize: '0.875rem' }}>
                  Password
                </SubTitle>
                <input
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded text-black text-base outline-none transition-all duration-200 focus:border-[#f15840]"
                  required
                />
              </View>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor: '#f15840',
                  color: 'white',
                  py: 1.5,
                  fontSize: '1rem',
                  fontWeight: 600,
                  '&:hover': { backgroundColor: '#d14532' },
                  '&:disabled': { backgroundColor: '#9ca3af' }
                }}
                startIcon={isLoading ? <CircularProgress size={16} sx={{ color: 'white' }} /> : null}
              >
                {isLoading ? 'Logging In...' : 'Login'}
              </Button>
            </Flex>
          </form>
        </Panel>
      </View>
    </View>
  );
};

export default LoginForm;