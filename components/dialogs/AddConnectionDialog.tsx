import React, { useState } from 'react';
import {
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Alert,
  CircularProgress
} from '@mui/material';
import Dialog from '../ui/Dialog';
import axios from 'axios';

interface AddConnectionDialogProps {
  open: boolean;
  onClose: () => void;
  onConnectionAdded: () => void;
}

interface ConnectionForm {
  name: string;
  db_name: string;
  host: string;
  port: string;
  username: string;
  password: string;
  ssl_mode: string;
}



const AddConnectionDialog: React.FC<AddConnectionDialogProps> = ({
  open,
  onClose,
  onConnectionAdded
}) => {
  const [form, setForm] = useState<ConnectionForm>({
    name: 'New PostgreSQL Connection',
    db_name: 'PostgreSQL',
    host: '',
    port: '5432',
    username: '',
    password: '',
    ssl_mode: 'disable'
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (event: any) => {
    const { name, value } = event.target;
    setForm(prev => {
      const updatedForm = {
        ...prev,
        [name]: value
      };

      // Auto-set default ports and name based on database type
      if (name === 'db_name') {
        switch (value) {
          case 'PostgreSQL':
            updatedForm.port = '5432';
            updatedForm.name = 'New PostgreSQL Connection';
            break;
          case 'MySQL':
            updatedForm.port = '3306';
            updatedForm.name = 'New MySQL Connection';
            break;
          case 'MongoDB':
            updatedForm.port = '27017';
            updatedForm.name = 'New MongoDB Connection';
            break;
          case 'TeraData':
            updatedForm.port = '1025';
            updatedForm.name = 'New TeraData Connection';
            break;
        }
      }

      return updatedForm;
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Use default database for server connection
      let defaultDatabase = '';
      if (form.db_name.toLowerCase() === 'postgresql') {
        defaultDatabase = 'postgres'; // Default PostgreSQL database
      } else if (form.db_name.toLowerCase() === 'mysql') {
        defaultDatabase = 'mysql'; // Default MySQL database  
      } else if (form.db_name.toLowerCase() === 'mongodb') {
        defaultDatabase = 'admin'; // Default MongoDB database
      }

      const response = await axios.post('/mongo/save-connection', {
        name: form.name,
        dialect: form.db_name,
        username: form.username,
        password: form.password,
        host: form.host,
        port: parseInt(form.port, 10),
        database: defaultDatabase,
        ssl_mode: form.ssl_mode,
        is_server_connection: true // Flag to indicate this is a server-level connection
      });

      if (response.data.status === 'success') {
        setSuccess('Connection created successfully!');
        onConnectionAdded();
        setTimeout(() => {
          handleClose();
        }, 1500);
      } else {
        setError(response.data.message || 'Failed to create connection');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create connection');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setForm({
      name: 'New PostgreSQL Connection',
      db_name: 'PostgreSQL',
      host: '',
      port: '5432',
      username: '',
      password: '',
      ssl_mode: 'disable'
    });
    setError(null);
    setSuccess(null);
    setLoading(false);
    onClose();
  };

  const isFormValid = form.host && form.username;

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth sx={{ p: 0, height: '90vh' }}>
      <DialogContent sx={{ p: 0 }}>
        <div style={{
          fontFamily: 'Inter, "Noto Sans", sans-serif',
          backgroundColor: '#f8fafc',
          minHeight: '720px',
          padding: '0',
          borderRadius: 18,
          boxShadow: '0 8px 32px 0 rgba(25, 118, 210, 0.10)',
          display: 'flex',
          flexDirection: 'column',
        }}>
          <div style={{
            width: '512px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          }}>
            <div style={{
              position: 'sticky',
              top: 0,
              zIndex: 10,
              background: '#f8fafc',
              padding: '12px 0 8px 0',
              marginBottom: '8px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1.5px solid #e7edf4',
              minHeight: 64,
            }}>
              <p style={{
                color: '#0d141c',
                fontSize: '26px',
                fontWeight: 700,
                lineHeight: 1.1,
                margin: 0,
                letterSpacing: '-0.01em',
              }}>
                Add Connection
              </p>
              <button
                onClick={handleClose}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#49739c',
                  fontSize: '24px',
                  padding: '6px',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLButtonElement).style.backgroundColor = '#e7edf4';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLButtonElement).style.backgroundColor = 'transparent';
                }}
              >
                ✕
              </button>
            </div>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
            )}

            {success && (
              <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>
            )}

            <form onSubmit={handleSubmit} style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '8px 0 0 0' }}>
                {/* Connection Name */}
                <div style={{ padding: '12px 0' }}>
                  <label style={{ display: 'flex', flexDirection: 'column', minWidth: '160px', flex: 1 }}>
                    <p style={{
                      color: '#0d141c',
                      fontSize: '16px',
                      fontWeight: '500',
                      lineHeight: 'normal',
                      paddingBottom: '8px',
                      margin: 0
                    }}>
                      Connection Name
                    </p>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleInputChange}
                      placeholder="Enter connection name"
                      style={{
                        width: '100%',
                        minWidth: 0,
                        flex: 1,
                        resize: 'none',
                        overflow: 'hidden',
                        borderRadius: '8px',
                        color: '#0d141c',
                        outline: 0,
                        border: 'none',
                        backgroundColor: '#e7edf4',
                        height: '56px',
                        padding: '16px',
                        fontSize: '16px',
                        fontWeight: 'normal',
                        lineHeight: 'normal',
                        fontFamily: 'Inter, "Noto Sans", sans-serif'
                      }}
                    />
                  </label>
                </div>
                {/* Database Type */}
                <div style={{ padding: '12px 0' }}>
                  <label style={{ display: 'flex', flexDirection: 'column', minWidth: '160px', flex: 1 }}>
                    <p style={{
                      color: '#0d141c',
                      fontSize: '16px',
                      fontWeight: '500',
                      lineHeight: 'normal',
                      paddingBottom: '8px',
                      margin: 0
                    }}>
                      Database Type
                    </p>
                    <select
                      name="db_name"
                      value={form.db_name}
                      onChange={handleSelectChange}
                      style={{
                        width: '100%',
                        minWidth: 0,
                        flex: 1,
                        resize: 'none',
                        overflow: 'hidden',
                        borderRadius: '8px',
                        color: '#0d141c',
                        outline: 0,
                        border: 'none',
                        backgroundColor: '#e7edf4',
                        height: '56px',
                        padding: '16px',
                        fontSize: '16px',
                        fontWeight: 'normal',
                        lineHeight: 'normal',
                        fontFamily: 'Inter, "Noto Sans", sans-serif'
                      }}
                    >
                      <option value="PostgreSQL">PostgreSQL</option>
                      <option value="MySQL">MySQL</option>
                      <option value="MongoDB">MongoDB</option>
                      <option value="TeraData">TeraData</option>
                    </select>
                  </label>
                </div>

                {/* Host */}
                <div style={{ padding: '12px 0' }}>
                  <label style={{ display: 'flex', flexDirection: 'column', minWidth: '160px', flex: 1 }}>
                    <p style={{
                      color: '#0d141c',
                      fontSize: '16px',
                      fontWeight: '500',
                      lineHeight: 'normal',
                      paddingBottom: '8px',
                      margin: 0
                    }}>
                      Host
                    </p>
                    <input
                      name="host"
                      value={form.host}
                      onChange={handleInputChange}
                      placeholder="Enter host"
                      style={{
                        width: '100%',
                        minWidth: 0,
                        flex: 1,
                        resize: 'none',
                        overflow: 'hidden',
                        borderRadius: '8px',
                        color: '#0d141c',
                        outline: 0,
                        border: 'none',
                        backgroundColor: '#e7edf4',
                        height: '56px',
                        padding: '16px',
                        fontSize: '16px',
                        fontWeight: 'normal',
                        lineHeight: 'normal',
                        fontFamily: 'Inter, "Noto Sans", sans-serif'
                      }}
                    />
                  </label>
                </div>

                {/* Port */}
                <div style={{ padding: '12px 0' }}>
                  <label style={{ display: 'flex', flexDirection: 'column', minWidth: '160px', flex: 1 }}>
                    <p style={{
                      color: '#0d141c',
                      fontSize: '16px',
                      fontWeight: '500',
                      lineHeight: 'normal',
                      paddingBottom: '8px',
                      margin: 0
                    }}>
                      Port
                    </p>
                    <input
                      name="port"
                      type="number"
                      value={form.port}
                      onChange={handleInputChange}
                      placeholder="Enter port"
                      style={{
                        width: '100%',
                        minWidth: 0,
                        flex: 1,
                        resize: 'none',
                        overflow: 'hidden',
                        borderRadius: '8px',
                        color: '#0d141c',
                        outline: 0,
                        border: 'none',
                        backgroundColor: '#e7edf4',
                        height: '56px',
                        padding: '16px',
                        fontSize: '16px',
                        fontWeight: 'normal',
                        lineHeight: 'normal',
                        fontFamily: 'Inter, "Noto Sans", sans-serif'
                      }}
                    />
                  </label>
                </div>



                {/* Username */}
                <div style={{ padding: '12px 0' }}>
                  <label style={{ display: 'flex', flexDirection: 'column', minWidth: '160px', flex: 1 }}>
                    <p style={{
                      color: '#0d141c',
                      fontSize: '16px',
                      fontWeight: '500',
                      lineHeight: 'normal',
                      paddingBottom: '8px',
                      margin: 0
                    }}>
                      Username
                    </p>
                    <input
                      name="username"
                      value={form.username}
                      onChange={handleInputChange}
                      placeholder="Enter username"
                      style={{
                        width: '100%',
                        minWidth: 0,
                        flex: 1,
                        resize: 'none',
                        overflow: 'hidden',
                        borderRadius: '8px',
                        color: '#0d141c',
                        outline: 0,
                        border: 'none',
                        backgroundColor: '#e7edf4',
                        height: '56px',
                        padding: '16px',
                        fontSize: '16px',
                        fontWeight: 'normal',
                        lineHeight: 'normal',
                        fontFamily: 'Inter, "Noto Sans", sans-serif'
                      }}
                    />
                  </label>
                </div>

                {/* Password */}
                <div style={{ padding: '12px 0' }}>
                  <label style={{ display: 'flex', flexDirection: 'column', minWidth: '160px', flex: 1 }}>
                    <p style={{
                      color: '#0d141c',
                      fontSize: '16px',
                      fontWeight: '500',
                      lineHeight: 'normal',
                      paddingBottom: '8px',
                      margin: 0
                    }}>
                      Password (Optional)
                    </p>
                    <input
                      name="password"
                      type="password"
                      value={form.password}
                      onChange={handleInputChange}
                      placeholder="Enter password (optional)"
                      style={{
                        width: '100%',
                        minWidth: 0,
                        flex: 1,
                        resize: 'none',
                        overflow: 'hidden',
                        borderRadius: '8px',
                        color: '#0d141c',
                        outline: 0,
                        border: 'none',
                        backgroundColor: '#e7edf4',
                        height: '56px',
                        padding: '16px',
                        fontSize: '16px',
                        fontWeight: 'normal',
                        lineHeight: 'normal',
                        fontFamily: 'Inter, "Noto Sans", sans-serif'
                      }}
                    />
                  </label>
                </div>

                {/* SSL Mode */}
                <div style={{ padding: '12px 0' }}>
                  <label style={{ display: 'flex', flexDirection: 'column', minWidth: '160px', flex: 1 }}>
                    <p style={{
                      color: '#0d141c',
                      fontSize: '16px',
                      fontWeight: '500',
                      lineHeight: 'normal',
                      paddingBottom: '8px',
                      margin: 0
                    }}>
                      SSL Mode
                    </p>
                    <select
                      name="ssl_mode"
                      value={form.ssl_mode}
                      onChange={handleSelectChange}
                      style={{
                        width: '100%',
                        minWidth: 0,
                        flex: 1,
                        resize: 'none',
                        overflow: 'hidden',
                        borderRadius: '8px',
                        color: '#0d141c',
                        outline: 0,
                        border: 'none',
                        backgroundColor: '#e7edf4',
                        height: '56px',
                        padding: '16px',
                        fontSize: '16px',
                        fontWeight: 'normal',
                        lineHeight: 'normal',
                        fontFamily: 'Inter, "Noto Sans", sans-serif'
                      }}
                    >
                      <option value="disable">Disable</option>
                      <option value="prefer">Prefer</option>
                      <option value="require">Require</option>
                    </select>
                  </label>
                </div>

                {/* Submit Button */}
                <div style={{ padding: '0.75rem 0', marginTop: '0.5rem' }}>
                  <button
                    type="submit"
                    disabled={!isFormValid || loading}
                    style={{
                      width: '100%',
                      cursor: !isFormValid || loading ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflow: 'hidden',
                      borderRadius: '0.5rem',
                      height: '3rem',
                      padding: '0 1rem',
                      backgroundColor: !isFormValid || loading ? '#ccc' : '#0d80f2',
                      color: '#f8fafc',
                      fontSize: '1rem',
                      fontWeight: 'bold',
                      lineHeight: 'normal',
                      letterSpacing: '0.015em',
                      border: 'none',
                      fontFamily: 'Inter, "Noto Sans", sans-serif',
                      gap: '0.5rem',
                      transition: 'all 0.2s ease-in-out',
                      boxSizing: 'border-box'
                    }}
                    onMouseOver={e => {
                      if (!(!isFormValid || loading)) {
                        e.currentTarget.style.backgroundColor = '#0066cc';
                        e.currentTarget.style.transform = 'translateY(-1px)';
                      }
                    }}
                    onMouseOut={e => {
                      if (!(!isFormValid || loading)) {
                        e.currentTarget.style.backgroundColor = '#0d80f2';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }
                    }}
                  >
                    {loading && <CircularProgress size={16} sx={{ color: 'white' }} />}
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {loading ? 'Connecting to Server...' : 'Connect to Server'}
                    </span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddConnectionDialog;