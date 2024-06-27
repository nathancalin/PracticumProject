const API_URL = 'http://localhost:5000/api/v1';

const authService = {
  async login(email, password) {
    console.log('Logging in with:', { email, password });
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      if (!response.ok) {
        const error = await response.json();
        console.error('Error response:', error);
        throw new Error(error.message || 'Login failed');
      }

      const data = await response.json();
      console.log('Response data:', data);
      return data;
    } catch (error) {
      console.error('Login error:', error.message);
      throw error;
    }
  },

  async validateToken(token) {
    try {
      const response = await fetch(`${API_URL}/auth/validate`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Invalid token');
      }

      return await response.json();
    } catch (error) {
      console.error('Token validation error:', error.message);
      throw error;
    }
  },
  
  async getUserDetails(token) {
    try {
      const response = await fetch(`${API_URL}/user/details`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user details');
      }

      return await response.json();
    } catch (error) {
      console.error('User details fetch error:', error.message);
      throw error;
    }
  },
};

export async function register(username, email, password) {
    try {
        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password }),
        });

        if (!response.ok) {
            const error = await response.json();
            console.error('Error response:', error);
            throw new Error(error.message || 'Registration failed');
        }

        const data = await response.json();
        console.log('Registration successful, response:', data);
        return data;
    } catch (error) {
        console.error('Registration error:', error.message);
        throw error;
    }
}

export default authService;
